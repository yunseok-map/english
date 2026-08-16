import type {
  AppState,
  CardState,
  Dialect,
  Level,
  LevelEvent,
  SrsCard,
} from "@/types";
import { DEFAULT_SETTINGS, DEFAULT_STATE, monthKey } from "@/state/defaults";
import { allLevelsLoaded, words } from "@/data";

const DAY = 86400000;

/** SM-2(v2) 카드를 FSRS(v3) 카드로 옮긴다. 남은 간격은 그대로 존중한다. */
function toFsrsCard(raw: any, id: string): SrsCard | null {
  if (!raw || typeof raw !== "object") return null;
  const interval = Number(raw.interval) || 0;
  const repetitions = Number(raw.repetitions) || 0;
  const ease = Number(raw.ease) || 2.5;

  // 이미 v3 형태면 필드만 채워서 반환한다.
  if (typeof raw.stability === "number" && typeof raw.difficulty === "number") {
    return {
      id,
      word: String(raw.word ?? ""),
      meaning: String(raw.meaning ?? ""),
      dueAt: Number(raw.dueAt) || Date.now(),
      interval,
      stability: raw.stability,
      difficulty: raw.difficulty,
      reps: Number(raw.reps) || repetitions,
      lapses: Number(raw.lapses) || 0,
      lastReview: Number(raw.lastReview) || 0,
      state: (raw.state as CardState) ?? (interval > 0 ? "review" : "new"),
      source:
        raw.source === "sentence" ||
        raw.source === "mistake" ||
        raw.source === "custom"
          ? raw.source
          : "word",
    };
  }

  // stability 는 "간격만큼은 버틴다"고 보고 현재 간격을 그대로 쓴다.
  // difficulty 는 ease 가 낮을수록(=자주 틀림) 높게 잡는다. ease 2.5 → 5.
  const stability = Math.max(0.1, interval || 0.5);
  const difficulty = Math.min(10, Math.max(1, 5 + (2.5 - ease) * 4));
  const state: CardState =
    repetitions === 0 ? "new" : interval > 0 ? "review" : "learning";

  return {
    id,
    word: String(raw.word ?? ""),
    meaning: String(raw.meaning ?? ""),
    dueAt: Number(raw.dueAt) || Date.now(),
    interval,
    stability,
    difficulty,
    reps: repetitions,
    lapses: 0,
    lastReview: repetitions > 0 ? Date.now() - Math.min(interval, 30) * DAY : 0,
    state,
    source:
      raw.source === "sentence" ||
      raw.source === "mistake" ||
      raw.source === "custom"
        ? raw.source
        : "word",
  };
}

function migrateSrs(raw: unknown): Record<string, SrsCard> {
  const out: Record<string, SrsCard> = {};
  for (const [id, card] of Object.entries(
    (raw ?? {}) as Record<string, unknown>
  )) {
    const next = toFsrsCard(card, id);
    if (next) out[id] = next;
  }
  return out;
}

function migrateSettings(s: any) {
  return {
    ...DEFAULT_SETTINGS,
    theme:
      s?.theme === "dark" ? "dark" : s?.theme === "light" ? "light" : "system",
    fontScale: ["normal", "large", "xlarge"].includes(s?.fontScale)
      ? s.fontScale
      : "normal",
    dialect: (s?.dialect === "au" || s?.voice === "au"
      ? "au"
      : "us") as Dialect,
    rate: typeof s?.rate === "number" ? s.rate : DEFAULT_SETTINGS.rate,
    dailyNewWords: Math.min(
      20,
      Math.max(5, Number(s?.dailyNewWords) || DEFAULT_SETTINGS.dailyNewWords)
    ),
    contractionMode: ["paired", "short", "full"].includes(s?.contractionMode)
      ? s.contractionMode
      : "paired",
    haptics: typeof s?.haptics === "boolean" ? s.haptics : true,
    autoSpeak: typeof s?.autoSpeak === "boolean" ? s.autoSpeak : true,
    notifyEnabled:
      typeof s?.notifyEnabled === "boolean" ? s.notifyEnabled : false,
    notifyHour: Math.min(
      23,
      Math.max(0, Number(s?.notifyHour ?? DEFAULT_SETTINGS.notifyHour))
    ),
    speechEngine: ["auto", "native", "web"].includes(s?.speechEngine)
      ? s.speechEngine
      : "auto",
    voiceURI: typeof s?.voiceURI === "string" ? s.voiceURI : "",
    translationProvider: [
      "fallback",
      "gemini",
      "deepl",
      "google",
      "papago",
      "mymemory",
    ].includes(s?.translationProvider)
      ? s.translationProvider
      : "fallback",
    translationKey:
      typeof s?.translationKey === "string" ? s.translationKey : "",
    llmProvider: [
      "none",
      "gemini",
      "openai",
      "anthropic",
      "openrouter",
    ].includes(s?.llmProvider)
      ? s.llmProvider
      : "none",
    llmKey: typeof s?.llmKey === "string" ? s.llmKey : "",
    correctionLevel: ["all", "important", "after"].includes(s?.correctionLevel)
      ? s.correctionLevel
      : "important",
    monthlyLimit: Number(s?.monthlyLimit) || DEFAULT_SETTINGS.monthlyLimit,
  } as AppState["settings"];
}

