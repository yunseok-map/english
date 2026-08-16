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

/** 현재 다이얼렉트(설정)의 보이스로 읽어 준다. localeOverride로 한국어("ko-KR") 등 지정 가능. */
export function speak(text: string, rate = 0.85, localeOverride?: string) {
  if (!("speechSynthesis" in window)) {
    toast.error("이 기기에서는 음성 듣기를 지원하지 않아요.");
    return;
  }
  const locale = localeOverride ?? ttsLocale(currentDialect);
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const voice =
    voices.find(v => v.lang.replace("_", "-") === locale) ??
    voices.find(v => v.lang.replace("_", "-").startsWith(locale.slice(0, 2))) ??
    null;
  utterance.voice = voice;
  utterance.lang = voice?.lang ?? locale;
  utterance.rate = rate;
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
