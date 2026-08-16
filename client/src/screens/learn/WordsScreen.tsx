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
import { useApp } from "@/state/context";
import { DICTATION, TOPIC_LABEL, words as allWords } from "@/data";
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
import { haptic } from "@/lib/haptics";
import { LEVEL_LABEL, LEVEL_ORDER } from "@/lib/level";
import { clearMistake, noteMistake, routeTaskKey } from "@/lib/route";
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

type Filters = {
  levels: Level[];
  topic: TopicId | "all";
  bookmarked: boolean;
  unlearned: boolean;
  missed: boolean;
};

export function WordsScreen() {
  const { app, update, fullData } = useApp();
  const dialect = app.settings.dialect;

  // 렌더마다 SRS 전체를 훑지 않도록 메모이즈한다. 카드가 쌓일수록 차이가 커진다.
  const due = useMemo(() => dueCards(app), [app.srs]);
  const pool = allWords();
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

  const startSession = (nextMode: SessionMode) => {
    if (nextMode === "dictation") {
      const levelPool = DICTATION.filter(d => d.level === app.profile.level);
      const list = levelPool.length ? levelPool : DICTATION;
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
      if (mode === "dictation" || hadNew) tasks.add(routeTaskKey("words"));
      if (hadReview) tasks.add(routeTaskKey("review"));
      if (mode === "speak") tasks.add(routeTaskKey("speak"));
      return {
        ...state,
        completedTasks: Array.from(tasks),
        stats: recordSession(recordStudy(state.stats), {
          kind,
          total,
          correct: finalCorrect,
          seconds,
        }),
      };
    });

    setSummary({
      title: MODE_LABEL[mode ?? "card"],
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
                  const labels = new Set(summary.misses.map(m => m.label));
                  const retry = pool.filter(w =>
                    labels.has(dt(w.word, dialect))
                  );
                  if (!retry.length) return exitSession();
                  setSession({ words: retry, hadReview: true });
                  setMode("card");
                  setIndex(0);
                  setCorrectCount(0);
                  setMisses([]);
                  setSummary(null);
                  startedAt.current = Date.now();
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
                    submitDictation(false, { label: sentence, detail: item.ko })
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
        miss: ok ? undefined : { label: display, detail: word.meaning },
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
                  miss: { label: display, detail: word.meaning },
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
                                ? { label: display, detail: word.meaning }
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
                        : { label: display, detail: word.meaning },
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
                submitWord(word, {
                  correct: ok,
                  rating:
                    score >= 88 ? 4 : score >= 70 ? 3 : score >= 50 ? 2 : 1,
                  miss: ok ? undefined : { label: display, detail },
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
  const activeFilterCount =
    (filters.levels.length === LEVEL_ORDER.length ? 0 : 1) +
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
