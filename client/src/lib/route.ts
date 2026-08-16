import type { AppState, Level, Mistake } from "@/types";
import type {
  ConversationPack,
  DictationSentence,
  GrammarLesson,
  WordEntry,
} from "@/data/types";
import { DICTATION, PACKS, lessons, words } from "@/data";
import { dueCards, todayKey } from "@/lib/engine";
import { LEVEL_ORDER } from "@/lib/levelOrder";
import { phaseTopicRank } from "@/lib/curriculum";

export type DailyRoute = {
  newWords: WordEntry[];
  dueCount: number;
  nextLesson: GrammarLesson | null;
  pack: ConversationPack | null;
  dictation: DictationSentence[];
  /** 오늘 다시 낼 오답. 어제까지 틀린 것 중 복습 시점이 된 항목. */
  mistakes: Mistake[];
  /** 말하기(산출) 연습 대상 문장 */
  speaking: WordEntry[];
};

/** 현재 레벨 우선, 다음 레벨, 이전 레벨 순으로 콘텐츠를 정렬한다. */
function levelRank(itemLevel: Level, level: Level) {
  const index = LEVEL_ORDER.indexOf(level);
  const i = LEVEL_ORDER.indexOf(itemLevel);
  if (i === index) return 0;
  if (i > index) return i - index;
  return 10 + (index - i);
}

function levelOrdered<T extends { level: Level }>(
  items: T[],
  level: Level
): T[] {
  return [...items].sort(
    (a, b) => levelRank(a.level, level) - levelRank(b.level, level)
  );
}

/** 오늘 다시 낼 오답. nextReview 가 지난 것만, 자주 틀린 순으로. */
export function dueMistakes(state: AppState, now = Date.now()): Mistake[] {
  return state.mistakes
    .filter(m => m.nextReview <= now)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

/** 사용자의 레벨과 진행 상태로 오늘의 학습 루트를 만든다. */
export function buildDailyRoute(state: AppState): DailyRoute {
  const level = state.profile.level;
  const day = Math.floor(Date.now() / 86400000);
  const departure = state.profile.departureDate;
  const allWords = words();

  // 레벨이 1순위, 그다음이 출국 시점에 맞는 주제.
  // 두 달 전이면 서류·행정, 도착 직전이면 공항·교통이 앞으로 온다.
  const newWords = [...allWords]
    .filter(w => !state.srs[`word-${w.id}`])
    .sort((a, b) => {
      const byLevel = levelRank(a.level, level) - levelRank(b.level, level);
      if (byLevel !== 0) return byLevel;
      return (
        phaseTopicRank(a.topic, departure) - phaseTopicRank(b.topic, departure)
      );
    })
    .slice(0, state.settings.dailyNewWords);

  const nextLesson =
    levelOrdered(lessons(), level).find(
      l => !state.completedLessons.includes(l.id)
    ) ?? null;

  const levelPacks = PACKS.filter(p => p.level === level);
  const packPool = levelPacks.length > 0 ? levelPacks : PACKS;
  const pack = packPool.length > 0 ? packPool[day % packPool.length] : null;

  const levelDictation = DICTATION.filter(d => d.level === level);
  const dictationPool = levelDictation.length > 0 ? levelDictation : DICTATION;
  const dictation: DictationSentence[] = [];
  if (dictationPool.length > 0) {
    const start = (day * 5) % dictationPool.length;
    for (let i = 0; i < Math.min(5, dictationPool.length); i += 1) {
      dictation.push(dictationPool[(start + i) % dictationPool.length]);
    }
  }

  // 말하기는 이미 외운 단어에서 뽑는다. 처음 보는 단어를 말하라고 하면 학습이 아니라 좌절이 된다.
  const speaking = allWords
    .filter(w => {
      const card = state.srs[`word-${w.id}`];
      return card && card.reps > 0;
    })
    .sort(
      (a, b) =>
        state.srs[`word-${a.id}`]!.dueAt - state.srs[`word-${b.id}`]!.dueAt
    )
    .slice(0, 5);

  return {
    newWords,
    dueCount: dueCards(state).length,
    nextLesson,
    pack,
    dictation,
    mistakes: dueMistakes(state),
    speaking,
  };
}

export type RouteTaskId =
  | "words"
  | "review"
  | "lesson"
  | "pack"
  | "mistakes"
  | "speak";

export function routeTaskKey(task: RouteTaskId, dateKey = todayKey()) {
  return `${dateKey}-${task}`;
}

export function isTaskDone(state: AppState, task: RouteTaskId) {
  return state.completedTasks.includes(routeTaskKey(task));
}

/** 오답을 기록하거나 카운트를 올린다. 복습 시점은 하루 뒤. */
export function noteMistake(
  state: AppState,
  mistake: Omit<Mistake, "count" | "nextReview">
): Mistake[] {
  const existing = state.mistakes.find(m => m.id === mistake.id);
  const nextReview = Date.now() + 86400000;
  if (existing) {
    return state.mistakes.map(m =>
      m.id === mistake.id
        ? { ...m, ...mistake, count: m.count + 1, nextReview }
        : m
    );
  }
  return [...state.mistakes, { ...mistake, count: 1, nextReview }].slice(-100);
}

/** 오답을 맞혔을 때. 두 번 연속 맞히면 목록에서 뺀다. */
export function clearMistake(state: AppState, id: string): Mistake[] {
  const existing = state.mistakes.find(m => m.id === id);
  if (!existing) return state.mistakes;
  if (existing.count <= 1) return state.mistakes.filter(m => m.id !== id);
  return state.mistakes.map(m =>
    m.id === id
      ? { ...m, count: m.count - 1, nextReview: Date.now() + 3 * 86400000 }
      : m
  );
}
