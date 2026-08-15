# 맥 없이 IPA 만들어서 아이폰에 설치하기

윈도우만 있어도 **진짜 앱(.ipa)** 을 만들어 아이폰에 설치할 수 있습니다.
전체 흐름은 이렇습니다.

```
내 PC(윈도우)          GitHub 클라우드(맥)          내 아이폰
   코드 푸시    ──────▶   IPA 자동 빌드
                              │
   IPA 다운로드  ◀────────────┘
   Sideloadly 로 서명 + 설치  ──────────────────▶  앱 설치 완료
```

애플이 IPA 컴파일에 macOS를 요구하기 때문에 **빌드는 GitHub의 무료 macOS 서버**에서 하고,
**설치는 윈도우에서 Sideloadly**로 합니다. 준비물은 GitHub 계정과 Apple ID(무료)뿐입니다.

---

## 1단계. 코드를 GitHub에 올리기 (최초 1회)

### 1) GitHub에서 빈 저장소 만들기

<https://github.com/new> 에서 저장소를 만듭니다.

- Repository name: `working-holiday-english` (아무거나 상관없음)
- **Private 로 만드세요** (API 키 관련 파일은 이미 제외해 뒀지만 안전하게)
- README, .gitignore 등은 **체크하지 마세요** (이미 있습니다)

### 2) 내 PC에서 푸시

프로젝트 폴더에서 터미널을 열고 (아래 `<주소>` 는 방금 만든 저장소 주소로 바꾸세요):

```bash
git init
git add .
git commit -m "워홀 영어 훈련 앱"
git branch -M main
git remote add origin <주소>
git push -u origin main
```

> `git` 이 없다면 <https://git-scm.com/download/win> 에서 설치하세요.

---

## 2단계. IPA 빌드하기

1. GitHub 저장소 페이지 → 상단 **Actions** 탭
2. 왼쪽 목록에서 **iOS IPA 빌드** 클릭
3. 오른쪽 **Run workflow** 버튼 → 초록색 **Run workflow** 다시 클릭
4. 5~10분 기다립니다 (진행 상황이 실시간으로 보입니다)
5. 빌드가 끝나면(초록 체크) 실행 결과 페이지 맨 아래 **Artifacts** 에서
   **`wohol-english-ipa`** 를 다운로드 → 압축을 풀면 **`WoholEnglish.ipa`** 가 나옵니다
   (앱 이름은 아이폰에서 "워홀 영어 훈련"으로 표시됩니다)

> 앱 내용을 수정할 때마다 1단계의 `git add . && git commit -m "수정" && git push` 를 한 뒤
> 이 2단계를 다시 실행하면 새 IPA가 나옵니다.

**무료 사용량**: 비공개 저장소 기준 월 2,000분이 무료이고 macOS 빌드는 10배로 계산되어
실질 월 200분입니다. 한 번 빌드에 약 6~8분이니 **월 25회 정도는 무료**입니다.
공개(Public) 저장소로 만들면 무제한 무료입니다.

---

## 3단계. 아이폰에 설치하기 (Sideloadly)

### 준비

- 윈도우 PC에 **iTunes 설치** (애플 공식 사이트 버전. Microsoft Store 버전 말고)
- **Sideloadly** 다운로드: <https://sideloadly.io>
- 아이폰과 PC를 연결할 **USB 케이블**

### 설치 절차

1. Sideloadly 실행 → 아이폰을 USB로 연결 → 아이폰에서 **"이 컴퓨터를 신뢰"** 를 누릅니다
2. Sideloadly 창에서:
   - **IPA 파일**: 다운로드한 `WoholEnglish.ipa` 를 드래그 앤 드롭
   - **Apple ID**: 본인 Apple ID 입력 (무료 계정 OK)
3. **Start** 클릭 → Apple ID 비밀번호 입력
   - 2단계 인증을 쓰면 **앱 암호**가 필요할 수 있습니다.
     <https://account.apple.com> → 로그인 및 보안 → 앱 암호 에서 생성해 입력하세요.
4. 설치가 끝나면 아이폰 홈 화면에 앱이 생깁니다

### 첫 실행 전 — 개발자 신뢰 설정 (필수)

아이폰에서:

**설정 → 일반 → VPN 및 기기 관리 → (본인 Apple ID) → 신뢰**

이걸 안 하면 앱을 눌러도 "신뢰할 수 없는 개발자" 라며 안 열립니다.

---

## 알아둘 점

### 7일마다 재설치가 필요합니다

무료 Apple ID로 서명하면 **7일 후 앱이 만료**되어 실행되지 않습니다.
그때는 Sideloadly로 **같은 IPA를 다시 설치**하면 됩니다 (데이터는 유지됩니다).

- 무료 계정: 7일마다 재설치, 앱 3개까지
- **유료 개발자 계정($99/년)**: 1년간 유지, 재설치 불필요

매주 케이블 꽂는 게 번거로우면 **AltStore** (<https://altstore.io>) 를 쓰세요.
PC의 AltServer가 같은 Wi-Fi에 있으면 **백그라운드에서 자동으로 갱신**해 줍니다.

### 학습 기록은 안전합니다

기록은 아이폰 안에 저장되고 재설치해도 유지됩니다.
그래도 중요한 기록은 **설정 → 내보내기** 로 백업 파일을 만들어 두세요.

### 앱 이름·아이콘

- 앱 이름: **워홀 영어 훈련**
- 번들 ID: `com.yunseok.woholenglish`
- 아이콘/스플래시를 바꾸려면 `assets/logo.svg` 를 수정하고 `pnpm icons` 를 실행한 뒤
  생성된 이미지를 `ios/App/App/Assets.xcassets` 에 복사하고 다시 푸시하세요.

---

## 잘 안 될 때

| 증상 | 해결 |
| --- | --- |
| Actions 빌드가 빨간 X | 실패한 단계를 눌러 로그를 보세요. 대부분 `pnpm install` 단계이며, `pnpm install` 을 로컬에서 다시 돌리고 `pnpm-lock.yaml` 을 커밋하면 해결됩니다. |
| Sideloadly에서 "Provisioning profile" 오류 | 무료 계정은 앱 3개 제한입니다. 다른 사이드로드 앱을 지우고 다시 시도하세요. |
| 설치는 됐는데 앱이 안 열림 | 위의 **개발자 신뢰 설정**을 하지 않은 경우입니다. |
| 며칠 뒤 앱이 안 열림 | 7일 서명 만료입니다. 같은 IPA로 재설치하세요. |
| iTunes를 설치했는데 기기 인식 안 됨 | Microsoft Store 버전은 동작하지 않습니다. apple.com 에서 받은 버전을 설치하세요. |

---

## 참고: 웹으로도 쓸 수 있습니다

IPA 설치가 번거로울 때를 대비해 PWA 방식도 함께 준비돼 있습니다.
7일 만료가 없고 설치도 즉시 됩니다. 자세한 내용은 `docs/설치안내.md` 를 보세요.
