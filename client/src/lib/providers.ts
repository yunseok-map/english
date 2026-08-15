import type { Dialect, Level, Settings, Stats } from "@/types";
import { fallbackTranslate } from "@/lib/engine";
import { llmDialectClause } from "@/lib/dialect";
import { monthKey } from "@/state/defaults";

export interface TranslationProvider {
  id: Settings["translationProvider"];
  translate(text: string, key: string): Promise<string>;
}

const fallback: TranslationProvider = {
  id: "fallback",
  translate: async text => fallbackTranslate(text),
};
const myMemory: TranslationProvider = {
  id: "mymemory",
  translate: async text => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|en`
    );
    const data = await response.json();
    return data?.responseData?.translatedText || fallbackTranslate(text);
  },
};
const deepl: TranslationProvider = {
  id: "deepl",
  translate: async (text, key) => {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ text, target_lang: "EN" }),
    });
    const data = await response.json();
    return data?.translations?.[0]?.text || fallbackTranslate(text);
  },
};
const google: TranslationProvider = {
  id: "google",
  translate: async (text, key) => {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "ko",
          target: "en",
          format: "text",
        }),
      }
    );
    const data = await response.json();
    return (
      data?.data?.translations?.[0]?.translatedText || fallbackTranslate(text)
    );
  },
};
const papago: TranslationProvider = {
  id: "papago",
  translate: async (text, key) => {
    const [id, secret] = key.split(":");
    const response = await fetch("https://openapi.naver.com/v1/papago/n2mt", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Naver-Client-Id": id || "",
        "X-Naver-Client-Secret": secret || "",
      },
      body: new URLSearchParams({ source: "ko", target: "en", text }),
    });
    const data = await response.json();
    return data?.message?.result?.translatedText || fallbackTranslate(text);
  },
};

/**
 * Gemini를 번역기로 사용한다. 카드 등록 없이 무료 키를 받을 수 있고,
 * 짧은 회화체 한→영에서 전용 번역 API보다 자연스러운 결과를 준다.
 */
const geminiTranslate: TranslationProvider = {
  id: "gemini",
  translate: async (text, key) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "Translate the Korean text into natural, everyday spoken English. Reply with the English sentence only — no quotes, no explanation, no alternatives.",
              },
            ],
          },
          contents: [{ role: "user", parts: [{ text }] }],
          generationConfig: { temperature: 0.3 },
        }),
      }
    );
    const data = await response.json();
    const out = String(
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
    ).trim();
    return out || fallbackTranslate(text);
  },
};

const translators: Record<
  Settings["translationProvider"],
  TranslationProvider
> = {
  fallback,
  gemini: geminiTranslate,
  mymemory: myMemory,
  deepl,
  google,
  papago,
};

/** 키가 필요 없는 번역 엔진 */
const KEYLESS: Array<Settings["translationProvider"]> = [
  "fallback",
  "mymemory",
];

/**
 * 번역에 쓸 키를 고른다.
 * Gemini는 대화 기능과 같은 키를 쓰므로, 번역 키를 따로 넣지 않았으면 대화 키를 재사용한다.
 */
export function translationKeyFor(settings: Settings) {
  if (settings.translationKey) return settings.translationKey;
  if (
    settings.translationProvider === "gemini" &&
    settings.llmProvider === "gemini"
  )
    return settings.llmKey;
  return "";
}

export async function translateText(text: string, settings: Settings) {
  const provider = translators[settings.translationProvider];
  const key = translationKeyFor(settings);
  if (!KEYLESS.includes(provider.id) && !key) return fallbackTranslate(text);
  try {
    return await provider.translate(text, key);
  } catch {
    return fallbackTranslate(text);
  }
}

// ---- LLM 대화 파트너 ----

export type PartnerReply = {
  reply: string;
  correction?: string;
  hint?: string;
  words: string[];
};
export type ChatMode = "free" | "role" | "journal";

/** 이번 달 LLM 사용량. llmMonth가 지난 달이면 0으로 취급한다. */
export function llmUsage(
  stats: Pick<Stats, "llmCalls" | "llmMonth">,
  limit: number
) {
  const used = stats.llmMonth === monthKey() ? stats.llmCalls : 0;
  return { used, limit, blocked: used >= limit };
}

function buildInstruction(
  settings: Settings,
  level: Level,
  mode: ChatMode,
  dialect: Dialect
) {
  return [
    `You are an encouraging English conversation partner for a Korean ${level}-level learner preparing for a working holiday.`,
    llmDialectClause(dialect),
    `Mode: ${mode}.`,
    "Use short 1-2 sentence replies. If the learner writes Korean, first give a simple English phrase they could have used.",
    `Correction policy: ${settings.correctionLevel}.`,
    'Respond with JSON only: {"reply": string, "correction": string | null, "hint": string | null, "words": string[]}.',
  ].join(" ");
}

function parseReply(text: string | undefined | null): PartnerReply | null {
  if (!text) return null;
  try {
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "");
    const parsed = JSON.parse(cleaned);
    if (!parsed || typeof parsed.reply !== "string") return null;
    return {
      reply: parsed.reply,
      correction: parsed.correction || undefined,
      hint: parsed.hint || undefined,
      words: Array.isArray(parsed.words)
        ? parsed.words.filter((w: unknown) => typeof w === "string")
        : [],
    };
  } catch {
    return null;
  }
}

export async function requestPartnerReply(
  input: string,
  settings: Settings,
  level: Level,
  mode: ChatMode,
  dialect: Dialect
): Promise<PartnerReply | null> {
  if (!settings.llmKey || settings.llmProvider === "none") return null;
  const instruction = buildInstruction(settings, level, mode, dialect);
  try {
    if (settings.llmProvider === "gemini") {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${encodeURIComponent(settings.llmKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: instruction }] },
            contents: [{ role: "user", parts: [{ text: input }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.6,
            },
          }),
        }
      );
      const data = await response.json();
      return parseReply(data?.candidates?.[0]?.content?.parts?.[0]?.text);
    }
    if (settings.llmProvider === "anthropic") {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": settings.llmKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 400,
          system: instruction,
          messages: [{ role: "user", content: input }],
        }),
      });
      const data = await response.json();
      return parseReply(data?.content?.[0]?.text);
    }
    const endpoint =
      settings.llmProvider === "openrouter"
        ? "https://openrouter.ai/api/v1/chat/completions"
        : "https://api.openai.com/v1/chat/completions";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.llmKey}`,
      },
      body: JSON.stringify({
        model:
          settings.llmProvider === "openrouter"
            ? "google/gemini-2.0-flash-lite-001"
            : "gpt-4o-mini",
        messages: [
          { role: "system", content: instruction },
          { role: "user", content: input },
        ],
        response_format: { type: "json_object" },
      }),
    });
    const data = await response.json();
    return parseReply(data?.choices?.[0]?.message?.content);
  } catch {
    return null;
  }
}
