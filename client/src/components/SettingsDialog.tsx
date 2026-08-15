import { useRef } from "react";
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
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    update(state => ({
      ...state,
      settings: { ...state.settings, [key]: value },
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
    } catch {
      toast.error("백업 파일을 읽을 수 없어요.");
    }
  };

  const reset = () => {
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
                  <SelectItem value="1">보통</SelectItem>
                </SelectContent>
              </Select>
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
              hint="내장 엔진과 MyMemory는 API 키가 필요 없어요."
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
                  <SelectItem value="gemini">Gemini (무료 키)</SelectItem>
                  <SelectItem value="mymemory">MyMemory</SelectItem>
                  <SelectItem value="deepl">DeepL</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="papago">Papago</SelectItem>
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
              API 키는 이 기기에만 저장돼요. 백업 파일에도 함께 담기니 공유에
              주의하세요.
            </p>
          </section>

          <section className="space-y-2 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => backupState(app)}>
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
              <RotateCcw size={15} /> 모든 학습 데이터 초기화
            </Button>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
