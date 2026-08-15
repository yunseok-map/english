import type { WordEntry } from "@/data/types";

export const WORDS_A2: WordEntry[] = [
  // ── work ──────────────────────────────────────────────
  {
    id: "a2-w001",
    level: "A2",
    topic: "work",
    word: { us: "shift" },
    ipa: { us: "ʃɪft" },
    hangul: "쉬프트",
    meaning: "교대 근무 (시간대)",
    nuance: "알바 스케줄 대화에서 가장 자주 쓰는 단어예요.",
    collocations: ["a morning shift", "swap shifts", "cover a shift"],
    examples: [
      {
        tone: "friend",
        en: { us: "Can you cover my shift on Friday?" },
        ko: "금요일에 내 근무 좀 대신해 줄 수 있어?",
      },
      {
        tone: "daily",
        en: { us: "What time does the morning shift start?" },
        ko: "오전 근무는 몇 시에 시작하나요?",
      },
      {
        tone: "business",
        en: { us: "I would like to request a change to my shift schedule." },
        ko: "근무 일정 변경을 요청드리고 싶습니다.",
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
    word: { us: "resume", au: "CV" },
    ipa: { us: "ˈrezəmeɪ", au: "ˌsiːˈviː" },
    hangul: "레주메이",
    meaning: "이력서",
    nuance:
      "호주에서도 resume가 통하지만 구인 공고에는 CV라고 적힌 경우가 많아요.",
    collocations: ["update a resume", "drop off a resume", "attach a resume"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Can you look over my resume real quick?",
          au: "Can you look over my CV real quick?",
        },
        ko: "내 이력서 좀 빨리 봐 줄래?",
      },
      {
        tone: "daily",
        en: {
          us: "I dropped off my resume at the cafe yesterday.",
          au: "I dropped off my CV at the cafe yesterday.",
        },
        ko: "어제 카페에 이력서를 내고 왔어요.",
      },
      {
        tone: "business",
        en: {
          us: "Please find my resume attached for your review.",
          au: "Please find my CV attached for your review.",
        },
        ko: "검토하실 수 있도록 이력서를 첨부해 드립니다.",
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
    word: { us: "wage" },
    ipa: { us: "weɪdʒ" },
    hangul: "웨이지",
    meaning: "임금, 시급",
    nuance: "시급으로 받는 돈은 salary가 아니라 wage라고 해요.",
    collocations: ["minimum wage", "an hourly wage", "raise wages"],
    examples: [
      {
        tone: "friend",
        en: { us: "The wage there is way better than my old job." },
        ko: "거기 시급이 예전 직장보다 훨씬 좋아.",
      },
      {
        tone: "daily",
        en: { us: "What is the hourly wage for weekend work?" },
        ko: "주말 근무 시급은 얼마인가요?",
      },
      {
        tone: "business",
        en: { us: "All staff are paid above the minimum wage." },
        ko: "모든 직원에게 최저 임금 이상을 지급합니다.",
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
    word: { us: "customs" },
    ipa: { us: "ˈkʌstəmz" },
    hangul: "커스텀즈",
    meaning: "세관",
    collocations: ["go through customs", "a customs officer", "clear customs"],
    examples: [
      {
        tone: "friend",
        en: { us: "Customs took forever, I almost missed my bus." },
        ko: "세관에서 한참 걸려서 버스 놓칠 뻔했어.",
      },
      {
        tone: "daily",
        en: { us: "Where do I go after I clear customs?" },
        ko: "세관 통과한 다음에는 어디로 가면 되나요?",
      },
      {
        tone: "business",
        en: { us: "Please have your passport ready for the customs officer." },
        ko: "세관 직원에게 보여 줄 여권을 준비해 주시기 바랍니다.",
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
    word: { us: "landlord" },
    ipa: { us: "ˈlændlɔːrd" },
    hangul: "랜드로드",
    meaning: "집주인, 임대인",
    collocations: [
      "ask the landlord",
      "a strict landlord",
      "contact your landlord",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "My landlord still hasn't fixed the hot water." },
        ko: "집주인이 아직도 온수 안 고쳐 줬어.",
      },
      {
        tone: "daily",
        en: { us: "I will ask the landlord about the broken heater." },
        ko: "고장 난 히터에 대해 집주인에게 물어볼게요.",
      },
      {
        tone: "business",
        en: { us: "The landlord requires four weeks of rent in advance." },
        ko: "임대인은 4주 치 임대료 선납을 요구합니다.",
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
    word: { us: "lease" },
    ipa: { us: "liːs" },
    hangul: "리스",
    meaning: "임대 계약(서)",
    collocations: ["sign a lease", "a six-month lease", "break a lease"],
    examples: [
      {
        tone: "friend",
        en: { us: "We signed a six-month lease on that place!" },
        ko: "우리 그 집 6개월 계약했어!",
      },
      {
        tone: "daily",
        en: { us: "Is my name going on the lease too?" },
        ko: "제 이름도 임대 계약서에 들어가나요?",
      },
      {
        tone: "business",
        en: { us: "Breaking the lease early may involve extra costs." },
        ko: "계약을 조기에 해지하면 추가 비용이 발생할 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w024",
    level: "A2",
    topic: "housing",
    word: { us: "utilities" },
    ipa: { us: "juːˈtɪlətiz" },
    hangul: "유틸리티즈",
    meaning: "공과금 (전기·수도·가스)",
    nuance: "셰어하우스 광고의 bills included는 공과금 포함이라는 뜻이에요.",
    collocations: [
      "pay utilities",
      "utilities included",
      "split the utilities",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Rent's cheap, but utilities aren't included, sadly." },
        ko: "월세는 싼데 아쉽게도 공과금은 별도야.",
      },
      {
        tone: "daily",
        en: { us: "How do we split the utilities in this house?" },
        ko: "이 집은 공과금을 어떻게 나눠 내나요?",
      },
      {
        tone: "business",
        en: { us: "All utilities are included in the weekly rent." },
        ko: "모든 공과금은 주 단위 임대료에 포함되어 있습니다.",
      },
    ],
  },
  {
    id: "a2-w025",
    level: "A2",
    topic: "housing",
    word: { us: "furnished" },
    ipa: { us: "ˈfɜːrnɪʃt" },
    hangul: "퍼니쉬트",
    meaning: "가구가 갖춰진",
    collocations: [
      "a fully furnished room",
      "partly furnished",
      "come furnished",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The room comes furnished, so just bring your clothes." },
        ko: "방에 가구 다 있으니까 옷만 챙겨 와.",
      },
      {
        tone: "daily",
        en: { us: "Does the room come furnished with a bed and desk?" },
        ko: "방에 침대랑 책상 같은 가구가 갖춰져 있나요?",
      },
      {
        tone: "business",
        en: { us: "We offer fully furnished rooms with flexible contracts." },
        ko: "유연한 계약 조건의 풀옵션 방을 제공합니다.",
      },
    ],
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
    word: { us: "roommate", au: "housemate" },
    ipa: { us: "ˈruːmmeɪt", au: "ˈhaʊsmeɪt" },
    hangul: "룸메이트",
    meaning: "같이 사는 사람, 룸메이트",
    nuance:
      "호주에서 roommate는 방을 같이 쓰는 사람이고, 집만 같이 쓰면 housemate라고 구분해요.",
    collocations: [
      "find a roommate",
      "get along with roommates",
      "a new roommate",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My roommate keeps eating my food, it's driving me crazy.",
          au: "My housemate keeps eating my food, it's driving me crazy.",
        },
        ko: "룸메이트가 자꾸 내 음식 먹어서 미치겠어.",
      },
      {
        tone: "daily",
        en: {
          us: "I'm looking for a roommate to share the rent.",
          au: "I'm looking for a housemate to share the rent.",
        },
        ko: "월세를 나눠 낼 룸메이트를 찾고 있어요.",
      },
      {
        tone: "business",
        en: {
          us: "All roommates must be listed on the rental agreement.",
          au: "All housemates must be listed on the rental agreement.",
        },
        ko: "동거인은 모두 임대 계약서에 기재되어야 합니다.",
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
    word: { us: "apartment", au: "unit" },
    ipa: { us: "əˈpɑːrtmənt", au: "ˈjuːnɪt" },
    hangul: "아파트먼트",
    meaning: "아파트, 공동주택",
    nuance: "호주에서는 저층의 작은 아파트를 unit이라고 불러요.",
    collocations: [
      "rent an apartment",
      "a one-bedroom apartment",
      "move into an apartment",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Their new apartment has an amazing city view.",
          au: "Their new unit has an amazing city view.",
        },
        ko: "걔네 새 아파트 도시 전망 진짜 끝내줘.",
      },
      {
        tone: "daily",
        en: {
          us: "I'm renting a small apartment near the station.",
          au: "I'm renting a small unit near the station.",
        },
        ko: "역 근처에 작은 아파트를 빌려서 살고 있어요.",
      },
      {
        tone: "business",
        en: {
          us: "The apartment will be available from the first of July.",
          au: "The unit will be available from the first of July.",
        },
        ko: "해당 아파트는 7월 1일부터 입주 가능합니다.",
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
    word: { us: "transfer" },
    ipa: { us: "ˈtrænsfɜːr" },
    hangul: "트랜스퍼",
    meaning: "(계좌) 이체; 이체하다",
    collocations: ["transfer money", "a bank transfer", "an instant transfer"],
    examples: [
      {
        tone: "friend",
        en: { us: "I'll transfer you my half of the rent tonight." },
        ko: "오늘 밤에 내 월세 몫 이체해 줄게.",
      },
      {
        tone: "daily",
        en: { us: "How long does an international transfer usually take?" },
        ko: "해외 이체는 보통 얼마나 걸리나요?",
      },
      {
        tone: "business",
        en: { us: "The transfer will be processed within one business day." },
        ko: "이체는 영업일 기준 1일 이내에 처리됩니다.",
      },
    ],
  },
  {
    id: "a2-w033",
    level: "A2",
    topic: "bank",
    word: { us: "withdraw" },
    ipa: { us: "wɪðˈdrɔː" },
    hangul: "위드드로",
    meaning: "(돈을) 인출하다",
    nuance: "명사형은 withdrawal이고 ATM 화면에서 자주 보게 돼요.",
    collocations: [
      "withdraw cash",
      "withdraw from an ATM",
      "a withdrawal limit",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Hang on, I need to withdraw some cash first." },
        ko: "잠깐만, 나 먼저 현금 좀 뽑아야 해.",
      },
      {
        tone: "daily",
        en: { us: "Can I withdraw money here without a fee?" },
        ko: "여기서 수수료 없이 돈을 인출할 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "You may withdraw up to one thousand dollars per day." },
        ko: "하루 최대 1,000달러까지 인출하실 수 있습니다.",
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
    word: { us: "balance" },
    ipa: { us: "ˈbæləns" },
    hangul: "밸런스",
    meaning: "잔액",
    collocations: ["check your balance", "a low balance", "an account balance"],
    examples: [
      {
        tone: "friend",
        en: { us: "Don't check your balance after a night out." },
        ko: "놀고 온 다음 날엔 잔액 확인하지 마.",
      },
      {
        tone: "daily",
        en: { us: "Could you tell me my current account balance?" },
        ko: "지금 계좌 잔액이 얼마인지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: { us: "A minimum balance of ten dollars is required." },
        ko: "최소 잔액 10달러를 유지하셔야 합니다.",
      },
    ],
  },
  {
    id: "a2-w037",
    level: "A2",
    topic: "bank",
    word: { us: "fee" },
    ipa: { us: "fiː" },
    hangul: "피",
    meaning: "수수료",
    collocations: ["a monthly fee", "charge a fee", "waive the fee"],
    examples: [
      {
        tone: "friend",
        en: { us: "This ATM charges a crazy fee, let's find another." },
        ko: "이 ATM 수수료 미쳤어, 다른 데 찾자.",
      },
      {
        tone: "daily",
        en: { us: "Is there a fee for using this card overseas?" },
        ko: "이 카드 해외에서 쓰면 수수료가 있나요?",
      },
      {
        tone: "business",
        en: { us: "The monthly account fee has been waived for one year." },
        ko: "월 계좌 수수료가 1년간 면제되었습니다.",
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
    word: { us: "check", au: "bill" },
    ipa: { us: "tʃek", au: "bɪl" },
    hangul: "첵",
    meaning: "계산서",
    nuance: "호주 식당에서는 bill이라고 해야 통하고, 보통 카운터에서 계산해요.",
    collocations: ["ask for the check", "split the check", "get the check"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Can we get the check? I'm so full.",
          au: "Can we get the bill? I'm so full.",
        },
        ko: "계산서 받을까? 나 너무 배불러.",
      },
      {
        tone: "daily",
        en: {
          us: "Could we have the check when you're ready?",
          au: "Could we have the bill when you're ready?",
        },
        ko: "준비되시면 계산서 좀 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "The check includes a ten percent service charge.",
          au: "The bill includes a ten percent service charge.",
        },
        ko: "계산서에는 10퍼센트의 봉사료가 포함되어 있습니다.",
      },
    ],
  },
  {
    id: "a2-w043",
    level: "A2",
    topic: "cafe",
    word: { us: "tip" },
    ipa: { us: "tɪp" },
    hangul: "팁",
    meaning: "팁, 봉사료",
    nuance: "호주는 팁 문화가 없어서 주지 않아도 전혀 실례가 아니에요.",
    collocations: ["leave a tip", "a generous tip", "tip the waiter"],
    examples: [
      {
        tone: "friend",
        en: { us: "You don't have to tip here, it's Australia." },
        ko: "여기선 팁 안 줘도 돼, 호주잖아.",
      },
      {
        tone: "daily",
        en: { us: "Should I leave a tip at this restaurant?" },
        ko: "이 식당에서는 팁을 남겨야 하나요?",
      },
      {
        tone: "business",
        en: { us: "Tips are shared equally among all staff members." },
        ko: "팁은 전 직원이 균등하게 나눠 갖습니다.",
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
    word: { us: "flat white" },
    ipa: { us: "ˌflæt ˈwaɪt" },
    hangul: "플랫 화이트",
    meaning: "플랫 화이트 (우유 거품이 얇은 커피)",
    nuance: "호주에서 시작된 커피로 라테보다 우유가 적고 진해요.",
    collocations: [
      "a regular flat white",
      "order a flat white",
      "a flat white with oat milk",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "One flat white and you'll forget every other coffee." },
        ko: "플랫 화이트 한 잔이면 다른 커피는 잊게 될걸.",
      },
      {
        tone: "daily",
        en: { us: "Could I have a small flat white, please?" },
        ko: "플랫 화이트 작은 걸로 한 잔 주세요.",
      },
      {
        tone: "business",
        en: { us: "Our flat white is made with locally roasted beans." },
        ko: "저희 플랫 화이트는 현지에서 로스팅한 원두로 만듭니다.",
      },
    ],
  },
  {
    id: "a2-w047",
    level: "A2",
    topic: "cafe",
    word: { us: "napkin", au: "serviette" },
    ipa: { us: "ˈnæpkɪn", au: "ˌsɜːviˈet" },
    hangul: "냅킨",
    meaning: "냅킨",
    nuance: "호주에서는 serviette도 쓰지만 napkin도 충분히 통해요.",
    collocations: ["grab a napkin", "a paper napkin", "extra napkins"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Grab me a napkin, I spilled my coffee.",
          au: "Grab me a serviette, I spilled my coffee.",
        },
        ko: "냅킨 좀 갖다줘, 커피 쏟았어.",
      },
      {
        tone: "daily",
        en: {
          us: "Could we get some extra napkins, please?",
          au: "Could we get some extra serviettes, please?",
        },
        ko: "냅킨 좀 더 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Napkins and cutlery are at the self-service station.",
          au: "Serviettes and cutlery are at the self-service station.",
        },
        ko: "냅킨과 식기는 셀프 코너에 준비되어 있습니다.",
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
    word: { us: "refund" },
    ipa: { us: "ˈriːfʌnd" },
    hangul: "리펀드",
    meaning: "환불",
    collocations: ["get a refund", "a full refund", "request a refund"],
    examples: [
      {
        tone: "friend",
        en: { us: "They gave me a full refund, no questions asked." },
        ko: "군말 없이 전액 환불해 줬어.",
      },
      {
        tone: "daily",
        en: { us: "Can I get a refund without the receipt?" },
        ko: "영수증 없이 환불받을 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Refunds are processed within five to seven business days." },
        ko: "환불은 영업일 기준 5~7일 이내에 처리됩니다.",
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
    word: { us: "op shop" },
    ipa: { us: "ˈɒp ʃɒp" },
    hangul: "옵숍",
    meaning: "중고 가게, 구제샵 (자선 단체 운영)",
    nuance: "opportunity shop의 줄임말로, 옷과 가구를 아주 싸게 살 수 있어요.",
    collocations: [
      "browse an op shop",
      "op shop finds",
      "donate to the op shop",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I found this jacket at an op shop for five bucks!" },
        ko: "이 재킷 옵숍에서 5달러에 건졌어!",
      },
      {
        tone: "daily",
        en: { us: "Is there a good op shop around here?" },
        ko: "이 근처에 괜찮은 중고 가게 있나요?",
      },
      {
        tone: "business",
        en: { us: "The op shop accepts donations on weekday mornings only." },
        ko: "저희 중고 매장은 평일 오전에만 기부 물품을 받습니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "thrift store",
  },
  {
    id: "a2-w055",
    level: "A2",
    topic: "shopping",
    word: { us: "fitting room", au: "change room" },
    ipa: { us: "ˈfɪtɪŋ ruːm", au: "ˈtʃeɪndʒ ruːm" },
    hangul: "피팅 룸",
    meaning: "탈의실",
    collocations: [
      "head to the fitting room",
      "try on in the fitting room",
      "wait for a fitting room",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The fitting room line was way too long, I gave up.",
          au: "The change room queue was way too long, I gave up.",
        },
        ko: "탈의실 줄이 너무 길어서 포기했어.",
      },
      {
        tone: "daily",
        en: {
          us: "Excuse me, where are the fitting rooms?",
          au: "Excuse me, where are the change rooms?",
        },
        ko: "저기요, 탈의실이 어디에 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "A maximum of five items is allowed in the fitting room.",
          au: "A maximum of five items is allowed in the change room.",
        },
        ko: "탈의실에는 최대 다섯 벌까지 가지고 들어가실 수 있습니다.",
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
    word: { us: "cart", au: "trolley" },
    ipa: { us: "kɑːrt", au: "ˈtrɒli" },
    hangul: "카트",
    meaning: "쇼핑 카트",
    collocations: ["push a cart", "grab a cart", "a full cart"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Grab a cart, we're buying way too much today.",
          au: "Grab a trolley, we're buying way too much today.",
        },
        ko: "카트 가져와, 오늘 우리 엄청 많이 살 거야.",
      },
      {
        tone: "daily",
        en: {
          us: "Where can I return this shopping cart?",
          au: "Where can I return this shopping trolley?",
        },
        ko: "쇼핑 카트는 어디에 반납하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please do not leave carts in the parking area.",
          au: "Please do not leave trolleys in the car park.",
        },
        ko: "주차장에 카트를 두고 가지 말아 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w059",
    level: "A2",
    topic: "shopping",
    word: { us: "checkout" },
    ipa: { us: "ˈtʃekaʊt" },
    hangul: "체크아웃",
    meaning: "계산대",
    nuance: "호주 마트의 셀프 계산대는 self-serve checkout이라고 해요.",
    collocations: [
      "at the checkout",
      "a self-serve checkout",
      "the checkout line",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I always pick the slowest checkout, every single time." },
        ko: "난 맨날 제일 느린 계산대만 골라, 진짜 매번.",
      },
      {
        tone: "daily",
        en: { us: "The self-serve checkout isn't reading my card." },
        ko: "셀프 계산대에서 제 카드가 인식이 안 돼요.",
      },
      {
        tone: "business",
        en: { us: "Please have your loyalty card ready at the checkout." },
        ko: "계산대에서 적립 카드를 미리 준비해 주시기 바랍니다.",
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
    word: { us: "subway", au: "train" },
    ipa: { us: "ˈsʌbweɪ", au: "treɪn" },
    hangul: "서브웨이",
    meaning: "지하철, 전철",
    nuance:
      "호주에서 subway라고 하면 샌드위치 가게로 알아들어요. 도시 철도는 그냥 train이에요.",
    collocations: ["take the subway", "a subway station", "the subway map"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Let's take the subway, it's faster than the bus.",
          au: "Let's take the train, it's faster than the bus.",
        },
        ko: "지하철 타자, 버스보다 빨라.",
      },
      {
        tone: "daily",
        en: {
          us: "Which subway line goes to the city center?",
          au: "Which train line goes to the city centre?",
        },
        ko: "시내로 가는 노선이 어떤 건가요?",
      },
      {
        tone: "business",
        en: {
          us: "The subway runs every ten minutes until midnight.",
          au: "The train runs every ten minutes until midnight.",
        },
        ko: "해당 노선은 자정까지 10분 간격으로 운행합니다.",
      },
    ],
  },
  {
    id: "a2-w062",
    level: "A2",
    topic: "transport",
    word: { us: "round-trip", au: "return" },
    ipa: { us: "ˌraʊnd ˈtrɪp", au: "rɪˈtɜːn" },
    hangul: "라운드 트립",
    meaning: "왕복(의)",
    nuance:
      "매표소에서 왕복표를 살 때 미국은 round-trip, 호주는 return이라고 말해요.",
    collocations: [
      "a round-trip ticket",
      "book a round-trip",
      "the round-trip fare",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Is a round-trip ticket cheaper than two singles?",
          au: "Is a return ticket cheaper than two singles?",
        },
        ko: "왕복표가 편도 두 장보다 싸?",
      },
      {
        tone: "daily",
        en: {
          us: "I'd like a round-trip ticket to Melbourne, please.",
          au: "I'd like a return ticket to Melbourne, please.",
        },
        ko: "멜버른 왕복표 한 장 주세요.",
      },
      {
        tone: "business",
        en: {
          us: "Round-trip fares must be booked at least three days ahead.",
          au: "Return fares must be booked at least three days ahead.",
        },
        ko: "왕복 요금은 최소 3일 전에 예약하셔야 합니다.",
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
    word: { us: "fare" },
    ipa: { us: "fer", au: "feə" },
    hangul: "페어",
    meaning: "교통 요금",
    nuance: "학생·워홀러가 받을 수 있는 할인 요금은 concession fare라고 해요.",
    collocations: ["pay the fare", "a concession fare", "the fare goes up"],
    examples: [
      {
        tone: "friend",
        en: { us: "The fare went up again, and the trains are still late." },
        ko: "요금은 또 올랐는데 기차는 여전히 늦어.",
      },
      {
        tone: "daily",
        en: { us: "How much is the fare from here to the airport?" },
        ko: "여기서 공항까지 요금이 얼마인가요?",
      },
      {
        tone: "business",
        en: { us: "Concession fares apply only with a valid student card." },
        ko: "할인 요금은 유효한 학생증이 있을 때만 적용됩니다.",
      },
    ],
  },
  {
    id: "a2-w065",
    level: "A2",
    topic: "transport",
    word: { us: "platform" },
    ipa: { us: "ˈplætfɔːrm" },
    hangul: "플랫폼",
    meaning: "승강장, 플랫폼",
    collocations: [
      "platform three",
      "wait on the platform",
      "change platforms",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Hurry up, our train leaves from platform two!" },
        ko: "빨리 와, 우리 기차 2번 승강장에서 출발해!",
      },
      {
        tone: "daily",
        en: { us: "Which platform does the city service leave from?" },
        ko: "시내행 열차는 몇 번 승강장에서 출발하나요?",
      },
      {
        tone: "business",
        en: { us: "The service to Sydney will depart from platform five." },
        ko: "시드니행 열차는 5번 승강장에서 출발합니다.",
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
    word: { us: "driver's license", au: "driver's licence" },
    ipa: { us: "ˈdraɪvərz ˌlaɪsəns" },
    hangul: "드라이버스 라이선스",
    meaning: "운전면허증",
    nuance:
      "철자만 다르고 발음은 같아요. 호주에서는 신분증 대용으로도 자주 요구합니다.",
    collocations: [
      "show your driver's license",
      "renew a driver's license",
      "an international driver's license",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "They asked for my driver's license at the door.",
          au: "They asked for my driver's licence at the door.",
        },
        ko: "입구에서 운전면허증 보여 달라고 하더라.",
      },
      {
        tone: "daily",
        en: {
          us: "Can I use my driver's license as ID here?",
          au: "Can I use my driver's licence as ID here?",
        },
        ko: "여기서 운전면허증을 신분증으로 쓸 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please bring your driver's license to the appointment.",
          au: "Please bring your driver's licence to the appointment.",
        },
        ko: "방문하실 때 운전면허증을 지참해 주시기 바랍니다.",
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
    word: { us: "prescription", au: "script" },
    ipa: { us: "prɪˈskrɪpʃən", au: "skrɪpt" },
    hangul: "프리스크립션",
    meaning: "처방전",
    nuance: "호주 병원과 약국에서는 script라는 줄임말을 훨씬 자주 들어요.",
    collocations: [
      "write a prescription",
      "fill a prescription",
      "a repeat prescription",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The doctor gave me a prescription for antibiotics.",
          au: "The doctor gave me a script for antibiotics.",
        },
        ko: "의사가 항생제 처방전을 써 줬어.",
      },
      {
        tone: "daily",
        en: {
          us: "Can I fill this prescription here today?",
          au: "Can I fill this script here today?",
        },
        ko: "오늘 여기서 이 처방전으로 약을 받을 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your prescription will be ready in about fifteen minutes.",
          au: "Your script will be ready in about fifteen minutes.",
        },
        ko: "처방약은 약 15분 후에 준비됩니다.",
      },
    ],
  },
  {
    id: "a2-w072",
    level: "A2",
    topic: "health",
    word: { us: "appointment" },
    ipa: { us: "əˈpɔɪntmənt" },
    hangul: "어포인트먼트",
    meaning: "예약, 진료 예약",
    nuance:
      "호주 병원은 대부분 예약제라 make an appointment 표현을 꼭 알아 두세요.",
    collocations: [
      "make an appointment",
      "cancel an appointment",
      "an appointment at three",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I made an appointment for tomorrow morning instead." },
        ko: "대신 내일 아침으로 예약 잡았어.",
      },
      {
        tone: "daily",
        en: { us: "I'd like to make an appointment with a doctor." },
        ko: "의사 선생님 진료 예약을 하고 싶은데요.",
      },
      {
        tone: "business",
        en: { us: "Please arrive ten minutes before your appointment." },
        ko: "예약 시간 10분 전에 도착해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w073",
    level: "A2",
    topic: "health",
    word: { us: "pharmacy", au: "chemist" },
    ipa: { us: "ˈfɑːrməsi", au: "ˈkemɪst" },
    hangul: "파머시",
    meaning: "약국",
    nuance:
      "호주 간판에는 Chemist Warehouse처럼 chemist라고 적혀 있는 경우가 많아요.",
    collocations: [
      "go to the pharmacy",
      "a late-night pharmacy",
      "the pharmacy counter",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "There's a pharmacy right next to the station.",
          au: "There's a chemist right next to the station.",
        },
        ko: "역 바로 옆에 약국 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Does this pharmacy stay open on Sundays?",
          au: "Does this chemist stay open on Sundays?",
        },
        ko: "이 약국은 일요일에도 문을 여나요?",
      },
      {
        tone: "business",
        en: {
          us: "The pharmacy closes at seven on weekdays.",
          au: "The chemist closes at seven on weekdays.",
        },
        ko: "약국은 평일 7시에 문을 닫습니다.",
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
    word: { us: "painkiller" },
    ipa: { us: "ˈpeɪnˌkɪlər" },
    hangul: "페인킬러",
    meaning: "진통제",
    nuance:
      "호주 약국에서는 Panadol이나 Nurofen 같은 상표명으로 말해도 잘 통해요.",
    collocations: [
      "take a painkiller",
      "strong painkillers",
      "over-the-counter painkillers",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Do you have any painkillers? My head is killing me." },
        ko: "진통제 있어? 머리가 너무 아파.",
      },
      {
        tone: "daily",
        en: {
          us: "Can I buy painkillers here without a prescription?",
          au: "Can I buy painkillers here without a script?",
        },
        ko: "여기서 처방전 없이 진통제를 살 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Take one painkiller every six hours with food." },
        ko: "진통제는 6시간마다 음식과 함께 한 알씩 복용하십시오.",
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
    word: { us: "cell phone", au: "mobile" },
    ipa: { us: "ˈsel foʊn", au: "ˈməʊbaɪl" },
    hangul: "셀폰",
    meaning: "휴대폰",
    nuance:
      "호주에서 cell phone이라고 하면 바로 미국 사람인 줄 알아요. mobile이 기본이에요.",
    collocations: [
      "a cell phone number",
      "answer your cell phone",
      "charge a cell phone",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Text me on my cell phone when you get there.",
          au: "Text me on my mobile when you get there.",
        },
        ko: "도착하면 내 휴대폰으로 문자해.",
      },
      {
        tone: "daily",
        en: {
          us: "Could I get your cell phone number, please?",
          au: "Could I get your mobile number, please?",
        },
        ko: "휴대폰 번호를 알려 주실 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "Please keep your cell phone on silent during the shift.",
          au: "Please keep your mobile on silent during the shift.",
        },
        ko: "근무 중에는 휴대폰을 무음으로 해 주시기 바랍니다.",
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
    word: { us: "data" },
    ipa: { us: "ˈdeɪtə", au: "ˈdɑːtə" },
    hangul: "데이터",
    meaning: "데이터 (통신량)",
    nuance: "호주에서는 '다타'에 가깝게 발음하는 사람이 많아요.",
    collocations: ["run out of data", "unlimited data", "use up your data"],
    examples: [
      {
        tone: "friend",
        en: { us: "I ran out of data again halfway through the month." },
        ko: "이번 달도 중간에 데이터 다 썼어.",
      },
      {
        tone: "daily",
        en: { us: "How much data do I get each month?" },
        ko: "매달 데이터가 얼마나 제공되나요?",
      },
      {
        tone: "business",
        en: { us: "Extra data can be added to your account at any time." },
        ko: "추가 데이터는 언제든지 계정에 추가하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w084",
    level: "A2",
    topic: "phone",
    word: { us: "top up", au: "recharge" },
    ipa: { us: "ˌtɑːp ˈʌp", au: "ˌriːˈtʃɑːdʒ" },
    hangul: "탑 업",
    meaning: "(선불 요금을) 충전하다",
    nuance:
      "호주 통신사 앱과 매장 안내문에는 거의 항상 recharge라고 적혀 있어요.",
    collocations: [
      "top up your phone",
      "top up online",
      "a thirty-dollar top-up",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I forgot to top up my phone and lost service.",
          au: "I forgot to recharge my phone and lost service.",
        },
        ko: "폰 요금 충전을 깜빡해서 끊겼어.",
      },
      {
        tone: "daily",
        en: {
          us: "Can I top up my prepaid phone here?",
          au: "Can I recharge my prepaid phone here?",
        },
        ko: "여기서 선불폰 요금을 충전할 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "You can top up your account through our official app.",
          au: "You can recharge your account through our official app.",
        },
        ko: "저희 공식 앱을 통해 요금을 충전하실 수 있습니다.",
      },
    ],
  },
  {
    id: "a2-w085",
    level: "A2",
    topic: "phone",
    word: { us: "SIM card" },
    ipa: { us: "ˈsɪm kɑːrd" },
    hangul: "심 카드",
    meaning: "유심 카드",
    nuance: "공항에 도착해서 가장 먼저 사게 되는 물건 중 하나예요.",
    collocations: ["buy a SIM card", "insert a SIM card", "a prepaid SIM card"],
    examples: [
      {
        tone: "friend",
        en: { us: "I bought a SIM card at the airport as soon as I landed." },
        ko: "착륙하자마자 공항에서 유심 샀어.",
      },
      {
        tone: "daily",
        en: { us: "Where can I buy a prepaid SIM card near here?" },
        ko: "이 근처에서 선불 유심을 어디서 살 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Your SIM card will be activated within two hours." },
        ko: "유심 카드는 2시간 이내에 개통됩니다.",
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
    word: { us: "voicemail" },
    ipa: { us: "ˈvɔɪsmeɪl" },
    hangul: "보이스메일",
    meaning: "음성 메시지(함)",
    collocations: [
      "leave a voicemail",
      "check your voicemail",
      "go to voicemail",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I left you a voicemail, but you never check them." },
        ko: "너한테 음성 메시지 남겼는데, 넌 절대 안 확인하더라.",
      },
      {
        tone: "daily",
        en: { us: "Sorry, I missed your call and just heard the voicemail." },
        ko: "죄송해요, 전화를 못 받아서 음성 메시지를 이제 들었어요.",
      },
      {
        tone: "business",
        en: { us: "Please leave a voicemail and we will return your call." },
        ko: "음성 메시지를 남겨 주시면 회신 드리겠습니다.",
      },
    ],
  },
  {
    id: "a2-w088",
    level: "A2",
    topic: "phone",
    word: { us: "text" },
    ipa: { us: "tekst" },
    hangul: "텍스트",
    meaning: "문자 메시지(를 보내다)",
    nuance: "명사와 동사로 모두 쓰고, text me back처럼 아주 자주 씁니다.",
    collocations: ["send a text", "text me back", "a group text"],
    examples: [
      {
        tone: "friend",
        en: { us: "Just text me when you're outside, okay?" },
        ko: "밖에 도착하면 그냥 문자해, 알겠지?",
      },
      {
        tone: "daily",
        en: { us: "I'll send you a text with the address later." },
        ko: "나중에 주소를 문자로 보내 드릴게요.",
      },
      {
        tone: "business",
        en: { us: "You will receive a text once your order is ready." },
        ko: "주문이 준비되면 문자 메시지를 받으시게 됩니다.",
      },
    ],
  },
  {
    id: "a2-w089",
    level: "A2",
    topic: "phone",
    word: { us: "charger" },
    ipa: { us: "ˈtʃɑːrdʒər" },
    hangul: "차저",
    meaning: "충전기",
    nuance: "호주는 플러그 모양이 달라서 여행용 어댑터도 함께 준비해야 해요.",
    collocations: ["a phone charger", "borrow a charger", "a fast charger"],
    examples: [
      {
        tone: "friend",
        en: { us: "Can I use your charger? Mine stopped working." },
        ko: "네 충전기 좀 써도 돼? 내 건 고장 났어.",
      },
      {
        tone: "daily",
        en: { us: "I think I left my charger in the hostel room." },
        ko: "호스텔 방에 충전기를 두고 온 것 같아요.",
      },
      {
        tone: "business",
        en: { us: "Chargers are available at the front desk on request." },
        ko: "충전기는 요청하시면 프런트에서 대여해 드립니다.",
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
    word: { us: "ambulance" },
    ipa: { us: "ˈæmbjələns" },
    hangul: "앰뷸런스",
    meaning: "구급차",
    nuance: "호주는 구급차 비용이 매우 비싸니 보험 보장 범위를 꼭 확인하세요.",
    collocations: [
      "call an ambulance",
      "an ambulance is on the way",
      "wait for the ambulance",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "He fell off the ladder, so we called an ambulance." },
        ko: "걔가 사다리에서 떨어져서 구급차 불렀어.",
      },
      {
        tone: "daily",
        en: { us: "Should I call an ambulance, or is it not that serious?" },
        ko: "구급차를 불러야 할까요, 아니면 그 정도는 아닌가요?",
      },
      {
        tone: "business",
        en: { us: "An ambulance has been dispatched to your location." },
        ko: "귀하의 위치로 구급차가 출동했습니다.",
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
    word: { us: "stolen" },
    ipa: { us: "ˈstoʊlən" },
    hangul: "스톨른",
    meaning: "도난당한",
    nuance: "steal의 과거분사로, My bag was stolen처럼 수동태로 자주 씁니다.",
    collocations: [
      "get something stolen",
      "a stolen wallet",
      "report a stolen card",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "My bike got stolen right outside the hostel." },
        ko: "호스텔 바로 앞에서 자전거 도난당했어.",
      },
      {
        tone: "daily",
        en: { us: "My wallet was stolen on the bus this morning." },
        ko: "오늘 아침 버스에서 지갑을 도난당했어요.",
      },
      {
        tone: "business",
        en: { us: "Please report the stolen card so we can block it." },
        ko: "카드를 정지할 수 있도록 도난 신고를 해 주시기 바랍니다.",
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
    word: { us: "hang out" },
    ipa: { us: "ˌhæŋ ˈaʊt" },
    hangul: "행 아웃",
    meaning: "(친구와) 어울려 놀다, 시간을 보내다",
    nuance:
      "특별한 계획 없이 편하게 어울리는 느낌이라 친한 사이에서 많이 써요.",
    collocations: [
      "hang out with friends",
      "hang out at the beach",
      "just hang out",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Do you want to hang out after your shift tonight?" },
        ko: "오늘 밤 근무 끝나고 같이 놀래?",
      },
      {
        tone: "daily",
        en: { us: "We usually hang out at the park on Sundays." },
        ko: "저희는 보통 일요일에 공원에서 시간을 보내요.",
      },
      {
        tone: "business",
        en: {
          us: "New staff are welcome to hang out with the team after work.",
        },
        ko: "신입 직원도 퇴근 후에 팀과 함께 어울리셔도 좋습니다.",
      },
    ],
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
    word: { us: "barbecue", au: "barbie" },
    ipa: { us: "ˈbɑːrbɪkjuː", au: "ˈbɑːbi" },
    hangul: "바비큐",
    meaning: "바비큐 (모임)",
    nuance:
      "호주에서는 barbie로 줄여 부르고, 공원에 무료 바비큐 시설이 흔해요.",
    collocations: [
      "have a barbecue",
      "a backyard barbecue",
      "fire up the barbecue",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "We're having a barbecue at the beach on Saturday.",
          au: "We're having a barbie at the beach on Saturday.",
        },
        ko: "토요일에 해변에서 바비큐 할 거야.",
      },
      {
        tone: "daily",
        en: {
          us: "Should I bring anything to the barbecue?",
          au: "Should I bring anything to the barbie?",
        },
        ko: "바비큐에 뭐 좀 가져갈까요?",
      },
      {
        tone: "business",
        en: { us: "The company barbecue starts at noon this Friday." },
        ko: "회사 바비큐 행사는 이번 주 금요일 정오에 시작합니다.",
      },
    ],
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
    word: { us: "visa" },
    ipa: { us: "ˈviːzə" },
    hangul: "비자",
    meaning: "비자",
    nuance: "워킹홀리데이 비자는 국적에 따라 subclass 417 또는 462로 불려요.",
    collocations: ["apply for a visa", "a visa expires", "extend a visa"],
    examples: [
      {
        tone: "friend",
        en: { us: "My visa expires in March, so I'm a bit stressed." },
        ko: "3월에 비자가 만료돼서 좀 스트레스야.",
      },
      {
        tone: "daily",
        en: { us: "I'm here on a working holiday visa for one year." },
        ko: "저는 1년짜리 워킹홀리데이 비자로 왔어요.",
      },
      {
        tone: "business",
        en: { us: "Please provide a copy of your current visa grant." },
        ko: "현재 비자 승인서 사본을 제출해 주시기 바랍니다.",
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
    word: { us: "form" },
    ipa: { us: "fɔːrm" },
    hangul: "폼",
    meaning: "서식, 양식",
    nuance: "미국은 fill out a form, 호주는 fill in a form을 더 자주 씁니다.",
    collocations: ["fill out a form", "sign the form", "an online form"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Sorry, there's one more form to fill out.",
          au: "Sorry, there's one more form to fill in.",
        },
        ko: "미안, 작성할 서류가 하나 더 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you show me how to fill out this form?",
          au: "Could you show me how to fill in this form?",
        },
        ko: "이 양식을 어떻게 작성하는지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: { us: "Please complete the form and return it by Friday." },
        ko: "양식을 작성하셔서 금요일까지 제출해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "a2-w114",
    level: "A2",
    topic: "admin",
    word: { us: "ID" },
    ipa: { us: "ˌaɪ ˈdiː" },
    hangul: "아이디",
    meaning: "신분증",
    nuance:
      "호주 술집이나 주류 판매점은 나이와 상관없이 ID를 요구할 수 있어요.",
    collocations: ["show your ID", "a photo ID", "check IDs"],
    examples: [
      {
        tone: "friend",
        en: { us: "They checked my ID at the door again last night." },
        ko: "어젯밤에 또 입구에서 신분증 검사했어.",
      },
      {
        tone: "daily",
        en: { us: "Do I need to bring a photo ID with me?" },
        ko: "사진이 있는 신분증을 가져가야 하나요?",
      },
      {
        tone: "business",
        en: { us: "Please present a valid photo ID at the counter." },
        ko: "창구에서 유효한 사진 신분증을 제시해 주시기 바랍니다.",
      },
    ],
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
