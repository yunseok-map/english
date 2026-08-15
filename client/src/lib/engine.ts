import type { AppState, Dialect, SrsCard, Tone } from "@/types";
import type { GrammarLesson, WordEntry } from "@/data/types";
import { CONTRACTIONS, GRAMMAR_LESSONS, WORDS } from "@/data";
import { dt } from "@/lib/dialect";

export function daysTo(date: string) {
  return Math.max(
    0,
    Math.ceil((new Date(`${date}T00:00:00`).getTime() - Date.now()) / 86400000)
  );
}
export function formatDate(date: Date) {
  return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
}
export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9' ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i += 1)
    for (let j = 1; j <= a.length; j += 1)
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + 1
            );
  return matrix[b.length][a.length];
}
export function pronunciationScore(target: string, spoken: string) {
  const max = Math.max(target.length, spoken.length, 1);
  return Math.max(
    0,
    Math.round(
      (1 - levenshtein(normalize(target), normalize(spoken)) / max) * 100
    )
  );
}

export function dayKey(offsetDays = 0) {
  return new Date(Date.now() - offsetDays * 86400000)
    .toISOString()
    .slice(0, 10);
}

/**
 * 학습 활동 1회를 통계에 반영한다.
 * streak는 어제 학습했을 때만 이어지고, 하루라도 건너뛰면 1부터 다시 센다.
 */
export function recordStudy(
  stats: AppState["stats"],
  extra?: Partial<AppState["stats"]>
): AppState["stats"] {
  const today = dayKey();
  const yesterday = dayKey(1);
  const streak =
    stats.lastStudyDate === today
      ? stats.streak
      : stats.lastStudyDate === yesterday
        ? stats.streak + 1
        : 1;
  const studyDates = stats.studyDates.includes(today)
    ? stats.studyDates
    : [...stats.studyDates, today].slice(-60);
  return {
    ...stats,
    ...extra,
    minutes: stats.minutes + 1,
    lastStudyDate: today,
    streak,
    studyDates,
  };
}

// ---- SRS (SM-2 변형) ----
export function scheduleCard(
  card: SrsCard,
  grade: 0 | 1 | 2 | 3 | 4 | 5
): SrsCard {
  let { interval, ease, repetitions } = card;
  if (grade < 3) {
    repetitions = 0;
    interval = 1;
    ease = Math.max(1.3, ease - 0.2);
  } else {
    repetitions += 1;
    interval =
      repetitions === 1
        ? 1
        : repetitions === 2
          ? 3
          : Math.max(1, Math.round(interval * ease));
    ease = Math.max(
      1.3,
      ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
    );
  }
  return {
    ...card,
    interval,
    ease,
    repetitions,
    dueAt: Date.now() + interval * 86400000,
  };
}

export function createWordCard(word: WordEntry): SrsCard {
  return {
    id: `word-${word.id}`,
    word: word.word.us,
    meaning: word.meaning,
    dueAt: Date.now(),
    interval: 0,
    ease: 2.5,
    repetitions: 0,
    source: "word",
  };
}
export function dueCards(state: AppState) {
  return Object.values(state.srs)
    .filter(card => card.dueAt <= Date.now())
    .sort((a, b) => a.dueAt - b.dueAt);
}
export function wordById(id: string) {
  return WORDS.find(w => w.id === id);
}

// ---- 변환기 폴백 번역 ----
const localPatterns: Array<[RegExp, string]> = [
  [/얼마|가격/, "How much is this?"],
  [/도와.*주|도움/, "Could you help me with this?"],
  [/화장실/, "Where is the bathroom?"],
  [/예약/, "I would like to make a booking."],
  [/일.*구해|지원/, "I am looking for a job."],
  [/감사/, "Thank you. I really appreciate it."],
  [/미안|죄송/, "I am sorry about that."],
  [/추천/, "What do you recommend?"],
  [/할인|깎/, "Could you give me a discount?"],
  [/잘 모르겠|이해가 안/, "I am not sure. Could you explain it again?"],
  [/다시.*말|한 번 더/, "Could you say that again, please?"],
  [/천천히/, "Could you speak more slowly, please?"],
];
export function fallbackTranslate(korean: string) {
  return (
    localPatterns.find(([pattern]) => pattern.test(korean))?.[1] ??
    "Could you please help me with this?"
  );
}

// ---- 톤 변환 ----
export function toTone(base: string, tone: Tone) {
  if (tone === "daily") return base;
  if (tone === "friend")
    return base
      .replace(/Would it be possible for you to/gi, "Can you")
      .replace(/Could you please/gi, "Can you")
      .replace(/Could you/g, "Can you")
      .replace(/I would like to/g, "I'd like to")
      .replace(/\bI am\b/g, "I'm")
      .replace(/\bdo not\b/g, "don't")
      .replace(/\bcannot\b/g, "can't")
      .replace(/, please\?/g, "?")
      .replace(/, please\./g, ".");
  return base
    .replace(/\bCan you\b/g, "Could you")
    .replace(/\bI'm\b/g, "I am")
    .replace(/\bdon't\b/g, "do not")
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bgonna\b/g, "going to")
    .replace(/\bwanna\b/g, "want to");
}

// ---- 축약 표시 ----
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
let contractionRegex: RegExp | null = null;
let contractionMap: Map<string, string> | null = null;
function ensureContractionIndex() {
  if (contractionRegex && contractionMap) return;
  const sorted = [...CONTRACTIONS].sort(
    (a, b) => b.short.length - a.short.length
  );
  contractionRegex = new RegExp(
    `\\b(${sorted.map(c => escapeRegExp(c.short)).join("|")})\\b`,
    "gi"
  );
  contractionMap = new Map(sorted.map(c => [c.short.toLowerCase(), c.full]));
}
/** 한 번의 패스로 축약형을 병기(paired) 또는 완전형(full)으로 치환한다. 중복 누적 없음. */
export function displayContractions(
  sentence: string,
  mode: AppState["settings"]["contractionMode"]
) {
  if (mode === "short" || CONTRACTIONS.length === 0) return sentence;
  ensureContractionIndex();
  const text = sentence.replace(/[‘’]/g, "'");
  return text.replace(contractionRegex!, match => {
    const full = contractionMap!.get(match.toLowerCase());
    if (!full) return match;
    const cased =
      match[0] === match[0].toUpperCase()
        ? full[0].toUpperCase() + full.slice(1)
        : full;
    return mode === "full" ? cased : `${match} (${cased})`;
  });
}

// ---- 문장 ↔ 콘텐츠 연결 ----
export function matchLessons(sentence: string): GrammarLesson[] {
  return GRAMMAR_LESSONS.filter(lesson => lesson.pattern?.test(sentence)).slice(
    0,
    3
  );
}
export function relevantWords(sentence: string, dialect: Dialect) {
  const tokens = new Set(normalize(sentence).split(" "));
  return WORDS.filter(entry => {
    const w = dt(entry.word, dialect).toLowerCase();
    const parts = w.split(" ");
    return parts.every(part => tokens.has(part));
  }).slice(0, 4);
}
