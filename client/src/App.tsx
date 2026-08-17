import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { useApp } from "@/state/context";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav, type Screen } from "@/components/BottomNav";
import { InstallHint } from "@/components/InstallHint";
import { Transition } from "@/components/Transition";
import { stopSpeaking } from "@/lib/speech";
import { HomeScreen } from "@/screens/HomeScreen";
import type { LearnIntent, LearnSection } from "@/screens/learn/LearnScreen";

/**
 * 홈은 즉시 필요하니 정적으로 두고, 나머지 화면과 설정 다이얼로그는 지연 로딩한다.
 * 처음 화면이 뜨기까지 파싱해야 할 JS 가 그만큼 줄어든다.
 */
const LearnScreen = lazy(() =>
  import("@/screens/learn/LearnScreen").then(m => ({ default: m.LearnScreen }))
);
const ConverterScreen = lazy(() =>
  import("@/screens/ConverterScreen").then(m => ({
    default: m.ConverterScreen,
  }))
);
const ChatScreen = lazy(() =>
  import("@/screens/ChatScreen").then(m => ({ default: m.ChatScreen }))
);
const ProfileScreen = lazy(() =>
  import("@/screens/ProfileScreen").then(m => ({ default: m.ProfileScreen }))
);
const OnboardingScreen = lazy(() =>
  import("@/screens/OnboardingScreen").then(m => ({
    default: m.OnboardingScreen,
  }))
);
const SettingsDialog = lazy(() =>
  import("@/components/SettingsDialog").then(m => ({
    default: m.SettingsDialog,
  }))
);

function Spinner({ label = "불러오는 중" }: { label?: string }) {
  return (
    <div className="flex min-h-[40dvh] items-center justify-center">
      <span
        className="size-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent"
        role="status"
        aria-label={label}
      />
    </div>
  );
}

export default function App() {
  const { app, ready, dark } = useApp();
  const [screen, setScreen] = useState<Screen>("home");
  const [learnSection, setLearnSection] = useState<LearnSection>("words");
  const [learnIntent, setLearnIntent] = useState<LearnIntent | undefined>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [retest, setRetest] = useState(false);

  // 첫 커밋이 끝났다 = 흰 화면은 아니다. index.html 의 감시자를 해제한다.
  useEffect(() => {
    window.__bootOk = true;
  }, []);

  // 화면을 옮기면 읽던 것을 멈춘다. 예전에는 단어를 읽는 도중에 탭을 바꿔도
  // 소리가 끝까지 나서, 다음 화면과 겹쳐 들렸다.
  useEffect(() => {
    stopSpeaking();
  }, [screen]);

  // intent 는 홈의 오늘의 루트에서만 넘어온다. 탭을 직접 눌러 들어올 때는
  // 비어 있어야 해서, 학습 화면이 한 번 쓰고 나면 바로 비운다.
  const openLearn = (section: LearnSection, intent?: LearnIntent) => {
    setLearnSection(section);
    setLearnIntent(intent);
    setScreen("learn");
  };
  const startRetest = () => {
    setSettingsOpen(false);
    setRetest(true);
  };

  const toaster = (
    <Toaster
      position="top-center"
      theme={dark ? "dark" : "light"}
      offset="calc(var(--safe-top) + 12px)"
    />
  );

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <span
          className="size-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent"
          role="status"
          aria-label="불러오는 중"
        />
      </div>
    );
  }

  if (!app.profile.onboardingDone || retest) {
    return (
      <>
        <Suspense fallback={<Spinner label="레벨 테스트 준비 중" />}>
          <OnboardingScreen
            mode={retest ? "retest" : "initial"}
            onDone={() => setRetest(false)}
          />
        </Suspense>
        {toaster}
      </>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader onOpenSettings={() => setSettingsOpen(true)} />
      <main className="mx-auto w-full max-w-[640px] px-4 pb-[calc(88px+var(--safe-bottom))] pt-4">
        <Transition k={screen} direction="up">
          <Suspense fallback={<Spinner />}>
            {screen === "home" && (
              <>
                <InstallHint />
                <HomeScreen
                  openLearn={openLearn}
                  openScreen={setScreen}
                  startRetest={startRetest}
                />
              </>
            )}
            {screen === "learn" && (
              <LearnScreen
                section={learnSection}
                onSection={next => {
                  setLearnIntent(undefined);
                  setLearnSection(next);
                }}
                intent={learnIntent}
                onIntentDone={() => setLearnIntent(undefined)}
              />
            )}
            {screen === "converter" && (
              <ConverterScreen openLearn={openLearn} />
            )}
            {screen === "chat" && <ChatScreen />}
            {screen === "profile" && (
              <ProfileScreen
                startRetest={startRetest}
                openSettings={() => setSettingsOpen(true)}
              />
            )}
          </Suspense>
        </Transition>
      </main>
      <BottomNav screen={screen} onChange={setScreen} />
      {settingsOpen && (
        <Suspense fallback={null}>
          <SettingsDialog
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
            startRetest={startRetest}
          />
        </Suspense>
      )}
      {toaster}
    </div>
  );
}
