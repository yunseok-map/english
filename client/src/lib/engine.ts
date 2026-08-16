import type {
  AppState,
  Dialect,
  SessionKind,
  SessionRecord,
  SrsCard,
  Tone,
} from "@/types";
import type { GrammarLesson, WordEntry } from "@/data/types";
import { CONTRACTIONS, dataRevision, lessons, words } from "@/data";
import { dt } from "@/lib/dialect";
import { composeEnglish } from "@/lib/phrasebook";

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

/** 세션 결과 1건을 최근 30건 목록에 추가한다. */
export function recordSession(
  stats: AppState["stats"],
  session: Omit<SessionRecord, "at">
): AppState["stats"] {
  const next: SessionRecord = { ...session, at: Date.now() };
  return { ...stats, sessions: [...stats.sessions, next].slice(-30) };
}

export function sessionsOfKind(state: AppState, kind: SessionKind) {
  return state.stats.sessions.filter(s => s.kind === kind);
}

// ---- SRS ----
export function createWordCard(word: WordEntry): SrsCard {
  return {
    id: `word-${word.id}`,
    word: word.word.us,
    meaning: word.meaning,
    dueAt: Date.now(),
    interval: 0,
    stability: 0,
    difficulty: 5,
    reps: 0,
    lapses: 0,
    lastReview: 0,
    state: "new",
    source: "word",
  };
}

/** 문장·표현을 SRS 에 넣을 때 쓰는 카드. 저장한 문장, 회화팩 표현 등이 여기로 온다. */
export function createSentenceCard(
  id: string,
  text: string,
  meaning: string,
  source: SrsCard["source"] = "sentence"
): SrsCard {
  return {
    id,
    word: text,
    meaning,
    dueAt: Date.now(),
    interval: 0,
    stability: 0,
    difficulty: 5,
    reps: 0,
    lapses: 0,
    lastReview: 0,
    state: "new",
    source,
  };
}

export function dueCards(state: AppState, now = Date.now()) {
  return Object.values(state.srs)
    .filter(card => card.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt);
}

export function wordEntryById(id: string) {
  return words().find(w => w.id === id);
}

// ---- 변환기 폴백 번역 ----
/**
 * 번역 API 없이 만드는 문장. 표현 사전과 매칭은 lib/phrasebook 이 맡는다.
 * 여기서는 화면들이 쓰던 이름만 유지한다.
 */
export async function fallbackTranslate(
  korean: string,
  dialect: Dialect = "us"
) {
  return (await composeEnglish(korean, dialect)).text;
}

