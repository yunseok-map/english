import type { PlacementQuestion } from "@/data/types";

/**
 * 레벨 테스트 문항 풀 108개.
 *
 * 밴드(A1/A2/B1) × 영역(어휘/문법/활용) 아홉 칸에 12문항씩 고르게 넣었다.
 * 한 번 응시할 때는 여기서 36문항(칸마다 4개)만 뽑는다. 풀을 다 내면 재테스트가
 * 기억력 시험이 되고, 직전 회차 문항을 빼고도 뽑으려면 여유가 필요하다.
 *
 * 칸마다 유형을 섞어 둔다 — 4지선다 7 · 직접입력 3 · 오류찾기 2.
 * 추출기가 칸마다 직접입력 1 · 오류찾기 1 을 먼저 확보하므로, 한 회차에는 늘
 * 찍을 수 없는 문항 9개와 문장을 뜯어 봐야 하는 문항 9개가 들어간다.
 * 4지선다만 있으면 찍어서 25%가 그냥 깔리는데, 밴드당 12문항으로 레벨을 가르는
 * 마당에 그 정도 잡음이면 판정이 흔들린다.
 *
 * 문항을 더할 때는 아홉 칸의 개수와 유형 비율을 함께 맞춰야 한다. 추출기가
 * 그 구성을 전제로 돌아간다.
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
    ko: "죄송해요, 카드 단말기가 안 되네요. 현금 있으세요?",
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
    ko: "실례합니다, 기차표는 어디서 살 수 있나요?",
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
    ko: "이 신발이 너무 작아요. 환불받을 수 있을까요?",
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
    ko: "내일은 못 나가요. 제 근무 대신 서 줄 사람 있어요?",
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
    ko: "택시 영수증을 보관하세요. 사무실에서 비용 정산을 처리해 줄 거예요.",
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
    ko: "세컨드 비자 자격을 갖추려면 지방 근무 88일을 채워야 해요.",
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
    ko: "제 하우스메이트들은 대만에서 왔어요.",
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
    ko: "공항버스는 20분마다 출발해요.",
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
    ko: "플랫화이트 하나 테이크아웃으로 주시겠어요?",
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
    ko: "저는 지난 월요일에 TFN 신청서를 냈어요.",
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
    ko: "주방에서는 발이 덮이는 신발을 신어야 해요. 안전 규정이에요.",
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
    ko: "주간 패스가 매일 표를 사는 것보다 싸요.",
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
    ko: "A: 어제가 월세 내는 날이었어요. B: 아, 완전히 잊고 있었네요. 오늘 밤에 보낼게요.",
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
    ko: "시드니에 온 지 두 달인데 아직 셰어하우스를 못 구했어요.",
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
    ko: "차가 있으면 출근할 때 버스를 두 번 갈아타지 않아도 될 텐데요.",
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
    ko: "보증금은 최종 점검일로부터 영업일 기준 10일 안에 돌려드립니다.",
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
    answerKo: "실례합니다, 기차역에 어떻게 가나요?",
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
    answerKo: "두통에 듣는 약 있나요?",
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
    answerKo: "죄송해요, 안 될 것 같아요 — 토요일에 이미 약속이 있어서요.",
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
    answerKo: "계좌를 열려면 어떤 서류가 필요한가요?",
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
    answerKo: "죄송한데, 조금만 더 천천히 다시 말씀해 주시겠어요?",
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
    answerKo: "월세에 공과금이 포함되는지 여쭤봐도 될까요?",
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
    answerKo:
      "2주 전 통보를 드리려고 합니다 — 마지막 근무일은 30일이 될 것 같아요.",
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
    answerKo:
      "급여명세서에 착오가 있는 것 같아요 — 토요일에 근무표에 있었는데 반영이 안 됐네요.",
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
    answerKo:
      "워킹홀리데이 비자로 왔어요 — 여행하면서 단기 일도 좀 할 예정이에요.",
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
    accept: ["card", "credit card", "debit card", "eftpos", "phone"],
    ko: "죄송해요, 현금이 없어요. 카드로 결제해도 될까요?",
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
    ko: "우체국은 일요일에 문을 닫아요. 월요일에 가요.",
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
    ko: "친구한테 돈을 좀 빌리고 싶어요.",
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
    accept: ["roster", "schedule", "rota", "timetable"],
    ko: "매니저가 목요일마다 근무표를 보내 줘서 다음 주 근무일을 알 수 있어요.",
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
    accept: ["tap", "touch", "scan"],
    ko: "트램에 탈 때 카드 찍는 걸 깜빡해서 벌금을 물었어요.",
    explain:
      "교통카드를 단말기에 대는 동작은 탈 때 tap on, 내릴 때 tap off예요. 멜버른 Myki는 같은 뜻으로 touch on·touch off라고 안내합니다. 내릴 때 안 찍으면 최대 요금이 빠져나가요.",
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
    ko: "이번 주 금요일에 병원 예약을 잡고 싶어요.",
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
    ko: "비자 신청이 아직 심사 중이에요. 결과를 기다리고 있어요.",
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
    ko: "고용주가 제 임금의 11.5%를 노후 대비 퇴직연금에 넣어 줘요.",
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
    ko: "저는 캐주얼이라 유급휴가 대신 기본 시급에 25% 할증을 더 받아요.",
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
    ko: "중개인이 집을 점검한 다음 제 보증금을 돌려줄 거예요.",
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
    ko: "세금 신고 중이라 올해 일한 모든 고용주에게서 소득 명세서를 받아야 해요.",
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
    accept: ["are", "were"],
    ko: "이 셰어하우스에는 화장실이 두 개 있어요.",
    explain:
      "There 뒤의 be동사는 그 뒤에 오는 명사에 맞춰요. two bathrooms가 복수라 are를 씁니다. 하나면 There is예요. (지난 일을 말한다면 were 도 맞습니다.)",
  },
  {
    id: "pt-g12",
    band: "A1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — I work at a cafe, but my housemate ___ at a farm.",
    accept: ["works"],
    ko: "저는 카페에서 일하고, 하우스메이트는 농장에서 일해요.",
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
    ko: "그녀는 운전면허가 없어서 제가 운전해요.",
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
    ko: "근무는 몇 시에 시작해요? — 오전 7시요.",
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
    ko: "우유가 남은 게 없어요. 좀 사다 줄래요?",
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
    ko: "3월부터 멜버른에 있었는데 아직도 좋아요.",
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
    ko: "매니저가 저한테 한 시간 일찍 나오라고 했어요.",
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
    ko: "이번 주말에 새 하우스메이트들을 만나는 게 기대돼요.",
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
    ko: "저녁을 하고 있는데 화재경보기가 울렸어요.",
    explain:
      "진행 중이던 일 도중에 갑자기 벌어진 일은 when으로 이어요. during 뒤에는 명사만 오고, while 뒤에는 보통 진행형 문장이 옵니다.",
  },
  {
    id: "pt-g20",
    band: "B1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — Your contract must ___ signed before your first shift.",
    accept: ["be"],
    ko: "계약서는 첫 근무 전에 서명되어야 해요.",
    explain:
      "조동사 뒤에는 동사원형이 오고, 계약서는 서명을 '당하는' 쪽이라 수동태가 돼요. 그래서 must be signed 입니다.",
  },
  {
    id: "pt-g21",
    band: "B1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — If I ___ known about the 88 days rule earlier, I would have started in January.",
    accept: ["had"],
    ko: "88일 규정을 더 일찍 알았더라면 1월에 시작했을 거예요.",
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
    ko: "폭우에도 불구하고 농장 일은 예정대로 진행됐어요.",
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
    ko: "비자가 만료될 즈음이면 여기서 산 지 2년이 돼요.",
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
    ko: "주말에 또 나가느니 차라리 초과근무를 하겠어요.",
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
    ko: "여기서 드실 건가요, 포장인가요?",
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
    accept: ["minutes", "mins", "moments"],
    ko: "몇 분만 더 주시겠어요?",
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
    ko: "테이크아웃으로 커피 두 잔 주시겠어요?",
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
    answerKo: "아니요, 괜찮아요. 감사합니다.",
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
    answerKo: "다음 주 월요일부터 들어올 수 있어요.",
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
    accept: ["swapping", "switching", "changing", "trading", "swopping"],
    ko: "금요일에 저랑 근무 바꿔 주실 수 있을까요?",
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
    ko: "가장 빠른 예약이 언제인가요?",
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
    ko: "계좌에 대해 물어보려고 은행에 전화했는데 아무도 안 받았어요.",
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
    answerKo:
      "저기, 방해해서 미안한데 — 소리 조금만 줄여 줄 수 있어? 내일 일찍 출근해야 해서.",
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
    answerKo:
      "다음 주부터 시작할 수 있는데, 지금 일하는 곳에 1주일 전에는 알려야 해요.",
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
    accept: ["confirm", "clarify", "check", "recap", "double-check"],
    ko: "확인차 여쭤보는데, 월세에 수도는 포함이고 전기는 아닌 거 맞죠?",
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
    ko: "번거롭게 하고 싶진 않은데, 내일이 월세 내는 날이라 오늘 들어오면 정말 큰 도움이 되겠어요.",
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
    ko: "지난주에 검트리에 올리신 방에 대해 문의드리려고 씁니다.",
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
    answerKo:
      "혹시 나중에 더 심해질 수도 있으니 사고 보고서에 남겨 둘 수 있을까요?",
    explain:
      "업무 중 사고는 incident report에 남겨야 나중에 치료비·산재 처리가 됩니다. just in case ~로 이유를 붙이면 상대를 몰아세우지 않으면서 필요한 절차를 요청할 수 있어요.",
  },

  // ─────────────────────────────────────────────
  // 3차 확장 — 칸마다 직접입력 1 · 오류찾기 1 · 4지선다 2
  // 칸을 8 → 12 로 키워, 직전 회차 문항을 빼고도 뽑을 여유를 만든다.
  // ─────────────────────────────────────────────
  {
    id: "pt-v25",
    band: "A1",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — I'd like to send this box to Korea. Where's the nearest post ___?",
    accept: ["office"],
    ko: "이 상자를 한국으로 보내고 싶어요. 가장 가까운 우체국이 어디예요?",
    explain:
      "우체국은 post office예요. 두 단어가 늘 한 덩어리로 붙어 다닙니다.",
  },
  {
    id: "pt-v26",
    band: "A1",
    section: "vocab",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I have / a many / questions / about the contract.",
    options: ["I have", "a many", "questions", "about the contract"],
    answer: 1,
    ko: "계약서에 대해 물어볼 게 많아요.",
    explain:
      "many 앞에는 a를 붙이지 않아요. many questions 또는 a lot of questions라고 씁니다.",
  },
  {
    id: "pt-v27",
    band: "A1",
    section: "vocab",
    question: "호주에서 '현금인출기'를 가리킬 때 가장 흔히 쓰는 말은?",
    options: ["cash point", "cash machine", "ATM", "money box"],
    answer: 2,
    explain:
      "호주에서는 그냥 ATM이라고 해요. cashpoint·cash machine은 영국식 표현이고, money box는 저금통을 뜻합니다.",
  },
  {
    id: "pt-v28",
    band: "A1",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — I need to buy a SIM card. Which ___ do you recommend?",
    options: ["carrier", "career", "cashier", "courier"],
    answer: 0,
    ko: "심카드를 사야 해요. 어느 통신사를 추천하세요?",
    explain:
      "통신사는 carrier(또는 telco)예요. career는 직업 경력, cashier는 계산원, courier는 택배 기사라 뜻이 전혀 다릅니다.",
  },
  {
    id: "pt-v29",
    band: "A2",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — My phone was stolen, so I went to the police station to file a ___.",
    accept: ["report", "complaint"],
    ko: "휴대폰을 도난당해서 신고서를 접수하러 경찰서에 갔어요.",
    explain:
      "도난 신고서를 접수하는 것은 file a report예요. 여행자보험을 청구할 때 이 서류를 요구합니다.",
  },
  {
    id: "pt-v30",
    band: "A2",
    section: "vocab",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — The doctor / gave me / a prescribe / for antibiotics.",
    options: ["The doctor", "gave me", "a prescribe", "for antibiotics"],
    answer: 2,
    ko: "의사가 항생제 처방전을 써 줬어요.",
    explain:
      "처방전은 명사 prescription이에요. prescribe는 '처방하다'라는 동사라 a를 붙일 수 없습니다.",
  },
  {
    id: "pt-v31",
    band: "A2",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — This milk is past its ___ date. Don't drink it.",
    options: ["due", "expiry", "issue", "birth"],
    answer: 1,
    ko: "이 우유는 유통기한이 지났어요. 마시지 마세요.",
    explain:
      "식품의 소비기한은 expiry date예요. due date는 마감일이나 출산 예정일을 가리킵니다.",
  },
  {
    id: "pt-v32",
    band: "A2",
    section: "vocab",
    question: "'세입자'를 뜻하는 단어는?",
    options: ["landlord", "tenant", "agent", "guarantor"],
    answer: 1,
    explain:
      "빌려 사는 사람은 tenant, 집주인은 landlord예요. agent는 중개인, guarantor는 보증인을 뜻합니다.",
  },
  {
    id: "pt-v33",
    band: "B1",
    section: "vocab",
    kind: "fill",
    question:
      "빈칸에 들어갈 한 단어를 영어로 쓰세요. — I'm covered by travel insurance, so I can make a ___ for the stolen laptop.",
    accept: ["claim"],
    ko: "여행자보험에 들어 있어서 도난당한 노트북에 대해 보험금을 청구할 수 있어요.",
    explain:
      "보험금을 청구하는 것은 make a claim이에요. claim은 명사로도 동사로도 씁니다.",
  },
  {
    id: "pt-v34",
    band: "B1",
    section: "vocab",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — My employer / must pay / superannuation / in addition of my wage.",
    options: [
      "My employer",
      "must pay",
      "superannuation",
      "in addition of my wage",
    ],
    answer: 3,
    ko: "고용주는 제 임금에 더해 퇴직연금도 내야 해요.",
    explain:
      "'~에 더해'는 in addition to 예요. of를 쓰지 않습니다. 비슷하게 생긴 due to·owing to 와 헷갈리지 마세요.",
  },
  {
    id: "pt-v35",
    band: "B1",
    section: "vocab",
    question:
      "빈칸에 알맞은 단어는? — The job ad says the position is ___, so the hours aren't guaranteed.",
    options: ["permanent", "casual", "salaried", "tenured"],
    answer: 1,
    ko: "구인 공고에 이 자리가 캐주얼이라고 되어 있어서 근무시간이 보장되지 않아요.",
    explain:
      "호주에서 casual 은 근무시간이 보장되지 않는 대신 시급에 할증이 붙는 고용 형태예요. permanent 는 시간이 보장되는 정규 고용입니다.",
  },
  {
    id: "pt-v36",
    band: "B1",
    section: "vocab",
    question: "'계약 기간을 채우지 않고 집을 먼저 나가는 것'을 뜻하는 말은?",
    options: ["break lease", "sublet", "hand over", "vacate"],
    answer: 0,
    explain:
      "계약을 중도에 끊고 나가는 것은 break lease 예요. sublet 은 내가 빌린 집을 다시 남에게 빌려주는 전대를 뜻합니다.",
  },
  {
    id: "pt-g25",
    band: "A1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — I have an interview ___ Monday morning.",
    accept: ["on"],
    ko: "월요일 아침에 면접이 있어요.",
    explain:
      "요일 앞에는 on 을 써요. Monday morning 처럼 요일이 붙으면 in the morning 이 아니라 on Monday morning 이 됩니다. 시각에는 at, 달·연도에는 in 을 써요.",
  },
  {
    id: "pt-g26",
    band: "A1",
    section: "grammar",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I go / to work / by walk / every morning.",
    options: ["I go", "to work", "by walk", "every morning"],
    answer: 2,
    ko: "저는 매일 아침 걸어서 출근해요.",
    explain:
      "걸어서 간다고 할 때는 on foot 이라고 하거나 아예 I walk to work 라고 해요. by 뒤에는 bus·train 처럼 탈것이 옵니다.",
  },
  {
    id: "pt-g27",
    band: "A1",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — ___ any milk in the fridge?",
    options: ["Is there", "Are there", "There is", "Have there"],
    answer: 0,
    ko: "냉장고에 우유 있어요?",
    explain:
      "milk 는 셀 수 없는 명사라 Is there 를 써요. 셀 수 있는 복수라면 Are there 입니다.",
  },
  {
    id: "pt-g28",
    band: "A1",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — This is ___ room, not mine.",
    options: ["she", "her", "hers", "she's"],
    answer: 1,
    ko: "이건 제 방이 아니라 그녀의 방이에요.",
    explain:
      "명사 앞에서 '그녀의'는 소유격 her 예요. hers 는 뒤에 명사 없이 홀로 쓰는 소유대명사입니다.",
  },
  {
    id: "pt-g29",
    band: "A2",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — I haven't finished the induction ___.",
    accept: ["yet"],
    ko: "아직 신입 교육을 다 못 끝냈어요.",
    explain:
      "현재완료 부정문 끝에서 '아직'을 뜻하는 말은 yet 이에요. 긍정문에서 '벌써'는 already 를 씁니다.",
  },
  {
    id: "pt-g30",
    band: "A2",
    section: "grammar",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — She is used to / work / night shifts, / so she doesn't mind.",
    options: ["She is used to", "work", "night shifts,", "so she doesn't mind"],
    answer: 1,
    ko: "그녀는 야간 근무에 익숙해서 개의치 않아요.",
    explain:
      "be used to 의 to 는 전치사라 뒤에 동명사 working 이 와요. used to + 동사원형은 '예전에는 ~했다'라는 전혀 다른 표현입니다.",
  },
  {
    id: "pt-g31",
    band: "A2",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — If it ___ tomorrow, the farm work will be cancelled.",
    options: ["will rain", "rains", "rained", "would rain"],
    answer: 1,
    ko: "내일 비가 오면 농장 일은 취소될 거예요.",
    explain:
      "조건절(If ~) 안에서는 미래의 일도 현재시제로 나타내요. will 은 주절에만 씁니다.",
  },
  {
    id: "pt-g32",
    band: "A2",
    section: "grammar",
    question: "빈칸에 알맞은 것은? — I've been living here ___ six months.",
    options: ["since", "during", "for", "from"],
    answer: 2,
    ko: "여기서 산 지 6개월 됐어요.",
    explain:
      "기간의 길이 앞에는 for 를 써요. since 는 시작 시점(since March), during 뒤에는 명사가 옵니다.",
  },
  {
    id: "pt-g33",
    band: "B1",
    section: "grammar",
    kind: "fill",
    question:
      "빈칸에 알맞은 한 단어를 쓰세요. — The manager, ___ signed my contract, has already left the company.",
    accept: ["who"],
    ko: "제 계약서에 서명했던 매니저는 이미 회사를 떠났어요.",
    explain:
      "사람을 꾸미는 주격 관계대명사는 who 예요. 사물이라면 which 나 that 을 씁니다.",
  },
  {
    id: "pt-g34",
    band: "B1",
    section: "grammar",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — I suggested / him to apply / for the second-year visa / last month.",
    options: [
      "I suggested",
      "him to apply",
      "for the second-year visa",
      "last month",
    ],
    answer: 1,
    ko: "지난달에 그에게 세컨드 비자를 신청해 보라고 권했어요.",
    explain:
      "suggest 는 사람을 바로 목적어로 두지 않아요. I suggested that he apply 또는 I suggested applying 처럼 씁니다.",
  },
  {
    id: "pt-g35",
    band: "B1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — My bond ___ returned yet, even though I moved out three weeks ago.",
    options: ["hasn't been", "isn't", "didn't", "wasn't been"],
    answer: 0,
    ko: "3주 전에 이사 나왔는데 보증금이 아직 안 들어왔어요.",
    explain:
      "보증금은 돌려받는 대상이라 수동태이고, yet 과 함께 쓰였으니 현재완료 수동 hasn't been returned 가 됩니다.",
  },
  {
    id: "pt-g36",
    band: "B1",
    section: "grammar",
    question:
      "빈칸에 알맞은 것은? — She asked me ___ I had finished the paperwork.",
    options: ["that", "what", "whether", "which"],
    answer: 2,
    ko: "그녀가 저에게 서류 작업을 끝냈는지 물었어요.",
    explain:
      "예·아니오로 답할 내용을 옮길 때는 whether(또는 if)를 써요. that 은 평서문 내용을 옮길 때 씁니다.",
  },
  {
    id: "pt-u25",
    band: "A1",
    section: "usage",
    kind: "fill",
    question:
      "가게에서 값을 물어봅니다. 빈칸에 들어갈 한 단어를 쓰세요. — How ___ is this?",
    accept: ["much"],
    ko: "이거 얼마예요?",
    explain:
      "값을 물을 때는 How much 예요. How many 는 개수를 물을 때만 씁니다.",
  },
  {
    id: "pt-u26",
    band: "A1",
    section: "usage",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — Excuse me, / can you / borrow me / your pen?",
    options: ["Excuse me,", "can you", "borrow me", "your pen?"],
    answer: 2,
    ko: "실례지만, 펜 좀 빌려주시겠어요?",
    explain:
      "borrow 는 내가 빌려 오는 쪽이에요. 남에게 빌려 달라고 할 때는 lend 를 써서 Can you lend me your pen? 이라고 합니다.",
  },
  {
    id: "pt-u27",
    band: "A1",
    section: "usage",
    question:
      '주문을 마쳤는데 직원이 "Anything else?"라고 물었어요. 더 필요 없을 때 가장 자연스러운 답은?',
    options: [
      "No, that's all, thanks.",
      "No, finish.",
      "That's enough for me.",
      "No more, please.",
    ],
    answer: 0,
    answerKo: "아니요, 그거면 다 됐어요. 감사합니다.",
    explain:
      "That's all 은 '이게 다예요'라는 뜻으로 주문을 마무리할 때 씁니다. That's enough 는 상황에 따라 '그만해'처럼 들릴 수 있어요.",
  },
  {
    id: "pt-u28",
    band: "A1",
    section: "usage",
    question:
      "셰어하우스에 막 들어와 사람들에게 자기소개를 합니다. 가장 자연스러운 것은?",
    options: [
      "Hi, I'm Minsu. I just moved in today.",
      "Hello, my name is Minsu. Nice to meet you first time.",
      "Hi, I am Minsu and I came here today for live.",
      "Hello, I'm Minsu, your new roommate person.",
    ],
    answer: 0,
    answerKo: "안녕하세요, 저는 민수예요. 오늘 막 이사 들어왔어요.",
    explain:
      "이름을 짧게 밝히고 상황을 한 마디 덧붙이면 충분해요. 이사 들어오는 것은 move in 이라고 합니다.",
  },
  {
    id: "pt-u29",
    band: "A2",
    section: "usage",
    kind: "fill",
    question:
      "약속에 늦을 것 같아 미리 알립니다. 빈칸에 들어갈 한 단어를 쓰세요. — Sorry, I'm running ___ 10 minutes late.",
    accept: ["about", "around", "roughly"],
    ko: "죄송해요, 10분쯤 늦을 것 같아요.",
    explain:
      "run late 는 '예정보다 늦어지다'라는 뜻이에요. 어림수 앞에는 about 이나 around 를 붙입니다.",
  },
  {
    id: "pt-u30",
    band: "A2",
    section: "usage",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — Can you / explain me / how to use / the washing machine?",
    options: ["Can you", "explain me", "how to use", "the washing machine?"],
    answer: 1,
    ko: "세탁기 사용법 좀 알려주시겠어요?",
    explain:
      "explain 은 사람을 바로 목적어로 두지 않아요. explain to me 처럼 to 를 넣거나 explain how to use it 이라고 씁니다.",
  },
  {
    id: "pt-u31",
    band: "A2",
    section: "usage",
    question:
      "매니저가 지시한 내용을 제대로 이해했는지 확인하고 싶어요. 가장 자연스러운 표현은?",
    options: [
      "So just to check — you want me to close at 9, right?",
      "Do you mean that? I don't know.",
      "I understand. Maybe.",
      "Repeat again, please.",
    ],
    answer: 0,
    answerKo: "그러니까 확인차 여쭤보면 — 9시에 마감하라는 말씀이시죠?",
    explain:
      "just to check 로 시작해 들은 내용을 되짚으면 오해를 미리 막을 수 있어요. Repeat again 은 뜻이 겹치는 표현이라 어색합니다.",
  },
  {
    id: "pt-u32",
    band: "A2",
    section: "usage",
    question:
      "중고 거래로 자전거를 사려 합니다. 아직 남았는지 묻는 첫 메시지로 가장 자연스러운 것은?",
    options: [
      "Hi, is this still available?",
      "Hello, I want this. Send me.",
      "Is the bike alive?",
      "Hi, do you have it now or not?",
    ],
    answer: 0,
    answerKo: "안녕하세요, 이거 아직 있나요?",
    explain:
      "중고 거래 첫 메시지는 Is this still available? 이 정석이에요. Gumtree·Marketplace 에서 그대로 씁니다.",
  },
  {
    id: "pt-u33",
    band: "B1",
    section: "usage",
    kind: "fill",
    question:
      "집을 나가겠다고 미리 알립니다. 빈칸에 들어갈 한 단어를 쓰세요. — I'm writing to give four weeks' ___ that I'll be moving out.",
    accept: ["notice"],
    ko: "4주 뒤에 퇴실하겠다는 통보를 드리려고 씁니다.",
    explain:
      "퇴실·퇴사를 미리 알리는 것은 give notice 예요. 앞에 기간을 붙여 four weeks' notice 처럼 씁니다.",
  },
  {
    id: "pt-u34",
    band: "B1",
    section: "usage",
    kind: "error",
    question:
      "밑줄 친 부분 중 틀린 곳은? — Could you please / let me to know / whether the room / is still available?",
    options: [
      "Could you please",
      "let me to know",
      "whether the room",
      "is still available?",
    ],
    answer: 1,
    ko: "그 방이 아직 있는지 알려주시겠어요?",
    explain:
      "let 뒤에는 to 없이 동사원형이 와요. let me know 가 맞습니다. 같은 부류로 make me wait, help me carry 처럼 씁니다.",
  },
  {
    id: "pt-u35",
    band: "B1",
    section: "usage",
    question:
      '면접 마지막에 "Do you have any questions?"라고 물었어요. 가장 좋은 답은?',
    options: [
      "No, nothing. Thank you.",
      "How much is the pay? That's all I want to know.",
      "Yes — could you tell me what a typical shift looks like?",
      "When will you call me? I need to know today.",
    ],
    answer: 2,
    answerKo: "네 — 보통 근무가 어떤 식인지 여쭤봐도 될까요?",
    explain:
      "업무 자체에 관한 질문을 하나 준비해 두면 관심이 있다는 인상을 줘요. 급여만 묻거나 아무것도 묻지 않으면 소극적으로 보일 수 있습니다.",
  },
  {
    id: "pt-u36",
    band: "B1",
    section: "usage",
    question:
      "동료가 자꾸 마감 정리를 떠넘깁니다. 관계를 지키면서 짚는 가장 적절한 말은?",
    options: [
      "You always leave the closing to me. It's not fair.",
      "Hey, can we split the closing tasks? I've done it on my own the last few shifts.",
      "I'm not doing the closing anymore.",
      "Why do you never help me?",
    ],
    answer: 1,
    answerKo:
      "저기, 마감 정리를 나눠서 하면 어떨까? 지난 몇 번은 나 혼자 했거든.",
    explain:
      "요청을 먼저 내놓고 사실만 덧붙이면 상대를 비난하지 않으면서 문제를 짚을 수 있어요. always·never 같은 단정은 방어적인 반응을 부릅니다.",
  },
];
