import type { AppState, Settings } from "@/types";

export const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  fontScale: "normal",
  dialect: "us",
  rate: 0.85,
  dailyNewWords: 10,
  contractionMode: "paired",
  haptics: true,
  notifyEnabled: false,
  notifyHour: 20,
  speechEngine: "auto",
  translationProvider: "fallback",
  translationKey: "",
  llmProvider: "none",
  llmKey: "",
  correctionLevel: "important",
  monthlyLimit: 100,
};

export const DEFAULT_STATE: AppState = {
  version: 3,
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
    minutes: 0,
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
};

export function monthKey() {
  return new Date().toISOString().slice(0, 7);
}
