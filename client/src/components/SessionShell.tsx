import { X } from "lucide-react";
import { ProgressBar } from "@/components/Progress";

/** 학습 세션 공통 껍데기 — 진행 바 + 나가기. 모든 학습 화면이 같은 골격을 쓴다. */
export function SessionShell({
  label,
  step,
  total,
  onExit,
  children,
}: {
  label: string;
  step: number;
  total: number;
  onExit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          aria-label="세션 나가기"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <X size={16} />
        </button>
        <span className="ml-auto text-[0.8125rem] font-semibold">{label}</span>
        <span
          className="font-mono text-[0.8125rem] tabular-nums text-muted-foreground"
          aria-label={`${total}문항 중 ${step}번째`}
        >
          {step}/{total}
        </span>
      </div>
      <div className="text-primary">
        <ProgressBar ratio={total ? step / total : 0} />
      </div>
      {children}
    </div>
  );
}
