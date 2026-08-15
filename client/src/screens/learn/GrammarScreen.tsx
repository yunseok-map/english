import { useMemo, useState } from "react";
import { Check, CheckCircle2, ChevronRight, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Panel, Eyebrow, Empty } from "@/components/Panel";
import { useApp } from "@/state/context";
import { GRAMMAR_LESSONS } from "@/data";
import type { GrammarLesson } from "@/data/types";
import { dt } from "@/lib/dialect";
import { recordStudy } from "@/lib/engine";
import { speak } from "@/lib/speech";
import { LEVEL_LABEL } from "@/lib/level";
import { routeTaskKey } from "@/lib/route";

function LessonDetail({
  lesson,
  onBack,
}: {
  lesson: GrammarLesson;
  onBack: () => void;
}) {
  const { app, update } = useApp();
  const dialect = app.settings.dialect;
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const completed = app.completedLessons.includes(lesson.id);

  const score = lesson.quiz.filter((q, i) => answers[i] === q.answer).length;
  const allAnswered = lesson.quiz.every((_, i) => answers[i] !== undefined);

  const submit = () => {
    setSubmitted(true);
    const passed = score >= 4;
    update(state => ({
      ...state,
      completedLessons:
        passed && !completed
          ? [...state.completedLessons, lesson.id]
          : state.completedLessons,
      completedTasks:
        passed && !state.completedTasks.includes(routeTaskKey("lesson"))
          ? [...state.completedTasks, routeTaskKey("lesson")]
          : state.completedTasks,
      stats: recordStudy(state.stats, {
        grammarCorrect: state.stats.grammarCorrect + score,
        grammarTotal: state.stats.grammarTotal + lesson.quiz.length,
      }),
      mistakes: passed
        ? state.mistakes
        : [
            {
              id: `g-${Date.now()}`,
              type: "grammar" as const,
              label: lesson.title,
              count: 1,
              nextReview: Date.now() + 3 * 86400000,
            },
            ...state.mistakes,
          ],
    }));
    toast(
      passed
        ? `통과! ${score}/${lesson.quiz.length} 정답이에요.`
        : `${score}/${lesson.quiz.length} — 4개 이상 맞히면 완료돼요.`
    );
  };

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
                    onClick={() => setAnswers(prev => ({ ...prev, [qi]: oi }))}
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
  const { app } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
        lessons: GRAMMAR_LESSONS.filter(l => l.level === level),
      }))
      .filter(g => g.lessons.length > 0);
  }, [app.profile.level]);

  const selected = selectedId
    ? GRAMMAR_LESSONS.find(l => l.id === selectedId)
    : null;
  if (selected)
    return (
      <LessonDetail lesson={selected} onBack={() => setSelectedId(null)} />
    );

  if (GRAMMAR_LESSONS.length === 0)
    return (
      <Empty title="강의 준비 중" text="문법 강의 콘텐츠를 준비하고 있어요." />
    );

  return (
    <div className="space-y-5">
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
