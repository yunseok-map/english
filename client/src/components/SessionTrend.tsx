import { Panel, Eyebrow } from "@/components/Panel";
import { formatDuration } from "@/components/SessionSummary";
import type { SessionKind, SessionRecord } from "@/types";

const KIND_LABEL: Record<SessionKind, string> = {
  words: "단어",
  review: "복습",
  grammar: "문법",
  pack: "회화팩",
  dictation: "받아쓰기",
  pronunciation: "발음",
  speak: "말하기",
};

/**
 * 최근 세션 정답률 추이.
 *
 * 숫자 합계(배운 단어 N개)만 보여 주면 "요즘 잘 되고 있나"를 알 수 없다.
 * 세션별 정답률을 막대로 늘어놓으면 흐름이 바로 보인다.
 */
export function SessionTrend({ sessions }: { sessions: SessionRecord[] }) {
  if (sessions.length === 0) return null;

  const recent = sessions.slice(-14);
  const totals = recent.reduce(
    (acc, s) => ({
      correct: acc.correct + s.correct,
      total: acc.total + s.total,
      seconds: acc.seconds + s.seconds,
    }),
    { correct: 0, total: 0, seconds: 0 }
  );
  const average = totals.total
    ? Math.round((totals.correct / totals.total) * 100)
    : 0;

  return (
    <Panel className="space-y-3">
      <div className="flex items-baseline justify-between">
        <Eyebrow className="text-muted-foreground">최근 학습 추이</Eyebrow>
        <span className="font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
          평균 {average}%
        </span>
      </div>

      <div
        className="flex h-20 items-end gap-1"
        role="img"
        aria-label={`최근 ${recent.length}개 세션 평균 정답률 ${average}퍼센트`}
      >
        {recent.map((session, i) => {
          const ratio = session.total ? session.correct / session.total : 0;
          return (
            // 막대 높이를 %로 주려면 부모 높이가 정해져 있어야 한다. 예전에는
            // 이 칸이 auto 여서 %가 무시됐고 막대가 아예 그려지지 않았다.
            // h-full 로 바깥 h-20 을 물려받게 하고, 막대는 아래에 붙인다.
            <div
              key={`${session.at}-${i}`}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <div
                className={`w-full rounded-t-md ${
                  ratio >= 0.8
                    ? "bg-primary"
                    : ratio >= 0.5
                      ? "bg-primary/55"
                      : "bg-destructive/50"
                }`}
                style={{ height: `${Math.max(8, ratio * 100)}%` }}
                title={`${KIND_LABEL[session.kind]} ${session.correct}/${session.total}`}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[0.75rem] text-muted-foreground">
        <span>세션 {recent.length}회</span>
        <span>
          총 {totals.total}문항 · {formatDuration(totals.seconds)}
        </span>
      </div>
    </Panel>
  );
}
