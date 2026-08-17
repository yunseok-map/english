import type { WordEntry } from "@/data/types";

/**
 * 콘텐츠는 전부 `@/data/registry` 를 통해 필요할 때 불러온다.
 * 단어·문법은 레벨별로, 회화팩·받아쓰기·발음은 한 덩어리로 묶여 있다.
 * 여기서 정적으로 내보내는 건 아주 작은 것(축약형)뿐이다.
 *
 * 레벨 테스트 문항(placement)은 온보딩·재테스트에서만 쓰므로 동적 로딩한다.
 */
export {
  ensureLevels,
  prefetchRemainingLevels,
  isLevelLoaded,
  allLevelsLoaded,
  onDataChange,
  dataRevision,
  words,
  lessons,
  ensureExtras,
  packs,
  dictation,
  pronunciationCourses,
} from "@/data/registry";

export { CONTRACTIONS } from "@/data/tone";

/**
 * 레벨 테스트 문항 풀(108문항). 한 회차에는 36문항만 뽑아 낸다.
 * 온보딩·재테스트에서만 필요해 초기 번들에서 뺀다.
 */
export async function loadPlacement() {
  return (await import("@/data/placement")).PLACEMENT_QUESTIONS;
}

export const TOPIC_LABEL: Record<WordEntry["topic"], string> = {
  airport: "공항·입국",
  housing: "숙소·셰어하우스",
  bank: "은행·행정",
  work: "일·구직",
  cafe: "카페·외식",
  shopping: "쇼핑",
  transport: "교통",
  health: "병원·약국",
  phone: "휴대폰·인터넷",
  emergency: "응급·안전",
  social: "친구·스몰토크",
  admin: "비자·서류",
  custom: "내가 추가",
};
