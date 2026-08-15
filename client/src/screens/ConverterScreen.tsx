import { useMemo, useState } from "react";
import { ChevronRight, Copy, Languages, Loader2, Mic, Save, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Panel, Eyebrow } from "@/components/Panel";
import { useApp } from "@/state/context";
import { displayContractions, fallbackTranslate, matchLessons, relevantWords, toTone } from "@/lib/engine";
import { translateText } from "@/lib/providers";
import { dt } from "@/lib/dialect";
import { canRecognizeSpeech, speak, startRecognition } from "@/lib/speech";
import type { LearnSection } from "@/screens/learn/LearnScreen";
import type { Tone } from "@/types";

const TONES: Array<{ id: Tone; label: string; mark: string; desc: string; note: string }> = [
  {
    id: "friend",
    label: "친구 · 캐주얼",
    mark: "●",
    desc: "친한 사이에서는 짧고 자연스럽게",
    note: "친구 사이에서는 축약형과 짧은 표현이 자연스러워요.",
  },
  {
    id: "daily",
    label: "일상 · 중립",
    mark: "◇",
    desc: "가게·알바에서 가장 안전한 기본 표현",
    note: "워홀 알바·가게에서는 이 표현을 기본으로 쓰세요.",
  },
  {
    id: "business",
    label: "비즈니스 · 격식",
    mark: "■",
    desc: "면접·이메일에서 완전한 문장으로",
    note: "이 톤에서는 축약형을 피하고 정중한 완전 문장을 씁니다.",
  },
];

