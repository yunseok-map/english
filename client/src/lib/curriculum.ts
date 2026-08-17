import type { TopicId } from "@/data/types";
import { daysTo } from "@/lib/engine";

/**
 * 출국일 기반 커리큘럼.
 *
 * 지금까지 departureDate 는 헤더의 D-day 숫자에만 쓰였다.
 * 워홀 준비는 시점마다 급한 게 다르다 — 두 달 전엔 서류, 도착 직전엔
 * 공항·숙소, 도착 후엔 알바·은행이다. 남은 일수로 국면을 정하고
 * 그 국면의 주제를 오늘의 루트 앞으로 당긴다.
 */
export type Phase = {
  id: string;
  title: string;
  window: string;
  summary: string;
  topics: TopicId[];
};

const PHASES: Array<Phase & { from: number; to: number }> = [
  {
    id: "prep",
    from: 61,
    to: Number.POSITIVE_INFINITY,
    title: "준비기",
    window: "D-60 이전",
    summary:
      "비자·서류 영어와 기본 문장 틀을 다져요. 아직 시간이 있으니 기초를 넓게 봅니다.",
    topics: ["admin", "social", "phone"],
  },
  {
    id: "countdown",
    from: 31,
    to: 60,
    title: "카운트다운",
    window: "D-60 ~ D-31",
    summary:
      "숙소를 구하고 계좌를 여는 상황을 미리 굴려 봐요. 문의·예약 표현이 핵심입니다.",
    topics: ["housing", "bank", "admin"],
  },
  {
    id: "boarding",
    from: 8,
    to: 30,
    title: "출국 직전",
    window: "D-30 ~ D-8",
    summary:
      "공항·입국심사·교통을 몸에 붙여요. 이 시기 표현은 실수하면 바로 곤란해집니다.",
    topics: ["airport", "transport", "housing"],
  },
  {
    id: "landing",
    from: 1,
    to: 7,
    title: "도착 주간",
    window: "D-7 ~ D-1",
    summary: "도착 첫 주에 쓸 문장만 반복해요. 유심·장보기·길 묻기.",
    topics: ["airport", "shopping", "transport"],
  },
  {
    id: "settle",
    from: 0,
    to: 0,
    title: "정착기",
    window: "출국 이후",
    summary:
      "일과 생활이 중심이에요. 알바 지원·손님 응대·병원까지 실전으로 갑니다.",
    topics: ["work", "cafe", "health", "emergency"],
  },
];

export function currentPhase(departureDate: string): Phase {
  const days = daysTo(departureDate);
  const found = PHASES.find(p => days >= p.from && days <= p.to);
  return found ?? PHASES[PHASES.length - 1];
}

export function allPhases(): Phase[] {
  return PHASES.map(({ from: _from, to: _to, ...phase }) => phase);
}

/** 오늘 국면에서 우선할 주제인지. 루트 정렬 가중치로 쓴다. */
export function phaseTopicRank(topic: TopicId, departureDate: string) {
  const index = currentPhase(departureDate).topics.indexOf(topic);
  return index === -1 ? 99 : index;
}
