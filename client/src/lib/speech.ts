import { toast } from "sonner";
import type { Dialect, Settings } from "@/types";
import { ttsLocale } from "@/lib/dialect";
import {
  NativeSpeech,
  ensureNativeSpeechPermission,
  hasNativeSpeech,
} from "@/lib/nativeSpeech";
import { NativeTts, hasNativeTts } from "@/lib/nativeTts";

let currentDialect: Dialect = "us";
export function setSpeechDialect(dialect: Dialect) {
  currentDialect = dialect;
}
export function speechDialect() {
  return currentDialect;
}

let engine: Settings["speechEngine"] = "auto";
export function setSpeechEngine(value: Settings["speechEngine"]) {
  engine = value;
}

/** 표기별로 골라 둔 목소리. 하나만 두면 US↔AU 전환 때 매번 풀린다. */
const preferred: Record<Dialect, string> = { us: "", au: "" };
export function setPreferredVoices(next: { us: string; au: string }) {
  preferred.us = next.us;
  preferred.au = next.au;
}
function preferredFor(locale: string) {
  return locale.toLowerCase() === "en-au" ? preferred.au : preferred.us;
}

/**
 * 표기별 기본 목소리.
 * 자동 선택은 "고품질 표시가 붙은 것"을 고를 뿐이라 기기마다 결과가 들쭉날쭉하다.
 * 두 표기의 기준 목소리를 못박아 두면 US↔AU 를 오갈 때 같은 짝으로만 바뀐다.
 */
export const DEFAULT_VOICE: Record<Dialect, string> = {
  us: "Zoe",
  au: "Karen",
};

/**
 * 애플이 제공하는 영어 목소리 이름.
 *
 * 기기 목록에는 로봇·효과음 계열과 다른 언어용 항목이 잔뜩 섞여 나온다.
 * 막을 것을 하나씩 세는 방식(blocklist)은 새 항목이 생길 때마다 뚫리므로,
 * 쓸 것만 적어 두고 나머지는 전부 뺀다. 이 목록에 하나도 안 걸리는 기기에서는
 * 목록이 비지 않도록 원래 점수순 결과로 되돌린다.
 */
const KNOWN_VOICES: Record<string, string[]> = {
  "en-us": [
    "Zoe",
    "Samantha",
    "Ava",
    "Allison",
    "Susan",
    "Nicky",
    "Joelle",
    "Noelle",
    "Aaron",
    "Evan",
    "Nathan",
    "Tom",
  ],
  // 표기는 미국식·호주식 둘뿐이다(lib/dialect.ts). 영국 목록은 쓰이지 않는다.
  "en-au": ["Karen", "Lee", "Matilda"],
};

/** 이름 뒤에 붙는 (Enhanced)·(Premium) 같은 꼬리표를 떼고 본이름만 남긴다. */
function baseName(voice: SpeechSynthesisVoice) {
  return voice.name
    .replace(/\s*\(.*\)\s*$/, "")
    .replace(/\s+(Enhanced|Premium|Compact)$/i, "")
    .trim();
}

const normalizeLang = (lang: string) => lang.replace("_", "-").toLowerCase();

/**
 * 웹 SpeechSynthesis 에만 있는 옛 노벨티 목소리들.
 * 로봇·악기·효과음 계열이라 영어 학습에는 쓸 데가 없는데, iOS 목록에서는
 * 이것들이 앞자리를 차지해 정작 쓸 만한 목소리가 아래로 밀린다. 아예 뺀다.
 */
const NOVELTY = new Set(
  [
    "Albert",
    "Bad News",
    "Bahh",
    "Bells",
    "Boing",
    "Bubbles",
    "Cellos",
    "Deranged",
    "Good News",
    "Jester",
    "Junior",
    "Kathy",
    "Organ",
    "Princess",
    "Ralph",
    "Superstar",
    "Trinoids",
    "Whisper",
    "Wobble",
    "Zarvox",
    "Fred",
    "Hysterical",
    "Pipe Organ",
    "Bruce",
    "Agnes",
    "Grandma",
    "Grandpa",
    "Rocko",
    "Sandy",
    "Shelley",
    "Eddy",
    "Flo",
    "Reed",
  ].map(n => n.toLowerCase())
);

function isNovelty(voice: SpeechSynthesisVoice) {
  const name = voice.name
    .toLowerCase()
    .replace(/\s*\(.*\)$/, "")
    .trim();
  return (
    NOVELTY.has(name) ||
    voice.voiceURI.toLowerCase().includes("speech.synthesis.voice") ||
    voice.voiceURI.toLowerCase().includes("eloquence")
  );
}

