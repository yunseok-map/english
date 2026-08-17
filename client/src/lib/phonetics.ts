import { levenshtein, normalize } from "@/lib/engine";

/**
 * 음소 단위 발음 채점.
 *
 * 철자 거리(Levenshtein)로 점수를 매기면 한국인이 실제로 틀리는 지점을 못 잡는다.
 * "thin" 을 "sin" 으로 말해도 철자 거리는 1이라 90점이 넘게 나온다.
 * 여기서는 인식된 텍스트를 발음 기호로 바꾼 뒤, 한국어에 없는 대립쌍에
 * 가중치를 줘서 비교한다.
 */

/** 한국어에 없어서 자주 뭉개지는 대립쌍. 값이 클수록 감점이 크다. */
const CONFUSION_PAIRS: Array<[string, string, number]> = [
  ["T", "S", 2.0], // th(무성) ↔ s   think / sink
  ["D", "Z", 2.0], // th(유성) ↔ z   then / zen
  ["D", "d", 1.6], // th(유성) ↔ d   they / day
  ["r", "l", 2.0], // right / light
  ["f", "p", 2.0], // coffee / coppee
  ["v", "b", 2.0], // very / berry
  ["v", "f", 1.2],
  ["z", "j", 1.6], // zoo / jew
  ["z", "s", 1.2],
  ["S", "s", 1.4], // sh ↔ s        she / see
  ["I", "i", 1.4], // ɪ ↔ iː        ship / sheep
  ["U", "u", 1.4], // ʊ ↔ uː        full / fool
  ["e", "a", 1.0], // æ ↔ e         bad / bed
  ["N", "n", 0.8], // ŋ ↔ n
  ["w", "u", 0.6],
];

const confusionCost = new Map<string, number>();
for (const [a, b, cost] of CONFUSION_PAIRS) {
  confusionCost.set(`${a}|${b}`, cost);
  confusionCost.set(`${b}|${a}`, cost);
}

/**
 * 아주 단순한 영어 철자 → 음소 변환기.
 * 사전 없이 규칙만 쓴다. 정확한 IPA 를 만드는 게 목적이 아니라,
 * "같은 소리인지 다른 소리인지"를 판정할 수 있을 만큼만 정규화하면 된다.
 *
 * 기호: T=θ, D=ð, S=ʃ, Z=ʒ, C=tʃ, J=dʒ, N=ŋ, I=ɪ, i=iː, U=ʊ, u=uː, e=e, a=æ
 */
const RULES: Array<[RegExp, string]> = [
  [/^x/g, "z"],
  [/tch/g, "C"],
  [/ch/g, "C"],
  [/sh/g, "S"],
  [/ph/g, "f"],
  [/gh/g, ""],
  [/wh/g, "w"],
  [/qu/g, "kw"],
  [/ck/g, "k"],
  [/ng\b/g, "N"],
  [/dge/g, "J"],
  [/ee|ea|ie/g, "i"],
  [/oo/g, "u"],
  [/ou|ow/g, "aU"],
  [/oa|oe/g, "o"],
  [/ai|ay/g, "eI"],
  [/igh/g, "aI"],
  [/[cs]ion/g, "Sn"],
  [/tion/g, "Sn"],
  [/c(?=[eiy])/g, "s"],
  [/c/g, "k"],
  [/g(?=[eiy])/g, "J"],
  [/j/g, "J"],
  [/y/g, "i"],
  [/[aeiou]r\b/g, "R"],
  [/e\b/g, ""],
  [/(.)\1/g, "$1"],
];

/** th 는 유성/무성을 앞뒤 글자로 대충 가른다. 기능어(the/this/they…)는 유성. */
function markTh(word: string) {
  return word.replace(/th/g, (_m, offset: number, whole: string) => {
    const voicedStarts = [
      "the",
      "this",
      "that",
      "these",
      "those",
      "they",
      "them",
      "then",
      "there",
      "their",
      "than",
    ];
    if (offset === 0 && voicedStarts.some(w => whole.startsWith(w))) return "D";
    // 모음 사이의 th 도 유성인 경우가 많다 (mother, weather)
    const prev = whole[offset - 1] ?? "";
    const next = whole[offset + 2] ?? "";
    if (/[aeiou]/.test(prev) && /[aeiou]/.test(next)) return "D";
    return "T";
  });
}

