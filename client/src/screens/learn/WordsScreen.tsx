import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Headphones,
  Keyboard,
  Mic,
  Search,
  SlidersHorizontal,
  SquareDashed,
  Star,
  Volume2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel, SectionTitle, Empty } from "@/components/Panel";
import { ProgressBar } from "@/components/Progress";
import { SessionShell } from "@/components/SessionShell";
import { SessionSummary, type SummaryMiss } from "@/components/SessionSummary";
import { SwipeCard } from "@/components/SwipeCard";
import { Transition } from "@/components/Transition";
import { SpeakButton } from "@/components/SpeakButton";
import { WordDetail } from "@/screens/learn/WordDetail";
import { MyWordsPanel } from "@/screens/learn/MyWordsPanel";
import { useApp } from "@/state/context";
import {
  TOPIC_LABEL,
  dataRevision,
  dictation as allDictation,
  words as allWords,
} from "@/data";
import type { DictationSentence, TopicId, WordEntry } from "@/data/types";
import {
  createWordCard,
  dueCards,
  normalize,
  recordSession,
  recordStudy,
} from "@/lib/engine";
import { gradeFor, intervalPreview, reviewCard, type Rating } from "@/lib/fsrs";
import { scorePronunciation } from "@/lib/phonetics";
import { dt, showsHangulHint } from "@/lib/dialect";
import { speak } from "@/lib/speech";
import { useAutoSpeak } from "@/lib/autoSpeak";
import { myWordEntries } from "@/lib/myEntries";
import {
  clearResumeRequest,
  dropResume,
  hasResumeRequest,
  putResume,
  resumeFor,
} from "@/lib/resume";
import { haptic } from "@/lib/haptics";
import { LEVEL_LABEL, LEVEL_ORDER } from "@/lib/level";
import { clearMistake, noteMistake, routeTaskKey } from "@/lib/route";
import type { LearnIntent } from "@/screens/learn/LearnScreen";
import type { Level } from "@/types";

type SessionMode =
  | "card"
  | "choice"
  | "typing"
  | "dictation"
  | "speak"
  | "cloze";

const MODES: Array<{
  id: SessionMode;
  label: string;
  icon: typeof BookOpen;
  hint: string;
}> = [
  { id: "card", label: "플래시카드", icon: BookOpen, hint: "뜻 보고 떠올리기" },
  { id: "choice", label: "4지선다", icon: CircleHelp, hint: "빠르게 확인" },
  { id: "typing", label: "스펠링", icon: Keyboard, hint: "직접 써 보기" },
  {
    id: "cloze",
    label: "빈칸 채우기",
    icon: SquareDashed,
    hint: "문장 속에서",
  },
  { id: "speak", label: "말하기", icon: Mic, hint: "소리 내 연습" },
  { id: "dictation", label: "받아쓰기", icon: Headphones, hint: "듣고 적기" },
];

const MODE_LABEL: Record<SessionMode, string> = Object.fromEntries(
  MODES.map(m => [m.id, m.label])
) as Record<SessionMode, string>;

/** 홈에서 누른 학습 → 바로 시작할 모드. 새 단어·복습은 둘 다 플래시카드다. */
const INTENT_MODE: Record<LearnIntent, SessionMode> = {
  words: "card",
  review: "card",
  speak: "speak",
  dictation: "dictation",
};

type Filters = {
  levels: Level[];
  topic: TopicId | "all";
  bookmarked: boolean;
  unlearned: boolean;
  missed: boolean;
};

