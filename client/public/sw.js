const CACHE = "wohol-english-v8";
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

/** 200 OK 인 같은 출처 응답만 캐시에 넣는다. */
function putIfOk(request, response) {
  if (!response || !response.ok || response.type === "opaque") return response;
  const copy = response.clone();
  void caches.open(CACHE).then(cache => cache.put(request, copy));
  return response;
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // 문서(내비게이션)는 네트워크 우선.
  //
  // 전부 캐시 우선으로 두면 새로 배포해도 옛 index.html 을 계속 물고 있어서
  // 사용자가 영원히 구버전을 보게 된다. 문서만 먼저 네트워크에 물어보고,
  // 실패했을 때만 캐시로 떨어진다.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => putIfOk(event.request, response))
        .catch(() =>
          caches
            .match(event.request)
            .then(cached => cached || caches.match(ROOT))
        )
    );
    return;
  }

  // 나머지(해시가 붙은 정적 자산)는 캐시 우선. 내용이 바뀌면 파일명이 바뀐다.
  event.respondWith(
    caches.match(event.request).then(
      cached =>
        cached ||
        fetch(event.request)
          .then(response => putIfOk(event.request, response))
          .catch(() => undefined)
    )
  );
});
