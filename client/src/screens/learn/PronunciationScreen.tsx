import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Mic, Square, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Panel, Eyebrow, Empty } from "@/components/Panel";
import { useApp } from "@/state/context";
import { dataRevision, pronunciationCourses } from "@/data";
import type { PronunciationCourse } from "@/data/types";
import { dt, asrLocale } from "@/lib/dialect";
import { recordSession, recordStudy } from "@/lib/engine";
import { scorePronunciation } from "@/lib/phonetics";
import { haptic } from "@/lib/haptics";
import { LEVEL_ORDER } from "@/lib/level";
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
  const startedAt = useRef(Date.now());
  // 코스를 나갈 때 이 코스에서 받은 점수를 세션 한 건으로 남긴다.
  // 화면이 사라진 뒤 update 를 부르므로 최신 점수를 ref 로 들고 있는다.
  const scoresRef = useRef<Record<number, number>>({});

  useEffect(() => {
    const started = startedAt.current;
    return () => {
      // 듣는 중에 화면을 벗어나면 마이크가 계속 열려 있다. 반드시 끈다.
      recognizer.current?.stop();
      const values = Object.values(scoresRef.current);
      if (values.length === 0) return;
      const seconds = Math.max(1, Math.round((Date.now() - started) / 1000));
      update(state => ({
        ...state,
        stats: recordSession(state.stats, {
          kind: "pronunciation",
          correct: values.filter(v => v >= 70).length,
          total: values.length,
          seconds,
        }),
      }));
    };
  }, [update]);

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
        setScores(prev => {
          const next = { ...prev, [index]: score };
          scoresRef.current = next;
          return next;
        });
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
  const { app } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 내 레벨을 앞으로 당긴다. 발음 탭만 레벨을 전혀 안 봐서, B1 사용자도
  // R/L 부터 순서대로 마주쳤다. 다른 학습 탭과 같은 규칙으로 맞춘다.
  const all = pronunciationCourses();
  const courses = useMemo(() => {
    const mine = LEVEL_ORDER.indexOf(app.profile.level);
    return [...all].sort(
      (a, b) =>
        Math.abs(LEVEL_ORDER.indexOf(a.level) - mine) -
        Math.abs(LEVEL_ORDER.indexOf(b.level) - mine)
    );
  }, [app.profile.level, dataRevision()]);

  const selected = selectedId ? all.find(c => c.id === selectedId) : null;
  if (selected)
    return (
      <CourseDetail course={selected} onBack={() => setSelectedId(null)} />
    );

  if (all.length === 0)
    return (
      <Empty title="코스 준비 중" text="발음 코스 콘텐츠를 준비하고 있어요." />
    );

  return (
    <div className="space-y-2.5">
      <Eyebrow className="text-muted-foreground">
        한국인이 어려워하는 소리 8가지
      </Eyebrow>
      <div className="overflow-hidden rounded-2xl border bg-card">
        {courses.map((course, i) => (
          <button
            key={course.id}
            onClick={() => setSelectedId(course.id)}
            className={`flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${i > 0 ? "border-t" : ""}`}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent font-mono text-[0.8125rem] font-bold text-accent-foreground">
              {course.pairs[0]?.[0]?.[0]?.toUpperCase() ?? "•"}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[0.9375rem] font-semibold">
                  {course.title}
                </span>
                <span className="shrink-0 font-mono text-[0.6875rem] font-bold text-muted-foreground">
                  {course.level}
                </span>
                {course.level === app.profile.level && (
                  <span className="shrink-0 rounded-full bg-primary/12 px-1.5 py-0.5 text-[0.6875rem] font-semibold text-primary">
                    추천
                  </span>
                )}
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
