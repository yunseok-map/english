import { Flame } from "lucide-react";
import { dayKey } from "@/lib/engine";

const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];

/** 최근 7일 학습 여부를 점으로 보여 주는 스트립. */
export function StreakStrip({
  studyDates,
  streak,
}: {
  studyDates: string[];
  streak: number;
}) {
  const done = new Set(studyDates);
  const days = Array.from({ length: 7 }, (_, i) => {
    const offset = 6 - i;
    const key = dayKey(offset);
    return {
      key,
      label: WEEKDAY[new Date(`${key}T00:00:00`).getDay()],
      studied: done.has(key),
      isToday: offset === 0,
    };
  });

  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-1 text-[var(--streak)]">
        <Flame size={17} strokeWidth={2.3} />
        <b className="font-mono text-[1.0625rem] font-bold tabular-nums">
          {streak}
        </b>
        <span className="text-[0.75rem] font-medium text-muted-foreground">
          일째
        </span>
      </span>
      <div className="ml-auto flex gap-1.5">
        {days.map(day => (
          <div key={day.key} className="flex flex-col items-center gap-1">
            <span
              className={`flex size-6 items-center justify-center rounded-full text-[0.625rem] font-bold transition-colors ${
                day.studied
                  ? "bg-[var(--streak)] text-white"
                  : day.isToday
                    ? "border-2 border-dashed border-[var(--streak)] text-muted-foreground"
                    : "bg-muted text-muted-foreground/60"
              }`}
            >
              {day.studied ? "✓" : ""}
            </span>
            <span
              className={`text-[0.625rem] ${day.isToday ? "font-bold text-foreground" : "text-muted-foreground"}`}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
