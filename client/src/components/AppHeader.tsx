import { Moon, Settings2, Sun } from "lucide-react";
import { useApp } from "@/state/context";
import { BrandMark } from "@/components/art/BrandMark";
import { DIALECT_SHORT } from "@/lib/dialect";
import { daysTo } from "@/lib/engine";
import type { Dialect } from "@/types";

function DialectToggle() {
  const { app, update } = useApp();
  const dialect = app.settings.dialect;
  const set = (d: Dialect) =>
    update(state => ({
      ...state,
      settings: { ...state.settings, dialect: d },
    }));
  return (
    <div
      className="flex items-center rounded-full bg-muted p-0.5"
      role="group"
      aria-label="영어 표기·발음 (미국식/호주식)"
    >
      {(["us", "au"] as const).map(d => (
        <button
          key={d}
          onClick={() => set(d)}
          aria-pressed={dialect === d}
          className={`min-h-7 rounded-full px-2.5 font-mono text-[0.6875rem] font-bold transition-colors ${
            dialect === d
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {DIALECT_SHORT[d]}
        </button>
      ))}
    </div>
  );
}

export function AppHeader({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { app, dark, update } = useApp();
  const days = daysTo(app.profile.departureDate);

  const toggleTheme = () =>
    update(state => ({
      ...state,
      settings: { ...state.settings, theme: dark ? "light" : "dark" },
    }));

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 pt-[var(--safe-top)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[640px] items-center gap-2 px-4">
        <BrandMark className="size-7 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9375rem] font-bold tracking-tight">
            워홀 영어
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.75rem] font-bold tabular-nums text-secondary-foreground">
          D-{days}
        </span>
        <DialectToggle />
        <button
          onClick={toggleTheme}
          aria-label={dark ? "밝은 모드로 전환" : "어두운 모드로 전환"}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={onOpenSettings}
          aria-label="설정 열기"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings2 size={18} />
        </button>
      </div>
    </header>
  );
}
