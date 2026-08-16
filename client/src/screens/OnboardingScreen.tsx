import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, ChevronRight, PenLine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel, Eyebrow } from "@/components/Panel";
import { BrandMark } from "@/components/art/BrandMark";
import { PlacementReview } from "@/components/PlacementReview";
import { useApp } from "@/state/context";
import { loadPlacement } from "@/data";
import type { PlacementQuestion } from "@/data/types";
import {
  LEVEL_DESC,
  LEVEL_LABEL,
  PLACEMENT_SECTIONS,
  buildPlacementSet,
  isPlacementCorrect,
  placementAnswerText,
  scorePlacement,
  type PlacementOutcome,
} from "@/lib/level";
import { buildDailyRoute } from "@/lib/route";
import type { PlacementAnswer } from "@/types";

const SECTION_LABEL: Record<string, string> = {
  vocab: "어휘",
  grammar: "문법",
  usage: "활용",
};

type Step = "intro" | "testIntro" | "test" | "result";

export function OnboardingScreen({
  mode,
  onDone,
}: {
  mode: "initial" | "retest";
  onDone: () => void;
}) {
  const { app, update } = useApp();
  const [step, setStep] = useState<Step>(
    mode === "retest" ? "testIntro" : "intro"
  );
  const [name, setName] = useState(
    app.profile.name === "학습자" ? "" : app.profile.name
  );
  const [date, setDate] = useState(app.profile.departureDate);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<PlacementAnswer[]>([]);
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<PlacementOutcome | null>(null);

  // 문항 풀은 온보딩·재테스트에서만 쓴다. 초기 번들에서 빼고 여기서 불러온다.
  const [pool, setPool] = useState<PlacementQuestion[]>([]);
  useEffect(() => {
    let alive = true;
    void loadPlacement().then(list => {
      if (alive) setPool(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  // 한 번 정한 seed 를 끝까지 쓴다. 리렌더마다 새로 뽑으면 문제가 바뀌어 버린다.
  const [seed] = useState(() => Date.now());
  const questions = useMemo(
    () => (pool.length ? buildPlacementSet(pool, seed) : []),
    [pool, seed]
  );
  const current = questions[questionIndex];

  const finish = (res: PlacementOutcome | null) => {
    const level = res?.level ?? "A1";
    update(state => ({
      ...state,
      profile: {
        ...state.profile,
        name: name.trim() || state.profile.name,
        departureDate: date || state.profile.departureDate,
        level,
        onboardingDone: true,
        placement: res
          ? {
              takenAt: new Date().toISOString(),
              correct: res.correct,
              total: res.answers.length,
              asked: res.total,
              sections: res.sections,
              answers: res.answers,
            }
          : state.profile.placement,
        levelHistory: [
          ...state.profile.levelHistory,
          {
            level,
            at: new Date().toISOString(),
            source: mode === "retest" ? "retest" : "placement",
          },
        ],
      },
    }));
    onDone();
  };

  /** 답 하나를 기록하고 다음 문항으로. 시험 중에는 정답을 알려 주지 않는다. */
  const submit = (given: string) => {
    if (!current) return;
    const entry: PlacementAnswer = {
      questionId: current.id,
      band: current.band,
      section: current.section,
      question: current.question,
      given,
      expected: placementAnswerText(current),
      correct: isPlacementCorrect(current, given),
      explain: current.explain,
    };
    const next = [...answers, entry];
    setAnswers(next);
    setTyped("");
    if (questionIndex + 1 >= questions.length) {
      setResult(scorePlacement(next));
      setStep("result");
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const previewRoute = useMemo(() => {
    if (!result) return null;
    return buildDailyRoute({
      ...app,
      profile: { ...app.profile, level: result.level },
    });
  }, [result, app]);

  return (
    <div className="min-h-dvh bg-background pb-[calc(24px+var(--safe-bottom))] pt-[calc(var(--safe-top)+20px)]">
      <div className="mx-auto w-full max-w-[560px] space-y-5 px-5">
        {step === "intro" && (
          <>
            <div className="flex items-center gap-3 pt-6">
              <BrandMark className="size-12" />
              <div>
                <Eyebrow>WORKING HOLIDAY ENGLISH</Eyebrow>
                <h1 className="text-[1.5rem] font-bold tracking-tight">
                  워홀 영어 훈련
                </h1>
              </div>
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              출국 전까지, 현지에서 바로 쓰는 영어만 훈련해요.
              <br />
              먼저 간단한 정보를 입력해 주세요.
            </p>
            <Panel className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-[0.875rem] font-semibold">
                  이름 (별명도 좋아요)
                </span>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="예: 윤석"
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-[0.875rem] font-semibold">
                  출국 예정일
                </span>
                <Input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </label>
              <Button
                className="w-full"
                size="lg"
                onClick={() => setStep("testIntro")}
              >
                다음 <ArrowRight size={17} />
              </Button>
            </Panel>
          </>
        )}

        {step === "testIntro" && (
          <>
            <div className="pt-6">
              <Eyebrow>PLACEMENT TEST</Eyebrow>
              <h1 className="mt-1 text-[1.5rem] font-bold tracking-tight">
                내 레벨을 확인하고
                <br />딱 맞는 훈련을 받아요
              </h1>
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              어휘·문법·활용 세 영역, 총 {questions.length || 36}문항이에요. 약
              10분이 걸리고, 결과에 따라 매일의 학습 루트가 내 레벨에 맞춰
              구성됩니다.
            </p>
            <Panel className="space-y-3">
              {PLACEMENT_SECTIONS.map((section, i) => (
                <div key={section} className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-accent font-mono text-[0.8125rem] font-semibold text-accent-foreground">
                    {i + 1}
                  </span>
                  <span className="text-[0.9375rem] font-medium">
                    {SECTION_LABEL[section]}
                  </span>
                  <span className="ml-auto font-mono text-[0.8125rem] text-muted-foreground">
                    12문항
                  </span>
                </div>
              ))}
            </Panel>
            <Panel className="space-y-2 bg-muted/40">
              <Eyebrow className="text-muted-foreground">이렇게 봐요</Eyebrow>
              <ul className="space-y-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                <li>· 보기 없이 직접 입력하는 문항이 섞여 있어요.</li>
                <li>
                  · 정답은 시험 중에 알려 주지 않고, 끝나고 한꺼번에 봐요.
                </li>
                <li>
                  · 끝나면 틀린 문항마다 왜 틀렸는지 설명지를 드려요. 프로필에서
                  다시 볼 수 있어요.
                </li>
                <li>· 다시 볼 때는 매번 다른 문항이 나와요.</li>
              </ul>
            </Panel>
            <div className="space-y-2.5">
              <Button
                className="w-full"
                size="lg"
                disabled={questions.length === 0}
                onClick={() => setStep("test")}
              >
                {questions.length === 0
                  ? "문항 불러오는 중…"
                  : "레벨 테스트 시작"}
                <ChevronRight size={17} />
              </Button>
              {mode === "initial" ? (
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={() => finish(null)}
                >
                  나중에 할게요 (기초 레벨로 시작)
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={onDone}
                >
                  <X size={15} /> 재테스트 취소
                </Button>
              )}
            </div>
          </>
        )}

        {step === "test" && current && (
          <>
            <div className="flex items-center justify-between pt-2">
              <Eyebrow>
                {SECTION_LABEL[current.section]} · {questionIndex + 1} /{" "}
                {questions.length}
              </Eyebrow>
              <span className="font-mono text-[0.75rem] text-muted-foreground">
                LEVEL TEST
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={questionIndex + 1}
              aria-valuemin={0}
              aria-valuemax={questions.length}
            >
              <i
                className="block h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${((questionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <Panel className="space-y-4">
              <p className="text-[1.0625rem] font-semibold leading-relaxed [overflow-wrap:anywhere]">
                {current.question}
              </p>

              {current.kind === "fill" ? (
                <form
                  className="space-y-2.5"
                  onSubmit={e => {
                    e.preventDefault();
                    if (typed.trim()) submit(typed);
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                    <PenLine size={14} /> 직접 입력
                  </div>
                  <Input
                    value={typed}
                    onChange={e => setTyped(e.target.value)}
                    placeholder="빈칸에 들어갈 말을 영어로 쓰세요"
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  {current.hint && (
                    <p className="text-[0.8125rem] text-muted-foreground">
                      힌트: {current.hint}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!typed.trim()}
                  >
                    확인 <ChevronRight size={16} />
                  </Button>
                </form>
              ) : (
                <div className="space-y-2">
                  {current.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => submit(option)}
                      className="flex w-full items-center gap-2.5 rounded-xl border bg-card px-4 py-3 text-left text-[0.9375rem] transition-colors hover:border-ring"
                    >
                      <span className="font-mono text-[0.8125rem] text-muted-foreground">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 [overflow-wrap:anywhere]">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </Panel>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => submit("")}
            >
              모르겠어요, 넘어가기
            </Button>
          </>
        )}

        {step === "result" && result && (
          <>
            <div className="pt-6 text-center">
              <Eyebrow>YOUR LEVEL</Eyebrow>
              <h1 className="mt-2 text-[2rem] font-bold tracking-tight">
                {result.level}{" "}
                <span className="text-primary">
                  {LEVEL_LABEL[result.level]}
                </span>
              </h1>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {LEVEL_DESC[result.level]}
              </p>
            </div>

            <Panel className="space-y-3">
              <Eyebrow className="text-muted-foreground">난이도별 결과</Eyebrow>
              {(["A1", "A2", "B1"] as const).map(band => (
                <div key={band} className="flex items-center gap-3">
                  <span className="w-16 font-mono text-[0.8125rem] font-semibold">
                    {band} {LEVEL_LABEL[band]}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <i
                      className="block h-full rounded-full bg-primary"
                      style={{
                        width: `${(result.correct[band] / Math.max(result.total[band], 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
                    {result.correct[band]}/{result.total[band]}
                  </span>
                </div>
              ))}
            </Panel>

            <Panel className="space-y-3">
              <Eyebrow className="text-muted-foreground">영역별 결과</Eyebrow>
              {PLACEMENT_SECTIONS.map(section => {
                const s = result.sections[section];
                return (
                  <div key={section} className="flex items-center gap-3">
                    <span className="w-16 text-[0.8125rem] font-semibold">
                      {SECTION_LABEL[section]}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <i
                        className="block h-full rounded-full bg-primary"
                        style={{
                          width: `${(s.correct / Math.max(s.total, 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
                      {s.correct}/{s.total}
                    </span>
                  </div>
                );
              })}
            </Panel>

            <PlacementReview answers={result.answers} />

            {previewRoute && (
              <Panel className="space-y-2.5">
                <Eyebrow className="text-muted-foreground">
                  매일 이렇게 훈련해요
                </Eyebrow>
                <ul className="space-y-1.5 text-[0.9375rem]">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary" /> 새 단어{" "}
                    {Math.min(
                      previewRoute.newWords.length,
                      app.settings.dailyNewWords
                    )}
                    개 + SRS 복습
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary" /> 문법 강의 1개:{" "}
                    {previewRoute.nextLesson?.title ?? "레벨 맞춤 강의"}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary" /> 회화팩:{" "}
                    {previewRoute.pack?.title ?? "상황별 회화"}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary" /> 받아쓰기{" "}
                    {previewRoute.dictation.length}문장
                  </li>
                </ul>
              </Panel>
            )}

            <Button className="w-full" size="lg" onClick={() => finish(result)}>
              {mode === "retest" ? "레벨 적용하기" : "훈련 시작하기"}{" "}
              <ArrowRight size={17} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
