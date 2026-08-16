import { useEffect, useMemo, useState } from "react";
import { Check, Clock, Play, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eyebrow, Empty, Panel } from "@/components/Panel";
import { SessionShell } from "@/components/SessionShell";
import { SessionSummary, type SummaryMiss } from "@/components/SessionSummary";
import { Transition } from "@/components/Transition";
import { useApp } from "@/state/context";
import { normalize, recordSession, recordStudy } from "@/lib/engine";
import {
  clearMistake,
  dueMistakes,
  noteMistake,
  routeTaskKey,
} from "@/lib/route";
import { speak } from "@/lib/speech";
import { useAutoSpeak } from "@/lib/autoSpeak";
import {
  clearResumeRequest,
  dropResume,
  hasResumeRequest,
  putResume,
  resumeFor,
} from "@/lib/resume";
import { haptic } from "@/lib/haptics";
import type { Mistake } from "@/types";

const TYPE_LABEL = {
  grammar: "문법",
  word: "단어",
  pronunciation: "발음",
} as const;

/**
 * 오답 노트.
 *
 * 예전에는 목록만 보여 주고 "복습 완료" 체크로 지우는 게 전부였다.
 * 틀린 걸 다시 안 풀면 오답 노트가 아니라 오답 무덤이 된다.
 * 여기서 바로 다시 풀 수 있게 하고, 두 번 맞히면 목록에서 빠진다.
 */
