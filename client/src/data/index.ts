import type { WordEntry } from "@/data/types";

/**
 * 단어·문법은 레벨별로 쪼개 필요할 때 불러온다. `@/data/registry` 를 쓴다.
 * 여기서는 크기가 작거나 전 구간에서 항상 필요한 데이터만 정적으로 내보낸다.
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
  wordById,
  lessonById,
} from "@/data/registry";

export { PACKS } from "@/data/packs";
export { DICTATION } from "@/data/dictation";
export { PRONUNCIATION_COURSES } from "@/data/pronunciation";
export { CONTRACTIONS } from "@/data/tone";

/** 30문항 레벨 테스트. 온보딩에서만 필요해 초기 번들에서 뺀다. */
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
};
