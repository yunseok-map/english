import type { Level } from "@/types";

/**
 * 상황 역할극 시나리오.
 *
 * 예전 "상황 역할극" 모드는 상황이 없었다. 상대가 늘 같은 첫 마디를 던지고
 * 어떤 자리인지 알 수 없으니 연습이 되지 않았다. 워홀에서 실제로 마주치는
 * 자리를 고르고, 그 자리의 상대가 먼저 말을 걸도록 한다.
 */
export type Scenario = {
  id: string;
  label: string;
  /** 상대가 누구인지 (LLM 프롬프트와 화면 안내에 함께 쓴다) */
  role: string;
  /** 상대의 첫 마디 */
  opener: string;
  /** 학습자가 쓸 만한 첫 대답 */
  hint: string;
  /** 이 자리에서 자주 쓰는 표현 */
  phrases: string[];
  /**
   * 상대가 이어 갈 말. 대화가 앞으로 나아가야 연습이 된다.
   * AI 키가 없을 때 lib/localChat 이 이 대본을 한 줄씩 진행시킨다.
   */
  beats: Beat[];
  level: Level;
};

/** 상대의 다음 말 한 줄과, 그때 학습자가 쓸 만한 대답 */
export type Beat = { say: string; hint: string };

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe-order",
    label: "카페 주문",
    role: "a barista at a busy Australian cafe",
    opener: "Hi there! What can I get for you today?",
    hint: "Can I get a flat white, please?",
    phrases: ["Can I get ~, please?", "For here or takeaway?", "Card, thanks."],
    beats: [
      {
        say: "Sure thing. Is that for here or takeaway?",
        hint: "Takeaway, please.",
      },
      {
        say: "No worries. Anything else with that?",
        hint: "No, that's all, thanks.",
      },
      {
        say: "That'll be six fifty. Card or cash?",
        hint: "Card, thanks.",
      },
      {
        say: "Beautiful. It'll be about five minutes — I'll call your name.",
        hint: "Thank you. I'll wait over there.",
      },
      {
        say: "Here you go. Have a good one!",
        hint: "Thanks a lot. You too!",
      },
    ],
    level: "A1",
  },
  {
    id: "share-house",
    label: "셰어하우스 문의",
    role: "a person renting out a room in a share house",
    opener: "Hi, thanks for messaging. Are you still looking for a room?",
    hint: "Yes, is the room still available?",
    phrases: [
      "Is the room still available?",
      "Are bills included?",
      "When can I move in?",
    ],
    beats: [
      {
        say: "Great. It's a single room, three hundred a week. Are bills included in what you're after?",
        hint: "Are bills included in the rent?",
      },
      {
        say: "Bills are on top, about twenty a week. When were you hoping to move in?",
        hint: "I'd like to move in next week if possible.",
      },
      {
        say: "That works. There are four of us here, all working. Do you work nearby?",
        hint: "Yes, I work at a cafe about ten minutes away.",
      },
      {
        say: "Perfect. Want to come and have a look this weekend?",
        hint: "Yes, please. What time suits you?",
      },
      {
        say: "Let's say Saturday at two. I'll send you the address.",
        hint: "Sounds good. See you on Saturday.",
      },
    ],
    level: "A2",
  },
  {
    id: "job-interview",
    label: "면접",
    role: "a cafe manager interviewing for a casual job",
    opener: "Thanks for coming in. Tell me a bit about yourself.",
    hint: "I'm from Korea and I've worked in a cafe for a year.",
    phrases: [
      "I have experience in ~",
      "I'm available on weekdays.",
      "I'm a quick learner.",
    ],
    beats: [
      {
        say: "Nice. Have you worked in a cafe before?",
        hint: "Yes, I worked in a cafe in Korea for a year.",
      },
      {
        say: "Good to hear. What days are you available?",
        hint: "I'm available on weekdays and weekends.",
      },
      {
        say: "We're busiest on weekends, so that helps. How's your English going?",
        hint: "It's not perfect yet, but I'm learning fast.",
      },
      {
        say: "No worries, you'll pick it up. Any questions for me?",
        hint: "Could I ask what the hourly rate is?",
      },
      {
        say: "It's twenty-eight an hour on weekdays. I'll call you tomorrow.",
        hint: "Thank you for your time. I look forward to hearing from you.",
      },
    ],
    level: "A2",
  },
  {
    id: "bank-tfn",
    label: "은행 계좌 개설",
    role: "a bank teller helping a working holiday maker open an account",
    opener: "Good morning. How can I help you today?",
    hint: "I'd like to open a bank account, please.",
    phrases: [
      "I'd like to open an account.",
      "Here's my passport and visa.",
      "How long does it take?",
    ],
    beats: [
      {
        say: "Of course. Do you have your passport and visa with you?",
        hint: "Yes, here's my passport.",
      },
      {
        say: "Thanks. And what's your address here in Australia?",
        hint: "I'm staying in a share house in Melbourne.",
      },
      {
        say: "All good. Do you have a Tax File Number yet?",
        hint: "Not yet. How do I apply for one?",
      },
      {
        say: "You can apply online — I'll write the website down for you.",
        hint: "Thank you. How long does the account take?",
      },
      {
        say: "The account is open now, and your card will arrive in a week.",
        hint: "Great, thank you very much for your help.",
      },
    ],
    level: "A2",
  },
  {
    id: "pharmacy",
    label: "약국·병원",
    role: "a pharmacist at a chemist",
    opener: "Hi, how can I help?",
    hint: "I have a sore throat. Do you have anything for it?",
    phrases: [
      "I have a sore throat.",
      "Do I need a prescription?",
      "How often should I take it?",
    ],
    beats: [
      {
        say: "Sorry to hear that. How long have you had it?",
        hint: "Since yesterday.",
      },
      {
        say: "Any fever or cough with it?",
        hint: "A little cough, but no fever.",
      },
      {
        say: "This one should help. Do you have any allergies?",
        hint: "No, I don't have any allergies.",
      },
      {
        say: "Take one every six hours, after food.",
        hint: "How many days should I take it?",
      },
      {
        say: "Three days. If it's not better, see a doctor. That's twelve dollars.",
        hint: "Okay, thank you. Card, please.",
      },
    ],
    level: "A1",
  },
  {
    id: "farm-work",
    label: "농장 일 구하기",
    role: "a farm supervisor hiring seasonal pickers",
    opener: "G'day. You're here about the picking job?",
    hint: "Yes, I saw the ad. Is the position still open?",
    phrases: [
      "Is the position still open?",
      "What time do we start?",
      "Is accommodation provided?",
    ],
    beats: [
      {
        say: "Good on ya. Have you done picking before?",
        hint: "No, but I learn quickly and I'm a hard worker.",
      },
      {
        say: "Fair enough. We start at six, finish around two. Is that alright?",
        hint: "Yes, that's fine. What time should I arrive?",
      },
      {
        say: "Be here at quarter to six. Do you have your own transport?",
        hint: "No, I don't. Is there a lift from town?",
      },
      {
        say: "There's a van that leaves the caravan park at half five.",
        hint: "Is accommodation provided?",
      },
      {
        say: "We've got rooms on site, one fifty a week. Start Monday?",
        hint: "Yes, I'll be there on Monday. Thank you!",
      },
    ],
    level: "B1",
  },
  {
    id: "complaint",
    label: "환불·교환",
    role: "a shop assistant handling a return",
    opener: "Hi, is there something wrong with it?",
    hint: "Yes, it stopped working after two days. Can I get a refund?",
    phrases: [
      "Can I get a refund?",
      "I have the receipt.",
      "It stopped working.",
    ],
    beats: [
      {
        say: "I'm sorry about that. Do you have the receipt with you?",
        hint: "Yes, here's the receipt.",
      },
      {
        say: "Thanks. When did you buy it?",
        hint: "I bought it last Friday.",
      },
      {
        say: "And would you like a refund or an exchange?",
        hint: "I'd prefer a refund, please.",
      },
      {
        say: "No problem. I'll need to put it back on the same card.",
        hint: "That's fine. Here's my card.",
      },
      {
        say: "All done — it'll take a few days to show up. Sorry again.",
        hint: "No worries. Thanks for sorting it out.",
      },
    ],
    level: "B1",
  },
  {
    id: "small-talk",
    label: "동료와 스몰토크",
    role: "a friendly Australian coworker on a lunch break",
    opener: "Hey! How's your day going so far?",
    hint: "Pretty good, thanks. A bit busy this morning.",
    phrases: ["How's it going?", "Not too bad.", "What about you?"],
    beats: [
      {
        say: "Yeah, mornings are always mad here. Did you get a break yet?",
        hint: "Not yet. I'm taking it after this.",
      },
      {
        say: "Fair enough. How long have you been in Australia?",
        hint: "About four months now.",
      },
      {
        say: "Oh nice. What do you miss most from home?",
        hint: "I really miss my mom's cooking.",
      },
      {
        say: "Ha, I get that. Doing anything on the weekend?",
        hint: "I'm going to the beach with my housemates.",
      },
      {
        say: "Sounds good. Right, back to it — catch you later!",
        hint: "See you later!",
      },
    ],
    level: "A2",
  },
];

export function scenarioById(id: string | null) {
  return SCENARIOS.find(s => s.id === id) ?? null;
}

/** 내 레벨에 가까운 순으로. 못 할 것부터 들이밀지 않는다. */
export function scenariosFor(level: Level) {
  const order: Level[] = ["A1", "A2", "B1"];
  const mine = order.indexOf(level);
  return [...SCENARIOS].sort(
    (a, b) =>
      Math.abs(order.indexOf(a.level) - mine) -
      Math.abs(order.indexOf(b.level) - mine)
  );
}
