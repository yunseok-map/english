import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Headphones,
  Keyboard,
  Search,
  Star,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel, SectionTitle, Empty } from "@/components/Panel";
import { ProgressBar } from "@/components/Progress";
import { WordDetail } from "@/screens/learn/WordDetail";
import { useApp } from "@/state/context";
import { DICTATION, TOPIC_LABEL, WORDS } from "@/data";
import type { DictationSentence, TopicId, WordEntry } from "@/data/types";
import {
  createWordCard,
  dueCards,
  normalize,
  recordStudy,
  scheduleCard,
} from "@/lib/engine";
import { dt, showsHangulHint } from "@/lib/dialect";
import { speak } from "@/lib/speech";
import { LEVEL_LABEL } from "@/lib/level";
import { routeTaskKey } from "@/lib/route";
import type { Level } from "@/types";

type SessionMode = "card" | "choice" | "typing" | "dictation";
const MODES: Array<{ id: SessionMode; label: string; icon: typeof BookOpen }> =
  [
    { id: "card", label: "플래시카드", icon: BookOpen },
    { id: "choice", label: "4지선다", icon: CircleHelp },
    { id: "typing", label: "스펠링", icon: Keyboard },
    { id: "dictation", label: "받아쓰기", icon: Headphones },
  ];

export function WordsScreen() {
  const { app, update } = useApp();
  const dialect = app.settings.dialect;
  const due = dueCards(app);
  const newWords = useMemo(
    () =>
      WORDS.filter(
        w => w.level === app.profile.level && !app.srs[`word-${w.id}`]
      ).slice(0, app.settings.dailyNewWords),
    [app.profile.level, app.srs, app.settings.dailyNewWords]
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

  // 탐색(브라우즈)
  const [browseLevel, setBrowseLevel] = useState<Level>(app.profile.level);
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [query, setQuery] = useState("");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const startSession = (nextMode: SessionMode) => {
    if (nextMode === "dictation") {
      const pool = DICTATION.filter(d => d.level === app.profile.level);
      const list = pool.length ? pool : DICTATION;
      if (!list.length) return toast("받아쓰기 문장이 준비되지 않았어요.");
      const day = Math.floor(Date.now() / 86400000);
      const start = (day * 7) % list.length;
      setDictationSet(
        Array.from(
          { length: Math.min(10, list.length) },
          (_, i) => list[(start + i) % list.length]
        )
      );
    } else {
      const dueWords = due
        .map(card => WORDS.find(w => `word-${w.id}` === card.id))
        .filter((w): w is WordEntry => Boolean(w));
      const pool = [
        ...dueWords,
        ...newWords.filter(w => !dueWords.some(d => d.id === w.id)),
      ].slice(0, 10);
      if (!pool.length)
        return toast("오늘 학습할 단어가 없어요. 내일 다시 만나요!");
      setSession({ words: pool, hadReview: dueWords.length > 0 });
    }
    setMode(nextMode);
    setIndex(0);
    setRevealed(false);
    setAnswer("");
    setCorrectCount(0);
  };

  const finishSession = (finalCorrect: number, total: number) => {
    const hadNew = session?.words.some(w => !app.srs[`word-${w.id}`]) ?? false;
    const hadReview = session?.hadReview ?? false;
    update(state => {
      const tasks = new Set(state.completedTasks);
      if (mode === "dictation" || hadNew) tasks.add(routeTaskKey("words"));
      if (hadReview) tasks.add(routeTaskKey("review"));
      return {
        ...state,
        completedTasks: Array.from(tasks),
        stats: recordStudy(state.stats),
      };
    });
    toast.success(`세션 완료! ${total}문항 중 ${finalCorrect}개 정답`);
    setMode(null);
    setSession(null);
  };

  const submitWord = (word: WordEntry, grade: 0 | 3 | 5) => {
    update(state => {
      const existing = state.srs[`word-${word.id}`] ?? createWordCard(word);
      const isNew = !state.srs[`word-${word.id}`];
      return {
        ...state,
        srs: { ...state.srs, [existing.id]: scheduleCard(existing, grade) },
        stats: recordStudy(state.stats, {
          learnedWords: state.stats.learnedWords + (isNew ? 1 : 0),
        }),
      };
    });
    const nextCorrect = correctCount + (grade === 5 ? 1 : 0);
    setCorrectCount(nextCorrect);
    setRevealed(false);
    setAnswer("");
    if (session && index + 1 >= session.words.length)
      return finishSession(nextCorrect, session.words.length);
    setIndex(v => v + 1);
  };

  const submitDictation = (ok: boolean) => {
    const nextCorrect = correctCount + (ok ? 1 : 0);
    setCorrectCount(nextCorrect);
    setAnswer("");
    setRevealed(false);
    if (index + 1 >= dictationSet.length)
      return finishSession(nextCorrect, dictationSet.length);
    setIndex(v => v + 1);
  };

  const toggleBookmark = (id: string) =>
    update(state => ({
      ...state,
      bookmarks: state.bookmarks.includes(id)
        ? state.bookmarks.filter(b => b !== id)
        : [...state.bookmarks, id],
    }));

  // ---------- 받아쓰기 세션 ----------
  if (mode === "dictation" && dictationSet.length) {
    const item = dictationSet[index];
    const sentence = dt(item.en, dialect);
    return (
      <SessionShell
        label="받아쓰기"
        step={index + 1}
        total={dictationSet.length}
        onExit={() => setMode(null)}
      >
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
                onClick={() => submitDictation(false)}
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
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (normalize(answer) === normalize(sentence)) {
                    toast.success("정답이에요!");
                    submitDictation(true);
                  } else setRevealed(true);
                }
              }}
              placeholder="들은 문장을 영어로 입력"
              autoCapitalize="none"
              className="h-12 text-center font-mono"
            />
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                if (normalize(answer) === normalize(sentence)) {
                  toast.success("정답이에요!");
                  submitDictation(true);
                } else setRevealed(true);
              }}
            >
              확인
            </Button>
          </div>
        )}
      </SessionShell>
    );
  }

  // ---------- 단어 세션 ----------
  if (mode && session) {
    const word = session.words[index];
    const display = dt(word.word, dialect);
    const distractors = WORDS.filter(
      w => w.id !== word.id && w.level === word.level
    );
    const options =
      mode === "choice"
        ? [
            word.meaning,
            ...Array.from(
              { length: 3 },
              (_, i) =>
                distractors[(index * 7 + i * 13) % distractors.length]
                  ?.meaning ?? "—"
            ),
          ].sort()
        : [];

    return (
      <SessionShell
        label={
          mode === "card"
            ? "플래시카드"
            : mode === "choice"
              ? "4지선다"
              : "스펠링"
        }
        step={index + 1}
        total={session.words.length}
        onExit={() => setMode(null)}
      >
        {/* 카드 */}
        <div className="flex min-h-[13rem] flex-col items-center justify-center gap-2 rounded-3xl border bg-card px-5 py-8 text-center shadow-[0_2px_10px_rgba(20,40,38,0.05)]">
          {mode === "card" ? (
            <>
              <span className="text-[0.75rem] font-semibold text-muted-foreground">
                {word.meaning}
              </span>
              <h2 className="text-[1.875rem] font-bold tracking-tight [overflow-wrap:anywhere]">
                {revealed ? display : "?"}
              </h2>
              {revealed && (
                <>
                  <p className="font-mono text-[0.875rem] text-muted-foreground">
                    /{dt(word.ipa, dialect)}/
                    {showsHangulHint(word.word, dialect)
                      ? ` · ${word.hangul}`
                      : ""}
                  </p>
                  <button
                    onClick={() => speak(display, app.settings.rate)}
                    className="mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[0.875rem] font-semibold text-accent-foreground"
                  >
                    <Volume2 size={16} /> 발음 듣기
                  </button>
                </>
              )}
            </>
          ) : mode === "choice" ? (
            <>
              <h2 className="text-[1.875rem] font-bold tracking-tight [overflow-wrap:anywhere]">
                {display}
              </h2>
              <p className="font-mono text-[0.875rem] text-muted-foreground">
                /{dt(word.ipa, dialect)}/
              </p>
              <button
                onClick={() => speak(display, app.settings.rate)}
                className="mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[0.875rem] font-semibold text-accent-foreground"
              >
                <Volume2 size={16} /> 듣기
              </button>
            </>
          ) : (
            <>
              <span className="text-[0.75rem] font-semibold text-muted-foreground">
                이 뜻의 영어 단어는?
              </span>
              <h2 className="text-[1.375rem] font-bold tracking-tight">
                {word.meaning}
              </h2>
              <button
                onClick={() => speak(display, app.settings.rate)}
                className="mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[0.875rem] font-semibold text-accent-foreground"
              >
                <Volume2 size={16} /> 힌트 듣기
              </button>
            </>
          )}
        </div>

        {mode === "card" &&
          (revealed ? (
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => submitWord(word, 0)}
              >
                다시
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => submitWord(word, 3)}
              >
                애매해요
              </Button>
              <Button size="lg" onClick={() => submitWord(word, 5)}>
                외웠어요
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              size="lg"
              onClick={() => setRevealed(true)}
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
                  submitWord(word, ok ? 5 : 0);
                }}
                className="min-h-12 rounded-2xl border bg-card px-4 py-3 text-left text-[0.9375rem] transition-transform active:scale-[0.99]"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {mode === "typing" && (
          <div className="flex gap-2">
            <Input
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  const ok =
                    normalize(answer) === normalize(display) ||
                    normalize(answer) === normalize(word.word.us);
                  toast(ok ? "정답이에요!" : `정답: ${display}`);
                  submitWord(word, ok ? 5 : 0);
                }
              }}
              placeholder="영단어 입력"
              autoCapitalize="none"
              className="h-12 font-mono"
            />
            <Button
              size="lg"
              onClick={() => {
                const ok =
                  normalize(answer) === normalize(display) ||
                  normalize(answer) === normalize(word.word.us);
                toast(ok ? "정답이에요!" : `정답: ${display}`);
                submitWord(word, ok ? 5 : 0);
              }}
            >
              확인
            </Button>
          </div>
        )}
      </SessionShell>
    );
  }

  // ---------- 대기열 + 탐색 ----------
  const q = query.trim().toLowerCase();
  const browseWords = WORDS.filter(w => {
    if (onlyBookmarks && !app.bookmarks.includes(w.id)) return false;
    if (q) {
      return (
        w.word.us.toLowerCase().includes(q) ||
        (w.word.au ?? "").toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q)
      );
    }
    return w.level === browseLevel && (topic === "all" || w.topic === topic);
  });
  const selected = selectedId ? WORDS.find(w => w.id === selectedId) : null;
  const levelWords = WORDS.filter(w => w.level === app.profile.level);
  const learnedInLevel = levelWords.filter(w => app.srs[`word-${w.id}`]).length;

  return (
    <div className="space-y-5">
      <Panel className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.8125rem] font-medium text-muted-foreground">
              오늘의 단어
            </p>
            <h2 className="mt-0.5 text-[1.25rem] font-bold tracking-tight">
              복습 <span className="font-mono text-primary">{due.length}</span>{" "}
              · 신규{" "}
              <span className="font-mono text-primary">{newWords.length}</span>
            </h2>
          </div>
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
        <div className="grid grid-cols-4 gap-2">
          {MODES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => startSession(id)}
              className="flex min-h-[4.25rem] flex-col items-center justify-center gap-1.5 rounded-2xl border bg-card text-muted-foreground transition-transform active:scale-[0.97]"
            >
              <Icon size={19} />
              <span className="text-[0.6875rem] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </Panel>

      <section className="space-y-2.5">
        <SectionTitle aside={`${browseWords.length}개`}>단어장</SectionTitle>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="영어 또는 뜻으로 검색"
            className="h-11 pl-9"
          />
        </div>

        {!q && (
          <>
            <div className="flex items-center gap-1.5">
              {(["A1", "A2", "B1"] as const).map(lv => (
                <button
                  key={lv}
                  onClick={() => {
                    setBrowseLevel(lv);
                    setOnlyBookmarks(false);
                  }}
                  className={`min-h-9 rounded-full px-3 font-mono text-[0.75rem] font-bold transition-colors ${
                    !onlyBookmarks && browseLevel === lv
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {lv}
                  {lv === app.profile.level ? " ★" : ""}
                </button>
              ))}
              <button
                onClick={() => setOnlyBookmarks(v => !v)}
                className={`ml-auto inline-flex min-h-9 items-center gap-1 rounded-full px-3 text-[0.75rem] font-semibold transition-colors ${
                  onlyBookmarks
                    ? "bg-[var(--streak)] text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Star
                  size={13}
                  fill={onlyBookmarks ? "currentColor" : "none"}
                />{" "}
                즐겨찾기 {app.bookmarks.length}
              </button>
            </div>

            {!onlyBookmarks && (
              <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max gap-1.5 pb-1 pr-4">
                  {(["all", ...Object.keys(TOPIC_LABEL)] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTopic(t as TopicId | "all")}
                      className={`min-h-9 whitespace-nowrap rounded-full border px-3 text-[0.8125rem] font-medium transition-colors ${
                        topic === t
                          ? "border-primary bg-accent text-accent-foreground"
                          : "bg-card text-muted-foreground"
                      }`}
                    >
                      {t === "all" ? "전체" : TOPIC_LABEL[t as TopicId]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {selected && (
          <WordDetail word={selected} onClose={() => setSelectedId(null)} />
        )}

        {browseWords.length === 0 ? (
          <Empty
            title={
              q
                ? "검색 결과가 없어요"
                : onlyBookmarks
                  ? "즐겨찾기한 단어가 없어요"
                  : "단어 준비 중"
            }
            text={
              q
                ? "다른 단어로 찾아보세요."
                : onlyBookmarks
                  ? "단어 카드의 별을 눌러 모아 보세요."
                  : "콘텐츠를 준비하고 있어요."
            }
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-card">
            {browseWords.slice(0, 200).map((w, i) => {
              const marked = app.bookmarks.includes(w.id);
              return (
                <div
                  key={w.id}
                  className={`flex items-center ${i > 0 ? "border-t" : ""} ${selectedId === w.id ? "bg-accent/40" : ""}`}
                >
                  <button
                    onClick={() =>
                      setSelectedId(w.id === selectedId ? null : w.id)
                    }
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
                      />
                    )}
                  </button>
                  <button
                    onClick={() => toggleBookmark(w.id)}
                    aria-label={marked ? "즐겨찾기 해제" : "즐겨찾기"}
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

/** 학습 세션 공통 껍데기 — 진행 바 + 나가기. */
function SessionShell({
  label,
  step,
  total,
  onExit,
  children,
}: {
  label: string;
  step: number;
  total: number;
  onExit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          className="text-[0.875rem] font-medium text-muted-foreground"
        >
          ← 나가기
        </button>
        <span className="ml-auto text-[0.8125rem] font-semibold">{label}</span>
        <span className="font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
          {step}/{total}
        </span>
      </div>
      <div className="text-primary">
        <ProgressBar ratio={step / total} />
      </div>
      {children}
    </div>
  );
}
