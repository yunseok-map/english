import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Eyebrow, Empty } from "@/components/Panel";
import { useApp } from "@/state/context";

const TYPE_LABEL = { grammar: "문법", word: "단어", pronunciation: "발음" } as const;

export function MistakesScreen() {
  const { app, update } = useApp();

  if (app.mistakes.length === 0)
    return (
      <Empty
        title="오답노트가 비어 있어요"
        text="문법 퀴즈나 대화에서 틀린 부분이 자동으로 여기에 쌓여요."
      />
    );

  const resolve = (id: string) => {
    update((state) => ({ ...state, mistakes: state.mistakes.filter((m) => m.id !== id) }));
    toast.success("복습 완료! 오답노트에서 제거했어요.");
  };

  return (
    <div className="space-y-2.5">
      <Eyebrow className="text-muted-foreground">다시 만나야 할 것들 {app.mistakes.length}</Eyebrow>
      <div className="overflow-hidden rounded-2xl border bg-card">
        {app.mistakes.map((mistake, i) => (
          <div key={mistake.id} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t" : ""}`}>
            <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground">
              {TYPE_LABEL[mistake.type]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem] font-medium">{mistake.label}</span>
              <span className="block text-[0.75rem] text-muted-foreground">{mistake.count}회 틀림</span>
            </span>
            <button
              onClick={() => resolve(mistake.id)}
              aria-label="복습 완료"
              className="flex size-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-accent"
            >
              <Check size={17} />
            </button>
            <button
              onClick={() => update((state) => ({ ...state, mistakes: state.mistakes.filter((m) => m.id !== mistake.id) }))}
              aria-label="삭제"
              className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
