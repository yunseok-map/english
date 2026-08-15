import { useState } from "react";
import { Toaster } from "sonner";
import { useApp } from "@/state/context";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav, type Screen } from "@/components/BottomNav";
import { SettingsDialog } from "@/components/SettingsDialog";
import { InstallHint } from "@/components/InstallHint";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { LearnScreen, type LearnSection } from "@/screens/learn/LearnScreen";
import { ConverterScreen } from "@/screens/ConverterScreen";
import { ChatScreen } from "@/screens/ChatScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";

export default function App() {
  const { app, ready, dark } = useApp();
  const [screen, setScreen] = useState<Screen>("home");
  const [learnSection, setLearnSection] = useState<LearnSection>("words");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [retest, setRetest] = useState(false);

  const openLearn = (section: LearnSection) => {
    setLearnSection(section);
    setScreen("learn");
  };
  const startRetest = () => {
    setSettingsOpen(false);
    setRetest(true);
  };

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <span
          className="size-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent"
          aria-label="불러오는 중"
        />
      </div>
    );
  }

  if (!app.profile.onboardingDone || retest) {
    return (
      <>
        <OnboardingScreen
          mode={retest ? "retest" : "initial"}
          onDone={() => setRetest(false)}
        />
        <Toaster
          position="top-center"
          theme={dark ? "dark" : "light"}
          offset="calc(var(--safe-top) + 12px)"
        />
      </>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader onOpenSettings={() => setSettingsOpen(true)} />
      <main className="mx-auto w-full max-w-[640px] px-4 pb-[calc(88px+var(--safe-bottom))] pt-4">
        {screen === "home" && <InstallHint />}
        {screen === "home" && (
          <HomeScreen
            openLearn={openLearn}
            openScreen={setScreen}
            startRetest={startRetest}
          />
        )}
        {screen === "learn" && (
          <LearnScreen section={learnSection} onSection={setLearnSection} />
        )}
        {screen === "converter" && <ConverterScreen openLearn={openLearn} />}
        {screen === "chat" && <ChatScreen />}
        {screen === "profile" && (
          <ProfileScreen
            startRetest={startRetest}
            openSettings={() => setSettingsOpen(true)}
          />
        )}
      </main>
      <BottomNav screen={screen} onChange={setScreen} />
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        startRetest={startRetest}
      />
      <Toaster
        position="top-center"
        theme={dark ? "dark" : "light"}
        offset="calc(var(--safe-top) + 12px)"
      />
    </div>
  );
}
