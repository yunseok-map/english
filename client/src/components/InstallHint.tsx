import { useEffect, useState } from "react";
import { Share, SquarePlus, X } from "lucide-react";
import { isNative } from "@/lib/native";

const DISMISS_KEY = "wohol-install-hint";

function isIosSafari() {
  const ua = navigator.userAgent;
  const iOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const webkit = /WebKit/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  return iOS && webkit;
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
  );
}

/**
 * iOS Safari에서 아직 홈 화면에 추가하지 않았을 때만 뜨는 설치 안내.
 * 스토어를 거치지 않고 앱처럼 쓰는 경로를 알려 준다.
 */
export function InstallHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 네이티브 앱은 이미 설치된 상태다. WKWebView의 UA가 사파리와 비슷해서
    // isIosSafari()만으로는 걸러지지 않으므로 여기서 먼저 막는다.
    if (isNative) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    if (isStandalone() || !isIosSafari()) return;
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="mb-4 flex items-start gap-3 rounded-2xl border border-primary/40 bg-accent/50 p-3.5">
      <SquarePlus size={19} className="mt-0.5 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <strong className="text-[0.875rem]">
          홈 화면에 추가하면 앱처럼 쓸 수 있어요
        </strong>
        <p className="mt-1 flex flex-wrap items-center gap-x-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
          사파리 아래쪽 공유
          <Share size={13} className="inline shrink-0" />
          버튼 → <b className="font-semibold text-foreground">홈 화면에 추가</b>
          를 누르세요.
        </p>
      </div>
      <button
        onClick={() => {
          sessionStorage.setItem(DISMISS_KEY, "1");
          setShow(false);
        }}
        aria-label="설치 안내 닫기"
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
      >
        <X size={15} />
      </button>
    </div>
  );
}