export function WordsScreen({
  intent,
  onIntentDone,
}: {
  /** 홈에서 특정 학습을 눌러 들어왔으면 그 모드로 바로 시작한다. */
  intent?: LearnIntent;
  onIntentDone?: () => void;
} = {}) {
  const { app, update, fullData } = useApp();
  const dialect = app.settings.dialect;

  // 렌더마다 SRS 전체를 훑지 않도록 메모이즈한다. 카드가 쌓일수록 차이가 커진다.
  const due = useMemo(() => dueCards(app), [app.srs]);
  // 직접 적어 넣은 항목도 기본 단어와 같은 풀에 넣는다. 그래야 브라우즈·필터·
  // 모든 학습 모드·복습 대기열이 따로 손대지 않아도 그대로 동작한다.
  const myPool = useMemo(
    () => myWordEntries(app),
    [app.myEntries, app.profile.level]
  );
  const pool = useMemo(
    () => (myPool.length ? [...allWords(), ...myPool] : allWords()),
    [myPool, dataRevision(), fullData]
  );
  const newWords = useMemo(
    () =>
      pool
        .filter(w => w.level === app.profile.level && !app.srs[`word-${w.id}`])
        .slice(0, app.settings.dailyNewWords),
    [pool, app.profile.level, app.srs, app.settings.dailyNewWords]
  );

  const [mode, setMode] = useState<SessionMode | null>(null);
  const [session, setSession] = useState<{
    words: WordEntry[];
    hadReview: boolean;
  } | null>(null);
  const [dictationSet, setDictationSet] = useState<DictationSentence[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [misses, setMisses] = useState<SummaryMiss[]>([]);
  const [summary, setSummary] = useState<{
    title: string;
    mode: SessionMode;
    correct: number;
    total: number;
    seconds: number;
    misses: SummaryMiss[];
    nextReviewLabel?: string;
  } | null>(null);

  const startedAt = useRef(Date.now());
  const shownAt = useRef(Date.now());
  useEffect(() => {
    shownAt.current = Date.now();
  }, [index, mode]);

  // 탐색(브라우즈) — 조건을 조합해서 건다.
  const [filters, setFilters] = useState<Filters>({
    levels: [app.profile.level],
    topic: "all",
    bookmarked: false,
    unlearned: false,
    missed: false,
  });
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const missedIds = useMemo(
    () =>
      new Set(
        app.mistakes
          .filter(m => m.type === "word")
          .map(m => m.id.replace(/^word-/, ""))
      ),
    [app.mistakes]
  );

  // 훅은 조건부 return 앞에 모아 둔다. 세션 화면으로 분기한 뒤에 useMemo 를 부르면
  // 렌더마다 훅 개수가 달라져 React 가 터진다.
  const q = query.trim().toLowerCase();
  const browseWords = useMemo(
    () =>
      pool.filter(w => {
        if (filters.bookmarked && !app.bookmarks.includes(w.id)) return false;
        if (filters.unlearned && app.srs[`word-${w.id}`]) return false;
        if (filters.missed && !missedIds.has(w.id)) return false;
        if (filters.levels.length && !filters.levels.includes(w.level))
          return false;
        if (filters.topic !== "all" && w.topic !== filters.topic) return false;
        if (q) {
          return (
            w.word.us.toLowerCase().includes(q) ||
            (w.word.au ?? "").toLowerCase().includes(q) ||
            w.meaning.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [pool, filters, q, app.bookmarks, app.srs, missedIds]
  );

  // ---- 자동 발음 ----
  // 영어가 화면에 나타나는 순간 읽어 준다. 단, 답을 맞혀야 하는 화면
  // (철자 쓰기·빈칸 채우기, 뒤집기 전 카드)에서는 정답을 흘리므로 부르지 않는다.
  const shownWord = session?.words[index];
  const shownExample = shownWord?.examples[0];
  const autoSpeakText =
    mode === "dictation"
      ? dictationSet[index]
        ? dt(dictationSet[index].en, dialect)
        : null
      : !shownWord
        ? null
        : mode === "card"
          ? revealed
            ? dt(shownWord.word, dialect)
            : null
          : mode === "choice"
            ? dt(shownWord.word, dialect)
            : mode === "speak"
              ? shownExample
                ? dt(shownExample.en, dialect)
                : dt(shownWord.word, dialect)
              : null;
  useAutoSpeak(autoSpeakText, {
    enabled: app.settings.autoSpeak,
    rate: app.settings.rate,
  });

  // ---- 이어하기 저장 ----
  // 문항을 넘길 때마다 진행 지점을 남긴다. 앱을 끄거나 탭을 옮겨도 살아남는다.
  // deps 를 [mode, index, summary] 로 좁혀 둔 건 update() 로 인한 재렌더에서
  // 다시 돌지 않게 하기 위해서다. correctCount·misses 는 index 와 같은 배치에서
  // 갱신되므로 이 시점에 이미 최신 값이다.
  useEffect(() => {
    if (!mode || summary) return;
    const ids =
      mode === "dictation"
        ? dictationSet.map(d => d.id)
        : (session?.words.map(w => w.id) ?? []);
    if (ids.length === 0) return;
    update(state =>
      putResume(state, {
        kind: "words",
        mode,
        ids,
        index,
        correct: correctCount,
        misses,
        elapsedMs: Date.now() - startedAt.current,
      })
    );
  }, [mode, index, summary]);

  const resumePoint = resumeFor(app, "words");
  const resumeSession = () => {
    if (!resumePoint) return;
    if (resumePoint.mode === "dictation") {
      const set = resumePoint.ids
        .map(id => allDictation().find(d => d.id === id))
        .filter((d): d is DictationSentence => Boolean(d));
      if (set.length !== resumePoint.ids.length)
        return toast("이어 할 문장을 찾지 못했어요. 새로 시작해 주세요.");
      setDictationSet(set);
      setSession(null);
    } else {
      const list = resumePoint.ids
        .map(id => pool.find(w => w.id === id))
        .filter((w): w is WordEntry => Boolean(w));
      if (list.length !== resumePoint.ids.length)
        return toast("이어 할 단어를 찾지 못했어요. 새로 시작해 주세요.");
      setSession({ words: list, hadReview: true });
    }
    setMode(resumePoint.mode as SessionMode);
    setIndex(resumePoint.index);
    setCorrectCount(resumePoint.correct);
    setMisses(resumePoint.misses);
    setRevealed(false);
    setAnswer("");
    setSummary(null);
    // 이미 쓴 시간을 되돌려 놓아야 "몇 분 걸렸는지" 통계가 튀지 않는다.
    startedAt.current = Date.now() - resumePoint.elapsedMs;
    shownAt.current = Date.now();
  };

  // 홈에서 들어온 의도를 처리한다. 이어하기가 1순위 — 하다 만 게 있으면
  // 그걸 먼저 끝내는 게 맞다. 그다음이 홈에서 누른 학습이다.
  useEffect(() => {
    if (hasResumeRequest()) {
      resumeSession();
      return;
    }
    if (!intent) return;
    onIntentDone?.();
    startSession(INTENT_MODE[intent]);
    // 마운트 때 한 번만. 이 시점의 값으로 충분하다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSession = (nextMode: SessionMode) => {
    if (nextMode === "dictation") {
      const pool = allDictation();
      const levelPool = pool.filter(d => d.level === app.profile.level);
      const list = levelPool.length ? levelPool : pool;
      if (!list.length) return toast("받아쓰기 문장이 준비되지 않았어요.");
      const day = Math.floor(Date.now() / 86400000);
      const start = (day * 7) % list.length;
      setDictationSet(
        Array.from(
          { length: Math.min(10, list.length) },
          (_, i) => list[(start + i) % list.length]
        )
      );
      setSession(null);
    } else {
      const dueWords = due
        .map(card => pool.find(w => `word-${w.id}` === card.id))
        .filter((w): w is WordEntry => Boolean(w));
      let candidates = [
        ...dueWords,
        ...newWords.filter(w => !dueWords.some(d => d.id === w.id)),
      ];
      // 말하기·빈칸은 예문이 있어야 성립한다.
      if (nextMode === "speak" || nextMode === "cloze") {
        candidates = candidates.filter(w => w.examples.length > 0);
      }
      // 말하기는 이미 한 번이라도 본 단어부터. 처음 보는 단어를 말하라고 하면 좌절만 남는다.
      if (nextMode === "speak") {
        const seen = candidates.filter(w => app.srs[`word-${w.id}`]);
        if (seen.length >= 3) candidates = seen;
      }
      const list = candidates.slice(0, 10);
      if (!list.length)
        return toast("오늘 학습할 단어가 없어요. 내일 다시 만나요!");
      setSession({ words: list, hadReview: dueWords.length > 0 });
    }
    setMode(nextMode);
    setIndex(0);
    setRevealed(false);
    setAnswer("");
    setCorrectCount(0);
    setMisses([]);
    setSummary(null);
    startedAt.current = Date.now();
    shownAt.current = Date.now();
  };

  const finishSession = (
    finalCorrect: number,
    total: number,
    finalMisses: SummaryMiss[],
    nextReviewLabel?: string
  ) => {
    const hadNew = session?.words.some(w => !app.srs[`word-${w.id}`]) ?? false;
    const hadReview = session?.hadReview ?? false;
    const seconds = (Date.now() - startedAt.current) / 1000;
    const kind =
      mode === "dictation"
        ? "dictation"
        : mode === "speak"
          ? "speak"
          : hadReview
            ? "review"
            : "words";

    update(state => {
      const tasks = new Set(state.completedTasks);
      // 받아쓰기는 제 몫으로 센다. 예전에는 "새 단어" 칸을 대신 채워서
      // 단어를 하나도 안 외웠는데 오늘의 단어가 끝난 것처럼 보였다.
      if (mode === "dictation") tasks.add(routeTaskKey("dictation"));
      else if (hadNew) tasks.add(routeTaskKey("words"));
      if (hadReview) tasks.add(routeTaskKey("review"));
      if (mode === "speak") tasks.add(routeTaskKey("speak"));
      // 끝냈으니 이어할 지점은 지운다.
      return dropResume({
        ...state,
        completedTasks: Array.from(tasks),
        stats: recordSession(recordStudy(state.stats), {
          kind,
          total,
          correct: finalCorrect,
          seconds,
        }),
      });
    });

    setSummary({
      title: MODE_LABEL[mode ?? "card"],
      mode: mode ?? "card",
      correct: finalCorrect,
      total,
      seconds,
      misses: finalMisses,
      nextReviewLabel,
    });
  };

  /** 단어 한 장을 채점하고 다음으로 넘긴다. rating 을 직접 주면 그대로 쓴다. */
  const submitWord = (
    word: WordEntry,
    outcome: { correct: boolean; rating?: Rating; miss?: SummaryMiss }
  ) => {
    const elapsed = Date.now() - shownAt.current;
    const rating =
      outcome.rating ??
      gradeFor(
        outcome.correct,
        mode === "cloze" ? "typing" : ((mode as any) ?? "card"),
        elapsed
      );
    const correct = rating > 1;

    let nextLabel: string | undefined;
    update(state => {
      const key = `word-${word.id}`;
      const existing = state.srs[key] ?? createWordCard(word);
      const isNew = !state.srs[key];
      const scheduled = reviewCard(existing, rating);
      nextLabel = intervalPreview(existing, rating);
      return {
        ...state,
        srs: { ...state.srs, [key]: scheduled },
        mistakes: correct
          ? clearMistake(state, key)
          : noteMistake(state, {
              id: key,
              type: "word",
              label: dt(word.word, state.settings.dialect),
              answer: word.meaning,
              hint: word.examples[0]
                ? dt(word.examples[0].en, state.settings.dialect)
                : undefined,
            }),
        stats: recordStudy(state.stats, {
          learnedWords: state.stats.learnedWords + (isNew ? 1 : 0),
        }),
      };
    });

    if (correct) haptic.success();
    else haptic.error();

    const nextCorrect = correctCount + (correct ? 1 : 0);
    const nextMisses = outcome.miss ? [...misses, outcome.miss] : misses;
    setCorrectCount(nextCorrect);
    setMisses(nextMisses);
    setRevealed(false);
    setAnswer("");

    if (session && index + 1 >= session.words.length) {
      return finishSession(
        nextCorrect,
        session.words.length,
        nextMisses,
        nextLabel
      );
    }
    setIndex(v => v + 1);
  };

  const submitDictation = (ok: boolean, miss?: SummaryMiss) => {
    if (ok) haptic.success();
    else haptic.error();
    const nextCorrect = correctCount + (ok ? 1 : 0);
    const nextMisses = miss ? [...misses, miss] : misses;
    setCorrectCount(nextCorrect);
    setMisses(nextMisses);
    setAnswer("");
    setRevealed(false);
    if (index + 1 >= dictationSet.length) {
      return finishSession(nextCorrect, dictationSet.length, nextMisses);
    }
    setIndex(v => v + 1);
  };

  const toggleBookmark = (id: string) => {
    haptic.tap();
    update(state => ({
      ...state,
      bookmarks: state.bookmarks.includes(id)
        ? state.bookmarks.filter(b => b !== id)
        : [...state.bookmarks, id],
    }));
  };

  const exitSession = () => {
    // 직접 닫았으면 되살리기 요청도 취소한다. 안 그러면 바로 다시 열린다.
    clearResumeRequest();
    setMode(null);
    setSession(null);
    setSummary(null);
  };

  // ---------- 세션 결과 ----------
  if (summary) {
    return (
      <Transition k="summary">
        <SessionSummary
          title={summary.title}
          correct={summary.correct}
          total={summary.total}
          seconds={summary.seconds}
          streak={app.stats.streak}
          nextReviewLabel={summary.nextReviewLabel}
          misses={summary.misses}
          onRetryMisses={
            summary.misses.length > 0
              ? () => {
                  // 표시 문자열이 아니라 id 로 다시 찾는다. 예전에는 라벨을 단어
                  // 목록과 맞춰 봤는데, 받아쓰기는 라벨이 문장이라 아무것도 못
                  // 찾고 조용히 세션만 닫혔다.
                  const ids = new Set(
                    summary.misses
                      .map(m => m.id)
                      .filter((id): id is string => Boolean(id))
                  );
                  if (summary.mode === "dictation") {
                    const set = dictationSet.filter(d => ids.has(d.id));
                    if (!set.length) {
                      toast("다시 풀 문장을 찾지 못했어요.");
                      return exitSession();
                    }
                    setDictationSet(set);
                    setSession(null);
                  } else {
                    const retry = pool.filter(w => ids.has(w.id));
                    if (!retry.length) {
                      toast("다시 풀 단어를 찾지 못했어요.");
                      return exitSession();
                    }
                    setSession({ words: retry, hadReview: true });
                  }
                  // 틀렸던 방식 그대로 다시 푼다. 받아쓰기를 틀렸는데
                  // 플래시카드가 나오면 다시 푸는 게 아니다.
                  setMode(summary.mode);
                  setIndex(0);
                  setCorrectCount(0);
                  setMisses([]);
                  setRevealed(false);
                  setAnswer("");
                  setSummary(null);
                  startedAt.current = Date.now();
                  shownAt.current = Date.now();
                }
              : undefined
          }
          onDone={exitSession}
        />
      </Transition>
    );
  }

  // ---------- 받아쓰기 세션 ----------
  if (mode === "dictation" && dictationSet.length) {
    const item = dictationSet[index];
    const sentence = dt(item.en, dialect);
    const check = () => {
      if (normalize(answer) === normalize(sentence)) {
        toast.success("정답이에요!");
        submitDictation(true);
      } else {
        setRevealed(true);
      }
    };
    return (
      <SessionShell
        label="받아쓰기"
        step={index + 1}
        total={dictationSet.length}
        onExit={exitSession}
      >
        <Transition k={index} direction="left" className="space-y-4">
          <button
            onClick={() => speak(sentence, app.settings.rate)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--track-talk-soft)] py-6 text-[1rem] font-bold text-[var(--track-talk)] transition-transform active:scale-[0.99]"
          >
            <Volume2 size={22} /> 문장 듣기
          </button>
          <p className="text-center text-[0.8125rem] text-muted-foreground">
            듣기 포인트 · {item.focus}
          </p>
          {revealed ? (
            <div className="space-y-3">
              <p className="rounded-2xl bg-muted p-4 text-center font-mono text-[1rem] leading-relaxed [overflow-wrap:anywhere]">
                {sentence}
              </p>
              <p className="text-center text-[0.875rem] text-muted-foreground">
                {item.ko}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    submitDictation(false, {
                      id: item.id,
                      label: sentence,
                      detail: item.ko,
                    })
                  }
                >
                  더 연습할게요
                </Button>
                <Button size="lg" onClick={() => submitDictation(true)}>
                  알겠어요
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && check()}
                placeholder="들은 문장을 영어로 입력"
                autoCapitalize="none"
                aria-label="들은 문장 입력"
                className="h-12 text-center font-mono"
              />
              <Button className="w-full" size="lg" onClick={check}>
                확인
              </Button>
            </div>
          )}
        </Transition>
      </SessionShell>
    );
  }

  // ---------- 단어 세션 ----------
  if (mode && session) {
    const word = session.words[index];
    const display = dt(word.word, dialect);
    const example = word.examples[0];
    const distractors = pool.filter(
      w => w.id !== word.id && w.level === word.level
    );
    const options =
      mode === "choice"
        ? [
            word.meaning,
            ...Array.from(
              { length: 3 },
              (_, i) =>
                distractors[
                  (index * 7 + i * 13) % Math.max(1, distractors.length)
                ]?.meaning ?? "—"
            ),
          ].sort()
        : [];

    const typedCheck = () => {
      const ok =
        normalize(answer) === normalize(display) ||
        normalize(answer) === normalize(word.word.us);
      toast(ok ? "정답이에요!" : `정답: ${display}`);
      submitWord(word, {
        correct: ok,
        miss: ok
          ? undefined
          : { id: word.id, label: display, detail: word.meaning },
      });
    };

    return (
      <SessionShell
        label={MODE_LABEL[mode]}
        step={index + 1}
        total={session.words.length}
        onExit={exitSession}
      >
        <Transition k={index} direction="left" className="space-y-4">
          {mode === "card" ? (
            <SwipeCard
              disabled={!revealed}
              leftLabel="다시"
              rightLabel="외웠어요"
              onSwipeLeft={() =>
                submitWord(word, {
                  correct: false,
                  rating: 1,
                  miss: {
                    id: word.id,
                    label: display,
                    detail: word.meaning,
                  },
                })
              }
              onSwipeRight={() =>
                submitWord(word, { correct: true, rating: 4 })
              }
            >
              <WordFace
                top={word.meaning}
                main={revealed ? display : "?"}
                revealed={revealed}
                word={word}
                dialect={dialect}
                rate={app.settings.rate}
              />
            </SwipeCard>
          ) : mode === "choice" ? (
            <WordFace
              main={display}
              revealed
              word={word}
              dialect={dialect}
              rate={app.settings.rate}
            />
          ) : mode === "typing" ? (
            <WordFace top="이 뜻의 영어 단어는?" main={word.meaning} small />
          ) : mode === "cloze" && example ? (
            <ClozeFace word={word} dialect={dialect} rate={app.settings.rate} />
          ) : mode === "speak" ? (
            <WordFace
              top={word.meaning}
              main={display}
              revealed
              word={word}
              dialect={dialect}
              rate={app.settings.rate}
            />
          ) : (
            <WordFace top="이 뜻의 영어 단어는?" main={word.meaning} small />
          )}

          {mode === "card" &&
            (revealed ? (
              <>
                <p className="text-center text-[0.75rem] text-muted-foreground">
                  좌우로 밀어도 돼요 · ← 다시 / 외웠어요 →
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {([1, 2, 3, 4] as Rating[]).map(rating => {
                    const card =
                      app.srs[`word-${word.id}`] ?? createWordCard(word);
                    return (
                      <button
                        key={rating}
                        onClick={() =>
                          submitWord(word, {
                            correct: rating > 1,
                            rating,
                            miss:
                              rating === 1
                                ? {
                                    id: word.id,
                                    label: display,
                                    detail: word.meaning,
                                  }
                                : undefined,
                          })
                        }
                        className={`flex min-h-[3.75rem] flex-col items-center justify-center gap-0.5 rounded-2xl border text-[0.8125rem] font-semibold transition-transform active:scale-[0.97] ${
                          rating === 1
                            ? "border-destructive/40 text-destructive"
                            : rating === 4
                              ? "border-primary bg-primary text-primary-foreground"
                              : "bg-card"
                        }`}
                      >
                        {rating === 1
                          ? "다시"
                          : rating === 2
                            ? "어려움"
                            : rating === 3
                              ? "보통"
                              : "쉬움"}
                        <span className="font-mono text-[0.6875rem] font-normal opacity-70">
                          {intervalPreview(card, rating)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  haptic.tap();
                  setRevealed(true);
                }}
              >
                뒤집어 보기
              </Button>
            ))}

          {mode === "choice" && (
            <div className="grid gap-2">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    const ok = option === word.meaning;
                    toast(ok ? "정답이에요!" : `정답: ${word.meaning}`);
                    submitWord(word, {
                      correct: ok,
                      miss: ok
                        ? undefined
                        : {
                            id: word.id,
                            label: display,
                            detail: word.meaning,
                          },
                    });
                  }}
                  className="min-h-12 rounded-2xl border bg-card px-4 py-3 text-left text-[0.9375rem] transition-transform active:scale-[0.99]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {(mode === "typing" || mode === "cloze") && (
            <div className="flex gap-2">
              <Input
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && typedCheck()}
                placeholder={
                  mode === "cloze" ? "빈칸에 들어갈 단어" : "영단어 입력"
                }
                autoCapitalize="none"
                aria-label={
                  mode === "cloze" ? "빈칸에 들어갈 단어" : "영단어 입력"
                }
                className="h-12 font-mono"
              />
              <Button size="lg" onClick={typedCheck}>
                확인
              </Button>
            </div>
          )}

          {mode === "speak" && (
            <SpeakPractice
              key={word.id}
              target={example ? dt(example.en, dialect) : display}
              korean={example ? example.ko : word.meaning}
              rate={app.settings.rate}
              onDone={(score, detail) => {
                const ok = score >= 70;
                // 말하기 점수도 발음 통계에 넣는다. 예전에는 발음 탭에서 낸
                // 점수만 쌓여서, 말하기 연습을 아무리 해도 프로필의
                // "평균 발음"은 계속 "—" 였다.
                update(state => ({
                  ...state,
                  stats: {
                    ...state.stats,
                    pronunciationScores: [
                      ...state.stats.pronunciationScores,
                      score,
                    ].slice(-50),
                  },
                }));
                submitWord(word, {
                  correct: ok,
                  rating:
                    score >= 88 ? 4 : score >= 70 ? 3 : score >= 50 ? 2 : 1,
                  miss: ok
                    ? undefined
                    : { id: word.id, label: display, detail },
                });
              }}
            />
          )}
        </Transition>
      </SessionShell>
    );
  }

  // ---------- 대기열 + 탐색 ----------
  const selected = selectedId ? pool.find(w => w.id === selectedId) : null;
  const levelWords = pool.filter(w => w.level === app.profile.level);
  const learnedInLevel = levelWords.filter(w => app.srs[`word-${w.id}`]).length;
  // 기본값(내 레벨만 보기)은 "내가 건 필터"가 아니다. 예전에는 이걸 1로 세서
  // 아무것도 안 건드렸는데 필터 배지에 1이 붙어 있었다.
  const levelFilterActive =
    filters.levels.length !== LEVEL_ORDER.length &&
    !(filters.levels.length === 1 && filters.levels[0] === app.profile.level);
  const activeFilterCount =
    (levelFilterActive ? 1 : 0) +
    (filters.topic === "all" ? 0 : 1) +
    (filters.bookmarked ? 1 : 0) +
    (filters.unlearned ? 1 : 0) +
    (filters.missed ? 1 : 0);

  const toggleLevel = (lv: Level) =>
    setFilters(f => ({
      ...f,
      levels: f.levels.includes(lv)
        ? f.levels.filter(l => l !== lv).length
          ? f.levels.filter(l => l !== lv)
          : LEVEL_ORDER
        : [...f.levels, lv],
    }));

  return (
    <div className="space-y-5">
      {resumePoint && (
        <Panel className="flex items-center gap-3 border-primary/40 bg-primary/5">
          <div className="min-w-0 flex-1">
            <p className="text-[0.75rem] font-semibold text-primary">
              하다 만 학습이 있어요
            </p>
            <p className="mt-0.5 truncate text-[0.9375rem] font-bold">
              {MODE_LABEL[resumePoint.mode as SessionMode] ?? "단어 학습"}{" "}
              <span className="font-mono text-[0.8125rem] font-medium text-muted-foreground">
                {resumePoint.index + 1} / {resumePoint.ids.length}
              </span>
            </p>
          </div>
          <Button size="sm" onClick={resumeSession}>
            이어서 하기
          </Button>
          <button
            onClick={() => update(dropResume)}
            aria-label="이어하기 지우기"
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground"
          >
            <X size={16} />
          </button>
        </Panel>
      )}
      <MyWordsPanel />
      <Panel className="space-y-4">
        <div>
          <p className="text-[0.8125rem] font-medium text-muted-foreground">
            오늘의 단어
          </p>
          <h2 className="mt-0.5 text-[1.25rem] font-bold tracking-tight">
            복습 <span className="font-mono text-primary">{due.length}</span> ·
            신규{" "}
            <span className="font-mono text-primary">{newWords.length}</span>
          </h2>
        </div>
        <div className="text-[var(--track-word)]">
          <ProgressBar
            ratio={levelWords.length ? learnedInLevel / levelWords.length : 0}
          />
        </div>
        <p className="text-[0.75rem] text-muted-foreground">
          {app.profile.level} {LEVEL_LABEL[app.profile.level]} 단어{" "}
          {learnedInLevel}/{levelWords.length}개 학습
        </p>
        <Button
          className="w-full"
          size="lg"
          onClick={() => startSession("card")}
        >
          학습 시작 <ChevronRight size={16} />
        </Button>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map(({ id, label, icon: Icon, hint }) => (
            <button
              key={id}
              onClick={() => startSession(id)}
              aria-label={`${label} — ${hint}`}
              className="flex min-h-[4.5rem] flex-col items-center justify-center gap-1 rounded-2xl border bg-card px-1 text-muted-foreground transition-transform active:scale-[0.97]"
            >
              <Icon size={19} />
              <span className="text-[0.6875rem] font-semibold text-foreground">
                {label}
              </span>
              <span className="text-[0.625rem] leading-tight">{hint}</span>
            </button>
          ))}
        </div>
      </Panel>

      <section className="space-y-2.5">
        <SectionTitle aside={`${browseWords.length}개`}>단어장</SectionTitle>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="영어 또는 뜻으로 검색"
              aria-label="단어 검색"
              className="h-11 pl-9"
            />
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            aria-expanded={showFilters}
            aria-label={`필터 ${activeFilterCount ? `${activeFilterCount}개 적용됨` : "열기"}`}
            className={`relative flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              activeFilterCount
                ? "border-primary bg-accent text-accent-foreground"
                : "bg-card text-muted-foreground"
            }`}
          >
            <SlidersHorizontal size={17} />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[0.5625rem] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <Transition
            k="filters"
            direction="fade"
            className="space-y-2.5 rounded-2xl border bg-card p-3"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[0.75rem] font-semibold text-muted-foreground">
                레벨
              </span>
              {LEVEL_ORDER.map(lv => (
                <button
                  key={lv}
                  onClick={() => toggleLevel(lv)}
                  aria-pressed={filters.levels.includes(lv)}
                  className={`min-h-9 rounded-full px-3 font-mono text-[0.75rem] font-bold transition-colors ${
                    filters.levels.includes(lv)
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {lv}
                  {lv === app.profile.level ? " ★" : ""}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <FilterChip
                active={filters.bookmarked}
                onClick={() =>
                  setFilters(f => ({ ...f, bookmarked: !f.bookmarked }))
                }
              >
                <Star
                  size={12}
                  fill={filters.bookmarked ? "currentColor" : "none"}
                />{" "}
                즐겨찾기 {app.bookmarks.length}
              </FilterChip>
              <FilterChip
                active={filters.unlearned}
                onClick={() =>
                  setFilters(f => ({ ...f, unlearned: !f.unlearned }))
                }
              >
                아직 안 외운 것
              </FilterChip>
              <FilterChip
                active={filters.missed}
                onClick={() => setFilters(f => ({ ...f, missed: !f.missed }))}
              >
                틀린 적 있는 것 {missedIds.size}
              </FilterChip>
            </div>

            <div className="-mx-3 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max gap-1.5 pb-1 pr-3">
                {(["all", ...Object.keys(TOPIC_LABEL)] as const).map(t => (
                  <button
                    key={t}
                    onClick={() =>
                      setFilters(f => ({ ...f, topic: t as TopicId | "all" }))
                    }
                    aria-pressed={filters.topic === t}
                    className={`min-h-9 whitespace-nowrap rounded-full border px-3 text-[0.8125rem] font-medium transition-colors ${
                      filters.topic === t
                        ? "border-primary bg-accent text-accent-foreground"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    {t === "all" ? "전체 주제" : TOPIC_LABEL[t as TopicId]}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={() =>
                  setFilters({
                    levels: LEVEL_ORDER,
                    topic: "all",
                    bookmarked: false,
                    unlearned: false,
                    missed: false,
                  })
                }
                className="text-[0.75rem] font-semibold text-primary"
              >
                필터 모두 지우기
              </button>
            )}
          </Transition>
        )}

        {!fullData && (
          <p className="text-[0.75rem] text-muted-foreground" role="status">
            다른 레벨 단어를 불러오는 중이에요…
          </p>
        )}

        {selected && (
          <WordDetail word={selected} onClose={() => setSelectedId(null)} />
        )}

        {browseWords.length === 0 ? (
          <Empty
            title={q ? "검색 결과가 없어요" : "조건에 맞는 단어가 없어요"}
            text={
              q ? "다른 단어로 찾아보세요." : "필터를 줄이면 더 많이 보여요."
            }
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-card">
            {browseWords.slice(0, 200).map((w, i) => {
              const marked = app.bookmarks.includes(w.id);
              return (
                <div
                  key={w.id}
                  className={`flex items-center ${i > 0 ? "border-t" : ""} ${
                    selectedId === w.id ? "bg-accent/40" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      setSelectedId(w.id === selectedId ? null : w.id)
                    }
                    aria-expanded={selectedId === w.id}
                    className="flex min-h-12 flex-1 items-center gap-3 px-4 py-2.5 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 truncate font-mono text-[0.9375rem] font-medium">
                        {dt(w.word, dialect)}
                        {w.auOnly && (
                          <b className="rounded bg-[var(--streak)]/15 px-1 font-mono text-[0.625rem] font-bold text-[var(--streak)]">
                            AU
                          </b>
                        )}
                      </span>
                      <span className="block truncate text-[0.8125rem] text-muted-foreground">
                        {w.meaning}
                      </span>
                    </span>
                    {app.srs[`word-${w.id}`] && (
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-primary"
                        aria-label="학습함"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => toggleBookmark(w.id)}
                    aria-label={`${dt(w.word, dialect)} ${marked ? "즐겨찾기 해제" : "즐겨찾기"}`}
                    aria-pressed={marked}
                    className="flex size-11 shrink-0 items-center justify-center text-muted-foreground"
                  >
                    <Star
                      size={16}
                      className={marked ? "text-[var(--streak)]" : ""}
                      fill={marked ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-9 items-center gap-1 rounded-full px-3 text-[0.75rem] font-semibold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/** 단어 카드 앞/뒷면 */
function WordFace({
  top,
  main,
  small,
  revealed,
  word,
  dialect,
  rate,
}: {
  top?: string;
  main: string;
  small?: boolean;
  revealed?: boolean;
  word?: WordEntry;
  dialect?: "us" | "au";
  rate?: number;
}) {
  return (
    <div className="flex min-h-[13rem] flex-col items-center justify-center gap-2 rounded-3xl border bg-card px-5 py-8 text-center shadow-[0_2px_10px_rgba(20,40,38,0.05)]">
      {top && (
        <span className="text-[0.75rem] font-semibold text-muted-foreground">
          {top}
        </span>
      )}
      <h2
        className={`font-bold tracking-tight [overflow-wrap:anywhere] ${
          small ? "text-[1.375rem]" : "text-[1.875rem]"
        }`}
      >
        {main}
      </h2>
      {revealed && word && dialect && (
        <>
          <p className="font-mono text-[0.875rem] text-muted-foreground">
            /{dt(word.ipa, dialect)}/
            {showsHangulHint(word.word, dialect) ? ` · ${word.hangul}` : ""}
          </p>
          <button
            onClick={() => speak(dt(word.word, dialect), rate)}
            aria-label={`${dt(word.word, dialect)} 발음 듣기`}
            className="mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[0.875rem] font-semibold text-accent-foreground"
          >
            <Volume2 size={16} /> 발음 듣기
          </button>
        </>
      )}
    </div>
  );
}

/** 빈칸 채우기 — 예문에서 목표 단어를 가린다. */
function ClozeFace({
  word,
  dialect,
  rate,
}: {
  word: WordEntry;
  dialect: "us" | "au";
  rate: number;
}) {
  const example = word.examples[0];
  const sentence = dt(example.en, dialect);
  const target = dt(word.word, dialect);
  const blanked = sentence.replace(
    new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
    "_".repeat(Math.max(4, target.length))
  );
  return (
    <div className="flex min-h-[13rem] flex-col items-center justify-center gap-3 rounded-3xl border bg-card px-5 py-8 text-center shadow-[0_2px_10px_rgba(20,40,38,0.05)]">
      <span className="text-[0.75rem] font-semibold text-muted-foreground">
        빈칸에 알맞은 단어는?
      </span>
      <p className="font-mono text-[1.0625rem] leading-relaxed [overflow-wrap:anywhere]">
        {blanked}
      </p>
      <p className="text-[0.875rem] text-muted-foreground">{example.ko}</p>
      <button
        onClick={() => speak(blanked.replace(/_+/g, "blank"), rate)}
        aria-label="문장 듣기"
        className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[0.875rem] font-semibold text-accent-foreground"
      >
        <Volume2 size={16} /> 문장 듣기
      </button>
    </div>
  );
}

/** 말하기 연습 — 한국어를 보고 영어로 말한 뒤 음소 단위로 채점받는다. */
function SpeakPractice({
  target,
  korean,
  rate,
  onDone,
}: {
  target: string;
  korean: string;
  rate: number;
  onDone: (score: number, detail: string) => void;
}) {
  const [result, setResult] = useState<ReturnType<
    typeof scorePronunciation
  > | null>(null);
  const [heard, setHeard] = useState("");

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-muted p-4 text-center">
        <p className="text-[0.75rem] font-semibold text-muted-foreground">
          이 뜻을 영어로 말해 보세요
        </p>
        <p className="mt-1 text-[1rem] font-semibold">{korean}</p>
      </div>

      <SpeakButton
        onResult={text => {
          setHeard(text);
          setResult(scorePronunciation(target, text));
        }}
      />

      {result && (
        <div className="space-y-2 rounded-2xl border bg-card p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[0.8125rem] text-muted-foreground">
              발음 점수
            </span>
            <span
              className={`font-mono text-[1.5rem] font-bold tabular-nums ${
                result.score >= 70 ? "text-primary" : "text-destructive"
              }`}
            >
              {result.score}
            </span>
          </div>
          <p className="font-mono text-[0.875rem] [overflow-wrap:anywhere]">
            <span className="text-muted-foreground">들린 문장 · </span>
            {heard || "—"}
          </p>
          <p className="font-mono text-[0.875rem] [overflow-wrap:anywhere]">
            <span className="text-muted-foreground">정답 · </span>
            {target}
          </p>
          {result.issues.length > 0 && (
            <ul className="space-y-1 rounded-xl bg-destructive/8 p-3">
              {result.issues.map((issue, i) => (
                <li key={i} className="text-[0.8125rem] text-destructive">
                  {issue.hint}
                </li>
              ))}
            </ul>
          )}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button variant="outline" onClick={() => speak(target, rate)}>
              <Volume2 size={15} /> 정답 듣기
            </Button>
            <Button
              onClick={() =>
                onDone(
                  result.score,
                  `${target} · ${result.issues[0]?.hint ?? ""}`
                )
              }
            >
              다음
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
