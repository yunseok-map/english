import type { AppState } from "@/types";
import { migrateState } from "@/state/migrate";

const DB_NAME = "wohol-english-db";
const STORE = "state";
const KEY = "learning-state";

export { DEFAULT_SETTINGS, DEFAULT_STATE } from "@/state/defaults";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadState(): Promise<AppState> {
  try {
    const db = await openDatabase();
    const value = await new Promise<unknown>((resolve, reject) => {
      const request = db.transaction(STORE, "readonly").objectStore(STORE).get(KEY);
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
      const request = db.transaction(STORE, "readwrite").objectStore(STORE).put(state, KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    db.close();
  } catch {
    /* 비공개 모드 등에서는 세션 메모리 상태로만 동작한다. */
  }
}

export function backupState(state: AppState) {
  const blob = new Blob([JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), state }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `워홀영어-백업-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function restoreState(file: File): Promise<AppState> {
  const raw = JSON.parse(await file.text());
  if (!raw?.state?.profile || !raw?.state?.settings) throw new Error("워홀 영어 훈련 백업 파일이 아닙니다.");
  return migrateState(raw.state);
}
