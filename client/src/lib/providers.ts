import type { Dialect, Level, Settings, Stats } from "@/types";
import { fallbackTranslate } from "@/lib/engine";
import { llmDialectClause } from "@/lib/dialect";
import { postJson } from "@/lib/http";
import { monthKey } from "@/state/defaults";

/**
 * 쓰는 Gemini 모델.
 *
 * 예전에는 gemini-2.0-flash-lite 를 박아 뒀는데 2026-06-01 에 서비스가 종료됐다.
 * 그 뒤로 번역·대화 요청이 조용히 404 로 떨어져 내장 엔진으로만 돌아가고 있었다.
 * 실패해도 폴백이 받아 주다 보니 겉으로는 멀쩡해 보여서 오래 못 알아챘다.
 * 모델을 갈 때는 여기 하나만 고치면 되도록 상수로 둔다.
 * (구글 공식 후속 모델: 2.0-flash-lite → 3.1-flash-lite)
 *
 * 고를 때 지켜야 할 두 가지 —
 *  1. Stable 만 쓴다. preview 딱지가 붙은 모델은 예고 없이 사라진다.
 *     방금 그것 때문에 두 달 동안 AI 기능이 죽어 있었다.
 *  2. "구조화된 출력"을 지원해야 한다. 대화 응답을 JSON 으로 받아
 *     reply·correction·hint 를 나눠 쓰기 때문이다.
 *     live / tts 계열 모델은 이 둘을 다 만족하지 못해 여기 쓸 수 없다.
 *     (gemini-3.1-flash-live, 3.5-live-translate, 3.1-flash-tts …)
 */
const GEMINI_MODEL = "gemini-3.1-flash-lite";
const OPENROUTER_MODEL = "google/gemini-3.1-flash-lite";

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
/**
 * DeepL 은 응답에 Access-Control-Allow-Origin 을 주지 않는다.
 * Authorization 헤더 때문에 프리플라이트가 먼저 나가는데 거기서 막히므로
 * 브라우저 fetch 로는 아예 못 부른다. 앱에서는 postJson 이 네이티브로 보낸다.
 */
