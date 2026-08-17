import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * 화면에 띄울 앱 버전.
 *
 * CI 는 태그 이름(v1.0.16 → 1.0.16)에서 버전을 만들어 IPA 에 박는데, 정작
 * 화면 어디에도 버전이 없어서 "지금 깔린 게 몇 버전인지"를 확인할 방법이
 * 없었다. 같은 값을 환경변수로 받아 설정 화면에 보여 준다.
 */
const APP_VERSION = process.env.APP_VERSION || "dev";

export default defineConfig({
  // 상대 경로로 빌드해야 정적 호스팅의 하위 경로(예: GitHub Pages)에서도 그대로 열린다.
  base: "./",
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // manualChunks 는 쓰지 않는다.
    //
    // 예전에 react / ui(@radix-ui, sonner) 로 갈라 놨더니, 어느 버킷에도 안 걸린
    // radix 의존 패키지(react-remove-scroll 등)가 react 청크로 흘러가면서
    // react ↔ ui 순환 import 가 생겼다. 순환이면 먼저 평가되는 쪽이 상대의
    // 바인딩을 undefined 로 보게 되는데, 진입 순서가 엔진마다 달라서
    // 크롬에서는 멀쩡하고 iOS(WKWebView)에서만 흰 화면으로 죽었다.
    //   TypeError: undefined is not an object (evaluating 'o.forwardRef')
    //
    // 화면·데이터는 동적 import 로 이미 쪼개져 있어 초기 로드 이득은 그대로다.
    // 청크 경계는 Rollup 이 의존 그래프를 보고 정하게 둔다.
    // (scripts/check-chunks.mjs 가 빌드 후 순환을 다시 검사한다)
    chunkSizeWarningLimit: 400,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
