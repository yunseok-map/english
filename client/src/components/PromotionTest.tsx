import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SessionShell } from "@/components/SessionShell";
import { Transition } from "@/components/Transition";
import { buildPromotionTest, LEVEL_LABEL, PROMOTION_PASS } from "@/lib/level";
import { haptic } from "@/lib/haptics";
import type { Level } from "@/types";

/**
 * 승급 확인 테스트.
 *
 * 조건을 채웠다고 바로 올려 주면 "올라갔는데 하나도 모르겠다"가 된다.
 * 다음 레벨 단어 5문항으로 감을 확인하고, 4개 이상 맞히면 승급한다.
 * 30문항 레벨 테스트를 다시 시키는 건 과하다.
 */
export function PromotionTest({
  level,
  upcoming,
  onPass,
  onClose,
}: {
  level: Level;
  upcoming: Level;
  onPass: () => void;
  onClose: () => void;
}) {
  // 하루 단위 시드 — 같은 날 다시 들어와도 문항이 흔들리지 않는다.
  const questions = useMemo(
    () => buildPromotionTest(level, Math.floor(Date.now() / 86400000)),
    [level]
  );
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="space-y-3 rounded-2xl border p-4">
        <p className="text-[0.875rem]">
          {upcoming} 레벨 단어를 불러오는 중이에요. 잠시 뒤 다시 눌러 주세요.
        </p>
        <Button variant="outline" className="w-full" onClick={onClose}>
          닫기
        </Button>
      </div>
    );
  }

  if (done) {
    const passed = correct >= PROMOTION_PASS;
    return (
      <div className="space-y-3 rounded-2xl border p-4 text-center">
        <p className="font-mono text-[2rem] font-bold tabular-nums">
          {correct}
          <span className="text-[1rem] text-muted-foreground">
            /{questions.length}
          </span>
        </p>
        <p className="text-[0.9375rem] font-semibold">
          {passed
            ? `${upcoming} ${LEVEL_LABEL[upcoming]} 준비 완료!`
            : "조금만 더 다지고 올라가요"}
        </p>
        <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
          {passed
            ? "지금 올라가면 오늘의 루트가 새 레벨로 바뀝니다."
            : `${PROMOTION_PASS}개 이상 맞히면 승급할 수 있어요. 내 레벨 복습을 조금 더 하고 다시 도전해 보세요.`}
        </p>
        <div className="grid gap-2">
          {passed && (
            <Button
              className="w-full"
              onClick={() => {
                haptic.heavy();
                onPass();
              }}
            >
              {upcoming} 레벨로 올라가기
            </Button>
          )}
          <Button variant="outline" className="w-full" onClick={onClose}>
            {passed ? "나중에" : "닫기"}
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[index];
  const answer = (choice: number) => {
    if (picked !== null) return;
    setPicked(choice);
    const ok = choice === question.answer;
    if (ok) {
      setCorrect(v => v + 1);
      haptic.success();
    } else {
      haptic.error();
    }
    window.setTimeout(() => {
      setPicked(null);
      if (index + 1 >= questions.length) setDone(true);
      else setIndex(v => v + 1);
    }, 700);
  };

  return (
    <div className="rounded-2xl border p-4">
      <SessionShell
        label="승급 테스트"
        step={index + 1}
        total={questions.length}
        onExit={onClose}
      >
        <Transition k={index} direction="left" className="space-y-3">
          <p className="text-center font-mono text-[1.5rem] font-bold [overflow-wrap:anywhere]">
            {question.prompt}
          </p>
          <p className="text-center text-[0.75rem] text-muted-foreground">
            이 단어의 뜻은?
          </p>
          <div className="grid gap-2">
            {question.options.map((option, i) => {
              const state =
                picked === null
                  ? "idle"
                  : i === question.answer
                    ? "correct"
                    : i === picked
                      ? "wrong"
                      : "idle";
              return (
                <button
                  key={`${option}-${i}`}
                  onClick={() => answer(i)}
                  disabled={picked !== null}
                  className={`min-h-12 rounded-xl border px-4 py-2.5 text-left text-[0.9375rem] transition-colors ${
                    state === "correct"
                      ? "border-primary bg-primary/12 text-primary"
                      : state === "wrong"
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "bg-card"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </Transition>
      </SessionShell>
    </div>
  );
}
