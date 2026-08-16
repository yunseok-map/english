import type { AppState, Level, PlacementAnswer } from "@/types";
import type { PlacementQuestion, PlacementSection } from "@/data/types";
import { lessons, words } from "@/data";
import { LEVEL_ORDER, nextLevel } from "@/lib/levelOrder";

export {
  LEVEL_ORDER,
  LEVEL_LABEL,
  LEVEL_DESC,
  nextLevel,
} from "@/lib/levelOrder";

export const PLACEMENT_SECTIONS: PlacementSection[] = [
  "vocab",
  "grammar",
  "usage",
];

/** 한 회차에 내는 문항 수. 아홉 칸(밴드 3 × 영역 3)에서 4개씩. */
export const PLACEMENT_PER_CELL = 4;
export const PLACEMENT_SIZE = PLACEMENT_PER_CELL * 9;

/**
 * 응시 세트 추출.
 *
 * 풀을 매번 다 내면 재테스트가 기억력 시험이 된다. 그래서 칸(밴드×영역)마다
 * 4개씩, 모두 36문항만 뽑는다.
 *
 * 다양성은 두 겹으로 만든다.
 *  - 칸마다 12문항을 쌓아 두고 4개만 쓴다.
 *  - `seen` 에 직전 회차 문항을 받아 뒤로 미룬다. 칸마다 8개가 남으므로
 *    바로 이어 봐도 겹치는 문항이 하나도 없다. 칸이 모자라면 그때만 다시 낸다.
 *
 * 유형도 칸마다 직접입력 1 · 오류찾기 1 을 먼저 확보한다. 그래야 한 회차에
 * 찍을 수 없는 문항이 9개, 문장을 뜯어 봐야 하는 문항이 9개 보장된다.
 *
 * seed 를 고정하면 같은 세트가 나온다. 리렌더로 문제가 바뀌면 안 되므로
 * 호출부에서 한 번 만든 seed 를 끝까지 쓴다.
 */
export function buildPlacementSet(
  pool: PlacementQuestion[],
  seed: number,
  seen: string[] = []
): PlacementQuestion[] {
  let state = Math.abs(Math.trunc(seed)) % 2147483647 || 1;
  const rand = () => (state = (state * 48271) % 2147483647) / 2147483647;
  // sort 콜백 안에서 난수를 뽑으면 비교가 일관되지 않아 결과가 한쪽으로 쏠린다.
  // 원소마다 키를 한 번씩 붙여 두고 그 키로 정렬한다.
  const shuffle = <T>(list: T[]) =>
    list
      .map(item => ({ item, key: rand() }))
      .sort((a, b) => a.key - b.key)
      .map(v => v.item);

  const recent = new Set(seen);
  /** 안 본 문항을 앞에, 최근에 본 문항을 뒤에. 각각은 섞는다. */
  const fresh = (list: PlacementQuestion[]) => [
    ...shuffle(list.filter(q => !recent.has(q.id))),
    ...shuffle(list.filter(q => recent.has(q.id))),
  ];

  const picked: PlacementQuestion[] = [];
  for (const band of LEVEL_ORDER) {
    for (const section of PLACEMENT_SECTIONS) {
      const cell = pool.filter(q => q.band === band && q.section === section);
      const fills = fresh(cell.filter(q => q.kind === "fill"));
      const errors = fresh(cell.filter(q => q.kind === "error"));
      const plain = fresh(cell.filter(q => !q.kind || q.kind === "choice"));

      // 유형을 한 개씩 먼저 확보하고, 남은 두 자리는 4지선다로만 채운다.
      //
      // 남은 자리까지 직접입력·오류찾기 후보로 열어 두면 한 회차에 입력 문항이
      // 16개까지 나오는 데다, 그만큼 다음 회차에 쓸 미출제 문항이 동나서
      // `seen` 제외가 깨진다. 칸마다 정확히 1·1·2 로 고정해 두면 매 회차의
      // 구성이 일정하고, 안 쓴 문항도 늘 남는다.
      const take = [...fills.slice(0, 1), ...errors.slice(0, 1)];
      take.push(...plain.slice(0, PLACEMENT_PER_CELL - take.length));
      // 어느 유형이 모자란 칸이 생기면 남은 것으로 메운다.
      if (take.length < PLACEMENT_PER_CELL) {
        const rest = fresh([
          ...plain.slice(PLACEMENT_PER_CELL),
          ...fills.slice(1),
          ...errors.slice(1),
        ]).filter(q => !take.includes(q));
        take.push(...rest.slice(0, PLACEMENT_PER_CELL - take.length));
      }
      picked.push(...take.slice(0, PLACEMENT_PER_CELL));
    }
  }
  // 밴드 순서대로 내보내면 뒤로 갈수록 어려워지는 게 티가 나서 중간에 포기하기 쉽다.
  return shuffle(picked);
}

