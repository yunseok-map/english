import { useEffect } from "react";
import { speak } from "@/lib/speech";

/**
 * 영어가 화면에 뜨면 알아서 읽어 주기.
 *
 * 매번 스피커 버튼을 눌러야 소리가 나면 듣기 연습이 안 된다. 카드가 넘어가거나
 * 문장이 나타나는 순간 바로 들려 준다.
 *
 * 주의할 점:
 *  - 정답을 가리고 맞히는 화면(빈칸·철자 쓰기)에서는 부르면 안 된다. 답을 흘린다.
 *    그래서 훅이 아니라 호출하는 쪽에서 "지금 읽어도 되는가"를 판단해 enabled 로 넘긴다.
 *  - 한국어까지 영어 보이스로 읽으면 소음이라 영문만 통과시킨다.
 *  - iOS 는 첫 발화에 사용자 제스처를 요구한다. 세션 진입 자체가 탭이라 그 뒤로는
 *    자동 재생이 통하지만, 통하지 않는 기기에서도 조용히 넘어가면 되도록 실패는 무시한다.
 */

/** 영어로 읽을 만한 문자열인가. 한글이 섞여 있으면 읽지 않는다. */
export function speakable(text: string | null | undefined): text is string {
  if (!text) return false;
  const trimmed = text.trim();
  if (trimmed.length < 2) return false;
  if (/[가-힣]/.test(trimmed)) return false;
  return /[A-Za-z]{2}/.test(trimmed);
}

export function useAutoSpeak(
  text: string | null | undefined,
  options: { enabled: boolean; rate: number }
) {
  const { enabled, rate } = options;
  useEffect(() => {
    if (!enabled || !speakable(text)) return;
    // 화면 전환 애니메이션이 끝난 뒤에 소리를 낸다. 넘기는 도중 겹쳐 읽는 걸 막는다.
    const timer = window.setTimeout(() => {
      try {
        speak(text, rate);
      } catch {
        /* 이 기기에서 TTS 가 안 되면 조용히 넘어간다. */
      }
    }, 260);
    return () => window.clearTimeout(timer);
  }, [text, enabled, rate]);
}
