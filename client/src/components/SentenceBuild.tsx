import { useState } from "react";
import { Check, ChevronRight, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, Eyebrow } from "@/components/Panel";
import { checkSentence } from "@/lib/sentenceCheck";
import { speak } from "@/lib/speech";
import { dt } from "@/lib/dialect";
import { useApp } from "@/state/context";
import type { GrammarLesson } from "@/data/types";

const VERDICT = {
  exact: { label: "그대로 맞혔어요", tone: "text-primary" },
  close: { label: "거의 맞았어요", tone: "text-primary" },
  off: { label: "다시 견줘 보세요", tone: "text-muted-foreground" },
} as const;

/**
 * 문장 만들기 연습.
 *
 * 강의를 읽고 예문을 눈으로 훑는 것만으로는 막상 입이 안 떨어진다. 그래서
 * 예문의 한국어 해석만 문제로 내고 영어를 직접 쓰게 한다. 한국어 지문이 있으면
 * 무엇을 말해야 하는지, 그리고 어떤 어투로 말해야 하는지가 함께 정해지므로
 * "이걸 캐주얼하게 써야 하나 정중하게 써야 하나" 로 헤매지 않는다.
 *
 * 작문은 정답이 하나가 아니라서 단어 단위로 얼마나 가까운지만 본다. 어순은
 * 보지 않는다. 어느 경우든 모범답안을 함께 보여 준다.
 */
export function SentenceBuild({ lesson }: { lesson: GrammarLesson }) {
  const { app } = useApp();
  const dialect = app.settings.dialect;
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);

  const example = lesson.examples[index];
  if (!example) return null;

  const model = dt(example.en, dialect);
  const result = checked ? checkSentence(typed, model) : null;
  const last = index + 1 >= lesson.examples.length;

  const reset = (nextIndex: number) => {
    setIndex(nextIndex);
    setTyped("");
    setChecked(false);
  };

  return (
    <Panel className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Eyebrow>문장 만들기</Eyebrow>
        <span className="font-mono text-[0.75rem] tabular-nums text-muted-foreground">
          {index + 1} / {lesson.examples.length}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-[0.8125rem] text-muted-foreground">
          아래 한국어를 영어로 옮겨 보세요.
        </p>
        <p className="rounded-xl bg-muted/60 p-3 text-[0.9375rem] font-semibold leading-relaxed [overflow-wrap:anywhere]">
          {example.ko}
        </p>
      </div>

      <form
        className="space-y-2.5"
        onSubmit={e => {
          e.preventDefault();
          if (typed.trim()) setChecked(true);
        }}
      >
        <textarea
          value={typed}
          onChange={e => setTyped(e.target.value)}
          readOnly={checked}
          rows={2}
          placeholder="영어로 써 보세요"
          autoCapitalize="sentences"
          autoCorrect="off"
          spellCheck={false}
          className="w-full resize-none rounded-xl border bg-card px-3 py-2.5 font-mono text-[0.9375rem] leading-relaxed outline-none placeholder:font-sans placeholder:text-muted-foreground focus:border-ring"
        />
        {!checked && (
          <Button type="submit" className="w-full" disabled={!typed.trim()}>
            맞춰 보기 <ChevronRight size={16} />
          </Button>
        )}
      </form>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {result.verdict === "off" ? (
              <RotateCcw size={15} className="text-muted-foreground" />
            ) : (
              <Check size={15} className="text-primary" />
            )}
            <strong
              className={`text-[0.875rem] font-bold ${VERDICT[result.verdict].tone}`}
            >
              {VERDICT[result.verdict].label}
            </strong>
            <span className="ml-auto font-mono text-[0.75rem] tabular-nums text-muted-foreground">
              {Math.round(result.score * 100)}%
            </span>
          </div>

          <button
            onClick={() => speak(model, app.settings.rate)}
            className="flex w-full items-start gap-2.5 rounded-xl bg-accent/50 p-3 text-left"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[0.75rem] font-semibold text-muted-foreground">
                모범답안
              </span>
              <span className="mt-0.5 block font-mono text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere]">
                {model}
              </span>
            </span>
            <Volume2
              size={15}
              className="mt-1 shrink-0 text-muted-foreground"
            />
          </button>

          {result.verdict !== "exact" &&
            (result.missing.length > 0 || result.extra.length > 0) && (
              <dl className="space-y-1.5 text-[0.8125rem]">
                {result.missing.length > 0 && (
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-muted-foreground">
                      빠진 말
                    </dt>
                    <dd className="flex-1 font-mono [overflow-wrap:anywhere]">
                      {result.missing.join(", ")}
                    </dd>
                  </div>
                )}
                {result.extra.length > 0 && (
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-muted-foreground">
                      더 쓴 말
                    </dt>
                    <dd className="flex-1 font-mono text-muted-foreground [overflow-wrap:anywhere]">
                      {result.extra.join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            )}

          <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
            뜻이 통하면 모범답안과 달라도 괜찮아요. 단어가 얼마나 겹치는지만
            견준 값이라 어순은 채점하지 않습니다.
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setTyped("");
                setChecked(false);
              }}
            >
              <RotateCcw size={15} /> 다시 쓰기
            </Button>
            {!last && (
              <Button className="flex-1" onClick={() => reset(index + 1)}>
                다음 문장 <ChevronRight size={16} />
              </Button>
            )}
            {last && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => reset(0)}
              >
                처음부터
              </Button>
            )}
          </div>
        </div>
      )}
    </Panel>
  );
}
