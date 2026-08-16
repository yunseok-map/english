import { useEffect, useRef, useState } from "react";
import { Loader2, PhoneOff, Radio } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Panel, Eyebrow } from "@/components/Panel";
import {
  canLiveVoice,
  startLiveVoice,
  type LiveHandle,
  type LiveStatus,
} from "@/lib/liveVoice";

const STATUS_LABEL: Record<LiveStatus, string> = {
  connecting: "연결하는 중",
  listening: "듣고 있어요 — 말해 보세요",
  speaking: "상대가 말하는 중",
  closed: "대화를 마쳤어요",
  error: "연결에 문제가 있어요",
};

/**
 * 실시간 음성 대화 패널.
 *
 * 마이크를 열어 두고 상대와 바로 주고받는다. 화면에는 양쪽 자막을 띄워
 * 무슨 말이 오갔는지 눈으로도 따라갈 수 있게 한다.
 */
export function LiveVoicePanel({
  apiKey,
  instruction,
  onTurn,
  onConnected,
  onClose,
}: {
  apiKey: string;
  instruction: string;
  /** 한 턴이 끝날 때마다 대화 기록에 남기기 위해 올려 준다. */
  onTurn: (me: string, partner: string) => void;
  /** 실제로 대화가 시작됐을 때 한 번. 사용량은 이때만 센다. */
  onConnected: () => void;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<LiveStatus>("connecting");
  const [myCaption, setMyCaption] = useState("");
  const [partnerCaption, setPartnerCaption] = useState("");
  const handle = useRef<LiveHandle | null>(null);
  // 이벤트 콜백이 오래된 클로저를 잡지 않도록 최신 함수를 ref 로 들고 있는다.
  const turnRef = useRef(onTurn);
  turnRef.current = onTurn;
  const connectedRef = useRef(onConnected);
  connectedRef.current = onConnected;
  const counted = useRef(false);

  useEffect(() => {
    let live = true;
    void startLiveVoice({
      key: apiKey,
      instruction,
      handlers: {
        onStatus: next => {
          if (!live) return;
          setStatus(next);
          // 연결이 실제로 열린 첫 순간에만 사용량 1회를 센다.
          if (next === "listening" && !counted.current) {
            counted.current = true;
            connectedRef.current();
          }
        },
        onCaption: (side, text) => {
          if (!live) return;
          if (side === "me") setMyCaption(text);
          else setPartnerCaption(text);
        },
        onTurn: (me, partner) => {
          if (!live) return;
          turnRef.current(me, partner);
          setMyCaption("");
          setPartnerCaption("");
        },
        onError: message => live && toast.error(message),
      },
    })
      .then(session => {
        if (!live) {
          session.stop();
          return;
        }
        handle.current = session;
      })
      .catch((error: unknown) => {
        if (!live) return;
        setStatus("error");
        toast.error(
          error instanceof DOMException && error.name === "NotAllowedError"
            ? "마이크 권한이 필요해요. 설정에서 허용해 주세요."
            : error instanceof Error
              ? error.message
              : "실시간 음성을 시작하지 못했어요."
        );
      });

    return () => {
      live = false;
      handle.current?.stop();
      handle.current = null;
    };
  }, [apiKey, instruction]);

  const stop = () => {
    handle.current?.stop();
    handle.current = null;
    onClose();
  };

  return (
    <Panel className="space-y-3">
      <div className="flex items-center justify-between">
        <Eyebrow className="text-muted-foreground">실시간 음성 대화</Eyebrow>
        <span className="flex items-center gap-1.5 text-[0.75rem] font-medium">
          {status === "connecting" ? (
            <Loader2 size={13} className="animate-spin text-muted-foreground" />
          ) : (
            <Radio
              size={13}
              className={
                status === "speaking"
                  ? "text-primary"
                  : status === "error"
                    ? "text-destructive"
                    : "text-muted-foreground"
              }
            />
          )}
          <span
            className={
              status === "error" ? "text-destructive" : "text-muted-foreground"
            }
          >
            {STATUS_LABEL[status]}
          </span>
        </span>
      </div>

      <div className="min-h-[5.5rem] space-y-2 rounded-xl bg-muted/50 p-3">
        {partnerCaption && (
          <p className="font-mono text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere]">
            {partnerCaption}
          </p>
        )}
        {myCaption && (
          <p className="text-right font-mono text-[0.9375rem] leading-relaxed text-primary [overflow-wrap:anywhere]">
            {myCaption}
          </p>
        )}
        {!partnerCaption && !myCaption && (
          <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
            {status === "connecting"
              ? "마이크를 준비하고 있어요."
              : "편하게 말을 걸어 보세요. 틀려도 상대가 알아서 받아 줍니다."}
          </p>
        )}
      </div>

      <Button variant="outline" className="w-full" onClick={stop}>
        <PhoneOff size={15} /> 음성 대화 끝내기
      </Button>
      <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
        오디오는 글자보다 사용량을 훨씬 많이 씁니다. 짧게 여러 번 쓰는 편이
        한도에 여유가 있어요.
      </p>
    </Panel>
  );
}

export { canLiveVoice };
