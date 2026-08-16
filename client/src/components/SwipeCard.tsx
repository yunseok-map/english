import { useRef, useState } from "react";
import { haptic } from "@/lib/haptics";

const THRESHOLD = 84;

/**
 * 좌우 스와이프로 답하는 플래시카드.
 *
 * 버튼만 있으면 한 장에 두 번(뒤집기 + 판정) 손가락을 옮겨야 한다.
 * 스와이프를 붙이면 엄지 하나로 계속 넘길 수 있어 세션 속도가 확 달라진다.
 * 버튼도 그대로 두어 접근성과 학습 곡선을 해치지 않는다.
 */
export function SwipeCard({
  onSwipeLeft,
  onSwipeRight,
  leftLabel,
  rightLabel,
  disabled,
  children,
}: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  leftLabel: string;
  rightLabel: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const [dx, setDx] = useState(0);
  const [settling, setSettling] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const passedThreshold = useRef(false);
  // 세로 스크롤 제스처를 가로채지 않도록 방향이 정해질 때까지 판단을 미룬다.
  const axis = useRef<"none" | "x" | "y">("none");

  const reset = () => {
    start.current = null;
    axis.current = "none";
    passedThreshold.current = false;
  };

  const finish = (direction: -1 | 0 | 1) => {
    if (direction === 0) {
      setSettling(true);
      setDx(0);
      window.setTimeout(() => setSettling(false), 180);
      return;
    }
    setSettling(true);
    setDx(direction * 520);
    window.setTimeout(() => {
      setDx(0);
      setSettling(false);
      if (direction < 0) onSwipeLeft();
      else onSwipeRight();
    }, 160);
  };

  const ratio = Math.min(1, Math.abs(dx) / THRESHOLD);

  return (
    <div className="relative select-none">
      {/* 방향 힌트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-6"
      >
        <span
          className="rounded-full bg-destructive/12 px-3 py-1 font-mono text-[0.75rem] font-bold text-destructive transition-opacity"
          style={{ opacity: dx < 0 ? ratio : 0 }}
        >
          {leftLabel}
        </span>
        <span
          className="rounded-full bg-primary/12 px-3 py-1 font-mono text-[0.75rem] font-bold text-primary transition-opacity"
          style={{ opacity: dx > 0 ? ratio : 0 }}
        >
          {rightLabel}
        </span>
      </div>

      <div
        className="touch-pan-y"
        style={{
          transform: `translateX(${dx}px) rotate(${dx / 28}deg)`,
          transition: settling ? "transform 160ms ease-out" : "none",
          opacity: settling && Math.abs(dx) > 100 ? 0 : 1,
        }}
        onPointerDown={e => {
          if (disabled) return;
          start.current = { x: e.clientX, y: e.clientY };
          axis.current = "none";
          passedThreshold.current = false;
        }}
        onPointerMove={e => {
          if (disabled || !start.current) return;
          const deltaX = e.clientX - start.current.x;
          const deltaY = e.clientY - start.current.y;
          if (axis.current === "none") {
            if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
            axis.current = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
          }
          if (axis.current !== "x") return;
          setDx(deltaX);
          const passed = Math.abs(deltaX) >= THRESHOLD;
          if (passed !== passedThreshold.current) {
            passedThreshold.current = passed;
            if (passed) haptic.selection();
          }
        }}
        onPointerUp={() => {
          if (disabled || !start.current) return;
          const settled = axis.current === "x" ? dx : 0;
          reset();
          finish(settled <= -THRESHOLD ? -1 : settled >= THRESHOLD ? 1 : 0);
        }}
        onPointerCancel={() => {
          reset();
          finish(0);
        }}
      >
        {children}
      </div>
    </div>
  );
}
