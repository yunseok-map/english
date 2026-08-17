/// <reference types="vite/client" />

/**
 * 빌드 시각에 박히는 앱 버전(vite.config.ts 의 define).
 * CI 에서는 태그 이름에서 온 값이고, 로컬 개발 빌드에서는 "dev" 다.
 */
declare const __APP_VERSION__: string;
