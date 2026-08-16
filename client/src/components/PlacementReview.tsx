import { useState } from "react";
import { Check, X } from "lucide-react";
import { Panel, Eyebrow, Empty } from "@/components/Panel";
import { QuestionText } from "@/components/QuestionText";
import type { PlacementAnswer } from "@/types";

const SECTION_LABEL: Record<PlacementAnswer["section"], string> = {
  vocab: "어휘",
  grammar: "문법",
  usage: "활용",
};

function ReviewCard({ answer }: { answer: PlacementAnswer }) {
  return (
    <Panel
      className={`space-y-3 p-4 ${answer.correct ? "" : "border-destructive/40"}`}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`flex size-5 items-center justify-center rounded-full ${
            answer.correct
              ? "bg-primary/15 text-primary"
              : "bg-destructive/15 text-destructive"
          }`}
        >
          {answer.correct ? <Check size={12} /> : <X size={12} />}
        </span>
        <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {answer.band} · {SECTION_LABEL[answer.section]}
        </span>
      </div>

      <QuestionText
        text={answer.question}
        segmented={answer.question.includes(" / ")}
      />

      <dl className="space-y-1.5 text-[0.875rem]">
        {!answer.correct && (
          <div className="flex gap-2">
            <dt className="w-12 shrink-0 text-muted-foreground">내 답</dt>
            <dd className="flex-1 font-mono text-destructive [overflow-wrap:anywhere]">
              {answer.given.trim() || "답하지 않음"}
            </dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="w-12 shrink-0 text-muted-foreground">정답</dt>
          <dd className="flex-1 font-mono text-primary [overflow-wrap:anywhere]">
            {answer.expected}
          </dd>
        </div>
      </dl>

      <p className="rounded-xl bg-muted/60 p-3 text-[0.875rem] leading-relaxed [overflow-wrap:anywhere]">
        {answer.explain}
      </p>
    </Panel>
  );
}

/**
 * 오답 설명지.
 *
 * 레벨만 알려 주고 끝내면 무엇을 모르는지는 그대로 남는다. 문항마다 내가 뭘 냈고
 * 정답이 무엇이며 왜 그런지를 붙여, 시험 자체가 한 번의 학습이 되게 한다.
 * 온보딩 결과 화면과 프로필의 지난 결과가 같은 컴포넌트를 쓴다.
 */
export function PlacementReview({ answers }: { answers: PlacementAnswer[] }) {
  const [showAll, setShowAll] = useState(false);
  if (answers.length === 0) return null;

  const wrong = answers.filter(a => !a.correct);
  const shown = showAll ? answers : wrong;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 px-0.5">
        <div>
          <Eyebrow>오답 설명지</Eyebrow>
          <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">
            {wrong.length === 0
              ? `${answers.length}문항 전부 맞혔어요.`
              : `${answers.length}문항 중 ${wrong.length}개를 틀렸어요.`}
          </p>
        </div>
        <button
          onClick={() => setShowAll(v => !v)}
          className="shrink-0 rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium hover:border-ring"
        >
          {showAll ? "틀린 것만" : "전체 보기"}
        </button>
      </div>

      {shown.length === 0 ? (
        <Empty
          title="틀린 문항이 없어요"
          text="'전체 보기'를 누르면 맞힌 문항의 설명도 볼 수 있어요."
        />
      ) : (
        <ul className="space-y-3">
          {shown.map((answer, i) => (
            <li key={`${answer.questionId}-${i}`}>
              <ReviewCard answer={answer} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
