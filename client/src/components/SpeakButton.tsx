import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, MicOff, Square } from "lucide-react";
import { toast } from "sonner";
import {
  canRecognizeSpeech,
  speechDialect,
  speechEngineInUse,
  startRecognition,
  type RecognizerHandle,
} from "@/lib/speech";
import { asrLocale } from "@/lib/dialect";
import { haptic } from "@/lib/haptics";

/**
 * 말하기 입력 버튼.
 *
 * 네이티브(SFSpeechRecognizer)와 브라우저 API 를 감싸고, 둘 다 없을 때는
 * "왜 안 되는지"를 분명히 알려 준다. 예전에는 아이폰 앱에서 아무 반응이
 * 없어 고장난 것처럼 보였다.
 */
export function SpeakButton({
  onResult,
  label = "눌러서 말하기",
}: {
  onResult: (text: string) => void;
  label?: string;
}) {
  const [listening, setListening] = useState(false);
  const [partial, setPartial] = useState("");
  const [starting, setStarting] = useState(false);
  const handle = useRef<RecognizerHandle | null>(null);
  const supported = canRecognizeSpeech();

  useEffect(
    () => () => {
      handle.current?.stop();
    },
    []
  );

  const stop = () => {
    handle.current?.stop();
    handle.current = null;
    setListening(false);
  };

  const start = async () => {
    if (listening) return stop();
    setStarting(true);
    setPartial("");
    haptic.tap();
    const started = await startRecognition(asrLocale(speechDialect()), {
      onResult: text => {
        setPartial("");
        setListening(false);
        handle.current = null;
        if (text.trim()) onResult(text);
        else toast("잘 안 들렸어요. 다시 한 번 말해 볼까요?");
      },
      onPartial: text => setPartial(text),
      onEnd: () => {
        setListening(false);
        handle.current = null;
      },
      onError: code => {
        setListening(false);
        handle.current = null;
        if (code === "permission")
          toast.error(
            "마이크·음성 인식 권한이 필요해요. 설정에서 허용해 주세요."
          );
        else if (code === "no-speech" || code === "no-match")
          toast("소리가 잡히지 않았어요. 조금 더 크게 말해 주세요.");
        else if (code !== "aborted") toast.error("음성 인식에 실패했어요.");
      },
    });
    setStarting(false);
    if (started) {
      handle.current = started;
      setListening(true);
    }
  };

  if (!supported) {
    return (
      <div className="flex items-start gap-2.5 rounded-2xl border border-dashed px-4 py-3.5 text-muted-foreground">
        <MicOff size={17} className="mt-0.5 shrink-0" />
        <p className="text-[0.8125rem] leading-relaxed">
          이 환경에서는 음성 인식을 쓸 수 없어요. 아이폰 앱이나 크롬에서 열면
          말하기 연습이 켜집니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => void start()}
        disabled={starting}
        aria-pressed={listening}
        aria-label={listening ? "녹음 멈추기" : label}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-[0.9375rem] font-bold transition-transform active:scale-[0.99] disabled:opacity-60 ${
          listening
            ? "bg-destructive text-white"
            : "bg-[var(--track-talk-soft)] text-[var(--track-talk)]"
        }`}
      >
        {starting ? (
          <>
            <Loader2 size={20} className="animate-spin" /> 준비 중…
          </>
        ) : listening ? (
          <>
            <Square size={18} fill="currentColor" /> 다 말했어요
          </>
        ) : (
          <>
            <Mic size={20} /> {label}
          </>
        )}
      </button>
      {listening && (
        <p
          className="min-h-6 text-center font-mono text-[0.875rem] text-muted-foreground [overflow-wrap:anywhere]"
          role="status"
          aria-live="polite"
        >
          {partial || "듣고 있어요…"}
        </p>
      )}
      {speechEngineInUse() === "web" && (
        <p className="text-center text-[0.6875rem] text-muted-foreground">
          브라우저 음성 인식을 쓰는 중이에요.
        </p>
      )}
    </div>
  );
}
