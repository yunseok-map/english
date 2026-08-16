import { useMemo } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  CircleAlert,
  Headphones,
  MessagesSquare,
  Mic,
  Plane,
  RotateCcw,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { Panel, SectionTitle } from "@/components/Panel";
import { ProgressRing } from "@/components/Progress";
import { StreakStrip } from "@/components/StreakStrip";
import { Button } from "@/components/ui/button";
import { useApp } from "@/state/context";
import { buildDailyRoute, isTaskDone, type RouteTaskId } from "@/lib/route";
import { LEVEL_LABEL, nextLevel, promotionProgress } from "@/lib/level";
import { currentPhase } from "@/lib/curriculum";
import { daysTo, todayKey } from "@/lib/engine";
import { needsRetestBanner } from "@/state/migrate";
import { dt } from "@/lib/dialect";
import type { Screen } from "@/components/BottomNav";
import type { LearnSection } from "@/screens/learn/LearnScreen";

type Track = "word" | "review" | "grammar" | "talk" | "mistake";

type RouteItem = {
  task: RouteTaskId;
  track: Track;
  icon: typeof BookOpen;
  title: string;
  detail: string;
  section: LearnSection;
};

const TRACK_STYLE: Record<Track, { bg: string; fg: string }> = {
  word: { bg: "bg-[var(--track-word-soft)]", fg: "text-[var(--track-word)]" },
  review: {
    bg: "bg-[var(--track-review-soft)]",
    fg: "text-[var(--track-review)]",
  },
  grammar: {
    bg: "bg-[var(--track-grammar-soft)]",
    fg: "text-[var(--track-grammar)]",
  },
  talk: { bg: "bg-[var(--track-talk-soft)]", fg: "text-[var(--track-talk)]" },
  mistake: { bg: "bg-destructive/10", fg: "text-destructive" },
};

