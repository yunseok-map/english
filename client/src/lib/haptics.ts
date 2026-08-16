import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { isNative } from "@/lib/native";

let enabled = true;
/** 설정 값을 모듈에 심어 둔다. 호출부마다 설정을 넘기지 않아도 되게 한다. */
export function setHapticsEnabled(value: boolean) {
  enabled = value;
}

/**
 * 웹에서는 조용히 무시한다. Vibration API 는 iOS 사파리가 지원하지 않고,
   안드로이드 크롬에서만 동작해 기준을 맞추기 어렵다.
 */
function active() {
  return enabled && isNative;
}

export const haptic = {
  /** 정답 */
  success() {
    if (!active()) return;
    void Haptics.notification({ type: NotificationType.Success }).catch(
      () => undefined
    );
  },
  /** 오답 */
  error() {
    if (!active()) return;
    void Haptics.notification({ type: NotificationType.Error }).catch(
      () => undefined
    );
  },
  /** 카드 넘김·탭 등 가벼운 확인 */
  tap() {
    if (!active()) return;
    void Haptics.impact({ style: ImpactStyle.Light }).catch(() => undefined);
  },
  /** 세션 완료처럼 무게감 있는 순간 */
  heavy() {
    if (!active()) return;
    void Haptics.impact({ style: ImpactStyle.Medium }).catch(() => undefined);
  },
  /** 스와이프 임계값을 넘겼을 때 */
  selection() {
    if (!active()) return;
    void Haptics.selectionChanged().catch(() => undefined);
  },
};
