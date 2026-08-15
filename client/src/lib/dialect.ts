import type { Dialect } from "@/types";
import type { DialectText } from "@/data/types";

/** DialectText 또는 순수 문자열을 현재 다이얼렉트의 문자열로 푼다. */
export function dt(text: DialectText | string, dialect: Dialect): string {
  if (typeof text === "string") return text;
  return dialect === "au" && text.au ? text.au : text.us;
}

export function ttsLocale(dialect: Dialect): "en-US" | "en-AU" {
  return dialect === "au" ? "en-AU" : "en-US";
}

export function asrLocale(dialect: Dialect): "en-US" | "en-AU" {
  return dialect === "au" ? "en-AU" : "en-US";
}

export function llmDialectClause(dialect: Dialect): string {
  return dialect === "au"
    ? "Use natural Australian English (Australian spelling and common Aussie expressions)."
    : "Use natural American English (American spelling and phrasing).";
}

export const DIALECT_LABEL: Record<Dialect, string> = {
  us: "미국식",
  au: "호주식",
};
export const DIALECT_SHORT: Record<Dialect, string> = { us: "US", au: "AU" };

/** AU 모드에서 표제어가 다른 단어일 때, 연어 문구 안의 US 단어도 함께 바꿔 준다. */
export function localizeCollocation(
  text: string,
  word: DialectText,
  dialect: Dialect
): string {
  if (dialect !== "au" || !word.au) return text;
  const pattern = word.us.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(pattern, "gi"), word.au);
}

/** 한글 발음 힌트는 미국식 표제어 기준이므로, AU 표제어가 다르면 노출하지 않는다. */
export function showsHangulHint(word: DialectText, dialect: Dialect) {
  return !(dialect === "au" && Boolean(word.au));
}
