import type { AppState, Level, MyEntry, SrsCard } from "@/types";
import type { WordEntry } from "@/data/types";

/**
 * 직접 적어 넣은 단어·문장.
 *
 * 앱이 들고 있는 360단어 밖에도 외우고 싶은 게 생긴다(직장 용어, 셰어하우스 공고에
 * 나온 표현 같은 것). 여기서 만든 항목은 기존 단어와 똑같이 취급되어
 * 플래시카드·4지선다·스펠링 같은 학습 모드와 간격 반복 복습에 그대로 올라간다.
 *
 * 데이터 파일에 없는 id 라서 고아 카드 정리(sweepOrphanCards)가 지우지 않도록
 * SRS 카드의 source 를 "custom" 으로 두고 id 에 my- 접두어를 붙인다.
 */

export const MY_PREFIX = "my-";

/** 학습 화면이 그대로 쓸 수 있도록 기존 단어와 같은 모양으로 바꾼다. */
export function toWordEntry(entry: MyEntry, level: Level): WordEntry {
  return {
    id: `${MY_PREFIX}${entry.id}`,
    level,
    topic: "custom",
    word: { us: entry.en },
    ipa: { us: "" },
    hangul: "",
    meaning: entry.ko,
    collocations: [],
    // 문장으로 넣었으면 그 자체가 예문이다. 빈칸 채우기·말하기 모드가 성립한다.
    examples:
      entry.kind === "sentence"
        ? [{ tone: "daily" as const, en: { us: entry.en }, ko: entry.ko }]
        : [],
  };
}

export function myWordEntries(state: AppState): WordEntry[] {
  return state.myEntries.map(e => toWordEntry(e, state.profile.level));
}

export function srsKeyFor(entry: MyEntry) {
  return `word-${MY_PREFIX}${entry.id}`;
}

function newCard(entry: MyEntry): SrsCard {
  return {
    id: srsKeyFor(entry),
    word: entry.en,
    meaning: entry.ko,
    dueAt: Date.now(),
    interval: 0,
    stability: 0,
    difficulty: 5,
    reps: 0,
    lapses: 0,
    lastReview: 0,
    state: "new",
    source: "custom",
  };
}

/** 새 항목을 추가하고 복습 카드까지 만들어 준다. */
export function addMyEntry(
  state: AppState,
  input: { en: string; ko: string; kind: MyEntry["kind"] }
): AppState {
  const en = input.en.trim();
  const ko = input.ko.trim();
  if (!en || !ko) return state;
  // 같은 영어를 두 번 넣으면 복습만 두 배가 된다.
  if (state.myEntries.some(e => e.en.toLowerCase() === en.toLowerCase()))
    return state;

  const entry: MyEntry = {
    id: `${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`,
    kind: input.kind,
    en,
    ko,
    createdAt: Date.now(),
  };
  return {
    ...state,
    myEntries: [entry, ...state.myEntries],
    srs: { ...state.srs, [srsKeyFor(entry)]: newCard(entry) },
  };
}

export function removeMyEntry(state: AppState, id: string): AppState {
  const entry = state.myEntries.find(e => e.id === id);
  if (!entry) return state;
  const srs = { ...state.srs };
  delete srs[srsKeyFor(entry)];
  return {
    ...state,
    myEntries: state.myEntries.filter(e => e.id !== id),
    srs,
    bookmarks: state.bookmarks.filter(b => b !== `${MY_PREFIX}${entry.id}`),
  };
}
