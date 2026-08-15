import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.yunseok.woholenglish",
  appName: "워홀 영어 훈련",
  webDir: "dist/public",
  ios: {
    contentInset: "never",
    scrollEnabled: true,
    // 웹 레이아웃이 safe-area를 직접 처리하므로 배경만 앱 배경색과 맞춘다.
    backgroundColor: "#f6f7f5",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 400,
      launchAutoHide: true,
      backgroundColor: "#f6f7f5ff",
      showSpinner: false,
    },
    Keyboard: {
      resize: "native",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
