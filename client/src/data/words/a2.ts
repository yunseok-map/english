import type { WordEntry } from "@/data/types";

export const WORDS_A2: WordEntry[] = [
  // ── work ──────────────────────────────────────────────
  {
    id: "a2-w001",
    level: "A2",
    topic: "work",
    word: { us: "unpaid break" },
    ipa: { us: "ʌnˈpeɪd breɪk" },
    hangul: "언페이드 브레이크",
    meaning: "무급 휴게 시간",
    nuance:
      "보통 30분 식사 시간은 무급이고, 짧은 휴식(10분)은 유급이에요. 근무 시간 계산에서 자주 문제가 됩니다.",
    collocations: [
      "a thirty-minute unpaid break",
      "take an unpaid break",
      "paid and unpaid breaks",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The eight-hour shift includes a thirty-minute unpaid break.",
        },
        ko: "8시간 근무에 30분 무급 휴게가 포함돼 있어.",
      },
      {
        tone: "daily",
        en: { us: "Is my break paid or unpaid?" },
        ko: "제 휴게 시간은 유급인가요, 무급인가요?",
      },
      {
        tone: "business",
        en: {
          us: "Shifts over five hours include a thirty-minute unpaid break.",
        },
        ko: "5시간을 초과하는 근무에는 30분의 무급 휴게 시간이 포함됩니다.",
      },
    ],
  },
  {
    id: "a2-w002",
    level: "A2",
    topic: "work",
    word: { us: "roster" },
    ipa: { us: "ˈrɑːstər" },
    hangul: "로스터",
    meaning: "근무 시간표, 스케줄 표",
    nuance: "호주 직장에서는 work schedule 대신 거의 항상 roster라고 해요.",
    collocations: ["check the roster", "on the roster", "next week's roster"],
    examples: [
      {
        tone: "friend",
        en: { us: "Have you seen next week's roster yet?" },
        ko: "다음 주 로스터 벌써 봤어?",
      },
      {
        tone: "daily",
        en: { us: "Could you tell me when the new roster comes out?" },
        ko: "새 로스터가 언제 나오는지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: { us: "Please check the roster and confirm your hours by Friday." },
        ko: "로스터를 확인하시고 금요일까지 근무 시간을 확정해 주십시오.",
      },
    ],
    auOnly: true,
    usEquivalent: "work schedule",
  },
  {
    id: "a2-w003",
    level: "A2",
    topic: "work",
    word: { us: "cover letter" },
    ipa: { us: "ˈkʌvər ˈlɛtər" },
    hangul: "커버 레터",
    meaning: "자기소개서, 지원 서한",
    nuance:
      "이력서와 함께 내는 짧은 편지예요. 카페·리테일 지원에서는 서너 문단이면 충분합니다.",
    collocations: [
      "attach a cover letter",
      "write a cover letter",
      "a short cover letter",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Keep the cover letter short — half a page is plenty." },
        ko: "커버 레터는 짧게 써. 반 장이면 충분해.",
      },
      {
        tone: "daily",
        en: { us: "Should I send a cover letter with my application?" },
        ko: "지원할 때 커버 레터도 같이 보내야 하나요?",
      },
      {
        tone: "business",
        en: { us: "Please attach a cover letter outlining your availability." },
        ko: "근무 가능 시간을 설명한 자기소개서를 첨부해 주십시오.",
      },
    ],
  },
  {
    id: "a2-w004",
    level: "A2",
    topic: "work",
    word: { us: "paycheck", au: "payslip" },
    ipa: { us: "ˈpeɪtʃek", au: "ˈpeɪslɪp" },
    hangul: "페이첵",
    meaning: "급여, 급여 명세서",
    nuance: "호주에서는 급여 명세서를 payslip이라고 하고 보통 이메일로 받아요.",
    collocations: [
      "a weekly paycheck",
      "get your paycheck",
      "save your paychecks",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Nice, my paycheck just hit my account!",
          au: "Nice, my pay just hit my account!",
        },
        ko: "앗싸, 방금 월급 들어왔어!",
      },
      {
        tone: "daily",
        en: {
          us: "When do we usually get our paychecks each week?",
          au: "When do we usually get our payslips each week?",
        },
        ko: "급여 명세서는 보통 매주 언제 받나요?",
      },
      {
        tone: "business",
        en: {
          us: "I noticed an error on my last paycheck.",
          au: "I noticed an error on my last payslip.",
        },
        ko: "지난번 급여 명세서에서 오류를 발견했습니다.",
      },
    ],
  },
  {
    id: "a2-w005",
    level: "A2",
    topic: "work",
    word: { us: "superannuation" },
    ipa: { us: "ˌsuːpərˌænjuˈeɪʃən" },
    hangul: "수퍼래뉴에이션",
    meaning: "퇴직 연금 (호주 의무 연금 제도)",
    nuance: "줄여서 super라고 부르고, 고용주가 급여와 별도로 의무 적립해 줘요.",
    collocations: ["pay superannuation", "a super fund", "check your super"],
    examples: [
      {
        tone: "friend",
        en: { us: "Did your boss actually pay your super this month?" },
        ko: "너희 사장 이번 달에 슈퍼 제대로 넣어 줬어?",
      },
      {
        tone: "daily",
        en: { us: "Which super fund did you choose when you started?" },
        ko: "일 시작할 때 어떤 연금 펀드 고르셨어요?",
      },
      {
        tone: "business",
        en: {
          us: "Your superannuation contributions are paid on top of your wage.",
        },
        ko: "퇴직 연금은 급여와 별도로 적립됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "retirement fund (401(k))",
  },
  {
    id: "a2-w006",
    level: "A2",
    topic: "work",
    word: { us: "trial shift" },
    ipa: { us: "ˈtraɪəl ʃɪft" },
    hangul: "트라이얼 쉬프트",
    meaning: "시험 근무 (채용 전 테스트 근무)",
    nuance:
      "카페나 식당 알바 채용 전에 한두 시간 시험 근무를 시키는 경우가 흔해요.",
    collocations: [
      "do a trial shift",
      "an unpaid trial",
      "come in for a trial",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I've got a trial shift at that new cafe tomorrow!" },
        ko: "나 내일 그 새로 생긴 카페에서 트라이얼 근무 있어!",
      },
      {
        tone: "daily",
        en: { us: "How long does the trial shift usually last?" },
        ko: "시험 근무는 보통 얼마나 걸리나요?",
      },
      {
        tone: "business",
        en: { us: "We would like to offer you a paid trial shift." },
        ko: "유급 시험 근무를 제안드리고자 합니다.",
      },
    ],
  },
  {
    id: "a2-w007",
    level: "A2",
    topic: "work",
    word: { us: "casual" },
    ipa: { us: "ˈkæʒuəl" },
    hangul: "캐주얼",
    meaning: "비정규 시간제 고용의",
    nuance:
      "고정 근무 시간이 없는 대신 시급에 할증(casual loading)이 붙어요. 워홀러 일자리 대부분이 이 형태입니다.",
    collocations: ["a casual position", "work casual hours", "casual loading"],
    examples: [
      {
        tone: "friend",
        en: { us: "It's casual, so the hours change every week." },
        ko: "캐주얼이라서 근무 시간이 매주 달라져.",
      },
      {
        tone: "daily",
        en: { us: "Is this a casual position or part-time?" },
        ko: "이건 캐주얼 자리인가요, 파트타임인가요?",
      },
      {
        tone: "business",
        en: { us: "Casual employees receive loading in place of paid leave." },
        ko: "캐주얼 직원은 유급 휴가 대신 할증 임금을 받습니다.",
      },
    ],
  },
  {
    id: "a2-w008",
    level: "A2",
    topic: "work",
    word: { us: "reference" },
    ipa: { us: "ˈrefrəns" },
    hangul: "레퍼런스",
    meaning: "추천인, 추천서",
    nuance:
      "호주 알바 지원 시 이전 매니저의 연락처를 reference로 요구하는 경우가 많아요.",
    collocations: [
      "provide a reference",
      "a good reference",
      "list someone as a reference",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Can I put you down as a reference?" },
        ko: "너를 추천인으로 적어도 돼?",
      },
      {
        tone: "daily",
        en: { us: "My old manager said she would be my reference." },
        ko: "예전 매니저가 추천인이 되어 주겠다고 했어요.",
      },
      {
        tone: "business",
        en: { us: "Please provide two references with your application." },
        ko: "지원서와 함께 추천인 두 명을 기재해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w009",
    level: "A2",
    topic: "work",
    word: { us: "overtime" },
    ipa: { us: "ˈoʊvərtaɪm" },
    hangul: "오버타임",
    meaning: "초과 근무 (수당)",
    collocations: ["work overtime", "overtime pay", "do overtime hours"],
    examples: [
      {
        tone: "friend",
        en: { us: "I did four hours of overtime last night, I'm dead." },
        ko: "어젯밤에 초과 근무 네 시간 했어, 완전 녹초야.",
      },
      {
        tone: "daily",
        en: { us: "Do we get extra pay for overtime here?" },
        ko: "여기는 초과 근무하면 수당을 더 주나요?",
      },
      {
        tone: "business",
        en: { us: "Overtime must be approved by your supervisor in advance." },
        ko: "초과 근무는 사전에 관리자의 승인을 받아야 합니다.",
      },
    ],
  },
  {
    id: "a2-w010",
    level: "A2",
    topic: "work",
    word: { us: "quit" },
    ipa: { us: "kwɪt" },
    hangul: "큇",
    meaning: "(일을) 그만두다",
    nuance: "격식 있는 자리에서는 quit 대신 resign을 써요.",
    collocations: ["quit a job", "quit without notice", "think about quitting"],
    examples: [
      {
        tone: "friend",
        en: { us: "I'm seriously thinking about quitting this place." },
        ko: "나 진짜 여기 그만둘까 고민 중이야.",
      },
      {
        tone: "daily",
        en: { us: "She quit last week and moved to Sydney." },
        ko: "그분은 지난주에 그만두고 시드니로 이사했어요.",
      },
      {
        tone: "business",
        en: { us: "May I ask why you decided to quit your previous job?" },
        ko: "이전 직장을 그만두신 이유를 여쭤봐도 될까요?",
      },
    ],
  },
  // ── airport ───────────────────────────────────────────
  {
    id: "a2-w011",
    level: "A2",
    topic: "airport",
    word: { us: "declare" },
    ipa: { us: "dɪˈkler" },
    hangul: "디클레어",
    meaning: "(세관에) 신고하다",
    nuance: "호주는 음식과 목재 검역이 엄격해서 declare 여부가 아주 중요해요.",
    collocations: ["declare food items", "nothing to declare", "declare cash"],
    examples: [
      {
        tone: "friend",
        en: { us: "Did you declare that honey in your bag?" },
        ko: "가방에 있는 그 꿀 신고했어?",
      },
      {
        tone: "daily",
        en: { us: "Do I need to declare these instant noodles?" },
        ko: "이 라면들 신고해야 하나요?",
      },
      {
        tone: "business",
        en: { us: "All food products must be declared on arrival." },
        ko: "모든 식품은 도착 시 반드시 신고해야 합니다.",
      },
    ],
  },
  {
    id: "a2-w012",
    level: "A2",
    topic: "airport",
    word: { us: "carry-on" },
    ipa: { us: "ˈkæri ɑːn" },
    hangul: "캐리온",
    meaning: "기내 반입 수하물",
    nuance: "부치는 짐은 checked baggage, 들고 타는 짐이 carry-on 이에요.",
    collocations: [
      "one carry-on bag",
      "carry-on only",
      "the carry-on size limit",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I'm going carry-on only so I don't wait at the belt." },
        ko: "짐 찾는 데서 기다리기 싫어서 기내용만 들고 가.",
      },
      {
        tone: "daily",
        en: { us: "Is this small enough for a carry-on?" },
        ko: "이거 기내 반입할 수 있을 만큼 작은가요?",
      },
      {
        tone: "business",
        en: { us: "Each passenger may bring one carry-on and one small item." },
        ko: "승객당 기내 수하물 1개와 소형 소지품 1개를 반입하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w013",
    level: "A2",
    topic: "airport",
    word: { us: "immigration" },
    ipa: { us: "ˌɪmɪˈɡreɪʃən" },
    hangul: "이미그레이션",
    meaning: "입국 심사(대)",
    nuance:
      "워홀 비자는 입국 심사에서 체류 목적을 물어볼 수 있으니 답을 준비해 두세요.",
    collocations: [
      "pass through immigration",
      "an immigration officer",
      "wait at immigration",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The line at immigration was insanely long today.",
          au: "The queue at immigration was insanely long today.",
        },
        ko: "오늘 입국 심사 줄 미쳤게 길었어.",
      },
      {
        tone: "daily",
        en: { us: "The immigration officer asked about my return ticket." },
        ko: "입국 심사관이 돌아가는 항공권에 대해 물었어요.",
      },
      {
        tone: "business",
        en: { us: "You may be asked about your visa at immigration." },
        ko: "입국 심사에서 비자에 관한 질문을 받으실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w014",
    level: "A2",
    topic: "airport",
    word: { us: "baggage claim" },
    ipa: { us: "ˈbæɡɪdʒ kleɪm" },
    hangul: "배기지 클레임",
    meaning: "수하물 찾는 곳",
    collocations: [
      "head to baggage claim",
      "wait at baggage claim",
      "the baggage claim area",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Meet me at baggage claim once you land, okay?" },
        ko: "착륙하면 수하물 찾는 곳에서 보자, 알았지?",
      },
      {
        tone: "daily",
        en: { us: "Which carousel is baggage claim for this flight?" },
        ko: "이 항공편 수하물은 몇 번 컨베이어에서 나오나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please report any missing luggage at the baggage claim counter.",
        },
        ko: "분실 수하물은 수하물 카운터에 신고해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w015",
    level: "A2",
    topic: "airport",
    word: { us: "layover", au: "stopover" },
    ipa: { us: "ˈleɪoʊvər", au: "ˈstɒpəʊvə" },
    hangul: "레이오버",
    meaning: "경유 (대기 시간)",
    nuance: "호주와 영국에서는 stopover라는 말을 더 자주 써요.",
    collocations: [
      "a long layover",
      "a two-hour layover",
      "during the layover",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "We've got a six-hour layover in Singapore, ugh.",
          au: "We've got a six-hour stopover in Singapore, ugh.",
        },
        ko: "싱가포르에서 여섯 시간 경유래, 최악이야.",
      },
      {
        tone: "daily",
        en: {
          us: "Is the layover long enough to leave the airport?",
          au: "Is the stopover long enough to leave the airport?",
        },
        ko: "경유 시간에 공항 밖에 나갔다 올 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "Your layover in Sydney has been extended to three hours.",
          au: "Your stopover in Sydney has been extended to three hours.",
        },
        ko: "시드니 경유 시간이 세 시간으로 연장되었습니다.",
      },
    ],
  },
  {
    id: "a2-w016",
    level: "A2",
    topic: "airport",
    word: { us: "delayed" },
    ipa: { us: "dɪˈleɪd" },
    hangul: "딜레이드",
    meaning: "지연된",
    collocations: ["a delayed flight", "delayed by an hour", "badly delayed"],
    examples: [
      {
        tone: "friend",
        en: { us: "My flight got delayed again, can you believe it?" },
        ko: "비행기 또 지연됐어, 말이 돼?",
      },
      {
        tone: "daily",
        en: { us: "The board says our flight is delayed forty minutes." },
        ko: "전광판에 우리 비행기가 40분 지연이라고 나와요.",
      },
      {
        tone: "business",
        en: {
          us: "We apologize for the delayed departure this evening.",
          au: "We apologise for the delayed departure this evening.",
        },
        ko: "오늘 저녁 출발 지연에 대해 사과드립니다.",
      },
    ],
  },
  {
    id: "a2-w017",
    level: "A2",
    topic: "airport",
    word: { us: "aisle seat" },
    ipa: { us: "aɪl siːt" },
    hangul: "아일 시트",
    meaning: "통로 쪽 좌석",
    nuance: "aisle의 s는 발음하지 않아요.",
    collocations: [
      "request an aisle seat",
      "an aisle or window seat",
      "swap for an aisle seat",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Lucky you got the aisle seat, my legs are dying." },
        ko: "통로 좌석 걸리다니 부럽다, 난 다리 저려 죽겠어.",
      },
      {
        tone: "daily",
        en: { us: "Could I change to an aisle seat, please?" },
        ko: "통로 쪽 좌석으로 바꿀 수 있을까요?",
      },
      {
        tone: "business",
        en: { us: "Aisle seats are subject to availability at check-in." },
        ko: "통로 좌석은 체크인 시 잔여 상황에 따라 배정됩니다.",
      },
    ],
  },
  {
    id: "a2-w018",
    level: "A2",
    topic: "airport",
    word: { us: "overweight" },
    ipa: { us: "ˌoʊvərˈweɪt" },
    hangul: "오버웨이트",
    meaning: "(수하물이) 중량 초과인",
    collocations: [
      "overweight baggage",
      "an overweight fee",
      "slightly overweight",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "My bag was overweight, so I wore three jackets." },
        ko: "가방이 중량 초과라서 재킷 세 개 껴입었어.",
      },
      {
        tone: "daily",
        en: { us: "How much is the fee for overweight luggage?" },
        ko: "수하물 중량 초과 요금은 얼마인가요?",
      },
      {
        tone: "business",
        en: {
          us: "Overweight bags will incur an additional charge of fifty dollars.",
        },
        ko: "중량 초과 수하물에는 50달러의 추가 요금이 부과됩니다.",
      },
    ],
  },
  {
    id: "a2-w019",
    level: "A2",
    topic: "airport",
    word: { us: "duty-free" },
    ipa: { us: "ˌduːti ˈfriː", au: "ˌdjuːti ˈfriː" },
    hangul: "듀티프리",
    meaning: "면세(점)의",
    collocations: [
      "duty-free shopping",
      "a duty-free allowance",
      "buy duty-free",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Want me to grab you anything from duty-free?" },
        ko: "면세점에서 뭐 사다 줄까?",
      },
      {
        tone: "daily",
        en: { us: "Where is the duty-free area in this terminal?" },
        ko: "이 터미널 면세 구역은 어디에 있나요?",
      },
      {
        tone: "business",
        en: { us: "Passengers may purchase duty-free goods before boarding." },
        ko: "탑승 전에 면세품을 구매하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w020",
    level: "A2",
    topic: "airport",
    word: { us: "connecting flight" },
    ipa: { us: "kəˈnektɪŋ flaɪt" },
    hangul: "커넥팅 플라이트",
    meaning: "연결 항공편, 환승 비행기",
    collocations: [
      "catch a connecting flight",
      "miss a connection",
      "a tight connection",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Run, or we'll miss our connecting flight!" },
        ko: "뛰어, 안 그러면 환승 비행기 놓쳐!",
      },
      {
        tone: "daily",
        en: { us: "My connecting flight leaves from a different terminal." },
        ko: "제 연결 항공편은 다른 터미널에서 출발해요.",
      },
      {
        tone: "business",
        en: {
          us: "Passengers with connecting flights should proceed directly to gate ten.",
        },
        ko: "연결 항공편 승객께서는 10번 게이트로 바로 이동해 주시기 바랍니다.",
      },
    ],
  },
  // ── housing ───────────────────────────────────────────
  {
    id: "a2-w021",
    level: "A2",
    topic: "housing",
    word: { us: "laundry" },
    ipa: { us: "ˈlɔːndri" },
    hangul: "론드리",
    meaning: "세탁실, 빨래",
    nuance:
      "호주 셰어하우스는 세탁기를 공용으로 쓰는 경우가 많아요. 광고에 laundry 표기가 있는지 확인하세요.",
    collocations: [
      "do the laundry",
      "a shared laundry",
      "the laundry is out the back",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I'll do the laundry tonight if you empty the dryer." },
        ko: "네가 건조기 비워 주면 오늘 밤에 내가 빨래 돌릴게.",
      },
      {
        tone: "daily",
        en: { us: "Is there a laundry in the building?" },
        ko: "건물 안에 세탁실이 있나요?",
      },
      {
        tone: "business",
        en: { us: "The shared laundry is available from seven to ten." },
        ko: "공용 세탁실은 7시부터 10시까지 이용하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w022",
    level: "A2",
    topic: "housing",
    word: { us: "security deposit", au: "bond" },
    ipa: { us: "sɪˈkjʊrəti dɪˌpɑːzɪt", au: "bɒnd" },
    hangul: "시큐리티 디파짓",
    meaning: "임대 보증금",
    nuance: "호주에서는 보증금을 bond라고 하며 보통 4주 치 임대료예요.",
    collocations: [
      "pay a security deposit",
      "get your deposit back",
      "refund the deposit",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Did you ever get your security deposit back?",
          au: "Did you ever get your bond back?",
        },
        ko: "너 보증금은 돌려받았어?",
      },
      {
        tone: "daily",
        en: {
          us: "The security deposit is four weeks of rent.",
          au: "The bond is four weeks of rent.",
        },
        ko: "보증금은 4주 치 월세예요.",
      },
      {
        tone: "business",
        en: {
          us: "Your security deposit will be refunded after the final inspection.",
          au: "Your bond will be refunded after the final inspection.",
        },
        ko: "보증금은 최종 점검 후 환급됩니다.",
      },
    ],
  },
  {
    id: "a2-w023",
    level: "A2",
    topic: "housing",
    word: { us: "bills included" },
    ipa: { us: "bɪlz ɪnˈkluːdɪd" },
    hangul: "빌스 인클루디드",
    meaning: "공과금 포함",
    nuance:
      "방 광고에서 가장 먼저 확인할 문구예요. 없으면 전기·수도·인터넷이 따로 나갑니다.",
    collocations: [
      "bills included in the rent",
      "are bills included",
      "excluding bills",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "It's three hundred a week, but bills are included." },
        ko: "주당 300달러인데 공과금은 포함이야.",
      },
      {
        tone: "daily",
        en: { us: "Are bills included, or do we split them separately?" },
        ko: "공과금이 포함인가요, 아니면 따로 나눠 내나요?",
      },
      {
        tone: "business",
        en: { us: "The advertised rent is inclusive of all bills." },
        ko: "게시된 임대료에는 모든 공과금이 포함되어 있습니다.",
      },
    ],
  },
  {
    id: "a2-w024",
    level: "A2",
    topic: "housing",
    word: { us: "air conditioning" },
    ipa: { us: "ˈɛr kənˌdɪʃənɪŋ" },
    hangul: "에어 컨디셔닝",
    meaning: "냉난방기, 에어컨",
    nuance: "호주 여름은 40도를 넘기도 해요. 방을 볼 때 꼭 확인할 항목입니다.",
    collocations: [
      "does it have air conditioning",
      "the air conditioning is broken",
      "turn on the air conditioning",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "This room has no air conditioning — summer is going to hurt.",
        },
        ko: "이 방 에어컨이 없어. 여름에 힘들겠는데.",
      },
      {
        tone: "daily",
        en: { us: "Does the room come with air conditioning?" },
        ko: "방에 에어컨이 딸려 있나요?",
      },
      {
        tone: "business",
        en: { us: "Please report any air conditioning faults to the agent." },
        ko: "냉난방기 고장은 중개인에게 알려 주십시오.",
      },
    ],
  },
  {
    id: "a2-w025",
    level: "A2",
    topic: "housing",
    word: { us: "share house" },
    ipa: { us: "ˈʃɛr haʊs" },
    hangul: "셰어 하우스",
    meaning: "여럿이 방을 나눠 쓰는 집",
    nuance:
      "호주 워홀 주거의 기본 형태예요. 광고에는 방 하나 단위로 올라옵니다.",
    collocations: [
      "live in a share house",
      "a share house in the city",
      "the share house rules",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I moved into a share house with four other people." },
        ko: "나 네 명이랑 같이 사는 셰어하우스로 들어갔어.",
      },
      {
        tone: "daily",
        en: { us: "Is this a share house, or is the whole place mine?" },
        ko: "여기 셰어하우스인가요, 아니면 집 전체를 쓰는 건가요?",
      },
      {
        tone: "business",
        en: {
          us: "All share house residents must be listed on the agreement.",
        },
        ko: "셰어하우스 거주자는 모두 계약서에 기재되어야 합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "shared apartment",
  },
  {
    id: "a2-w026",
    level: "A2",
    topic: "housing",
    word: { us: "inspection" },
    ipa: { us: "ɪnˈspekʃən" },
    hangul: "인스펙션",
    meaning: "(집) 점검, 집 보러 가기",
    nuance:
      "호주에서는 집 보러 가는 것도, 집주인의 정기 점검도 모두 inspection이라고 해요.",
    collocations: [
      "book an inspection",
      "a routine inspection",
      "attend an inspection",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I've got an inspection for a sharehouse this afternoon." },
        ko: "오늘 오후에 셰어하우스 집 보러 가.",
      },
      {
        tone: "daily",
        en: { us: "Can I book an inspection for this Saturday?" },
        ko: "이번 주 토요일에 집 보러 가도 될까요?",
      },
      {
        tone: "business",
        en: { us: "A routine inspection is scheduled for the tenth of May." },
        ko: "5월 10일에 정기 점검이 예정되어 있습니다.",
      },
    ],
  },
  {
    id: "a2-w027",
    level: "A2",
    topic: "housing",
    word: { us: "move out" },
    ipa: { us: "ˈmuːv aʊt" },
    hangul: "무브 아웃",
    meaning: "이사 나가다, 방을 빼다",
    nuance:
      "나가겠다고 알리는 것은 give notice 예요. 보통 2~4주 전에 알려야 합니다.",
    collocations: [
      "move out at the end of the month",
      "when are you moving out",
      "move-out inspection",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I'm moving out at the end of the month." },
        ko: "나 이번 달 말에 방 빼.",
      },
      {
        tone: "daily",
        en: { us: "How much notice do I need to give before I move out?" },
        ko: "방을 빼기 전에 며칠 전에 알려야 하나요?",
      },
      {
        tone: "business",
        en: { us: "The property must be cleaned before you move out." },
        ko: "퇴거 전에 실내를 청소해 두셔야 합니다.",
      },
    ],
  },
  {
    id: "a2-w028",
    level: "A2",
    topic: "housing",
    word: { us: "notice" },
    ipa: { us: "ˈnoʊtɪs" },
    hangul: "노티스",
    meaning: "(이사·퇴사) 사전 통보",
    nuance: "give two weeks' notice처럼 기간과 함께 자주 써요.",
    collocations: ["give notice", "two weeks' notice", "without notice"],
    examples: [
      {
        tone: "friend",
        en: { us: "I gave notice today, I'm moving out next month!" },
        ko: "오늘 통보했어, 나 다음 달에 이사 나가!",
      },
      {
        tone: "daily",
        en: { us: "How much notice do I need to give before moving out?" },
        ko: "이사 나가기 전에 얼마나 미리 알려야 하나요?",
      },
      {
        tone: "business",
        en: { us: "Tenants must give at least two weeks' written notice." },
        ko: "세입자는 최소 2주 전에 서면으로 통보해야 합니다.",
      },
    ],
  },
  {
    id: "a2-w029",
    level: "A2",
    topic: "housing",
    word: { us: "rental application" },
    ipa: { us: "ˈrɛntəl ˌæplɪˈkeɪʃən" },
    hangul: "렌털 애플리케이션",
    meaning: "임대 신청서",
    nuance:
      "인스펙션을 보고 마음에 들면 그 자리에서 넣어요. 경쟁이 심해 서류를 미리 준비해 두는 게 좋습니다.",
    collocations: [
      "submit a rental application",
      "a rental application form",
      "our application was approved",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I put in three rental applications and got one back." },
        ko: "임대 신청서를 세 군데 넣었는데 한 곳에서 연락 왔어.",
      },
      {
        tone: "daily",
        en: { us: "Can I fill out the rental application online?" },
        ko: "임대 신청서를 온라인으로 작성할 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Rental applications close at five on Friday." },
        ko: "임대 신청은 금요일 5시에 마감됩니다.",
      },
    ],
  },
  {
    id: "a2-w030",
    level: "A2",
    topic: "housing",
    word: { us: "tradie" },
    ipa: { us: "ˈtreɪdi" },
    hangul: "트레이디",
    meaning: "기술자, 수리공 (배관공·전기공 등)",
    nuance: "tradesperson의 호주식 줄임말로 일상 대화에서 아주 흔해요.",
    collocations: ["call a tradie", "a reliable tradie", "hire a tradie"],
    examples: [
      {
        tone: "friend",
        en: { us: "A tradie is coming to fix the shower tomorrow." },
        ko: "내일 샤워기 고치러 수리 기사가 와.",
      },
      {
        tone: "daily",
        en: { us: "The landlord said a tradie will come on Monday." },
        ko: "집주인이 월요일에 기술자가 올 거라고 했어요.",
      },
      {
        tone: "business",
        en: { us: "A licensed tradie must carry out all electrical work." },
        ko: "모든 전기 작업은 자격증이 있는 기술자가 수행해야 합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "tradesman / repair worker",
  },
  // ── bank ──────────────────────────────────────────────
  {
    id: "a2-w031",
    level: "A2",
    topic: "bank",
    word: { us: "checking account", au: "transaction account" },
    ipa: { us: "ˈtʃekɪŋ əˌkaʊnt", au: "trænˈzækʃən əˌkaʊnt" },
    hangul: "체킹 어카운트",
    meaning: "입출금 계좌",
    nuance:
      "호주 은행에서는 everyday account 또는 transaction account라고 해요.",
    collocations: [
      "open a checking account",
      "an everyday account",
      "link your account",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I finally opened a checking account here!",
          au: "I finally opened a transaction account here!",
        },
        ko: "드디어 여기서 입출금 계좌 만들었어!",
      },
      {
        tone: "daily",
        en: {
          us: "I'd like to open a checking account, please.",
          au: "I'd like to open a transaction account, please.",
        },
        ko: "입출금 계좌를 하나 개설하고 싶은데요.",
      },
      {
        tone: "business",
        en: {
          us: "There is no monthly fee on this checking account.",
          au: "There is no monthly fee on this transaction account.",
        },
        ko: "이 입출금 계좌는 월 수수료가 없습니다.",
      },
    ],
  },
  {
    id: "a2-w032",
    level: "A2",
    topic: "bank",
    word: { us: "internet banking" },
    ipa: { us: "ˈɪntərnɛt ˈbæŋkɪŋ" },
    hangul: "인터넷 뱅킹",
    meaning: "인터넷 뱅킹",
    collocations: [
      "set up internet banking",
      "log in to internet banking",
      "through internet banking",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Just pay me through internet banking — it's instant." },
        ko: "그냥 인터넷 뱅킹으로 보내. 바로 들어와.",
      },
      {
        tone: "daily",
        en: { us: "How do I set up internet banking?" },
        ko: "인터넷 뱅킹은 어떻게 신청하나요?",
      },
      {
        tone: "business",
        en: { us: "You can view your statements through internet banking." },
        ko: "거래 내역은 인터넷 뱅킹에서 확인하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w033",
    level: "A2",
    topic: "bank",
    word: { us: "debit card" },
    ipa: { us: "ˈdɛbɪt kɑːrd" },
    hangul: "데빗 카드",
    meaning: "체크카드",
    nuance:
      "계좌에서 바로 빠져나가는 카드예요. 결제할 때 신용카드인지 체크카드인지 묻는 일이 잦습니다.",
    collocations: [
      "pay by debit card",
      "credit or debit",
      "my debit card was declined",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "My debit card got declined, so I used cash." },
        ko: "체크카드가 결제 안 돼서 현금으로 냈어.",
      },
      {
        tone: "daily",
        en: { us: "Credit or debit? — Debit, please." },
        ko: "신용인가요, 체크인가요? — 체크로 할게요.",
      },
      {
        tone: "business",
        en: { us: "Your debit card will be posted within five business days." },
        ko: "체크카드는 영업일 기준 5일 이내에 발송됩니다.",
      },
    ],
  },
  {
    id: "a2-w034",
    level: "A2",
    topic: "bank",
    word: { us: "deposit" },
    ipa: { us: "dɪˈpɑːzɪt" },
    hangul: "디파짓",
    meaning: "입금(하다)",
    collocations: ["deposit cash", "make a deposit", "a direct deposit"],
    examples: [
      {
        tone: "friend",
        en: { us: "I deposited three hundred bucks into my savings today." },
        ko: "오늘 적금 계좌에 300달러 넣었어.",
      },
      {
        tone: "daily",
        en: { us: "I'd like to deposit this cash into my account." },
        ko: "이 현금을 제 계좌에 입금하고 싶어요.",
      },
      {
        tone: "business",
        en: {
          us: "Deposits after 5 p.m. are processed the next business day.",
        },
        ko: "오후 5시 이후 입금은 다음 영업일에 처리됩니다.",
      },
    ],
  },
  {
    id: "a2-w035",
    level: "A2",
    topic: "bank",
    word: { us: "statement" },
    ipa: { us: "ˈsteɪtmənt" },
    hangul: "스테이트먼트",
    meaning: "거래 내역서, 명세서",
    nuance:
      "비자 신청이나 집 구할 때 bank statement 제출을 요구받을 수 있어요.",
    collocations: [
      "a bank statement",
      "download a statement",
      "a monthly statement",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I checked my statement and cried a little." },
        ko: "거래 내역 확인하고 살짝 울었어.",
      },
      {
        tone: "daily",
        en: { us: "How can I download my bank statement from the app?" },
        ko: "앱에서 거래 내역서를 어떻게 내려받나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please attach a recent bank statement to your application.",
        },
        ko: "신청서에 최근 은행 거래 내역서를 첨부해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w036",
    level: "A2",
    topic: "bank",
    word: { us: "savings account" },
    ipa: { us: "ˈseɪvɪŋz əˈkaʊnt" },
    hangul: "세이빙스 어카운트",
    meaning: "저축 예금 계좌",
    nuance: "생활비를 넣어 두는 계좌와 따로 만들어 두면 저축이 훨씬 쉬워져요.",
    collocations: [
      "open a savings account",
      "move it to my savings account",
      "a high-interest savings account",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I move a bit into my savings account every payday." },
        ko: "나는 월급날마다 저축 계좌로 조금씩 옮겨 놔.",
      },
      {
        tone: "daily",
        en: { us: "Can I open a savings account with the same bank?" },
        ko: "같은 은행에서 저축 계좌를 하나 더 열 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "This savings account has no monthly account-keeping fee." },
        ko: "이 저축 계좌는 월 계좌 유지 수수료가 없습니다.",
      },
    ],
  },
  {
    id: "a2-w037",
    level: "A2",
    topic: "bank",
    word: { us: "contactless" },
    ipa: { us: "ˈkɑːntæktləs" },
    hangul: "컨택트리스",
    meaning: "비접촉(카드를 대기만 하는) 결제의",
    nuance:
      "호주는 대부분의 결제가 카드를 대는 방식이에요. 점원이 'tap' 이라고 짧게 말하기도 합니다.",
    collocations: [
      "contactless payment",
      "is contactless okay",
      "tap for contactless",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Just tap — everything here is contactless." },
        ko: "그냥 대면 돼. 여기는 다 비접촉 결제야.",
      },
      {
        tone: "daily",
        en: { us: "Is contactless okay, or do I need to insert the card?" },
        ko: "카드를 대도 되나요, 아니면 넣어야 하나요?",
      },
      {
        tone: "business",
        en: { us: "Contactless payments are limited to two hundred dollars." },
        ko: "비접촉 결제는 200달러까지만 가능합니다.",
      },
    ],
  },
  {
    id: "a2-w038",
    level: "A2",
    topic: "bank",
    word: { us: "branch" },
    ipa: { us: "bræntʃ", au: "braːntʃ" },
    hangul: "브랜치",
    meaning: "(은행) 지점",
    collocations: [
      "the nearest branch",
      "visit a branch",
      "branch opening hours",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The branch near ours closes at four, so hurry." },
        ko: "우리 집 근처 지점 4시에 닫아, 서둘러.",
      },
      {
        tone: "daily",
        en: { us: "Do I need to visit a branch to change my address?" },
        ko: "주소 변경하려면 지점에 직접 가야 하나요?",
      },
      {
        tone: "business",
        en: { us: "This service is available at any branch nationwide." },
        ko: "이 서비스는 전국 모든 지점에서 이용 가능합니다.",
      },
    ],
  },
  {
    id: "a2-w039",
    level: "A2",
    topic: "bank",
    word: { us: "exchange rate" },
    ipa: { us: "ɪksˈtʃeɪndʒ reɪt" },
    hangul: "익스체인지 레이트",
    meaning: "환율",
    collocations: [
      "a good exchange rate",
      "check the exchange rate",
      "today's exchange rate",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The exchange rate is terrible this week, don't send money.",
        },
        ko: "이번 주 환율 최악이야, 돈 보내지 마.",
      },
      {
        tone: "daily",
        en: { us: "What is the exchange rate for Korean won today?" },
        ko: "오늘 한국 원 환율이 어떻게 되나요?",
      },
      {
        tone: "business",
        en: { us: "The exchange rate shown includes our service margin." },
        ko: "표시된 환율에는 당사 서비스 마진이 포함되어 있습니다.",
      },
    ],
  },
  {
    id: "a2-w040",
    level: "A2",
    topic: "bank",
    word: { us: "interest" },
    ipa: { us: "ˈɪntrəst" },
    hangul: "인터레스트",
    meaning: "이자",
    nuance: "예금 이자도, 대출 이자도 모두 interest예요.",
    collocations: ["earn interest", "an interest rate", "pay interest"],
    examples: [
      {
        tone: "friend",
        en: { us: "My savings account barely earns any interest." },
        ko: "내 적금 계좌는 이자가 거의 안 붙어.",
      },
      {
        tone: "daily",
        en: { us: "What interest rate does this savings account offer?" },
        ko: "이 예금 계좌 이자율은 어떻게 되나요?",
      },
      {
        tone: "business",
        en: { us: "Interest is calculated daily and paid monthly." },
        ko: "이자는 일 단위로 계산되어 매월 지급됩니다.",
      },
    ],
  },
  // ── cafe ──────────────────────────────────────────────
  {
    id: "a2-w041",
    level: "A2",
    topic: "cafe",
    word: { us: "takeout", au: "takeaway" },
    ipa: { us: "ˈteɪkaʊt", au: "ˈteɪkəweɪ" },
    hangul: "테이크아웃",
    meaning: "포장 (음식)",
    nuance:
      '호주에서 주문할 때 "Takeaway, please."라고 하면 포장이라는 뜻이에요.',
    collocations: ["order takeout", "a takeout coffee", "takeout only"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Let's just get takeout and watch a movie.",
          au: "Let's just get takeaway and watch a movie.",
        },
        ko: "그냥 포장해 와서 영화나 보자.",
      },
      {
        tone: "daily",
        en: {
          us: "I'd like to order some takeout, please.",
          au: "I'd like to order some takeaway, please.",
        },
        ko: "포장 주문 좀 하려고 하는데요.",
      },
      {
        tone: "business",
        en: {
          us: "Takeout orders can be placed through our website.",
          au: "Takeaway orders can be placed through our website.",
        },
        ko: "포장 주문은 저희 웹사이트를 통해 하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w042",
    level: "A2",
    topic: "cafe",
    word: { us: "long black" },
    ipa: { us: "ˈlɔːŋ blæk" },
    hangul: "롱 블랙",
    meaning: "롱블랙(뜨거운 물에 에스프레소를 부은 커피)",
    nuance:
      "아메리카노와 비슷하지만 물 위에 에스프레소를 부어 크레마가 살아 있어요. 호주 카페 기본 메뉴입니다.",
    collocations: [
      "a long black, please",
      "a long black with room",
      "short black or long black",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I always get a long black in the morning." },
        ko: "나는 아침엔 항상 롱블랙 마셔.",
      },
      {
        tone: "daily",
        en: { us: "Can I get a large long black to go?" },
        ko: "롱블랙 큰 걸로 테이크아웃 할 수 있을까요?",
      },
      {
        tone: "business",
        en: { us: "A long black is a double shot poured over hot water." },
        ko: "롱블랙은 뜨거운 물 위에 더블 샷을 부은 커피입니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "americano",
  },
  {
    id: "a2-w043",
    level: "A2",
    topic: "cafe",
    word: { us: "pastry" },
    ipa: { us: "ˈpeɪstri" },
    hangul: "페이스트리",
    meaning: "페이스트리, 빵류",
    collocations: [
      "a pastry with my coffee",
      "the pastries are fresh",
      "warm up the pastry",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Grab a pastry too — they're half price after four." },
        ko: "페이스트리도 하나 사. 4시 넘으면 반값이야.",
      },
      {
        tone: "daily",
        en: { us: "Are the pastries baked here?" },
        ko: "페이스트리는 여기서 굽나요?",
      },
      {
        tone: "business",
        en: { us: "Would you like your pastry warmed up?" },
        ko: "페이스트리를 데워 드릴까요?",
      },
    ],
  },
  {
    id: "a2-w044",
    level: "A2",
    topic: "cafe",
    word: { us: "refill" },
    ipa: { us: "ˈriːfɪl" },
    hangul: "리필",
    meaning: "리필, 다시 채움",
    nuance: "호주 카페는 미국과 달리 무료 리필이 드물어요.",
    collocations: ["a free refill", "get a refill", "refill your water bottle"],
    examples: [
      {
        tone: "friend",
        en: { us: "Do you think they do free refills here?" },
        ko: "여기 무료 리필 될 것 같아?",
      },
      {
        tone: "daily",
        en: { us: "Could I get a refill of iced tea, please?" },
        ko: "아이스티 리필 좀 받을 수 있을까요?",
      },
      {
        tone: "business",
        en: { us: "Refills are complimentary with any lunch set." },
        ko: "점심 세트 주문 시 리필은 무료로 제공됩니다.",
      },
    ],
  },
  {
    id: "a2-w045",
    level: "A2",
    topic: "cafe",
    word: { us: "decaf" },
    ipa: { us: "ˈdiːkæf" },
    hangul: "디캐프",
    meaning: "디카페인 커피",
    collocations: ["a decaf latte", "switch to decaf", "order decaf"],
    examples: [
      {
        tone: "friend",
        en: { us: "I switched to decaf because I couldn't sleep." },
        ko: "잠이 안 와서 디카페인으로 바꿨어.",
      },
      {
        tone: "daily",
        en: { us: "Can I get this latte as a decaf?" },
        ko: "이 라테 디카페인으로 받을 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Decaf options are available for all espresso drinks." },
        ko: "모든 에스프레소 음료는 디카페인으로 주문 가능합니다.",
      },
    ],
  },
  {
    id: "a2-w046",
    level: "A2",
    topic: "cafe",
    word: { us: "extra shot" },
    ipa: { us: "ˈɛkstrə ʃɑːt" },
    hangul: "엑스트라 샷",
    meaning: "샷 추가",
    collocations: [
      "with an extra shot",
      "add an extra shot",
      "an extra shot is fifty cents",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Get an extra shot — you look wrecked." },
        ko: "샷 추가해. 너 완전 피곤해 보여.",
      },
      {
        tone: "daily",
        en: { us: "Could I have an extra shot in that, please?" },
        ko: "거기에 샷 하나 추가해 주시겠어요?",
      },
      {
        tone: "business",
        en: { us: "An extra shot is fifty cents on any coffee." },
        ko: "모든 커피에 샷 추가는 50센트입니다.",
      },
    ],
  },
  {
    id: "a2-w047",
    level: "A2",
    topic: "cafe",
    word: { us: "oat milk" },
    ipa: { us: "ˈoʊt mɪlk" },
    hangul: "오트 밀크",
    meaning: "귀리 우유",
    nuance:
      "호주 카페에서 가장 흔한 대체 우유예요. 보통 50센트 정도 추가 요금이 붙습니다.",
    collocations: [
      "with oat milk",
      "swap it for oat milk",
      "we're out of oat milk",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Get it with oat milk — it's way better here." },
        ko: "귀리 우유로 시켜. 여기는 그게 훨씬 나아.",
      },
      {
        tone: "daily",
        en: { us: "Can I get a flat white with oat milk, please?" },
        ko: "플랫 화이트 귀리 우유로 주시겠어요?",
      },
      {
        tone: "business",
        en: { us: "Alternative milks, including oat, are fifty cents extra." },
        ko: "귀리 우유를 비롯한 대체 우유는 50센트가 추가됩니다.",
      },
    ],
  },
  {
    id: "a2-w048",
    level: "A2",
    topic: "cafe",
    word: { us: "reservation", au: "booking" },
    ipa: { us: "ˌrezərˈveɪʃən", au: "ˈbʊkɪŋ" },
    hangul: "레저베이션",
    meaning: "예약",
    nuance: "호주에서는 식당 예약을 보통 booking이라고 해요.",
    collocations: [
      "make a reservation",
      "cancel a reservation",
      "a reservation for two",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Did you make a reservation for tonight?",
          au: "Did you make a booking for tonight?",
        },
        ko: "오늘 저녁 예약해 놨어?",
      },
      {
        tone: "daily",
        en: {
          us: "I have a reservation for two at seven.",
          au: "I have a booking for two at seven.",
        },
        ko: "7시에 두 명 예약했는데요.",
      },
      {
        tone: "business",
        en: {
          us: "Reservations can be changed up to two hours in advance.",
          au: "Bookings can be changed up to two hours in advance.",
        },
        ko: "예약은 2시간 전까지 변경하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w049",
    level: "A2",
    topic: "cafe",
    word: { us: "sparkling water" },
    ipa: { us: "ˈspɑːrklɪŋ ˌwɔːtər" },
    hangul: "스파클링 워터",
    meaning: "탄산수",
    nuance: "still water는 일반 생수, tap water는 무료로 주는 수돗물이에요.",
    collocations: [
      "still or sparkling water",
      "a bottle of sparkling water",
      "order sparkling water",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Why did we order sparkling water? It's so pricey." },
        ko: "우리 왜 탄산수 시켰지? 너무 비싸잖아.",
      },
      {
        tone: "daily",
        en: { us: "Just tap water for me, not sparkling water." },
        ko: "저는 탄산수 말고 그냥 수돗물 주세요.",
      },
      {
        tone: "business",
        en: { us: "Would you prefer still or sparkling water with your meal?" },
        ko: "식사에 일반 물과 탄산수 중 어느 것을 드릴까요?",
      },
    ],
  },
  {
    id: "a2-w050",
    level: "A2",
    topic: "cafe",
    word: { us: "barista" },
    ipa: { us: "bəˈriːstə" },
    hangul: "바리스타",
    meaning: "바리스타",
    nuance: "호주 카페 알바 지원 시 barista experience가 있으면 큰 장점이에요.",
    collocations: [
      "a skilled barista",
      "barista training",
      "work as a barista",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The barista there remembers my order every time." },
        ko: "거기 바리스타는 내 주문을 매번 기억해.",
      },
      {
        tone: "daily",
        en: { us: "I'm taking a barista course to find cafe work." },
        ko: "카페 일자리 구하려고 바리스타 수업을 듣고 있어요.",
      },
      {
        tone: "business",
        en: { us: "We are hiring an experienced barista for weekend shifts." },
        ko: "주말 근무 가능한 경력 바리스타를 채용하고 있습니다.",
      },
    ],
  },
  // ── shopping ──────────────────────────────────────────
  {
    id: "a2-w051",
    level: "A2",
    topic: "shopping",
    word: { us: "browse" },
    ipa: { us: "braʊz" },
    hangul: "브라우즈",
    meaning: "둘러보다, 구경하다",
    nuance:
      "점원이 도와줄까 물으면 'Just browsing, thanks.' 한마디로 정중히 넘길 수 있어요.",
    collocations: [
      "just browsing",
      "browse the shelves",
      "feel free to browse",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Let's just browse for a bit before we decide." },
        ko: "정하기 전에 조금만 둘러보자.",
      },
      {
        tone: "daily",
        en: { us: "I'm just browsing, thanks." },
        ko: "그냥 좀 둘러보는 거예요, 감사합니다.",
      },
      {
        tone: "business",
        en: { us: "Feel free to browse — let me know if you need a size." },
        ko: "편하게 둘러보시고 사이즈가 필요하시면 말씀해 주세요.",
      },
    ],
  },
  {
    id: "a2-w052",
    level: "A2",
    topic: "shopping",
    word: { us: "exchange" },
    ipa: { us: "ɪksˈtʃeɪndʒ" },
    hangul: "익스체인지",
    meaning: "교환(하다)",
    nuance: "쇼핑에서는 환전이 아니라 물건 교환을 뜻해요.",
    collocations: [
      "exchange an item",
      "exchange for a bigger size",
      "an even exchange",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I need to exchange these jeans for a smaller size." },
        ko: "이 청바지 작은 사이즈로 교환해야 해.",
      },
      {
        tone: "daily",
        en: { us: "Could I exchange this shirt? It doesn't fit." },
        ko: "이 셔츠 교환할 수 있을까요? 사이즈가 안 맞아서요.",
      },
      {
        tone: "business",
        en: { us: "Items may be exchanged within thirty days of purchase." },
        ko: "상품은 구매 후 30일 이내에 교환 가능합니다.",
      },
    ],
  },
  {
    id: "a2-w053",
    level: "A2",
    topic: "shopping",
    word: { us: "gift card" },
    ipa: { us: "ˈɡɪft kɑːrd" },
    hangul: "기프트 카드",
    meaning: "기프트 카드, 상품권",
    collocations: [
      "buy a gift card",
      "redeem a gift card",
      "a twenty-dollar gift card",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I got her a gift card since I couldn't decide." },
        ko: "뭘 살지 못 정해서 그냥 기프트 카드 사 줬어.",
      },
      {
        tone: "daily",
        en: { us: "Do you sell gift cards for this store?" },
        ko: "이 매장 기프트 카드도 판매하나요?",
      },
      {
        tone: "business",
        en: { us: "Gift cards are valid for three years from purchase." },
        ko: "기프트 카드는 구매일로부터 3년간 유효합니다.",
      },
    ],
  },
  {
    id: "a2-w054",
    level: "A2",
    topic: "shopping",
    word: { us: "reusable bag" },
    ipa: { us: "riˈuːzəbəl bæɡ" },
    hangul: "리유저블 백",
    meaning: "장바구니, 재사용 봉투",
    nuance:
      "호주는 일회용 비닐봉지가 금지라 장바구니를 안 가져가면 봉투를 사야 해요.",
    collocations: [
      "bring a reusable bag",
      "buy a reusable bag",
      "do you need a bag",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Grab a reusable bag — they don't give out plastic here." },
        ko: "장바구니 챙겨. 여기 비닐봉지 안 줘.",
      },
      {
        tone: "daily",
        en: { us: "Do you have reusable bags for sale?" },
        ko: "장바구니 파는 거 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Reusable bags are available at the checkout for one dollar.",
        },
        ko: "장바구니는 계산대에서 1달러에 구매하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w055",
    level: "A2",
    topic: "shopping",
    word: { us: "barcode" },
    ipa: { us: "ˈbɑːrkoʊd" },
    hangul: "바코드",
    meaning: "바코드",
    collocations: [
      "scan the barcode",
      "the barcode won't scan",
      "the barcode is smudged",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The barcode won't scan — just type the number in." },
        ko: "바코드가 안 찍혀. 그냥 번호 입력해.",
      },
      {
        tone: "daily",
        en: { us: "Sorry, the barcode on this one is torn." },
        ko: "죄송해요, 이거 바코드가 찢어져 있어요.",
      },
      {
        tone: "business",
        en: { us: "Please scan the barcode on the back of the receipt." },
        ko: "영수증 뒷면의 바코드를 스캔해 주십시오.",
      },
    ],
  },
  {
    id: "a2-w056",
    level: "A2",
    topic: "shopping",
    word: { us: "out of stock" },
    ipa: { us: "ˌaʊt əv ˈstɑːk" },
    hangul: "아웃 오브 스톡",
    meaning: "품절인, 재고가 없는",
    nuance: "반대말 in stock도 함께 알아 두면 좋아요.",
    collocations: [
      "completely out of stock",
      "back in stock",
      "out of stock online",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The shoes I wanted are out of stock everywhere." },
        ko: "내가 원하던 신발 어디서나 다 품절이야.",
      },
      {
        tone: "daily",
        en: { us: "Is this size out of stock, or do you have more?" },
        ko: "이 사이즈는 품절인가요, 아니면 더 있나요?",
      },
      {
        tone: "business",
        en: { us: "That model is currently out of stock until next month." },
        ko: "해당 모델은 다음 달까지 재고가 없습니다.",
      },
    ],
  },
  {
    id: "a2-w057",
    level: "A2",
    topic: "shopping",
    word: { us: "warranty" },
    ipa: { us: "ˈwɔːrənti", au: "ˈwɒrənti" },
    hangul: "워런티",
    meaning: "품질 보증(서)",
    collocations: [
      "a one-year warranty",
      "under warranty",
      "an extended warranty",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Relax, your laptop is still under warranty." },
        ko: "걱정 마, 네 노트북 아직 보증 기간이야.",
      },
      {
        tone: "daily",
        en: { us: "Does this phone come with a two-year warranty?" },
        ko: "이 휴대폰은 2년 보증이 포함되어 있나요?",
      },
      {
        tone: "business",
        en: { us: "The warranty does not cover accidental water damage." },
        ko: "보증은 우발적인 침수 손상에는 적용되지 않습니다.",
      },
    ],
  },
  {
    id: "a2-w058",
    level: "A2",
    topic: "shopping",
    word: { us: "bargain" },
    ipa: { us: "ˈbɑːrɡɪn" },
    hangul: "바긴",
    meaning: "싸게 잘 산 물건, 특가",
    nuance: "'What a bargain!' 은 '완전 싸게 샀다' 는 감탄이에요.",
    collocations: ["what a bargain", "a real bargain", "bargain bin"],
    examples: [
      {
        tone: "friend",
        en: { us: "Ten dollars for this jacket? What a bargain!" },
        ko: "이 재킷이 10달러라고? 완전 싸게 샀네!",
      },
      {
        tone: "daily",
        en: { us: "The winter coats are a real bargain right now." },
        ko: "지금 겨울 코트가 정말 싸요.",
      },
      {
        tone: "business",
        en: { us: "Bargain items are final sale and cannot be returned." },
        ko: "특가 상품은 최종 판매이며 반품이 불가합니다.",
      },
    ],
  },
  {
    id: "a2-w059",
    level: "A2",
    topic: "shopping",
    word: { us: "try on" },
    ipa: { us: "ˈtraɪ ɑːn" },
    hangul: "트라이 온",
    meaning: "입어 보다, 신어 보다",
    nuance: "대명사가 목적어면 반드시 사이에 넣어요. try it on ○ / try on it ×",
    collocations: ["try it on", "can I try this on", "try on a smaller size"],
    examples: [
      {
        tone: "friend",
        en: { us: "Try it on first — the sizes here run small." },
        ko: "일단 입어 봐. 여기 사이즈가 작게 나와.",
      },
      {
        tone: "daily",
        en: { us: "Can I try this on before I buy it?" },
        ko: "사기 전에 이거 입어 봐도 될까요?",
      },
      {
        tone: "business",
        en: { us: "You may try on up to six items at a time." },
        ko: "한 번에 최대 6개 품목까지 착용해 보실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w060",
    level: "A2",
    topic: "shopping",
    word: { us: "defective", au: "faulty" },
    ipa: { us: "dɪˈfektɪv", au: "ˈfɔːlti" },
    hangul: "디펙티브",
    meaning: "결함이 있는, 불량인",
    nuance: "호주 매장에서는 불량품을 faulty라고 하면 바로 알아들어요.",
    collocations: [
      "a defective product",
      "clearly defective",
      "return a defective item",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My new charger turned out to be defective.",
          au: "My new charger turned out to be faulty.",
        },
        ko: "새로 산 충전기 알고 보니 불량이었어.",
      },
      {
        tone: "daily",
        en: {
          us: "This kettle is defective, so I'd like a replacement.",
          au: "This kettle is faulty, so I'd like a replacement.",
        },
        ko: "이 주전자가 불량이라 교환하고 싶은데요.",
      },
      {
        tone: "business",
        en: {
          us: "Defective goods can be returned at any store location.",
          au: "Faulty goods can be returned at any store location.",
        },
        ko: "불량 상품은 모든 매장에서 반품하실 수 있습니다.",
      },
    ],
  },
  // ── transport ─────────────────────────────────────────
  {
    id: "a2-w061",
    level: "A2",
    topic: "transport",
    word: { us: "taxi rank" },
    ipa: { us: "ˈtæksi ræŋk" },
    hangul: "택시 랭크",
    meaning: "택시 승강장",
    nuance:
      "호주에서는 길에서 손을 드는 것보다 승강장에서 타는 게 일반적이에요.",
    collocations: [
      "the taxi rank outside",
      "wait at the taxi rank",
      "the nearest taxi rank",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The taxi rank is just past the station entrance." },
        ko: "택시 승강장은 역 입구 바로 지나서 있어.",
      },
      {
        tone: "daily",
        en: { us: "Where's the nearest taxi rank?" },
        ko: "가장 가까운 택시 승강장이 어디예요?",
      },
      {
        tone: "business",
        en: {
          us: "A taxi rank is located at the northern end of the terminal.",
        },
        ko: "택시 승강장은 터미널 북쪽 끝에 있습니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "taxi stand",
  },
  {
    id: "a2-w062",
    level: "A2",
    topic: "transport",
    word: { us: "one-way" },
    ipa: { us: "ˈwʌn weɪ" },
    hangul: "원웨이",
    meaning: "편도(의)",
    collocations: ["a one-way ticket", "one-way or return", "a one-way street"],
    examples: [
      {
        tone: "friend",
        en: { us: "I only booked a one-way ticket, so I'm staying a while." },
        ko: "편도만 끊어서 한동안 있을 거야.",
      },
      {
        tone: "daily",
        en: { us: "Is it cheaper to buy one-way or return?" },
        ko: "편도가 싼가요, 왕복이 싼가요?",
      },
      {
        tone: "business",
        en: { us: "One-way fares are non-refundable after departure." },
        ko: "편도 요금은 출발 이후 환불되지 않습니다.",
      },
    ],
  },
  {
    id: "a2-w063",
    level: "A2",
    topic: "transport",
    word: { us: "Myki" },
    ipa: { us: "ˈmaɪkiː" },
    hangul: "마이키",
    meaning: "멜버른 대중교통 교통카드",
    nuance: "시드니는 Opal, 브리즈번은 Go Card처럼 도시마다 이름이 달라요.",
    collocations: ["top up a Myki", "tap on with a Myki", "a Myki card"],
    examples: [
      {
        tone: "friend",
        en: { us: "My Myki is empty again, so I can't get on." },
        ko: "내 마이키 또 잔액이 없어서 못 타.",
      },
      {
        tone: "daily",
        en: { us: "Where can I add money to my Myki around here?" },
        ko: "이 근처 어디에서 마이키를 충전할 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Please tap your Myki on the reader before boarding." },
        ko: "탑승 전에 리더기에 마이키를 태그해 주시기 바랍니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "transit card",
  },
  {
    id: "a2-w064",
    level: "A2",
    topic: "transport",
    word: { us: "tram" },
    ipa: { us: "træm" },
    hangul: "트램",
    meaning: "노면 전차",
    nuance:
      "멜버른 시내(Free Tram Zone)에서는 무료예요. 그 밖에서는 반드시 카드를 태그해야 합니다.",
    collocations: ["catch a tram", "the tram stop", "the free tram zone"],
    examples: [
      {
        tone: "friend",
        en: { us: "Just catch the tram — it's free in the city." },
        ko: "그냥 트램 타. 시내는 무료야.",
      },
      {
        tone: "daily",
        en: { us: "Does this tram go to Flinders Street?" },
        ko: "이 트램이 플린더스 스트리트로 가나요?",
      },
      {
        tone: "business",
        en: {
          us: "Passengers must touch on unless travelling in the free tram zone.",
        },
        ko: "무료 구간이 아닌 경우 승객은 반드시 카드를 태그해야 합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "streetcar",
  },
  {
    id: "a2-w065",
    level: "A2",
    topic: "transport",
    word: { us: "timetable" },
    ipa: { us: "ˈtaɪmˌteɪbəl" },
    hangul: "타임테이블",
    meaning: "운행 시간표",
    nuance: "호주에서는 schedule 보다 timetable 을 훨씬 자주 씁니다.",
    collocations: [
      "check the timetable",
      "the weekend timetable",
      "a changed timetable",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Check the timetable — buses are less frequent on Sunday." },
        ko: "시간표 확인해 봐. 일요일엔 버스가 덜 다녀.",
      },
      {
        tone: "daily",
        en: { us: "Where can I find the timetable for this line?" },
        ko: "이 노선 시간표는 어디서 볼 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "A reduced timetable will apply on public holidays." },
        ko: "공휴일에는 감축 운행 시간표가 적용됩니다.",
      },
    ],
  },
  {
    id: "a2-w066",
    level: "A2",
    topic: "transport",
    word: { us: "rush hour", au: "peak hour" },
    ipa: { us: "ˈrʌʃ aʊər", au: "ˈpiːk aʊə" },
    hangul: "러시 아워",
    meaning: "혼잡 시간대, 출퇴근 시간",
    nuance: "호주에서는 peak hour가 더 자연스럽고 이 시간대에는 요금도 비싸요.",
    collocations: ["avoid rush hour", "during rush hour", "rush hour traffic"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Let's leave early and beat the rush hour.",
          au: "Let's leave early and beat the peak hour.",
        },
        ko: "일찍 나가서 혼잡 시간 피하자.",
      },
      {
        tone: "daily",
        en: {
          us: "The bus gets really crowded during rush hour.",
          au: "The bus gets really crowded during peak hour.",
        },
        ko: "버스는 혼잡 시간대에 정말 붐벼요.",
      },
      {
        tone: "business",
        en: {
          us: "Higher rush hour fares apply on weekdays before nine.",
          au: "Higher peak hour fares apply on weekdays before nine.",
        },
        ko: "평일 9시 이전에는 혼잡 시간 요금이 적용됩니다.",
      },
    ],
  },
  {
    id: "a2-w067",
    level: "A2",
    topic: "transport",
    word: { us: "gas station", au: "petrol station" },
    ipa: { us: "ˈɡæs ˌsteɪʃən", au: "ˈpetrəl ˌsteɪʃən" },
    hangul: "개스 스테이션",
    meaning: "주유소",
    nuance:
      "호주에서는 휘발유를 petrol이라 하고, 주유소를 servo로 줄여 부르기도 해요.",
    collocations: [
      "stop at a gas station",
      "the nearest gas station",
      "a 24-hour gas station",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Pull over at the next gas station, we're almost empty.",
          au: "Pull over at the next petrol station, we're almost empty.",
        },
        ko: "다음 주유소에서 세워, 기름 거의 없어.",
      },
      {
        tone: "daily",
        en: {
          us: "Is there a gas station on the way to the beach?",
          au: "Is there a petrol station on the way to the beach?",
        },
        ko: "해변 가는 길에 주유소가 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Our gas stations are open twenty-four hours a day.",
          au: "Our petrol stations are open twenty-four hours a day.",
        },
        ko: "저희 주유소는 하루 24시간 운영합니다.",
      },
    ],
  },
  {
    id: "a2-w068",
    level: "A2",
    topic: "transport",
    word: { us: "parking fine" },
    ipa: { us: "ˈpɑːrkɪŋ faɪn" },
    hangul: "파킹 파인",
    meaning: "주차 위반 과태료",
    nuance:
      "호주 도심은 주차 단속이 촘촘하고 금액도 커요. 표지판의 시간 제한을 꼭 확인하세요.",
    collocations: [
      "get a parking fine",
      "pay the parking fine",
      "appeal a parking fine",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I got a parking fine for being ten minutes over." },
        ko: "10분 넘겼다고 주차 위반 딱지 끊겼어.",
      },
      {
        tone: "daily",
        en: { us: "Can I pay the parking fine online?" },
        ko: "주차 과태료를 온라인으로 낼 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Parking fines must be paid within twenty-one days." },
        ko: "주차 과태료는 21일 이내에 납부하셔야 합니다.",
      },
    ],
  },
  {
    id: "a2-w069",
    level: "A2",
    topic: "transport",
    word: { us: "traffic jam" },
    ipa: { us: "ˈtræfɪk dʒæm" },
    hangul: "트래픽 잼",
    meaning: "교통 체증",
    collocations: [
      "stuck in a traffic jam",
      "a huge traffic jam",
      "cause a traffic jam",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Sorry I'm late, I was stuck in a traffic jam." },
        ko: "늦어서 미안, 교통 체증에 갇혀 있었어.",
      },
      {
        tone: "daily",
        en: { us: "Is there usually a traffic jam on this road?" },
        ko: "이 길은 보통 교통 체증이 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "A traffic jam on the highway delayed this morning's delivery.",
          au: "A traffic jam on the motorway delayed this morning's delivery.",
        },
        ko: "고속도로 정체로 오늘 아침 배송이 지연되었습니다.",
      },
    ],
  },
  {
    id: "a2-w070",
    level: "A2",
    topic: "transport",
    word: { us: "commute" },
    ipa: { us: "kəˈmjuːt" },
    hangul: "커뮤트",
    meaning: "통근(하다), 통근길",
    nuance: "명사로 '통근 거리', 동사로 '통근하다' 둘 다 자주 씁니다.",
    collocations: ["a long commute", "commute to work", "the daily commute"],
    examples: [
      {
        tone: "friend",
        en: { us: "My commute takes almost an hour each way." },
        ko: "내 통근길은 편도로 거의 한 시간 걸려.",
      },
      {
        tone: "daily",
        en: { us: "How long is your commute to the restaurant?" },
        ko: "식당까지 통근 시간이 얼마나 걸리세요?",
      },
      {
        tone: "business",
        en: { us: "Staff who commute by train may claim a travel allowance." },
        ko: "기차로 통근하는 직원은 교통비를 청구하실 수 있습니다.",
      },
    ],
  },
  // ── health ────────────────────────────────────────────
  {
    id: "a2-w071",
    level: "A2",
    topic: "health",
    word: { us: "rash" },
    ipa: { us: "ræʃ" },
    hangul: "래시",
    meaning: "발진, 두드러기",
    nuance:
      "약국에서 증상을 말할 때 바로 통하는 단어예요. 가려우면 itchy 를 함께 씁니다.",
    collocations: ["I have a rash", "an itchy rash", "the rash is spreading"],
    examples: [
      {
        tone: "friend",
        en: { us: "I got an itchy rash after the beach yesterday." },
        ko: "어제 해변 다녀오고 나서 가려운 발진이 났어.",
      },
      {
        tone: "daily",
        en: { us: "I have a rash on my arm — do you have a cream for it?" },
        ko: "팔에 발진이 났는데 바르는 약 있나요?",
      },
      {
        tone: "business",
        en: { us: "If the rash spreads or you develop a fever, see a doctor." },
        ko: "발진이 번지거나 열이 나면 의사의 진료를 받으십시오.",
      },
    ],
  },
  {
    id: "a2-w072",
    level: "A2",
    topic: "health",
    word: { us: "Medicare card" },
    ipa: { us: "ˈmɛdɪkɛr kɑːrd" },
    hangul: "메디케어 카드",
    meaning: "호주 공공 의료 카드",
    nuance:
      "상호 협정이 있는 나라 국민만 받을 수 있어요. 한국은 대상이 아니라 워홀러는 보통 사보험을 씁니다.",
    collocations: [
      "do you have a Medicare card",
      "show your Medicare card",
      "without a Medicare card",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I don't have a Medicare card, so I paid the full price." },
        ko: "나 메디케어 카드가 없어서 진료비 다 냈어.",
      },
      {
        tone: "daily",
        en: { us: "Sorry, I'm on a working holiday visa — no Medicare card." },
        ko: "죄송해요, 저는 워홀 비자라 메디케어 카드가 없어요.",
      },
      {
        tone: "business",
        en: { us: "Please present your Medicare card at reception." },
        ko: "접수처에서 메디케어 카드를 제시해 주십시오.",
      },
    ],
    auOnly: true,
    usEquivalent: "health insurance card",
  },
  {
    id: "a2-w073",
    level: "A2",
    topic: "health",
    word: { us: "walk-in clinic" },
    ipa: { us: "ˈwɔːk ɪn ˈklɪnɪk" },
    hangul: "워크인 클리닉",
    meaning: "예약 없이 갈 수 있는 진료소",
    nuance: "예약이 안 잡힐 때 쓰는 선택지예요. 대기 시간이 길 수 있습니다.",
    collocations: [
      "find a walk-in clinic",
      "go to a walk-in clinic",
      "the walk-in clinic is open until",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "There's a walk-in clinic near the station if it gets worse.",
        },
        ko: "더 심해지면 역 근처에 예약 없이 가는 진료소 있어.",
      },
      {
        tone: "daily",
        en: { us: "Is there a walk-in clinic open on Sunday around here?" },
        ko: "이 근처에 일요일에 문 여는 무예약 진료소가 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Our walk-in clinic accepts patients until six on weekdays.",
        },
        ko: "저희 무예약 진료소는 평일 6시까지 환자를 받습니다.",
      },
    ],
  },
  {
    id: "a2-w074",
    level: "A2",
    topic: "health",
    word: { us: "bulk billing" },
    ipa: { us: "ˈbʌlk ˌbɪlɪŋ" },
    hangul: "벌크 빌링",
    meaning: "본인 부담금 없는 진료 (병원이 정부에 전액 청구)",
    nuance:
      "bulk billing 병원은 Medicare 카드만 있으면 진료비를 따로 내지 않아요.",
    collocations: [
      "a bulk billing clinic",
      "offer bulk billing",
      "bulk billing is available",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "That clinic does bulk billing, so it costs nothing." },
        ko: "그 병원은 벌크 빌링이라서 돈이 안 들어.",
      },
      {
        tone: "daily",
        en: { us: "Is bulk billing available at this clinic?" },
        ko: "이 병원은 벌크 빌링이 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Bulk billing applies only to patients with a valid Medicare card.",
        },
        ko: "벌크 빌링은 유효한 메디케어 카드 소지자에게만 적용됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "direct billing",
  },
  {
    id: "a2-w075",
    level: "A2",
    topic: "health",
    word: { us: "symptom" },
    ipa: { us: "ˈsɪmptəm" },
    hangul: "심텀",
    meaning: "증상",
    collocations: [
      "describe your symptoms",
      "flu symptoms",
      "symptoms get worse",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "My symptoms got worse after work last night." },
        ko: "어젯밤 일 끝나고 증상이 더 심해졌어.",
      },
      {
        tone: "daily",
        en: { us: "I've had these symptoms for about three days." },
        ko: "이 증상이 사흘쯤 됐어요.",
      },
      {
        tone: "business",
        en: { us: "Please describe your symptoms in detail on this form." },
        ko: "이 양식에 증상을 자세히 적어 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w076",
    level: "A2",
    topic: "health",
    word: { us: "sore throat" },
    ipa: { us: "ˌsɔːr ˈθroʊt" },
    hangul: "소어 쓰로트",
    meaning: "인후통, 목 아픔",
    collocations: [
      "have a sore throat",
      "a bad sore throat",
      "a sore throat and a cough",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I've had a sore throat since Sunday and it's awful." },
        ko: "일요일부터 목이 아픈데 진짜 괴로워.",
      },
      {
        tone: "daily",
        en: { us: "I have a sore throat and a slight fever." },
        ko: "목이 아프고 미열이 있어요.",
      },
      {
        tone: "business",
        en: { us: "If the sore throat continues, please come back next week." },
        ko: "인후통이 계속되면 다음 주에 다시 내원해 주십시오.",
      },
    ],
  },
  {
    id: "a2-w077",
    level: "A2",
    topic: "health",
    word: { us: "dosage" },
    ipa: { us: "ˈdoʊsɪdʒ" },
    hangul: "도시지",
    meaning: "복용량",
    nuance: "약국에서 약을 받을 때 약사가 반드시 확인해 주는 정보예요.",
    collocations: [
      "the recommended dosage",
      "check the dosage",
      "don't exceed the dosage",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Check the dosage on the box before you take two." },
        ko: "두 알 먹기 전에 상자에 적힌 복용량 확인해 봐.",
      },
      {
        tone: "daily",
        en: { us: "What's the dosage for an adult?" },
        ko: "성인 복용량이 어떻게 되나요?",
      },
      {
        tone: "business",
        en: { us: "Do not exceed the recommended dosage in 24 hours." },
        ko: "24시간 이내에 권장 복용량을 초과하지 마십시오.",
      },
    ],
  },
  {
    id: "a2-w078",
    level: "A2",
    topic: "health",
    word: { us: "family doctor", au: "GP" },
    ipa: { us: "ˈfæməli ˌdɑːktər", au: "ˌdʒiː ˈpiː" },
    hangul: "패밀리 닥터",
    meaning: "주치의, 일반의",
    nuance:
      "호주에서 전문의를 만나려면 먼저 GP에게 진료를 받고 소견서를 받아야 해요.",
    collocations: [
      "see your family doctor",
      "a local family doctor",
      "ask your family doctor",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "You should see a family doctor before it gets worse.",
          au: "You should see a GP before it gets worse.",
        },
        ko: "더 심해지기 전에 병원에 가 보는 게 좋겠어.",
      },
      {
        tone: "daily",
        en: {
          us: "I'm looking for a family doctor near my place.",
          au: "I'm looking for a GP near my place.",
        },
        ko: "집 근처 주치의를 찾고 있어요.",
      },
      {
        tone: "business",
        en: {
          us: "Your family doctor will need to send a referral first.",
          au: "Your GP will need to send a referral first.",
        },
        ko: "먼저 주치의가 소견서를 보내 주셔야 합니다.",
      },
    ],
  },
  {
    id: "a2-w079",
    level: "A2",
    topic: "health",
    word: { us: "health insurance" },
    ipa: { us: "ˈhelθ ɪnˌʃʊrəns" },
    hangul: "헬스 인슈어런스",
    meaning: "건강 보험",
    nuance:
      "워킹홀리데이 비자는 보통 Medicare 대상이 아니라서 사설 보험이 필요해요.",
    collocations: [
      "take out health insurance",
      "private health insurance",
      "health insurance covers",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Did you get health insurance before you flew over?" },
        ko: "너 오기 전에 건강 보험 들었어?",
      },
      {
        tone: "daily",
        en: { us: "Does my health insurance cover dental work?" },
        ko: "제 건강 보험이 치과 치료도 보장하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please provide your health insurance details at reception.",
        },
        ko: "접수처에 건강 보험 정보를 제공해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w080",
    level: "A2",
    topic: "health",
    word: { us: "side effect" },
    ipa: { us: "ˈsaɪd ɪˌfekt" },
    hangul: "사이드 이펙트",
    meaning: "부작용",
    collocations: [
      "a common side effect",
      "cause side effects",
      "mild side effects",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The pills made me sleepy, but that's a normal side effect.",
        },
        ko: "그 약 먹고 졸렸는데 흔한 부작용이래.",
      },
      {
        tone: "daily",
        en: { us: "Are there any side effects I should watch for?" },
        ko: "제가 주의해야 할 부작용이 있을까요?",
      },
      {
        tone: "business",
        en: { us: "Nausea is a common side effect of this medication." },
        ko: "메스꺼움은 이 약의 흔한 부작용입니다.",
      },
    ],
  },
  // ── phone ─────────────────────────────────────────────
  {
    id: "a2-w081",
    level: "A2",
    topic: "phone",
    word: { us: "hotspot" },
    ipa: { us: "ˈhɑːtspɑːt" },
    hangul: "핫스팟",
    meaning: "테더링, 휴대폰 무선 공유",
    nuance: "숙소 와이파이가 안 될 때 가장 많이 쓰는 임시 해결책이에요.",
    collocations: [
      "turn on my hotspot",
      "use my phone as a hotspot",
      "the hotspot password",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The Wi-Fi is down — I'll turn on my hotspot." },
        ko: "와이파이 안 돼. 내가 핫스팟 켤게.",
      },
      {
        tone: "daily",
        en: { us: "Could I use your hotspot for a minute?" },
        ko: "핫스팟 잠깐만 쓸 수 있을까요?",
      },
      {
        tone: "business",
        en: { us: "Hotspot usage counts toward your monthly data allowance." },
        ko: "핫스팟 사용량은 월 데이터 제공량에 포함됩니다.",
      },
    ],
  },
  {
    id: "a2-w082",
    level: "A2",
    topic: "phone",
    word: { us: "cell plan", au: "mobile plan" },
    ipa: { us: "ˈsel plæn", au: "ˈməʊbaɪl plæn" },
    hangul: "셀 플랜",
    meaning: "휴대폰 요금제",
    nuance: "약정 없이 미리 결제하고 쓰는 요금제는 prepaid라고 불러요.",
    collocations: [
      "a monthly cell plan",
      "switch cell plans",
      "a prepaid cell plan",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My cell plan is way too expensive for what I use.",
          au: "My mobile plan is way too expensive for what I use.",
        },
        ko: "내 요금제는 쓰는 양에 비해 너무 비싸.",
      },
      {
        tone: "daily",
        en: {
          us: "What's the cheapest cell plan you have right now?",
          au: "What's the cheapest mobile plan you have right now?",
        },
        ko: "지금 가장 저렴한 요금제가 어떤 건가요?",
      },
      {
        tone: "business",
        en: {
          us: "This cell plan includes unlimited calls within Australia.",
          au: "This mobile plan includes unlimited calls within Australia.",
        },
        ko: "이 요금제는 호주 내 무제한 통화를 포함합니다.",
      },
    ],
  },
  {
    id: "a2-w083",
    level: "A2",
    topic: "phone",
    word: { us: "eSIM" },
    ipa: { us: "ˈiː sɪm" },
    hangul: "이심",
    meaning: "내장형 심(물리 카드 없는 유심)",
    nuance: "도착 전에 미리 개통해 두면 공항에서 바로 데이터를 쓸 수 있어요.",
    collocations: [
      "activate an eSIM",
      "does your phone support eSIM",
      "scan the eSIM QR code",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I set up an eSIM before I flew, so I had data at the airport.",
        },
        ko: "출국 전에 이심 개통해 놔서 공항에서 바로 데이터 됐어.",
      },
      {
        tone: "daily",
        en: { us: "Do you sell eSIM plans for tourists?" },
        ko: "여행자용 이심 요금제 파나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your eSIM will activate within fifteen minutes of scanning.",
        },
        ko: "이심은 QR 코드를 스캔한 뒤 15분 이내에 개통됩니다.",
      },
    ],
  },
  {
    id: "a2-w084",
    level: "A2",
    topic: "phone",
    word: { us: "screenshot" },
    ipa: { us: "ˈskriːnʃɑːt" },
    hangul: "스크린샷",
    meaning: "화면 캡처(하다)",
    nuance: "예약 번호나 티켓을 캡처해 두라는 안내를 자주 들어요.",
    collocations: [
      "take a screenshot",
      "send me a screenshot",
      "a screenshot of the booking",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Send me a screenshot of the roster." },
        ko: "근무표 캡처해서 보내 줘.",
      },
      {
        tone: "daily",
        en: { us: "Should I take a screenshot of the confirmation?" },
        ko: "확인 화면을 캡처해 둬야 하나요?",
      },
      {
        tone: "business",
        en: { us: "Please keep a screenshot of your booking reference." },
        ko: "예약 번호 화면을 캡처해 보관해 주십시오.",
      },
    ],
  },
  {
    id: "a2-w085",
    level: "A2",
    topic: "phone",
    word: { us: "missed call" },
    ipa: { us: "ˈmɪst kɔːl" },
    hangul: "미스드 콜",
    meaning: "부재중 전화",
    collocations: [
      "I have a missed call",
      "return a missed call",
      "three missed calls",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I've got three missed calls from an unknown number." },
        ko: "모르는 번호로 부재중 전화가 세 통 와 있어.",
      },
      {
        tone: "daily",
        en: { us: "Sorry, I saw your missed call but I was on a shift." },
        ko: "죄송해요, 부재중 전화 봤는데 근무 중이었어요.",
      },
      {
        tone: "business",
        en: { us: "If we get a missed call, we'll try again within the hour." },
        ko: "부재중이시면 한 시간 이내에 다시 연락드리겠습니다.",
      },
    ],
  },
  {
    id: "a2-w086",
    level: "A2",
    topic: "phone",
    word: { us: "coverage" },
    ipa: { us: "ˈkʌvərɪdʒ" },
    hangul: "커버리지",
    meaning: "통신 가능 지역, 수신 범위",
    nuance: "시골 농장 지역은 통신사에 따라 신호가 아예 안 잡히기도 해요.",
    collocations: ["good coverage", "no coverage", "coverage in rural areas"],
    examples: [
      {
        tone: "friend",
        en: { us: "There's no coverage at the farm, so don't call me." },
        ko: "농장에서는 신호가 안 잡히니까 전화하지 마.",
      },
      {
        tone: "daily",
        en: { us: "Does this network have good coverage outside the city?" },
        ko: "이 통신사는 도시 밖에서도 신호가 잘 잡히나요?",
      },
      {
        tone: "business",
        en: { us: "Coverage maps are available on our official website." },
        ko: "통신 가능 지역 지도는 저희 공식 웹사이트에서 확인하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w087",
    level: "A2",
    topic: "phone",
    word: { us: "speakerphone" },
    ipa: { us: "ˈspiːkərfoʊn" },
    hangul: "스피커폰",
    meaning: "스피커폰",
    collocations: [
      "put me on speakerphone",
      "you're on speakerphone",
      "take it off speakerphone",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "You're on speakerphone — my housemate can hear you." },
        ko: "지금 스피커폰이야. 하우스메이트도 들려.",
      },
      {
        tone: "daily",
        en: { us: "Can I put you on speakerphone? I'm driving." },
        ko: "스피커폰으로 돌려도 될까요? 운전 중이라서요.",
      },
      {
        tone: "business",
        en: { us: "I'll put you on speakerphone so the team can hear." },
        ko: "팀원들도 들을 수 있게 스피커폰으로 전환하겠습니다.",
      },
    ],
  },
  {
    id: "a2-w088",
    level: "A2",
    topic: "phone",
    word: { us: "airplane mode" },
    ipa: { us: "ˈɛrpleɪn moʊd" },
    hangul: "에어플레인 모드",
    meaning: "비행기 모드",
    nuance: "해외 로밍 요금을 막고 싶을 때도 씁니다.",
    collocations: [
      "turn on airplane mode",
      "switch to airplane mode",
      "airplane mode is on",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Put it on airplane mode or you'll get roaming charges." },
        ko: "비행기 모드 켜. 안 그러면 로밍 요금 나와.",
      },
      {
        tone: "daily",
        en: { us: "Sorry, my phone was on airplane mode all morning." },
        ko: "죄송해요, 오전 내내 폰이 비행기 모드였어요.",
      },
      {
        tone: "business",
        en: {
          us: "Please switch your device to airplane mode before takeoff.",
        },
        ko: "이륙 전에 기기를 비행기 모드로 전환해 주십시오.",
      },
    ],
  },
  {
    id: "a2-w089",
    level: "A2",
    topic: "phone",
    word: { us: "power bank" },
    ipa: { us: "ˈpaʊər bæŋk" },
    hangul: "파워 뱅크",
    meaning: "보조 배터리",
    collocations: [
      "bring a power bank",
      "my power bank is dead",
      "charge the power bank",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Did you bring the power bank? My phone's at five percent." },
        ko: "보조 배터리 가져왔어? 내 폰 5퍼센트야.",
      },
      {
        tone: "daily",
        en: { us: "Do you sell power banks here?" },
        ko: "여기 보조 배터리 파나요?",
      },
      {
        tone: "business",
        en: { us: "Power banks must be carried in your hand luggage." },
        ko: "보조 배터리는 기내 수하물로 휴대하셔야 합니다.",
      },
    ],
  },
  {
    id: "a2-w090",
    level: "A2",
    topic: "phone",
    word: { us: "roaming" },
    ipa: { us: "ˈroʊmɪŋ" },
    hangul: "로밍",
    meaning: "(해외) 로밍",
    collocations: [
      "turn off roaming",
      "roaming charges",
      "international roaming",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Turn off roaming or you'll get a huge bill." },
        ko: "로밍 꺼, 안 그러면 요금 폭탄 맞아.",
      },
      {
        tone: "daily",
        en: { us: "Does my plan include roaming in New Zealand?" },
        ko: "제 요금제에 뉴질랜드 로밍이 포함되어 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "International roaming must be activated before you travel.",
        },
        ko: "국제 로밍은 출국 전에 미리 신청하셔야 합니다.",
      },
    ],
  },
  // ── emergency ─────────────────────────────────────────
  {
    id: "a2-w091",
    level: "A2",
    topic: "emergency",
    word: { us: "paramedic" },
    ipa: { us: "ˌpærəˈmɛdɪk" },
    hangul: "패러메딕",
    meaning: "구급대원",
    nuance:
      "구급차를 부르면 오는 사람이에요. 전화로 상태를 설명할 때 이 단어가 나옵니다.",
    collocations: [
      "the paramedics are on their way",
      "talk to the paramedic",
      "a paramedic checked him",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The paramedics got here in about five minutes." },
        ko: "구급대원들이 5분쯤 만에 도착했어.",
      },
      {
        tone: "daily",
        en: { us: "A paramedic is checking her breathing right now." },
        ko: "지금 구급대원이 그분 호흡을 확인하고 있어요.",
      },
      {
        tone: "business",
        en: { us: "Please stay on the line until the paramedics arrive." },
        ko: "구급대원이 도착할 때까지 전화를 끊지 말고 계셔 주십시오.",
      },
    ],
  },
  {
    id: "a2-w092",
    level: "A2",
    topic: "emergency",
    word: { us: "ER", au: "emergency department" },
    ipa: { us: "ˌiː ˈɑːr", au: "ɪˈmɜːdʒənsi dɪˈpɑːtmənt" },
    hangul: "이알",
    meaning: "응급실",
    nuance: "호주 병원 표지판에는 Emergency 또는 ED라고 적혀 있어요.",
    collocations: ["go to the ER", "the ER waiting room", "end up in the ER"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "We waited four hours in the ER last night.",
          au: "We waited four hours in the emergency department last night.",
        },
        ko: "어젯밤에 응급실에서 네 시간이나 기다렸어.",
      },
      {
        tone: "daily",
        en: {
          us: "How do I get to the ER from this entrance?",
          au: "How do I get to the emergency department from this entrance?",
        },
        ko: "이 입구에서 응급실로 어떻게 가나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please report to the ER reception desk immediately.",
          au: "Please report to the emergency department reception desk immediately.",
        },
        ko: "즉시 응급실 접수 창구로 오시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w093",
    level: "A2",
    topic: "emergency",
    word: { us: "first aid" },
    ipa: { us: "ˌfɜːrst ˈeɪd" },
    hangul: "퍼스트 에이드",
    meaning: "응급 처치",
    collocations: [
      "a first aid kit",
      "give first aid",
      "a first aid certificate",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Grab the first aid kit, she cut her finger." },
        ko: "구급상자 가져와, 쟤 손가락 베였어.",
      },
      {
        tone: "daily",
        en: { us: "Do you keep a first aid kit in the kitchen?" },
        ko: "주방에 구급상자를 두고 계신가요?",
      },
      {
        tone: "business",
        en: { us: "All staff must complete first aid training this month." },
        ko: "전 직원은 이번 달에 응급 처치 교육을 이수해야 합니다.",
      },
    ],
  },
  {
    id: "a2-w094",
    level: "A2",
    topic: "emergency",
    word: { us: "triple zero" },
    ipa: { us: "ˌtrɪpəl ˈzɪroʊ" },
    hangul: "트리플 지로",
    meaning: "호주 긴급 신고 번호 000",
    nuance:
      "경찰·소방·구급 모두 000으로 연결되고, 휴대폰에서는 112도 작동해요.",
    collocations: [
      "call triple zero",
      "dial triple zero",
      "a triple zero operator",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "If anything happens, just call triple zero right away." },
        ko: "무슨 일 생기면 바로 000으로 전화해.",
      },
      {
        tone: "daily",
        en: { us: "Do I call triple zero for a small kitchen fire?" },
        ko: "작은 주방 화재에도 000으로 전화하나요?",
      },
      {
        tone: "business",
        en: {
          us: "In an emergency, call triple zero before contacting management.",
        },
        ko: "응급 상황 시 관리자에게 연락하기 전에 먼저 000으로 신고하십시오.",
      },
    ],
    auOnly: true,
    usEquivalent: "911",
  },
  {
    id: "a2-w095",
    level: "A2",
    topic: "emergency",
    word: { us: "emergency contact" },
    ipa: { us: "ɪˈmɜːrdʒənsi ˈkɑːntækt" },
    hangul: "이머전시 컨택트",
    meaning: "비상 연락처",
    collocations: [
      "list an emergency contact",
      "your emergency contact details",
      "update your emergency contact",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Can I put you down as my emergency contact?" },
        ko: "너를 내 비상 연락처로 적어도 돼?",
      },
      {
        tone: "daily",
        en: { us: "Do I need to write an emergency contact on this form?" },
        ko: "이 서류에 비상 연락처를 적어야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please update your emergency contact before your first shift.",
        },
        ko: "첫 근무 전에 비상 연락처를 갱신해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w096",
    level: "A2",
    topic: "emergency",
    word: { us: "witness" },
    ipa: { us: "ˈwɪtnəs" },
    hangul: "위트니스",
    meaning: "목격자, 목격하다",
    nuance: "사고나 도난을 신고할 때 경찰이 가장 먼저 묻는 것 중 하나예요.",
    collocations: [
      "I witnessed the accident",
      "are there any witnesses",
      "a witness statement",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I witnessed the whole thing from the bus stop." },
        ko: "나 버스 정류장에서 그거 다 봤어.",
      },
      {
        tone: "daily",
        en: { us: "There was one other witness, but she already left." },
        ko: "목격자가 한 분 더 있었는데 벌써 가셨어요.",
      },
      {
        tone: "business",
        en: { us: "We will need a witness statement for the report." },
        ko: "보고서 작성을 위해 목격자 진술이 필요합니다.",
      },
    ],
  },
  {
    id: "a2-w097",
    level: "A2",
    topic: "emergency",
    word: { us: "injured" },
    ipa: { us: "ˈɪndʒərd" },
    hangul: "인저드",
    meaning: "다친, 부상당한",
    collocations: [
      "seriously injured",
      "get injured at work",
      "an injured worker",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Nobody got injured, the car just has a big dent." },
        ko: "다친 사람은 없고 차만 크게 찌그러졌어.",
      },
      {
        tone: "daily",
        en: { us: "I injured my back while lifting heavy boxes." },
        ko: "무거운 상자를 들다가 허리를 다쳤어요.",
      },
      {
        tone: "business",
        en: { us: "Any injured worker must file a report within 24 hours." },
        ko: "부상당한 근로자는 24시간 이내에 보고서를 제출해야 합니다.",
      },
    ],
  },
  {
    id: "a2-w098",
    level: "A2",
    topic: "emergency",
    word: { us: "fire alarm" },
    ipa: { us: "ˈfaɪər əˌlɑːrm" },
    hangul: "파이어 얼람",
    meaning: "화재경보기",
    collocations: [
      "set off the fire alarm",
      "the fire alarm goes off",
      "test the fire alarm",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I burned the toast and set off the fire alarm again." },
        ko: "토스트 태워서 또 화재경보기 울렸어.",
      },
      {
        tone: "daily",
        en: { us: "The fire alarm went off around three in the morning." },
        ko: "새벽 세 시쯤에 화재경보기가 울렸어요.",
      },
      {
        tone: "business",
        en: {
          us: "When the fire alarm sounds, use the stairs, not the elevator.",
          au: "When the fire alarm sounds, use the stairs, not the lift.",
        },
        ko: "화재경보가 울리면 엘리베이터 대신 계단을 이용하십시오.",
      },
    ],
  },
  {
    id: "a2-w099",
    level: "A2",
    topic: "emergency",
    word: { us: "police station" },
    ipa: { us: "pəˈliːs ˌsteɪʃən" },
    hangul: "폴리스 스테이션",
    meaning: "경찰서",
    collocations: [
      "go to the police station",
      "the nearest police station",
      "the local police station",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I had to go to the police station to report it." },
        ko: "그거 신고하러 경찰서까지 가야 했어.",
      },
      {
        tone: "daily",
        en: { us: "Where is the nearest police station from here?" },
        ko: "여기서 가장 가까운 경찰서가 어디인가요?",
      },
      {
        tone: "business",
        en: { us: "You must file the report at your local police station." },
        ko: "신고서는 관할 경찰서에 제출하셔야 합니다.",
      },
    ],
  },
  {
    id: "a2-w100",
    level: "A2",
    topic: "emergency",
    word: { us: "evacuate" },
    ipa: { us: "ɪˈvækjueɪt" },
    hangul: "이배큐에이트",
    meaning: "대피하다, 대피시키다",
    nuance: "호주는 산불(bushfire) 시즌에 대피 안내 방송을 자주 듣게 돼요.",
    collocations: [
      "evacuate the building",
      "an evacuation plan",
      "evacuate immediately",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "They made us evacuate the building at midnight." },
        ko: "자정에 우리를 건물에서 대피시켰어.",
      },
      {
        tone: "daily",
        en: { us: "Do we need to evacuate, or can we stay inside?" },
        ko: "대피해야 하나요, 아니면 안에 있어도 되나요?",
      },
      {
        tone: "business",
        en: { us: "Please evacuate the building using the nearest exit." },
        ko: "가장 가까운 출구를 이용해 건물에서 대피해 주시기 바랍니다.",
      },
    ],
  },
  // ── social ────────────────────────────────────────────
  {
    id: "a2-w101",
    level: "A2",
    topic: "social",
    word: { us: "bring a plate" },
    ipa: { us: "brɪŋ ə pleɪt" },
    hangul: "브링 어 플레이트",
    meaning: "음식을 한 접시씩 가져오다",
    nuance:
      "초대장에 이 문구가 있으면 빈 접시가 아니라 나눠 먹을 음식을 가져오라는 뜻이에요. 처음 들으면 오해하기 쉽습니다.",
    collocations: [
      "please bring a plate",
      "bring a plate to share",
      "what should I bring",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "It says bring a plate, so I'm making kimbap." },
        ko: "음식 하나씩 가져오라길래 나는 김밥 만들려고.",
      },
      {
        tone: "daily",
        en: {
          us: "The invite says bring a plate — what does that mean exactly?",
        },
        ko: "초대장에 bring a plate라고 쓰여 있는데 정확히 무슨 뜻인가요?",
      },
      {
        tone: "business",
        en: { us: "Staff are welcome to bring a plate to share on Friday." },
        ko: "금요일에 직원들은 나눠 먹을 음식을 한 가지씩 가져오셔도 좋습니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "bring a dish",
  },
  {
    id: "a2-w102",
    level: "A2",
    topic: "social",
    word: { us: "catch up" },
    ipa: { us: "ˌkætʃ ˈʌp" },
    hangul: "캐치 업",
    meaning: "만나서 근황을 나누다",
    nuance:
      "호주에서 Let's catch up은 '언제 한번 보자'는 인사말로 아주 흔해요.",
    collocations: [
      "catch up over coffee",
      "let's catch up soon",
      "a quick catch-up",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "We should catch up soon, it's been way too long." },
        ko: "우리 곧 한번 봐야지, 너무 오래됐어.",
      },
      {
        tone: "daily",
        en: { us: "Would you like to catch up over coffee this weekend?" },
        ko: "이번 주말에 커피 한잔하면서 이야기 나눌까요?",
      },
      {
        tone: "business",
        en: { us: "Let's catch up on Monday to review the new roster." },
        ko: "월요일에 만나서 새 근무표를 함께 검토하시죠.",
      },
    ],
  },
  {
    id: "a2-w103",
    level: "A2",
    topic: "social",
    word: { us: "invite" },
    ipa: { us: "ɪnˈvaɪt" },
    hangul: "인바이트",
    meaning: "초대하다",
    collocations: [
      "invite someone over",
      "invite a friend",
      "get invited to a party",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My roommate invited us over for dinner tonight.",
          au: "My housemate invited us over for dinner tonight.",
        },
        ko: "내 룸메이트가 오늘 저녁 먹으러 오라고 초대했어.",
      },
      {
        tone: "daily",
        en: { us: "Thanks for inviting me, I really enjoyed the evening." },
        ko: "초대해 주셔서 감사해요, 정말 즐거운 저녁이었어요.",
      },
      {
        tone: "business",
        en: { us: "We would like to invite you to our annual staff dinner." },
        ko: "저희 연례 직원 만찬에 귀하를 초대하고자 합니다.",
      },
    ],
  },
  {
    id: "a2-w104",
    level: "A2",
    topic: "social",
    word: { us: "mate" },
    ipa: { us: "meɪt" },
    hangul: "메이트",
    meaning: "친구; (호칭) 이봐요",
    nuance:
      "호주에서 가장 흔한 호칭이에요. 모르는 사람에게도 씁니다. 'Thanks, mate.' 한마디면 충분해요.",
    collocations: ["thanks, mate", "no worries, mate", "he's a good mate"],
    examples: [
      {
        tone: "friend",
        en: { us: "Thanks, mate — I owe you one." },
        ko: "고마워, 친구야. 내가 하나 빚졌다.",
      },
      {
        tone: "daily",
        en: { us: "Excuse me, mate, is this seat taken?" },
        ko: "저기요, 이 자리 사람 있나요?",
      },
      {
        tone: "business",
        en: { us: "No worries, mate. I'll have it ready in five minutes." },
        ko: "걱정 마세요. 5분 안에 준비해 드릴게요.",
      },
    ],
    auOnly: true,
    usEquivalent: "buddy",
  },
  {
    id: "a2-w105",
    level: "A2",
    topic: "social",
    word: { us: "get along" },
    ipa: { us: "ˌɡet əˈlɔːŋ" },
    hangul: "겟 얼롱",
    meaning: "잘 지내다, 사이가 좋다",
    collocations: [
      "get along with someone",
      "get along well",
      "get along fine",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Do you get along with your new roommates?",
          au: "Do you get along with your new housemates?",
        },
        ko: "새로 온 룸메이트들이랑 잘 지내?",
      },
      {
        tone: "daily",
        en: { us: "I get along really well with everyone at work." },
        ko: "직장 사람들과 정말 잘 지내고 있어요.",
      },
      {
        tone: "business",
        en: {
          us: "It is important that team members get along professionally.",
        },
        ko: "팀원들이 업무상 원만하게 지내는 것이 중요합니다.",
      },
    ],
  },
  {
    id: "a2-w106",
    level: "A2",
    topic: "social",
    word: { us: "introduce" },
    ipa: { us: "ˌɪntrəˈduːs", au: "ˌɪntrəˈdjuːs" },
    hangul: "인트러듀스",
    meaning: "소개하다",
    nuance: "호주식 발음은 '인트러쥬스'처럼 y 소리가 살짝 들어가요.",
    collocations: [
      "introduce yourself",
      "introduce someone to",
      "let me introduce",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Come over here, let me introduce you to my roommates.",
          au: "Come over here, let me introduce you to my housemates.",
        },
        ko: "이리 와, 내 룸메이트들 소개해 줄게.",
      },
      {
        tone: "daily",
        en: { us: "Could you introduce me to the manager later?" },
        ko: "나중에 매니저님께 저를 소개해 주실 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please introduce yourself briefly at the start of the meeting.",
        },
        ko: "회의 시작 시 간단히 자기소개를 해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w107",
    level: "A2",
    topic: "social",
    word: { us: "borrow" },
    ipa: { us: "ˈbɑːroʊ", au: "ˈbɒrəʊ" },
    hangul: "바로우",
    meaning: "빌리다",
    nuance: "빌려주는 쪽은 lend, 빌리는 쪽은 borrow로 방향을 구분해서 써요.",
    collocations: ["borrow money", "borrow a car", "can I borrow"],
    examples: [
      {
        tone: "friend",
        en: { us: "Can I borrow your umbrella? I'll give it back tomorrow." },
        ko: "우산 좀 빌려도 돼? 내일 돌려줄게.",
      },
      {
        tone: "daily",
        en: { us: "Would it be okay if I borrowed your bike today?" },
        ko: "오늘 자전거를 빌려도 괜찮을까요?",
      },
      {
        tone: "business",
        en: { us: "Staff may borrow equipment with the manager's approval." },
        ko: "직원은 매니저의 승인을 받아 장비를 대여할 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w108",
    level: "A2",
    topic: "social",
    word: { us: "apologize", au: "apologise" },
    ipa: { us: "əˈpɑːlədʒaɪz", au: "əˈpɒlədʒaɪz" },
    hangul: "어팔러자이즈",
    meaning: "사과하다",
    nuance: "호주는 -ise 철자를 쓰지만 발음은 미국식과 거의 같아요.",
    collocations: [
      "apologize for",
      "apologize sincerely",
      "owe someone an apology",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I think you should apologize to her tonight.",
          au: "I think you should apologise to her tonight.",
        },
        ko: "오늘 밤에 걔한테 사과하는 게 좋을 것 같아.",
      },
      {
        tone: "daily",
        en: {
          us: "I want to apologize for being late this morning.",
          au: "I want to apologise for being late this morning.",
        },
        ko: "오늘 아침에 늦어서 사과드리고 싶어요.",
      },
      {
        tone: "business",
        en: {
          us: "We sincerely apologize for the inconvenience caused.",
          au: "We sincerely apologise for the inconvenience caused.",
        },
        ko: "불편을 드려 진심으로 사과드립니다.",
      },
    ],
  },
  {
    id: "a2-w109",
    level: "A2",
    topic: "social",
    word: { us: "favor", au: "favour" },
    ipa: { us: "ˈfeɪvər" },
    hangul: "페이버",
    meaning: "부탁, 호의",
    nuance: "Can you do me a favor?는 부탁을 꺼낼 때 쓰는 정해진 표현이에요.",
    collocations: ["do me a favor", "ask a favor", "return the favor"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Hey, can you do me a quick favor?",
          au: "Hey, can you do me a quick favour?",
        },
        ko: "야, 부탁 하나만 빨리 들어줄래?",
      },
      {
        tone: "daily",
        en: {
          us: "I owe you a big favor for helping me move.",
          au: "I owe you a big favour for helping me move.",
        },
        ko: "이사 도와주셔서 크게 신세 졌어요.",
      },
      {
        tone: "business",
        en: {
          us: "I would like to ask a small favor regarding next week.",
          au: "I would like to ask a small favour regarding next week.",
        },
        ko: "다음 주와 관련해 작은 부탁을 드리고 싶습니다.",
      },
    ],
  },
  {
    id: "a2-w110",
    level: "A2",
    topic: "social",
    word: { us: "chat" },
    ipa: { us: "tʃæt" },
    hangul: "챗",
    meaning: "이야기를 나누다, 수다 떨다",
    nuance: "호주에서 have a chat은 가볍게 잠깐 이야기하자는 뜻이에요.",
    collocations: ["have a chat", "chat about", "a quick chat"],
    examples: [
      {
        tone: "friend",
        en: { us: "We chatted for an hour and totally lost track of time." },
        ko: "한 시간 수다 떨다가 시간 가는 줄 몰랐어.",
      },
      {
        tone: "daily",
        en: { us: "Do you have time for a quick chat after lunch?" },
        ko: "점심 후에 잠깐 이야기 나눌 시간 있으세요?",
      },
      {
        tone: "business",
        en: { us: "The manager would like a chat about your availability." },
        ko: "매니저님이 근무 가능 시간에 대해 이야기를 나누고 싶어 하십니다.",
      },
    ],
  },
  // ── admin ─────────────────────────────────────────────
  {
    id: "a2-w111",
    level: "A2",
    topic: "admin",
    word: { us: "receipt number" },
    ipa: { us: "rɪˈsiːt ˈnʌmbər" },
    hangul: "리싯 넘버",
    meaning: "접수 번호",
    nuance:
      "신청을 넣으면 받는 번호예요. 진행 상황을 물을 때 반드시 필요합니다.",
    collocations: [
      "keep your receipt number",
      "quote your receipt number",
      "the receipt number starts with",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Save the receipt number — you'll need it to check later." },
        ko: "접수 번호 저장해 둬. 나중에 조회할 때 필요해.",
      },
      {
        tone: "daily",
        en: { us: "I've lost my receipt number. Can you look it up by name?" },
        ko: "접수 번호를 잃어버렸어요. 이름으로 조회해 주실 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Please quote your receipt number in all correspondence." },
        ko: "모든 문의 시 접수 번호를 함께 기재해 주십시오.",
      },
    ],
  },
  {
    id: "a2-w112",
    level: "A2",
    topic: "admin",
    word: { us: "application" },
    ipa: { us: "ˌæplɪˈkeɪʃən" },
    hangul: "애플리케이션",
    meaning: "신청(서), 지원(서)",
    collocations: [
      "submit an application",
      "an application form",
      "the application fee",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I finally sent off my application last night." },
        ko: "어젯밤에 드디어 신청서 보냈어.",
      },
      {
        tone: "daily",
        en: { us: "How long does the application usually take?" },
        ko: "신청 처리가 보통 얼마나 걸리나요?",
      },
      {
        tone: "business",
        en: { us: "Your application has been received and is under review." },
        ko: "신청서가 접수되어 검토 중입니다.",
      },
    ],
  },
  {
    id: "a2-w113",
    level: "A2",
    topic: "admin",
    word: { us: "applicant" },
    ipa: { us: "ˈæplɪkənt" },
    hangul: "애플리컨트",
    meaning: "신청자, 지원자",
    collocations: [
      "the applicant's full name",
      "a successful applicant",
      "applicants must provide",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "They said there were over a hundred applicants." },
        ko: "지원자가 백 명 넘었다고 하더라.",
      },
      {
        tone: "daily",
        en: { us: "Do I write my name here as the applicant?" },
        ko: "신청자란에 제 이름을 여기 쓰면 되나요?",
      },
      {
        tone: "business",
        en: { us: "All applicants must provide proof of identity." },
        ko: "모든 신청자는 신분 증명 서류를 제출해야 합니다.",
      },
    ],
  },
  {
    id: "a2-w114",
    level: "A2",
    topic: "admin",
    word: { us: "myGov" },
    ipa: { us: "ˈmaɪɡʌv" },
    hangul: "마이거브",
    meaning: "호주 정부 온라인 통합 서비스",
    nuance:
      "세금·의료·복지 업무가 여기 한 계정으로 묶여요. 세금 신고도 여기서 합니다.",
    collocations: [
      "log in to myGov",
      "link it to myGov",
      "check your myGov inbox",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Just log in to myGov — the letter's in your inbox there." },
        ko: "마이거브에 로그인해 봐. 그 안내문 거기 수신함에 있어.",
      },
      {
        tone: "daily",
        en: { us: "How do I link my tax account to myGov?" },
        ko: "세금 계정을 마이거브에 어떻게 연결하나요?",
      },
      {
        tone: "business",
        en: { us: "Your assessment notice will be sent to your myGov inbox." },
        ko: "세액 산정 통지서는 마이거브 수신함으로 발송됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "government online account",
  },
  {
    id: "a2-w115",
    level: "A2",
    topic: "admin",
    word: { us: "sign" },
    ipa: { us: "saɪn" },
    hangul: "사인",
    meaning: "서명하다",
    nuance:
      "한국어 '사인'과 달리 동사는 sign, 명사(서명)는 signature로 구분해요.",
    collocations: ["sign a contract", "sign here", "sign and date"],
    examples: [
      {
        tone: "friend",
        en: { us: "Did you already sign the lease for the new place?" },
        ko: "새집 계약서에 벌써 서명했어?",
      },
      {
        tone: "daily",
        en: { us: "Where exactly should I sign on this page?" },
        ko: "이 페이지에서 정확히 어디에 서명하면 되나요?",
      },
      {
        tone: "business",
        en: { us: "Please sign and date both copies of the agreement." },
        ko: "계약서 두 부 모두에 서명하시고 날짜를 기재해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w116",
    level: "A2",
    topic: "admin",
    word: { us: "deadline" },
    ipa: { us: "ˈdedlaɪn" },
    hangul: "데드라인",
    meaning: "마감 기한",
    collocations: [
      "meet the deadline",
      "miss a deadline",
      "extend the deadline",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The deadline is tomorrow and I haven't even started." },
        ko: "마감이 내일인데 아직 시작도 안 했어.",
      },
      {
        tone: "daily",
        en: { us: "Is there a deadline for handing in these documents?" },
        ko: "이 서류 제출에 마감 기한이 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "The deadline for this application is the thirty-first of October.",
        },
        ko: "이 신청의 마감일은 10월 31일입니다.",
      },
    ],
  },
  {
    id: "a2-w117",
    level: "A2",
    topic: "admin",
    word: { us: "renew" },
    ipa: { us: "rɪˈnuː", au: "rɪˈnjuː" },
    hangul: "리뉴",
    meaning: "갱신하다",
    nuance: "호주식은 '리뉴'처럼 y 소리를 넣어 발음해요.",
    collocations: ["renew a passport", "renew your visa", "renew a lease"],
    examples: [
      {
        tone: "friend",
        en: { us: "I need to renew my passport before the trip." },
        ko: "여행 전에 여권 갱신해야 해.",
      },
      {
        tone: "daily",
        en: {
          us: "How early can I renew my driver's license?",
          au: "How early can I renew my driver's licence?",
        },
        ko: "운전면허를 얼마나 일찍 갱신할 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Your membership will renew automatically each year." },
        ko: "회원 자격은 매년 자동으로 갱신됩니다.",
      },
    ],
  },
  {
    id: "a2-w118",
    level: "A2",
    topic: "admin",
    word: { us: "proof of address" },
    ipa: { us: "ˌpruːf əv əˈdres" },
    hangul: "프루프 오브 어드레스",
    meaning: "주소 증명 서류",
    nuance: "은행 계좌 개설이나 관공서 업무에서 아주 자주 요구해요.",
    collocations: [
      "provide proof of address",
      "acceptable proof of address",
      "a recent proof of address",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "They wouldn't open my account without proof of address." },
        ko: "주소 증명 서류가 없으니까 계좌를 안 열어 주더라.",
      },
      {
        tone: "daily",
        en: { us: "What can I use as proof of address here?" },
        ko: "여기서 주소 증명으로 무엇을 쓸 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "A recent utility bill is accepted as proof of address." },
        ko: "최근 공과금 고지서는 주소 증명 서류로 인정됩니다.",
      },
    ],
  },
  {
    id: "a2-w119",
    level: "A2",
    topic: "admin",
    word: { us: "tax return" },
    ipa: { us: "ˈtæks rɪˌtɜːrn" },
    hangul: "택스 리턴",
    meaning: "세금 신고(서)",
    nuance: "호주 회계연도는 7월 1일에 시작해 6월 30일에 끝나요.",
    collocations: [
      "file a tax return",
      "a tax return refund",
      "last year's tax return",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I got a decent refund from my tax return this year." },
        ko: "올해 세금 신고로 환급을 꽤 받았어.",
      },
      {
        tone: "daily",
        en: {
          us: "Do I have to file a tax return on this visa?",
          au: "Do I have to lodge a tax return on this visa?",
        },
        ko: "이 비자로도 세금 신고를 해야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your tax return must be filed before the end of October.",
          au: "Your tax return must be lodged before the end of October.",
        },
        ko: "세금 신고서는 10월 말 이전에 제출하셔야 합니다.",
      },
    ],
  },
  {
    id: "a2-w120",
    level: "A2",
    topic: "admin",
    word: { us: "zip code", au: "postcode" },
    ipa: { us: "ˈzɪp koʊd", au: "ˈpəʊstkəʊd" },
    hangul: "집 코드",
    meaning: "우편번호",
    nuance: "호주 우편번호는 네 자리이고, 주소 맨 뒤에 적어요.",
    collocations: [
      "enter your zip code",
      "the wrong zip code",
      "look up a zip code",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I put the wrong zip code, so the package came back.",
          au: "I put the wrong postcode, so the parcel came back.",
        },
        ko: "우편번호를 잘못 적어서 소포가 되돌아왔어.",
      },
      {
        tone: "daily",
        en: {
          us: "What's the zip code for this suburb?",
          au: "What's the postcode for this suburb?",
        },
        ko: "이 동네 우편번호가 어떻게 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please include the zip code on the shipping label.",
          au: "Please include the postcode on the shipping label.",
        },
        ko: "배송 라벨에 우편번호를 반드시 기재해 주시기 바랍니다.",
      },
    ],
  },
];
