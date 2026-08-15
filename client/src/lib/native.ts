import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

export const isNative = Capacitor.isNativePlatform();

/** 네이티브 앱에서 상태바 글자색을 테마에 맞춘다. (웹에서는 무시) */
export async function syncStatusBar(dark: boolean) {
  if (!isNative) return;
  try {
    await StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light });
  } catch {
    /* 상태바 제어 실패는 학습 흐름과 무관하므로 조용히 넘어간다. */
  }
}

/** React 마운트가 끝난 뒤 스플래시를 내린다. */
export async function hideSplash() {
  if (!isNative) return;
  try {
    await SplashScreen.hide();
  } catch {
    /* noop */
  }
}
