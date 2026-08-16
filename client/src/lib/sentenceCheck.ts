/**
 * 직접 쓴 영어 문장을 모범답안과 견주는 채점기.
 *
 * 작문은 정답이 하나가 아니다. 글자 하나 다르다고 오답 처리하면 맞는 문장을
 * 써 놓고도 틀렸다는 소리를 듣게 되고, 그러면 아무도 안 쓴다. 그래서 정확히
 * 맞았는지가 아니라 "얼마나 가까운지"를 보고, 모범답안은 어느 경우든 보여 준다.
 *
 * 비교 전에 다음을 지운다.
 *  - 대소문자, 구두점, 중복 공백
 *  - 축약형 (I'm → i am). 뜻이 같은데 형태만 다른 걸로 깎지 않는다.
 *    's 는 is·has·소유격이 겹쳐 되돌릴 수 없으므로 건드리지 않는다.
 */

const CONTRACTIONS: [RegExp, string][] = [
  [/\bcan't\b/g, "cannot"],
  [/\bwon't\b/g, "will not"],
  [/\bshan't\b/g, "shall not"],
  [/n't\b/g, " not"],
  [/'m\b/g, " am"],
  [/'re\b/g, " are"],
  [/'ll\b/g, " will"],
  [/'ve\b/g, " have"],
];

export function normalizeSentence(text: string) {
  let out = text.toLowerCase().replace(/[‘’´`]/g, "'");
  for (const [pattern, replacement] of CONTRACTIONS) {
    out = out.replace(pattern, replacement);
  }
  return (
    out
      // 아포스트로피는 남긴다. it's 와 its 는 다른 말이다.
      .replace(/[^a-z0-9'\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function words(text: string) {
  return normalizeSentence(text).split(" ").filter(Boolean);
}

export type SentenceVerdict = "exact" | "close" | "off";

export type SentenceCheck = {
  verdict: SentenceVerdict;
  /** 0~1. 모범답안 단어 중 몇 개를 맞혔는지. */
  score: number;
  /** 모범답안에는 있는데 내 문장엔 없는 말 */
  missing: string[];
  /** 내 문장에만 있는 말 */
  extra: string[];
};

/**
 * 내 문장과 모범답안을 견준다.
 *
 * 단어 다중집합으로 견주므로 어순은 보지 않는다. 어순까지 강제하면 정답인
 * 다른 표현들이 전부 걸린다. 대신 빠진 말·더 붙은 말을 그대로 돌려줘서
 * 화면에서 무엇이 달랐는지 짚어 줄 수 있게 한다.
 */
export function checkSentence(mine: string, model: string): SentenceCheck {
  const a = words(mine);
  const b = words(model);
  if (a.length === 0) {
    return { verdict: "off", score: 0, missing: b, extra: [] };
  }
  if (normalizeSentence(mine) === normalizeSentence(model)) {
    return { verdict: "exact", score: 1, missing: [], extra: [] };
  }

  // 같은 단어가 여러 번 나올 수 있으니 개수까지 센다.
  const pool = new Map<string, number>();
  for (const w of a) pool.set(w, (pool.get(w) ?? 0) + 1);

  const missing: string[] = [];
  let hit = 0;
  for (const w of b) {
    const left = pool.get(w) ?? 0;
    if (left > 0) {
      pool.set(w, left - 1);
      hit += 1;
    } else {
      missing.push(w);
    }
  }
  const extra: string[] = [];
  for (const [w, count] of pool) {
    for (let i = 0; i < count; i += 1) extra.push(w);
  }

  const score = b.length ? hit / b.length : 0;
  // 핵심 단어를 대부분 담았고 군더더기가 적으면 "거의 맞음"으로 본다.
  const verdict: SentenceVerdict =
    score >= 0.75 && extra.length <= 2 ? "close" : "off";
  return { verdict, score, missing, extra };
}
