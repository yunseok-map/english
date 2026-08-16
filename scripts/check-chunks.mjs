/**
 * 빌드 산출물의 청크 간 순환 import 를 검사한다.
 *
 *   node scripts/check-chunks.mjs [dist/public]
 *
 * 왜 필요한가:
 * ESM 순환에서는 먼저 평가되는 쪽이 상대의 바인딩을 undefined 로 본다.
 * 최상위에서 그 바인딩을 쓰면 즉시 TypeError 가 나는데, 순환의 진입 순서가
 * 엔진마다 달라서 크롬에서는 통과하고 iOS WKWebView 에서만 흰 화면으로 죽는다.
 * 실제로 v1.0.3/v1.0.4 가 이 문제로 기기에서 실행되지 않았다.
 *   react 청크 ↔ ui 청크 순환 → "undefined is not an object (evaluating 'o.forwardRef')"
 *
 * 참조가 깨진 청크(파일이 없는 import)도 같이 잡는다.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "dist/public");
const assets = path.join(root, "assets");
if (!fs.existsSync(assets)) {
  console.error(`✗ ${path.relative(process.cwd(), assets)} 가 없습니다. 먼저 빌드하세요.`);
  process.exit(1);
}

const files = fs.readdirSync(assets).filter(f => f.endsWith(".js"));
const graph = new Map();
const missing = [];

// import / export ... from "./chunk.js" 와 동적 import("./chunk.js") 를 모두 본다.
const FROM = /from\s*["'](\.\/[^"']+\.js)["']/g;
const DYNAMIC = /import\(\s*["'](\.\/[^"']+\.js)["']\s*\)/g;

for (const file of files) {
  const src = fs.readFileSync(path.join(assets, file), "utf8");
  const deps = new Set();
  for (const re of [FROM, DYNAMIC]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src))) {
      const dep = path.basename(m[1]);
      if (!files.includes(dep)) missing.push(`${file} -> ${m[1]}`);
      // 동적 import 는 별도 시점에 평가되므로 순환이어도 안전하다.
      else if (re === FROM) deps.add(dep);
    }
  }
  graph.set(file, deps);
}

// 정적 import 그래프에서 순환을 찾는다 (DFS).
const cycles = [];
const state = new Map();
const stack = [];
function visit(node) {
  if (state.get(node) === "done") return;
  if (state.get(node) === "open") {
    cycles.push([...stack.slice(stack.indexOf(node)), node]);
    return;
  }
  state.set(node, "open");
  stack.push(node);
  for (const dep of graph.get(node) ?? []) visit(dep);
  stack.pop();
  state.set(node, "done");
}
for (const file of files) visit(file);

let failed = false;

if (missing.length) {
  failed = true;
  console.error("✗ 없는 청크를 참조합니다:");
  for (const m of [...new Set(missing)]) console.error(`   ${m}`);
}

if (cycles.length) {
  failed = true;
  console.error("✗ 청크 간 순환 import 가 있습니다 (iOS 에서 흰 화면으로 죽습니다):");
  for (const cycle of cycles) console.error(`   ${cycle.join(" -> ")}`);
  console.error("\n  vite.config.ts 의 manualChunks 를 의심하세요.");
}

if (failed) process.exit(1);

console.log(`✓ 청크 ${files.length}개 — 순환 없음, 참조 누락 없음`);
