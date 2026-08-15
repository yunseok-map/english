import { toast } from "sonner";
import type { Dialect } from "@/types";
import { ttsLocale } from "@/lib/dialect";

let currentDialect: Dialect = "us";
export function setSpeechDialect(dialect: Dialect) {
  currentDialect = dialect;
}
export function speechDialect() {
  return currentDialect;
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
    voices.find((v) => v.lang.replace("_", "-") === locale) ??
    voices.find((v) => v.lang.replace("_", "-").startsWith(locale.slice(0, 2))) ??
    null;
  utterance.voice = voice;
  utterance.lang = voice?.lang ?? locale;
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

/** WKWebView(iOS 앱)에는 webkitSpeechRecognition이 없으므로 반드시 사전 확인한다. */
export function canRecognizeSpeech() {
  return typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
}

export type RecognizerHandle = { stop: () => void };

export function startRecognition(
  lang: string,
  handlers: { onResult: (text: string) => void; onEnd?: () => void; onError?: (error: string) => void },
): RecognizerHandle | null {
  const Ctor = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  const recognition = new Ctor();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event: any) => handlers.onResult(String(event.results[0][0].transcript ?? ""));
  recognition.onerror = (event: any) => handlers.onError?.(String(event?.error ?? "error"));
  recognition.onend = () => handlers.onEnd?.();
  try {
    recognition.start();
  } catch {
    return null;
  }
  return { stop: () => recognition.stop() };
}
