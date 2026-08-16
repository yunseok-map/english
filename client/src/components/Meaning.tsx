import { SpeakLine } from "@/components/SpeakLine";

/**
 * 지문 해석.
 *
 * 답을 낸 뒤에만 쓴다. 문제를 푸는 동안 띄우면 "카드 단말기가 안 돼요.
 * 현금 있으세요?" 처럼 정답을 그대로 흘린다.
 *
 * 영어 문장과 한국어를 위아래로 붙여 둔다. 해석만 따로 떨어져 있으면 어느
 * 문장을 옮긴 것인지 눈으로 다시 이어 붙여야 한다.
 */
export function Meaning({
  en,
  ko,
  label = "지문 해석",
}: {
  en?: string;
  ko?: string;
  label?: string;
}) {
  if (!ko) return null;
  return (
    <div className="space-y-1 rounded-xl bg-accent/40 p-3">
      <span className="block text-[0.75rem] font-semibold text-muted-foreground">
        {label}
      </span>
      {en && <SpeakLine text={en} className="text-[0.875rem]" />}
      <p className="text-[0.875rem] leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
        {ko}
      </p>
    </div>
  );
}
