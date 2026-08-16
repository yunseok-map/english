import { registerPlugin } from "@capacitor/core";
import { isNative } from "@/lib/native";

/**
 * plugins/speech-recognition 의 네이티브 구현에 붙는 JS 인터페이스.
 * WKWebView 에는 webkitSpeechRecognition 이 없어서 이게 없으면
 * 네이티브 앱에서 말하기·발음 기능이 통째로 죽는다.
 */
export type NativeSpeechPlugin = {
  available(options: {
    language: string;
  }): Promise<{ available: boolean; onDevice: boolean }>;
  checkPermissions(): Promise<{
    speechRecognition: "granted" | "denied" | "prompt";
  }>;
  requestPermissions(): Promise<{
    speechRecognition: "granted" | "denied" | "prompt";
  }>;
  start(options: {
    language: string;
    partialResults?: boolean;
    onDevice?: boolean;
  }): Promise<{ value: string }>;
  stop(): Promise<void>;
  addListener(
    event: "partialResult",
    handler: (data: { value: string }) => void
  ): Promise<{ remove: () => Promise<void> }>;
};

export const NativeSpeech =
  registerPlugin<NativeSpeechPlugin>("SpeechRecognition");

export function hasNativeSpeech() {
  return isNative;
}

export async function ensureNativeSpeechPermission() {
  if (!isNative) return false;
  try {
    const current = await NativeSpeech.checkPermissions();
    if (current.speechRecognition === "granted") return true;
    if (current.speechRecognition === "denied") return false;
    const asked = await NativeSpeech.requestPermissions();
    return asked.speechRecognition === "granted";
  } catch {
    return false;
  }
}