const deepl: TranslationProvider = {
  id: "deepl",
  translate: async (text, key, dialect) => {
    // 무료 키는 :fx 로 끝나고 api-free 도메인을, 유료 키는 api 도메인을 쓴다.
    const trimmed = key.trim();
    const host = trimmed.endsWith(":fx")
      ? "https://api-free.deepl.com"
      : "https://api.deepl.com";
    const data = (await postJson(
      `${host}/v2/translate`,
      { Authorization: `DeepL-Auth-Key ${trimmed}` },
      {
        text,
        source_lang: "KO",
        target_lang: dialect === "au" ? "EN-GB" : "EN-US",
      },
      true
    )) as { translations?: Array<{ text?: string }> } | null;
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
    // Papago 도 CORS 를 열어 두지 않아 앱(네이티브 요청)에서만 동작한다.
    const data = (await postJson(
      "https://openapi.naver.com/v1/papago/n2mt",
      {
        "X-Naver-Client-Id": id?.trim() || "",
        "X-Naver-Client-Secret": secret?.trim() || "",
      },
      { source: "ko", target: "en", text },
      true
    )) as { message?: { result?: { translatedText?: string } } } | null;
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
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`,
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
 * 떨어지지 않고 다음 차례로 넘어간다.
 *
 *   고른 엔진 → (대화용 Gemini 키가 있으면) Gemini → MyMemory → 내장 엔진
 *
 * 두 번째 자리가 핵심이다. DeepL 을 골라 두고 대화용으로 Gemini 키까지 넣어
 * 뒀다면, DeepL 한도가 끝났을 때 이미 가진 Gemini 키를 놀릴 이유가 없다.
 * 반대 방향(Gemini 선택 + DeepL 예비)은 안 된다. DeepL 키를 담아 둘 자리가
 * translationKey 하나뿐인데 그건 고른 엔진이 쓰고 있기 때문이다.
 *
 * 사용자가 "내장 엔진"을 직접 고른 경우에는 네트워크를 건드리지 않는다.
 */
export async function translateText(text: string, settings: Settings) {
  const provider = translators[settings.translationProvider];
  const dialect = settings.dialect;
  if (provider.id === "fallback") return fallbackTranslate(text, dialect);

  const offline = await fallbackTranslate(text, dialect);
  const attempts: Array<{ engine: TranslationProvider; key: string }> = [];

  const key = translationKeyFor(settings);
  if (KEYLESS.includes(provider.id) || key)
    attempts.push({ engine: provider, key });

  const geminiKey = settings.llmProvider === "gemini" ? settings.llmKey : "";
  if (provider.id !== "gemini" && geminiKey)
    attempts.push({ engine: geminiTranslate, key: geminiKey });

  if (provider.id !== "mymemory") attempts.push({ engine: myMemory, key: "" });

  for (const attempt of attempts) {
    try {
      const out = (
        await attempt.engine.translate(text, attempt.key, dialect)
      ).trim();
      // 내장 엔진과 같은 답이면 그 엔진이 사실상 실패한 것이다. 다음으로 넘긴다.
      if (out && out !== offline) return out;
    } catch {
      // 다음 엔진으로
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

/**
 * 마지막 AI 대화 호출이 왜 실패했는지.
 *
 * 예전에는 실패하면 조용히 null 을 돌려주고 규칙 기반 응답으로 넘어갔다.
 * 모델이 종료돼서 두 달 넘게 안 돌아가고 있었는데도 화면에는 아무 표시가
 * 없어서 알아채지 못했다. 실패 이유를 남겨 화면에서 한 번 알려 준다.
 */
let lastLlmError: string | null = null;
/** 실패 사유를 가져가면서 비운다. 같은 오류를 반복해서 띄우지 않기 위해. */
export function takeLlmError() {
  const error = lastLlmError;
  lastLlmError = null;
  return error;
}

/** 응답이 실패면 사람이 읽을 수 있는 이유로 바꿔 던진다. */
async function readLlmJson(response: Response) {
  if (response.ok) return response.json();
  const detail = await response.text().catch(() => "");
  if (response.status === 404)
    throw new Error(
      "AI 모델을 찾을 수 없어요 (404). 앱을 최신 버전으로 업데이트해 주세요."
    );
  if (response.status === 429)
    throw new Error(
      "AI 사용 한도를 넘었어요 (429). 잠시 뒤 다시 시도해 주세요."
    );
  if ([400, 401, 403].includes(response.status))
    throw new Error(`API 키를 확인해 주세요 (${response.status}).`);
  throw new Error(`AI 응답 오류 (${response.status}). ${detail.slice(0, 80)}`);
}

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

/**
 * 실시간 음성 대화용 지시문.
 *
 * 텍스트 대화는 JSON 으로 받아 교정·힌트를 따로 쓰지만, 음성은 말한 게 전부다.
 * JSON 을 요구하면 모델이 중괄호를 소리 내어 읽는다. 대신 말로 짧게 받고,
 * 고칠 게 있으면 대화 흐름 안에서 자연스럽게 되짚어 달라고 시킨다.
 */
export function buildLiveInstruction(
  level: Level,
  mode: ChatMode,
  dialect: Dialect,
  scenarioRole?: string
) {
  const modeClause =
    mode === "role" && scenarioRole
      ? `You are ${scenarioRole}. Stay in character and move the situation forward one step at a time, then wrap up naturally when it is done.`
      : mode === "journal"
        ? "Ask about the learner's day, one question at a time, and react warmly to what they say."
        : "Keep a friendly, everyday conversation going with short follow-up questions.";
  return [
    `You are a patient English speaking partner for a Korean ${level}-level learner on a working holiday.`,
    llmDialectClause(dialect),
    modeClause,
    "Speak slowly and clearly, in one or two short sentences. Wait for the learner to finish before you answer.",
    'If they make a mistake that changes the meaning, repeat their sentence back correctly as a natural confirmation ("Ah, you went to the cafe yesterday?") instead of stopping to explain grammar.',
    "If they go quiet or get stuck, offer a simple phrase they could say next.",
    "Never read out punctuation, JSON, or formatting. Just talk.",
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
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(settings.llmKey)}`,
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
      const data = await readLlmJson(response);
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
      const data = await readLlmJson(response);
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
            ? OPENROUTER_MODEL
            : "gpt-4o-mini",
        messages: [
          { role: "system", content: instruction },
          ...history.map(turn => ({ role: turn.role, content: turn.text })),
          { role: "user", content: input },
        ],
        response_format: { type: "json_object" },
      }),
    });
    const data = await readLlmJson(response);
    return parseReply(data?.choices?.[0]?.message?.content);
  } catch (error) {
    lastLlmError =
      error instanceof Error
        ? error.message
        : "AI에 연결하지 못했어요. 네트워크를 확인해 주세요.";
    return null;
  }
}
