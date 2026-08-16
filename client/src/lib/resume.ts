import type { AppState, ResumePoint } from "@/types";

/**
 * 하다 만 학습 이어 가기.
 *
 * 세션 진행 상태는 화면 컴포넌트의 useState 에만 있어서, 앱을 끄거나 다른 탭으로
 * 넘어가면 사라진다. 여기서 한 칸짜리 이어하기 지점을 상태에 저장한다.
 * 한 칸만 두는 건 의도적이다 — "마지막에 하던 것"만 이어 가면 충분하고,
 * 여러 개를 쌓아 두면 어느 걸 이어 갈지 고르게 만드는 부담이 생긴다.
 */

/** 3일 지난 건 이어 갈 의미가 없다고 본다. (migrate 에서도 같은 기준으로 거른다) */
const MAX_AGE = 3 * 86400000;

export function freshResume(app: AppState): ResumePoint | null {
  const point = app.resume;
  if (!point) return null;
  if (Date.now() - point.savedAt > MAX_AGE) return null;
  return point;
}

/** 특정 화면이 이어 갈 수 있는 지점만 돌려준다. */
export function resumeFor<K extends ResumePoint["kind"]>(
  app: AppState,
  kind: K
): Extract<ResumePoint, { kind: K }> | null {
  const point = freshResume(app);
  return point?.kind === kind
    ? (point as Extract<ResumePoint, { kind: K }>)
    : null;
}

// 유니온에 그냥 Omit 을 걸면 공통 키만 남아 kind 별 필드가 사라진다. 분배해서 벗긴다.
type OmitEach<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export function putResume(
  state: AppState,
  point: OmitEach<ResumePoint, "savedAt">
): AppState {
  return {
    ...state,
    resume: { ...point, savedAt: Date.now() } as ResumePoint,
  };
}

export function dropResume(state: AppState): AppState {
  return state.resume ? { ...state, resume: null } : state;
}

const WORD_MODE_LABEL: Record<string, string> = {
  card: "단어 카드",
  choice: "4지선다",
  typing: "철자 쓰기",
  cloze: "빈칸 채우기",
  speak: "따라 말하기",
  dictation: "받아쓰기",
};

/** 홈 화면에 보여 줄 "이어서 하기" 한 줄. */
export function resumeSummary(point: ResumePoint): {
  title: string;
  detail: string;
  /** 이어 가려면 어느 학습 탭으로 보내야 하는가 */
  section: "words" | "grammar" | "mistakes";
} {
  if (point.kind === "grammar") {
    const answered = Object.keys(point.answers).length;
    return {
      title: "문법 강의",
      detail: answered > 0 ? `${answered}문항 답한 상태` : "읽던 강의",
      section: "grammar",
    };
  }
  if (point.kind === "mistakes") {
    return {
      title: "오답 복습",
      detail: `${point.index + 1} / ${point.ids.length}`,
      section: "mistakes",
    };
  }
  return {
    title: WORD_MODE_LABEL[point.mode] ?? "단어 학습",
    detail: `${point.index + 1} / ${point.ids.length}`,
    section: "words",
  };
}

/**
 * 홈에서 "계속"을 눌렀다는 신호.
 *
 * 홈은 학습 탭을 열어 줄 뿐이고, 실제로 세션을 되살리는 건 각 학습 화면이다.
 * 한 번만 전달하면 되는 값이라 상태에는 넣지 않는다.
 *
 * 처음엔 "읽으면 사라지는" 플래그였는데, 화면이 마운트→언마운트→마운트로
 * 두 번 붙는 경우가 있어서 버려지는 쪽이 신호를 먹고 실제로 남는 쪽은
 * 못 받는 일이 생겼다. 그래서 짧은 시간 창으로 바꿨다. 창 안에서는 몇 번
 * 되살려도 결과가 같으므로(같은 지점으로 복원) 중복 실행이 문제되지 않는다.
 */
const REQUEST_WINDOW = 4000;
let requestedAt = 0;

export function requestResume() {
  requestedAt = Date.now();
}

export function hasResumeRequest() {
  return Date.now() - requestedAt < REQUEST_WINDOW;
}

/** 사용자가 세션을 직접 닫았을 때처럼, 더 이상 되살리면 안 되는 시점에 부른다. */
export function clearResumeRequest() {
  requestedAt = 0;
}
