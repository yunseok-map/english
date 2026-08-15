# 워홀 영어 훈련 iOS 네이티브 앱

이 폴더는 Capacitor로 생성한 Xcode 프로젝트입니다. 최신 웹 학습 앱이 `ios/App/App/public/`에 포함되어 있으며, iPhone에서 네이티브 앱 셸로 실행됩니다.

## 웹 콘텐츠를 바꾼 경우

웹 화면이나 학습 콘텐츠를 수정한 뒤에는 아래 명령으로 빌드하고 iOS 프로젝트에 최신 번들을 복사합니다. (Windows에서도 동작합니다.)

```bash
pnpm ios:sync
```

## iPhone 설치용 IPA 또는 TestFlight 빌드 (macOS 필요)

macOS에서 Xcode를 설치한 뒤 `pnpm ios:sync`를 실행하고, `pnpm ios:open` 또는 `ios/App/App.xcodeproj`를 엽니다. **Signing & Capabilities**에서 본인의 Apple Developer Team을 선택하고 고유한 Bundle Identifier를 지정합니다.

실기기 설치는 연결한 iPhone을 대상으로 Run, TestFlight/IPA 배포는 **Product → Archive → Distribute App** 흐름을 사용합니다. Apple 개발자 인증서와 프로비저닝 프로파일이 필요합니다.

현재 앱 식별자는 `com.yunseok.woholenglish` 입니다.

> **맥이 없다면** `docs/IPA-설치가이드.md` 를 보세요. GitHub Actions(무료 macOS 러너)로 IPA를 만들고
> 윈도우에서 Sideloadly로 아이폰에 설치하는 방법을 정리해 두었습니다.

## 네이티브 구성 메모

- 사용 플러그인: `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/keyboard` (SPM 기반, CocoaPods 불필요)
- `Info.plist`에 마이크(`NSMicrophoneUsageDescription`)·음성 인식(`NSSpeechRecognitionUsageDescription`) 사용 목적을 한국어로 명시했습니다. 발음 체크 기능이 이 권한을 사용합니다.
- iPhone은 세로 모드 고정입니다(`UISupportedInterfaceOrientations`).
- 스플래시와 런치 스크린 배경은 앱 배경색 `#f4f8fa`로 맞췄습니다.
- 아이콘·스플래시 이미지는 `assets/logo.svg`에서 `pnpm icons`로 생성한 뒤 에셋 카탈로그에 복사합니다.

### macOS에서 확인이 필요한 항목

- 실기기 빌드 및 마이크·음성 인식 권한 프롬프트 동작
- 노치/홈 인디케이터 영역(safe area) 실제 렌더링
- `en-AU` 음성(TTS) 설치 여부에 따른 호주식 발음 재생
- WKWebView에는 `webkitSpeechRecognition`이 없어 음성 인식이 비활성 상태로 표시됩니다. 네이티브 음성 인식이 필요하면 `@capacitor-community/speech-recognition` 도입을 검토하세요.
