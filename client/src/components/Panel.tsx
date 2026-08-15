import { cn } from "@/lib/utils";

/** 기본 카드 컨테이너. 화면 전반의 시각 단위. */
export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-card p-5 text-card-foreground",
        className
      )}
    >
      {children}
    </section>
  );
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

/**
 * 섹션 상단의 작은 라벨.
 * 영문은 모노체 + 넓은 자간으로, 한글은 기본 산세리프로 렌더링한다.
 * (한글에 자간을 벌리면 글자가 흩어져 보인다.)
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hasHangul = /[가-힣]/.test(textOf(children));
  return (
    <span
      className={cn(
        "text-[0.6875rem] font-semibold text-primary",
        hasHangul ? "tracking-normal" : "font-mono uppercase tracking-[0.14em]",
        className
      )}
    >
      {children}
    </span>
  );
}

/** 화면 안 섹션 제목. 오른쪽에 보조 정보(진도 등)를 둘 수 있다. */
export function SectionTitle({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-0.5">
      <h2 className="text-[1.0625rem] font-bold tracking-tight">{children}</h2>
      {aside && (
        <span className="shrink-0 font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
          {aside}
        </span>
      )}
    </div>
  );
}

export function Empty({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed bg-card/50 px-6 py-10 text-center">
      <span className="size-2.5 rounded-full bg-primary/60" aria-hidden />
      <strong className="text-[0.9375rem] font-semibold">{title}</strong>
      <p className="text-[0.875rem] text-muted-foreground">{text}</p>
      {action}
    </div>
  );
}
