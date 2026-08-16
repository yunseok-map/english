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
 * 풀 72문항을 매번 다 내면 재테스트가 기억력 시험이 된다. 그래서 36개만 뽑는다.
 * 칸(밴드×영역)마다 4개씩 뽑되 직접입력을 반드시 하나 끼워 넣는다. 그래야 한
 * 회차에 찍을 수 없는 문항이 최소 9개는 보장된다.
 *
 * seed 를 고정하면 같은 세트가 나온다. 리렌더로 문제가 바뀌면 안 되므로
 * 호출부에서 한 번 만든 seed 를 끝까지 쓴다.
 */
export function buildPlacementSet(
  pool: PlacementQuestion[],
  seed: number
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

  const picked: PlacementQuestion[] = [];
  for (const band of LEVEL_ORDER) {
    for (const section of PLACEMENT_SECTIONS) {
      const cell = pool.filter(q => q.band === band && q.section === section);
      const fills = shuffle(cell.filter(q => q.kind === "fill"));
      const rest = shuffle(cell.filter(q => q.kind !== "fill"));
      // 직접입력 하나를 먼저 확보하고 나머지를 채운다.
      picked.push(
        ...[...fills.slice(0, 1), ...rest, ...fills.slice(1)].slice(
          0,
          PLACEMENT_PER_CELL
        )
      );
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
};

/**
 * 밴드별 정답률로 레벨 판정.
 *
 * 예전 기준(A2 ≥70% & B1 ≥60%)에는 구멍이 둘 있었다.
 *  - B1 을 줄 때 A1 정답률을 아예 보지 않았다. 쉬운 걸 틀리면서 어려운 걸
 *    맞히는 건 실력보다 운일 가능성이 큰데 그대로 통과했다.
 *  - 문항이 전부 4지선다라 찍기만 해도 밴드당 25%가 깔렸다.
 * 지금은 직접입력이 섞여 바닥이 사라졌으므로 기준도 함께 올린다.
 *
 * B1: A1 ≥83% · A2 ≥75% · B1 ≥60%
 * A2: A1 ≥75% · A2 ≥50%
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
  const level: Level =
    acc("A1") >= 0.83 && acc("A2") >= 0.75 && acc("B1") >= 0.6
      ? "B1"
      : acc("A1") >= 0.75 && acc("A2") >= 0.5
        ? "A2"
        : "A1";

  return { level, correct, total, sections, answers };
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
