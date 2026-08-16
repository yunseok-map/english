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
import { sweepOrphanCards } from "@/state/migrate";
import {
  setPreferredVoice,
  setSpeechDialect,
  setSpeechEngine,
} from "@/lib/speech";
import { setHapticsEnabled } from "@/lib/haptics";
import { syncReminders } from "@/lib/notifications";
import { hideSplash, syncStatusBar } from "@/lib/native";
import {
  allLevelsLoaded,
  ensureLevels,
  onDataChange,
  prefetchRemainingLevels,
} from "@/data";

// tokens.css 의 --background 와 반드시 같은 값을 유지한다.
const THEME_COLOR = { light: "#f6f7f5", dark: "#101817" };

type AppContextValue = {
  app: AppState;
  ready: boolean;
  /** 해석된 다크 모드 여부 (system 설정 반영) */
  dark: boolean;
  /** 세 레벨 데이터가 모두 올라왔는지. 전체 검색·필터에서 참고한다. */
  fullData: boolean;
  update: (fn: (draft: AppState) => AppState) => void;
};

const AppStateContext = createContext<AppContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<AppState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);
  const [fullData, setFullData] = useState(false);
  const appRef = useRef(app);
  appRef.current = app;

  // 부팅: 저장 상태를 읽고 → 내 레벨 데이터만 불러오고 → 화면을 띄운다.
  // 나머지 레벨은 유휴 시간에 뒤에서 채운다.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const state = await loadState();
      // 데이터 청크 로드가 실패해도(네트워크·캐시 문제) 화면은 띄운다.
      // 여기서 막히면 사용자는 원인을 알 수 없는 흰 화면만 보게 된다.
      try {
        await ensureLevels([state.profile.level]);
      } catch (error) {
        console.error("학습 데이터 로드 실패", error);
      }
      if (cancelled) return;
      setApp(state);
      setReady(true);
      void hideSplash();
      try {
        prefetchRemainingLevels();
      } catch {
        /* 프리페치 실패는 화면 표시와 무관하다. */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 데이터 청크가 새로 올라오면 다시 그리고, 전부 모이면 고아 카드를 한 번 정리한다.
  useEffect(() => {
    const sync = () => {
      const complete = allLevelsLoaded();
      setFullData(complete);
      if (complete) setApp(prev => sweepOrphanCards(prev));
    };
    sync();
    return onDataChange(sync);
  }, []);

  // 레벨이 바뀌면(승급·재테스트) 해당 레벨 데이터를 확보한다.
  useEffect(() => {
    if (!ready) return;
    void ensureLevels([app.profile.level]);
  }, [app.profile.level, ready]);

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

  // TTS/ASR 다이얼렉트·엔진, 햅틱 on/off 동기화
  useEffect(() => {
    setSpeechDialect(app.settings.dialect);
  }, [app.settings.dialect]);
  useEffect(() => {
    setSpeechEngine(app.settings.speechEngine);
  }, [app.settings.speechEngine]);
  useEffect(() => {
    setPreferredVoice(app.settings.voiceURI);
  }, [app.settings.voiceURI]);
  useEffect(() => {
    setHapticsEnabled(app.settings.haptics);
  }, [app.settings.haptics]);

  // 복습 알림: 설정·시각·밀린 복습 수가 바뀔 때만 다시 건다.
  const dueSignature = Object.values(app.srs).filter(
    c => c.dueAt <= Date.now()
  ).length;
  useEffect(() => {
    if (!ready) return;
    void syncReminders(appRef.current);
  }, [
    ready,
    app.settings.notifyEnabled,
    app.settings.notifyHour,
    dueSignature,
  ]);

  const value = useMemo<AppContextValue>(
    () => ({ app, ready, dark, fullData, update: setApp }),
    [app, ready, dark, fullData]
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
