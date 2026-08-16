import type { CardState, SrsCard } from "@/types";

/**
 * FSRS(Free Spaced Repetition Scheduler) 간이 구현.
 *
 * SM-2 는 "ease" 하나로 기억을 근사하지만, FSRS 는 기억을
 *   - stability(S): 며칠이 지나면 회상률이 90%로 떨어지는가
 *   - difficulty(D): 이 항목이 본질적으로 얼마나 어려운가
 * 두 축으로 나눠 추적한다. 같은 복습량으로 유지율이 더 높다.
 *
 * 가중치는 FSRS-4.5 의 공개 기본값이다. 개인 최적화(사용자 로그 학습)는 하지 않는다.
 */
const W = [
  0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474,
  0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755,
] as const;

/** 목표 회상률. 0.9면 복습 시점에 90% 확률로 기억나도록 간격을 잡는다. */
const REQUEST_RETENTION = 0.9;
const DECAY = -0.5;
const FACTOR = 19 / 81;
const MAX_INTERVAL = 365;
const DAY = 86400000;

/** 사용자 응답 등급. 1=다시, 2=어려움, 3=보통, 4=쉬움 */
export type Rating = 1 | 2 | 3 | 4;

const clampD = (d: number) => Math.min(10, Math.max(1, d));

function initialStability(rating: Rating) {
  return Math.max(0.1, W[rating - 1]);
}

function initialDifficulty(rating: Rating) {
  return clampD(W[4] - Math.exp(W[5] * (rating - 1)) + 1);
}

/** 경과 시간에 따른 회상 확률. */
function retrievability(elapsedDays: number, stability: number) {
  if (stability <= 0) return 0;
  return Math.pow(1 + (FACTOR * elapsedDays) / stability, DECAY);
}

function nextDifficulty(difficulty: number, rating: Rating) {
  const delta = difficulty - W[6] * (rating - 3);
  // 평균 회귀: 아주 쉬운 항목의 난이도가 1로 눌러붙지 않게 한다.
  const mean = W[7] * initialDifficulty(4) + (1 - W[7]) * delta;
  return clampD(mean);
}

function nextStabilityOnSuccess(
  difficulty: number,
  stability: number,
  retention: number,
  rating: Rating
) {
  const hardPenalty = rating === 2 ? W[15] : 1;
  const easyBonus = rating === 4 ? W[16] : 1;
  return (
    stability *
    (1 +
      Math.exp(W[8]) *
        (11 - difficulty) *
        Math.pow(stability, -W[9]) *
        (Math.exp((1 - retention) * W[10]) - 1) *
        hardPenalty *
        easyBonus)
  );
}

function nextStabilityOnLapse(
  difficulty: number,
  stability: number,
  retention: number
) {
  return (
    W[11] *
    Math.pow(difficulty, -W[12]) *
    (Math.pow(stability + 1, W[13]) - 1) *
    Math.exp((1 - retention) * W[14])
  );
}

/** stability 로부터 목표 회상률을 만족하는 복습 간격(일)을 구한다. */
function intervalFromStability(stability: number) {
  const days =
    (stability / FACTOR) * (Math.pow(REQUEST_RETENTION, 1 / DECAY) - 1);
  return Math.min(MAX_INTERVAL, Math.max(1, Math.round(days)));
}

/**
 * 카드 하나를 채점해 다음 일정으로 옮긴다.
 * `now` 를 주입받아 테스트와 시뮬레이션이 가능하도록 한다.
 */
export function reviewCard(
  card: SrsCard,
  rating: Rating,
  now = Date.now()
): SrsCard {
  const isNew = card.state === "new" || card.lastReview === 0;

  let stability: number;
  let difficulty: number;

  if (isNew) {
    stability = initialStability(rating);
    difficulty = initialDifficulty(rating);
  } else {
    const elapsedDays = Math.max(0, (now - card.lastReview) / DAY);
    const retention = retrievability(elapsedDays, card.stability);
    difficulty = nextDifficulty(card.difficulty, rating);
    stability =
      rating === 1
        ? nextStabilityOnLapse(difficulty, card.stability, retention)
        : nextStabilityOnSuccess(difficulty, card.stability, retention, rating);
  }

  stability = Math.max(0.1, stability);

  // "다시"는 오늘 안에 한 번 더 보게 10분 뒤로 보낸다.
  // 학습 중인 카드의 "어려움"도 짧게(10분) 다시 낸다.
  const relearn = rating === 1;
  const shortAgain = relearn || (isNew && rating === 2);
  const interval = intervalFromStability(stability);

  const state: CardState = relearn
    ? "relearning"
    : isNew
      ? rating === 2
        ? "learning"
        : "review"
      : "review";

  return {
    ...card,
    stability,
    difficulty,
    interval: shortAgain ? 0 : interval,
    dueAt: shortAgain ? now + 10 * 60000 : now + interval * DAY,
    lastReview: now,
    reps: card.reps + 1,
    lapses: card.lapses + (rating === 1 && !isNew ? 1 : 0),
    state,
  };
}

/**
 * 응답 결과와 반응 시간으로 등급을 매긴다.
 *
 * 정답/오답 2단계만 쓰면 "간신히 맞힌 것"과 "즉답"이 같은 취급을 받아
 * 간격이 실제 기억 강도와 어긋난다. 모드별 난이도(예상 소요 시간)를
 * 기준으로 삼아 빠르면 쉬움, 느리면 어려움으로 나눈다.
 */
export type GradeMode = "card" | "choice" | "typing" | "dictation" | "speak";

const EXPECTED_MS: Record<GradeMode, number> = {
  card: 4000,
  choice: 5000,
  typing: 12000,
  dictation: 15000,
  speak: 9000,
};

export function gradeFor(
  correct: boolean,
  mode: GradeMode,
  elapsedMs: number
): Rating {
  if (!correct) return 1;
  const expected = EXPECTED_MS[mode];
  if (elapsedMs <= expected * 0.6) return 4;
  if (elapsedMs >= expected * 1.8) return 2;
  return 3;
}

export const RATING_LABEL: Record<Rating, string> = {
  1: "다시",
  2: "어려움",
  3: "보통",
  4: "쉬움",
};

/** 현재 카드 상태에서 각 등급을 골랐을 때의 다음 간격(사람이 읽는 문자열). */
export function intervalPreview(
  card: SrsCard,
  rating: Rating,
  now = Date.now()
) {
  const next = reviewCard(card, rating, now);
  if (next.interval === 0) return "10분";
  if (next.interval === 1) return "1일";
  if (next.interval < 30) return `${next.interval}일`;
  if (next.interval < 365) return `${Math.round(next.interval / 30)}개월`;
  return "1년";
}
