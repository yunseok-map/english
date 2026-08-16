import type { Dialect, Level, Settings, Stats } from "@/types";
import { fallbackTranslate } from "@/lib/engine";
import { llmDialectClause } from "@/lib/dialect";
import { postJson } from "@/lib/http";
import { monthKey } from "@/state/defaults";

export interface TranslationProvider {
  id: Settings["translationProvider"];
  translate(text: string, key: string, dialect: Dialect): Promise<string>;
}

const fallback: TranslationProvider = {
  id: "fallback",
  translate: async (text, _key, dialect) => fallbackTranslate(text, dialect),
};
const myMemory: TranslationProvider = {
  id: "mymemory",
  translate: async (text, _key, dialect) => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|en`
    );
    const data = await response.json();
    const out = String(data?.responseData?.translatedText ?? "").trim();
    // 한도를 넘기면 200 응답 본문에 경고 문구가 번역문 자리에 들어온다.
    // 그대로 화면에 내보내면 영어 문장인 척하는 오류 메시지가 된다.
    if (!out || /MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(out))
      return await fallbackTranslate(text, dialect);
    return out;
  },
};
const deepl: TranslationProvider = {
  id: "deepl",
  translate: async (text, key, dialect) => {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text,
        target_lang: dialect === "au" ? "EN-GB" : "EN-US",
      }),
    });
    const data = await response.json();
    return (
      data?.translations?.[0]?.text || (await fallbackTranslate(text, dialect))
    );
  },
};
const google: TranslationProvider = {
  id: "google",
  translate: async (text, key, dialect) => {
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
      data?.data?.translations?.[0]?.translatedText ||
      (await fallbackTranslate(text, dialect))
    );
  },
};
const papago: TranslationProvider = {
  id: "papago",
  translate: async (text, key, dialect) => {
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
    return (
      data?.message?.result?.translatedText ||
      (await fallbackTranslate(text, dialect))
    );
  },
};

/**
 * Gemini를 번역기로 사용한다. 카드 등록 없이 무료 키를 받을 수 있고,
 * 짧은 회화체 한→영에서 전용 번역 API보다 자연스러운 결과를 준다.
 */
const geminiTranslate: TranslationProvider = {
  id: "gemini",
  translate: async (text, key, dialect) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `Translate the Korean text into natural, everyday spoken ${
                  dialect === "au" ? "Australian" : "American"
                } English. Reply with the English sentence only — no quotes, no explanation, no alternatives.`,
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
    return out || (await fallbackTranslate(text, dialect));
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

/**
 * 번역을 시도한다.
 *
 * 고른 엔진이 한도를 다 쓰거나(429) 네트워크가 끊기면 그대로 내장 엔진으로
 * 떨어지는 게 아니라, 키가 필요 없는 MyMemory 를 한 번 더 거친다.
 * 무료 한도가 금방 닳는 엔진(Google·DeepL)을 쓸 때 체감 차이가 크다.
 * 사용자가 "내장 엔진"을 직접 고른 경우에는 네트워크를 건드리지 않는다.
 */
export async function translateText(text: string, settings: Settings) {
  const provider = translators[settings.translationProvider];
  const dialect = settings.dialect;
  if (provider.id === "fallback") return fallbackTranslate(text, dialect);

  const key = translationKeyFor(settings);
  const offline = await fallbackTranslate(text, dialect);
  if (KEYLESS.includes(provider.id) || key) {
    try {
      const out = (await provider.translate(text, key, dialect)).trim();
      if (out && out !== offline) return out;
    } catch {
      // 아래 예비 엔진으로 넘어간다
    }
  }

  if (provider.id !== "mymemory") {
    try {
      const out = (await myMemory.translate(text, "", dialect)).trim();
      if (out && out !== offline) return out;
    } catch {
      // 내장 엔진으로 떨어진다
    }
  }
  return offline;
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

/** 대화 한 줄. 최근 이력을 넘겨 맥락이 이어지게 한다. */
export type ChatTurn = { role: "user" | "assistant"; text: string };

function buildInstruction(
  settings: Settings,
  level: Level,
  mode: ChatMode,
  dialect: Dialect,
  scenarioRole?: string
) {
  const modeClause =
    mode === "role" && scenarioRole
      ? `Stay in character as ${scenarioRole}. Drive the situation forward: ask the next question a real person in that role would ask, and wrap up naturally when the task is done.`
      : mode === "journal"
        ? "Ask about the learner's day, one question at a time, and react to what they say."
        : "Keep a friendly free conversation going with follow-up questions.";
  return [
    `You are an encouraging English conversation partner for a Korean ${level}-level learner preparing for a working holiday.`,
    llmDialectClause(dialect),
    modeClause,
    "Use short 1-2 sentence replies. Never repeat your previous question. If the learner writes Korean, first give a simple English phrase they could have used.",
    `Correction policy: ${settings.correctionLevel}. Put grammar feedback in "correction" written in Korean, and leave it null when the sentence is fine.`,
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
  dialect: Dialect,
  options: { scenarioRole?: string; history?: ChatTurn[] } = {}
): Promise<PartnerReply | null> {
  if (!settings.llmKey || settings.llmProvider === "none") return null;
  const instruction = buildInstruction(
    settings,
    level,
    mode,
    dialect,
    options.scenarioRole
  );
  // 이력을 안 보내면 매 턴이 첫 턴이 되어 상대가 같은 말을 반복한다.
  // 토큰을 아끼려고 최근 10턴만 넘긴다.
  const history = (options.history ?? []).slice(-10);
  try {
    if (settings.llmProvider === "gemini") {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${encodeURIComponent(settings.llmKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: instruction }] },
            contents: [
              ...history.map(turn => ({
                role: turn.role === "user" ? "user" : "model",
                parts: [{ text: turn.text }],
              })),
              { role: "user", parts: [{ text: input }] },
            ],
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
          messages: [
            ...history.map(turn => ({ role: turn.role, content: turn.text })),
            { role: "user", content: input },
          ],
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
          ...history.map(turn => ({ role: turn.role, content: turn.text })),
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