export function HomeScreen({
  openLearn,
  openScreen,
  startRetest,
}: {
  openLearn: (section: LearnSection) => void;
  openScreen: (screen: Screen) => void;
  startRetest: () => void;
}) {
  const { app, update } = useApp();
  const route = useMemo(() => buildDailyRoute(app), [app]);
  const level = app.profile.level;
  const dialect = app.settings.dialect;
  const phase = useMemo(
    () => currentPhase(app.profile.departureDate),
    [app.profile.departureDate]
  );
  const promotion = useMemo(() => promotionProgress(app), [app]);
  const upcoming = nextLevel(level);
  // 승급 제안은 하루에 한 번만. 매 진입마다 뜨면 잔소리가 된다.
  const showPromotion =
    promotion.eligible &&
    upcoming &&
    app.profile.promotionOfferedOn !== todayKey();

  const items: RouteItem[] = [
    {
      task: "words",
      track: "word",
      icon: Sparkles,
      title: `새 단어 ${route.newWords.length}개 외우기`,
      detail: route.newWords.length
        ? `${dt(route.newWords[0].word, dialect)} 부터 시작`
        : "오늘 배정을 모두 마쳤어요",
      section: "words",
    },
    {
      task: "review",
      track: "review",
      icon: RotateCcw,
      title: route.dueCount
        ? `복습 카드 ${route.dueCount}장`
        : "복습 대기 없음",
      detail: route.dueCount ? "잊어버리기 직전이에요" : "내일 다시 만나요",
      section: "words",
    },
    {
      task: "lesson",
      track: "grammar",
      icon: BookOpen,
      title: route.nextLesson ? route.nextLesson.title : "문법 강의 완주!",
      detail: route.nextLesson
        ? `${route.nextLesson.level} 강의 · 퀴즈 5문항`
        : "복습으로 다져 보세요",
      section: "grammar",
    },
    {
      task: "pack",
      track: "talk",
      icon: Headphones,
      title: route.pack ? route.pack.title : "회화팩",
      detail: route.pack ? route.pack.scene : "상황별 표현 익히기",
      section: "packs",
    },
  ];

  // 어제 틀린 게 있으면 오늘 루트 맨 앞에 끼워 넣는다.
  if (route.mistakes.length > 0) {
    items.unshift({
      task: "mistakes",
      track: "mistake",
      icon: CircleAlert,
      title: `틀렸던 ${route.mistakes.length}개 다시 보기`,
      detail: route.mistakes
        .slice(0, 3)
        .map(m => m.label)
        .join(" · "),
      section: "mistakes",
    });
  }

  // 말하기는 외운 단어가 쌓였을 때만 권한다.
  if (route.speaking.length >= 3) {
    items.push({
      task: "speak",
      track: "talk",
      icon: Mic,
      title: "소리 내어 말해 보기",
      detail: `${route.speaking.length}개 표현 · 발음 점수 확인`,
      section: "words",
    });
  }
  const doneCount = items.filter(item => isTaskDone(app, item.task)).length;
  const allDone = doneCount === items.length;

  const dismissBanner = () =>
    update(state => ({
      ...state,
      completedTasks: [...state.completedTasks, "dismiss-retest-banner"],
    }));

  return (
    <div className="space-y-5">
      {/* 오늘 진도 */}
      <Panel className="space-y-4">
        <div className="flex items-center gap-5">
          <div className="text-primary">
            <ProgressRing
              value={doneCount}
              total={items.length}
              size={92}
              stroke={9}
            >
              <b className="font-mono text-[1.5rem] font-bold leading-none tabular-nums text-foreground">
                {doneCount}
              </b>
              <span className="mt-0.5 text-[0.6875rem] text-muted-foreground">
                / {items.length}
              </span>
            </ProgressRing>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.8125rem] font-medium text-muted-foreground">
              {app.profile.name}님 ·{" "}
              <span className="text-primary">
                {level} {LEVEL_LABEL[level]}
              </span>
            </p>
            <h1 className="mt-1 whitespace-pre-line text-[1.25rem] font-bold leading-snug tracking-tight">
              {allDone
                ? "오늘 학습 완료!"
                : doneCount === 0
                  ? "오늘 학습을\n시작해 볼까요?"
                  : "조금만 더 하면 끝나요"}
            </h1>
            <p className="mt-1 text-[0.8125rem] text-muted-foreground">
              {allDone
                ? "내일 새 루트가 준비돼요."
                : `남은 할 일 ${items.length - doneCount}개`}
            </p>
          </div>
        </div>
        <div className="border-t pt-3.5">
          <StreakStrip
            studyDates={app.stats.studyDates}
            streak={app.stats.streak}
          />
        </div>
      </Panel>

      {/* 승급 제안 */}
      {showPromotion && (
        <Panel className="flex items-center gap-3 border-primary bg-accent/60">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <TrendingUp size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <strong className="text-[0.9375rem]">
              {upcoming} 레벨로 올라갈 준비가 됐어요
            </strong>
            <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">
              5문항만 확인하면 바로 넘어갈 수 있어요.
            </p>
          </div>
          <Button size="sm" onClick={() => openScreen("profile")}>
            확인
          </Button>
          <button
            onClick={() =>
              update(state => ({
                ...state,
                profile: { ...state.profile, promotionOfferedOn: todayKey() },
              }))
            }
            aria-label="나중에"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          >
            <X size={15} />
          </button>
        </Panel>
      )}

      {/* 출국 시점 커리큘럼 */}
      <Panel className="flex items-start gap-3.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--track-word-soft)] text-[var(--track-word)]">
          <Plane size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-2 text-[0.9375rem] font-semibold">
            {phase.title}
            <span className="font-mono text-[0.75rem] font-medium text-muted-foreground">
              {phase.window}
            </span>
          </p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
            {phase.summary}
          </p>
          <p className="mt-1.5 font-mono text-[0.75rem] text-primary">
            출국까지 {daysTo(app.profile.departureDate)}일
          </p>
        </div>
      </Panel>

      {/* 레벨 테스트 배너 */}
      {needsRetestBanner(app) && (
        <Panel className="flex items-center gap-3 border-primary/40 bg-accent/50">
          <div className="min-w-0 flex-1">
            <strong className="text-[0.9375rem]">레벨 테스트를 해보세요</strong>
            <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">
              7분이면 내 레벨에 맞는 루트가 만들어져요.
            </p>
          </div>
          <Button size="sm" onClick={startRetest}>
            시작
          </Button>
          <button
            onClick={dismissBanner}
            aria-label="배너 닫기"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          >
            <X size={15} />
          </button>
        </Panel>
      )}

      {/* 오늘의 루트 */}
      <section className="space-y-2.5">
        <SectionTitle aside={`${doneCount}/${items.length}`}>
          오늘의 학습
        </SectionTitle>
        <div className="space-y-2">
          {items.map(item => {
            const done = isTaskDone(app, item.task);
            const Icon = item.icon;
            const style = TRACK_STYLE[item.track];
            return (
              <button
                key={item.task}
                onClick={() => openLearn(item.section)}
                className="flex w-full items-center gap-3.5 rounded-2xl border bg-card p-3.5 text-left transition-all active:scale-[0.99]"
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : `${style.bg} ${style.fg}`
                  }`}
                >
                  {done ? (
                    <Check size={20} strokeWidth={2.6} />
                  ) : (
                    <Icon size={20} />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[0.9375rem] font-semibold ${done ? "text-muted-foreground line-through" : ""}`}
                  >
                    {item.title}
                  </span>
                  <span className="block truncate text-[0.8125rem] text-muted-foreground">
                    {item.detail}
                  </span>
                </span>
                <ChevronRight
                  size={17}
                  className="shrink-0 text-muted-foreground/60"
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* 기록 */}
      <section className="space-y-2.5">
        <SectionTitle>내 기록</SectionTitle>
        <div className="grid grid-cols-3 gap-2">
          {[
            [app.stats.learnedWords, "배운 단어"],
            [app.completedLessons.length, "완료 강의"],
            [app.savedPhrases.length, "저장 문장"],
          ].map(([value, label]) => (
            <div
              key={String(label)}
              className="rounded-2xl border bg-card py-3.5 text-center"
            >
              <b className="block font-mono text-[1.375rem] font-bold tabular-nums">
                {value}
              </b>
              <span className="text-[0.75rem] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 대화 바로가기 */}
      <button
        onClick={() => openScreen("chat")}
        className="flex w-full items-center gap-3.5 rounded-2xl border bg-card p-3.5 text-left transition-all active:scale-[0.99]"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--track-talk-soft)] text-[var(--track-talk)]">
          <MessagesSquare size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.9375rem] font-semibold">
            오늘 배운 표현으로 대화하기
          </span>
          <span className="block truncate text-[0.8125rem] text-muted-foreground">
            자유 대화 · 역할극 · 하루 일과
          </span>
        </span>
        <ChevronRight size={17} className="shrink-0 text-muted-foreground/60" />
      </button>
    </div>
  );
}
