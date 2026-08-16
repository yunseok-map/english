import { useEffect, useRef, useState } from "react";
import { LockKeyhole, Mic, Send, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Panel, Eyebrow } from "@/components/Panel";
import { useApp } from "@/state/context";
import { displayContractions, recordStudy } from "@/lib/engine";
import { llmUsage, requestPartnerReply, type ChatMode } from "@/lib/providers";
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

/** LLM 키가 없을 때 대화를 이어 주는 규칙 기반 응답. */
function localReply(input: string, mode: ChatMode) {
  const hasKorean = /[가-힣]/.test(input);
  const correction = /\bI go\b.*\byesterday\b/i.test(input)
    ? "I went there yesterday. — 어제 일어난 일이므로 go가 went가 돼요."
    : hasKorean
      ? "영어로는 이렇게 시작해 보세요: I would like to say that in English."
      : undefined;
  const reply =
    mode === "journal"
      ? "That sounds like a full day. What was the best part of it?"
      : mode === "role"
        ? "Thanks for coming in. Could you tell me about your availability?"
        : "That's a good start. Could you tell me one more detail?";
  const hint =
    mode === "role"
      ? "I'm available on weekdays and weekends."
      : "It was busy, but I learned something new.";
  return { reply, correction, hint };
}

export function ChatScreen() {
  const { app, update } = useApp();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("free");
  const [voice, setVoice] = useState(false);
  const [sending, setSending] = useState(false);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const usage = llmUsage(app.stats, app.settings.monthlyLimit);
  const usesLlm =
    app.settings.llmProvider !== "none" && Boolean(app.settings.llmKey);
  const asrSupported = canRecognizeSpeech();
  const messages = app.chat.length ? app.chat : [INTRO];

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

    const remote = usesLlm
      ? await requestPartnerReply(
          text,
          app.settings,
          app.profile.level,
          mode,
          app.settings.dialect
        )
      : null;
    const local = localReply(text, mode);
    const correction = remote?.correction ?? local.correction;
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
        mistakes: correction
          ? [
              {
                id: `g-${Date.now()}`,
                type: "grammar" as const,
                label: correction.slice(0, 40),
                count: 1,
                nextReview: Date.now() + 3 * 86400000,
              },
              ...state.mistakes,
            ]
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
            onClick={() => setMode(item.id)}
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
            [app.chat.filter(m => m.role === "user").length, "내가 쓴 문장"],
            [
              app.mistakes.filter(m => m.type === "grammar").length,
              "문법 점검",
            ],
            [app.savedPhrases.length, "저장 문장"],
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
