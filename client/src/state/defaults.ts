import type { AppState, Settings } from "@/types";

export const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  fontScale: "normal",
  dialect: "us",
  rate: 0.95,
  dailyNewWords: 10,
  contractionMode: "paired",
  haptics: true,
  autoSpeak: true,
  notifyEnabled: false,
  notifyHour: 20,
  speechEngine: "auto",
  voiceUS: "",
  voiceAU: "",
  translationProvider: "fallback",
  translationKey: "",
  llmProvider: "none",
  llmKey: "",
  correctionLevel: "important",
  monthlyLimit: 100,
};

export const DEFAULT_STATE: AppState = {
  version: 4,
  profile: {
    name: "학습자",
    departureDate: "2027-02-05",
    level: "A1",
    onboardingDone: false,
    levelHistory: [],
  },
  settings: DEFAULT_SETTINGS,
  srs: {},
  savedPhrases: [],
  mistakes: [],
  completedLessons: [],
  completedTasks: [],
  completedPacks: [],
  bookmarks: [],
  translationCache: {},
  chat: [],
  stats: {
    learnedWords: 0,
    streak: 0,
    lastStudyDate: "",
    pronunciationScores: [],
    grammarCorrect: 0,
    grammarTotal: 0,
    llmCalls: 0,
    llmMonth: "",
    studyDates: [],
    sessions: [],
  },
  resume: null,
  myEntries: [],
};

/**
 * 이번 달("YYYY-MM"). 로컬 기준이다.
 *
 * toISOString() 은 UTC 라서 한국(UTC+9)에서는 매달 1일 오전 9시 전까지 지난달로
 * 잡힌다. 사용 한도가 하루 늦게 풀리는 셈이라 로컬 달력을 그대로 쓴다.
 */
export function monthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