export function toPhonemes(text: string): string {
  return normalize(text)
    .split(" ")
    .filter(Boolean)
    .map(word => {
      let out = markTh(word);
      for (const [pattern, replacement] of RULES)
        out = out.replace(pattern, replacement);
      return out;
    })
    .join(" ");
}

/** 가중 편집 거리. 혼동쌍 치환은 완전 오답보다 싸게 매긴다(= 부분 점수). */
function weightedDistance(a: string, b: string) {
  const rows = b.length + 1;
  const cols = a.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(0)
  );
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;
  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const x = a[j - 1];
      const y = b[i - 1];
      const substitution =
        x === y ? 0 : (confusionCost.get(`${x}|${y}`) ?? 2) / 2;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + substitution
      );
    }
  }
  return dp[rows - 1][cols - 1];
}

export type PronunciationResult = {
  score: number;
  /** 목표와 다르게 들린 지점. 없으면 잘한 것. */
  issues: Array<{ expected: string; heard: string; hint: string }>;
  exact: boolean;
};

/** 사람이 읽는 소리 이름. 피드백 문구에 쓴다. */
const SOUND_NAME: Record<string, string> = {
  T: "th(무성, 혀를 이 사이로)",
  D: "th(유성, 혀를 이 사이로)",
  S: "sh",
  Z: "zh",
  C: "ch",
  J: "j",
  N: "ng",
  I: "짧은 이(ɪ)",
  i: "긴 이(iː)",
  U: "짧은 우(ʊ)",
  u: "긴 우(uː)",
  r: "r(혀를 안 붙임)",
  l: "l(혀끝을 붙임)",
  f: "f(윗니-아랫입술)",
  v: "v(윗니-아랫입술 + 성대)",
  p: "p",
  b: "b",
  z: "z",
  s: "s",
};

const soundName = (s: string) => SOUND_NAME[s] ?? `'${s}'`;

/**
 * 목표 문장과 인식된 문장을 비교해 점수와 교정 포인트를 낸다.
 * 단어 수가 같을 때만 단어별로 짚어 주고, 다르면 전체 점수만 낸다.
 */
export function scorePronunciation(
  target: string,
  spoken: string
): PronunciationResult {
  const targetWords = normalize(target).split(" ").filter(Boolean);
  const spokenWords = normalize(spoken).split(" ").filter(Boolean);
  if (spokenWords.length === 0) return { score: 0, issues: [], exact: false };

  const exact = targetWords.join(" ") === spokenWords.join(" ");
  const targetPhonemes = toPhonemes(target);
  const spokenPhonemes = toPhonemes(spoken);

  const max = Math.max(targetPhonemes.length, spokenPhonemes.length, 1);
  const distance = weightedDistance(targetPhonemes, spokenPhonemes);
  // 철자 거리도 살짝 섞어 준다. 음소 규칙이 놓치는 부분을 보정한다.
  const spellingPenalty =
    levenshtein(targetWords.join(" "), spokenWords.join(" ")) /
    Math.max(target.length, 1);
  const raw = (1 - distance / max) * 100 - spellingPenalty * 8;
  const score = Math.max(0, Math.min(100, Math.round(raw)));

  const issues: PronunciationResult["issues"] = [];
  if (!exact && targetWords.length === spokenWords.length) {
    for (let i = 0; i < targetWords.length; i += 1) {
      if (targetWords[i] === spokenWords[i]) continue;
      const a = toPhonemes(targetWords[i]);
      const b = toPhonemes(spokenWords[i]);
      // 어느 소리가 어긋났는지 첫 번째 불일치로 짚는다.
      let hint = `'${targetWords[i]}' 를 '${spokenWords[i]}' 로 들었어요.`;
      for (let k = 0; k < Math.max(a.length, b.length); k += 1) {
        if (a[k] === b[k]) continue;
        if (a[k] && b[k] && confusionCost.has(`${a[k]}|${b[k]}`)) {
          hint = `${soundName(a[k])} 소리를 ${soundName(b[k])} 로 냈어요.`;
        }
        break;
      }
      issues.push({ expected: targetWords[i], heard: spokenWords[i], hint });
      if (issues.length >= 3) break;
    }
  }

  return { score, issues, exact };
}
