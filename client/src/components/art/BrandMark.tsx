/** 앱 로고 — 짙은 녹청 바탕 위의 학습 항로 마크. 외부 이미지 없이 인라인 SVG. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="워홀 영어 훈련 로고"
    >
      <rect x="2" y="2" width="44" height="44" rx="13" fill="#14312f" />
      <path
        d="M12 33c6-2 8-9 12-14s8-6 12-5"
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 6"
      />
      <circle cx="12" cy="33" r="3.5" fill="#d98324" />
      <path d="M33.5 10.5 40 14l-6.5 3.5 1.5-3.5z" fill="#eaf5f3" />
    </svg>
  );
}
