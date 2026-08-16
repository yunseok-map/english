import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { speak } from "@/lib/speech";
import { speakable } from "@/lib/autoSpeak";
import { useApp } from "@/state/context";

/**
 * 읽어 줄 문장으로 다듬는다.
 *  - 빈칸(___)은 "blank" 라고 읽는다. 그냥 두면 밑줄을 하나씩 읽거나 통째로
 *    삼켜서 어디가 빈칸인지 귀로 알 수 없다.
 *  - 오류찾기의 토막 구분(/)은 지운다. 문장으로 이어 읽어야 어색한 데가 들린다.
 */
/** 지문에서 영어 문장 부분만 떼어 낸다. 없으면 빈 문자열. */
export function questionBody(text: string) {
  const at = text.indexOf("—");
  return at < 0 ? "" : text.slice(at + 1).trim();
}

function speechText(body: string) {
  return body
    .replace(/_{2,}/g, " blank ")
    .replace(/\s*\/\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 문항 지문.
 *
 * 대부분의 문항이 "한국어 지시문 — English sentence" 꼴인데, 한 줄로 이어 놓으면
 * 어디까지가 지시고 어디부터가 실제 문제인지 눈으로 갈라내기 어렵다. em dash 를
 * 기준으로 줄을 나누고, 영어 쪽은 모노체로 띄워 문제가 먼저 눈에 들어오게 한다.
 *
 * 오류찾기 문항은 영어 쪽이 "A / B / C / D" 로 토막 나 있다. 이때 토막을 세로로
 * 쪼개 놓으면 어느 토막이 몇 번인지는 알아도 문장이 문장으로 읽히지 않아서,
 * 무엇이 어색한지 감을 잡을 수 없다. 그래서 한 문장으로 이어 놓되 토막마다
 * 밑줄과 기호를 붙인다. 지문이 "밑줄 친 부분 중"이라고 말하는 그대로다.
 */
export function QuestionText({
  text,
  segmented = false,
  className,
}: {
  text: string;
  /** 영어 쪽을 " / " 로 잘라 토막마다 밑줄과 A·B·C·D 를 붙인다. */
  segmented?: boolean;
  className?: string;
}) {
  const { app } = useApp();
  const at = text.indexOf("—");
  const lead = at >= 0 ? text.slice(0, at).trim() : text.trim();
  const body = at >= 0 ? text.slice(at + 1).trim() : "";

  const toRead = speechText(body);
  const canSpeak = speakable(toRead);
  const read = () => {
    if (canSpeak) speak(toRead, app.settings.rate);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-[0.9375rem] font-semibold leading-relaxed [overflow-wrap:anywhere]">
        {lead}
      </p>

      {body && (
        // 문장 전체가 버튼이다. 작은 스피커 아이콘만 누르게 하면 손가락으로
        // 맞히기 어렵고, 어차피 여기서 눌러 곤란해질 일도 없다.
        <button
          type="button"
          onClick={read}
          disabled={!canSpeak}
          aria-label={canSpeak ? "문장 듣기" : undefined}
          className="flex w-full items-start gap-2.5 rounded-xl bg-muted/60 p-3 text-left transition-colors enabled:hover:bg-muted"
        >
          {segmented ? (
            // leading-loose 로 줄 간격을 넉넉히 준다. 밑줄이 아랫줄 글자에 닿으면
            // 어디까지가 한 토막인지 되레 헷갈린다.
            <span className="min-w-0 flex-1 font-mono text-[0.9375rem] leading-loose [overflow-wrap:anywhere]">
              {body.split("/").map((segment, i) => (
                <span key={i}>
                  <sup className="mr-0.5 font-sans text-[0.6875rem] font-bold text-primary">
                    {String.fromCharCode(65 + i)}
                  </sup>
                  <span className="underline decoration-dotted underline-offset-4">
                    {segment.trim()}
                  </span>{" "}
                </span>
              ))}
            </span>
          ) : (
            <span className="min-w-0 flex-1 font-mono text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere]">
              {body}
            </span>
          )}
          {canSpeak && (
            <Volume2
              size={15}
              className="mt-1 shrink-0 text-muted-foreground"
              aria-hidden
            />
          )}
        </button>
      )}
    </div>
  );
}
