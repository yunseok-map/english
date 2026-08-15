import { Plus, X, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Panel, Eyebrow } from "@/components/Panel";
import { useApp } from "@/state/context";
import { dt, localizeCollocation, showsHangulHint } from "@/lib/dialect";
import { createWordCard } from "@/lib/engine";
import { speak } from "@/lib/speech";
import type { WordEntry } from "@/data/types";

const TONE_LABEL = { friend: "친구", daily: "일상", business: "격식" } as const;

export function WordDetail({
  word,
  onClose,
}: {
  word: WordEntry;
  onClose?: () => void;
}) {
  const { app, update } = useApp();
  const dialect = app.settings.dialect;
  const display = dt(word.word, dialect);
  const inSrs = Boolean(app.srs[`word-${word.id}`]);

  const addToSrs = () => {
    if (inSrs) return;
    update(state => ({
      ...state,
      srs: { ...state.srs, [`word-${word.id}`]: createWordCard(word) },
    }));
    toast.success("복습 카드에 추가했어요.");
  };

  return (
    <Panel className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Eyebrow className="text-muted-foreground">WORD DETAIL</Eyebrow>
          <h3 className="mt-0.5 flex flex-wrap items-center gap-2 text-[1.375rem] font-bold tracking-tight">
            {display}
            {word.auOnly && (
              <b className="rounded-md bg-[#f2a449]/15 px-1.5 py-0.5 font-mono text-[0.6875rem] font-bold text-[#b26b10]">
                AU
              </b>
            )}
          </h3>
          <p className="mt-0.5 font-mono text-[0.875rem] text-muted-foreground">
            /{dt(word.ipa, dialect)}/
            {showsHangulHint(word.word, dialect) ? ` · ${word.hangul}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button
            onClick={() => speak(display, app.settings.rate)}
            aria-label="발음 듣기"
            className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors hover:opacity-85"
          >
            <Volume2 size={19} />
          </button>
          <button
            onClick={addToSrs}
            aria-label="복습 카드에 추가"
            disabled={inSrs}
            className="flex size-11 items-center justify-center rounded-xl border text-muted-foreground transition-colors hover:border-ring disabled:opacity-40"
          >
            <Plus size={19} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="단어 상세 닫기"
              className="flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <p className="text-[0.9375rem] leading-relaxed">
        <b>{word.meaning}</b>
        {word.nuance && (
          <span className="mt-0.5 block text-[0.875rem] text-muted-foreground">
            {word.nuance}
          </span>
        )}
        {word.auOnly && word.usEquivalent && (
          <span className="mt-0.5 block text-[0.875rem] text-muted-foreground">
            미국에서는 {word.usEquivalent} 라고 해요.
          </span>
        )}
      </p>

      {word.collocations.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {word.collocations.map(item => (
            <span
              key={item}
              className="rounded-lg bg-muted px-2.5 py-1 font-mono text-[0.8125rem] text-muted-foreground"
            >
              {localizeCollocation(item, word.word, dialect)}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {word.examples.map(example => {
          const sentence = dt(example.en, dialect);
          return (
            <button
              key={example.tone}
              onClick={() => speak(sentence, app.settings.rate)}
              className="flex w-full items-start gap-2.5 rounded-xl bg-muted/50 p-3 text-left transition-colors hover:bg-muted"
            >
              <span className="mt-0.5 shrink-0 rounded-md bg-card px-1.5 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground">
                {TONE_LABEL[example.tone]}
              </span>
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
  );
}
