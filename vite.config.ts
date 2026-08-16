import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // 상대 경로로 빌드해야 정적 호스팅의 하위 경로(예: GitHub Pages)에서도 그대로 열린다.
  base: "./",
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
    // 화면·데이터는 동적 import 로 이미 쪼개져 있다. 여기서는 잘 안 바뀌는
    // 라이브러리를 따로 떼어 캐시 적중률을 올린다.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("react-dom") ||
            id.includes("/react/") ||
            id.includes("scheduler")
          ) {
            return "react";
          }
          if (id.includes("@radix-ui") || id.includes("sonner")) return "ui";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("@capacitor")) return "native";
        },
      },
    },
    chunkSizeWarningLimit: 400,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
