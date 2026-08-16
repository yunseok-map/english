import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { speak } from "@/lib/speech";
import { speakable } from "@/lib/autoSpeak";
import { useApp } from "@/state/context";

/**
 * 눌러서 들을 수 있는 영어 한 줄.
 *
 * 정답이나 모범답안처럼 "이렇게 말하면 된다"고 보여 주는 문장은 눈으로만 읽고
 * 넘어가면 남는 게 없다. 한 번 들려 주면 그 자리에서 따라 할 수 있다.
 * 영어가 아니면(한글이 섞였거나 너무 짧으면) 그냥 글자로만 보여 준다.
 */
export function SpeakLine({
  text,
  tone = "default",
  className,
}: {
  text: string;
  tone?: "default" | "primary" | "destructive";
  className?: string;
}) {
  const { app } = useApp();
  const color =
    tone === "primary"
      ? "text-primary"
      : tone === "destructive"
        ? "text-destructive"
        : "";

  if (!speakable(text)) {
    return (
      <span
        className={cn("font-mono [overflow-wrap:anywhere]", color, className)}
      >
        {text}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => speak(text, app.settings.rate)}
      aria-label="발음 듣기"
      className={cn(
        "flex w-full items-start gap-2 text-left transition-opacity hover:opacity-70",
        className
      )}
    >
      <span
        className={cn(
          "min-w-0 flex-1 font-mono [overflow-wrap:anywhere]",
          color
        )}
      >
        {text}
      </span>
      <Volume2
        size={14}
        className="mt-0.5 shrink-0 text-muted-foreground"
        aria-hidden
      />
    </button>
  );
}
