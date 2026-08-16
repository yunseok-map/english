import { useRef, useState } from "react";
import { ChevronRight, Mic, Square, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Panel, Eyebrow, Empty } from "@/components/Panel";
import { useApp } from "@/state/context";
import { PRONUNCIATION_COURSES } from "@/data";
import type { PronunciationCourse } from "@/data/types";
import { dt, asrLocale } from "@/lib/dialect";
import { recordStudy } from "@/lib/engine";
import { scorePronunciation } from "@/lib/phonetics";
import { haptic } from "@/lib/haptics";
import {
  canRecognizeSpeech,
  speak,
  startRecognition,
  type RecognizerHandle,
} from "@/lib/speech";

const RATES: Array<{ label: string; rate: number }> = [
  { label: "0.5×", rate: 0.5 },
  { label: "0.75×", rate: 0.7 },
  { label: "1×", rate: 0.95 },
];

function CourseDetail({
  course,
  onBack,
}: {
  course: PronunciationCourse;
  onBack: () => void;
}) {
  const { app, update } = useApp();
  const [listening, setListening] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<number, number>>({});
  const recognizer = useRef<RecognizerHandle | null>(null);
  const asrSupported = canRecognizeSpeech();

  const checkSentence = async (index: number, sentence: string) => {
    if (listening !== null) {
      recognizer.current?.stop();
      setListening(null);
      return;
    }
    const handle = await startRecognition(asrLocale(app.settings.dialect), {
      onResult: text => {
        const result = scorePronunciation(sentence, text);
        const score = result.score;
        if (score >= 70) haptic.success();
        else haptic.error();
        setScores(prev => ({ ...prev, [index]: score }));
        update(state => ({
          ...state,
          stats: recordStudy(state.stats, {
            pronunciationScores: [
              ...state.stats.pronunciationScores,
              score,
            ].slice(-50),
          }),
        }));
        toast(
          score >= 80
            ? `훌륭해요! ${score}점`
            : result.issues[0]
              ? `${score}점 — ${result.issues[0].hint}`
              : `${score}점 — 들리는 대로: "${text}"`
        );
      },
      onEnd: () => setListening(null),
      onError: () => {
        setListening(null);
        toast.error("음성을 인식하지 못했어요. 다시 시도해 주세요.");
      },
    });
    if (!handle)
      return toast.error("이 기기에서는 음성 인식이 지원되지 않아요.");
    recognizer.current = handle;
    setListening(index);
  };

  return (
    <div className="space-y-4">
      <button
        className="text-[0.875rem] font-medium text-muted-foreground"
        onClick={onBack}
      >
        ← 발음 코스로
      </button>
      <Panel className="space-y-3">
        <Eyebrow>PRONUNCIATION</Eyebrow>
        <h2 className="text-[1.25rem] font-bold tracking-tight">
          {course.title}
        </h2>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {course.tip}
        </p>
      </Panel>

      <Panel className="space-y-3">
        <Eyebrow className="text-muted-foreground">
          최소대립쌍 — 눌러서 비교
        </Eyebrow>
        <div className="grid grid-cols-2 gap-2">
          {course.pairs.map(([left, right], i) => (
            <div
              key={i}
              className="grid grid-cols-2 overflow-hidden rounded-xl border"
            >
              {[left, right].map((word, side) => (
                <button
                  key={side}
                  onClick={() => speak(word, 0.8)}
                  className={`min-h-11 px-2 py-2 font-mono text-[0.875rem] font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                    side === 1 ? "border-l" : ""
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="space-y-3">
        <div className="flex items-center justify-between">
          <Eyebrow className="text-muted-foreground">연습 문장</Eyebrow>
          {!asrSupported && (
            <span className="text-[0.75rem] text-muted-foreground">
              음성 인식 미지원 기기 — 듣고 따라 말해 보세요
            </span>
          )}
        </div>
        <div className="space-y-2.5">
          {course.sentences.map((sentence, i) => {
            const text = dt(sentence, app.settings.dialect);
            return (
              <div key={i} className="space-y-2 rounded-xl bg-muted/50 p-3">
                <p className="font-mono text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere]">
                  {text}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {RATES.map(({ label, rate }) => (
                    <button
                      key={label}
                      onClick={() => speak(text, rate)}
                      className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-card px-2.5 font-mono text-[0.75rem] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Volume2 size={13} /> {label}
                    </button>
                  ))}
                  {asrSupported && (
                    <button
                      onClick={() => void checkSentence(i, text)}
                      className={`ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-[0.8125rem] font-semibold transition-colors ${
                        listening === i
                          ? "bg-destructive text-white"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {listening === i ? (
                        <Square size={13} />
                      ) : (
                        <Mic size={13} />
                      )}
                      {listening === i
                        ? "중지"
                        : scores[i] !== undefined
                          ? `${scores[i]}점 · 다시`
                          : "발음 체크"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

export function PronunciationScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId
    ? PRONUNCIATION_COURSES.find(c => c.id === selectedId)
    : null;
  if (selected)
    return (
      <CourseDetail course={selected} onBack={() => setSelectedId(null)} />
    );

  if (PRONUNCIATION_COURSES.length === 0)
    return (
      <Empty title="코스 준비 중" text="발음 코스 콘텐츠를 준비하고 있어요." />
    );

  return (
    <div className="space-y-2.5">
      <Eyebrow className="text-muted-foreground">
        한국인이 어려워하는 소리 8가지
      </Eyebrow>
      <div className="overflow-hidden rounded-2xl border bg-card">
        {PRONUNCIATION_COURSES.map((course, i) => (
          <button
            key={course.id}
            onClick={() => setSelectedId(course.id)}
            className={`flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${i > 0 ? "border-t" : ""}`}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent font-mono text-[0.8125rem] font-bold text-accent-foreground">
              {course.pairs[0]?.[0]?.[0]?.toUpperCase() ?? "•"}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem] font-semibold">
                {course.title}
              </span>
              <span className="block truncate font-mono text-[0.8125rem] text-muted-foreground">
                {course.pairs
                  .slice(0, 3)
                  .map(([l, r]) => `${l}/${r}`)
                  .join(" · ")}
              </span>
            </span>
            <ChevronRight
              size={16}
              className="shrink-0 text-muted-foreground"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
