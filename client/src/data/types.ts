import type { Level, Tone } from "@/types";

/** 미국식이 기본값. 호주식 표기가 다를 때만 au를 채운다(철자·어휘·IPA). */
export type DialectText = { us: string; au?: string };

export type TopicId =
  | "airport"
  | "housing"
  | "bank"
  | "work"
  | "cafe"
  | "shopping"
  | "transport"
  | "health"
  | "phone"
  | "emergency"
  | "social"
  | "admin"
  /** 사용자가 직접 추가한 항목 */
  | "custom";

export type WordExample = { tone: Tone; en: DialectText; ko: string };

export type WordEntry = {
  id: string;
  level: Level;
  topic: TopicId;
  word: DialectText;
  /** 슬래시 없는 IPA 본문. 미국식(GA) 기본, 호주식 발음이 유의미하게 다르면 au 오버라이드. */
  ipa: DialectText;
  /** 한글 발음 힌트 (예: "어카머데이션") */
  hangul: string;
  meaning: string;
  nuance?: string;
  collocations: string[];
  /** friend / daily / business 각 1개, 총 3개. */
  examples: WordExample[];
  /** 호주에서만 쓰는 표현. US 모드에서는 usEquivalent를 함께 보여 준다. */
  auOnly?: boolean;
  usEquivalent?: string;
};

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type GrammarLesson = {
  id: string;
  level: Level;
  title: string;
  /** 한국어 화자가 헷갈리는 지점 요약 */
  koreanGap: string;
  /** 한국어 설명 문단 3~5개 */
  explanation: string[];
  examples: { en: DialectText; ko: string }[];
  quiz: QuizQuestion[];
  /** 변환기에서 결과 문장과 관련 강의를 연결하기 위한 선택적 패턴 */
  pattern?: RegExp;
};

export type PackLine = {
  speaker: "you" | "staff";
  en: DialectText;
  ko: string;
};

export type ConversationPack = {
  id: string;
  level: Level;
  title: string;
  scene: string;
  /** lucide 아이콘 이름 대신 이모지 한 글자 */
  icon: string;
  expressions: { en: DialectText; ko: string; note?: string }[];
  roleplay: PackLine[];
  auNotes?: string[];
};

export type DictationSentence = {
  id: string;
  level: Level;
  en: DialectText;
  ko: string;
  /** 청취 포인트 태그 (예: "연음", "축약", "과거형 어미") */
  focus: string;
};

export type PronunciationCourse = {
  id: string;
  title: string;
  /** 한국어 코칭 팁 */
  tip: string;
  /** 최소대립쌍 [왼쪽, 오른쪽] */
  pairs: [string, string][];
  sentences: DialectText[];
};

export type PlacementSection = "vocab" | "grammar" | "usage";

type PlacementBase = {
  id: string;
  band: Level;
  section: PlacementSection;
  question: string;
  /** 왜 그 답인지. 시험이 끝난 뒤 오답 설명지에 그대로 실린다. */
  explain: string;
};

/**
 * 레벨 테스트 문항.
 *
 * 4지선다만으로는 찍어서 25%가 그냥 들어온다. 밴드당 12문항으로 레벨을 가르는데
 * 그 정도 잡음이면 판정이 흔들린다. 그래서 찍을 수 없는 유형을 섞는다.
 *  - choice: 보기 4개 중 고르기 (기존 유형)
 *  - error : 문장을 네 토막으로 나눠 틀린 토막을 고르기. 보기가 문장의 일부라
 *            뜻만 대충 알아서는 못 고른다.
 *  - fill  : 보기 없이 직접 타이핑. 찍기가 아예 불가능하다.
 */
export type PlacementQuestion =
  | (PlacementBase & {
      kind?: "choice" | "error";
      options: string[];
      answer: number;
    })
  | (PlacementBase & {
      kind: "fill";
      /** 정답으로 인정할 표기들. 첫 번째를 대표 정답으로 보여 준다. */
      accept: string[];
      /** 철자를 통째로 묻는 게 아닐 때 주는 힌트(예: "b로 시작"). */
      hint?: string;
    });

export function isFillQuestion(
  question: PlacementQuestion
): question is Extract<PlacementQuestion, { kind: "fill" }> {
  return question.kind === "fill";
}

export type ContractionPair = { short: string; full: string };