/** 직접입력 채점용 정규화. 대소문자·앞뒤 공백·끝 구두점·굽은 따옴표를 무시한다. */
export function normalizeFill(text: string) {
  return text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[.,!?;:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 화면과 오답지에 보여 줄 정답 표기. */
export function placementAnswerText(question: PlacementQuestion) {
  return question.kind === "fill"
    ? question.accept[0]
    : question.options[question.answer];
}

/** 이 답이 정답인지. 직접입력은 accept 중 하나와 맞으면 정답. */
export function isPlacementCorrect(
  question: PlacementQuestion,
  given: string
): boolean {
  if (question.kind === "fill") {
    const mine = normalizeFill(given);
    return (
      mine.length > 0 && question.accept.some(a => normalizeFill(a) === mine)
    );
  }
  return given !== "" && given === question.options[question.answer];
}

export type PlacementOutcome = {
  level: Level;
  correct: Record<Level, number>;
  total: Record<Level, number>;
  sections: Record<PlacementSection, { correct: number; total: number }>;
  answers: PlacementAnswer[];
  /** 왜 이 레벨이 나왔는지 한 줄 설명. 결과 화면에 그대로 보여 준다. */
  reason: string;
  /** 다음 레벨을 받으려면 무엇이 모자랐는지. 최상위면 null. */
  shortOf: string | null;
};

/** 레벨별 통과선. [A1밴드, A2밴드, B1밴드] 정답률. */
const GATE: Record<"B1" | "A2", { A1: number; A2: number; B1: number }> = {
  B1: { A1: 0.7, A2: 0.7, B1: 0.55 },
  A2: { A1: 0.6, A2: 0.5, B1: 0 },
};

const pct = (value: number) => `${Math.round(value * 100)}%`;

/**
 * 밴드별 정답률로 레벨 판정.
 *
 * 세 밴드를 모두 본다. 어려운 밴드만 보면 찍어서 맞힌 게 실력으로 둔갑하고,
 * 쉬운 밴드만 보면 기초는 탄탄한데 그 위를 못 하는 사람을 걸러 내지 못한다.
 *
 * 다만 아래쪽 밴드는 어디까지나 "기초가 흔들리지 않는지" 확인하는 용도라
 * 통과선을 낮게 둔다. A1 밴드 12문항 중 3개는 직접 타이핑하는 문항이라
 * 철자 하나로도 깎이는데, 여기에 높은 선을 걸면 상위 밴드를 잘 맞힌 사람까지
 * 초급으로 떨어진다. 판정의 무게는 목표 밴드 자신이 지도록 한다.
 *
 * B1: A1 ≥70% · A2 ≥70% · B1 ≥55%
 * A2: A1 ≥60% · A2 ≥50%
 * 그 외 A1.
 */
export function scorePlacement(answers: PlacementAnswer[]): PlacementOutcome {
  const total: Record<Level, number> = { A1: 0, A2: 0, B1: 0 };
  const correct: Record<Level, number> = { A1: 0, A2: 0, B1: 0 };
  const sections: Record<PlacementSection, { correct: number; total: number }> =
    {
      vocab: { correct: 0, total: 0 },
      grammar: { correct: 0, total: 0 },
      usage: { correct: 0, total: 0 },
    };

  for (const a of answers) {
    total[a.band] += 1;
    sections[a.section].total += 1;
    if (a.correct) {
      correct[a.band] += 1;
      sections[a.section].correct += 1;
    }
  }

  const acc = (l: Level) => (total[l] ? correct[l] / total[l] : 0);

  /** 통과선에 못 미친 밴드를 모아 준다. 비어 있으면 통과. */
  const misses = (gate: { A1: number; A2: number; B1: number }) =>
    (["A1", "A2", "B1"] as const).filter(band => acc(band) < gate[band]);

  const b1Missing = misses(GATE.B1);
  const a2Missing = misses(GATE.A2);

  const level: Level =
    b1Missing.length === 0 ? "B1" : a2Missing.length === 0 ? "A2" : "A1";

  const detail = (["A1", "A2", "B1"] as const)
    .map(band => `${band} ${correct[band]}/${total[band]}`)
    .join(" · ");

  const shortOfList =
    level === "B1" ? [] : level === "A2" ? b1Missing : a2Missing;
  const nextGate = level === "A2" ? GATE.B1 : GATE.A2;
  const shortOf =
    level === "B1"
      ? null
      : shortOfList
          .map(band => `${band} ${pct(acc(band))} → ${pct(nextGate[band])}`)
          .join(", ");

  return {
    level,
    correct,
    total,
    sections,
    answers,
    reason: `난이도별 정답 ${detail} 기준으로 판정했어요.`,
    shortOf,
  };
}

export type PromotionProgress = {
  wordMastery: number;
  mastered: number;
  wordTotal: number;
  lessonsDone: number;
  lessonsTotal: number;
  eligible: boolean;
  /** 데이터 청크가 아직 안 올라와 계산이 불완전한 상태 */
  pending: boolean;
};

/** 승급 조건: 내 레벨 단어의 80%가 SRS 간격 7일 이상 + 내 레벨 강의 전부 완료. */
export function promotionProgress(state: AppState): PromotionProgress {
  const level = state.profile.level;
  const levelWords = words().filter(w => w.level === level);
  const levelLessons = lessons().filter(l => l.level === level);
  const mastered = levelWords.filter(
    w => (state.srs[`word-${w.id}`]?.interval ?? 0) >= 7
  ).length;
  const lessonsDone = levelLessons.filter(l =>
    state.completedLessons.includes(l.id)
  ).length;
  const wordMastery = levelWords.length ? mastered / levelWords.length : 0;
  const pending = levelWords.length === 0;
  return {
    wordMastery,
    mastered,
    wordTotal: levelWords.length,
    lessonsDone,
    lessonsTotal: levelLessons.length,
    eligible:
      !pending &&
      nextLevel(level) !== null &&
      wordMastery >= 0.8 &&
      levelLessons.length > 0 &&
      lessonsDone >= levelLessons.length,
    pending,
  };
}

/**
 * 승급 확인 테스트 문항.
 * 다음 레벨 단어에서 5개를 뽑아 뜻 4지선다로 낸다. 4개 이상 맞히면 승급.
 * (레벨 테스트 30문항을 다시 풀게 하는 건 과하다)
 */
export type PromotionQuestion = {
  wordId: string;
  prompt: string;
  options: string[];
  answer: number;
};

export const PROMOTION_PASS = 4;

export function buildPromotionTest(
  level: Level,
  seed = Date.now()
): PromotionQuestion[] {
  const upcoming = nextLevel(level);
  if (!upcoming) return [];
  const pool = words().filter(w => w.level === upcoming);
  if (pool.length < 8) return [];

  // 시드 기반 셔플: 같은 날 다시 들어와도 문항이 흔들리지 않는다.
  let state = seed % 2147483647 || 1;
  const rand = () => (state = (state * 48271) % 2147483647) / 2147483647;
  const picked = [...pool].sort(() => rand() - 0.5).slice(0, 5);

  return picked.map(word => {
    const distractors = pool
      .filter(w => w.id !== word.id)
      .sort(() => rand() - 0.5)
      .slice(0, 3)
      .map(w => w.meaning);
    const options = [...distractors, word.meaning].sort(() => rand() - 0.5);
    return {
      wordId: word.id,
      prompt: word.word.us,
      options,
      answer: options.indexOf(word.meaning),
    };
  });
}

export function levelIndex(level: Level) {
  return LEVEL_ORDER.indexOf(level);
}
