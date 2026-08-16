import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  PenLine,
  Volume2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel, Eyebrow } from "@/components/Panel";
import { BrandMark } from "@/components/art/BrandMark";
import { PlacementReview } from "@/components/PlacementReview";
import { QuestionText, questionBody } from "@/components/QuestionText";
import { SpeakLine } from "@/components/SpeakLine";
import { Meaning } from "@/components/Meaning";
import { speakable } from "@/lib/autoSpeak";
import { speak } from "@/lib/speech";
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
  // 답을 확정했지만 아직 다음 문항으로 넘어가지 않은 상태. 채점 결과를 띄운다.
  const [graded, setGraded] = useState<PlacementAnswer | null>(null);
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
  // 직전 회차 문항은 뒤로 미룬다. 재테스트에서 같은 문제가 다시 나오지 않게.
  const [seenBefore] = useState(() => app.profile.placementSeen ?? []);
  const questions = useMemo(
    () => (pool.length ? buildPlacementSet(pool, seed, seenBefore) : []),
    [pool, seed, seenBefore]
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
        placementSeen: res
          ? res.answers.map(a => a.questionId)
          : state.profile.placementSeen,
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

  /**
   * 답을 확정한다. 바로 넘어가지 않고 채점 결과와 해설을 먼저 보여 준다.
   * 답은 이 시점에 잠기므로 정답을 보여 줘도 고쳐 낼 수는 없다.
   */
  const answer = (given: string) => {
    if (!current || graded) return;
    setGraded({
      questionId: current.id,
      band: current.band,
      section: current.section,
      question: current.question,
      given,
      expected: placementAnswerText(current),
      correct: isPlacementCorrect(current, given),
      ko: current.ko,
      answerKo: current.answerKo,
      explain: current.explain,
    });
  };

  /** 해설을 다 봤으면 다음 문항으로. 마지막이면 결과로. */
  const next = () => {
    if (!graded) return;
    const all = [...answers, graded];
    setAnswers(all);
    setGraded(null);
    setTyped("");
    if (questionIndex + 1 >= questions.length) {
      setResult(scorePlacement(all));
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
                  · 한 문항 답할 때마다 바로 정답과 해설을 보여 줘요. 답은 그
                  자리에서 잠기니 편하게 골라 보세요.
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
              <QuestionText
                text={current.question}
                segmented={current.kind === "error"}
              />

              {current.kind === "fill" ? (
                <form
                  className="space-y-2.5"
                  onSubmit={e => {
                    e.preventDefault();
                    if (typed.trim()) answer(typed);
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                    <PenLine size={14} /> 직접 입력
                  </div>
                  <Input
                    value={graded ? graded.given || "(답하지 않음)" : typed}
                    onChange={e => setTyped(e.target.value)}
                    placeholder="빈칸에 들어갈 말을 영어로 쓰세요"
                    disabled={Boolean(graded)}
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  {current.hint && !graded && (
                    <p className="text-[0.8125rem] text-muted-foreground">
                      힌트: {current.hint}
                    </p>
                  )}
                  {!graded && (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!typed.trim()}
                    >
                      확인 <ChevronRight size={16} />
                    </Button>
                  )}
                </form>
              ) : (
                <div className="space-y-2">
                  {current.options.map((option, i) => {
                    // 채점 전에는 아무 표시도 하지 않는다.
                    const state = !graded
                      ? "idle"
                      : option === graded.expected
                        ? "correct"
                        : option === graded.given
                          ? "wrong"
                          : "idle";
                    return (
                      <button
                        key={i}
                        // 채점 전에는 답하기, 채점 뒤에는 눌러서 발음 듣기.
                        onClick={() =>
                          graded
                            ? speakable(option) &&
                              speak(option, app.settings.rate)
                            : answer(option)
                        }
                        className={`flex w-full items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-[0.9375rem] transition-colors ${
                          state === "correct"
                            ? "border-primary bg-accent text-accent-foreground"
                            : state === "wrong"
                              ? "border-destructive/60 bg-destructive/10"
                              : "bg-card hover:border-ring"
                        }`}
                      >
                        <span className="font-mono text-[0.8125rem] text-muted-foreground">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1 [overflow-wrap:anywhere]">
                          {option}
                        </span>
                        {state === "correct" && (
                          <Check size={17} className="shrink-0 text-primary" />
                        )}
                        {state === "wrong" && (
                          <X size={17} className="shrink-0 text-destructive" />
                        )}
                        {graded && speakable(option) && (
                          <Volume2
                            size={15}
                            className="shrink-0 text-muted-foreground"
                            aria-hidden
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </Panel>

            {graded ? (
              <>
                <Panel
                  className={`space-y-3 ${
                    graded.correct
                      ? "border-primary/50"
                      : "border-destructive/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex size-6 items-center justify-center rounded-full ${
                        graded.correct
                          ? "bg-primary/15 text-primary"
                          : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {graded.correct ? <Check size={14} /> : <X size={14} />}
                    </span>
                    <strong
                      className={`text-[0.9375rem] font-bold ${
                        graded.correct ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {graded.correct ? "정답이에요" : "틀렸어요"}
                    </strong>
                  </div>

                  {!graded.correct && (
                    <dl className="space-y-1.5 text-[0.875rem]">
                      <div className="flex gap-2">
                        <dt className="w-12 shrink-0 text-muted-foreground">
                          내 답
                        </dt>
                        <dd className="flex-1 font-mono text-destructive [overflow-wrap:anywhere]">
                          {graded.given.trim() || "답하지 않음"}
                        </dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-12 shrink-0 text-muted-foreground">
                          정답
                        </dt>
                        <dd className="flex-1">
                          <SpeakLine text={graded.expected} tone="primary" />
                        </dd>
                      </div>
                    </dl>
                  )}

                  {/* 4지선다는 보기 자체를 눌러 들을 수 있으니 여기서는 빼고,
                      보기가 없는 직접입력만 정답을 들려 준다. */}
                  {graded.correct && current.kind === "fill" && (
                    <SpeakLine text={graded.expected} tone="primary" />
                  )}

                  {/* 답을 낸 지금부터 해석을 보여 준다. */}
                  <Meaning en={questionBody(graded.question)} ko={graded.ko} />
                  <Meaning
                    en={graded.expected}
                    ko={graded.answerKo}
                    label="정답 해석"
                  />

                  <p className="rounded-xl bg-muted/60 p-3 text-[0.875rem] leading-relaxed [overflow-wrap:anywhere]">
                    {graded.explain}
                  </p>
                </Panel>

                <Button className="w-full" size="lg" onClick={next} autoFocus>
                  {questionIndex + 1 >= questions.length
                    ? "결과 보기"
                    : "다음 문항"}{" "}
                  <ChevronRight size={17} />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => answer("")}
              >
                모르겠어요, 넘어가기
              </Button>
            )}
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

            <Panel className="space-y-2 bg-muted/40">
              <Eyebrow className="text-muted-foreground">판정 근거</Eyebrow>
              <p className="text-[0.875rem] leading-relaxed">{result.reason}</p>
              {result.shortOf && (
                <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                  다음 레벨까지 모자란 부분: {result.shortOf}
                </p>
              )}
            </Panel>

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