export function MistakesScreen() {
  const { app, update } = useApp();
  const [queue, setQueue] = useState<Mistake[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [misses, setMisses] = useState<SummaryMiss[]>([]);
  const [summary, setSummary] = useState<{
    correct: number;
    total: number;
    seconds: number;
    misses: SummaryMiss[];
  } | null>(null);
  const [startedAt, setStartedAt] = useState(Date.now());

  const due = useMemo(() => dueMistakes(app), [app.mistakes]);

  // 문제로 나온 문장이 영어면 바로 읽어 준다. (문법 오답처럼 한국어면 speakable 이 걸러 낸다)
  useAutoSpeak(queue?.[index]?.label, {
    enabled: app.settings.autoSpeak,
    rate: app.settings.rate,
  });

  // 진행 지점을 남긴다. 중간에 나가도 이어서 풀 수 있다.
  useEffect(() => {
    if (!queue || summary) return;
    update(state =>
      putResume(state, {
        kind: "mistakes",
        ids: queue.map(m => m.id),
        index,
        correct,
        misses,
        elapsedMs: Date.now() - startedAt,
      })
    );
  }, [queue, index, summary]);

  const resumePoint = resumeFor(app, "mistakes");
  const resumeDrill = () => {
    if (!resumePoint) return;
    const list = resumePoint.ids
      .map(id => app.mistakes.find(m => m.id === id))
      .filter((m): m is Mistake => Boolean(m));
    if (list.length !== resumePoint.ids.length)
      return toast("이어 할 오답을 찾지 못했어요. 새로 시작해 주세요.");
    setQueue(list);
    setIndex(resumePoint.index);
    setCorrect(resumePoint.correct);
    setMisses(resumePoint.misses);
    setAnswer("");
    setRevealed(false);
    setSummary(null);
    setStartedAt(Date.now() - resumePoint.elapsedMs);
  };

  // 홈에서 "계속"으로 들어온 경우 바로 이어 간다.
  useEffect(() => {
    if (hasResumeRequest()) resumeDrill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDrill = (list: Mistake[]) => {
    if (list.length === 0) return;
    setQueue(list);
    setIndex(0);
    setAnswer("");
    setRevealed(false);
    setCorrect(0);
    setMisses([]);
    setSummary(null);
    setStartedAt(Date.now());
  };

  const finish = (
    finalCorrect: number,
    total: number,
    finalMisses: SummaryMiss[]
  ) => {
    const seconds = (Date.now() - startedAt) / 1000;
    update(state => ({
      ...dropResume(state),
      completedTasks: Array.from(
        new Set([...state.completedTasks, routeTaskKey("mistakes")])
      ),
      stats: recordSession(recordStudy(state.stats), {
        kind: "review",
        total,
        correct: finalCorrect,
        seconds,
      }),
    }));
    setSummary({ correct: finalCorrect, total, seconds, misses: finalMisses });
    setQueue(null);
  };

  const grade = (mistake: Mistake, ok: boolean) => {
    if (ok) haptic.success();
    else haptic.error();
    update(state => ({
      ...state,
      mistakes: ok
        ? clearMistake(state, mistake.id)
        : noteMistake(state, {
            id: mistake.id,
            type: mistake.type,
            label: mistake.label,
            answer: mistake.answer,
            hint: mistake.hint,
          }),
    }));
    const nextCorrect = correct + (ok ? 1 : 0);
    const nextMisses = ok
      ? misses
      : [...misses, { label: mistake.label, detail: mistake.answer }];
    setCorrect(nextCorrect);
    setMisses(nextMisses);
    setAnswer("");
    setRevealed(false);
    if (!queue) return;
    if (index + 1 >= queue.length)
      return finish(nextCorrect, queue.length, nextMisses);
    setIndex(v => v + 1);
  };

  // ---------- 결과 ----------
  if (summary) {
    return (
      <SessionSummary
        title="오답 복습"
        correct={summary.correct}
        total={summary.total}
        seconds={summary.seconds}
        streak={app.stats.streak}
        misses={summary.misses}
        onDone={() => setSummary(null)}
      />
    );
  }

  // ---------- 복습 세션 ----------
  if (queue && queue.length > 0) {
    const mistake = queue[index];
    const expected = mistake.answer ?? mistake.label;
    const check = () => {
      const ok =
        normalize(answer) === normalize(expected) ||
        normalize(answer) === normalize(mistake.label);
      if (ok) {
        toast.success("맞혔어요!");
        grade(mistake, true);
      } else {
        setRevealed(true);
      }
    };

    return (
      <SessionShell
        label="오답 복습"
        step={index + 1}
        total={queue.length}
        onExit={() => {
          clearResumeRequest();
          setQueue(null);
        }}
      >
        <Transition k={index} direction="left" className="space-y-4">
          <div className="flex min-h-[11rem] flex-col items-center justify-center gap-2 rounded-3xl border bg-card px-5 py-8 text-center">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground">
              {TYPE_LABEL[mistake.type]} · {mistake.count}회 틀림
            </span>
            <h2 className="text-[1.5rem] font-bold tracking-tight [overflow-wrap:anywhere]">
              {mistake.label}
            </h2>
            {mistake.hint && !revealed && (
              <p className="font-mono text-[0.8125rem] text-muted-foreground [overflow-wrap:anywhere]">
                힌트 · {mistake.hint}
              </p>
            )}
            {revealed && (
              <>
                <p className="text-[0.9375rem] font-semibold text-primary">
                  {expected}
                </p>
                {mistake.hint && (
                  <p className="font-mono text-[0.8125rem] text-muted-foreground [overflow-wrap:anywhere]">
                    {mistake.hint}
                  </p>
                )}
              </>
            )}
            <button
              onClick={() => speak(mistake.label, app.settings.rate)}
              className="mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[0.8125rem] font-semibold text-accent-foreground"
            >
              <Play size={14} /> 소리 듣기
            </button>
          </div>

          {revealed ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => grade(mistake, false)}
              >
                아직 헷갈려요
              </Button>
              <Button size="lg" onClick={() => grade(mistake, true)}>
                이제 알겠어요
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && check()}
                placeholder="뜻이나 정답을 입력"
                aria-label="정답 입력"
                className="h-12 text-center"
              />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setRevealed(true)}
                >
                  정답 보기
                </Button>
                <Button size="lg" onClick={check}>
                  확인
                </Button>
              </div>
            </div>
          )}
        </Transition>
      </SessionShell>
    );
  }

  // ---------- 목록 ----------
  if (app.mistakes.length === 0)
    return (
      <Empty
        title="오답노트가 비어 있어요"
        text="단어·문법·발음에서 틀린 부분이 자동으로 여기에 쌓이고, 다음 날 오늘의 루트에 다시 나와요."
      />
    );

  const resolve = (id: string) => {
    update(state => ({
      ...state,
      mistakes: state.mistakes.filter(m => m.id !== id),
    }));
    toast.success("복습 완료! 오답노트에서 제거했어요.");
  };

  return (
    <div className="space-y-3">
      {resumePoint && (
        <Panel className="flex items-center gap-3 border-primary/40 bg-primary/5">
          <div className="min-w-0 flex-1">
            <p className="text-[0.75rem] font-semibold text-primary">
              풀다 만 복습이 있어요
            </p>
            <p className="mt-0.5 font-mono text-[0.9375rem] font-bold">
              {resumePoint.index + 1} / {resumePoint.ids.length}
            </p>
          </div>
          <Button size="sm" onClick={resumeDrill}>
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
      <Panel className="space-y-3">
        <div>
          <p className="text-[0.8125rem] font-medium text-muted-foreground">
            오답 복습
          </p>
          <h2 className="mt-0.5 text-[1.25rem] font-bold tracking-tight">
            지금 풀 것{" "}
            <span className="font-mono text-primary">{due.length}</span>개
          </h2>
          <p className="mt-1 text-[0.8125rem] text-muted-foreground">
            두 번 연속 맞히면 목록에서 빠져요.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="lg"
            disabled={due.length === 0}
            onClick={() => startDrill(due)}
          >
            <Play size={16} /> 지금 풀기
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => startDrill(app.mistakes.slice(0, 10))}
          >
            전체에서 10개
          </Button>
        </div>
      </Panel>

      <Eyebrow className="text-muted-foreground">
        다시 만나야 할 것들 {app.mistakes.length}
      </Eyebrow>
      <div className="overflow-hidden rounded-2xl border bg-card">
        {app.mistakes.map((mistake, i) => {
          const waiting = mistake.nextReview > Date.now();
          return (
            <div
              key={mistake.id}
              className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t" : ""}`}
            >
              <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground">
                {TYPE_LABEL[mistake.type]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.9375rem] font-medium">
                  {mistake.label}
                </span>
                <span className="flex items-center gap-1 text-[0.75rem] text-muted-foreground">
                  {mistake.count}회 틀림
                  {waiting && (
                    <>
                      · <Clock size={11} /> 복습 대기
                    </>
                  )}
                </span>
              </span>
              <button
                onClick={() => resolve(mistake.id)}
                aria-label={`${mistake.label} 복습 완료`}
                className="flex size-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-accent"
              >
                <Check size={17} />
              </button>
              <button
                onClick={() =>
                  update(state => ({
                    ...state,
                    mistakes: state.mistakes.filter(m => m.id !== mistake.id),
                  }))
                }
                aria-label={`${mistake.label} 삭제`}
                className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
