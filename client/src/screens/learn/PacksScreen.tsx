import { useMemo, useState } from "react";
import { Check, ChevronRight, Play, Save, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Panel, Eyebrow, SectionTitle, Empty } from "@/components/Panel";
import { ProgressBar } from "@/components/Progress";
import { useApp } from "@/state/context";
import { dataRevision, packs } from "@/data";
import type { ConversationPack } from "@/data/types";
import { dt } from "@/lib/dialect";
import { createSentenceCard, recordSession, recordStudy } from "@/lib/engine";
import { speak } from "@/lib/speech";
import { LEVEL_LABEL, LEVEL_ORDER } from "@/lib/level";
import { routeTaskKey } from "@/lib/route";

function PackDetail({
  pack,
  onBack,
}: {
  pack: ConversationPack;
  onBack: () => void;
}) {
  const { app, update } = useApp();
  const dialect = app.settings.dialect;
  const [revealCount, setRevealCount] = useState(1);
  const [startedAt] = useState(() => Date.now());
  const finished = revealCount >= pack.roleplay.length;

  const savePhrase = (en: string, ko: string) => {
    // Date.now() 를 세 번 부르면 밀리초가 어긋나는 순간 문장 id 와 카드 id 가
    // 달라진다. 그러면 문장장에서 지워도 복습 카드가 남는다. 한 번만 찍는다.
    const stamp = Date.now();
    const cardId = `sentence-${stamp}`;
    update(state => ({
      ...state,
      savedPhrases: [
        {
          id: `phrase-${stamp}`,
          ko,
          en,
          tone: "daily" as const,
          createdAt: stamp,
        },
        ...state.savedPhrases,
      ],
      srs: {
        ...state.srs,
        [cardId]: createSentenceCard(cardId, en, ko),
      },
    }));
    toast.success("내 문장장과 복습 카드에 저장했어요.");
  };

  const advance = () => {
    const next = Math.min(revealCount + 1, pack.roleplay.length);
    setRevealCount(next);
    const line = pack.roleplay[next - 1];
    // 상대 대사 자동 재생도 "자동 발음" 설정을 따른다. 예전에는 설정을 꺼도
    // 회화팩에서만 소리가 나서, 조용히 볼 방법이 없었다.
    if (line?.speaker === "staff" && app.settings.autoSpeak)
      speak(dt(line.en, dialect), app.settings.rate);
    if (next >= pack.roleplay.length) {
      const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      update(state => ({
        ...state,
        completedTasks: state.completedTasks.includes(routeTaskKey("pack"))
          ? state.completedTasks
          : [...state.completedTasks, routeTaskKey("pack")],
        completedPacks: state.completedPacks.includes(pack.id)
          ? state.completedPacks
          : [...state.completedPacks, pack.id],
        // 회화팩도 학습 추이에 남긴다. 예전에는 단어·문법·오답만 기록돼서
        // 팩만 하고 나온 날은 그래프에 아무것도 나오지 않았다.
        stats: recordSession(recordStudy(state.stats), {
          kind: "pack",
          correct: pack.roleplay.length,
          total: pack.roleplay.length,
          seconds,
        }),
      }));
    }
  };

  return (
    <div className="space-y-4">
      <button
        className="text-[0.875rem] font-medium text-muted-foreground"
        onClick={onBack}
      >
        ← 회화팩 목록으로
      </button>
      <Panel className="space-y-1.5">
        <Eyebrow>
          {pack.icon} {pack.level} · {LEVEL_LABEL[pack.level]}
        </Eyebrow>
        <h2 className="text-[1.25rem] font-bold tracking-tight">
          {pack.title}
        </h2>
        <p className="text-[0.875rem] text-muted-foreground">{pack.scene}</p>
      </Panel>

      {/* 롤플레이 */}
      <Panel className="space-y-3">
        {/*
          어디까지 왔는지 보여 준다. 예전에는 대사만 쌓여서 앞으로 몇 줄이
          남았는지 알 수 없었고, 다른 학습 화면에는 다 있는 진행 표시가
          회화팩에만 없었다.
        */}
        <div className="flex items-baseline justify-between gap-2">
          <Eyebrow className="text-muted-foreground">
            역할극 — 한 줄씩 따라가요
          </Eyebrow>
          <span
            className="font-mono text-[0.75rem] tabular-nums text-muted-foreground"
            aria-label={`${pack.roleplay.length}줄 중 ${revealCount}번째`}
          >
            {revealCount}/{pack.roleplay.length}
          </span>
        </div>
        <div className="text-primary">
          <ProgressBar ratio={revealCount / pack.roleplay.length} />
        </div>
        <div className="space-y-2">
          {pack.roleplay.slice(0, revealCount).map((line, i) => {
            const sentence = dt(line.en, dialect);
            const mine = line.speaker === "you";
            return (
              <div
                key={i}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <button
                  onClick={() => speak(sentence, app.settings.rate)}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-left ${
                    mine
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted"
                  }`}
                >
                  <span className="block font-mono text-[0.875rem] leading-relaxed [overflow-wrap:anywhere]">
                    {sentence}
                  </span>
                  <span
                    className={`block text-[0.75rem] ${mine ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                  >
                    {line.ko}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        {!finished ? (
          <Button className="w-full" onClick={advance}>
            <Play size={15} /> 다음 대사
          </Button>
        ) : (
          <p className="text-center text-[0.8125rem] font-medium text-primary">
            역할극 완료! 오늘 루트에 반영했어요.
          </p>
        )}
      </Panel>

      {/* 표현 */}
      <Panel className="space-y-2.5">
        <Eyebrow className="text-muted-foreground">핵심 표현 12</Eyebrow>
        <div className="space-y-2">
          {pack.expressions.map((expression, i) => {
            const sentence = dt(expression.en, dialect);
            return (
              <div key={i} className="rounded-xl bg-muted/50 p-3">
                <p className="font-mono text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere]">
                  {sentence}
                </p>
                <p className="text-[0.8125rem] text-muted-foreground">
                  {expression.ko}
                </p>
                {expression.note && (
                  <p className="mt-1 text-[0.75rem] text-accent-foreground">
                    💡 {expression.note}
                  </p>
                )}
                <div className="mt-1.5 flex gap-1.5">
                  <button
                    onClick={() => speak(sentence, app.settings.rate)}
                    className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-card px-2.5 text-[0.75rem] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <Volume2 size={13} /> 듣기
                  </button>
                  <button
                    onClick={() => savePhrase(sentence, expression.ko)}
                    className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-card px-2.5 text-[0.75rem] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <Save size={13} /> 저장
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {pack.auNotes && pack.auNotes.length > 0 && (
        <Panel className="space-y-2 border-[#f2a449]/40 bg-[#f2a449]/8">
          <Eyebrow className="text-[#b26b10]">호주에서는</Eyebrow>
          <ul className="space-y-1.5">
            {pack.auNotes.map((note, i) => (
              <li key={i} className="text-[0.875rem] leading-relaxed">
                · {note}
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

export function PacksScreen() {
  const { app } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const list = packs();
  // dataRevision 을 deps 에 둔다. 회화팩은 별도 청크라 화면이 먼저 뜨고
  // 조금 뒤에 채워지는데, 이게 없으면 빈 목록에서 다시 그려지지 않는다.
  const sorted = useMemo(() => {
    const myIndex = LEVEL_ORDER.indexOf(app.profile.level);
    return [...list].sort(
      (a, b) =>
        Math.abs(LEVEL_ORDER.indexOf(a.level) - myIndex) -
        Math.abs(LEVEL_ORDER.indexOf(b.level) - myIndex)
    );
  }, [app.profile.level, dataRevision()]);

  const selected = selectedId ? list.find(p => p.id === selectedId) : null;
  if (selected)
    return <PackDetail pack={selected} onBack={() => setSelectedId(null)} />;

  if (list.length === 0)
    return (
      <Empty
        title="회화팩 준비 중"
        text="상황별 회화 콘텐츠를 준비하고 있어요."
      />
    );

  return (
    <div className="space-y-2.5">
      <SectionTitle aside={`${app.completedPacks.length}/${list.length}`}>
        상황별 회화팩
      </SectionTitle>
      <div className="space-y-2">
        {sorted.map(pack => {
          const done = app.completedPacks.includes(pack.id);
          return (
            <button
              key={pack.id}
              onClick={() => setSelectedId(pack.id)}
              className="flex w-full items-center gap-3.5 rounded-2xl border bg-card p-3.5 text-left transition-transform active:scale-[0.99]"
            >
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-muted text-[1.25rem]">
                {pack.icon}
                {done && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <span className="truncate">{pack.title}</span>
                  {pack.level === app.profile.level && (
                    <b className="shrink-0 rounded-full bg-accent px-1.5 py-0.5 text-[0.625rem] font-bold text-accent-foreground">
                      추천
                    </b>
                  )}
                </span>
                <span className="block truncate text-[0.8125rem] text-muted-foreground">
                  {pack.level} · {pack.scene}
                </span>
              </span>
              <ChevronRight
                size={17}
                className="shrink-0 text-muted-foreground/60"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