// ---- 톤 변환 ----
export function toTone(base: string, tone: Tone) {
  if (tone === "daily") return base;
  if (tone === "friend")
    return base
      .replace(/Would it be possible for you to/gi, "Can you")
      .replace(/Could you please/gi, "Can you")
      .replace(/Could you/g, "Can you")
      .replace(/Could I get/g, "Can I get")
      .replace(/Could I/g, "Can I")
      .replace(/Could we/g, "Can we")
      .replace(/I would like to/g, "I'd like to")
      .replace(/\bI am\b/g, "I'm")
      .replace(/\bI have\b/g, "I've")
      .replace(/\bdo not\b/g, "don't")
      .replace(/\bcannot\b/g, "can't")
      .replace(/, please\?/g, "?")
      .replace(/, please\./g, ".");
  // 비즈니스 톤에서는 축약형을 전부 풀어 쓴다. 표현 사전이 일상 톤 기준이라
  // I've · isn't 같은 축약이 그대로 남아 있으면 격식 문장으로 보이지 않는다.
  return base
    .replace(/\bCan you\b/g, "Could you")
    .replace(/\bCan I\b/g, "Could I")
    .replace(/\bI'd like\b/g, "I would like")
    .replace(/\bI'm\b/g, "I am")
    .replace(/\bI've\b/g, "I have")
    .replace(/\bI'll\b/g, "I will")
    .replace(/\bWe're\b/g, "We are")
    .replace(/\bwe're\b/g, "we are")
    .replace(/\bYou're\b/g, "you are")
    .replace(/\byou're\b/g, "you are")
    .replace(/\bThat's\b/g, "That is")
    .replace(/\bthat's\b/g, "that is")
    .replace(/\bThere's\b/g, "There is")
    .replace(/\bthere's\b/g, "there is")
    .replace(/\bHere's\b/g, "Here is")
    .replace(/\bhere's\b/g, "here is")
    .replace(/\bWhat's\b/g, "What is")
    .replace(/\bwhat's\b/g, "what is")
    .replace(/\bHow's\b/g, "How is")
    .replace(/\bit's\b/gi, m => (m[0] === "I" ? "It is" : "it is"))
    .replace(/\bisn't\b/g, "is not")
    .replace(/\baren't\b/g, "are not")
    .replace(/\bhaven't\b/g, "have not")
    .replace(/\bdoesn't\b/g, "does not")
    .replace(/\bdidn't\b/g, "did not")
    .replace(/\bdon't\b/g, "do not")
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bwon't\b/g, "will not")
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
/**
 * 변환기는 입력이 바뀔 때마다 이 함수를 부른다.
 * 매번 단어 360개를 선형 스캔하지 않도록 토큰 → 단어 역색인을 만들어 둔다.
 * 데이터 청크가 새로 로드되면(revision 변화) 색인을 다시 만든다.
 */
type WordIndex = { revision: number; byToken: Map<string, WordEntry[]> };
const wordIndexes: Partial<Record<Dialect, WordIndex>> = {};

function tokenIndex(dialect: Dialect): Map<string, WordEntry[]> {
  const current = wordIndexes[dialect];
  if (current && current.revision === dataRevision()) return current.byToken;
  const byToken = new Map<string, WordEntry[]>();
  for (const entry of words()) {
    // 다어절 표현은 첫 단어에만 걸어 두고 나머지는 조회 후에 확인한다.
    const head = dt(entry.word, dialect).toLowerCase().split(" ")[0];
    const bucket = byToken.get(head);
    if (bucket) bucket.push(entry);
    else byToken.set(head, [entry]);
  }
  wordIndexes[dialect] = { revision: dataRevision(), byToken };
  return byToken;
}

export function relevantWords(sentence: string, dialect: Dialect) {
  const tokens = new Set(normalize(sentence).split(" ").filter(Boolean));
  if (tokens.size === 0) return [];
  const index = tokenIndex(dialect);
  const found: WordEntry[] = [];
  // 같은 표제어가 레벨마다 실려 있어(refund → a1/a2) 그대로 담으면
  // "단어 선택"에 똑같은 카드가 두 번 뜬다. 표제어 기준으로 한 번만 담는다.
  const seen = new Set<string>();
  for (const token of tokens) {
    for (const entry of index.get(token) ?? []) {
      const word = dt(entry.word, dialect).toLowerCase();
      if (seen.has(word)) continue;
      const parts = word.split(" ");
      if (!parts.every(part => tokens.has(part))) continue;
      seen.add(word);
      found.push(entry);
      if (found.length >= 4) return found;
    }
  }
  return found;
}

let lessonPatterns: { revision: number; list: GrammarLesson[] } | null = null;
export function matchLessons(sentence: string): GrammarLesson[] {
  if (!lessonPatterns || lessonPatterns.revision !== dataRevision()) {
    lessonPatterns = {
      revision: dataRevision(),
      list: lessons().filter(l => l.pattern),
    };
  }
  const out: GrammarLesson[] = [];
  for (const lesson of lessonPatterns.list) {
    // 전역 플래그가 없는 정규식이라 lastIndex 오염 걱정이 없다.
    if (lesson.pattern!.test(sentence)) out.push(lesson);
    if (out.length >= 3) break;
  }
  return out;
}