/**
 * 웹 목소리 점수.
 *
 * "언어가 맞는 첫 번째 것"을 그냥 쓰면 iOS 에서는 보통 저품질 목소리가 걸린다.
 * 지역까지 맞는지, 고품질 표시가 있는지를 보고 순위를 매긴다.
 */
function voiceScore(voice: SpeechSynthesisVoice, locale: string) {
  if (isNovelty(voice)) return -1;
  const lang = normalizeLang(voice.lang);
  const want = locale.toLowerCase();
  let score: number;
  // 지역 일치가 품질보다 우선이다. 그러지 않으면 en-US 고품질 목소리가
  // en-AU 기본 목소리를 이겨서 호주식을 미국 발음으로 읽게 된다.
  if (lang === want) score = 1000;
  else if (lang.startsWith(want.slice(0, 2))) score = 40;
  else return -1;

  const uri = voice.voiceURI.toLowerCase();
  const name = voice.name.toLowerCase();
  // 표기별 기준 목소리를 가장 앞으로. 품질 가산점보다 크게 잡아야 뒤집히지 않는다.
  const wanted =
    locale.toLowerCase() === "en-au" ? DEFAULT_VOICE.au : DEFAULT_VOICE.us;
  if (baseName(voice).toLowerCase() === wanted.toLowerCase()) score += 200;
  if (uri.includes("premium")) score += 40;
  else if (name.includes("natural") || name.includes("neural")) score += 36;
  else if (uri.includes("enhanced") || name.includes("enhanced")) score += 32;
  else if (uri.includes("siri")) score += 24;
  else if (name.includes("google")) score += 20;
  if (!voice.localService) score += 4;
  return score;
}

