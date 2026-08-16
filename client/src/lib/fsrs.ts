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

/**
 * 같은 날 다시 보는 경우의 안정성 갱신.
 *
 * 장기 공식은 (exp((1-R)*W10) - 1) 을 곱하는데, 방금 본 카드는 R 이 1 에 붙어
 * 이 항이 0 이 된다. 즉 안정성이 한 톨도 자라지 않고 간격이 영원히 제자리다.
 * 실제로 "어려움/보통/쉬움" 이 모두 1일로 표시되던 원인이 이거였다.
 * FSRS-5 가 이 구간을 위해 따로 두는 단기 계수를 가져다 쓴다.
 */
const W_SHORT = [0.6468, 0.1966] as const;
function shortTermStability(stability: number, rating: Rating) {
  return Math.max(
    0.1,
    stability * Math.exp(W_SHORT[0] * (rating - 3 + W_SHORT[1]))
  );
}

/** stability 로부터 목표 회상률을 만족하는 복습 간격(일). 반올림하지 않는다. */
function daysFromStability(stability: number) {
  return (stability / FACTOR) * (Math.pow(REQUEST_RETENTION, 1 / DECAY) - 1);
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
  const elapsedDays = isNew ? 0 : Math.max(0, (now - card.lastReview) / DAY);
  // 하루가 지나기 전에 다시 보는 건 "복습"이 아니라 학습 단계의 반복이다.
  const sameDay = !isNew && elapsedDays < 1;

  let stability: number;
  let difficulty: number;

  if (isNew) {
    stability = initialStability(rating);
    difficulty = initialDifficulty(rating);
  } else if (sameDay) {
    difficulty = nextDifficulty(card.difficulty, rating);
    stability =
      rating === 1
        ? Math.min(card.stability, initialStability(1))
        : shortTermStability(card.stability, rating);
  } else {
    const retention = retrievability(elapsedDays, card.stability);
    difficulty = nextDifficulty(card.difficulty, rating);
    stability =
      rating === 1
        ? nextStabilityOnLapse(difficulty, card.stability, retention)
        : nextStabilityOnSuccess(difficulty, card.stability, retention, rating);
  }

  stability = Math.max(0.1, stability);

  const rawDays = daysFromStability(stability);
  // 간격이 하루가 안 되면 일 단위로 뭉개지 말고 분/시간으로 낸다.
  // 안 그러면 버튼 네 개가 전부 "1일"이 되어 아무 정보도 주지 못한다.
  const graduated = rating !== 1 && rawDays >= 1;

  let dueDelay: number;
  let interval: number;
  let state: CardState;

  if (rating === 1) {
    // 틀렸으면 오늘 안에 한 번 더.
    dueDelay = 10 * 60000;
    interval = 0;
    state = isNew ? "learning" : "relearning";
  } else if (!graduated) {
    dueDelay = Math.max(10 * 60000, Math.round(rawDays * DAY));
    interval = 0;
    state = "learning";
  } else {
    interval = Math.min(MAX_INTERVAL, Math.round(rawDays));
    dueDelay = interval * DAY;
    state = "review";
  }

  return {
    ...card,
    stability,
    difficulty,
    interval,
    dueAt: now + dueDelay,
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
  const ms = next.dueAt - now;
  if (ms < 3600000) return `${Math.max(1, Math.round(ms / 60000))}분`;
  if (ms < DAY) return `${Math.round(ms / 3600000)}시간`;
  const days = Math.round(ms / DAY);
  if (days < 30) return `${days}일`;
  if (days < 365) return `${Math.round(days / 30)}개월`;
  return "1년";
}
