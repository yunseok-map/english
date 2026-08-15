const CACHE = "wohol-english-v7";
// 서비스워커가 놓인 위치를 기준으로 하위 경로 배포에서도 동작하게 한다.
const ROOT = new URL("./", self.registration.scope).pathname;
const APP_SHELL = [
  ROOT,
  `${ROOT}manifest.json`,
  `${ROOT}icons/icon-192.png`,
  `${ROOT}icons/icon-512.png`,
  `${ROOT}icons/maskable-512.png`,
  `${ROOT}icons/apple-touch-icon.png`,
];

self.addEventListener("install", event =>
  event.waitUntil(
    caches
      .open(CACHE)
      // 개별 실패가 설치 전체를 막지 않도록 하나씩 담는다.
      .then(cache =>
        Promise.all(APP_SHELL.map(url => cache.add(url).catch(() => undefined)))
      )
      .then(() => self.skipWaiting())
  )
);

self.addEventListener("activate", event =>
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE).map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
);

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(
      cached =>
        cached ||
        fetch(event.request)
          .then(response => {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, copy));
            return response;
          })
          .catch(() =>
            event.request.mode === "navigate" ? caches.match(ROOT) : undefined
          )
    )
  );
});