function webVoices(locale: string) {
  if (!("speechSynthesis" in window)) return [];
  const scored = window.speechSynthesis
    .getVoices()
    .map(voice => ({ voice, score: voiceScore(voice, locale) }))
    .filter(v => v.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map(v => v.voice);

  // 정식 목소리만 남긴다. 한 개도 안 걸리는 기기라면 목록이 비지 않게 원본을 쓴다.
  const known = KNOWN_VOICES[locale.toLowerCase()];
  if (!known) return scored;
  const lower = known.map(n => n.toLowerCase());
  const curated = scored.filter(v => lower.includes(baseName(v).toLowerCase()));
  return curated.length > 0 ? curated : scored;
}

function pickWebVoice(locale: string) {
  if (!("speechSynthesis" in window)) return null;
  const wanted = preferredFor(locale);
  if (wanted) {
    const chosen = window.speechSynthesis
      .getVoices()
      .find(v => v.voiceURI === wanted);
    // 골라 둔 목소리라도 지역이 다르면 무시하고 자동 선택으로 넘어간다.
    if (chosen && normalizeLang(chosen.lang) === locale.toLowerCase())
      return chosen;
  }
  return webVoices(locale)[0] ?? null;
}

export type VoiceOption = { id: string; name: string; detail?: string };

const QUALITY_LABEL: Record<string, string> = {
  premium: "최고 품질",
  enhanced: "고품질",
  default: "기본",
};

/**
 * 고를 수 있는 목소리 목록(좋은 순).
 * 설치형 앱에서는 네이티브 목록이라 내려받은 고품질 목소리까지 나온다.
 */
export async function loadVoices(
  localeOverride?: string
): Promise<VoiceOption[]> {
  const locale = localeOverride ?? ttsLocale(currentDialect);
  if (hasNativeTts()) {
    try {
      const { voices } = await NativeTts.voices({ language: locale });
      const known = KNOWN_VOICES[locale.toLowerCase()]?.map(n =>
        n.toLowerCase()
      );
      const mapped = voices.map(v => ({
        id: v.id,
        name: v.name,
        detail: QUALITY_LABEL[v.quality] ?? v.quality,
      }));
      if (!known) return mapped;
      const curated = mapped.filter(v =>
        known.includes(
          v.name
            .replace(/\s*\(.*\)\s*$/, "")
            .trim()
            .toLowerCase()
        )
      );
      return curated.length > 0 ? curated : mapped;
    } catch {
      /* 네이티브 호출이 실패하면 웹 목록으로 떨어진다. */
    }
  }
  return webVoices(locale).map(v => ({ id: v.voiceURI, name: v.name }));
}

/**
 * 지금 표기(미국식/호주식)에 딱 맞는 목소리가 기기에 있는지.
 * 없으면 다른 영어 목소리로 읽히므로 설정 화면에서 안내한다.
 */
export async function hasExactVoice(localeOverride?: string) {
  const locale = (localeOverride ?? ttsLocale(currentDialect)).toLowerCase();
  if (hasNativeTts()) {
    try {
      const { voices } = await NativeTts.voices({ language: locale });
      return voices.some(
        v => v.lang.toLowerCase().replace("_", "-") === locale
      );
    } catch {
      return true;
    }
  }
  if (!("speechSynthesis" in window)) return true;
  return window.speechSynthesis
    .getVoices()
    .some(v => normalizeLang(v.lang) === locale);
}

function webSpeak(text: string, locale: string, rate: number) {
  if (!("speechSynthesis" in window)) {
    toast.error("이 기기에서는 음성 듣기를 지원하지 않아요.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickWebVoice(locale);
  utterance.voice = voice;
  utterance.lang = voice?.lang ?? locale;
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

/** 현재 다이얼렉트(설정)의 보이스로 읽어 준다. localeOverride로 한국어("ko-KR") 등 지정 가능. */
export function speak(text: string, rate = 0.95, localeOverride?: string) {
  const locale = localeOverride ?? ttsLocale(currentDialect);

  if (hasNativeTts()) {
    void NativeTts.speak({
      text,
      language: locale,
      rate,
      voiceId: preferredFor(locale) || undefined,
      // 네이티브가 튕기면 웹 합성으로라도 읽어 준다. 예전에는 여기서 그냥
      // 끝나서 아무 소리도 안 났고, 화면에도 아무 표시가 없었다.
    }).catch(() => webSpeak(text, locale, rate));
    return;
  }

  webSpeak(text, locale, rate);
}

/** 읽던 것을 멈춘다. 화면을 벗어날 때 부른다. 양쪽 경로를 모두 끈다. */
export function stopSpeaking() {
  if (hasNativeTts()) void NativeTts.stop().catch(() => undefined);
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

// ---- 음성 인식 ----

function webRecognizerAvailable() {
  return (
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  );
}

/** 이 기기에서 어떤 방식으로든 음성 인식이 가능한가. */
export function canRecognizeSpeech() {
  if (engine === "native") return hasNativeSpeech();
  if (engine === "web") return webRecognizerAvailable();
  return hasNativeSpeech() || webRecognizerAvailable();
}

export function speechEngineInUse(): "native" | "web" | "none" {
  if (engine !== "web" && hasNativeSpeech()) return "native";
  if (engine !== "native" && webRecognizerAvailable()) return "web";
  return "none";
}

export type RecognizerHandle = { stop: () => void };
export type RecognitionHandlers = {
  onResult: (text: string) => void;
  /** 말하는 도중 중간 결과. 네이티브에서만 온다. */
  onPartial?: (text: string) => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
};

function startWebRecognition(
  lang: string,
  handlers: RecognitionHandlers
): RecognizerHandle | null {
  const Ctor =
    (window as any).SpeechRecognition ??
    (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  const recognition = new Ctor();
  recognition.lang = lang;
  recognition.interimResults = Boolean(handlers.onPartial);
  recognition.maxAlternatives = 1;
  recognition.onresult = (event: any) => {
    const last = event.results[event.results.length - 1];
    const text = String(last[0]?.transcript ?? "");
    if (last.isFinal) handlers.onResult(text);
    else handlers.onPartial?.(text);
  };
  recognition.onerror = (event: any) =>
    handlers.onError?.(String(event?.error ?? "error"));
  recognition.onend = () => handlers.onEnd?.();
  try {
    recognition.start();
  } catch {
    return null;
  }
  return { stop: () => recognition.stop() };
}

/**
 * 네이티브(SFSpeechRecognizer)를 우선 쓰고, 없으면 브라우저 API로 떨어진다.
 * 네이티브 경로는 권한 요청이 비동기라 핸들을 Promise 로 돌려준다.
 */
export async function startRecognition(
  lang: string,
  handlers: RecognitionHandlers
): Promise<RecognizerHandle | null> {
  const mode = speechEngineInUse();

  if (mode === "native") {
    const granted = await ensureNativeSpeechPermission();
    if (!granted) {
      handlers.onError?.("permission");
      handlers.onEnd?.();
      return null;
    }
    let listener: { remove: () => Promise<void> } | null = null;
    if (handlers.onPartial) {
      listener = await NativeSpeech.addListener("partialResult", data =>
        handlers.onPartial?.(data.value)
      );
    }
    const cleanup = () => {
      void listener?.remove();
      handlers.onEnd?.();
    };
    NativeSpeech.start({
      language: lang,
      partialResults: Boolean(handlers.onPartial),
    })
      .then(result => {
        handlers.onResult(result.value);
        cleanup();
      })
      .catch((error: any) => {
        handlers.onError?.(String(error?.code ?? error?.message ?? "error"));
        cleanup();
      });
    return { stop: () => void NativeSpeech.stop().catch(() => undefined) };
  }

  if (mode === "web") return startWebRecognition(lang, handlers);

  handlers.onError?.("unsupported");
  return null;
}
