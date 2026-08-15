import type { AppState, Level } from "@/types";
import { GRAMMAR_LESSONS, WORDS } from "@/data";

export const LEVEL_ORDER: Level[] = ["A1", "A2", "B1"];
export const LEVEL_LABEL: Record<Level, string> = { A1: "기초", A2: "생존", B1: "실전" };
export const LEVEL_DESC: Record<Level, string> = {
  A1: "필수 표현부터 차근차근. 주문·길찾기·인사 같은 생존 영어를 다져요.",
  A2: "일상 거래를 혼자 해결해요. 셰어하우스·은행·알바 지원까지.",
  B1: "일터와 행정을 영어로 처리해요. 면접·계약·의료 상담까지.",
};

export type PlacementResult = { level: Level; correct: Record<Level, number>; total: Record<Level, number> };

/**
 * 밴드별 정답률로 레벨 판정.
 * B1: A2 정답률 ≥70% 이고 B1 ≥60% / A2: A1 ≥70% 이고 A2 ≥50% / 그 외 A1.
 */
export function scorePlacement(results: { band: Level; correct: boolean }[]): PlacementResult {
  const total: Record<Level, number> = { A1: 0, A2: 0, B1: 0 };
  const correct: Record<Level, number> = { A1: 0, A2: 0, B1: 0 };
  for (const r of results) {
    total[r.band] += 1;
    if (r.correct) correct[r.band] += 1;
  }
  const acc = (l: Level) => (total[l] ? correct[l] / total[l] : 0);
  const level: Level = acc("A2") >= 0.7 && acc("B1") >= 0.6 ? "B1" : acc("A1") >= 0.7 && acc("A2") >= 0.5 ? "A2" : "A1";
  return { level, correct, total };
}

export function nextLevel(level: Level): Level | null {
  const index = LEVEL_ORDER.indexOf(level);
  return LEVEL_ORDER[index + 1] ?? null;
}

export type PromotionProgress = {
  wordMastery: number;
  mastered: number;
  wordTotal: number;
  lessonsDone: number;
  lessonsTotal: number;
  eligible: boolean;
};

/** 승급 조건: 내 레벨 단어의 80%가 SRS 간격 7일 이상 + 내 레벨 강의 전부 완료. */
export function promotionProgress(state: AppState): PromotionProgress {
  const level = state.profile.level;
  const levelWords = WORDS.filter((w) => w.level === level);
  const mastered = levelWords.filter((w) => (state.srs[`word-${w.id}`]?.interval ?? 0) >= 7).length;
  const lessons = GRAMMAR_LESSONS.filter((l) => l.level === level);
  const lessonsDone = lessons.filter((l) => state.completedLessons.includes(l.id)).length;
  const wordMastery = levelWords.length ? mastered / levelWords.length : 0;
  return {
    wordMastery,
    mastered,
    wordTotal: levelWords.length,
    lessonsDone,
    lessonsTotal: lessons.length,
    eligible: nextLevel(level) !== null && wordMastery >= 0.8 && lessons.length > 0 && lessonsDone >= lessons.length,
  };
}
