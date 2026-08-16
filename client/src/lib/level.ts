import type { AppState, Level } from "@/types";
import { lessons, words } from "@/data";
import { LEVEL_ORDER, nextLevel } from "@/lib/levelOrder";

export {
  LEVEL_ORDER,
  LEVEL_LABEL,
  LEVEL_DESC,
  nextLevel,
} from "@/lib/levelOrder";

export type PlacementResult = {
  level: Level;
  correct: Record<Level, number>;
  total: Record<Level, number>;
};

/**
 * 밴드별 정답률로 레벨 판정.
 * B1: A2 정답률 ≥70% 이고 B1 ≥60% / A2: A1 ≥70% 이고 A2 ≥50% / 그 외 A1.
 */
export function scorePlacement(
  results: { band: Level; correct: boolean }[]
): PlacementResult {
  const total: Record<Level, number> = { A1: 0, A2: 0, B1: 0 };
  const correct: Record<Level, number> = { A1: 0, A2: 0, B1: 0 };
  for (const r of results) {
    total[r.band] += 1;
    if (r.correct) correct[r.band] += 1;
  }
  const acc = (l: Level) => (total[l] ? correct[l] / total[l] : 0);
  const level: Level =
    acc("A2") >= 0.7 && acc("B1") >= 0.6
      ? "B1"
      : acc("A1") >= 0.7 && acc("A2") >= 0.5
        ? "A2"
        : "A1";
  return { level, correct, total };
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
