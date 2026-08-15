import { daysTo } from "@/lib/engine";

export function Dday({ date }: { date: string }) {
  const days = daysTo(date);
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-secondary-foreground">
      <span className="text-[0.625rem] font-medium tracking-wide text-secondary-foreground/70">출국</span>
      <b className="font-mono text-[0.875rem] font-semibold tabular-nums">D-{days}</b>
    </span>
  );
}
