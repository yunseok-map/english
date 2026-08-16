import { useState } from "react";
import { Plus, Trash2, Volume2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/Panel";
import { useApp } from "@/state/context";
import { addMyEntry, removeMyEntry } from "@/lib/myEntries";
import { speak } from "@/lib/speech";
import { haptic } from "@/lib/haptics";
import type { MyEntry } from "@/types";

/**
 * 직접 적어 넣는 단어·문장.
 *
 * 여기 넣은 항목은 앱이 들고 있는 단어와 똑같이 취급된다 — 플래시카드에도 나오고
 * 간격 반복 복습 대기열에도 올라간다. 별도의 "내 단어 학습" 화면을 따로 만들지
 * 않은 건 그래서다. 따로 두면 정작 복습을 안 하게 된다.
 */
export function MyWordsPanel() {
  const { app, update } = useApp();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<MyEntry["kind"]>("word");
  const [en, setEn] = useState("");
  const [ko, setKo] = useState("");

  const submit = () => {
    const trimmedEn = en.trim();
    const trimmedKo = ko.trim();
    if (!trimmedEn || !trimmedKo) {
      toast("영어와 뜻을 모두 적어 주세요.");
      return;
    }
    if (
      app.myEntries.some(e => e.en.toLowerCase() === trimmedEn.toLowerCase())
    ) {
      toast("이미 추가한 항목이에요.");
      return;
    }
    update(state => addMyEntry(state, { en: trimmedEn, ko: trimmedKo, kind }));
    haptic.success();
    toast.success("추가했어요. 오늘부터 복습에 나와요.");
    setEn("");
    setKo("");
  };

  const remove = (entry: MyEntry) => {
    update(state => removeMyEntry(state, entry.id));
    toast("삭제했어요.");
  };

  return (
    <Panel className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[0.8125rem] font-medium text-muted-foreground">
            내가 적은 단어장
          </p>
          <h2 className="mt-0.5 text-[1.125rem] font-bold tracking-tight">
            <span className="font-mono text-primary">
              {app.myEntries.length}
            </span>
            개
          </h2>
        </div>
        <Button
          size="sm"
          variant={open ? "outline" : "default"}
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          {open ? (
            <>
              <X size={15} /> 닫기
            </>
          ) : (
            <>
              <Plus size={15} /> 추가
            </>
          )}
        </Button>
      </div>

      {!open && app.myEntries.length === 0 && (
        <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
          현지에서 새로 들은 단어나 문장을 적어 두면, 앱이 준 단어와 똑같이
          플래시카드·복습에 섞여 나와요.
        </p>
      )}

      {open && (
        <div className="space-y-2.5 rounded-2xl bg-muted/40 p-3">
          <div className="flex gap-1.5">
            {(["word", "sentence"] as const).map(k => (
              <button
                key={k}
                onClick={() => setKind(k)}
                aria-pressed={kind === k}
                className={`min-h-9 flex-1 rounded-full border text-[0.8125rem] font-semibold transition-colors ${
                  kind === k
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground"
                }`}
              >
                {k === "word" ? "단어" : "문장"}
              </button>
            ))}
          </div>
          <Input
            value={en}
            onChange={e => setEn(e.target.value)}
            placeholder={
              kind === "word" ? "영어 단어" : "영어 문장 전체를 적어 주세요"
            }
            autoCapitalize="none"
            aria-label={kind === "word" ? "영어 단어" : "영어 문장"}
            className="h-11 font-mono"
          />
          <Input
            value={ko}
            onChange={e => setKo(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder={kind === "word" ? "뜻" : "한국어 해석"}
            aria-label={kind === "word" ? "뜻" : "한국어 해석"}
            className="h-11"
          />
          <Button className="w-full" onClick={submit}>
            단어장에 넣기
          </Button>
          <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
            문장으로 넣으면 빈칸 채우기·말하기 연습에도 쓰여요.
          </p>
        </div>
      )}

      {app.myEntries.length > 0 && (
        <ul className="space-y-1.5">
          {app.myEntries.slice(0, 30).map(entry => (
            <li
              key={entry.id}
              className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[0.875rem] font-semibold">
                  {entry.en}
                </p>
                <p className="truncate text-[0.8125rem] text-muted-foreground">
                  {entry.ko}
                </p>
              </div>
              <button
                onClick={() => speak(entry.en, app.settings.rate)}
                aria-label={`${entry.en} 발음 듣기`}
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground"
              >
                <Volume2 size={16} />
              </button>
              <button
                onClick={() => remove(entry)}
                aria-label={`${entry.en} 삭제`}
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
          {app.myEntries.length > 30 && (
            <li className="px-3 pt-1 text-[0.75rem] text-muted-foreground">
              최근 30개만 보여요 · 전체 {app.myEntries.length}개
            </li>
          )}
        </ul>
      )}
    </Panel>
  );
}
