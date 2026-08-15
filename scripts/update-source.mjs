/**
 * SideStore/AltStore 소스(apps.json)를 갱신한다.
 *
 *   node scripts/update-source.mjs <버전> <IPA 경로>
 *
 * 소스를 SideStore에 한 번 등록해 두면, 이후 업데이트는 앱 안에서 버튼 하나로 끝난다.
 * 릴리스 자산 URL은 태그 이름으로 정해지므로 릴리스 생성 전에 미리 써 넣어도 된다.
 */
import fs from "node:fs";
import path from "node:path";

const [version, ipaPath] = process.argv.slice(2);
if (!version || !ipaPath) {
  console.error("사용법: node scripts/update-source.mjs <버전> <IPA 경로>");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const REPO = process.env.GITHUB_REPOSITORY || "yunseok-map/english";
const RAW = `https://raw.githubusercontent.com/${REPO}/main`;
const size = fs.statSync(ipaPath).size;
const date = new Date().toISOString().slice(0, 10);
const downloadURL = `https://github.com/${REPO}/releases/download/v${version}/WoholEnglish.ipa`;

const notes =
  process.env.RELEASE_NOTES?.trim() ||
  "레벨 테스트로 정한 내 레벨에 맞춰 단어·문법·회화를 매일 추천해 주는 워킹홀리데이 영어 학습 앱입니다.";

const versionEntry = {
  version,
  date,
  localizedDescription: notes,
  downloadURL,
  size,
  minOSVersion: "15.0",
};

const app = {
  name: "워홀 영어 훈련",
  bundleIdentifier: "com.yunseok.woholenglish",
  developerName: "yunseok",
  subtitle: "레벨 맞춤 워킹홀리데이 영어",
  localizedDescription: [
    "워킹홀리데이 준비를 위한 영어 학습 앱입니다.",
    "",
    "· 30문항 레벨 테스트로 A1/A2/B1 중 내 레벨을 정합니다.",
    "· 레벨에 맞는 단어 360개, 문법 30강, 회화팩 15개를 매일 루트로 추천합니다.",
    "· 미국식이 기본이고, 호주식으로 바꾸면 철자·표현·발음이 함께 바뀝니다.",
    "· 간격 반복(SRS) 복습, 받아쓰기, 발음 점수, 오답 노트를 지원합니다.",
    "· 기록은 기기 안에만 저장되고 인터넷 없이도 동작합니다.",
  ].join("\n"),
  iconURL: `${RAW}/client/public/icons/icon-512.png`,
  tintColor: "0F766E",
  category: "education",
  screenshotURLs: [],
  // 구버전 클라이언트 호환용 최상위 필드
  version,
  versionDate: date,
  versionDescription: notes,
  downloadURL,
  size,
  // 최신 소스 포맷
  versions: [versionEntry],
};

// 기존 소스가 있으면 이전 버전 기록을 이어 붙인다 (같은 버전은 새 값으로 대체).
const sourcePath = path.join(root, "source", "apps.json");
if (fs.existsSync(sourcePath)) {
  try {
    const prev = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
    const prevVersions = prev?.apps?.[0]?.versions ?? [];
    app.versions = [versionEntry, ...prevVersions.filter(v => v.version !== version)].slice(0, 20);
  } catch {
    /* 손상된 파일은 새로 만든다. */
  }
}

const source = {
  name: "yunseok 앱 저장소",
  identifier: "com.yunseok.source",
  subtitle: "워홀 영어 훈련",
  description: "개인용 앱 저장소입니다. SideStore에 이 주소를 등록하면 케이블 없이 설치·업데이트할 수 있어요.",
  iconURL: `${RAW}/client/public/icons/icon-512.png`,
  headerURL: `${RAW}/client/public/icons/icon-512.png`,
  website: `https://github.com/${REPO}`,
  tintColor: "0F766E",
  apps: [app],
  news: [],
};

fs.mkdirSync(path.dirname(sourcePath), { recursive: true });
fs.writeFileSync(sourcePath, `${JSON.stringify(source, null, 2)}\n`);
console.log(`✓ source/apps.json 갱신 — v${version} (${(size / 1048576).toFixed(2)}MB)`);
console.log(`  다운로드: ${downloadURL}`);
