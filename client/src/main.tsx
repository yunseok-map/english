import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./styles/app.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppStateProvider } from "./state/context";
import { isNative } from "./lib/native";

// 개발 중 노치(safe-area) 레이아웃 검증: ?safe=1 로 인셋을 강제 주입한다.
if (
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get("safe") === "1"
) {
  document.documentElement.style.setProperty("--safe-top", "59px");
  document.documentElement.style.setProperty("--safe-bottom", "34px");
}

// index.html 의 부팅 감시자에게 "모듈은 실행됐다"고 알린다.
// 이게 안 찍히면 번들 로드 자체가 실패한 것이다.
declare global {
  interface Window {
    __moduleRan?: boolean;
    __bootOk?: boolean;
  }
}
window.__moduleRan = true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ErrorBoundary>
  </StrictMode>
);

// 네이티브 앱(Capacitor)은 번들에서 직접 서빙하므로 서비스 워커가 필요 없다.
// 오히려 캐시 우선 전략이 앱 업데이트 후 옛 화면을 물고 있을 수 있어 등록하지 않는다.
if ("serviceWorker" in navigator && !isNative) {
  window.addEventListener("load", () => {
    if (import.meta.env.PROD) {
      // 상대 경로로 등록해야 하위 경로 배포에서도 스코프가 맞는다.
      //
      // new URL("sw.js", import.meta.url) 을 쓰면 안 된다. 번들된 뒤에는
      // import.meta.url 이 /assets/index-<hash>.js 라서 /assets/sw.js 로
      // 풀리는데, 실제 파일은 루트에 있다. 404 를 .catch 가 삼켜서 서비스
      // 워커가 한 번도 등록되지 않은 채였다.
      // (HTTP LAN 접속처럼 보안 컨텍스트가 아니면 등록이 실패하지만, 앱 동작에는 지장이 없다.)
      navigator.serviceWorker
        .register(`${import.meta.env.BASE_URL}sw.js`)
        .catch(() => undefined);
      return;
    }
    navigator.serviceWorker
      .getRegistrations()
      .then(registrations => registrations.forEach(r => r.unregister()));
  });
}
