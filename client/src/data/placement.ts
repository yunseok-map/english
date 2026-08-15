import type { PlacementQuestion } from "@/data/types";

/**
 * 레벨 테스트 30문항. 어휘·문법·활용 각 10문항.
 * 밴드 분포(채점 루브릭이 읽는 값): A1 10 / A2 10 / B1 10.
 *  - vocab   A1 4 · A2 3 · B1 3
 *  - grammar A1 3 · A2 4 · B1 3
 *  - usage   A1 3 · A2 3 · B1 4
 * 각 영역 안에서는 쉬운 문항부터 배치한다.
 */
export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ─────────────────────────────────────────────
  // 어휘 (vocab) — A1 4 · A2 3 · B1 3
  // ─────────────────────────────────────────────
  {
    id: "pt-v01",
    band: "A1",
    section: "vocab",
    question: "'영수증'을 뜻하는 단어는?",
    options: ["recipe", "receipt", "reception", "refund"],
    answer: 1,
    explain:
      "결제 후 받는 영수증은 receipt예요. recipe는 요리 조리법, reception은 안내 데스크라 뜻이 전혀 달라요.",
  },
  {
    id: "pt-v02",
    band: "A1",
    section: "vocab",
    question: "공항에 도착해 부친 짐을 찾으려 합니다. 따라가야 할 표지판은?",
    options: ["Departures", "Check-in", "Baggage Claim", "Boarding Gate"],
    answer: 2,
    explain:
      "부친 짐을 찾는 곳은 Baggage Claim이에요. Check-in은 짐을 부치는 곳, Departures는 출국장이에요.",
  },
  {
    id: "pt-v03",
    band: "A1",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — Sorry, our card machine is down. Do you have ___?",
    options: ["cash", "change", "coins", "a bill"],
    answer: 0,
    explain:
      "카드가 안 될 때 묻는 '현금'은 cash예요. change는 거스름돈, bill은 지폐 또는 청구서를 뜻해요.",
  },
  {
    id: "pt-v04",
    band: "A1",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — Excuse me, where can I buy a ___ for the train?",
    options: ["receipt", "license", "form", "ticket"],
    answer: 3,
    explain:
      "교통편을 타기 위해 사는 표는 ticket이에요. form은 작성하는 서류 양식이라 여기엔 맞지 않아요.",
  },
  {
    id: "pt-v05",
    band: "A2",
    section: "vocab",
    question:
      "'보증금'을 뜻하는 단어는? (셰어하우스에 들어갈 때 맡겼다가 나올 때 돌려받는 돈)",
    options: ["deposit", "discount", "donation", "installment"],
    answer: 0,
    explain:
      "계약할 때 맡기는 보증금은 deposit이에요. 호주에서는 같은 뜻으로 bond라는 말도 아주 흔히 씁니다.",
  },
  {
    id: "pt-v06",
    band: "A2",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — These shoes are too small. Can I get a ___?",
    options: ["receipt", "reward", "reservation", "refund"],
    answer: 3,
    explain:
      "물건을 돌려주고 돈을 되받는 '환불'은 refund예요. 사이즈만 바꾸는 교환은 exchange라고 합니다.",
  },
  {
    id: "pt-v07",
    band: "A2",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — I can't come in tomorrow. Can anyone cover my ___?",
    options: ["turn", "shift", "session", "period"],
    answer: 1,
    explain:
      "정해진 근무 시간대는 shift이고, cover someone's shift는 '대신 근무해 주다'라는 뜻이에요.",
  },
  {
    id: "pt-v08",
    band: "B1",
    section: "vocab",
    question:
      "'그만두겠다고 알린 뒤 실제로 마지막 근무일까지 지켜야 하는 예고 기간'을 뜻하는 표현은?",
    options: [
      "grace period",
      "probation period",
      "notice period",
      "trial shift",
    ],
    answer: 2,
    explain:
      "퇴사·퇴실을 통보하고 실제로 나가기까지의 예고 기간은 notice period예요. probation period는 입사 후 수습 기간이라 뜻이 다릅니다.",
  },
  {
    id: "pt-v09",
    band: "B1",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — Keep the taxi receipt and the office will process your ___.",
    options: ["refund", "discount", "compensation", "reimbursement"],
    answer: 3,
    explain:
      "업무 때문에 내 돈으로 먼저 쓴 비용을 회사가 되돌려 주는 것은 reimbursement예요. refund는 산 물건을 반품하고 받는 환불이라 상황이 달라요.",
  },
  {
    id: "pt-v10",
    band: "B1",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — You have to complete 88 days of regional work to be ___ for a second-year visa.",
    options: ["available", "eligible", "capable", "responsible"],
    answer: 1,
    explain:
      "be eligible for는 '자격 요건을 갖추다'라는 뜻이에요. capable은 능력이 있다는 뜻이라 비자 조건에는 쓰지 않아요.",
  },

  // ─────────────────────────────────────────────
  // 문법 (grammar) — A1 3 · A2 4 · B1 3
  // ─────────────────────────────────────────────
  {
    id: "pt-g01",
    band: "A1",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — My housemates ___ from Taiwan.",
    options: ["is", "am", "are", "be"],
    answer: 2,
    explain:
      "주어 My housemates가 복수라서 be동사는 are를 써요. 주어가 하나면 is, I면 am입니다.",
  },
  {
    id: "pt-g02",
    band: "A1",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — The airport bus ___ every 20 minutes.",
    options: ["leave", "leaves", "leaving", "is leave"],
    answer: 1,
    explain:
      "시간표처럼 반복되는 일은 현재시제로 쓰고, 주어 The airport bus가 3인칭 단수라 leaves가 돼요.",
  },
  {
    id: "pt-g03",
    band: "A1",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — ___ I have a flat white to go, please?",
    options: ["Do", "Am", "Can", "Have"],
    answer: 2,
    explain:
      "카페에서 주문하거나 무언가를 요청할 때는 Can I have ~?를 써요. please를 붙이면 더 공손해집니다.",
  },
  {
    id: "pt-g04",
    band: "A2",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — I ___ my TFN application last Monday.",
    options: ["submit", "submitted", "have submitted", "am submitting"],
    answer: 1,
    explain:
      "last Monday처럼 이미 끝난 과거 시점이 있으면 과거형 submitted를 써요. 현재완료는 구체적인 과거 시점과 함께 쓰지 않습니다.",
  },
  {
    id: "pt-g05",
    band: "A2",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — You ___ wear closed shoes in the kitchen. It's a safety rule.",
    options: ["have to", "would like to", "used to", "are able to"],
    answer: 0,
    explain:
      "규칙 때문에 반드시 해야 하는 일은 have to로 나타내요. would like to는 '하고 싶다', used to는 '예전엔 그랬다'는 뜻입니다.",
  },
  {
    id: "pt-g06",
    band: "A2",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — A weekly pass is ___ than buying a ticket every day.",
    options: ["cheap", "cheapest", "more cheap", "cheaper"],
    answer: 3,
    explain:
      "than 앞에는 비교급이 와야 하고, cheap처럼 짧은 형용사는 -er을 붙여 cheaper로 만들어요. more cheap은 쓰지 않습니다.",
  },
  {
    id: "pt-g07",
    band: "A2",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — A: Your rent was due yesterday. B: Oh, I totally forgot. I ___ it tonight.",
    options: ["am transferring", "will transfer", "transfer", "transferred"],
    answer: 1,
    explain:
      "말하는 순간에 즉흥적으로 정한 일은 will을 써요. 미리 정해 둔 계획이라면 be going to나 현재진행형을 씁니다.",
  },
  {
    id: "pt-g08",
    band: "B1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — I ___ in Sydney for two months, and I still haven't found a share house.",
    options: ["have been", "was", "am", "had been"],
    answer: 0,
    explain:
      "과거에 시작해 지금까지 이어지는 기간은 현재완료 have been + for로 나타내요. was는 지금은 끝난 과거의 일에 씁니다.",
  },
  {
    id: "pt-g09",
    band: "B1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — If I ___ a car, I wouldn't have to catch two buses to work.",
    options: ["have", "will have", "would have", "had"],
    answer: 3,
    explain:
      "지금 사실과 다른 상황을 가정할 때는 「If + 주어 + 과거형, 주어 + would + 동사원형」을 써요. 차가 없는 현재 상황을 아쉬워하는 문장입니다.",
  },
  {
    id: "pt-g10",
    band: "B1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — Your bond ___ back within 10 business days of the final inspection.",
    options: ["will pay", "is paying", "will be paid", "will be paying"],
    answer: 2,
    explain:
      "보증금은 돈을 주는 주체가 아니라 돌려받는 대상이라 수동태 will be paid를 써요. will pay를 쓰면 보증금이 돈을 지급한다는 뜻이 됩니다.",
  },

  // ─────────────────────────────────────────────
  // 활용 (usage) — A1 3 · A2 3 · B1 4
  // ─────────────────────────────────────────────
  {
    id: "pt-u01",
    band: "A1",
    section: "usage",
    question:
      '카페에서 커피를 건네자 손님이 "Thanks a lot!"이라고 했어요. 가장 자연스러운 대답은?',
    options: [
      "No worries.",
      "Yes, please.",
      "Never mind.",
      "I'm fine, thank you.",
    ],
    answer: 0,
    explain:
      "No worries.는 호주에서 You're welcome. 대신 아주 흔히 쓰는 응답이에요. Never mind.는 '신경 쓰지 마'라는 뜻이라 감사 인사에 대한 답이 될 수 없어요.",
  },
  {
    id: "pt-u02",
    band: "A1",
    section: "usage",
    question:
      "길에서 기차역을 찾고 있어요. 모르는 사람에게 말을 걸 때 가장 자연스러운 첫마디는?",
    options: [
      "Hello, train station where?",
      "Excuse me, how do I get to the train station?",
      "I want to go train station, please.",
      "Please teach me the train station.",
    ],
    answer: 1,
    explain:
      "모르는 사람에게는 Excuse me로 말을 걸고 완전한 의문문으로 물어봐요. teach는 '지식을 가르치다'라는 뜻이라 길을 물을 때는 쓰지 않습니다.",
  },
  {
    id: "pt-u03",
    band: "A1",
    section: "usage",
    question: "약국에서 두통약을 사려고 해요. 가장 자연스러운 표현은?",
    options: [
      "My head is sick. I need medicine.",
      "Where do I sell headache medicine?",
      "Do you have anything for a headache?",
      "I am a headache. Give me pills.",
    ],
    answer: 2,
    explain:
      "증상을 말하고 Do you have anything for ~?로 물으면 약사가 알맞은 약을 추천해 줘요. 약 이름을 몰라도 쓸 수 있는 표현입니다.",
  },
  {
    id: "pt-u04",
    band: "A2",
    section: "usage",
    question:
      '카페 매니저가 "Can you work this Saturday?"라고 물었어요. 못 나갈 때 가장 자연스러운 대답은?',
    options: [
      "No. I have a plan on Saturday.",
      "I don't want to work on Saturday.",
      "Maybe no. I will think about it.",
      "Sorry, I can't — I already have plans on Saturday.",
    ],
    answer: 3,
    explain:
      "거절할 때는 Sorry, I can't로 먼저 양해를 구하고 이유를 덧붙여요. '약속이 있다'는 a plan이 아니라 복수형 plans로 씁니다.",
  },
  {
    id: "pt-u05",
    band: "A2",
    section: "usage",
    question:
      "은행에서 계좌를 열려는데 어떤 서류가 필요한지 물어보고 싶어요. 가장 자연스러운 표현은?",
    options: [
      "What documents do I need to open an account?",
      "What documents do I need for open an account?",
      "Which paper do I need to make an account?",
      "I want to know what documents do I need.",
    ],
    answer: 0,
    explain:
      "need to + 동사원형이 맞는 형태이고, 계좌를 만드는 것은 make가 아니라 open an account라고 해요.",
  },
  {
    id: "pt-u06",
    band: "A2",
    section: "usage",
    question:
      "매니저가 너무 빨리 설명해서 못 알아들었어요. 다시 말해 달라고 부탁하는 가장 자연스러운 표현은?",
    options: [
      "Sorry, could you say that again a bit more slowly?",
      "I don't understand. Speak slowly.",
      "One more time, please. My English is bad.",
      "What? Again.",
    ],
    answer: 0,
    explain:
      "Sorry, could you ~?로 부탁하면 정중하게 들려요. 명령문으로 Speak slowly.라고 하거나 What?만 던지면 무뚝뚝하게 들립니다.",
  },
  {
    id: "pt-u07",
    band: "B1",
    section: "usage",
    question:
      "셰어하우스를 보러 가서 집세에 공과금이 포함되는지 물어보려 해요. 가장 정중하고 자연스러운 표현은?",
    options: [
      "Can I ask are the bills included in the rent?",
      "I want to know is the bills included or not?",
      "The bills are included in the rent, right?",
      "Can I ask whether the bills are included in the rent?",
    ],
    answer: 3,
    explain:
      '간접의문문은 whether/if 뒤에 「주어 + 동사」의 평서문 어순이 와요. "~, right?"처럼 단정하듯 확인하면 처음 만난 자리에서는 다소 무례하게 들릴 수 있어요.',
  },
  {
    id: "pt-u08",
    band: "B1",
    section: "usage",
    question:
      "2주 뒤에 카페 일을 그만두려고 매니저에게 알리려 해요. 가장 적절한 표현은?",
    options: [
      "I quit. Today is my last day.",
      "I don't want to work here anymore, sorry.",
      "I'd like to give my two weeks' notice — my last day would be the 30th.",
      "I'm going to stop working from tomorrow.",
    ],
    answer: 2,
    explain:
      "give (my) notice는 정해진 예고 기간을 두고 퇴사를 알리는 정식 표현이에요. 마지막 근무일까지 함께 말해 주면 인수인계가 깔끔합니다.",
  },
  {
    id: "pt-u09",
    band: "B1",
    section: "usage",
    question:
      "급여 명세서에 토요일 근무가 빠져 있어요. 매니저를 탓하지 않으면서 확인을 요청하는 가장 자연스러운 말은?",
    options: [
      "You didn't pay me for Saturday. That's a mistake.",
      "I think there might be a mistake on my payslip — I was rostered on Saturday but it's not showing.",
      "Why is my pay wrong again this week?",
      "My payslip is wrong. Please fix it before Friday.",
    ],
    answer: 1,
    explain:
      "I think there might be ~로 완곡하게 말하면 상대를 탓하지 않으면서 확인을 요청할 수 있어요. 단정적인 표현은 직장에서 불필요한 갈등을 만들 수 있습니다.",
  },
  {
    id: "pt-u10",
    band: "B1",
    section: "usage",
    question:
      '입국 심사관이 "What\'s the purpose of your visit?"이라고 물었어요. 워킹홀리데이 비자로 왔을 때 가장 적절한 답은?',
    options: [
      "I came here to make money.",
      "Just sightseeing, sir.",
      "I will work in Australia for one year.",
      "I'm here on a working holiday visa — I'll be traveling and doing some casual work.",
    ],
    answer: 3,
    explain:
      "비자 종류를 먼저 밝히고 여행과 단기 근무를 함께 언급하는 것이 가장 정확해요. 돈벌이만 강조하거나 사실과 다르게 말하면 추가 심사를 받을 수 있어요.",
  },
];
