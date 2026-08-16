import { useEffect, useMemo, useRef, useState } from "react";
import { Check, CheckCircle2, ChevronRight, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, Eyebrow, Empty } from "@/components/Panel";
import { useApp } from "@/state/context";
import { lessons as allLessons } from "@/data";
import type { GrammarLesson } from "@/data/types";
import { dt } from "@/lib/dialect";
import { recordSession, recordStudy } from "@/lib/engine";
import { haptic } from "@/lib/haptics";
import { SessionSummary, type SummaryMiss } from "@/components/SessionSummary";
import { speak } from "@/lib/speech";
import { LEVEL_LABEL } from "@/lib/level";
import { noteMistake, routeTaskKey } from "@/lib/route";
import { speakable } from "@/lib/autoSpeak";
import {
  clearResumeRequest,
  dropResume,
  hasResumeRequest,
  putResume,
  resumeFor,
} from "@/lib/resume";

function LessonDetail({
  lesson,
  onBack,
  initialAnswers,
}: {
  lesson: GrammarLesson;
  onBack: () => void;
  /** 하다 만 강의를 다시 열 때 이전에 고른 답 */
  initialAnswers?: Record<number, number>;
}) {
  const { app, update } = useApp();
  const dialect = app.settings.dialect;
  const [answers, setAnswers] = useState<Record<number, number>>(
    initialAnswers ?? {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const startedAt = useRef(Date.now());
  const completed = app.completedLessons.includes(lesson.id);

  // 고른 답을 그때그때 남긴다. 중간에 나가도 다시 열면 그대로 있다.
  useEffect(() => {
    if (submitted) return;
    if (Object.keys(answers).length === 0) return;
    update(state =>
      putResume(state, { kind: "grammar", lessonId: lesson.id, answers })
    );
  }, [answers, submitted, lesson.id]);

  const score = lesson.quiz.filter((q, i) => answers[i] === q.answer).length;
  const allAnswered = lesson.quiz.every((_, i) => answers[i] !== undefined);

  // 틀린 문항만 오답 노트로 보낸다. 강의 제목만 담으면 나중에 뭘 틀렸는지 알 수 없다.
  const wrongQuestions = lesson.quiz
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => answers[i] !== undefined && answers[i] !== q.answer);

  const summaryMisses: SummaryMiss[] = wrongQuestions.map(({ q, i }) => ({
    id: String(i),
    label: q.q,
    detail: `정답: ${q.options[q.answer]}`,
  }));

  const submit = () => {
    setSubmitted(true);
    const passed = score >= 4;
    const seconds = (Date.now() - startedAt.current) / 1000;
    if (passed) haptic.success();
    else haptic.error();

    update(state => {
      state = dropResume(state);
      let mistakes = state.mistakes;
      for (const { q, i } of wrongQuestions) {
        mistakes = noteMistake(
          { ...state, mistakes },
          {
            id: `grammar-${lesson.id}-${i}`,
            type: "grammar",
            label: q.q,
            answer: q.options[q.answer],
            hint: q.explain,
          }
        );
      }
      return {
        ...state,
        completedLessons:
          passed && !completed
            ? [...state.completedLessons, lesson.id]
            : state.completedLessons,
        completedTasks:
          passed && !state.completedTasks.includes(routeTaskKey("lesson"))
            ? [...state.completedTasks, routeTaskKey("lesson")]
            : state.completedTasks,
        stats: recordSession(
          recordStudy(state.stats, {
            grammarCorrect: state.stats.grammarCorrect + score,
            grammarTotal: state.stats.grammarTotal + lesson.quiz.length,
          }),
          {
            kind: "grammar",
            total: lesson.quiz.length,
            correct: score,
            seconds,
          }
        ),
        mistakes,
      };
    });
    setShowSummary(true);
  };

  if (showSummary) {
    return (
      <SessionSummary
        title={lesson.title}
        correct={score}
        total={lesson.quiz.length}
        seconds={(Date.now() - startedAt.current) / 1000}
        streak={app.stats.streak}
        misses={summaryMisses}
        onRetryMisses={
          summaryMisses.length > 0
            ? () => {
                // 맞힌 문항은 그대로 두고 틀린 것만 비운다.
                // 예전에는 전부 초기화해서 "틀린 것만"이라는 이름과 달랐다.
                const kept: Record<number, number> = {};
                lesson.quiz.forEach((q, i) => {
                  if (answers[i] === q.answer) kept[i] = answers[i];
                });
                setAnswers(kept);
                setSubmitted(false);
                setShowSummary(false);
                startedAt.current = Date.now();
              }
            : undefined
        }
        onDone={() => {
          setShowSummary(false);
          onBack();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <button
        className="text-[0.875rem] font-medium text-muted-foreground"
        onClick={onBack}
      >
        ← 강의 목록으로
      </button>
      <Panel className="space-y-4">
        <div>
          <Eyebrow>
            {lesson.level} · {LEVEL_LABEL[lesson.level]}
          </Eyebrow>
          <h2 className="mt-1 flex items-center gap-2 text-[1.25rem] font-bold tracking-tight">
            {lesson.title}
            {completed && <CheckCircle2 size={18} className="text-primary" />}
          </h2>
          <p className="mt-1 text-[0.875rem] text-muted-foreground">
            {lesson.koreanGap}
          </p>
        </div>
        <div className="space-y-2.5">
          {lesson.explanation.map((paragraph, i) => (
            <p key={i} className="text-[0.9375rem] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="space-y-2">
          <Eyebrow className="text-muted-foreground">예문</Eyebrow>
          {lesson.examples.map((example, i) => {
            const sentence = dt(example.en, dialect);
            return (
              <button
                key={i}
                onClick={() => speak(sentence, app.settings.rate)}
                className="flex w-full items-start gap-2.5 rounded-xl bg-muted/50 p-3 text-left transition-colors hover:bg-muted"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere]">
                    {sentence}
                  </span>
                  <span className="block text-[0.8125rem] text-muted-foreground">
                    {example.ko}
                  </span>
                </span>
                <Volume2
                  size={15}
                  className="mt-1 shrink-0 text-muted-foreground"
                />
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel className="space-y-4">
        <Eyebrow>QUIZ · 5문항 중 4개 이상 통과</Eyebrow>
        {lesson.quiz.map((question, qi) => (
          <div key={qi} className="space-y-2">
            <p className="text-[0.9375rem] font-semibold leading-relaxed">
              {qi + 1}. {question.q}
            </p>
            <div className="grid gap-1.5">
              {question.options.map((option, oi) => {
                const picked = answers[qi] === oi;
                const showState =
                  submitted && (oi === question.answer || picked);
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => {
                      setAnswers(prev => ({ ...prev, [qi]: oi }));
                      // 고른 보기가 영어면 바로 들려 준다. 눈으로만 읽고 넘어가지 않게.
                      if (app.settings.autoSpeak && speakable(option))
                        speak(option, app.settings.rate);
                    }}
                    className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-left text-[0.875rem] transition-colors ${
                      submitted && oi === question.answer
                        ? "border-primary bg-accent text-accent-foreground"
                        : submitted && picked
                          ? "border-destructive/60 bg-destructive/10"
                          : picked
                            ? "border-primary bg-accent/50"
                            : "bg-card hover:border-ring"
                    }`}
                  >
                    <span className="flex-1">{option}</span>
                    {showState && oi === question.answer && (
                      <Check size={15} className="text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                {question.explain}
              </p>
            )}
          </div>
        ))}
        {submitted ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
          >
            다시 풀기
          </Button>
        ) : (
          <Button className="w-full" disabled={!allAnswered} onClick={submit}>
            채점하기
          </Button>
        )}
      </Panel>
    </div>
  );
}

export function GrammarScreen() {
  const { app, update } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const resumePoint = resumeFor(app, "grammar");

  // 홈에서 "계속"으로 들어왔으면 풀던 강의를 바로 연다.
  useEffect(() => {
    if (hasResumeRequest() && resumePoint) setSelectedId(resumePoint.lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groups = useMemo(() => {
    const order = ["A1", "A2", "B1"] as const;
    const myIndex = order.indexOf(app.profile.level);
    return [...order]
      .sort(
        (a, b) =>
          Math.abs(order.indexOf(a) - myIndex) -
          Math.abs(order.indexOf(b) - myIndex)
      )
      .map(level => ({
        level,
        lessons: allLessons().filter(l => l.level === level),
      }))
      .filter(g => g.lessons.length > 0);
  }, [app.profile.level]);

  const selected = selectedId
    ? allLessons().find(l => l.id === selectedId)
    : null;
  if (selected)
    return (
      <LessonDetail
        lesson={selected}
        onBack={() => {
          clearResumeRequest();
          setSelectedId(null);
        }}
        initialAnswers={
          resumePoint?.lessonId === selected.id
            ? resumePoint.answers
            : undefined
        }
      />
    );

  if (allLessons().length === 0)
    return (
      <Empty title="강의 준비 중" text="문법 강의 콘텐츠를 준비하고 있어요." />
    );

  const resumeLesson = resumePoint
    ? allLessons().find(l => l.id === resumePoint.lessonId)
    : null;

  return (
    <div className="space-y-5">
      {resumeLesson && (
        <Panel className="flex items-center gap-3 border-primary/40 bg-primary/5">
          <div className="min-w-0 flex-1">
            <p className="text-[0.75rem] font-semibold text-primary">
              풀다 만 강의가 있어요
            </p>
            <p className="mt-0.5 truncate text-[0.9375rem] font-bold">
              {resumeLesson.title}{" "}
              <span className="font-mono text-[0.8125rem] font-medium text-muted-foreground">
                {Object.keys(resumePoint?.answers ?? {}).length} /{" "}
                {resumeLesson.quiz.length}
              </span>
            </p>
          </div>
          <Button size="sm" onClick={() => setSelectedId(resumeLesson.id)}>
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
      {groups.map(({ level, lessons }) => {
        const done = lessons.filter(l =>
          app.completedLessons.includes(l.id)
        ).length;
        return (
          <section key={level} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Eyebrow className="text-muted-foreground">
                {level} {LEVEL_LABEL[level]}
                {level === app.profile.level && " · 내 레벨"}
              </Eyebrow>
              <span className="font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
                {done}/{lessons.length}
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl border bg-card">
              {lessons.map((lesson, i) => {
                const isDone = app.completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedId(lesson.id)}
                    className={`flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${i > 0 ? "border-t" : ""}`}
                  >
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.75rem] font-semibold ${
                        isDone
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isDone ? <Check size={14} /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] font-semibold">
                        {lesson.title}
                      </span>
                      <span className="block truncate text-[0.8125rem] text-muted-foreground">
                        {lesson.koreanGap}
                      </span>
                    </span>
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-muted-foreground"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
