import { useEffect, useRef, useState } from "react";

/**
 * 화면·세션 전환 애니메이션.
 *
 * framer-motion(gzip 50KB 남짓)을 쓰지 않고 CSS 만으로 처리한다.
 * 학습 앱에서 필요한 전환은 "부드럽게 밀려 들어온다" 정도라 그 값을 치를 이유가 없다.
 * `prefers-reduced-motion` 은 base.css 에서 전역으로 끈다.
 */
export function Transition({
  k,
  direction = "up",
  className = "",
  children,
}: {
  /** 이 값이 바뀌면 다시 재생된다. */
  k: string | number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
  children: React.ReactNode;
}) {
  const [key, setKey] = useState(k);
  const [playing, setPlaying] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setKey(k);
      return;
    }
    setKey(k);
    setPlaying(true);
    const timer = window.setTimeout(() => setPlaying(false), 240);
    return () => window.clearTimeout(timer);
  }, [k]);

  return (
    <div
      key={String(key)}
      data-enter={playing ? direction : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
