import type { AppState, Level } from "@/types";
import type { ConversationPack, DictationSentence, GrammarLesson, WordEntry } from "@/data/types";
import { DICTATION, GRAMMAR_LESSONS, PACKS, WORDS } from "@/data";
import { dueCards, todayKey } from "@/lib/engine";
import { LEVEL_ORDER } from "@/lib/level";

export type DailyRoute = {
  newWords: WordEntry[];
  dueCount: number;
  nextLesson: GrammarLesson | null;
  pack: ConversationPack | null;
  dictation: DictationSentence[];
};

/** 현재 레벨 우선, 다음 레벨, 이전 레벨 순으로 콘텐츠를 정렬한다. */
function levelOrdered<T extends { level: Level }>(items: T[], level: Level): T[] {
  const index = LEVEL_ORDER.indexOf(level);
  const rank = (l: Level) => {
    const i = LEVEL_ORDER.indexOf(l);
    if (i === index) return 0;
    if (i > index) return i - index;
    return 10 + (index - i);
  };
  return [...items].sort((a, b) => rank(a.level) - rank(b.level));
}

/** 사용자의 레벨과 진행 상태로 오늘의 학습 루트를 만든다. */
export function buildDailyRoute(state: AppState): DailyRoute {
  const level = state.profile.level;
  const day = Math.floor(Date.now() / 86400000);

  const newWords = levelOrdered(WORDS, level)
    .filter((w) => !state.srs[`word-${w.id}`])
    .slice(0, state.settings.dailyNewWords);

  const nextLesson = levelOrdered(GRAMMAR_LESSONS, level).find((l) => !state.completedLessons.includes(l.id)) ?? null;

  const levelPacks = PACKS.filter((p) => p.level === level);
  const packPool = levelPacks.length > 0 ? levelPacks : PACKS;
  const pack = packPool.length > 0 ? packPool[day % packPool.length] : null;

  const levelDictation = DICTATION.filter((d) => d.level === level);
  const dictationPool = levelDictation.length > 0 ? levelDictation : DICTATION;
  const dictation: DictationSentence[] = [];
  if (dictationPool.length > 0) {
    const start = (day * 5) % dictationPool.length;
    for (let i = 0; i < Math.min(5, dictationPool.length); i += 1) {
      dictation.push(dictationPool[(start + i) % dictationPool.length]);
    }
  }

  return { newWords, dueCount: dueCards(state).length, nextLesson, pack, dictation };
}

export type RouteTaskId = "words" | "review" | "lesson" | "pack";

export function routeTaskKey(task: RouteTaskId, dateKey = todayKey()) {
  return `${dateKey}-${task}`;
}

export function isTaskDone(state: AppState, task: RouteTaskId) {
  return state.completedTasks.includes(routeTaskKey(task));
}
