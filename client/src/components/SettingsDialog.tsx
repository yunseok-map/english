import { useEffect, useRef, useState } from "react";
import { Download, RefreshCw, RotateCcw, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/state/context";
import { backupState, restoreState } from "@/lib/storage";
import { DEFAULT_STATE } from "@/state/defaults";
import { DIALECT_LABEL } from "@/lib/dialect";
import { Switch } from "@/components/ui/switch";
import { isNative } from "@/lib/native";
import {
  hasExactVoice,
  loadVoices,
  speak,
  speechEngineInUse,
  type VoiceOption,
} from "@/lib/speech";
import { requestNotificationPermission } from "@/lib/notifications";
import { haptic } from "@/lib/haptics";
import { daysTo } from "@/lib/engine";
import type { Settings } from "@/types";

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="text-[0.875rem] font-medium">{label}</p>
        {hint && (
          <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
      <div className="w-[10rem] shrink-0 [&_[data-slot=select-value]]:truncate">
        {children}
      </div>
    </div>
  );
}

export function SettingsDialog({
  open,
  onOpenChange,
  startRetest,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startRetest: () => void;
}) {
  const { app, update } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [backupKeys, setBackupKeys] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [resetArmed, setResetArmed] = useState(false);

  // 목소리 목록. 설치형 앱은 네이티브에서 받아 오므로 비동기다.
  // 웹은 기기가 준비되는 대로 채워지므로 voiceschanged 도 함께 듣는다.
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [voiceMatches, setVoiceMatches] = useState(true);
  useEffect(() => {
    let alive = true;
    const load = () => {
      void loadVoices().then(list => {
        if (alive) setVoices(list);
      });
      void hasExactVoice().then(ok => {
        if (alive) setVoiceMatches(ok);
      });
    };
    load();
    const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
    synth?.addEventListener("voiceschanged", load);
    return () => {
      alive = false;
      synth?.removeEventListener("voiceschanged", load);
    };
  }, [app.settings.dialect]);
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    update(state => ({
      ...state,
      settings: { ...state.settings, [key]: value },
    }));

  const setProfile = <K extends "name" | "departureDate">(
    key: K,
    value: string
  ) =>
    update(state => ({
      ...state,
      profile: { ...state.profile, [key]: value },
    }));

  // Gemini는 번역과 대화가 같은 키를 쓰므로, 번역 키를 비워 두면 대화 키를 재사용한다.
  const reusesLlmKey =
    app.settings.translationProvider === "gemini" &&
    !app.settings.translationKey &&
    app.settings.llmProvider === "gemini" &&
    Boolean(app.settings.llmKey);

  const importBackup = async (file: File) => {
    try {
      const restored = await restoreState(file);
      update(() => restored);
      toast.success("백업을 복원했어요.");
      onOpenChange(false);
    } catch (error) {
      // 왜 실패했는지 알려 준다. 예전에는 파일이 아니든 버전이 안 맞든
      // "읽을 수 없어요" 한 줄이라 뭘 고쳐야 할지 알 수 없었다.
      toast.error(
        error instanceof Error ? error.message : "백업 파일을 읽을 수 없어요."
      );
    }
  };

  const exportBackup = async () => {
    setExporting(true);
    try {
      const how = await backupState(app, { includeKeys: backupKeys });
      toast.success(
        how === "shared"
          ? "백업 파일을 만들었어요. 저장할 곳을 골라 주세요."
          : "백업 파일을 내려받았어요."
      );
    } catch (error) {
      // 공유 시트를 그냥 닫은 것도 여기로 온다. 실패로 몰아붙이지 않는다.
      const message = error instanceof Error ? error.message : "";
      if (/cancel/i.test(message)) return;
      toast.error("백업을 내보내지 못했어요.");
    } finally {
      setExporting(false);
    }
  };

  // 초기화는 되돌릴 수 없다. 한 번 더 눌러야 실행한다.
  const reset = () => {
    if (!resetArmed) {
      setResetArmed(true);
      window.setTimeout(() => setResetArmed(false), 4000);
      return;
    }
    update(() => DEFAULT_STATE);
    toast.success("모든 학습 데이터를 초기화했어요.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85dvh] max-w-[min(32rem,calc(100vw-2rem))] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>설정</DialogTitle>
          <DialogDescription>
            학습 환경과 연동 엔진을 조정해요.
          </DialogDescription>
        </DialogHeader>

        <div className="divide-y">
          {/*
            이름·출국일은 첫 온보딩에서만 받고 그 뒤로는 손댈 수 없었다.
            출국일이 밀리면 D-day 도, 오늘의 루트 주제 순서도, 알림 문구도
            전부 어긋나는데 고칠 방법이 전체 초기화뿐이었다.
          */}
          <section className="pb-1">
            <Row label="이름">
              <Input
                value={app.profile.name}
                maxLength={12}
                onChange={e => setProfile("name", e.target.value)}
                onBlur={e => {
                  if (!e.target.value.trim()) setProfile("name", "학습자");
                }}
              />
            </Row>
            <Row label="출국일" hint={`D-${daysTo(app.profile.departureDate)}`}>
              <Input
                type="date"
                value={app.profile.departureDate}
                onChange={e => {
                  if (e.target.value)
                    setProfile("departureDate", e.target.value);
                }}
              />
            </Row>
          </section>

          <section className="pb-1">
            <Row
              label="영어 표기·발음"
              hint="기본은 미국식이에요. 호주식으로 바꾸면 철자·표현·발음이 함께 바뀝니다."
            >
              <Select
                value={app.settings.dialect}
                onValueChange={v => set("dialect", v as Settings["dialect"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">{DIALECT_LABEL.us} (US)</SelectItem>
                  <SelectItem value="au">{DIALECT_LABEL.au} (AU)</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="테마">
              <Select
                value={app.settings.theme}
                onValueChange={v => set("theme", v as Settings["theme"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">시스템 설정</SelectItem>
                  <SelectItem value="light">밝게</SelectItem>
                  <SelectItem value="dark">어둡게</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="글자 크기">
              <Select
                value={app.settings.fontScale}
                onValueChange={v =>
                  set("fontScale", v as Settings["fontScale"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">보통</SelectItem>
                  <SelectItem value="large">크게</SelectItem>
                  <SelectItem value="xlarge">아주 크게</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="말하기 속도">
              <Select
                value={String(app.settings.rate)}
                onValueChange={v => set("rate", Number(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.6">아주 느리게</SelectItem>
                  <SelectItem value="0.85">느리게</SelectItem>
                  <SelectItem value="0.95">자연스럽게</SelectItem>
                  <SelectItem value="1.1">빠르게</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row
              label={`목소리 · ${app.settings.dialect === "au" ? "호주식" : "미국식"}`}
              hint={
                voiceMatches
                  ? `표기별로 따로 저장돼요. 지금은 ${app.settings.dialect === "au" ? "호주식(en-AU)" : "미국식(en-US)"} 목소리를 고르는 중이고, 표기를 바꾸면 그쪽에 골라 둔 목소리로 자동으로 넘어갑니다. 권장은 미국식 Zoe · 호주식 Karen 이에요. 아이폰 설정 → 손쉬운 사용 → 콘텐츠 말하기 → 음성 → 영어 에서 내려받으면 목록에 나타납니다.`
                  : `이 기기에 ${app.settings.dialect === "au" ? "호주" : "미국"} 목소리가 없어 다른 영어 목소리로 읽고 있어요. 아이폰 설정 → 손쉬운 사용 → 콘텐츠 말하기 → 음성 → 영어(${app.settings.dialect === "au" ? "호주" : "미국"}) 에서 ${app.settings.dialect === "au" ? "Karen" : "Zoe"} 을(를) 내려받으면 그 발음으로 바뀝니다.`
              }
            >
              <div className="space-y-2">
                <Select
                  value={
                    (app.settings.dialect === "au"
                      ? app.settings.voiceAU
                      : app.settings.voiceUS) || "auto"
                  }
                  onValueChange={v =>
                    set(
                      app.settings.dialect === "au" ? "voiceAU" : "voiceUS",
                      v === "auto" ? "" : v
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">
                      자동 ({app.settings.dialect === "au" ? "Karen" : "Zoe"}{" "}
                      우선)
                    </SelectItem>
                    {voices.map(voice => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.detail
                          ? `${voice.name} · ${voice.detail}`
                          : voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  onClick={() =>
                    speak(
                      "Hi, could I get a flat white to go, please?",
                      app.settings.rate
                    )
                  }
                  className="min-h-9 w-full rounded-lg border bg-card text-[0.8125rem] font-semibold"
                >
                  미리 들어 보기
                </button>
              </div>
            </Row>
          </section>

          <section className="py-1">
            <Row
              label="하루 새 단어"
              hint="오늘의 루트에 배정되는 신규 단어 수예요."
            >
              <Select
                value={String(app.settings.dailyNewWords)}
                onValueChange={v => set("dailyNewWords", Number(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20].map(n => (
                    <SelectItem key={n} value={String(n)}>
                      {n}개
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Row>
            <Row label="축약형 표시" hint="예: I'm (I am)">
              <Select
                value={app.settings.contractionMode}
                onValueChange={v =>
                  set("contractionMode", v as Settings["contractionMode"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paired">축약형 + 원형</SelectItem>
                  <SelectItem value="short">축약형만</SelectItem>
                  <SelectItem value="full">원형만</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row
              label="복습 알림"
              hint={
                isNative
                  ? "복습이 밀리면 정해진 시각에 한 번 알려 줘요."
                  : "알림은 설치형 앱에서만 동작해요."
              }
            >
              <div className="flex justify-end">
                <Switch
                  checked={app.settings.notifyEnabled}
                  disabled={!isNative}
                  aria-label="복습 알림"
                  onCheckedChange={async next => {
                    if (next) {
                      const granted = await requestNotificationPermission();
                      if (!granted) {
                        toast.error(
                          "알림 권한이 필요해요. iPhone 설정에서 허용해 주세요."
                        );
                        return;
                      }
                    }
                    set("notifyEnabled", next);
                  }}
                />
              </div>
            </Row>
            {app.settings.notifyEnabled && (
              <Row label="알림 시각">
                <Select
                  value={String(app.settings.notifyHour)}
                  onValueChange={v => set("notifyHour", Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[7, 8, 9, 12, 18, 19, 20, 21, 22].map(h => (
                      <SelectItem key={h} value={String(h)}>
                        {h < 12
                          ? `오전 ${h}시`
                          : h === 12
                            ? "낮 12시"
                            : `오후 ${h - 12}시`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Row>
            )}
            <Row
              label="자동 발음"
              hint="영어 단어·문장이 나오면 알아서 읽어 줘요. 정답을 맞히는 화면에서는 읽지 않아요."
            >
              <div className="flex justify-end">
                <Switch
                  checked={app.settings.autoSpeak}
                  aria-label="자동 발음"
                  onCheckedChange={next => set("autoSpeak", next)}
                />
              </div>
            </Row>
            <Row
              label="진동 피드백"
              hint={
                isNative
                  ? "정답·오답에 짧게 진동해요."
                  : "진동은 설치형 앱에서만 동작해요."
              }
            >
              <div className="flex justify-end">
                <Switch
                  checked={app.settings.haptics}
                  disabled={!isNative}
                  aria-label="진동 피드백"
                  onCheckedChange={next => {
                    set("haptics", next);
                    if (next) haptic.tap();
                  }}
                />
              </div>
            </Row>
            <Row
              label="음성 인식"
              hint={
                speechEngineInUse() === "native"
                  ? "아이폰 내장 인식을 쓰는 중이에요."
                  : speechEngineInUse() === "web"
                    ? "브라우저 음성 인식을 쓰는 중이에요."
                    : "이 환경에서는 음성 인식을 쓸 수 없어요."
              }
            >
              <Select
                value={app.settings.speechEngine}
                onValueChange={v =>
                  set("speechEngine", v as Settings["speechEngine"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">자동</SelectItem>
                  <SelectItem value="native">아이폰 내장</SelectItem>
                  <SelectItem value="web">브라우저</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row
              label="레벨 재테스트"
              hint="30문항을 다시 풀고 레벨을 새로 정해요."
            >
              <Button
                variant="outline"
                className="w-full"
                onClick={startRetest}
              >
                <RefreshCw size={15} /> 시작
              </Button>
            </Row>
          </section>

          <section className="py-1">
            <Row
              label="번역 엔진"
              hint="여기서 고른 엔진이 1순위예요. 한도가 끝나거나 실패하면 (대화용 Gemini 키가 있으면) Gemini → MyMemory → 내장 엔진 순으로 자동으로 넘어갑니다."
            >
              <Select
                value={app.settings.translationProvider}
                onValueChange={v =>
                  set(
                    "translationProvider",
                    v as Settings["translationProvider"]
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fallback">내장 엔진</SelectItem>
                  <SelectItem value="gemini">
                    Gemini (무료 키 · 추천)
                  </SelectItem>
                  <SelectItem value="mymemory">MyMemory (키 없음)</SelectItem>
                  <SelectItem value="papago">Papago (하루 1만 자)</SelectItem>
                  <SelectItem value="deepl">DeepL (월 50만 자)</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            {app.settings.translationProvider !== "fallback" &&
              app.settings.translationProvider !== "mymemory" && (
                <div className="space-y-1.5 py-2.5">
                  <Input
                    type="password"
                    value={app.settings.translationKey}
                    onChange={e => set("translationKey", e.target.value)}
                    placeholder={
                      app.settings.translationProvider === "papago"
                        ? "클라이언트ID:시크릿"
                        : app.settings.translationProvider === "deepl"
                          ? "DeepL 키 (무료 키는 :fx 로 끝나요)"
                          : reusesLlmKey
                            ? "아래 AI 대화 키를 함께 사용 중"
                            : "API 키"
                    }
                  />
                  {app.settings.translationProvider === "gemini" && (
                    <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
                      {reusesLlmKey
                        ? "AI 대화에 넣은 Gemini 키를 그대로 쓰고 있어요."
                        : "aistudio.google.com 에서 카드 등록 없이 무료로 키를 받을 수 있어요."}
                    </p>
                  )}
                  {(app.settings.translationProvider === "deepl" ||
                    app.settings.translationProvider === "papago") && (
                    <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
                      이 엔진은 브라우저에서 직접 부를 수 없어 앱(아이폰)에서만
                      동작해요. 웹에서는 MyMemory·내장 엔진으로 넘어갑니다.
                    </p>
                  )}
                </div>
              )}
            <Row label="AI 대화 모델">
              <Select
                value={app.settings.llmProvider}
                onValueChange={v =>
                  set("llmProvider", v as Settings["llmProvider"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">사용 안 함</SelectItem>
                  <SelectItem value="gemini">Gemini</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Claude</SelectItem>
                  <SelectItem value="openrouter">OpenRouter</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            {app.settings.llmProvider !== "none" && (
              <>
                <div className="py-2.5">
                  <Input
                    type="password"
                    value={app.settings.llmKey}
                    onChange={e => set("llmKey", e.target.value)}
                    placeholder="API 키"
                  />
                </div>
                <Row
                  label="이번 달 사용 한도"
                  hint={`현재 ${app.stats.llmCalls}회 사용`}
                >
                  <Select
                    value={String(app.settings.monthlyLimit)}
                    onValueChange={v => set("monthlyLimit", Number(v))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[50, 100, 300, 1000].map(n => (
                        <SelectItem key={n} value={String(n)}>
                          {n}회
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Row>
                <Row label="교정 수준">
                  <Select
                    value={app.settings.correctionLevel}
                    onValueChange={v =>
                      set("correctionLevel", v as Settings["correctionLevel"])
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전부 교정</SelectItem>
                      <SelectItem value="important">중요한 것만</SelectItem>
                      <SelectItem value="after">대화 후에</SelectItem>
                    </SelectContent>
                  </Select>
                </Row>
              </>
            )}
            <p className="pb-2 text-[0.75rem] leading-relaxed text-muted-foreground">
              API 키는 이 기기에만 저장돼요. 백업 파일에는 기본으로 담지 않아요.
            </p>
          </section>

          <section className="space-y-2 pt-3">
            <Row
              label="백업에 API 키 포함"
              hint="켜면 백업 파일에 키가 평문으로 들어가요. 파일을 남에게 보내지 마세요."
            >
              <div className="flex justify-end">
                <Switch
                  checked={backupKeys}
                  onCheckedChange={setBackupKeys}
                  aria-label="백업에 API 키 포함"
                />
              </div>
            </Row>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                disabled={exporting}
                onClick={() => void exportBackup()}
              >
                <Download size={15} /> 내보내기
              </Button>
              <Button
                variant="outline"
                onClick={() => fileRef.current?.click()}
              >
                <Upload size={15} /> 가져오기
              </Button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) void importBackup(file);
                e.target.value = "";
              }}
            />
            <Button
              variant="ghost"
              className="w-full text-destructive"
              onClick={reset}
            >
              <RotateCcw size={15} />{" "}
              {resetArmed
                ? "정말 지울게요 — 한 번 더 누르세요"
                : "모든 학습 데이터 초기화"}
            </Button>
            <p className="pt-1 text-center font-mono text-[0.6875rem] text-muted-foreground">
              워홀 영어 훈련 v{__APP_VERSION__}
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
