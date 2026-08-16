/** 홈 히어로 — 출발지→도착지 항로 라인아트. 테마 토큰을 따라가는 인라인 SVG. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="320" height="96" fill="url(#hero-sky)" rx="12" />
      <path
        d="M24 76C90 70 120 30 176 24s96 8 120 4"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 8"
      />
      <circle cx="24" cy="76" r="5" fill="currentColor" fillOpacity="0.85" />
      <circle
        cx="24"
        cy="76"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <path
        d="M288 20l14 7-14 7 3.5-7z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <circle cx="176" cy="24" r="3" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}
