import { useEffect, useRef, useState } from "react";
import { LockKeyhole, Mic, RotateCcw, Send, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Panel, Eyebrow } from "@/components/Panel";
import { useApp } from "@/state/context";
import { displayContractions, recordStudy } from "@/lib/engine";
import { llmUsage, requestPartnerReply, type ChatMode } from "@/lib/providers";
import { checkGrammar, summarizeIssues } from "@/lib/grammarCheck";
import { scenarioById, scenariosFor } from "@/lib/scenarios";
import { localChatReply } from "@/lib/localChat";
import { noteMistake } from "@/lib/route";
import { asrLocale } from "@/lib/dialect";
import { monthKey } from "@/state/defaults";
import { canRecognizeSpeech, speak, startRecognition } from "@/lib/speech";
import type { ChatMessage } from "@/types";

const MODES: Array<{ id: ChatMode; label: string }> = [
  { id: "free", label: "자유 대화" },
  { id: "role", label: "상황 역할극" },
  { id: "journal", label: "하루 일과" },
];

const INTRO: ChatMessage = {
  id: "intro",
  role: "assistant",
  text: "Hi! I'm your English practice partner. What did you do today?",
  hint: "I worked today. / I studied English on my way home.",
  createdAt: 0,
};

export function ChatScreen() {
  const { app, update } = useApp();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("free");
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [voice, setVoice] = useState(false);
  const [sending, setSending] = useState(false);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const usage = llmUsage(app.stats, app.settings.monthlyLimit);
  const usesLlm =
    app.settings.llmProvider !== "none" && Boolean(app.settings.llmKey);
  const asrSupported = canRecognizeSpeech();
  const scenario = scenarioById(scenarioId);
  const scenarios = scenariosFor(app.profile.level);

  // 역할극에서는 그 자리의 상대가 먼저 말을 건다. 상황이 보이지 않으면
  // 무슨 자리인지 몰라 연습이 되지 않는다.
  const opening: ChatMessage = scenario
    ? {
        id: `intro-${scenario.id}`,
        role: "assistant",
        text: scenario.opener,
        hint: scenario.hint,
        createdAt: 0,
      }
    : INTRO;
  const messages = app.chat.length ? app.chat : [opening];

  /** 대화를 비우고 새로 시작한다. */
  const reset = (nextMode = mode, nextScenario = scenarioId) => {
    update(state => ({ ...state, chat: [] }));
    setMode(nextMode);
    setScenarioId(nextScenario);
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [app.chat.length]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    if (usesLlm && usage.blocked) {
      toast.error(
        `이번 달 AI 대화 한도(${usage.limit}회)를 모두 사용했어요. 설정에서 한도를 조정할 수 있어요.`
      );
      return;
    }
    setSending(true);
    setInput("");

    const history = app.chat.map(m => ({ role: m.role, text: m.text }));
    const remote = usesLlm
      ? await requestPartnerReply(
          text,
          app.settings,
          app.profile.level,
          mode,
          app.settings.dialect,
          { scenarioRole: scenario?.role, history }
        )
      : null;

    // 규칙 기반 점검은 AI 키가 있든 없든 돌린다. 키가 없으면 이게 유일한
    // 점검이고, 있으면 AI 가 놓친 것을 받쳐 준다.
    const issues = checkGrammar(text);
    const shown =
      app.settings.correctionLevel === "all"
        ? issues
        : issues.filter(i => i.severity === "high");
    const localCorrection =
      app.settings.correctionLevel === "after"
        ? undefined
        : summarizeIssues(shown);

    const turn = app.chat.filter(m => m.role === "user").length;
    const local = localChatReply({ mode, text, turn, scenario });
    const correction = remote?.correction ?? localCorrection;
    const assistantText = remote?.reply ?? local.reply;
    const hint = remote?.hint ?? local.hint;

    const user: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      correction,
      createdAt: Date.now(),
    };
    const assistant: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      role: "assistant",
      text: assistantText,
      hint,
      createdAt: Date.now() + 1,
    };

    update(state => {
      const sameMonth = state.stats.llmMonth === monthKey();
      return {
        ...state,
        chat: [...(state.chat.length ? state.chat : []), user, assistant].slice(
          -60
        ),
        stats: recordStudy(state.stats, {
          llmCalls: remote
            ? (sameMonth ? state.stats.llmCalls : 0) + 1
            : sameMonth
              ? state.stats.llmCalls
              : 0,
          llmMonth: monthKey(),
        }),
        // 같은 실수는 한 줄로 합친다. 예전에는 매번 새 id 를 만들어
        // 똑같은 지적이 오답노트에 끝없이 쌓였다.
        mistakes: issues.length
          ? issues
              .filter(i => i.severity === "high" && i.id !== "korean")
              .reduce(
                (acc, issue) =>
                  noteMistake(
                    { ...state, mistakes: acc },
                    {
                      id: `grammar-chat-${issue.id}`,
                      type: "grammar",
                      label: issue.message,
                      answer: issue.fixed ?? text,
                      hint: text,
                    }
                  ),
                state.mistakes
              )
          : state.mistakes,
      };
    });

    if (voice) speak(assistantText, app.settings.rate);
    setSending(false);
  };

  const startVoiceInput = async () => {
    if (!asrSupported)
      return toast(
        "이 기기에서는 음성 인식이 지원되지 않아요. 입력으로 연습해 보세요."
      );
    const handle = await startRecognition(asrLocale(app.settings.dialect), {
      onResult: text => setInput(text),
      onEnd: () => setListening(false),
      onError: () => {
        setListening(false);
        toast.error("음성을 인식하지 못했어요.");
      },
    });
    if (handle) setListening(true);
  };

  return (
    <div className="space-y-4">
      <div>
        <Eyebrow>CONVERSATION LAB</Eyebrow>
        <h1 className="mt-1 text-[1.375rem] font-bold tracking-tight">
          실제로 써보기
        </h1>
        <p className="mt-1 text-[0.875rem] text-muted-foreground">
          틀려도 대화를 끊지 않아요. 필요한 말은 그 자리에서 꺼내세요.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {MODES.map(item => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === mode) return;
              // 모드를 바꾸면 새 대화로 시작한다. 앞 대화가 남아 있으면
              // 상대가 어떤 자리인지 헷갈린 채로 이어진다.
              reset(item.id, null);
            }}
            aria-pressed={mode === item.id}
            className={`min-h-9 rounded-full border px-3 text-[0.8125rem] font-semibold transition-colors ${
              mode === item.id
                ? "border-primary bg-accent text-accent-foreground"
                : "bg-card text-muted-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
        <label className="ml-auto inline-flex min-h-9 items-center gap-2 text-[0.8125rem] font-medium text-muted-foreground">
          <Switch checked={voice} onCheckedChange={setVoice} /> 음성 모드
        </label>
      </div>

      {mode === "role" && (
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 pb-1">
            {scenarios.map(item => (
              <button
                key={item.id}
                onClick={() => reset("role", item.id)}
                aria-pressed={scenarioId === item.id}
                className={`min-h-9 whitespace-nowrap rounded-full border px-3 text-[0.8125rem] font-semibold transition-colors ${
                  scenarioId === item.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "role" && !scenario && (
        <Panel className="text-[0.875rem] leading-relaxed text-muted-foreground">
          위에서 상황을 하나 고르면 그 자리의 상대가 먼저 말을 걸어요. 카페
          주문, 셰어하우스 문의, 면접처럼 워홀에서 실제로 마주치는 자리예요.
        </Panel>
      )}

      {scenario && (
        <Panel className="space-y-2 border-primary/30 bg-accent/30">
          <div className="flex items-center gap-2">
            <Eyebrow className="text-primary">{scenario.label}</Eyebrow>
            <button
              onClick={() => reset("role", scenario.id)}
              className="ml-auto inline-flex min-h-8 items-center gap-1 rounded-lg bg-card px-2 text-[0.75rem] font-semibold text-muted-foreground"
            >
              <RotateCcw size={12} /> 새 대화
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {scenario.phrases.map(phrase => (
              <button
                key={phrase}
                onClick={() => setInput(phrase)}
                className="rounded-full bg-card px-2.5 py-1 font-mono text-[0.75rem] text-muted-foreground"
              >
                {phrase}
              </button>
            ))}
          </div>
        </Panel>
      )}

      {!usesLlm && (
        <Panel className="flex items-start gap-3 border-primary/30 bg-accent/40">
          <LockKeyhole size={18} className="mt-0.5 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <strong className="text-[0.9375rem]">
              AI 키를 연결하면 대화가 더 깊어져요
            </strong>
            <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              설정에서 Gemini·OpenAI·Claude·OpenRouter 키를 넣으면 선택한 모델과
              대화할 수 있어요. 지금은 내장 코칭으로 연습할 수 있습니다.
            </p>
          </div>
        </Panel>
      )}

      {usesLlm && (
        <p className="text-right font-mono text-[0.75rem] text-muted-foreground">
          이번 달 AI 대화 {usage.used} / {usage.limit}
        </p>
      )}

      {app.chat.length > 0 && mode !== "role" && (
        <div className="flex justify-end">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-8 items-center gap-1 rounded-lg bg-muted px-2.5 text-[0.75rem] font-semibold text-muted-foreground"
          >
            <RotateCcw size={12} /> 새 대화
          </button>
        </div>
      )}

      <div className="space-y-2.5">
        {messages.map(message => {
          const mine = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] space-y-1.5 rounded-2xl px-3.5 py-2.5 ${
                  mine
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-card border"
                }`}
              >
                <p className="font-mono text-[0.875rem] leading-relaxed [overflow-wrap:anywhere]">
                  {displayContractions(
                    message.text,
                    mine ? "short" : app.settings.contractionMode
                  )}
                </p>
                {!mine && (
                  <button
                    onClick={() => speak(message.text, app.settings.rate)}
                    aria-label="문장 듣기"
                    className="inline-flex min-h-8 items-center gap-1 rounded-lg bg-muted px-2 text-[0.6875rem] font-semibold text-muted-foreground"
                  >
                    <Volume2 size={12} /> 듣기
                  </button>
                )}
                {message.correction && (
                  <p
                    className={`rounded-lg px-2 py-1.5 text-[0.75rem] leading-relaxed ${mine ? "bg-white/15" : "bg-muted"}`}
                  >
                    ✎ {message.correction}
                  </p>
                )}
                {message.hint && (
                  <p className="text-[0.75rem] text-muted-foreground">
                    💡 {message.hint}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-[calc(76px+var(--safe-bottom))] space-y-2 rounded-2xl border bg-card p-2.5 shadow-lg">
        <div className="relative">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            rows={2}
            placeholder={
              asrSupported
                ? "영어가 막히면 한국어로 적어도 돼요."
                : "영어로 입력해 보세요. (이 기기는 음성 인식 미지원)"
            }
            className="pr-12"
          />
          {asrSupported && (
            <button
              onClick={() => void startVoiceInput()}
              aria-label="영어 음성 입력"
              className={`absolute right-2 top-2 flex size-10 items-center justify-center rounded-lg transition-colors ${
                listening
                  ? "bg-destructive text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mic size={17} />
            </button>
          )}
        </div>
        <Button className="w-full" onClick={send} disabled={sending}>
          <Send size={15} /> {sending ? "응답 생성 중" : "보내기"}
        </Button>
      </div>

      <Panel className="space-y-2">
        <Eyebrow className="text-muted-foreground">SESSION REPORT</Eyebrow>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            // 첫 칸만 이번 대화 기준이고 나머지는 누적이라 라벨을 나눠 둔다.
            [app.chat.filter(m => m.role === "user").length, "이번 대화 문장"],
            [
              app.mistakes.filter(m => m.type === "grammar").length,
              "문법 점검 누적",
            ],
            [app.savedPhrases.length, "저장 문장 누적"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-muted/60 py-3">
              <b className="block font-mono text-[1.25rem] font-semibold tabular-nums">
                {value}
              </b>
              <span className="text-[0.75rem] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
