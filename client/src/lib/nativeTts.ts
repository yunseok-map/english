import { Capacitor, registerPlugin } from "@capacitor/core";
import { isNative } from "@/lib/native";

/**
 * plugins/native-tts 의 네이티브 구현에 붙는 JS 인터페이스.
 *
 * WKWebView 의 speechSynthesis 는 기기에 깔린 고품질 목소리를 넘겨주지 않고
 * Albert·Zarvox 같은 옛 노벨티 목소리만 잔뜩 보여 준다. 설치형 앱에서는
 * AVSpeechSynthesizer 로 우회해서 내려받은 목소리를 그대로 쓴다.
 */
export type NativeVoice = {
  id: string;
  name: string;
  lang: string;
  quality: "premium" | "enhanced" | "default";
};

export type NativeTtsPlugin = {
  voices(options: { language: string }): Promise<{ voices: NativeVoice[] }>;
  speak(options: {
    text: string;
    language: string;
    rate: number;
    voiceId?: string;
  }): Promise<void>;
  stop(): Promise<void>;
};

export const NativeTts = registerPlugin<NativeTtsPlugin>("NativeTts");

/**
 * 네이티브 TTS 를 쓸 수 있는지.
 *
 * "아이폰이다" 만으로는 부족하다. 빌드에 플러그인이 안 들어간 적이 있으면
 * 호출이 "not implemented" 로 튕기는데, 그 경우 웹 합성으로 넘어가야 한다.
 */
export function hasNativeTts() {
  return isNative && Capacitor.isPluginAvailable("NativeTts");
}
