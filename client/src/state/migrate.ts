import type { AppState, Dialect, Level, LevelEvent, SrsCard } from "@/types";
import { DEFAULT_SETTINGS, DEFAULT_STATE, monthKey } from "@/state/defaults";
import { LESSON_IDS, WORD_IDS } from "@/data";

/**
 * 저장된 상태 블롭(버전 무관)을 현재 v2 형태로 정규화한다.
 * v1(콘텐츠 개편 이전) 상태는 옛 자동 생성 단어에 걸린 SRS 카드와
 * 존재하지 않는 강의 ID를 제거하되, 학습 기록(streak·통계·저장 문장)은 보존한다.
 */
export function migrateState(raw: unknown): AppState {
  if (!raw || typeof raw !== "object") return DEFAULT_STATE;
  const value = raw as Record<string, any>;
  try {
    if (value.version === 2) {
      return {
        ...DEFAULT_STATE,
        ...value,
        version: 2,
        profile: { ...DEFAULT_STATE.profile, ...value.profile },
        settings: { ...DEFAULT_SETTINGS, ...value.settings },
        stats: { ...DEFAULT_STATE.stats, ...value.stats },
      };
    }

    // ---- v1 → v2 ----
    const dialect: Dialect = value.settings?.voice === "au" ? "au" : "us";
    const level: Level =
      value.profile?.level === "A2"
        ? "A2"
        : value.profile?.level === "B1"
          ? "B1"
          : "A1";

    const srs: Record<string, SrsCard> = {};
    for (const [id, card] of Object.entries(
      (value.srs ?? {}) as Record<string, SrsCard>
    )) {
      if (!card || typeof card !== "object") continue;
      if (card.source === "word" && !WORD_IDS.has(id.replace(/^word-/, "")))
        continue;
      srs[id] = card;
    }

    const completedLessons = Array.isArray(value.completedLessons)
      ? value.completedLessons.filter(
          (id: unknown) => typeof id === "string" && LESSON_IDS.has(id)
        )
      : [];

    const levelHistory: LevelEvent[] = value.profile?.onboardingDone
      ? [{ level, at: new Date().toISOString(), source: "migrated" }]
      : [];

    const s = value.settings ?? {};
    return {
      version: 2,
      profile: {
        name:
          typeof value.profile?.name === "string"
            ? value.profile.name
            : DEFAULT_STATE.profile.name,
        departureDate:
          typeof value.profile?.departureDate === "string"
            ? value.profile.departureDate
            : DEFAULT_STATE.profile.departureDate,
        level,
        onboardingDone: !!value.profile?.onboardingDone,
        levelHistory,
      },
      settings: {
        ...DEFAULT_SETTINGS,
        theme:
          s.theme === "dark"
            ? "dark"
            : s.theme === "light"
              ? "light"
              : "system",
        fontScale: s.fontScale === "large" ? "large" : "normal",
        dialect,
        rate: typeof s.rate === "number" ? s.rate : DEFAULT_SETTINGS.rate,
        dailyNewWords: Math.min(
          20,
          Math.max(5, Number(s.dailyNewWords) || DEFAULT_SETTINGS.dailyNewWords)
        ),
        contractionMode: ["paired", "short", "full"].includes(s.contractionMode)
          ? s.contractionMode
          : "paired",
        translationProvider: [
          "fallback",
          "gemini",
          "deepl",
          "google",
          "papago",
          "mymemory",
        ].includes(s.translationProvider)
          ? s.translationProvider
          : "fallback",
        translationKey:
          typeof s.translationKey === "string" ? s.translationKey : "",
        llmProvider: [
          "none",
          "gemini",
          "openai",
          "anthropic",
          "openrouter",
        ].includes(s.llmProvider)
          ? s.llmProvider
          : "none",
        llmKey: typeof s.llmKey === "string" ? s.llmKey : "",
        correctionLevel: ["all", "important", "after"].includes(
          s.correctionLevel
        )
          ? s.correctionLevel
          : "important",
        monthlyLimit: Number(s.monthlyLimit) || DEFAULT_SETTINGS.monthlyLimit,
      },
      srs,
      savedPhrases: Array.isArray(value.savedPhrases) ? value.savedPhrases : [],
      mistakes: Array.isArray(value.mistakes) ? value.mistakes : [],
      completedLessons,
      completedTasks: Array.isArray(value.completedTasks)
        ? value.completedTasks
        : [],
      completedPacks: [],
      bookmarks: [],
      translationCache:
        value.translationCache && typeof value.translationCache === "object"
          ? value.translationCache
          : {},
      chat: Array.isArray(value.chat) ? value.chat : [],
      stats: {
        ...DEFAULT_STATE.stats,
        ...value.stats,
        llmCalls: Number(value.stats?.llmCalls) || 0,
        llmMonth: monthKey(),
      },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

/** 레벨 테스트를 아직 보지 않은 사용자(개편 이전 사용자 또는 테스트 건너뜀)에게 홈 배너를 노출한다. */
export function needsRetestBanner(state: AppState) {
  return (
    state.profile.onboardingDone &&
    !state.profile.placement &&
    !state.completedTasks.includes("dismiss-retest-banner")
  );
}
