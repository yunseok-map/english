import type { AppState } from "@/types";
import { migrateState } from "@/state/migrate";
import { isNative } from "@/lib/native";

const DB_NAME = "wohol-english-db";
const STORE = "state";
const KEY = "learning-state";

/**
 * 백업 파일 봉투 버전. `AppState.version` 과 같은 값을 쓴다.
 * 예전에는 여기만 2 로 굳어 있어서 상태 버전과 어긋나 있었고, 복원할 때
 * 읽지도 않았다. 이제는 읽어서 "이 앱이 모르는 미래 버전"을 걸러 낸다.
 */
const BACKUP_VERSION = 4;

export { DEFAULT_SETTINGS, DEFAULT_STATE } from "@/state/defaults";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE))
        request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadState(): Promise<AppState> {
  try {
    const db = await openDatabase();
    const value = await new Promise<unknown>((resolve, reject) => {
      const request = db
        .transaction(STORE, "readonly")
        .objectStore(STORE)
        .get(KEY);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return migrateState(value);
  } catch {
    return migrateState(undefined);
  }
}

export async function saveState(state: AppState) {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const request = db
        .transaction(STORE, "readwrite")
        .objectStore(STORE)
        .put(state, KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    db.close();
  } catch {
    /* 비공개 모드 등에서는 세션 메모리 상태로만 동작한다. */
  }
}

/** 백업 파일 이름. 한글을 쓰면 공유·다운로드 경로에서 깨지는 기기가 있다. */
function backupFileName() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `wohol-english-backup-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}.json`;
}

/**
 * 백업 본문.
 *
 * API 키는 기본으로 뺀다. 백업 파일은 카톡·메일·클라우드로 옮겨 다니는데,
 * 거기에 결제되는 키가 평문으로 실려 다니면 안 된다. 필요한 사람만 켜서 넣는다.
 */
export function backupJson(state: AppState, includeKeys: boolean) {
  const settings = includeKeys
    ? state.settings
    : { ...state.settings, llmKey: "", translationKey: "" };
  return JSON.stringify(
    {
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      keysIncluded: includeKeys,
      state: { ...state, settings },
    },
    null,
    2
  );
}

export type BackupResult = "shared" | "downloaded";

/**
 * 백업 내보내기.
 *
 * 예전 구현은 DOM 에 붙이지도 않은 `<a download>` 를 클릭하고 곧바로
 * `revokeObjectURL` 했다. WKWebView 에는 blob 다운로드 경로 자체가 없어서
 * 정작 이 앱을 쓰는 아이폰에서는 아무 일도 일어나지 않았다. IndexedDB 가
 * 유일한 저장소이므로, 내보내기가 안 되면 앱을 지우는 순간 기록이 사라진다.
 *
 * 네이티브에서는 파일로 쓴 뒤 공유 시트를 띄운다. "파일에 저장"·카톡·에어드롭
 * 어디로든 뺄 수 있다.
 */
export async function backupState(
  state: AppState,
  options: { includeKeys?: boolean } = {}
): Promise<BackupResult> {
  const json = backupJson(state, options.includeKeys ?? false);
  const name = backupFileName();

  if (isNative) {
    const [{ Filesystem, Directory, Encoding }, { Share }] = await Promise.all([
      import("@capacitor/filesystem"),
      import("@capacitor/share"),
    ]);
    // 캐시 디렉터리에 쓴다. 사용자가 공유 시트에서 어디로 보낼지 고르고 나면
    // 원본은 시스템이 알아서 정리해도 되는 파일이다.
    const written = await Filesystem.writeFile({
      path: name,
      data: json,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    });
    await Share.share({
      title: "워홀 영어 훈련 백업",
      files: [written.uri],
      dialogTitle: "백업 파일 저장·공유",
    });
    return "shared";
  }

  const url = URL.createObjectURL(
    new Blob([json], { type: "application/json" })
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  // 문서에 붙여야 클릭이 먹는 브라우저가 있고, revoke 는 다운로드가 시작될
  // 틈을 준 뒤에 해야 한다. 예전에는 둘 다 안 해서 조용히 실패했다.
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return "downloaded";
}

export async function restoreState(file: File): Promise<AppState> {
  let raw: any;
  try {
    raw = JSON.parse(await file.text());
  } catch {
    throw new Error("JSON 파일을 읽지 못했어요.");
  }
  if (!raw?.state?.profile || !raw?.state?.settings)
    throw new Error("워홀 영어 훈련 백업 파일이 아닙니다.");
  const version = Number(raw.version);
  if (Number.isFinite(version) && version > BACKUP_VERSION)
    throw new Error(
      "더 최신 버전에서 만든 백업이에요. 앱을 업데이트한 뒤 복원해 주세요."
    );
  return migrateState(raw.state);
}
