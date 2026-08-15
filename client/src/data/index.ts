import type { GrammarLesson, WordEntry } from "@/data/types";
import { WORDS_A1 } from "@/data/words/a1";
import { WORDS_A2 } from "@/data/words/a2";
import { WORDS_B1 } from "@/data/words/b1";
import { GRAMMAR_A1 } from "@/data/grammar/a1";
import { GRAMMAR_A2 } from "@/data/grammar/a2";
import { GRAMMAR_B1 } from "@/data/grammar/b1";

export const WORDS: WordEntry[] = [...WORDS_A1, ...WORDS_A2, ...WORDS_B1];
export const GRAMMAR_LESSONS: GrammarLesson[] = [...GRAMMAR_A1, ...GRAMMAR_A2, ...GRAMMAR_B1];

export const WORD_IDS = new Set(WORDS.map((w) => w.id));
export const LESSON_IDS = new Set(GRAMMAR_LESSONS.map((l) => l.id));

export { PACKS } from "@/data/packs";
export { DICTATION } from "@/data/dictation";
export { PRONUNCIATION_COURSES } from "@/data/pronunciation";
export { PLACEMENT_QUESTIONS } from "@/data/placement";
export { CONTRACTIONS } from "@/data/tone";

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
