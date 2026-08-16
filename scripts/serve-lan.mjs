/**
 * 같은 Wi-Fi에 연결된 아이폰에서 열 수 있도록 dist/public 을 서빙한다.
 * 사용: pnpm build && pnpm serve:lan
 */
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "dist", "public");
const port = Number(process.env.PORT) || 4173;

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("dist/public 이 없습니다. 먼저 `pnpm build` 를 실행하세요.");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = path.join(root, urlPath);

    // 경로 이탈 차단
    if (!filePath.startsWith(root)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(root, "index.html");
    }

    const type =
      TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": filePath.includes(`${path.sep}assets${path.sep}`)
        ? "public, max-age=31536000"
        : "no-cache",
    });
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(port, "0.0.0.0", () => {
    const addresses = Object.values(os.networkInterfaces())
      .flat()
      .filter(i => i && i.family === "IPv4" && !i.internal)
      .map(i => i.address);

    console.log("\n워홀 영어 훈련 — 로컬 네트워크 서버가 실행 중입니다.\n");
    console.log(`  이 PC:      http://localhost:${port}/`);
    for (const address of addresses)
      console.log(`  아이폰에서: http://${address}:${port}/`);
    console.log("\n  같은 Wi-Fi에 연결한 뒤 사파리에서 위 주소를 열고");
    console.log(
      "  공유 버튼 → '홈 화면에 추가' 를 누르면 앱처럼 사용할 수 있어요."
    );
    console.log(
      "\n  ※ HTTP 접속이라 오프라인 캐시(서비스워커)는 동작하지 않습니다."
    );
    console.log(
      "     PC를 꺼도 쓰려면 docs/설치안내.md 의 정적 호스팅 방법을 참고하세요.\n"
    );
  });
