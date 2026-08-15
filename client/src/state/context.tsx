import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AppState } from "@/types";
import { DEFAULT_STATE } from "@/state/defaults";
import { loadState, saveState } from "@/lib/storage";
import { setSpeechDialect } from "@/lib/speech";
import { hideSplash, syncStatusBar } from "@/lib/native";

// tokens.css 의 --background 와 반드시 같은 값을 유지한다.
const THEME_COLOR = { light: "#f6f7f5", dark: "#101817" };

type AppContextValue = {
  app: AppState;
  ready: boolean;
  /** 해석된 다크 모드 여부 (system 설정 반영) */
  dark: boolean;
  update: (fn: (draft: AppState) => AppState) => void;
};

const AppStateContext = createContext<AppContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<AppState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);
  const appRef = useRef(app);
  appRef.current = app;

  useEffect(() => {
    loadState().then(state => {
      setApp(state);
      setReady(true);
      void hideSplash();
    });
  }, []);

  // 저장은 디바운스(400ms)로 묶고, 페이지 이탈 시 즉시 플러시한다.
  const saveTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!ready) return;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(
      () => void saveState(appRef.current),
      400
    );
    return () => window.clearTimeout(saveTimer.current);
  }, [app, ready]);
  useEffect(() => {
    if (!ready) return;
    const flush = () => {
      if (document.visibilityState === "hidden") void saveState(appRef.current);
    };
    document.addEventListener("visibilitychange", flush);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", flush);
      window.removeEventListener("pagehide", flush);
    };
  }, [ready]);

  // 테마: light / dark / system(matchMedia 추적) + theme-color 메타 동기화
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const isDark =
        app.settings.theme === "dark" ||
        (app.settings.theme === "system" && media.matches);
      document.documentElement.classList.toggle("dark", isDark);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          isDark ? THEME_COLOR.dark : THEME_COLOR.light
        );
      setDark(isDark);
      void syncStatusBar(isDark);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [app.settings.theme]);

  // 글자 크기 스케일
  useEffect(() => {
    document.documentElement.dataset.scale = app.settings.fontScale;
  }, [app.settings.fontScale]);

  // TTS/ASR 다이얼렉트 동기화
  useEffect(() => {
    setSpeechDialect(app.settings.dialect);
  }, [app.settings.dialect]);

  const value = useMemo<AppContextValue>(
    () => ({ app, ready, dark, update: setApp }),
    [app, ready, dark]
  );
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useApp must be used within AppStateProvider");
  return context;
}
