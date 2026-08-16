import type { PlacementQuestion } from "@/data/types";

/**
 * 레벨 테스트 문항 풀 72개.
 *
 * 밴드(A1/A2/B1) × 영역(어휘/문법/활용) 아홉 칸에 8문항씩 고르게 넣었다.
 * 한 번 응시할 때는 여기서 36문항(칸마다 4개)을 뽑아 쓴다. 다 풀리면 재테스트가
 * 기억력 시험이 되므로 매번 다른 조합이 나오게 한 것이다.
 *
 * 칸마다 유형을 섞어 둔다 — 4지선다 5 · 직접입력 2 · 오류찾기 1.
 * 4지선다만 있으면 찍어서 25%가 그냥 들어오는데, 밴드당 12문항으로 레벨을 가르는
 * 마당에 그 정도 잡음이면 판정이 흔들린다. 추출기가 칸마다 직접입력을 반드시
 * 하나씩 끼워 넣으므로 한 회차에 최소 9문항은 찍을 수 없다.
 */
export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ─────────────────────────────────────────────
  // 어휘 (vocab) — 1차 작성분 A1 4 · A2 3 · B1 3
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
  // 문법 (grammar) — 1차 작성분 A1 3 · A2 4 · B1 3
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
  // 활용 (usage) — 1차 작성분 A1 3 · A2 3 · B1 4
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

  // ─────────────────────────────────────────────
  // 어휘 확장 — 칸마다 직접입력 2 · 오류찾기 1 · 4지선다 나머지
  // ─────────────────────────────────────────────
  {
    id: "pt-v11",
    band: "A1",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — Sorry, I don't have cash. Can I pay by ___?",
    accept: ["card", "credit card", "eftpos"],
    explain:
      "카드로 계산하겠다고 할 때는 pay by card라고 해요. 호주에서는 직불카드 결제를 뜻하는 EFTPOS라는 말도 아주 흔히 씁니다.",
  },
  {
    id: "pt-v12",
    band: "A1",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — The post office is ___ on Sundays, so let's go on Monday.",
    accept: ["closed", "shut"],
    explain:
      "문을 닫은 상태는 closed예요. close는 '닫다'라는 동작을 뜻하는 동사라, 상태를 말할 때는 closed를 씁니다.",
  },
  {
    id: "pt-v13",
    band: "A1",
    section: "vocab",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I want to / borrow / a money / from my friend.",
    options: ["I want to", "borrow", "a money", "from my friend"],
    answer: 2,
    explain:
      "money는 셀 수 없는 명사라 a를 붙이지 않아요. some money 또는 그냥 money라고 씁니다.",
  },
  {
    id: "pt-v14",
    band: "A1",
    section: "vocab",
    question: "'세탁기'를 뜻하는 단어는?",
    options: ["dishwasher", "washing machine", "dryer", "laundry"],
    answer: 1,
    explain:
      "옷을 빠는 기계는 washing machine이에요. dryer는 건조기, dishwasher는 식기세척기, laundry는 세탁물이나 세탁실을 뜻합니다.",
  },
  {
    id: "pt-v15",
    band: "A2",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — My manager sends out the ___ every Thursday so we know which days we're working next week.",
    accept: ["roster", "schedule", "rota"],
    explain:
      "근무표는 호주·영국에서 roster라고 불러요. 미국에서는 schedule을 더 많이 씁니다.",
  },
  {
    id: "pt-v16",
    band: "A2",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — I got a fine because I forgot to ___ on when I got on the tram.",
    accept: ["tap"],
    explain:
      "교통카드를 단말기에 대는 동작은 탈 때 tap on, 내릴 때 tap off예요. 내릴 때 tap off를 안 하면 최대 요금이 빠져나갑니다.",
  },
  {
    id: "pt-v17",
    band: "A2",
    section: "vocab",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I'd like to / do an appointment / with the doctor / this Friday.",
    options: [
      "I'd like to",
      "do an appointment",
      "with the doctor",
      "this Friday",
    ],
    answer: 1,
    explain:
      "예약을 잡는다고 할 때는 make an appointment 또는 book an appointment라고 해요. do an appointment는 쓰지 않습니다.",
  },
  {
    id: "pt-v18",
    band: "A2",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — My visa application is still being processed. I'm waiting for the ___.",
    options: ["income", "outcome", "outlook", "outline"],
    answer: 1,
    explain:
      "심사 결과는 outcome이에요. 호주 이민성 안내문에도 We will notify you of the outcome처럼 자주 나옵니다. income은 소득이라 뜻이 전혀 달라요.",
  },
  {
    id: "pt-v19",
    band: "A2",
    section: "vocab",
    question: "'유효기간이 지나 효력이 없어진'을 뜻하는 단어는?",
    options: ["out of order", "expired", "overdue", "sold out"],
    answer: 1,
    explain:
      "기한이 지나 못 쓰게 된 것은 expired예요. overdue는 기한을 넘겨 아직 내지 않은 것(연체), out of order는 기계가 고장 난 상태를 말합니다.",
  },
  {
    id: "pt-v20",
    band: "B1",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — My employer pays 11.5% of my wage into my ___ fund for retirement.",
    accept: ["super", "superannuation"],
    explain:
      "호주의 퇴직연금은 superannuation, 줄여서 super라고 해요. 워홀러도 쌓이고, 출국할 때 DASP로 신청해 돌려받을 수 있습니다.",
  },
  {
    id: "pt-v21",
    band: "B1",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — I'm a casual, so I get a 25% ___ on top of my base rate instead of paid leave.",
    hint: "호주 급여명세서에 나오는 용어예요.",
    accept: ["loading"],
    explain:
      "캐주얼 근로자가 유급휴가 대신 받는 할증분을 casual loading이라고 해요. 보통 기본 시급의 25%입니다.",
  },
  {
    id: "pt-v22",
    band: "B1",
    section: "vocab",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — The agent / will inspect the property / and then / refund back my bond.",
    options: [
      "The agent",
      "will inspect the property",
      "and then",
      "refund back my bond",
    ],
    answer: 3,
    explain:
      "refund 자체에 '돌려주다'라는 뜻이 들어 있어서 back을 붙이면 의미가 겹쳐요. refund my bond 또는 give my bond back이라고 씁니다.",
  },
  {
    id: "pt-v23",
    band: "B1",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — I'm doing my tax return, so I need the ___ from every employer I worked for this year.",
    options: ["payslip", "invoice", "income statement", "quotation"],
    answer: 2,
    explain:
      "호주에서 회계연도가 끝나면 고용주가 연간 소득·원천징수 내역을 income statement(옛 명칭 payment summary)로 확정해 줘요. payslip은 급여를 받을 때마다 나오는 명세서라 세금 신고에는 부족합니다.",
  },
  {
    id: "pt-v24",
    band: "B1",
    section: "vocab",
    question: "'집주인이 세입자에게 집을 비워 달라고 미리 통보하는 것'은?",
    options: [
      "notice to vacate",
      "break lease",
      "final inspection",
      "condition report",
    ],
    answer: 0,
    explain:
      "임대인이 퇴거를 통보하는 문서는 notice to vacate예요. break lease는 반대로 세입자가 계약 기간을 채우지 않고 먼저 나가는 것을 말합니다.",
  },

  // ─────────────────────────────────────────────
  // 문법 확장
  // ─────────────────────────────────────────────
  {
    id: "pt-g11",
    band: "A1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — There ___ two bathrooms in this share house.",
    accept: ["are"],
    explain:
      "There 뒤의 be동사는 그 뒤에 오는 명사에 맞춰요. two bathrooms가 복수라 are를 씁니다. 하나면 There is입니다.",
  },
  {
    id: "pt-g12",
    band: "A1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — I work at a cafe, but my housemate ___ at a farm.",
    accept: ["works"],
    explain:
      "주어 my housemate가 3인칭 단수라 현재형 동사에 -s를 붙여 works가 돼요.",
  },
  {
    id: "pt-g13",
    band: "A1",
    section: "grammar",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — She don't / have / a driver's licence, / so I drive.",
    options: ["She don't", "have", "a driver's licence,", "so I drive"],
    answer: 0,
    explain:
      "주어가 She(3인칭 단수)라 doesn't를 써야 해요. don't는 I·you·we·they에 씁니다.",
  },
  {
    id: "pt-g14",
    band: "A1",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — ___ does your shift start? — At 7am.",
    options: ["What time", "How long", "How many", "How often"],
    answer: 0,
    explain:
      "몇 시인지 물을 때는 What time을 써요. How long은 얼마나 오래(기간), How often은 얼마나 자주를 묻습니다.",
  },
  {
    id: "pt-g15",
    band: "A1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — There isn't ___ milk left. Can you buy some?",
    options: ["some", "many", "any", "a"],
    answer: 2,
    explain:
      "부정문에서는 some 대신 any를 써요. milk는 셀 수 없는 명사라 many나 a도 붙일 수 없습니다.",
  },
  {
    id: "pt-g16",
    band: "A2",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — I've been in Melbourne ___ March, and I still love it.",
    accept: ["since"],
    explain:
      "현재완료에서 시작 시점을 말할 땐 since(3월부터), 기간의 길이를 말할 땐 for(두 달 동안)를 써요.",
  },
  {
    id: "pt-g17",
    band: "A2",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — The manager asked me ___ come in an hour earlier.",
    accept: ["to"],
    explain:
      "ask + 사람 + to + 동사원형 형태예요. asked me come처럼 to를 빼면 문장이 성립하지 않습니다.",
  },
  {
    id: "pt-g18",
    band: "A2",
    section: "grammar",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I'm looking forward / to meet / my new housemates / this weekend.",
    options: [
      "I'm looking forward",
      "to meet",
      "my new housemates",
      "this weekend",
    ],
    answer: 1,
    explain:
      "look forward to의 to는 전치사라 뒤에 동명사가 와요. to meeting이 맞습니다. 같은 이유로 be used to -ing도 -ing를 씁니다.",
  },
  {
    id: "pt-g19",
    band: "A2",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — I was cooking dinner ___ the smoke alarm went off.",
    options: ["while", "when", "during", "since"],
    answer: 1,
    explain:
      "진행 중이던 일 도중에 갑자기 벌어진 일은 when으로 이어요. during 뒤에는 명사만 오고, while 뒤에는 보통 진행형 문장이 옵니다.",
  },
  {
    id: "pt-g20",
    band: "B1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — The house ___ I'm staying in is only ten minutes from the beach.",
    accept: ["that", "which"],
    explain:
      "사물을 꾸미는 관계대명사는 that이나 which를 써요. 사람이라면 who를 씁니다.",
  },
  {
    id: "pt-g21",
    band: "B1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — If I ___ known about the 88 days rule earlier, I would have started in January.",
    accept: ["had"],
    explain:
      "이미 지나간 일을 두고 '그랬더라면' 하고 가정할 때는 「If + had p.p., would have p.p.」를 써요.",
  },
  {
    id: "pt-g22",
    band: "B1",
    section: "grammar",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — Despite of / the heavy rain, / the farm work / went ahead as planned.",
    options: [
      "Despite of",
      "the heavy rain,",
      "the farm work",
      "went ahead as planned",
    ],
    answer: 0,
    explain:
      "despite 뒤에는 of 없이 바로 명사가 와요. of가 필요한 쪽은 in spite of라서 둘을 섞어 쓰지 않도록 주의하세요.",
  },
  {
    id: "pt-g23",
    band: "B1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — By the time my visa expires, I ___ here for two years.",
    options: ["will live", "have lived", "will have lived", "am living"],
    answer: 2,
    explain:
      "미래의 어느 시점까지 채워질 기간은 미래완료 will have p.p.로 써요. By the time ~ 절과 짝을 이뤄 자주 나옵니다.",
  },
  {
    id: "pt-g24",
    band: "B1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — I'd rather ___ overtime than work another weekend.",
    options: ["to do", "doing", "do", "did"],
    answer: 2,
    explain:
      "would rather 뒤에는 to 없이 동사원형이 와요. than 뒤도 마찬가지로 원형(work)을 씁니다.",
  },

  // ─────────────────────────────────────────────
  // 활용 확장
  // ─────────────────────────────────────────────
  {
    id: "pt-u11",
    band: "A1",
    section: "usage",
    kind: "fill",
    question:
      "카페 직원이 매장에서 먹을지 포장할지 묻습니다. 빈칸을 채우세요. — Is that eat in or ___?",
    accept: ["takeaway", "take away", "to go", "takeout"],
    explain:
      "포장은 호주·영국에서 takeaway, 미국에서 to go나 takeout이라고 해요. 반대로 매장에서 먹는 것은 eat in 또는 for here입니다.",
  },
  {
    id: "pt-u12",
    band: "A1",
    section: "usage",
    kind: "fill",
    question:
      "메뉴를 아직 못 골랐을 때 종업원에게 시간을 조금 더 달라고 합니다. 빈칸에 들어갈 한 단어를 쓰세요. — Could I have a few more ___, please?",
    accept: ["minutes"],
    explain:
      "잠깐 더 달라고 할 때는 a few more minutes라고 해요. a few 뒤에는 셀 수 있는 명사의 복수형이 옵니다.",
  },
  {
    id: "pt-u13",
    band: "A1",
    section: "usage",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — Can I / have / two coffee / to go, please?",
    options: ["Can I", "have", "two coffee", "to go, please"],
    answer: 2,
    explain:
      "커피를 잔 단위로 셀 때는 복수형 two coffees를 써요. 카페에서는 이렇게 세는 것이 자연스럽습니다.",
  },
  {
    id: "pt-u14",
    band: "A1",
    section: "usage",
    question:
      '슈퍼마켓 계산대에서 직원이 "Do you need a bag?"이라고 물었어요. 필요 없을 때 가장 자연스러운 대답은?',
    options: [
      "No, I'm fine, thanks.",
      "No, I don't need.",
      "No, it's okay for me.",
      "I have no bag.",
    ],
    answer: 0,
    explain:
      "필요 없다고 할 때는 No, I'm fine, thanks.가 가장 자연스러워요. I don't need.처럼 목적어 없이 끝내면 문장이 어색하게 들립니다.",
  },
  {
    id: "pt-u15",
    band: "A1",
    section: "usage",
    question:
      "셰어하우스를 보러 갔더니 언제 들어올 수 있냐고 묻습니다. 다음 주 월요일부터 가능할 때 가장 자연스러운 답은?",
    options: [
      "I can move in from next Monday.",
      "I can move next Monday to here.",
      "From next Monday I am possible.",
      "Next Monday is my moving.",
    ],
    answer: 0,
    explain:
      "이사 들어가는 것은 move in이에요. I am possible.은 '나는 가능하다'는 뜻이 되지 않아서 쓰지 않습니다.",
  },
  {
    id: "pt-u16",
    band: "A2",
    section: "usage",
    kind: "fill",
    question:
      "동료에게 금요일 근무를 서로 바꾸자고 부탁합니다. 빈칸에 들어갈 한 단어를 쓰세요. — Would you mind ___ shifts with me on Friday?",
    accept: ["swapping", "switching", "changing", "swopping"],
    explain:
      "Would you mind 뒤에는 동명사(-ing)가 와요. 근무를 맞바꾸는 것은 swap shifts라고 합니다.",
  },
  {
    id: "pt-u17",
    band: "A2",
    section: "usage",
    kind: "fill",
    question:
      "병원에 전화해 가장 빠른 예약 날짜를 묻습니다. 빈칸에 들어갈 한 단어를 쓰세요. — When's the ___ appointment you have?",
    accept: ["earliest", "soonest"],
    explain:
      "가장 이른 것은 최상급 earliest를 써요. the + 최상급 + 명사 형태입니다.",
  },
  {
    id: "pt-u18",
    band: "A2",
    section: "usage",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I called the bank / for ask / about my account, / but nobody answered.",
    options: [
      "I called the bank",
      "for ask",
      "about my account,",
      "but nobody answered",
    ],
    answer: 1,
    explain:
      "무엇을 하려고 했는지(목적)를 말할 때는 to + 동사원형, 즉 to ask를 써요. for 뒤에는 동사원형이 올 수 없습니다.",
  },
  {
    id: "pt-u19",
    band: "A2",
    section: "usage",
    question:
      "룸메이트가 새벽 2시에 음악을 크게 틀었어요. 다투지 않고 부탁하는 가장 자연스러운 말은?",
    options: [
      "Turn off the music. I'm sleeping.",
      "Your music is too loud. It's a problem.",
      "Hey, sorry to bother you — could you turn it down a bit? I've got an early shift.",
      "Why are you playing music at 2am?",
    ],
    answer: 2,
    explain:
      "sorry to bother you로 부드럽게 시작하고 이유를 덧붙이면 부탁이 훨씬 잘 받아들여져요. 소리를 줄여 달라는 말은 turn it down입니다.",
  },
  {
    id: "pt-u20",
    band: "A2",
    section: "usage",
    question:
      '면접에서 "When can you start?"라고 물었어요. 지금 일하는 곳을 아직 정리하지 못했을 때 가장 적절한 답은?',
    options: [
      "I can start whenever you want.",
      "I could start next week, but I need to give my current job one week's notice.",
      "I don't know. Maybe soon.",
      "After I finish my other job, I will contact you.",
    ],
    answer: 1,
    explain:
      "가능한 시점을 먼저 말하고 조건을 덧붙이면 믿음이 갑니다. give notice는 지금 일하는 곳에 퇴사를 미리 알리는 것을 뜻해요.",
  },
  {
    id: "pt-u21",
    band: "B1",
    section: "usage",
    kind: "fill",
    question:
      "집을 보러 가서 계약 조건을 되짚어 확인합니다. 빈칸에 들어갈 한 단어를 쓰세요. — Just to ___, the rent includes water but not electricity, right?",
    accept: ["confirm", "clarify", "check"],
    explain:
      "확인차 다시 짚을 때는 Just to confirm 또는 Just to clarify로 시작해요. 상대를 의심하는 느낌 없이 조건을 되물을 수 있습니다.",
  },
  {
    id: "pt-u22",
    band: "B1",
    section: "usage",
    kind: "fill",
    question:
      "급여가 하루 늦어져 곤란하지만 재촉처럼 들리지 않게 말하려 합니다. 빈칸에 들어갈 한 단어를 쓰세요. — I don't want to make a fuss, but rent is due tomorrow, so it'd be a big ___ if it could go through today.",
    accept: ["help"],
    explain:
      "it'd be a big help은 '큰 도움이 되겠다'는 뜻으로, 요구를 부탁처럼 부드럽게 바꿔 주는 표현이에요.",
  },
  {
    id: "pt-u23",
    band: "B1",
    section: "usage",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I'm writing to enquire / about the room / you advertised / in Gumtree.",
    options: [
      "I'm writing to enquire",
      "about the room",
      "you advertised",
      "in Gumtree",
    ],
    answer: 3,
    explain:
      "웹사이트나 온라인 게시판에 올라온 광고는 on Gumtree처럼 on을 써요. in은 신문·잡지 지면 안을 가리킬 때 씁니다.",
  },
  {
    id: "pt-u24",
    band: "B1",
    section: "usage",
    question:
      "근무 중 손을 데었는데 매니저가 대수롭지 않게 넘기려 합니다. 기록을 남겨 달라고 요청하는 가장 적절한 말은?",
    options: [
      "You have to report this. It's the law.",
      "I'm okay, don't worry about it.",
      "Could we put it in the incident report, just in case it gets worse later?",
      "I want to see a doctor now. Call an ambulance.",
    ],
    answer: 2,
    explain:
      "업무 중 사고는 incident report에 남겨야 나중에 치료비·산재 처리가 됩니다. just in case ~로 이유를 붙이면 상대를 몰아세우지 않으면서 필요한 절차를 요청할 수 있어요.",
  },
];
