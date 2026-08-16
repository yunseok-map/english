import { LocalNotifications } from "@capacitor/local-notifications";
import type { AppState } from "@/types";
import { isNative } from "@/lib/native";
import { dueCards } from "@/lib/engine";

/**
 * 복습 알림.
 *
 * 스트릭이 끊기는 가장 흔한 이유는 "까먹어서"다. 네이티브 앱인데 알림을
 * 안 쓰면 그 하나를 놓친다. 매일 같은 시각에 한 번, 그리고 실제로 밀린
 * 복습이 있으면 개수를 문구에 담는다.
 */
const DAILY_ID = 1001;
const STREAK_ID = 1002;

export async function notificationsAllowed() {
  if (!isNative) return false;
  try {
    const status = await LocalNotifications.checkPermissions();
    return status.display === "granted";
  } catch {
    return false;
  }
}

export async function requestNotificationPermission() {
  if (!isNative) return false;
  try {
    const status = await LocalNotifications.requestPermissions();
    return status.display === "granted";
  } catch {
    return false;
  }
}

export async function cancelReminders() {
  if (!isNative) return;
  try {
    await LocalNotifications.cancel({
      notifications: [{ id: DAILY_ID }, { id: STREAK_ID }],
    });
  } catch {
    /* 알림 취소 실패는 학습 흐름과 무관하다. */
  }
}

/**
 * 설정에 맞춰 알림을 다시 건다.
 * 상태가 바뀔 때마다 호출해도 되도록 항상 기존 예약을 지우고 새로 만든다.
 */
export async function syncReminders(state: AppState) {
  if (!isNative) return;
  await cancelReminders();
  if (!state.settings.notifyEnabled) return;
  if (!(await notificationsAllowed())) return;

  const hour = state.settings.notifyHour;
  const due = dueCards(state).length;
  const name = state.profile.name?.trim() || "학습자";
  const body =
    due > 0
      ? `복습할 단어 ${due}개가 기다리고 있어요. 5분이면 끝나요.`
      : "오늘의 루트가 준비돼 있어요. 5분만 투자해 볼까요?";

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: DAILY_ID,
          title: `${name}님, 오늘 영어 하셨나요?`,
          body,
          schedule: { on: { hour, minute: 0 }, allowWhileIdle: true },
        },
        {
          // 스트릭이 살아 있을 때만, 자정 두 시간 전에 한 번 더 붙잡는다.
          id: STREAK_ID,
          title: `연속 ${state.stats.streak}일째 — 오늘도 이어갈까요?`,
          body: "1분만 해도 오늘 기록으로 남아요.",
          schedule: { on: { hour: 22, minute: 0 }, allowWhileIdle: true },
        },
      ].filter(n => n.id !== STREAK_ID || state.stats.streak >= 2),
    });
  } catch {
    /* 예약 실패 시 조용히 넘어간다. 알림은 보조 기능이다. */
  }
}
