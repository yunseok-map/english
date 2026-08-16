import { BookOpen, Bot, ClipboardCheck, Home, Languages } from "lucide-react";

export type Screen = "home" | "learn" | "converter" | "chat" | "profile";

const NAV: Array<{ id: Screen; label: string; icon: typeof Home }> = [
  { id: "home", label: "홈", icon: Home },
  { id: "learn", label: "학습", icon: BookOpen },
  { id: "converter", label: "변환기", icon: Languages },
  { id: "chat", label: "대화", icon: Bot },
  { id: "profile", label: "내 정보", icon: ClipboardCheck },
];

export function BottomNav({
  screen,
  onChange,
}: {
  screen: Screen;
  onChange: (next: Screen) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[var(--safe-bottom)] backdrop-blur-md">
      <div className="mx-auto grid h-16 w-full max-w-[640px] grid-cols-5">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = screen === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2.4 : 1.9} />
              <span
                className={`text-[0.6875rem] leading-none ${active ? "font-semibold" : "font-medium"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
