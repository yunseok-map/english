/** assets/logo.svg 에서 PWA·iOS 아이콘과 스플래시 이미지를 생성한다. */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const logo = fs.readFileSync(path.join(root, "assets", "logo.svg"));
const iconsDir = path.join(root, "client", "public", "icons");
fs.mkdirSync(iconsDir, { recursive: true });

const BACKGROUND = "#14312f";
const APP_BACKGROUND = "#f6f7f5";
const APP_BACKGROUND_DARK = "#101817";

const xcassets = path.join(root, "ios", "App", "App", "Assets.xcassets");
const rel = (file) => path.relative(root, file).replace(/\\/g, "/");

const targets = [
  { file: path.join(iconsDir, "icon-192.png"), size: 192 },
  { file: path.join(iconsDir, "icon-512.png"), size: 512 },
  { file: path.join(iconsDir, "apple-touch-icon.png"), size: 180 },
  { file: path.join(root, "assets", "icon.png"), size: 1024 },
];

for (const { file, size } of targets) {
  await sharp(logo).resize(size, size).png().toFile(file);
  console.log(`✓ ${rel(file)} (${size}px)`);
}

// maskable: 안전 영역 확보를 위해 로고를 80% 크기로 축소하고 배경을 채운다.
const maskableSize = 512;
const inner = Math.round(maskableSize * 0.8);
const innerBuffer = await sharp(logo).resize(inner, inner).png().toBuffer();
await sharp({
  create: { width: maskableSize, height: maskableSize, channels: 4, background: BACKGROUND },
})
  .composite([{ input: innerBuffer, top: (maskableSize - inner) / 2, left: (maskableSize - inner) / 2 }])
  .png()
  .toFile(path.join(iconsDir, "maskable-512.png"));
console.log("✓ client/public/icons/maskable-512.png (512px, maskable)");

// iOS 앱 아이콘은 알파 채널을 허용하지 않는다. 알파가 남아 있으면 기기에서
// 아이콘 뒤가 검게 렌더링되고 App Store 검증에서도 거부된다.
const appIconDir = path.join(xcassets, "AppIcon.appiconset");
fs.mkdirSync(appIconDir, { recursive: true });
const appIconFile = path.join(appIconDir, "AppIcon-512@2x.png");
await sharp(logo).resize(1024, 1024).flatten({ background: BACKGROUND }).png().toFile(appIconFile);
fs.writeFileSync(
  path.join(appIconDir, "Contents.json"),
  `${JSON.stringify(
    {
      images: [{ filename: "AppIcon-512@2x.png", idiom: "universal", platform: "ios", size: "1024x1024" }],
      info: { author: "xcode", version: 1 },
    },
    null,
    2,
  )}\n`,
);
console.log(`✓ ${rel(appIconFile)} (1024px, 알파 없음)`);

// 스플래시: 앱 배경색 위 중앙 로고. 라이트/다크 두 벌을 만든다.
const splashSize = 2732;
// composite offset은 정수여야 하므로 로고 크기를 짝수로 맞춘다.
const splashLogo = Math.round((splashSize * 0.22) / 2) * 2;
const splashLogoBuffer = await sharp(logo).resize(splashLogo, splashLogo).png().toBuffer();
const splashOffset = (splashSize - splashLogo) / 2;

async function renderSplash(background) {
  return sharp({
    create: { width: splashSize, height: splashSize, channels: 4, background },
  })
    .composite([{ input: splashLogoBuffer, top: splashOffset, left: splashOffset }])
    .flatten({ background })
    .png()
    .toBuffer();
}

const splashLight = await renderSplash(APP_BACKGROUND);
const splashDark = await renderSplash(APP_BACKGROUND_DARK);

await sharp(splashLight).toFile(path.join(root, "assets", "splash.png"));
await sharp(splashDark).toFile(path.join(root, "assets", "splash-dark.png"));
console.log("✓ assets/splash.png, assets/splash-dark.png (2732px)");

// Capacitor가 쓰는 Splash 이미지셋. 1x/2x/3x 세 벌 + 다크 대응.
const splashDir = path.join(xcassets, "Splash.imageset");
fs.mkdirSync(splashDir, { recursive: true });
const splashNames = ["splash-2732x2732-2.png", "splash-2732x2732-1.png", "splash-2732x2732.png"];
const splashDarkNames = ["splash-dark-2732x2732-2.png", "splash-dark-2732x2732-1.png", "splash-dark-2732x2732.png"];
const scales = ["1x", "2x", "3x"];

for (const name of splashNames) await sharp(splashLight).toFile(path.join(splashDir, name));
for (const name of splashDarkNames) await sharp(splashDark).toFile(path.join(splashDir, name));

fs.writeFileSync(
  path.join(splashDir, "Contents.json"),
  `${JSON.stringify(
    {
      images: [
        ...scales.map((scale, i) => ({ idiom: "universal", filename: splashNames[i], scale })),
        ...scales.map((scale, i) => ({
          idiom: "universal",
          appearances: [{ appearance: "luminosity", value: "dark" }],
          filename: splashDarkNames[i],
          scale,
        })),
      ],
      info: { version: 1, author: "xcode" },
    },
    null,
    2,
  )}\n`,
);
console.log("✓ ios/App/App/Assets.xcassets/Splash.imageset (라이트/다크)");
