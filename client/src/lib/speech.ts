import { toast } from "sonner";
import type { Dialect, Settings } from "@/types";
import { ttsLocale } from "@/lib/dialect";
import {
  NativeSpeech,
  ensureNativeSpeechPermission,
  hasNativeSpeech,
} from "@/lib/nativeSpeech";

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

let preferredVoiceURI = "";
export function setPreferredVoice(uri: string) {
  preferredVoiceURI = uri;
}

const normalizeLang = (lang: string) => lang.replace("_", "-").toLowerCase();

/**
 * 목소리 점수.
 *
 * 예전에는 "언어가 맞는 첫 번째 것"을 그냥 썼는데, iOS 는 그 자리에 보통
 * compact(용량을 줄인 저품질) 보이스를 올려 놓는다. 그래서 딱딱하게 들렸다.
 * 기기에 premium/enhanced 보이스가 깔려 있으면 그쪽을 쓰도록 순위를 매긴다.
 * eloquence 계열은 옛 합성음이라 확실히 뒤로 보낸다.
 */
function voiceScore(voice: SpeechSynthesisVoice, locale: string) {
  const lang = normalizeLang(voice.lang);
  const want = locale.toLowerCase();
  let score: number;
  if (lang === want) score = 100;
  else if (lang.startsWith(want.slice(0, 2))) score = 40;
  else return -1;

  const uri = voice.voiceURI.toLowerCase();
  const name = voice.name.toLowerCase();
  if (uri.includes("premium")) score += 40;
  else if (uri.includes("enhanced") || name.includes("enhanced")) score += 32;
  else if (name.includes("natural") || name.includes("neural")) score += 36;
  else if (uri.includes("siri")) score += 24;
  else if (name.includes("google")) score += 20;
  if (uri.includes("compact")) score -= 10;
  if (uri.includes("eloquence")) score -= 60;
  if (!voice.localService) score += 4;
  return score;
}

/** 이 로케일로 쓸 수 있는 목소리를 좋은 순으로. 설정 화면의 선택지로도 쓴다. */
export function listVoices(localeOverride?: string) {
  if (!("speechSynthesis" in window)) return [];
  const locale = localeOverride ?? ttsLocale(currentDialect);
  return window.speechSynthesis
    .getVoices()
    .map(voice => ({ voice, score: voiceScore(voice, locale) }))
    .filter(v => v.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map(v => v.voice);
}

function pickVoice(locale: string) {
  const voices = window.speechSynthesis.getVoices();
  if (preferredVoiceURI) {
    const chosen = voices.find(v => v.voiceURI === preferredVoiceURI);
    if (chosen) return chosen;
  }
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -1;
  for (const voice of voices) {
    const score = voiceScore(voice, locale);
    if (score > bestScore) {
      bestScore = score;
      best = voice;
    }
  }
  return best;
}

/** 현재 쓰이고 있는 목소리 이름. 설정 화면 안내용. */
export function currentVoiceName(localeOverride?: string) {
  if (!("speechSynthesis" in window)) return "";
  return pickVoice(localeOverride ?? ttsLocale(currentDialect))?.name ?? "";
}

/** 현재 다이얼렉트(설정)의 보이스로 읽어 준다. localeOverride로 한국어("ko-KR") 등 지정 가능. */
export function speak(text: string, rate = 0.95, localeOverride?: string) {
  if (!("speechSynthesis" in window)) {
    toast.error("이 기기에서는 음성 듣기를 지원하지 않아요.");
    return;
  }
  const locale = localeOverride ?? ttsLocale(currentDialect);
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(locale);
  utterance.voice = voice;
  utterance.lang = voice?.lang ?? locale;
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
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