/** 하다 만 세션 기록을 검증한다. 형태가 깨졌거나 오래됐으면 버린다. */
const RESUME_MAX_AGE = 3 * 86400000;
function migrateResume(raw: any): AppState["resume"] {
  if (!raw || typeof raw !== "object") return null;
  const savedAt = Number(raw.savedAt) || 0;
  if (!savedAt || Date.now() - savedAt > RESUME_MAX_AGE) return null;

  if (raw.kind === "grammar") {
    if (typeof raw.lessonId !== "string") return null;
    const answers: Record<number, number> = {};
    for (const [k, v] of Object.entries(raw.answers ?? {})) {
      if (Number.isInteger(Number(k)) && Number.isInteger(Number(v)))
        answers[Number(k)] = Number(v);
    }
    return { kind: "grammar", lessonId: raw.lessonId, answers, savedAt };
  }

  if (raw.kind === "words" || raw.kind === "mistakes") {
    const ids = Array.isArray(raw.ids)
      ? raw.ids.filter((id: unknown) => typeof id === "string")
      : [];
    if (ids.length === 0) return null;
    const index = Math.min(Math.max(0, Number(raw.index) || 0), ids.length - 1);
    // 끝난 세션은 이어 갈 게 없다.
    if (index >= ids.length) return null;
    const misses = Array.isArray(raw.misses)
      ? raw.misses
          .filter((m: any) => m && typeof m.label === "string")
          .map((m: any) => ({
            label: m.label,
            detail: typeof m.detail === "string" ? m.detail : undefined,
          }))
      : [];
    const common = {
      ids,
      index,
      correct: Math.max(0, Number(raw.correct) || 0),
      misses,
      elapsedMs: Math.max(0, Number(raw.elapsedMs) || 0),
      savedAt,
    };
    return raw.kind === "words"
      ? { kind: "words", mode: String(raw.mode || "card"), ...common }
      : { kind: "mistakes", ...common };
  }

  return null;
}

/**
 * 저장된 상태 블롭(버전 무관)을 현재 v4 형태로 정규화한다.
 * 학습 기록(streak·통계·저장 문장·SRS 진도)은 어떤 경로로도 보존한다.
 */
export function migrateState(raw: unknown): AppState {
  if (!raw || typeof raw !== "object") return DEFAULT_STATE;
  const value = raw as Record<string, any>;
  try {
    const level: Level = ["A1", "A2", "B1"].includes(value.profile?.level)
      ? value.profile.level
      : "A1";
    const onboardingDone = Boolean(value.profile?.onboardingDone);

    const levelHistory: LevelEvent[] = Array.isArray(
      value.profile?.levelHistory
    )
      ? value.profile.levelHistory
      : onboardingDone
        ? [{ level, at: new Date().toISOString(), source: "migrated" as const }]
        : [];

    return {
      ...DEFAULT_STATE,
      ...value,
      version: 4,
      profile: {
        ...DEFAULT_STATE.profile,
        ...value.profile,
        level,
        onboardingDone,
        levelHistory,
      },
      settings: migrateSettings(value.settings),
      srs: migrateSrs(value.srs),
      savedPhrases: Array.isArray(value.savedPhrases) ? value.savedPhrases : [],
      mistakes: Array.isArray(value.mistakes) ? value.mistakes : [],
      completedLessons: Array.isArray(value.completedLessons)
        ? value.completedLessons.filter((id: unknown) => typeof id === "string")
        : [],
      completedTasks: Array.isArray(value.completedTasks)
        ? value.completedTasks
        : [],
      completedPacks: Array.isArray(value.completedPacks)
        ? value.completedPacks
        : [],
      bookmarks: Array.isArray(value.bookmarks) ? value.bookmarks : [],
      translationCache:
        value.translationCache && typeof value.translationCache === "object"
          ? value.translationCache
          : {},
      chat: Array.isArray(value.chat) ? value.chat : [],
      resume: migrateResume(value.resume),
      myEntries: Array.isArray(value.myEntries)
        ? value.myEntries.filter(
            (e: any) =>
              e &&
              typeof e.id === "string" &&
              typeof e.en === "string" &&
              typeof e.ko === "string"
          )
        : [],
      stats: {
        ...DEFAULT_STATE.stats,
        ...value.stats,
        sessions: Array.isArray(value.stats?.sessions)
          ? value.stats.sessions.slice(-30)
          : [],
        llmCalls: Number(value.stats?.llmCalls) || 0,
        llmMonth:
          value.stats?.llmMonth === monthKey() ? monthKey() : monthKey(),
      },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

/**
 * 옛 자동 생성 콘텐츠에 걸려 있던 고아 SRS 카드를 정리한다.
 *
 * 단어 데이터를 레벨별로 나눠 불러오므로, 세 레벨이 모두 올라온 뒤에만
 * 안전하게 판단할 수 있다. (한 레벨만 보고 지우면 멀쩡한 카드를 날린다)
 */
export function sweepOrphanCards(state: AppState): AppState {
  if (!allLevelsLoaded()) return state;
  const ids = new Set(words().map(w => w.id));
  const srs: Record<string, SrsCard> = {};
  let removed = 0;
  for (const [id, card] of Object.entries(state.srs)) {
    // 내가 직접 넣은 단어는 데이터 파일에 없으니 고아로 오해하면 안 된다.
    if (card.source === "custom" || id.startsWith("word-my-")) {
      srs[id] = card;
      continue;
    }
    if (card.source === "word" && !ids.has(id.replace(/^word-/, ""))) {
      removed += 1;
      continue;
    }
    srs[id] = card;
  }
  return removed > 0 ? { ...state, srs } : state;
}

/** 레벨 테스트를 아직 보지 않은 사용자(개편 이전 사용자 또는 테스트 건너뜀)에게 홈 배너를 노출한다. */
export function needsRetestBanner(state: AppState) {
  return (
    state.profile.onboardingDone &&
    !state.profile.placement &&
    !state.completedTasks.includes("dismiss-retest-banner")
  );
}
