import type { Level } from "@/types";

/**
 * 레벨 상수만 따로 둔다.
 * `lib/level.ts` 는 데이터(@/data)를 참조하고 데이터 레지스트리는 레벨 순서를 참조하므로,
 * 한 파일에 두면 순환 참조가 된다.
 */
export const LEVEL_ORDER: Level[] = ["A1", "A2", "B1"];

export const LEVEL_LABEL: Record<Level, string> = {
  A1: "기초",
  A2: "생존",
  B1: "실전",
};

export const LEVEL_DESC: Record<Level, string> = {
  A1: "필수 표현부터 차근차근. 주문·길찾기·인사 같은 생존 영어를 다져요.",
  A2: "일상 거래를 혼자 해결해요. 셰어하우스·은행·알바 지원까지.",
  B1: "일터와 행정을 영어로 처리해요. 면접·계약·의료 상담까지.",
};

export function nextLevel(level: Level): Level | null {
  const index = LEVEL_ORDER.indexOf(level);
  return LEVEL_ORDER[index + 1] ?? null;
}
