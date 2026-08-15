export type Tone = "friend" | "daily" | "business";
export type Dialect = "us" | "au";
export type Level = "A1" | "A2" | "B1";

export type Settings = {
  theme: "light" | "dark" | "system";
  fontScale: "normal" | "large";
  dialect: Dialect;
  rate: number;
  dailyNewWords: number;
  contractionMode: "paired" | "short" | "full";
  translationProvider:
    | "fallback"
    | "gemini"
    | "deepl"
    | "google"
    | "papago"
    | "mymemory";
  translationKey: string;
  llmProvider: "none" | "gemini" | "openai" | "anthropic" | "openrouter";
  llmKey: string;
  correctionLevel: "all" | "important" | "after";
  monthlyLimit: number;
};

export type SrsCard = {
  id: string;
  word: string;
  meaning: string;
  dueAt: number;
  interval: number;
  ease: number;
  repetitions: number;
  source: "word" | "sentence" | "mistake";
};

export type SavedPhrase = {
  id: string;
  ko: string;
  en: string;
  tone: Tone;
  createdAt: number;
};
export type Mistake = {
  id: string;
  type: "grammar" | "word" | "pronunciation";
  label: string;
  count: number;
  nextReview: number;
};
export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  correction?: string;
  hint?: string;
  createdAt: number;
};

export type PlacementRecord = {
  takenAt: string;
  correct: Record<Level, number>;
  total: number;
};

export type LevelEvent = {
  level: Level;
  at: string;
  source: "placement" | "retest" | "promotion" | "migrated";
};

export type Profile = {
  name: string;
  departureDate: string;
  level: Level;
  onboardingDone: boolean;
  placement?: PlacementRecord;
  levelHistory: LevelEvent[];
};

export type Stats = {
  learnedWords: number;
  minutes: number;
  streak: number;
  lastStudyDate: string;
  pronunciationScores: number[];
  grammarCorrect: number;
  grammarTotal: number;
  llmCalls: number;
  /** "YYYY-MM" — 달이 바뀌면 llmCalls를 리셋하기 위한 기준. */
  llmMonth: string;
  /** 학습한 날짜("YYYY-MM-DD") 최근 60일. 잔디/연속 학습 표시에 쓴다. */
  studyDates: string[];
};

export type AppState = {
  version: 2;
  profile: Profile;
  settings: Settings;
  srs: Record<string, SrsCard>;
  savedPhrases: SavedPhrase[];
  mistakes: Mistake[];
  completedLessons: string[];
  completedTasks: string[];
  /** 롤플레이까지 끝낸 회화팩 id */
  completedPacks: string[];
  /** 즐겨찾기한 단어 id */
  bookmarks: string[];
  translationCache: Record<string, string>;
  chat: ChatMessage[];
  stats: Stats;
};
