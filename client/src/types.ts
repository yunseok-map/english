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
  /**
   * 읽어 줄 목소리(voiceURI)를 표기별로 따로 둔다.
   *
   * 하나만 두면 US↔AU 를 오갈 때 골라 둔 목소리의 지역이 안 맞아 매번 자동
   * 선택으로 떨어진다. 그러면 호주식으로 바꿔도 미국 목소리가 읽는 일이 생긴다.
   * 빈 문자열이면 기기에서 가장 좋은 것을 고른다(미국 Zoe, 호주 Karen 우선).
   */
  voiceUS: string;
  voiceAU: string;
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
  source: "word" | "sentence" | "mistake" | "custom";
};

/** 사용자가 직접 적어 넣은 단어·문장. */
export type MyEntry = {
  id: string;
  kind: "word" | "sentence";
  /** 영어 원문 */
  en: string;
  /** 뜻 또는 한국어 해석 */
  ko: string;
  createdAt: number;
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

/** 한 문항의 채점 결과. 오답 설명지를 나중에 다시 열어 보려고 통째로 남긴다. */
export type PlacementAnswer = {
  questionId: string;
  band: Level;
  section: "vocab" | "grammar" | "usage";
  /** 문제 그대로. 문항 풀이 바뀌어도 지난 결과를 읽을 수 있게 복사해 둔다. */
  question: string;
  /** 내가 낸 답. 고르지 않고 넘기면 빈 문자열. */
  given: string;
  /** 정답 표기 */
  expected: string;
  correct: boolean;
  /** 지문의 한국어 해석. 답을 낸 뒤에만 보여 준다. */
  ko?: string;
  /** 정답 문장의 한국어 해석. */
  answerKo?: string;
  explain: string;
};

export type PlacementRecord = {
  takenAt: string;
  correct: Record<Level, number>;
  total: number;
  /** 밴드별 출제 수. 무작위 추출이라 회차마다 다를 수 있다. */
  asked?: Record<Level, number>;
  /** 영역별 정답/출제 수 */
  sections?: Record<
    "vocab" | "grammar" | "usage",
    { correct: number; total: number }
  >;
  /** 문항별 채점 결과(오답 설명지의 원본) */
  answers?: PlacementAnswer[];
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
  /**
   * 직전 회차에 낸 문항 id. 다음 회차에서 이걸 빼고 뽑아 같은 문제가 연달아
   * 나오지 않게 한다. 한 회차치만 들고 있으면 충분하다.
   */
  placementSeen?: string[];
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
  /** 직접 적어 넣은 단어·문장 */
  myEntries: MyEntry[];
};
