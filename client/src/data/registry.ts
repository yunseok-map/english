import type { Level } from "@/types";
import type { GrammarLesson, WordEntry } from "@/data/types";
import { LEVEL_ORDER } from "@/lib/levelOrder";

/**
 * 단어·문법 데이터를 레벨별 청크로 나눠 필요한 것만 불러온다.
 *
 * 세 레벨을 전부 번들에 박으면 A2 사용자도 A1·B1(합쳐 470KB 넘는 소스)을
 * 앱 시작마다 파싱한다. 부팅 때는 내 레벨만 불러 화면을 띄우고,
 * 나머지는 유휴 시간에 뒤에서 채운다.
 *
 * 한 번 불러온 뒤에는 동기 접근(`words()`, `lessons()`)이 가능하다.
 */
const chunkLoaders: Record<
  Level,
  () => Promise<{ words: WordEntry[]; lessons: GrammarLesson[] }>
> = {
  A1: async () => {
    const [w, g] = await Promise.all([
      import("@/data/words/a1"),
      import("@/data/grammar/a1"),
    ]);
    return { words: w.WORDS_A1, lessons: g.GRAMMAR_A1 };
  },
  A2: async () => {
    const [w, g] = await Promise.all([
      import("@/data/words/a2"),
      import("@/data/grammar/a2"),
    ]);
    return { words: w.WORDS_A2, lessons: g.GRAMMAR_A2 };
  },
  B1: async () => {
    const [w, g] = await Promise.all([
      import("@/data/words/b1"),
      import("@/data/grammar/b1"),
    ]);
    return { words: w.WORDS_B1, lessons: g.GRAMMAR_B1 };
  },
};

const loadedWords: Partial<Record<Level, WordEntry[]>> = {};
const loadedLessons: Partial<Record<Level, GrammarLesson[]>> = {};
const inFlight: Partial<Record<Level, Promise<void>>> = {};

// 평탄화한 배열은 렌더마다 다시 만들지 않도록 캐시하고, 청크가 늘 때만 새로 만든다.
let flatWords: WordEntry[] = [];
let flatLessons: GrammarLesson[] = [];
let wordIndex = new Map<string, WordEntry>();
let revision = 0;

function rebuild() {
  flatWords = LEVEL_ORDER.flatMap(level => loadedWords[level] ?? []);
  flatLessons = LEVEL_ORDER.flatMap(level => loadedLessons[level] ?? []);
  wordIndex = new Map(flatWords.map(w => [w.id, w]));
  revision += 1;
  listeners.forEach(fn => fn());
}

const listeners = new Set<() => void>();
/** 청크가 새로 로드되면 알린다. React 화면이 다시 그리도록 하는 용도. */
export function onDataChange(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export function dataRevision() {
  return revision;
}

export function isLevelLoaded(level: Level) {
  return Boolean(loadedWords[level]);
}
export function allLevelsLoaded() {
  return LEVEL_ORDER.every(isLevelLoaded);
}

export async function ensureLevels(levels: Level[]): Promise<void> {
  const pending = levels.filter(level => !loadedWords[level]);
  if (pending.length === 0) return;
  await Promise.all(
    pending.map(level => {
      if (!inFlight[level]) {
        inFlight[level] = chunkLoaders[level]().then(chunk => {
          loadedWords[level] = chunk.words;
          loadedLessons[level] = chunk.lessons;
          rebuild();
        });
      }
      return inFlight[level]!;
    })
  );
}

/** 남은 레벨을 유휴 시간에 채운다. 검색·필터가 전체 레벨을 훑을 수 있게 된다. */
export function prefetchRemainingLevels() {
  const rest = LEVEL_ORDER.filter(level => !loadedWords[level]);
  if (rest.length === 0) return;
  const run = () => void ensureLevels(rest);
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 1200);
  }
}

/** 지금까지 불러온 단어 전체. 로드 전에는 빈 배열이다. */
export function words() {
  return flatWords;
}
export function lessons() {
  return flatLessons;
}
export function wordById(id: string) {
  return wordIndex.get(id);
}
export function lessonById(id: string) {
  return flatLessons.find(l => l.id === id);
}