export function ConverterScreen({ openLearn }: { openLearn: (section: LearnSection) => void }) {
  const { app, update } = useApp();
  const dialect = app.settings.dialect;
  const [input, setInput] = useState("이거 얼마예요? 좀 깎아주실 수 있어요?");
  const [result, setResult] = useState("How much is this? Could you give me a discount?");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const lessons = useMemo(() => matchLessons(result), [result]);
  const words = useMemo(() => relevantWords(result, dialect), [result, dialect]);

  const convert = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const cached = app.translationCache[input];
    const translated = cached || (await translateText(input, app.settings));
    if (!cached && app.settings.translationProvider !== "fallback" && translated === fallbackTranslate(input)) {
      toast("연결이 불안정해 내장 표현 엔진으로 만들었어요.");
    }
    update((state) => ({ ...state, translationCache: { ...state.translationCache, [input]: translated } }));
    setResult(translated);
    setLoading(false);
  };

  const save = (tone: Tone, sentence: string) => {
    const id = `${Date.now()}-${tone}`;
    update((state) => ({
      ...state,
      savedPhrases: [{ id: `phrase-${id}`, ko: input, en: sentence, tone, createdAt: Date.now() }, ...state.savedPhrases],
      srs: {
        ...state.srs,
        [`sentence-${id}`]: {
          id: `sentence-${id}`,
          word: sentence,
          meaning: input,
          dueAt: Date.now() + 86400000,
          interval: 1,
          ease: 2.5,
          repetitions: 0,
          source: "sentence" as const,
        },
      },
    }));
    toast.success("내 문장장과 복습 카드에 저장했어요.");
  };

  const startKoreanVoice = () => {
    if (!canRecognizeSpeech()) return toast("이 기기에서는 음성 입력을 지원하지 않아요. 직접 입력해 주세요.");
    const handle = startRecognition("ko-KR", {
      onResult: (text) => setInput(text),
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
        <Eyebrow>PHRASE WORKSHOP</Eyebrow>
        <h1 className="mt-1 text-[1.375rem] font-bold tracking-tight">하고 싶은 말 만들기</h1>
        <p className="mt-1 text-[0.875rem] text-muted-foreground">번역 한 줄로 끝내지 않고, 상황에 맞는 톤과 이유까지 확인해요.</p>
      </div>

      <Panel className="space-y-3">
        <label className="block space-y-2">
          <span className="text-[0.875rem] font-semibold">한국어로 말하고 싶은 내용을 적어보세요</span>
          <div className="relative">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} className="pr-12" />
            <button
              onClick={startKoreanVoice}
              aria-label="한국어 음성 입력"
              className={`absolute right-2 top-2 flex size-10 items-center justify-center rounded-lg transition-colors ${
                listening ? "bg-destructive text-white" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mic size={17} />
            </button>
          </div>
        </label>
        <Button className="w-full" size="lg" onClick={convert} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={17} /> : <Languages size={17} />}
          {loading ? "문장을 만드는 중" : "3가지 톤으로 만들기"}
        </Button>
        <p className="text-[0.75rem] text-muted-foreground">
          {app.settings.translationProvider === "fallback"
            ? "API 키 없이 내장 표현 엔진으로 동작 중이에요."
            : `${app.settings.translationProvider} 엔진을 우선 사용하고, 실패 시 내장 엔진으로 이어집니다.`}
        </p>
      </Panel>

      <div className="space-y-2.5">
        {TONES.map((tone) => {
          const sentence = displayContractions(toTone(result, tone.id), app.settings.contractionMode);
          return (
            <Panel key={tone.id} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.75rem] text-primary">{tone.mark}</span>
                <div className="min-w-0">
                  <p className="text-[0.8125rem] font-semibold">{tone.label}</p>
                  <p className="text-[0.75rem] text-muted-foreground">{tone.desc}</p>
                </div>
              </div>
              <p className="font-mono text-[1.0625rem] font-medium leading-relaxed [overflow-wrap:anywhere]">{sentence}</p>
              <p className="text-[0.75rem] text-muted-foreground">{tone.note}</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => speak(sentence, app.settings.rate)}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-muted px-2.5 text-[0.75rem] font-semibold text-muted-foreground hover:text-foreground"
                >
                  <Volume2 size={13} /> 듣기
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(sentence);
                    toast.success("문장을 복사했어요.");
                  }}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-muted px-2.5 text-[0.75rem] font-semibold text-muted-foreground hover:text-foreground"
                >
                  <Copy size={13} /> 복사
                </button>
                <button
                  onClick={() => save(tone.id, sentence)}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-muted px-2.5 text-[0.75rem] font-semibold text-muted-foreground hover:text-foreground"
                >
                  <Save size={13} /> 저장
                </button>
              </div>
            </Panel>
          );
        })}
      </div>

      {lessons.length > 0 && (
        <Panel className="space-y-2">
          <Eyebrow className="text-muted-foreground">이 문장의 문법</Eyebrow>
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => openLearn("grammar")}
              className="flex w-full items-center gap-2 rounded-xl bg-muted/50 p-3 text-left transition-colors hover:bg-muted"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[0.875rem] font-semibold">{lesson.title}</span>
                <span className="block truncate text-[0.75rem] text-muted-foreground">{lesson.koreanGap}</span>
              </span>
              <ChevronRight size={15} className="shrink-0 text-muted-foreground" />
            </button>
          ))}
        </Panel>
      )}

      {words.length > 0 && (
        <Panel className="space-y-2">
          <Eyebrow className="text-muted-foreground">단어 선택</Eyebrow>
          {words.map((word) => (
            <div key={word.id} className="rounded-xl bg-muted/50 p-3">
              <p className="font-mono text-[0.9375rem] font-semibold">{dt(word.word, dialect)}</p>
              <p className="text-[0.8125rem] text-muted-foreground">{word.meaning}</p>
              {word.nuance && <p className="mt-0.5 text-[0.75rem] text-muted-foreground">{word.nuance}</p>}
            </div>
          ))}
        </Panel>
      )}

      <Panel className="space-y-1.5">
        <Eyebrow className="text-muted-foreground">역번역 확인</Eyebrow>
        <p className="font-mono text-[0.9375rem] [overflow-wrap:anywhere]">{result}</p>
        <p className="text-[0.8125rem] text-muted-foreground">→ “{input}”</p>
        <p className="text-[0.75rem] text-muted-foreground">
          어색하게 느껴진다면 일상·중립 표현부터 사용해 보세요. 가장 안전한 기본값이에요.
        </p>
      </Panel>
    </div>
  );
}
