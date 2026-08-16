export type Tone = "friend" | "daily" | "business";
export type Dialect = "us" | "au";
export type Level = "A1" | "A2" | "B1";

export type Settings = {
  theme: "light" | "dark" | "system";
  fontScale: "normal" | "large" | "xlarge";
  dialect: Dialect;
  rate: number;
  dailyNewWords: number;
  contractionMode: "paired" | "short" | "full";
  /** 정답·오답에 진동 피드백을 준다. (네이티브 앱에서만 동작) */
  haptics: boolean;
  /** 영어 단어·문장이 화면에 나오면 자동으로 읽어 준다. */
  autoSpeak: boolean;
  /** 복습 알림 사용 여부와 시각(0~23시). */
  notifyEnabled: boolean;
  notifyHour: number;
  /** 음성 인식 엔진. auto = 네이티브 우선, 없으면 브라우저. */
  speechEngine: "auto" | "native" | "web";
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

/** FSRS 카드 상태. new → learning → review, 실패하면 relearning. */
export type CardState = "new" | "learning" | "review" | "relearning";

export type SrsCard = {
  id: string;
  word: string;
  meaning: string;
  dueAt: number;
  /** 다음 복습까지 예정된 일수. 승급 판정과 화면 표시에 쓴다. */
  interval: number;
  /** FSRS 기억 안정성(일). 클수록 오래 간다. */
  stability: number;
  /** FSRS 난이도 1~10. 클수록 자주 봐야 한다. */
  difficulty: number;
  reps: number;
  lapses: number;
  /** 마지막 복습 시각(ms). 0이면 아직 안 봤다. */
  lastReview: number;
  state: CardState;
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
  /** 오늘의 루트에 다시 낼 때 쓰는 원본 정보 */
  answer?: string;
  hint?: string;
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
  /** 승급 제안을 마지막으로 띄운 날("YYYY-MM-DD"). 하루에 한 번만 권한다. */
  promotionOfferedOn?: string;
};

/** 한 번의 학습 세션 결과. 요약 화면과 추이 그래프에 쓴다. */
export type SessionKind =
  | "words"
  | "review"
  | "grammar"
  | "pack"
  | "dictation"
  | "pronunciation"
  | "speak";

export type SessionRecord = {
  at: number;
  kind: SessionKind;
  total: number;
  correct: number;
  seconds: number;
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
  /** 최근 세션 30개. */
  sessions: SessionRecord[];
};

/** 세션 요약·이어하기에서 함께 쓰는 오답 한 줄. */
export type MissRecord = { label: string; detail?: string };

/**
 * 하다 만 학습을 이어 가기 위한 지점. 한 칸만 유지한다.
 * 다른 세션을 새로 시작하면 덮어쓴다 — "마지막에 하던 것"만 이어 간다.
 */
export type ResumePoint =
  | {
      kind: "words";
      /** card | choice | typing | cloze | speak | dictation */
      mode: string;
      /** 단어 id 또는 받아쓰기 문장 id. 복원할 때 데이터에서 다시 찾는다. */
      ids: string[];
      index: number;
      correct: number;
      misses: MissRecord[];
      /** 지금까지 걸린 시간. 이어 해도 통계가 튀지 않게 누적한다. */
      elapsedMs: number;
      savedAt: number;
    }
  | {
      kind: "grammar";
      lessonId: string;
      /** 문항 번호 → 고른 보기 번호 */
      answers: Record<number, number>;
      savedAt: number;
    }
  | {
      kind: "mistakes";
      ids: string[];
      index: number;
      correct: number;
      misses: MissRecord[];
      elapsedMs: number;
      savedAt: number;
    };

export type AppState = {
  version: 4;
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
  /** 하다 만 세션. 없으면 null. */
  resume: ResumePoint | null;
};
