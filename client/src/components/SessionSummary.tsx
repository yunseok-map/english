import { useEffect } from "react";
import { Flame, RotateCcw, Target, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/Progress";
import { haptic } from "@/lib/haptics";

export type SummaryMiss = {
  label: string;
  detail?: string;
  /** 어떤 항목이었는지. "틀린 것만 다시 풀기"가 이 값으로 문제를 다시 찾는다. */
  id?: string;
};

/**
 * 세션이 끝난 뒤 보여 주는 결과 화면.
 *
 * 예전에는 토스트 한 줄로 끝났다. 무엇을 얼마나 했는지, 언제 다시 보게 되는지가
 * 남지 않으면 다음 세션을 시작할 이유가 약해진다.
 */
export function SessionSummary({
  title,
  correct,
  total,
  seconds,
  streak,
  nextReviewLabel,
  misses = [],
  onRetryMisses,
  onDone,
}: {
  title: string;
  correct: number;
  total: number;
  seconds: number;
  streak: number;
  nextReviewLabel?: string;
  misses?: SummaryMiss[];
  onRetryMisses?: () => void;
  onDone: () => void;
}) {
  const ratio = total ? correct / total : 0;
  const percent = Math.round(ratio * 100);

  useEffect(() => {
    haptic.heavy();
  }, []);

  const verdict =
    percent >= 90
      ? "완벽해요"
      : percent >= 70
        ? "잘하고 있어요"
        : percent >= 50
          ? "절반은 잡았어요"
          : "오늘은 워밍업";

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-3 rounded-3xl border bg-card px-5 py-8 text-center shadow-[0_2px_10px_rgba(20,40,38,0.05)]">
        <p className="text-[0.8125rem] font-medium text-muted-foreground">
          {title} 완료
        </p>
        <div className="text-primary">
          <ProgressRing value={correct} total={Math.max(1, total)} size={116}>
            <span className="font-mono text-[1.5rem] font-bold tabular-nums">
              {percent}%
            </span>
          </ProgressRing>
        </div>
        <h2 className="text-[1.375rem] font-bold tracking-tight">{verdict}</h2>
        <p className="text-[0.875rem] text-muted-foreground">
          {total}문항 중 <b className="font-mono text-foreground">{correct}</b>
          개 정답
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat icon={Target} label="정답" value={`${correct}/${total}`} />
        <Stat icon={Timer} label="걸린 시간" value={formatDuration(seconds)} />
        <Stat icon={Flame} label="연속" value={`${streak}일`} />
      </div>

      {nextReviewLabel && (
        <p className="rounded-2xl bg-accent/50 px-4 py-3 text-center text-[0.8125rem] text-accent-foreground">
          다음 복습은 <b>{nextReviewLabel}</b> 뒤에 다시 만나요.
        </p>
      )}

      {misses.length > 0 && (
        <section className="space-y-2">
          <p className="text-[0.8125rem] font-semibold">
            틀린 것 {misses.length}개
          </p>
          <ul className="overflow-hidden rounded-2xl border bg-card">
            {misses.map((miss, i) => (
              <li
                key={`${miss.label}-${i}`}
                className={`px-4 py-2.5 text-[0.875rem] ${i > 0 ? "border-t" : ""}`}
              >
                <span className="font-mono font-medium">{miss.label}</span>
                {miss.detail && (
                  <span className="block text-[0.8125rem] text-muted-foreground">
                    {miss.detail}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-[0.75rem] text-muted-foreground">
            틀린 항목은 오답 노트에 담겼어요. 내일 오늘의 루트에 다시 나옵니다.
          </p>
        </section>
      )}

      <div className="grid gap-2">
        {misses.length > 0 && onRetryMisses && (
          <Button variant="outline" size="lg" onClick={onRetryMisses}>
            <RotateCcw size={16} /> 틀린 것만 다시 풀기
          </Button>
        )}
        <Button size="lg" onClick={onDone}>
          완료
        </Button>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border bg-card px-2 py-3.5">
      <Icon size={16} className="text-muted-foreground" />
      <span className="font-mono text-[0.9375rem] font-bold tabular-nums">
        {value}
      </span>
      <span className="text-[0.6875rem] text-muted-foreground">{label}</span>
    </div>
  );
}

export function formatDuration(seconds: number) {
  if (seconds < 60) return `${Math.max(1, Math.round(seconds))}초`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return rest === 0 ? `${minutes}분` : `${minutes}분 ${rest}초`;
}
