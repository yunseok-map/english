import type { Dialect } from "@/types";
import type { Entry as PhrasebookEntry } from "@/lib/phrasebookData";

/**
 * 내장 표현 엔진.
 *
 * 번역 API 키가 없거나 오프라인일 때도 변환기가 쓸 만한 문장을 내놓아야 한다.
 * 예전에는 정규식 12개가 전부여서 대부분의 입력이 "Could you please help me
 * with this?" 하나로 떨어졌다. 워홀에서 실제로 말하게 되는 자리를 훑어
 * 표현을 채워 넣고, 첫 번째로 걸리는 규칙이 아니라 가장 구체적으로 걸리는
 * 표현이 이기도록 점수를 매긴다.
 *
 * 매칭 방식
 *  - 한글/영숫자만 남기고 정규화한다. 조사·띄어쓰기가 달라도 걸린다.
 *    ("얼마 예요?" "얼마예요" "얼마죠" → 모두 "얼마" 로 걸린다)
 *  - keys 중 하나라도 걸리면 후보. 점수는 걸린 key 의 글자 수 합.
 *    길고 구체적인 신호일수록 이긴다. ("얼마나걸" 이 "얼마" 를 이긴다)
 *  - all 은 전부 있어야, not 은 하나라도 있으면 탈락.
 *  - 문장을 마침표·물음표로 잘라 절마다 따로 고르고 이어 붙인다.
 *    "이거 얼마예요? 좀 깎아주실 수 있어요?" → 두 문장이 모두 나온다.
 */

export type PhraseTopic =
  | "cafe"
  | "shop"
  | "transport"
  | "house"
  | "bank"
  | "job"
  | "work"
  | "health"
  | "util"
  | "visa"
  | "comm"
  | "trouble"
  | "social";

export const TOPIC_LABEL: Record<PhraseTopic, string> = {
  cafe: "카페·식당",
  shop: "쇼핑·계산",
  transport: "길·교통",
  house: "숙소·셰어하우스",
  bank: "은행·돈",
  job: "일자리·면접",
  work: "직장",
  health: "병원·약국",
  util: "통신·생활",
  visa: "비자·관공서",
  comm: "소통",
  trouble: "문제·불만",
  social: "사교",
};

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

/** 한글·영숫자만 남긴다. 조사·띄어쓰기·문장부호 차이를 없애기 위해서. */
function normalizeKo(text: string) {
  return text.toLowerCase().replace(/[^가-힣a-z0-9]/g, "");
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some(n => keyScore(haystack, n) > 0);
}

/**
 * key 가 문장에 걸리면 걸린 글자 수를, 아니면 0 을 준다.
 * "지갑*잃" 처럼 * 을 넣으면 사이에 조사·부사가 끼어도 걸린다.
 * ("지갑을 잃어버렸어요" → 지갑 … 잃) 사이가 8글자를 넘으면 다른 말로 본다.
 */
function keyScore(text: string, key: string) {
  if (!key.includes("*")) return text.includes(key) ? key.length : 0;
  const parts = key.split("*").filter(Boolean);
  let at = 0;
  let length = 0;
  for (let i = 0; i < parts.length; i += 1) {
    const found = text.indexOf(parts[i], at);
    if (found < 0) return 0;
    if (i > 0 && found - at > 8) return 0;
    at = found + parts[i].length;
    length += parts[i].length;
  }
  return length;
}

export type PhraseHit = {
  id: string;
  topic: PhraseTopic;
  en: string;
  score: number;
};

/**
 * 표현 본문은 첫 화면에 필요 없다. 변환기를 처음 쓸 때 한 번만 내려받고
 * 그 뒤로는 모듈 캐시가 받아 준다.
 */
let entries: PhrasebookEntry[] | null = null;
export async function loadPhrasebook() {
  if (!entries) entries = (await import("@/lib/phrasebookData")).ENTRIES;
  return entries;
}

/** 한 덩어리(절)에 대해 점수가 높은 순으로 표현을 고른다. */
function matchIn(
  all: PhrasebookEntry[],
  clause: string,
  dialect: Dialect,
  limit: number
): PhraseHit[] {
  const text = normalizeKo(clause);
  if (!text) return [];

  const hits: PhraseHit[] = [];
  for (const entry of all) {
    if (entry.not && includesAny(text, entry.not)) continue;
    if (entry.all && !entry.all.every(a => text.includes(a))) continue;

    let score = 0;
    for (const key of entry.keys) score += keyScore(text, key);
    if (score === 0) continue;

    hits.push({
      id: entry.id,
      topic: entry.topic,
      en: fillSlots(dialect === "au" && entry.au ? entry.au : entry.en, clause),
      score: score + (entry.weight ?? 0),
    });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** "{n}" 자리에 문장 안의 숫자를 넣는다. 숫자가 없으면 two 를 기본으로. */
function fillSlots(text: string, clause: string) {
  if (!text.includes("{n}")) return text;
  const digits = clause.match(/\d+/);
  const n = digits ? Number(digits[0]) : NaN;
  const word =
    Number.isFinite(n) && n >= 0 && n <= 10 ? NUMBER_WORDS[n] : digits?.[0];
  return text.replace(/\{n\}/g, word ?? "two");
}

export type ComposeResult = {
  /** 이어 붙인 영어 문장 */
  text: string;
  /** 표현이 실제로 걸렸는지. false 면 일반 안내 문장으로 떨어진 것. */
  matched: boolean;
  /** 걸린 표현들 (톤 카드 밑에 "다른 표현" 으로 보여 줄 수 있다) */
  hits: PhraseHit[];
};

const GENERIC = "Could you help me with this, please?";

/**
 * 한국어 입력을 통째로 받아 영어 문장을 만든다.
 * 문장 부호로 절을 나눠 절마다 표현을 하나씩 고르고 이어 붙인다.
 */
export async function composeEnglish(
  korean: string,
  dialect: Dialect = "us"
): Promise<ComposeResult> {
  const all = await loadPhrasebook();
  const clauses = korean
    .split(/[.!?\n。？！]+/)
    .map(c => c.trim())
    .filter(Boolean);

  const picked: PhraseHit[] = [];
  const seen = new Set<string>();
  for (const clause of clauses.length ? clauses : [korean]) {
    for (const hit of matchIn(all, clause, dialect, 2)) {
      if (seen.has(hit.id)) continue;
      seen.add(hit.id);
      picked.push(hit);
      break; // 절마다 하나씩만 문장에 넣는다
    }
  }

  // 문장에 못 넣은 후보도 "다른 표현" 용으로 몇 개 챙겨 둔다.
  const extras = matchIn(all, korean, dialect, 5).filter(h => !seen.has(h.id));

  if (picked.length === 0) {
    return { text: GENERIC, matched: false, hits: extras };
  }
  return {
    text: picked.map(p => p.en).join(" "),
    matched: true,
    hits: [...picked, ...extras],
  };
}
