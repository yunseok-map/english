import { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  RefreshCw,
  Settings2,
  Trash2,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Panel, Eyebrow, Empty } from "@/components/Panel";
import { useApp } from "@/state/context";
import {
  LEVEL_DESC,
  LEVEL_LABEL,
  LEVEL_ORDER,
  nextLevel,
  promotionProgress,
} from "@/lib/level";
import { daysTo } from "@/lib/engine";
import { PromotionTest } from "@/components/PromotionTest";
import { SessionTrend } from "@/components/SessionTrend";
import { currentPhase, allPhases } from "@/lib/curriculum";
import { speak } from "@/lib/speech";
import type { Level } from "@/types";

export function ProfileScreen({
  startRetest,
  openSettings,
}: {
  startRetest: () => void;
  openSettings: () => void;
}) {
  const { app, update } = useApp();
  const level = app.profile.level;
  const progress = useMemo(() => promotionProgress(app), [app]);
  const upcoming = nextLevel(level);
  const [testing, setTesting] = useState(false);
  const phase = useMemo(
    () => currentPhase(app.profile.departureDate),
    [app.profile.departureDate]
  );

  const promote = () => {
    if (!upcoming) return;
    update(state => ({
      ...state,
      profile: {
        ...state.profile,
        level: upcoming,
        levelHistory: [
          ...state.profile.levelHistory,
          {
            level: upcoming,
            at: new Date().toISOString(),
            source: "promotion",
          },
        ],
      },
    }));
    toast.success(`${upcoming} ${LEVEL_LABEL[upcoming]} 레벨로 올라갔어요!`);
    setTesting(false);
  };

  const avgPronunciation = app.stats.pronunciationScores.length
    ? Math.round(
        app.stats.pronunciationScores.reduce((a, b) => a + b, 0) /
          app.stats.pronunciationScores.length
      )
    : 0;
  const grammarAccuracy = app.stats.grammarTotal
    ? Math.round((app.stats.grammarCorrect / app.stats.grammarTotal) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div>
        <Eyebrow>MY PROGRESS</Eyebrow>
        <h1 className="mt-1 text-[1.375rem] font-bold tracking-tight">
          {app.profile.name}님의 훈련 기록
        </h1>
        <p className="mt-1 text-[0.875rem] text-muted-foreground">
          출국까지 {daysTo(app.profile.departureDate)}일 · 연속 학습{" "}
          {app.stats.streak}일
        </p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          [app.stats.learnedWords, "배운 단어"],
          [app.completedLessons.length, "완료 강의"],
          [`${grammarAccuracy}%`, "문법 정답률"],
          [avgPronunciation ? `${avgPronunciation}점` : "—", "평균 발음"],
        ].map(([value, label]) => (
          <Panel key={String(label)} className="py-4 text-center">
            <b className="block font-mono text-[1.5rem] font-semibold tabular-nums">
              {value}
            </b>
            <span className="text-[0.75rem] text-muted-foreground">
              {label}
            </span>
          </Panel>
        ))}
      </div>

      {/* 학습 추이 */}
      <SessionTrend sessions={app.stats.sessions} />

      {/* 출국 준비 로드맵 */}
      <Panel className="space-y-3">
        <Eyebrow className="text-muted-foreground">출국 준비 로드맵</Eyebrow>
        <div className="space-y-2">
          {allPhases().map(item => {
            const active = item.id === phase.id;
            return (
              <div
                key={item.id}
                className={`rounded-xl p-3 ${active ? "bg-accent/50" : ""}`}
              >
                <p className="flex flex-wrap items-center gap-x-2 text-[0.875rem] font-semibold">
                  {item.title}
                  <span className="font-mono text-[0.6875rem] font-medium text-muted-foreground">
                    {item.window}
                  </span>
                  {active && (
                    <span className="text-[0.6875rem] font-medium text-primary">
                      지금
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* 레벨 로드맵 */}
      <Panel className="space-y-4">
        <div className="flex items-center justify-between">
          <Eyebrow className="text-muted-foreground">레벨 로드맵</Eyebrow>
          <button
            onClick={startRetest}
            className="inline-flex min-h-9 items-center gap-1 text-[0.8125rem] font-semibold text-primary"
          >
            <RefreshCw size={13} /> 레벨 재테스트
          </button>
        </div>
        <div className="space-y-2.5">
          {LEVEL_ORDER.map((item: Level) => {
            const done = LEVEL_ORDER.indexOf(item) < LEVEL_ORDER.indexOf(level);
            const current = item === level;
            return (
              <div
                key={item}
                className={`flex gap-3 rounded-xl p-3 ${current ? "bg-accent/50" : ""}`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-[0.75rem] font-bold ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : current
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? <Check size={15} /> : item}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.9375rem] font-semibold">
                    {item} {LEVEL_LABEL[item]}
                    {current && (
                      <span className="ml-1.5 text-[0.75rem] font-medium text-primary">
                        현재
                      </span>
                    )}
                  </p>
                  <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {LEVEL_DESC[item]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {upcoming && (
          <div className="space-y-2.5 rounded-xl border p-3">
            <p className="text-[0.875rem] font-semibold">
              {upcoming} {LEVEL_LABEL[upcoming]}로 올라가려면
            </p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[0.75rem] text-muted-foreground">
                  <span>내 레벨 단어 숙련 (80% 필요)</span>
                  <span className="font-mono tabular-nums">
                    {progress.mastered}/{progress.wordTotal}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <i
                    className="block h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.min(100, progress.wordMastery * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[0.75rem] text-muted-foreground">
                  <span>내 레벨 문법 강의 완료</span>
                  <span className="font-mono tabular-nums">
                    {progress.lessonsDone}/{progress.lessonsTotal}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <i
                    className="block h-full rounded-full bg-primary"
                    style={{
                      width: `${progress.lessonsTotal ? (progress.lessonsDone / progress.lessonsTotal) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            {testing ? (
              <PromotionTest
                level={level}
                upcoming={upcoming}
                onPass={promote}
                onClose={() => setTesting(false)}
              />
            ) : progress.eligible ? (
              <Button className="w-full" onClick={() => setTesting(true)}>
                승급 테스트 보기 (5문항)
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-[0.75rem] text-muted-foreground">
                  두 조건을 모두 채우면 승급 테스트가 열려요. 지금 실력을
                  확인하고 싶다면 레벨 재테스트를 보셔도 됩니다.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setTesting(true)}
                >
                  그래도 승급 테스트 보기
                </Button>
              </div>
            )}
          </div>
        )}

        {app.profile.levelHistory.length > 0 && (
          <div className="space-y-1.5">
            <Eyebrow className="text-muted-foreground">레벨 기록</Eyebrow>
            {[...app.profile.levelHistory]
              .reverse()
              .slice(0, 5)
              .map((event, i) => (
                <p
                  key={i}
                  className="flex justify-between text-[0.8125rem] text-muted-foreground"
                >
                  <span>
                    {event.level} {LEVEL_LABEL[event.level]} ·{" "}
                    {event.source === "placement"
                      ? "레벨 테스트"
                      : event.source === "retest"
                        ? "재테스트"
                        : event.source === "promotion"
                          ? "승급"
                          : "이전 기록"}
                  </span>
                  <span className="font-mono">{event.at.slice(0, 10)}</span>
                </p>
              ))}
          </div>
        )}
      </Panel>

      {/* 저장 문장 */}
      <section className="space-y-2.5">
        <Eyebrow className="text-muted-foreground">
          내 문장장 {app.savedPhrases.length}
        </Eyebrow>
        {app.savedPhrases.length === 0 ? (
          <Empty
            title="아직 저장한 문장이 없어요"
            text="변환기나 회화팩에서 마음에 드는 문장을 저장해 보세요."
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-card">
            {app.savedPhrases.slice(0, 20).map((phrase, i) => (
              <div
                key={phrase.id}
                className={`flex items-center gap-2 px-4 py-3 ${i > 0 ? "border-t" : ""}`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.875rem] [overflow-wrap:anywhere]">
                    {phrase.en}
                  </span>
                  <span className="block truncate text-[0.75rem] text-muted-foreground">
                    {phrase.ko}
                  </span>
                </span>
                <button
                  onClick={() => speak(phrase.en, app.settings.rate)}
                  aria-label="문장 듣기"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                >
                  <Volume2 size={16} />
                </button>
                <button
                  onClick={() =>
                    update(state => ({
                      ...state,
                      savedPhrases: state.savedPhrases.filter(
                        p => p.id !== phrase.id
                      ),
                    }))
                  }
                  aria-label="삭제"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <button
        onClick={openSettings}
        className="flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-colors hover:border-ring"
      >
        <Settings2 size={18} className="text-muted-foreground" />
        <span className="flex-1 text-[0.9375rem] font-semibold">설정</span>
        <ChevronRight size={17} className="text-muted-foreground" />
      </button>
    </div>
  );
}
