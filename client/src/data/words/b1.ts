import type { WordEntry } from "@/data/types";

export const WORDS_B1: WordEntry[] = [
  // ---------- work ----------
  {
    id: "b1-w001",
    level: "B1",
    topic: "work",
    word: { us: "notice period" },
    ipa: { us: "ˈnoʊtɪs ˌpɪriəd" },
    hangul: "노티스 피리어드",
    meaning: "퇴사 통보 기간",
    nuance:
      "그만두기 최소 몇 주 전에 알려야 하는지를 뜻해요. 계약서에서 꼭 확인하세요.",
    collocations: ["give two weeks' notice", "serve a notice period"],
    examples: [
      {
        tone: "friend",
        en: { us: "How long is your notice period at the cafe?" },
        ko: "그 카페 퇴사 통보 기간이 얼마나 돼?",
      },
      {
        tone: "daily",
        en: {
          us: "Could you tell me what the notice period is for this position?",
        },
        ko: "이 포지션의 퇴사 통보 기간이 어떻게 되는지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "I am writing to confirm that my notice period ends on the 15th.",
        },
        ko: "제 통보 기간이 15일에 종료됨을 확인차 연락드립니다.",
      },
    ],
  },
  {
    id: "b1-w002",
    level: "B1",
    topic: "work",
    word: { us: "probation period" },
    ipa: { us: "proʊˈbeɪʃən ˌpɪriəd" },
    hangul: "프로베이션 피리어드",
    meaning: "수습 기간",
    collocations: ["pass your probation", "a three-month probation period"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I finally passed my probation, so my hours are guaranteed now.",
        },
        ko: "드디어 수습 끝났어, 이제 내 근무 시간 보장돼.",
      },
      {
        tone: "daily",
        en: {
          us: "The manager said my probation period will be reviewed at the end of June.",
        },
        ko: "매니저가 제 수습 기간은 6월 말에 평가된다고 했어요.",
      },
      {
        tone: "business",
        en: {
          us: "Please note that annual leave cannot be taken during the probation period.",
        },
        ko: "수습 기간 중에는 연차를 사용할 수 없는 점 참고 부탁드립니다.",
      },
    ],
  },
  {
    id: "b1-w003",
    level: "B1",
    topic: "work",
    word: { us: "award rate" },
    ipa: { us: "əˈwɔːrd reɪt" },
    hangul: "어워드 레이트",
    meaning: "산업별 법정 최저 임금",
    nuance:
      "직종마다 정해진 최저 시급이에요. 이보다 적게 주면 불법이라 Fair Work 에 신고할 수 있습니다.",
    collocations: [
      "the award rate for hospitality",
      "below the award rate",
      "check the award rate",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "They were paying below the award rate, so I left." },
        ko: "법정 최저 시급보다 적게 줘서 그만뒀어.",
      },
      {
        tone: "daily",
        en: { us: "What's the award rate for a casual in hospitality?" },
        ko: "요식업 캐주얼의 법정 최저 시급이 얼마인가요?",
      },
      {
        tone: "business",
        en: { us: "All staff are paid at or above the relevant award rate." },
        ko: "모든 직원에게는 해당 산업별 법정 임금 이상을 지급합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "prevailing wage",
  },
  {
    id: "b1-w004",
    level: "B1",
    topic: "work",
    word: { us: "penalty rates" },
    ipa: { us: "ˈpɛnəlti ˌreɪts" },
    hangul: "페널티 레이츠",
    meaning: "주말·공휴일 할증 수당",
    nuance:
      "호주에서는 일요일이나 공휴일 근무 시 시급이 1.5~2배로 올라가요. 급여 명세서에서 꼭 확인하세요.",
    collocations: ["Sunday penalty rates", "be paid penalty rates"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I love Sunday shifts because the penalty rates nearly double my pay.",
        },
        ko: "일요일 근무 완전 좋아, 할증 수당 붙으면 시급이 거의 두 배거든.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you check whether public holiday penalty rates apply to casual staff here?",
        },
        ko: "여기 캐주얼 직원한테도 공휴일 할증 수당이 적용되는지 확인해 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "The award requires penalty rates of double time for all public holiday shifts.",
        },
        ko: "어워드 규정상 공휴일 근무에는 두 배의 할증 수당이 지급되어야 합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "overtime and holiday pay premiums",
  },
  {
    id: "b1-w005",
    level: "B1",
    topic: "work",
    word: { us: "pay stub", au: "payslip" },
    ipa: { us: "ˈpeɪ stʌb", au: "ˈpeɪslɪp" },
    hangul: "페이 스텁",
    meaning: "급여 명세서",
    nuance:
      "호주에서는 payslip이라고 해요. 시급, 세금, 연금이 맞게 찍혔는지 매번 확인하는 습관을 들이세요.",
    collocations: ["check your pay stub", "issue a pay stub"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Have you looked at your pay stub? Mine is missing four hours.",
          au: "Have you looked at your payslip? Mine is missing four hours.",
        },
        ko: "너 급여 명세서 봤어? 내 건 네 시간이 빠져 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you send me last month's pay stub for my rental application?",
          au: "Could you send me last month's payslip for my rental application?",
        },
        ko: "임대 신청에 필요해서 지난달 급여 명세서를 보내 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "All pay stubs are now issued electronically through the staff portal.",
          au: "All payslips are now issued electronically through the staff portal.",
        },
        ko: "이제 모든 급여 명세서는 직원 포털을 통해 전자 발급됩니다.",
      },
    ],
  },
  {
    id: "b1-w006",
    level: "B1",
    topic: "work",
    word: { us: "work schedule", au: "roster" },
    ipa: { us: "ˈwɜrk ˌskɛdʒul", au: "ˈrɒstə" },
    hangul: "워크 스케줄",
    meaning: "근무 일정표",
    nuance:
      "호주 직장에서는 roster라고 해요. 'be rostered on'은 그날 근무가 잡혀 있다는 뜻이에요.",
    collocations: ["draw up a work schedule", "swap shifts on the schedule"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The new work schedule is out, and I got stuck with three closing shifts.",
          au: "The new roster is out, and I got stuck with three closing shifts.",
        },
        ko: "새 근무표 나왔는데 나 마감 근무만 세 번이야.",
      },
      {
        tone: "daily",
        en: {
          us: "Has next week's work schedule been posted? I need to plan my appointments.",
          au: "Has next week's roster been posted? I need to plan my appointments.",
        },
        ko: "다음 주 근무표 나왔나요? 일정을 미리 잡아야 해서요.",
      },
      {
        tone: "business",
        en: {
          us: "Any changes to the work schedule must be approved by the duty manager.",
          au: "Any changes to the roster must be approved by the duty manager.",
        },
        ko: "근무표 변경은 반드시 당직 매니저의 승인을 받아야 합니다.",
      },
    ],
  },
  {
    id: "b1-w007",
    level: "B1",
    topic: "work",
    word: { us: "resignation" },
    ipa: { us: "ˌrɛzɪɡˈneɪʃən" },
    hangul: "레지그네이션",
    meaning: "사직, 사직서",
    collocations: ["hand in your resignation", "a letter of resignation"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "She handed in her resignation right after the manager cut everyone's hours.",
        },
        ko: "매니저가 다들 근무 시간 줄이자마자 걔 사직서 냈어.",
      },
      {
        tone: "daily",
        en: {
          us: "I have decided to hand in my resignation at the end of this month.",
        },
        ko: "이번 달 말에 사직서를 내기로 결정했어요.",
      },
      {
        tone: "business",
        en: {
          us: "Please accept this letter as formal notice of my resignation, effective March 1st.",
        },
        ko: "3월 1일부로 사직함을 알리는 공식 통보로 이 서신을 받아 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "b1-w008",
    level: "B1",
    topic: "work",
    word: { us: "raise", au: "pay rise" },
    ipa: { us: "reɪz", au: "ˈpeɪ raɪz" },
    hangul: "레이즈",
    meaning: "임금 인상",
    collocations: ["ask for a raise", "get a small raise"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Did you actually ask for a raise, or are you still working up the nerve?",
          au: "Did you actually ask for a pay rise, or are you still working up the nerve?",
        },
        ko: "너 진짜 월급 올려 달라고 했어, 아니면 아직 용기 내는 중이야?",
      },
      {
        tone: "daily",
        en: {
          us: "I am hoping to discuss a raise once my probation ends next month.",
          au: "I am hoping to discuss a pay rise once my probation ends next month.",
        },
        ko: "다음 달 수습이 끝나면 임금 인상을 논의하고 싶어요.",
      },
      {
        tone: "business",
        en: {
          us: "Following your performance review, we are pleased to offer a raise of four percent.",
          au: "Following your performance review, we are pleased to offer a pay rise of four percent.",
        },
        ko: "성과 평가 결과에 따라 4퍼센트 임금 인상을 제안드리게 되어 기쁩니다.",
      },
    ],
  },
  {
    id: "b1-w009",
    level: "B1",
    topic: "work",
    word: { us: "call in sick" },
    ipa: { us: "ˌkɔl ɪn ˈsɪk" },
    hangul: "콜 인 식",
    meaning: "아파서 결근 전화를 하다",
    nuance:
      "출근 전에 미리 전화나 문자로 알리는 게 예의예요. 호주에서는 병가 시 의사 진단서를 요구하기도 해요.",
    collocations: ["call in sick to work", "call in sick at the last minute"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Jake called in sick again, so we are short-staffed for the lunch rush.",
        },
        ko: "제이크 또 아프다고 결근했어, 점심 러시 때 사람 모자라.",
      },
      {
        tone: "daily",
        en: { us: "I woke up with a fever, so I had to call in sick today." },
        ko: "열이 나서 오늘은 아프다고 연락하고 쉬어야 했어요.",
      },
      {
        tone: "business",
        en: {
          us: "Staff calling in sick must notify their supervisor two hours before the shift.",
        },
        ko: "병가 시에는 근무 시작 두 시간 전까지 담당 상사에게 알려야 합니다.",
      },
    ],
  },
  {
    id: "b1-w010",
    level: "B1",
    topic: "work",
    word: { us: "performance review" },
    ipa: { us: "pərˈfɔrməns rɪˌvju" },
    hangul: "퍼포먼스 리뷰",
    meaning: "성과 평가 면담",
    collocations: [
      "an annual performance review",
      "prepare for a performance review",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My performance review went better than I expected, honestly.",
        },
        ko: "솔직히 내 성과 평가 생각보다 잘 나왔어.",
      },
      {
        tone: "daily",
        en: {
          us: "I have my first performance review on Friday and feel a bit nervous.",
        },
        ko: "금요일에 첫 성과 평가가 있어서 조금 긴장돼요.",
      },
      {
        tone: "business",
        en: {
          us: "Your performance review has been scheduled for Thursday at ten with the store manager.",
        },
        ko: "성과 평가 면담이 목요일 오전 10시에 매장 매니저와 잡혔습니다.",
      },
    ],
  },
  // ---------- airport ----------
  {
    id: "b1-w011",
    level: "B1",
    topic: "airport",
    word: { us: "incoming passenger card" },
    ipa: { us: "ˈɪnkʌmɪŋ ˈpæsəndʒər kɑːrd" },
    hangul: "인커밍 패신저 카드",
    meaning: "입국 신고 카드",
    nuance:
      "기내에서 나눠 주는 카드예요. 음식·목재·흙 묻은 신발은 반드시 신고해야 하고, 안 하면 벌금이 큽니다.",
    collocations: [
      "fill out the incoming passenger card",
      "tick yes on the card",
      "hand in your passenger card",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Tick yes if you've got any food — the fines are massive." },
        ko: "음식 있으면 그냥 예로 체크해. 벌금 엄청 세.",
      },
      {
        tone: "daily",
        en: {
          us: "Could I get another incoming passenger card? I made a mistake.",
        },
        ko: "입국 신고 카드 하나 더 받을 수 있을까요? 잘못 적었어요.",
      },
      {
        tone: "business",
        en: {
          us: "Please complete your incoming passenger card before landing.",
        },
        ko: "착륙 전에 입국 신고 카드를 작성해 주십시오.",
      },
    ],
    auOnly: true,
    usEquivalent: "customs declaration form",
  },
  {
    id: "b1-w012",
    level: "B1",
    topic: "airport",
    word: { us: "standby" },
    ipa: { us: "ˈstændbaɪ" },
    hangul: "스탠바이",
    meaning: "대기자 명단(에 오른 상태)",
    nuance: "결항이나 놓친 환승 뒤에 가장 먼저 듣게 되는 말이에요.",
    collocations: [
      "put me on standby",
      "fly standby",
      "you're on the standby list",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I'm on standby for the next flight, so I might be late." },
        ko: "다음 편 대기자 명단에 올려놔서 늦을 수도 있어.",
      },
      {
        tone: "daily",
        en: { us: "Could you put me on standby for the earlier flight?" },
        ko: "더 이른 편 대기자 명단에 올려 주실 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Standby passengers will be called shortly before departure.",
        },
        ko: "대기 승객은 출발 직전에 호명됩니다.",
      },
    ],
  },
  {
    id: "b1-w013",
    level: "B1",
    topic: "airport",
    word: { us: "customs declaration" },
    ipa: { us: "ˈkʌstəmz ˌdɛkləˈreɪʃən" },
    hangul: "커스텀즈 데클러레이션",
    meaning: "세관 신고(서)",
    collocations: ["fill out a customs declaration", "a false declaration"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I always tick yes on the customs declaration just to be safe.",
        },
        ko: "난 안전하게 세관 신고서에 항상 '예'에 체크해.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you help me fill out this customs declaration form in English?",
        },
        ko: "이 세관 신고서 영어로 작성하는 것 좀 도와주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Making a false customs declaration may result in fines or prosecution.",
        },
        ko: "허위 세관 신고 시 벌금이 부과되거나 기소될 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w014",
    level: "B1",
    topic: "airport",
    word: { us: "baggage allowance" },
    ipa: { us: "ˈbæɡɪdʒ əˈlaʊəns" },
    hangul: "배기지 얼라우언스",
    meaning: "무료 수하물 허용량",
    collocations: [
      "exceed the baggage allowance",
      "a 23-kilogram baggage allowance",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My baggage allowance is only twenty kilos, and my suitcase is already stuffed.",
        },
        ko: "수하물 허용량이 20킬로밖에 안 되는데 캐리어가 벌써 꽉 찼어.",
      },
      {
        tone: "daily",
        en: {
          us: "Does the baggage allowance include my carry-on, or is that counted separately?",
        },
        ko: "수하물 허용량에 기내 가방도 포함되나요, 아니면 따로 계산되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Passengers exceeding the baggage allowance will be charged at the airport rate.",
        },
        ko: "수하물 허용량을 초과하는 승객에게는 공항 요율에 따라 요금이 부과됩니다.",
      },
    ],
  },
  {
    id: "b1-w015",
    level: "B1",
    topic: "airport",
    word: { us: "excess baggage" },
    ipa: { us: "ˈɛksɛs ˈbæɡɪdʒ" },
    hangul: "엑세스 배기지",
    meaning: "초과 수하물",
    collocations: ["pay an excess baggage fee", "excess baggage charges"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "They charged me eighty dollars for excess baggage on the way back.",
        },
        ko: "돌아오는 길에 초과 수하물로 80달러나 냈어.",
      },
      {
        tone: "daily",
        en: {
          us: "How much is the excess baggage fee if I am two kilos over?",
        },
        ko: "2킬로 초과하면 초과 수하물 요금이 얼마인가요?",
      },
      {
        tone: "business",
        en: {
          us: "Excess baggage must be paid for before boarding passes can be issued.",
        },
        ko: "초과 수하물 요금을 결제해야 탑승권이 발급됩니다.",
      },
    ],
  },
  {
    id: "b1-w016",
    level: "B1",
    topic: "airport",
    word: { us: "quarantine" },
    ipa: { us: "ˈkwɔrənˌtin" },
    hangul: "쿼런틴",
    meaning: "검역",
    nuance:
      "호주 공항은 생물 검역이 엄격하기로 유명해요. 신고 안 한 식품이 걸리면 현장에서 벌금이에요.",
    collocations: ["go through quarantine", "a quarantine inspection"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Quarantine took my instant noodles because they had egg in the seasoning.",
        },
        ko: "검역에서 내 라면 뺏어 갔어, 수프에 계란 성분 있다고.",
      },
      {
        tone: "daily",
        en: {
          us: "Will these dried mushrooms get through quarantine, or should I leave them behind?",
        },
        ko: "이 말린 버섯 검역 통과될까요, 아니면 두고 가는 게 나을까요?",
      },
      {
        tone: "business",
        en: {
          us: "Items withheld at quarantine will be destroyed unless collected within thirty days.",
        },
        ko: "검역에서 보류된 물품은 30일 이내에 수령하지 않으면 폐기됩니다.",
      },
    ],
  },
  {
    id: "b1-w017",
    level: "B1",
    topic: "airport",
    word: { us: "onward ticket" },
    ipa: { us: "ˈɑnwərd ˈtɪkɪt" },
    hangul: "언워드 티킷",
    meaning: "다음 목적지행 항공권 (출국 증빙)",
    nuance:
      "워홀 비자라도 입국 심사에서 출국 항공권을 보여 달라고 할 수 있어요.",
    collocations: ["proof of an onward ticket", "book an onward ticket"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The airline would not let me check in without an onward ticket.",
        },
        ko: "항공사가 다음 목적지 티켓 없다고 체크인 안 해 주려 했어.",
      },
      {
        tone: "daily",
        en: {
          us: "Do I need to show an onward ticket when entering on a working holiday visa?",
        },
        ko: "워킹홀리데이 비자로 입국할 때 출국 항공권을 보여 줘야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Travelers may be asked to provide evidence of an onward ticket at check-in.",
          au: "Travellers may be asked to provide evidence of an onward ticket at check-in.",
        },
        ko: "체크인 시 여행객에게 출국 항공권 증빙을 요청할 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w018",
    level: "B1",
    topic: "airport",
    word: { us: "rebook" },
    ipa: { us: "riˈbʊk" },
    hangul: "리북",
    meaning: "(항공편 등을) 다시 예약하다",
    collocations: ["rebook a flight", "rebook free of charge"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "They canceled my flight, but at least I could rebook for tomorrow morning.",
          au: "They cancelled my flight, but at least I could rebook for tomorrow morning.",
        },
        ko: "내 비행기 취소됐는데 그래도 내일 아침 걸로 다시 예약은 됐어.",
      },
      {
        tone: "daily",
        en: {
          us: "If I miss the connection, can I rebook at the transfer desk?",
        },
        ko: "연결편을 놓치면 환승 데스크에서 다시 예약할 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Affected passengers have been rebooked on the next available service at no cost.",
        },
        ko: "결항 피해 승객은 추가 비용 없이 다음 운항편으로 재예약되었습니다.",
      },
    ],
  },
  {
    id: "b1-w019",
    level: "B1",
    topic: "airport",
    word: { us: "border control" },
    ipa: { us: "ˈbɔrdər kənˌtroʊl" },
    hangul: "보더 컨트롤",
    meaning: "출입국 심사(대)",
    collocations: [
      "pass through border control",
      "be stopped at border control",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The line at border control was so long I nearly missed my bus.",
        },
        ko: "출입국 심사 줄이 너무 길어서 버스 놓칠 뻔했어.",
      },
      {
        tone: "daily",
        en: {
          us: "They asked me a few questions at border control about my visa.",
        },
        ko: "출입국 심사에서 제 비자에 대해 몇 가지 질문을 받았어요.",
      },
      {
        tone: "business",
        en: {
          us: "Please have your passport and visa documents ready before reaching border control.",
        },
        ko: "출입국 심사대에 도착하기 전에 여권과 비자 서류를 준비해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "b1-w020",
    level: "B1",
    topic: "airport",
    word: { us: "overbooked" },
    ipa: { us: "ˌoʊvərˈbʊkt" },
    hangul: "오버북트",
    meaning: "초과 예약된",
    collocations: [
      "an overbooked flight",
      "get bumped from an overbooked flight",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Our flight was overbooked, so they offered vouchers to anyone willing to wait.",
        },
        ko: "우리 비행기 초과 예약이라서 기다릴 사람한테 바우처 준다더라.",
      },
      {
        tone: "daily",
        en: {
          us: "The flight is overbooked, so they asked if I would take a later one.",
        },
        ko: "비행기가 초과 예약이라 더 늦은 편을 탈 수 있는지 물어보더라고요.",
      },
      {
        tone: "business",
        en: {
          us: "As the flight was overbooked, compensation has been arranged for affected passengers.",
        },
        ko: "해당 항공편이 초과 예약되어 피해 승객에게 보상이 마련되었습니다.",
      },
    ],
  },
  // ---------- housing ----------
  {
    id: "b1-w021",
    level: "B1",
    topic: "housing",
    word: { us: "lease agreement", au: "tenancy agreement" },
    ipa: { us: "ˈlis əˌɡrimənt", au: "ˈtɛnənsi əˌɡrimənt" },
    hangul: "리스 어그리먼트",
    meaning: "임대차 계약(서)",
    nuance:
      "서명 전에 기간, 보증금, 해지 조건을 꼭 확인하세요. 호주에서는 tenancy agreement라고 해요.",
    collocations: ["sign a lease agreement", "break a lease"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Read the lease agreement carefully before you sign anything, seriously.",
          au: "Read the tenancy agreement carefully before you sign anything, seriously.",
        },
        ko: "계약서 서명하기 전에 진짜 꼼꼼히 읽어 봐.",
      },
      {
        tone: "daily",
        en: {
          us: "Could I take the lease agreement home and read it over tonight?",
          au: "Could I take the tenancy agreement home and read it over tonight?",
        },
        ko: "임대차 계약서를 집에 가져가서 오늘 밤에 검토해 봐도 될까요?",
      },
      {
        tone: "business",
        en: {
          us: "The lease agreement states that subletting requires the landlord's written consent.",
          au: "The tenancy agreement states that subletting requires the landlord's written consent.",
        },
        ko: "임대차 계약서상 전대는 임대인의 서면 동의가 필요합니다.",
      },
    ],
  },
  {
    id: "b1-w022",
    level: "B1",
    topic: "housing",
    word: { us: "bond" },
    ipa: { us: "bɑnd" },
    hangul: "본드",
    meaning: "임대 보증금",
    nuance:
      "보통 4주치 월세이고, 집주인이 아니라 주정부 기관에 예치돼요. 퇴거 시 청소 상태에 따라 돌려받아요.",
    collocations: ["pay a four-week bond", "get your bond back"],
    examples: [
      {
        tone: "friend",
        en: { us: "Did you get your full bond back when you moved out?" },
        ko: "너 이사 나올 때 보증금 다 돌려받았어?",
      },
      {
        tone: "daily",
        en: {
          us: "The bond is four weeks' rent and gets lodged with a state authority.",
        },
        ko: "보증금은 4주치 월세이고 주정부 기관에 예치돼요.",
      },
      {
        tone: "business",
        en: {
          us: "Your bond will be refunded once the final inspection has been completed.",
        },
        ko: "최종 점검이 완료되면 보증금이 환급됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "security deposit",
  },
  {
    id: "b1-w023",
    level: "B1",
    topic: "housing",
    word: { us: "condition report" },
    ipa: { us: "kənˈdɪʃən rɪˌpɔrt" },
    hangul: "컨디션 리포트",
    meaning: "입주 상태 점검 보고서",
    collocations: [
      "complete a condition report",
      "note damage on the condition report",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Take photos of every scratch before you send back the condition report.",
        },
        ko: "상태 보고서 보내기 전에 흠집 하나하나 다 사진 찍어 놔.",
      },
      {
        tone: "daily",
        en: {
          us: "I noted the stained carpet on the condition report just in case.",
        },
        ko: "혹시 몰라서 카펫 얼룩을 상태 보고서에 적어 뒀어요.",
      },
      {
        tone: "business",
        en: {
          us: "The signed condition report must be returned within seven days of moving in.",
        },
        ko: "서명한 상태 점검 보고서는 입주 후 7일 이내에 제출해야 합니다.",
      },
    ],
  },
  {
    id: "b1-w024",
    level: "B1",
    topic: "housing",
    word: { us: "rent increase" },
    ipa: { us: "ˈrɛnt ɪnˌkriːs" },
    hangul: "렌트 인크리스",
    meaning: "임대료 인상",
    nuance:
      "서면 통보와 최소 통지 기간이 법으로 정해져 있어요. 갑자기 올릴 수 없습니다.",
    collocations: [
      "a rent increase notice",
      "sixty days' notice of a rent increase",
      "dispute a rent increase",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "We got a rent increase notice — forty dollars a week." },
        ko: "임대료 인상 통지 왔어. 주당 40달러래.",
      },
      {
        tone: "daily",
        en: { us: "How much notice do you need to give for a rent increase?" },
        ko: "임대료를 올리려면 며칠 전에 통보해야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "A rent increase requires written notice of at least sixty days.",
        },
        ko: "임대료 인상은 최소 60일 전 서면 통보가 필요합니다.",
      },
    ],
  },
  {
    id: "b1-w025",
    level: "B1",
    topic: "housing",
    word: { us: "sublet" },
    ipa: { us: "ˈsʌbˌlɛt" },
    hangul: "서블렛",
    meaning: "전대하다, 재임대하다",
    collocations: ["sublet a room", "sublet without permission"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My friend wants to sublet her room while she travels up north.",
        },
        ko: "내 친구가 북쪽 여행 가는 동안 자기 방 재임대하고 싶어 해.",
      },
      {
        tone: "daily",
        en: { us: "Am I allowed to sublet the spare room to a coworker?" },
        ko: "남는 방을 직장 동료에게 전대해도 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Tenants who sublet without written approval are in breach of their agreement.",
        },
        ko: "서면 승인 없이 전대하는 임차인은 계약 위반에 해당합니다.",
      },
    ],
  },
  {
    id: "b1-w026",
    level: "B1",
    topic: "housing",
    word: { us: "break lease" },
    ipa: { us: "ˈbreɪk liːs" },
    hangul: "브레이크 리스",
    meaning: "임대 계약 중도 해지",
    nuance:
      "계약 기간을 못 채우고 나가면 광고비와 재임대까지의 임대료를 물 수 있어요. 나가기 전에 조건을 꼭 확인하세요.",
    collocations: [
      "break the lease",
      "break lease fees",
      "find a replacement tenant",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I had to break lease when the farm job came up." },
        ko: "농장 일이 생겨서 계약을 중도 해지해야 했어.",
      },
      {
        tone: "daily",
        en: { us: "What happens if I break the lease early?" },
        ko: "계약을 중도에 해지하면 어떻게 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Break lease costs include advertising and rent until re-let.",
        },
        ko: "중도 해지 비용에는 광고비와 재임대 전까지의 임대료가 포함됩니다.",
      },
    ],
  },
  {
    id: "b1-w027",
    level: "B1",
    topic: "housing",
    word: { us: "notice to vacate" },
    ipa: { us: "ˈnoʊtɪs tə veɪˈkeɪt" },
    hangul: "노티스 투 베이케이트",
    meaning: "퇴거 통지(서)",
    collocations: ["issue a notice to vacate", "receive a 60-day notice"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Our landlord gave us a notice to vacate because he is selling the house.",
        },
        ko: "집주인이 집 판다고 우리한테 퇴거 통지서 줬어.",
      },
      {
        tone: "daily",
        en: { us: "How much warning does a notice to vacate have to give us?" },
        ko: "퇴거 통지는 최소 며칠 전에 줘야 하는 건가요?",
      },
      {
        tone: "business",
        en: {
          us: "A notice to vacate has been issued in accordance with the tenancy laws.",
        },
        ko: "임대차 법률에 따라 퇴거 통지서가 발부되었습니다.",
      },
    ],
  },
  {
    id: "b1-w028",
    level: "B1",
    topic: "housing",
    word: { us: "arrears" },
    ipa: { us: "əˈrɪrz" },
    hangul: "어리어즈",
    meaning: "(임대료 등의) 연체, 미납금",
    nuance:
      "'in arrears'는 밀렸다는 뜻이에요. 임대료가 14일 이상 밀리면 퇴거 절차가 시작될 수 있어요.",
    collocations: ["fall into arrears", "be two weeks in arrears"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I was in arrears for one week, and the agent already emailed me twice.",
        },
        ko: "월세 일주일 밀렸는데 부동산에서 벌써 메일 두 번 왔어.",
      },
      {
        tone: "daily",
        en: {
          us: "If my pay comes late, will I fall into arrears on the rent?",
        },
        ko: "월급이 늦게 들어오면 임대료가 연체되는 건가요?",
      },
      {
        tone: "business",
        en: {
          us: "Accounts more than fourteen days in arrears may be referred to the tribunal.",
        },
        ko: "14일 이상 연체된 계정은 심판소에 회부될 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w029",
    level: "B1",
    topic: "housing",
    word: { us: "maintenance request" },
    ipa: { us: "ˈmeɪntənəns rɪˌkwɛst" },
    hangul: "메인터넌스 리퀘스트",
    meaning: "수리 요청",
    collocations: [
      "submit a maintenance request",
      "an urgent maintenance request",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I sent a maintenance request about the leaking faucet two weeks ago.",
          au: "I sent a maintenance request about the leaking tap two weeks ago.",
        },
        ko: "물 새는 수도꼭지 때문에 2주 전에 수리 요청 넣었어.",
      },
      {
        tone: "daily",
        en: {
          us: "What is the best way to submit a maintenance request for the heater?",
        },
        ko: "히터 수리 요청은 어떤 방법으로 접수하는 게 가장 좋은가요?",
      },
      {
        tone: "business",
        en: {
          us: "Urgent maintenance requests are attended to within twenty-four hours of being received.",
        },
        ko: "긴급 수리 요청은 접수 후 24시간 이내에 처리됩니다.",
      },
    ],
  },
  {
    id: "b1-w030",
    level: "B1",
    topic: "housing",
    word: { us: "guarantor" },
    ipa: { us: "ˌɡɛrənˈtɔr" },
    hangul: "개런토어",
    meaning: "보증인",
    nuance:
      "소득 증빙이나 임대 이력이 부족할 때 요구돼요. 보증인은 세입자가 못 낸 돈을 대신 책임져요.",
    collocations: ["act as a guarantor", "require a guarantor"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The agency wants a guarantor because I have no local rental history.",
        },
        ko: "현지 임대 이력이 없다고 부동산에서 보증인을 요구해.",
      },
      {
        tone: "daily",
        en: {
          us: "Would the landlord accept a guarantor instead of six months' bank statements?",
        },
        ko: "집주인이 6개월치 은행 명세서 대신 보증인을 받아 줄까요?",
      },
      {
        tone: "business",
        en: {
          us: "The guarantor accepts liability for any rent left unpaid by the tenant.",
        },
        ko: "보증인은 임차인이 내지 않은 임대료에 대해 책임을 집니다.",
      },
    ],
  },
  // ---------- bank ----------
  {
    id: "b1-w031",
    level: "B1",
    topic: "bank",
    word: { us: "PayID" },
    ipa: { us: "ˈpeɪ aɪˈdiː" },
    hangul: "페이아이디",
    meaning: "휴대폰 번호·이메일로 송금받는 식별자",
    nuance:
      "계좌번호 대신 쓰는 호주 실시간 송금 방식이에요. 셰어하우스 공과금 정산에 많이 씁니다.",
    collocations: [
      "set up a PayID",
      "send it to my PayID",
      "my PayID is my phone number",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Just send it to my PayID — my phone number works." },
        ko: "그냥 내 페이아이디로 보내. 폰 번호로 되더라.",
      },
      {
        tone: "daily",
        en: {
          us: "Do you have a PayID, or should I use the BSB and account number?",
        },
        ko: "페이아이디 있으세요, 아니면 BSB랑 계좌번호로 보낼까요?",
      },
      {
        tone: "business",
        en: { us: "Payments made to a PayID usually clear within a minute." },
        ko: "페이아이디로 보낸 송금은 보통 1분 이내에 처리됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "Zelle handle",
  },
  {
    id: "b1-w032",
    level: "B1",
    topic: "bank",
    word: { us: "check", au: "cheque" },
    ipa: { us: "tʃɛk" },
    hangul: "첵",
    meaning: "수표",
    nuance:
      "요즘은 드물지만 보증금 환급 등이 수표로 오기도 해요. 호주 철자는 cheque예요.",
    collocations: ["cash a check", "the check bounced"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My landlord refunded the deposit by check, which felt weirdly old-fashioned.",
          au: "My landlord refunded the deposit by cheque, which felt weirdly old-fashioned.",
        },
        ko: "집주인이 보증금을 수표로 돌려줬는데 뭔가 옛날 방식 같더라.",
      },
      {
        tone: "daily",
        en: {
          us: "How long does it take for a check to clear into my account?",
          au: "How long does it take for a cheque to clear into my account?",
        },
        ko: "수표가 제 계좌로 입금 처리되는 데 얼마나 걸리나요?",
      },
      {
        tone: "business",
        en: {
          us: "Checks presented after 3 p.m. will be processed on the next business day.",
          au: "Cheques presented after 3 p.m. will be processed on the next business day.",
        },
        ko: "오후 3시 이후 제시된 수표는 다음 영업일에 처리됩니다.",
      },
    ],
  },
  {
    id: "b1-w033",
    level: "B1",
    topic: "bank",
    word: { us: "overdraft" },
    ipa: { us: "ˈoʊvərˌdræft" },
    hangul: "오버드래프트",
    meaning: "당좌대월, 잔액 초과 인출",
    collocations: ["go into overdraft", "an overdraft fee"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I went into overdraft by ten dollars and got slapped with a fee.",
        },
        ko: "10달러 초과 인출했다가 수수료 폭탄 맞았어.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you turn off the overdraft on my account so I never overspend?",
        },
        ko: "초과 인출이 안 되게 제 계좌의 한도 초과 기능을 꺼 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "An overdraft facility of five hundred dollars has been approved on your account.",
        },
        ko: "고객님 계좌에 500달러의 당좌대월 한도가 승인되었습니다.",
      },
    ],
  },
  {
    id: "b1-w034",
    level: "B1",
    topic: "bank",
    word: { us: "direct debit" },
    ipa: { us: "dəˌrɛkt ˈdɛbɪt" },
    hangul: "디렉트 데빗",
    meaning: "자동 이체 (출금)",
    collocations: ["set up a direct debit", "cancel a direct debit"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Set up a direct debit for rent so you never miss a payment.",
        },
        ko: "월세는 자동 이체 걸어 놔, 그래야 절대 안 밀려.",
      },
      {
        tone: "daily",
        en: {
          us: "I would like to cancel the direct debit for my old gym membership.",
        },
        ko: "예전 헬스장 회원권 자동 이체를 해지하고 싶은데요.",
      },
      {
        tone: "business",
        en: {
          us: "Please ensure sufficient funds are available before each direct debit is processed.",
        },
        ko: "자동 이체가 처리되기 전에 잔액이 충분한지 확인해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "b1-w035",
    level: "B1",
    topic: "bank",
    word: { us: "bank statement" },
    ipa: { us: "ˈbæŋk ˌsteɪtmənt" },
    hangul: "뱅크 스테이트먼트",
    meaning: "은행 거래 명세서",
    collocations: ["download a bank statement", "a monthly statement"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The rental agent wanted three months of bank statements, which felt so invasive.",
        },
        ko: "부동산에서 은행 명세서 석 달치 달라는데 너무 사생활 침해 같았어.",
      },
      {
        tone: "daily",
        en: {
          us: "Can I get an official bank statement printed and stamped at this branch?",
        },
        ko: "이 지점에서 공식 은행 명세서를 출력하고 직인을 받을 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your visa application must include bank statements covering the past three months.",
        },
        ko: "비자 신청 시 최근 3개월간의 은행 명세서를 포함해야 합니다.",
      },
    ],
  },
  {
    id: "b1-w036",
    level: "B1",
    topic: "bank",
    word: { us: "transaction fee" },
    ipa: { us: "trænˈzækʃən fi" },
    hangul: "트랜잭션 피",
    meaning: "거래 수수료",
    collocations: [
      "charge a transaction fee",
      "an international transaction fee",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "This card charges no international transaction fees, so I use it everywhere abroad.",
        },
        ko: "이 카드는 해외 거래 수수료가 없어서 외국에서는 이것만 써.",
      },
      {
        tone: "daily",
        en: {
          us: "Is there a transaction fee when I withdraw cash from another bank's ATM?",
        },
        ko: "다른 은행 ATM에서 현금을 뽑으면 거래 수수료가 붙나요?",
      },
      {
        tone: "business",
        en: {
          us: "A transaction fee of three percent applies to all foreign currency purchases.",
        },
        ko: "모든 외화 결제에는 3퍼센트의 거래 수수료가 적용됩니다.",
      },
    ],
  },
  {
    id: "b1-w037",
    level: "B1",
    topic: "bank",
    word: { us: "interest rate" },
    ipa: { us: "ˈɪntrəst reɪt" },
    hangul: "인터레스트 레이트",
    meaning: "이자율, 금리",
    collocations: ["a high interest rate", "compare interest rates"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The interest rate on my savings account barely covers a coffee a month.",
        },
        ko: "내 적금 이자율로는 한 달에 커피 한 잔도 겨우 사.",
      },
      {
        tone: "daily",
        en: {
          us: "Which savings account offers the best interest rate for short-term deposits?",
        },
        ko: "단기 예치에 이자율이 가장 좋은 예금 계좌는 어떤 건가요?",
      },
      {
        tone: "business",
        en: {
          us: "The advertised interest rate applies only when no withdrawals are made that month.",
        },
        ko: "광고된 이자율은 해당 월에 출금이 없을 경우에만 적용됩니다.",
      },
    ],
  },
  {
    id: "b1-w038",
    level: "B1",
    topic: "bank",
    word: { us: "BSB number" },
    ipa: { us: "ˌbi ɛs ˈbi ˌnʌmbər" },
    hangul: "비에스비 넘버",
    meaning: "호주 은행 지점 식별 번호",
    nuance:
      "호주 계좌 이체에 꼭 필요한 6자리 번호예요. 미국의 routing number에 해당해요.",
    collocations: ["enter your BSB and account number", "look up a BSB number"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Just text me your BSB number and I will transfer my half tonight.",
        },
        ko: "BSB 번호만 보내 줘, 오늘 밤에 내 몫 이체할게.",
      },
      {
        tone: "daily",
        en: {
          us: "The payroll form asks for my BSB number as well as my account number.",
        },
        ko: "급여 양식에 계좌번호랑 BSB 번호도 적으라고 되어 있어요.",
      },
      {
        tone: "business",
        en: {
          us: "Please double-check the BSB number, as transfers to incorrect branches cannot be recalled easily.",
        },
        ko: "잘못된 지점으로의 이체는 회수가 어려우니 BSB 번호를 다시 확인해 주시기 바랍니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "routing number",
  },
  {
    id: "b1-w039",
    level: "B1",
    topic: "bank",
    word: { us: "wire transfer", au: "bank transfer" },
    ipa: { us: "ˈwaɪər ˌtrænsfər", au: "ˈbæŋk ˌtrænsfɜː" },
    hangul: "와이어 트랜스퍼",
    meaning: "계좌 이체, 송금",
    collocations: ["send a wire transfer", "an international transfer"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Mom sent me a wire transfer, but it took four days to land.",
          au: "Mum sent me a bank transfer, but it took four days to land.",
        },
        ko: "엄마가 송금해 줬는데 도착하는 데 나흘이나 걸렸어.",
      },
      {
        tone: "daily",
        en: {
          us: "What details do you need from me to make a wire transfer overseas?",
          au: "What details do you need from me to make a bank transfer overseas?",
        },
        ko: "해외로 송금하려면 제게서 어떤 정보가 필요하신가요?",
      },
      {
        tone: "business",
        en: {
          us: "International wire transfers received after noon are credited the following business day.",
          au: "International bank transfers received after noon are credited the following business day.",
        },
        ko: "정오 이후 수취된 해외 송금은 다음 영업일에 입금 처리됩니다.",
      },
    ],
  },
  {
    id: "b1-w040",
    level: "B1",
    topic: "bank",
    word: { us: "pending transaction" },
    ipa: { us: "ˈpɛndɪŋ trænˈzækʃən" },
    hangul: "펜딩 트랜잭션",
    meaning: "(처리) 대기 중인 거래",
    nuance:
      "결제 직후 잔액에서 빠져나간 것처럼 보여도 아직 확정 전 상태예요. 보통 2~3일 안에 확정돼요.",
    collocations: [
      "a pending transaction",
      "wait for the transaction to clear",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "That pending transaction is just the hotel deposit; it should disappear soon.",
        },
        ko: "그 대기 중 거래는 호텔 보증금이야, 곧 사라질 거야.",
      },
      {
        tone: "daily",
        en: {
          us: "Why is this payment still showing as a pending transaction after three days?",
        },
        ko: "이 결제가 왜 3일이 지나도록 대기 중 거래로 떠 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Pending transactions cannot be disputed until they have fully settled on the account.",
        },
        ko: "대기 중인 거래는 계좌에 완전히 확정된 후에야 이의 제기가 가능합니다.",
      },
    ],
  },
  // ---------- cafe ----------
  {
    id: "b1-w041",
    level: "B1",
    topic: "cafe",
    word: { us: "RSA certificate" },
    ipa: { us: "ˌɑr ɛs ˈeɪ sərˈtɪfɪkət" },
    hangul: "알에스에이 서티피킷",
    meaning: "책임 있는 주류 판매 자격증",
    nuance:
      "호주에서 술을 파는 카페나 바에서 일하려면 필수예요. 온라인으로 하루면 딸 수 있어요.",
    collocations: ["get your RSA certificate", "hold a valid RSA"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "You can't pour a single beer here without an RSA certificate.",
        },
        ko: "여기선 RSA 자격증 없으면 맥주 한 잔도 못 따라.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you tell me how long an RSA certificate stays valid?",
        },
        ko: "RSA 자격증이 얼마나 오래 유효한지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "All floor staff are required to hold a current RSA certificate before their first shift.",
        },
        ko: "모든 홀 직원은 첫 근무 전에 유효한 RSA 자격증을 소지해야 합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "alcohol server permit",
  },
  {
    id: "b1-w042",
    level: "B1",
    topic: "cafe",
    word: { us: "allergen" },
    ipa: { us: "ˈælərdʒən" },
    hangul: "앨러전",
    meaning: "알레르기 유발 물질",
    nuance:
      "손님이 물으면 정확히 답해야 하는 정보예요. 모르면 확인해 보겠다고 말하는 게 맞습니다.",
    collocations: [
      "allergen information",
      "does it contain any allergens",
      "an allergen list",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Ask about allergens before you order — she's allergic to nuts.",
        },
        ko: "주문 전에 알레르기 성분 물어봐. 걔 견과류 알레르기 있어.",
      },
      {
        tone: "daily",
        en: { us: "Does this contain any allergens?" },
        ko: "여기 알레르기 유발 성분이 들어 있나요?",
      },
      {
        tone: "business",
        en: { us: "Allergen information is available on request." },
        ko: "알레르기 유발 성분 정보는 요청하시면 안내해 드립니다.",
      },
    ],
  },
  {
    id: "b1-w043",
    level: "B1",
    topic: "cafe",
    word: { us: "to-go order", au: "takeaway order" },
    ipa: { us: "tə ˈɡoʊ ˌɔrdər", au: "ˈteɪkəweɪ ˌɔːdə" },
    hangul: "투 고 오더",
    meaning: "포장 주문",
    nuance:
      "미국에서는 to go나 for here, 호주에서는 takeaway나 have here를 써요.",
    collocations: ["place a to-go order", "a to-go cup"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I put in a to-go order so we don't have to wait inside.",
          au: "I put in a takeaway order so we don't have to wait inside.",
        },
        ko: "안에서 안 기다려도 되게 포장으로 주문해 뒀어.",
      },
      {
        tone: "daily",
        en: {
          us: "Is it possible to change my to-go order to eat in?",
          au: "Is it possible to change my takeaway order to eat in?",
        },
        ko: "포장 주문을 매장 식사로 바꿀 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "To-go orders placed online are usually ready within eight minutes.",
          au: "Takeaway orders placed online are usually ready within eight minutes.",
        },
        ko: "온라인으로 접수된 포장 주문은 보통 8분 이내에 준비됩니다.",
      },
    ],
  },
  {
    id: "b1-w044",
    level: "B1",
    topic: "cafe",
    word: { us: "dietary requirement" },
    ipa: { us: "ˈdaɪəˌtɛri rɪˈkwaɪərmənt" },
    hangul: "다이어터리 리콰이어먼트",
    meaning: "식이 요구 사항 (알레르기·채식 등)",
    collocations: [
      "special dietary requirements",
      "cater to dietary requirements",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Just tell them your dietary requirements; they're really good about allergies.",
        },
        ko: "식단 요구 사항 그냥 말해, 여기 알레르기 대응 잘해 줘.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you let me know if you have any dietary requirements before Saturday?",
        },
        ko: "토요일 전에 식이 요구 사항이 있으시면 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Guests with specific dietary requirements should notify the kitchen at least a day ahead.",
        },
        ko: "특정 식이 요구 사항이 있는 손님께서는 최소 하루 전에 주방에 알려 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "b1-w045",
    level: "B1",
    topic: "cafe",
    word: { us: "short-staffed" },
    ipa: { us: "ˌʃɔrt ˈstæft", au: "ˌʃɔːt ˈstɑːft" },
    hangul: "숏 스태프트",
    meaning: "일손이 부족한",
    nuance:
      "직원이 모자란 상태를 뜻해요. 갑자기 근무를 부탁받을 때 자주 듣는 말이에요.",
    collocations: ["be short-staffed", "short-staffed all weekend"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "We were so short-staffed yesterday that I never got a break.",
        },
        ko: "어제 사람이 너무 없어서 나 쉬는 시간도 못 가졌어.",
      },
      {
        tone: "daily",
        en: {
          us: "They asked me to come in early because the cafe is short-staffed.",
        },
        ko: "카페에 일손이 부족해서 일찍 나와 달라고 하더라고요.",
      },
      {
        tone: "business",
        en: {
          us: "If we are short-staffed on a public holiday, penalty rates will still apply.",
        },
        ko: "공휴일에 인력이 부족하더라도 할증 수당은 그대로 적용됩니다.",
      },
    ],
  },
  {
    id: "b1-w046",
    level: "B1",
    topic: "cafe",
    word: { us: "cash register", au: "till" },
    ipa: { us: "ˈkæʃ ˌrɛdʒɪstər", au: "tɪl" },
    hangul: "캐시 레지스터",
    meaning: "금전 등록기, 계산대",
    collocations: ["work the cash register", "the register came up short"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The cash register came up twenty dollars short, and everyone panicked.",
          au: "The till came up twenty dollars short, and everyone panicked.",
        },
        ko: "계산대가 20달러 비어서 다들 난리 났었어.",
      },
      {
        tone: "daily",
        en: {
          us: "Would you mind showing me how to open the cash register?",
          au: "Would you mind showing me how to open the till?",
        },
        ko: "계산대 여는 법을 알려 주실 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "The cash register must be reconciled by the closing supervisor every evening.",
          au: "The till must be reconciled by the closing supervisor every evening.",
        },
        ko: "금전 등록기는 매일 저녁 마감 관리자가 대사해야 합니다.",
      },
    ],
  },
  {
    id: "b1-w047",
    level: "B1",
    topic: "cafe",
    word: { us: "loyalty card" },
    ipa: { us: "ˈlɔɪəlti kɑrd" },
    hangul: "로열티 카드",
    meaning: "적립 카드, 단골 카드",
    collocations: ["stamp a loyalty card", "sign up for a loyalty card"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My loyalty card is nearly full, so the next coffee is free.",
        },
        ko: "적립 카드 거의 다 찼어, 다음 커피는 공짜야.",
      },
      {
        tone: "daily",
        en: {
          us: "Would you like me to stamp your loyalty card for today's purchase?",
        },
        ko: "오늘 구매분에 대해 적립 카드에 도장을 찍어 드릴까요?",
      },
      {
        tone: "business",
        en: {
          us: "Loyalty cards cannot be combined with any other discount currently being offered.",
        },
        ko: "적립 카드는 현재 진행 중인 다른 할인과 중복 적용될 수 없습니다.",
      },
    ],
  },
  {
    id: "b1-w048",
    level: "B1",
    topic: "cafe",
    word: { us: "closing shift" },
    ipa: { us: "ˈkloʊzɪŋ ʃɪft" },
    hangul: "클로징 시프트",
    meaning: "마감 근무",
    nuance:
      "청소와 정산까지 포함되기 때문에 예정 시간보다 늦게 끝나는 경우가 많아요.",
    collocations: ["work the closing shift", "swap a closing shift"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Would you swap your closing shift with my Tuesday morning one?",
        },
        ko: "네 마감 근무랑 내 화요일 아침 근무 바꿔 줄래?",
      },
      {
        tone: "daily",
        en: {
          us: "The closing shift usually runs about half an hour over, doesn't it?",
        },
        ko: "마감 근무는 보통 30분 정도 초과되죠?",
      },
      {
        tone: "business",
        en: {
          us: "Staff on the closing shift are responsible for locking up and setting the alarm.",
        },
        ko: "마감 근무 직원은 문단속과 경보 설정을 책임집니다.",
      },
    ],
  },
  {
    id: "b1-w049",
    level: "B1",
    topic: "cafe",
    word: { us: "morning rush" },
    ipa: { us: "ˈmɔrnɪŋ rʌʃ" },
    hangul: "모닝 러시",
    meaning: "아침 붐비는 시간대",
    collocations: ["during the morning rush", "get through the morning rush"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Don't call me between seven and nine; that's the morning rush.",
        },
        ko: "7시에서 9시 사이엔 전화하지 마, 그때가 아침 러시야.",
      },
      {
        tone: "daily",
        en: {
          us: "How many people usually work the counter during the morning rush?",
        },
        ko: "아침 붐비는 시간에는 보통 몇 명이 카운터에서 일하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Additional staff have been scheduled to cover the morning rush from Monday.",
          au: "Additional staff have been rostered to cover the morning rush from Monday.",
        },
        ko: "월요일부터 아침 혼잡 시간대를 담당할 추가 인력이 배치되었습니다.",
      },
    ],
  },
  {
    id: "b1-w050",
    level: "B1",
    topic: "cafe",
    word: { us: "table number" },
    ipa: { us: "ˈteɪbəl ˈnʌmbər" },
    hangul: "테이블 넘버",
    meaning: "테이블 번호",
    nuance:
      "카운터에서 주문하고 자리에 앉는 방식이라, 번호를 말해야 음식이 옵니다.",
    collocations: [
      "what's your table number",
      "take the table number with you",
      "table twelve",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Take the table number with you when you order." },
        ko: "주문할 때 테이블 번호 들고 가.",
      },
      {
        tone: "daily",
        en: {
          us: "Sorry, I forgot to give you my table number — it's fourteen.",
        },
        ko: "죄송해요, 테이블 번호를 안 알려 드렸네요. 14번이에요.",
      },
      {
        tone: "business",
        en: { us: "Please take your table number to the counter to order." },
        ko: "주문하실 때 테이블 번호를 카운터로 가져와 주세요.",
      },
    ],
  },
  // ---------- shopping ----------
  {
    id: "b1-w051",
    level: "B1",
    topic: "shopping",
    word: { us: "proof of purchase" },
    ipa: { us: "ˌpruf əv ˈpɜrtʃəs" },
    hangul: "프루프 오브 퍼체스",
    meaning: "구매 증빙 (영수증 등)",
    nuance:
      "영수증이 없어도 카드 명세서나 이메일 확인서가 증빙으로 인정되는 경우가 많아요.",
    collocations: ["provide proof of purchase", "without proof of purchase"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I lost the receipt, but my bank app counts as proof of purchase.",
        },
        ko: "영수증은 잃어버렸는데 은행 앱이 구매 증빙으로 인정되더라.",
      },
      {
        tone: "daily",
        en: { us: "Would a photo of the receipt work as proof of purchase?" },
        ko: "영수증 사진도 구매 증빙으로 인정되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Refunds cannot be processed unless proof of purchase is presented at the counter.",
        },
        ko: "구매 증빙을 카운터에 제시하지 않으면 환불이 처리될 수 없습니다.",
      },
    ],
  },
  {
    id: "b1-w052",
    level: "B1",
    topic: "shopping",
    word: { us: "backorder" },
    ipa: { us: "ˈbækˌɔːrdər" },
    hangul: "백오더",
    meaning: "재입고 대기 주문",
    nuance: "지금 재고가 없어도 주문을 걸어 두고 들어오면 받는 방식이에요.",
    collocations: [
      "on backorder",
      "put it on backorder",
      "the backorder will ship",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "It's on backorder, so it won't arrive until next month." },
        ko: "그거 재입고 대기라서 다음 달에나 와.",
      },
      {
        tone: "daily",
        en: { us: "Can you put it on backorder and call me when it's in?" },
        ko: "재입고 주문을 걸어 두고 들어오면 연락 주실 수 있나요?",
      },
      {
        tone: "business",
        en: { us: "Backordered items are charged only when they ship." },
        ko: "재입고 대기 상품은 발송 시점에만 결제가 이루어집니다.",
      },
    ],
  },
  {
    id: "b1-w053",
    level: "B1",
    topic: "shopping",
    word: { us: "haggle" },
    ipa: { us: "ˈhæɡəl" },
    hangul: "해글",
    meaning: "값을 흥정하다",
    nuance: "일반 매장에서는 잘 안 통하지만, 중고 거래나 마켓에서는 흔해요.",
    collocations: [
      "haggle over the price",
      "no haggling",
      "he haggled it down",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "I haggled him down to eighty at the market." },
        ko: "마켓에서 흥정해서 80달러까지 깎았어.",
      },
      {
        tone: "daily",
        en: { us: "Is there any room to haggle on the price?" },
        ko: "가격을 좀 조정할 여지가 있을까요?",
      },
      {
        tone: "business",
        en: { us: "Listed prices are fixed and not open to haggling." },
        ko: "표시 가격은 정찰가이며 흥정 대상이 아닙니다.",
      },
    ],
  },
  {
    id: "b1-w054",
    level: "B1",
    topic: "shopping",
    word: { us: "store credit" },
    ipa: { us: "ˈstɔr ˌkrɛdɪt" },
    hangul: "스토어 크레딧",
    meaning: "매장 적립금, 교환권",
    nuance:
      "단순 변심 반품은 현금 대신 store credit으로만 돌려주는 곳이 많아요.",
    collocations: ["issue store credit", "accept store credit"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "They wouldn't refund my card, so I got store credit instead.",
        },
        ko: "카드로는 환불 안 해 주고 대신 매장 적립금으로 줬어.",
      },
      {
        tone: "daily",
        en: { us: "Is store credit the only option, or could I get a refund?" },
        ko: "매장 적립금만 가능한가요, 아니면 환불도 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Store credit remains valid for twelve months from the date it was issued.",
        },
        ko: "매장 적립금은 발행일로부터 12개월간 유효합니다.",
      },
    ],
  },
  {
    id: "b1-w055",
    level: "B1",
    topic: "shopping",
    word: { us: "return policy" },
    ipa: { us: "rɪˈtɜrn ˌpɑləsi" },
    hangul: "리턴 폴리시",
    meaning: "반품 규정",
    collocations: ["check the return policy", "a thirty-day return policy"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Check the return policy before you buy; that shop is really strict.",
        },
        ko: "사기 전에 반품 규정 봐, 그 가게 진짜 깐깐해.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you explain what the return policy is for sale items?",
        },
        ko: "세일 상품의 반품 규정이 어떻게 되는지 설명해 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Our return policy allows exchanges within thirty days, provided the tags remain attached.",
        },
        ko: "당사 반품 규정상 택이 부착되어 있으면 30일 이내 교환이 가능합니다.",
      },
    ],
  },
  {
    id: "b1-w056",
    level: "B1",
    topic: "shopping",
    word: { us: "layaway", au: "layby" },
    ipa: { us: "ˈleɪəˌweɪ", au: "ˈleɪbaɪ" },
    hangul: "레이어웨이",
    meaning: "예약 구매 (분할 납입 후 수령)",
    nuance:
      "물건을 맡겨 두고 나눠 낸 뒤 완납하면 가져가는 방식이에요. 호주에서는 layby라고 해요.",
    collocations: ["put something on layaway", "a layaway plan"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I put the jacket on layaway and pay it off every payday.",
          au: "I put the jacket on layby and pay it off every payday.",
        },
        ko: "재킷 예약 구매로 걸어 놓고 월급날마다 갚고 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Do you offer layaway on furniture, or is it cash only?",
          au: "Do you offer layby on furniture, or is it cash only?",
        },
        ko: "가구도 예약 구매가 되나요, 아니면 현금 결제만 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Layaway agreements will lapse automatically if no payment is made within sixty days.",
          au: "Layby agreements will lapse automatically if no payment is made within sixty days.",
        },
        ko: "60일 이내에 납입이 없으면 예약 구매 약정은 자동으로 실효됩니다.",
      },
    ],
  },
  {
    id: "b1-w057",
    level: "B1",
    topic: "shopping",
    word: { us: "clearance sale" },
    ipa: { us: "ˈklɪrəns seɪl" },
    hangul: "클리어런스 세일",
    meaning: "재고 정리 세일",
    collocations: ["a clearance sale", "clearance stock"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I only bought it because the clearance sale knocked sixty percent off.",
        },
        ko: "재고 정리 세일로 60퍼센트나 깎여서 산 거야.",
      },
      {
        tone: "daily",
        en: {
          us: "When does the winter clearance sale usually start in this store?",
        },
        ko: "이 매장은 겨울 재고 정리 세일이 보통 언제 시작하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Clearance stock is sold as is and cannot be exchanged or refunded.",
        },
        ko: "재고 정리 상품은 현 상태로 판매되며 교환이나 환불이 불가합니다.",
      },
    ],
  },
  {
    id: "b1-w058",
    level: "B1",
    topic: "shopping",
    word: { us: "consumer guarantee" },
    ipa: { us: "kənˈsuːmər ˌɡɛrənˈtiː" },
    hangul: "컨슈머 개런티",
    meaning: "소비자 보호법상 보장",
    nuance:
      "호주 소비자법(ACL)이 주는 권리라 매장 규정보다 우선해요. '보증 기간 끝났다' 는 말에 물러설 필요가 없습니다.",
    collocations: [
      "under consumer guarantees",
      "your consumer guarantee rights",
      "a major failure",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Consumer guarantees still apply even without a warranty." },
        ko: "보증서가 없어도 소비자법상 보장은 그대로 적용돼.",
      },
      {
        tone: "daily",
        en: { us: "I think this is covered by consumer guarantees." },
        ko: "이건 소비자 보호법상 보장 대상인 것 같은데요.",
      },
      {
        tone: "business",
        en: {
          us: "Nothing here limits your rights under consumer guarantees.",
        },
        ko: "본 약관의 어떤 내용도 소비자 보호법상의 권리를 제한하지 않습니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "implied warranty",
  },
  {
    id: "b1-w059",
    level: "B1",
    topic: "shopping",
    word: { us: "price match" },
    ipa: { us: "ˈpraɪs mætʃ" },
    hangul: "프라이스 매치",
    meaning: "최저가 보장, 경쟁점 가격 맞춰 주기",
    nuance: "다른 매장의 광고 가격을 보여 주면 같은 값에 맞춰 주는 제도예요.",
    collocations: ["ask for a price match", "a price match guarantee"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Show them the ad on your phone and they'll price match it.",
        },
        ko: "휴대폰으로 광고 보여 주면 그 가격에 맞춰 줄 거야.",
      },
      {
        tone: "daily",
        en: {
          us: "Would you be able to price match the offer from the store next door?",
        },
        ko: "옆 가게 가격에 맞춰 주실 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "Price matching applies only to identical items advertised by a local competitor.",
        },
        ko: "최저가 보장은 지역 경쟁사가 광고한 동일 상품에 한해 적용됩니다.",
      },
    ],
  },
  {
    id: "b1-w060",
    level: "B1",
    topic: "shopping",
    word: { us: "cooling-off period" },
    ipa: { us: "ˈkulɪŋ ˌɔf ˌpɪriəd" },
    hangul: "쿨링 오프 피리어드",
    meaning: "청약 철회 기간",
    nuance: "방문 판매나 계약 직후 위약금 없이 취소할 수 있는 며칠간을 말해요.",
    collocations: [
      "a ten-day cooling-off period",
      "within the cooling-off period",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Cancel it now; you're still inside the cooling-off period.",
        },
        ko: "지금 취소해, 아직 청약 철회 기간 안이야.",
      },
      {
        tone: "daily",
        en: { us: "How long is the cooling-off period on this gym contract?" },
        ko: "이 헬스장 계약의 청약 철회 기간은 얼마나 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "You may withdraw from the agreement without penalty during the cooling-off period.",
        },
        ko: "청약 철회 기간 중에는 위약금 없이 계약을 철회하실 수 있습니다.",
      },
    ],
  },
  // ---------- transport ----------
  {
    id: "b1-w061",
    level: "B1",
    topic: "transport",
    word: { us: "off-peak" },
    ipa: { us: "ˌɔːf ˈpiːk" },
    hangul: "오프 피크",
    meaning: "비혼잡 시간대의",
    nuance:
      "요금이 싸지는 시간대예요. 통근 시간대를 피하면 교통비를 아낄 수 있습니다.",
    collocations: [
      "off-peak fares",
      "travel off-peak",
      "an off-peak daily cap",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Travel off-peak if you can — the fare drops a fair bit." },
        ko: "가능하면 비혼잡 시간에 다녀. 요금이 꽤 내려가.",
      },
      {
        tone: "daily",
        en: { us: "Do off-peak fares apply on weekends?" },
        ko: "주말에도 비혼잡 요금이 적용되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Off-peak fares apply outside weekday morning and evening periods.",
        },
        ko: "비혼잡 요금은 평일 출퇴근 시간대를 제외한 시간에 적용됩니다.",
      },
    ],
  },
  {
    id: "b1-w062",
    level: "B1",
    topic: "transport",
    word: { us: "roadworthy certificate" },
    ipa: { us: "ˈroʊdˌwɜːrði sərˈtɪfɪkət" },
    hangul: "로드워디 서티피컷",
    meaning: "차량 안전 검사 증명서",
    nuance:
      "중고차를 사고팔 때 필요한 서류예요. 없는 차는 명의 이전이 안 되니 계약 전에 확인하세요.",
    collocations: [
      "does it come with a roadworthy",
      "get a roadworthy certificate",
      "a current roadworthy",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Don't buy it without a roadworthy — you can't transfer it.",
        },
        ko: "안전 검사증 없으면 사지 마. 명의 이전이 안 돼.",
      },
      {
        tone: "daily",
        en: { us: "Does the car come with a roadworthy certificate?" },
        ko: "그 차에 안전 검사 증명서가 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "A current roadworthy certificate is required to transfer registration.",
        },
        ko: "등록 명의 이전에는 유효한 차량 안전 검사 증명서가 필요합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "safety inspection certificate",
  },
  {
    id: "b1-w063",
    level: "B1",
    topic: "transport",
    word: { us: "transfer" },
    ipa: { us: "ˈtrænsfər", au: "ˈtrænsfɜː" },
    hangul: "트랜스퍼",
    meaning: "환승, 갈아타기",
    collocations: ["transfer to another line", "a free transfer"],
    examples: [
      {
        tone: "friend",
        en: { us: "You'll have to transfer twice, so leave a bit earlier." },
        ko: "두 번 갈아타야 하니까 좀 더 일찍 나와.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you tell me where I should transfer to the airport line?",
        },
        ko: "공항 노선으로 어디에서 갈아타야 하는지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Passengers who transfer within sixty minutes will not be charged a second fare.",
        },
        ko: "60분 이내에 환승하시는 승객에게는 추가 요금이 부과되지 않습니다.",
      },
    ],
  },
  {
    id: "b1-w064",
    level: "B1",
    topic: "transport",
    word: { us: "fare evasion" },
    ipa: { us: "ˈfɛr ɪˌveɪʒən" },
    hangul: "페어 이베이전",
    meaning: "무임승차",
    nuance:
      "호주 대도시에서는 사복 검표원이 수시로 다니고 벌금이 수백 달러에 달해요.",
    collocations: ["a fare evasion fine", "be fined for fare evasion"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "He got caught for fare evasion and the fine was two hundred dollars.",
        },
        ko: "걔 무임승차 걸려서 벌금 200달러 나왔어.",
      },
      {
        tone: "daily",
        en: {
          us: "What happens if my card fails to scan and I'm accused of fare evasion?",
        },
        ko: "카드가 인식이 안 돼서 무임승차로 오해받으면 어떻게 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Fare evasion is monitored by plain-clothes inspectors and carries an on-the-spot fine.",
        },
        ko: "무임승차는 사복 검표원이 단속하며 현장에서 벌금이 부과됩니다.",
      },
    ],
  },
  {
    id: "b1-w065",
    level: "B1",
    topic: "transport",
    word: { us: "service disruption" },
    ipa: { us: "ˈsɜrvɪs dɪsˈrʌpʃən" },
    hangul: "서비스 디스럽션",
    meaning: "운행 차질, 운행 장애",
    collocations: ["a major service disruption", "due to service disruptions"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "There's a service disruption on my line, so I'm taking a bus.",
        },
        ko: "내 노선에 운행 차질이 생겨서 버스 타고 가는 중이야.",
      },
      {
        tone: "daily",
        en: {
          us: "Is the service disruption expected to last through the evening as well?",
        },
        ko: "운행 차질이 저녁까지도 계속될 것으로 보이나요?",
      },
      {
        tone: "business",
        en: {
          us: "Passengers affected by the service disruption may request a fare refund online.",
        },
        ko: "운행 차질의 영향을 받으신 승객은 온라인으로 요금 환불을 요청하실 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w066",
    level: "B1",
    topic: "transport",
    word: { us: "demerit points" },
    ipa: { us: "dɪˈmɛrɪt pɔɪnts" },
    hangul: "디메릿 포인츠",
    meaning: "운전 벌점",
    nuance:
      "호주는 벌점이 쌓이면 면허가 정지돼요. 워홀러의 해외 면허에도 기록이 남습니다.",
    collocations: [
      "lose demerit points",
      "three demerit points",
      "reach the demerit point limit",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "That camera cost me three demerit points and a fine." },
        ko: "그 단속 카메라 때문에 벌점 3점에 벌금까지 물었어.",
      },
      {
        tone: "daily",
        en: { us: "How many demerit points do I have left?" },
        ko: "제 벌점이 몇 점 남아 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your licence will be suspended once you reach the demerit limit.",
        },
        ko: "벌점 한도에 도달하면 면허가 정지됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "license points",
  },
  {
    id: "b1-w067",
    level: "B1",
    topic: "transport",
    word: { us: "roadside assistance" },
    ipa: { us: "ˈroʊdˌsaɪd əˈsɪstəns" },
    hangul: "로드사이드 어시스턴스",
    meaning: "긴급 출동 서비스",
    collocations: [
      "call roadside assistance",
      "a roadside assistance membership",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My battery died out of town, so I called roadside assistance.",
        },
        ko: "시외에서 배터리 나가서 긴급 출동 불렀어.",
      },
      {
        tone: "daily",
        en: {
          us: "Does the rental include roadside assistance if the car breaks down?",
        },
        ko: "렌터카가 고장 나면 긴급 출동 서비스가 포함되어 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Roadside assistance is available around the clock, though a call-out fee may apply.",
        },
        ko: "긴급 출동 서비스는 24시간 이용 가능하나 출동 비용이 부과될 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w068",
    level: "B1",
    topic: "transport",
    word: { us: "toll road" },
    ipa: { us: "ˈtoʊl roʊd" },
    hangul: "톨 로드",
    meaning: "유료 도로",
    nuance:
      "호주 도시의 유료 고속도로는 요금소 없이 번호판이 자동 인식되고 나중에 청구서가 와요.",
    collocations: ["take the toll road", "toll road charges"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I took the toll road by accident and got billed a week later.",
        },
        ko: "실수로 유료 도로 탔다가 일주일 뒤에 청구서 날아왔어.",
      },
      {
        tone: "daily",
        en: { us: "Is there a way to avoid the toll road on the way north?" },
        ko: "북쪽으로 갈 때 유료 도로를 피할 방법이 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Toll road charges incurred during the rental period will be deducted from your deposit.",
        },
        ko: "대여 기간 중 발생한 유료 도로 요금은 보증금에서 차감됩니다.",
      },
    ],
  },
  {
    id: "b1-w069",
    level: "B1",
    topic: "transport",
    word: { us: "carpool" },
    ipa: { us: "ˈkɑrˌpul" },
    hangul: "카풀",
    meaning: "카풀, 승용차 함께 타기",
    collocations: ["carpool to work", "a carpool lane"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "If we carpool to the farm, we'll each save about forty dollars.",
        },
        ko: "농장까지 카풀하면 각자 40달러 정도 아낄 수 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Would you be interested in carpooling with me on weekday mornings?",
        },
        ko: "평일 아침에 저랑 카풀하실 생각 있으세요?",
      },
      {
        tone: "business",
        en: {
          us: "Employees who carpool regularly may apply for a discounted parking permit.",
        },
        ko: "정기적으로 카풀하는 직원은 주차권 할인을 신청하실 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w070",
    level: "B1",
    topic: "transport",
    word: { us: "detour" },
    ipa: { us: "ˈditʊr" },
    hangul: "디투어",
    meaning: "우회, 우회로",
    collocations: ["take a detour", "a signposted detour"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "We had to take a long detour because the bridge was closed.",
        },
        ko: "다리가 막혀 있어서 한참 돌아가야 했어.",
      },
      {
        tone: "daily",
        en: {
          us: "How much extra time does the detour usually add to the trip?",
        },
        ko: "우회로를 이용하면 보통 시간이 얼마나 더 걸리나요?",
      },
      {
        tone: "business",
        en: {
          us: "A signposted detour has been arranged while the intersection is being resurfaced.",
        },
        ko: "교차로 재포장 기간에는 표지가 설치된 우회로가 운영됩니다.",
      },
    ],
  },
  // ---------- health ----------
  {
    id: "b1-w071",
    level: "B1",
    topic: "health",
    word: { us: "telehealth" },
    ipa: { us: "ˈtɛlɪhɛlθ" },
    hangul: "텔레헬스",
    meaning: "원격 진료",
    nuance:
      "전화나 화상으로 의사를 만나는 방식이에요. 처방전도 약국으로 바로 보내 줍니다.",
    collocations: [
      "a telehealth appointment",
      "book a telehealth consult",
      "telehealth is available",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I did a telehealth call and they sent the script straight to the chemist.",
        },
        ko: "원격 진료 받았더니 처방전을 약국으로 바로 보내 주더라.",
      },
      {
        tone: "daily",
        en: { us: "Can I book a telehealth appointment instead of coming in?" },
        ko: "방문 대신 원격 진료로 예약할 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Telehealth consultations are available on weekday evenings.",
        },
        ko: "원격 진료는 평일 저녁에 이용하실 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w072",
    level: "B1",
    topic: "health",
    word: { us: "referral" },
    ipa: { us: "rɪˈfɜrəl" },
    hangul: "리퍼럴",
    meaning: "진료 의뢰(서)",
    nuance:
      "전문의 진료를 받으려면 일반의의 referral이 있어야 보험 혜택을 받을 수 있어요.",
    collocations: ["get a referral", "a referral to a specialist"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "You can't see a specialist here without a referral from a doctor.",
        },
        ko: "여긴 의사 의뢰서 없으면 전문의 진료 못 봐.",
      },
      {
        tone: "daily",
        en: { us: "Could you write me a referral to a dermatologist, please?" },
        ko: "피부과 진료 의뢰서를 써 주실 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "A referral from your general practitioner must be attached to the claim form.",
        },
        ko: "청구서에는 일반의가 발급한 진료 의뢰서를 첨부하셔야 합니다.",
      },
    ],
  },
  {
    id: "b1-w073",
    level: "B1",
    topic: "health",
    word: { us: "specialist" },
    ipa: { us: "ˈspɛʃəlɪst" },
    hangul: "스페셜리스트",
    meaning: "전문의",
    nuance:
      "호주에서는 GP 의 소견서(referral) 없이는 전문의 진료를 받기 어려워요.",
    collocations: [
      "see a specialist",
      "a referral to a specialist",
      "the specialist's waiting list",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "The GP is sending me to a specialist next month." },
        ko: "일반의가 다음 달에 전문의한테 보내 준대.",
      },
      {
        tone: "daily",
        en: { us: "Do I need a referral to see a specialist?" },
        ko: "전문의 진료를 받으려면 소견서가 필요한가요?",
      },
      {
        tone: "business",
        en: { us: "The specialist's fee is not fully covered by your policy." },
        ko: "전문의 진료비는 보험으로 전액 보장되지 않습니다.",
      },
    ],
  },
  {
    id: "b1-w074",
    level: "B1",
    topic: "health",
    word: { us: "drugstore", au: "chemist" },
    ipa: { us: "ˈdrʌɡˌstɔr", au: "ˈkemɪst" },
    hangul: "드러그스토어",
    meaning: "약국",
    nuance:
      "호주에서는 chemist 또는 pharmacy라고 해요. drugstore는 거의 쓰지 않아요.",
    collocations: ["the nearest drugstore", "an all-night drugstore"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "There's a drugstore around the corner that's open until midnight.",
          au: "There's a chemist around the corner that's open until midnight.",
        },
        ko: "모퉁이 돌면 자정까지 여는 약국 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Is there a drugstore nearby where I can buy painkillers?",
          au: "Is there a chemist nearby where I can buy painkillers?",
        },
        ko: "근처에 진통제를 살 수 있는 약국이 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Please collect your medication from the drugstore within seven days of your appointment.",
          au: "Please collect your medication from the chemist within seven days of your appointment.",
        },
        ko: "진료일로부터 7일 이내에 약국에서 약을 수령해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "b1-w075",
    level: "B1",
    topic: "health",
    word: { us: "immunization record", au: "immunisation record" },
    ipa: { us: "ˌɪmjənəˈzeɪʃən ˈrɛkərd" },
    hangul: "이뮤니제이션 레코드",
    meaning: "예방접종 기록",
    nuance:
      "일부 농장 일이나 병원·보육 관련 일자리에서 요구해요. 출국 전에 영문본을 챙기면 편합니다.",
    collocations: [
      "provide your immunization record",
      "an up-to-date immunization record",
      "request a copy of the record",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "They asked for my immunization record before the first shift.",
        },
        ko: "첫 근무 전에 예방접종 기록을 달라고 하더라.",
      },
      {
        tone: "daily",
        en: {
          us: "Where can I get an English copy of my immunization record?",
        },
        ko: "예방접종 기록 영문본은 어디서 받을 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "An up-to-date immunization record is required for this role.",
        },
        ko: "이 직무에는 최신 예방접종 기록이 필요합니다.",
      },
    ],
  },
  {
    id: "b1-w076",
    level: "B1",
    topic: "health",
    word: { us: "primary care physician", au: "GP" },
    ipa: { us: "ˈpraɪˌmɛri ˈkɛr fɪˈzɪʃən", au: "ˌdʒiː ˈpiː" },
    hangul: "프라이머리 케어 피지션",
    meaning: "1차 진료 의사, 일반의",
    nuance:
      "호주에서는 GP(general practitioner)라고 부르며 거의 모든 진료의 출발점이에요.",
    collocations: ["see your primary care physician", "register with a doctor"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "You should see a primary care physician before that cough gets worse.",
          au: "You should see a GP before that cough gets worse.",
        },
        ko: "기침 더 심해지기 전에 일반의한테 가 봐.",
      },
      {
        tone: "daily",
        en: {
          us: "How soon can I get an appointment with a primary care physician?",
          au: "How soon can I get an appointment with a GP?",
        },
        ko: "일반의 진료 예약은 얼마나 빨리 잡을 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your primary care physician will forward the test results within three working days.",
          au: "Your GP will forward the test results within three working days.",
        },
        ko: "담당 일반의가 3영업일 이내에 검사 결과를 전달해 드릴 예정입니다.",
      },
    ],
  },
  {
    id: "b1-w077",
    level: "B1",
    topic: "health",
    word: { us: "medical certificate" },
    ipa: { us: "ˈmɛdɪkəl sərˈtɪfɪkət" },
    hangul: "메디컬 서티피킷",
    meaning: "진단서, 병가 확인서",
    nuance:
      "병가를 쓰면 고용주가 요구할 수 있어요. 진료 당일에 미리 받아 두는 게 안전해요.",
    collocations: [
      "ask for a medical certificate",
      "provide a medical certificate",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My boss wants a medical certificate even for one sick day.",
        },
        ko: "우리 사장은 병가 하루 써도 진단서 내래.",
      },
      {
        tone: "daily",
        en: {
          us: "Would you be able to issue a medical certificate for two days?",
        },
        ko: "이틀치 병가 확인서를 발급해 주실 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "A medical certificate must be submitted within forty-eight hours of the absence.",
        },
        ko: "진단서는 결근 후 48시간 이내에 제출되어야 합니다.",
      },
    ],
  },
  {
    id: "b1-w078",
    level: "B1",
    topic: "health",
    word: { us: "claim" },
    ipa: { us: "kleɪm" },
    hangul: "클레임",
    meaning: "(보험금) 청구, 청구하다",
    collocations: ["make a claim", "submit an insurance claim"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I claimed the dentist bill back and got most of it returned.",
        },
        ko: "치과 비용 청구했더니 대부분 돌려받았어.",
      },
      {
        tone: "daily",
        en: {
          us: "How long does an insurance claim usually take to be processed?",
        },
        ko: "보험 청구는 보통 처리되는 데 얼마나 걸리나요?",
      },
      {
        tone: "business",
        en: {
          us: "Claims filed more than two years after treatment will not be considered.",
          au: "Claims lodged more than two years after treatment will not be considered.",
        },
        ko: "치료 후 2년이 지나 접수된 청구는 심사 대상에서 제외됩니다.",
      },
    ],
  },
  {
    id: "b1-w079",
    level: "B1",
    topic: "health",
    word: { us: "allergic reaction" },
    ipa: { us: "əˈlɜrdʒɪk riˈækʃən" },
    hangul: "얼러직 리액션",
    meaning: "알레르기 반응",
    collocations: ["have an allergic reaction", "a severe allergic reaction"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I had an allergic reaction to those nuts and my lips swelled up.",
        },
        ko: "그 견과류에 알레르기 반응이 와서 입술이 부었었어.",
      },
      {
        tone: "daily",
        en: {
          us: "What should I do if I have an allergic reaction to this medicine?",
        },
        ko: "이 약에 알레르기 반응이 생기면 어떻게 해야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Staff must be informed immediately if a customer shows signs of an allergic reaction.",
        },
        ko: "고객에게 알레르기 반응 징후가 보이면 즉시 직원에게 알려야 합니다.",
      },
    ],
  },
  {
    id: "b1-w080",
    level: "B1",
    topic: "health",
    word: { us: "out-of-pocket cost" },
    ipa: { us: "ˌaʊt əv ˈpɑkɪt kɔst" },
    hangul: "아웃 오브 포킷 코스트",
    meaning: "본인 부담금",
    nuance:
      "보험이나 메디케어가 부담한 금액을 뺀 뒤 환자가 직접 내는 차액을 말해요.",
    collocations: ["an out-of-pocket cost", "cover the out-of-pocket expenses"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The scan was covered, but the out-of-pocket cost still hurt.",
        },
        ko: "검사는 보험 처리됐는데 본인 부담금이 그래도 아팠어.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you tell me roughly what the out-of-pocket cost will be?",
        },
        ko: "본인 부담금이 대략 얼마나 되는지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Any out-of-pocket costs must be settled at reception before you leave the clinic.",
        },
        ko: "본인 부담금은 병원을 나가시기 전에 접수처에서 정산해 주셔야 합니다.",
      },
    ],
  },
  // ---------- phone ----------
  {
    id: "b1-w081",
    level: "B1",
    topic: "phone",
    word: { us: "prepaid plan" },
    ipa: { us: "ˌpriˈpeɪd plæn" },
    hangul: "프리페이드 플랜",
    meaning: "선불 요금제",
    nuance:
      "약정이 없어서 워홀러에게 유리해요. 대신 매달 직접 충전해야 한다는 점만 기억하세요.",
    collocations: ["switch to a prepaid plan", "a prepaid SIM"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Go with a prepaid plan first; you can always upgrade later.",
        },
        ko: "처음엔 선불 요금제로 해, 나중에 언제든 바꿀 수 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Which prepaid plan gives the most data for thirty dollars?",
        },
        ko: "30달러로 데이터를 가장 많이 주는 선불 요금제는 어떤 건가요?",
      },
      {
        tone: "business",
        en: {
          us: "Prepaid plans expire after twenty-eight days unless they are renewed manually.",
        },
        ko: "선불 요금제는 직접 갱신하지 않으면 28일 후 만료됩니다.",
      },
    ],
  },
  {
    id: "b1-w082",
    level: "B1",
    topic: "phone",
    word: { us: "cell phone plan", au: "mobile plan" },
    ipa: { us: "ˈsɛl foʊn plæn", au: "ˈməʊbaɪl plæn" },
    hangul: "셀 폰 플랜",
    meaning: "휴대폰 요금제",
    collocations: ["compare cell phone plans", "cancel a plan"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My cell phone plan renews tomorrow, so I'm switching providers tonight.",
          au: "My mobile plan renews tomorrow, so I'm switching providers tonight.",
        },
        ko: "내 요금제가 내일 갱신돼서 오늘 밤에 통신사 옮기려고.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you explain what this cell phone plan includes besides calls?",
          au: "Could you explain what this mobile plan includes besides calls?",
        },
        ko: "이 휴대폰 요금제가 통화 외에 무엇을 포함하는지 설명해 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Cell phone plans may be transferred to another name once identity has been verified.",
          au: "Mobile plans may be transferred to another name once identity has been verified.",
        },
        ko: "휴대폰 요금제는 본인 확인이 완료되면 타인 명의로 이전할 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w083",
    level: "B1",
    topic: "phone",
    word: { us: "data allowance" },
    ipa: { us: "ˈdeɪtə əˈlaʊəns", au: "ˈdɑːtə əˈlaʊəns" },
    hangul: "데이터 얼라우언스",
    meaning: "데이터 제공량",
    collocations: ["use up your data allowance", "a monthly data allowance"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I burned through my whole data allowance in the first two weeks.",
        },
        ko: "첫 2주 만에 데이터 제공량 다 써 버렸어.",
      },
      {
        tone: "daily",
        en: { us: "What happens once I've used up my monthly data allowance?" },
        ko: "월 데이터 제공량을 다 쓰면 어떻게 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Unused data allowance does not roll over into the following billing period.",
        },
        ko: "사용하지 않은 데이터 제공량은 다음 청구 기간으로 이월되지 않습니다.",
      },
    ],
  },
  {
    id: "b1-w084",
    level: "B1",
    topic: "phone",
    word: { us: "reception" },
    ipa: { us: "rɪˈsɛpʃən" },
    hangul: "리셉션",
    meaning: "(전파) 수신 상태",
    nuance:
      "여기서는 '접수처'가 아니라 신호가 잡히는 정도를 뜻해요. 외곽에서는 통신사별 차이가 커요.",
    collocations: ["get good reception", "no reception at all"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "There was no reception on the farm, so nobody could reach me.",
        },
        ko: "농장에 신호가 아예 안 잡혀서 아무도 나한테 연락 못 했어.",
      },
      {
        tone: "daily",
        en: {
          us: "Is the reception usually this weak inside the shopping center?",
          au: "Is the reception usually this weak inside the shopping centre?",
        },
        ko: "쇼핑센터 안에서는 원래 수신이 이렇게 약한가요?",
      },
      {
        tone: "business",
        en: {
          us: "Reception may be limited in regional areas, so please download the map beforehand.",
        },
        ko: "지방에서는 수신이 제한될 수 있으니 지도를 미리 내려받아 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "b1-w085",
    level: "B1",
    topic: "phone",
    word: { us: "roaming charges" },
    ipa: { us: "ˈroʊmɪŋ ˌtʃɑrdʒɪz" },
    hangul: "로밍 차지스",
    meaning: "로밍 요금",
    collocations: ["avoid roaming charges", "international roaming"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Turn off data at the border or the roaming charges will hurt.",
        },
        ko: "국경 넘기 전에 데이터 꺼, 안 그러면 로밍 요금 폭탄 맞아.",
      },
      {
        tone: "daily",
        en: { us: "Would I still pay roaming charges if I only use Wi-Fi?" },
        ko: "와이파이만 사용해도 로밍 요금이 부과되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Roaming charges apply from the moment your device connects to an overseas network.",
        },
        ko: "로밍 요금은 단말기가 해외 통신망에 접속되는 순간부터 부과됩니다.",
      },
    ],
  },
  {
    id: "b1-w086",
    level: "B1",
    topic: "phone",
    word: { us: "unlock" },
    ipa: { us: "ʌnˈlɑk" },
    hangul: "언락",
    meaning: "(통신사 잠금을) 해제하다",
    nuance:
      "통신사 잠금이 걸린 폰에는 현지 유심이 안 들어가요. 출국 전에 미리 풀어 두세요.",
    collocations: ["unlock a phone", "a network-locked handset"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Get your phone unlocked before you fly, or the local SIM won't work.",
        },
        ko: "출국 전에 폰 잠금 풀어, 안 그러면 현지 유심 안 먹혀.",
      },
      {
        tone: "daily",
        en: {
          us: "How much do you charge to unlock a phone from another network?",
        },
        ko: "다른 통신사 폰의 잠금을 해제하는 데 비용이 얼마인가요?",
      },
      {
        tone: "business",
        en: {
          us: "Handsets can be unlocked free of charge once the contract has been fully paid.",
        },
        ko: "약정 대금이 완납되면 단말기 잠금은 무료로 해제됩니다.",
      },
    ],
  },
  {
    id: "b1-w087",
    level: "B1",
    topic: "phone",
    word: { us: "contract term" },
    ipa: { us: "ˈkɑnˌtrækt tɜrm" },
    hangul: "컨트랙트 텀",
    meaning: "약정 기간",
    collocations: ["a twelve-month contract term", "end a contract term early"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I'm stuck in a two-year contract term and I regret signing it.",
        },
        ko: "2년 약정에 묶여 있는데 계약한 거 진짜 후회돼.",
      },
      {
        tone: "daily",
        en: { us: "What would it cost me to end the contract term early?" },
        ko: "약정 기간을 중도에 해지하면 비용이 얼마나 드나요?",
      },
      {
        tone: "business",
        en: {
          us: "Should you cancel before the contract term ends, the remaining handset cost becomes payable.",
        },
        ko: "약정 기간 종료 전에 해지하실 경우 잔여 단말기 대금을 납부하셔야 합니다.",
      },
    ],
  },
  {
    id: "b1-w088",
    level: "B1",
    topic: "phone",
    word: { us: "port your number" },
    ipa: { us: "ˈpɔrt jʊr ˈnʌmbər" },
    hangul: "포트 유어 넘버",
    meaning: "번호 이동하다 (통신사를 바꿔도 번호 유지)",
    collocations: ["port your number to another provider", "a porting request"],
    examples: [
      {
        tone: "friend",
        en: { us: "You can port your number, so you won't lose any contacts." },
        ko: "번호 이동하면 되니까 연락처 하나도 안 날아가.",
      },
      {
        tone: "daily",
        en: { us: "How many days does it take to port my number across?" },
        ko: "번호 이동을 하는 데 며칠이나 걸리나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your number cannot be ported while an outstanding balance remains on the account.",
        },
        ko: "계정에 미납 잔액이 남아 있는 동안에는 번호 이동이 불가합니다.",
      },
    ],
  },
  {
    id: "b1-w089",
    level: "B1",
    topic: "phone",
    word: { us: "excess usage charge" },
    ipa: { us: "ˈɛkˌsɛs ˈjusɪdʒ tʃɑrdʒ" },
    hangul: "엑세스 유시지 차지",
    meaning: "초과 사용 요금",
    collocations: ["an excess usage charge", "avoid excess charges"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "My bill doubled because of excess usage charges last month.",
        },
        ko: "지난달 초과 사용 요금 때문에 요금이 두 배가 됐어.",
      },
      {
        tone: "daily",
        en: {
          us: "Is there any way to block excess usage charges on my account?",
        },
        ko: "제 계정에서 초과 사용 요금이 발생하지 않게 막을 방법이 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Excess usage charges are calculated daily and appear on the following month's invoice.",
        },
        ko: "초과 사용 요금은 일별로 산정되어 다음 달 청구서에 반영됩니다.",
      },
    ],
  },
  {
    id: "b1-w090",
    level: "B1",
    topic: "phone",
    word: { us: "scam call" },
    ipa: { us: "ˈskæm kɔːl" },
    hangul: "스캠 콜",
    meaning: "보이스피싱 전화",
    nuance:
      "이민성이나 세무서를 사칭하는 전화가 많아요. 실제 기관은 전화로 즉시 송금을 요구하지 않습니다.",
    collocations: ["a scam call", "report a scam call", "block the number"],
    examples: [
      {
        tone: "friend",
        en: { us: "It's a scam call — they pretend to be from immigration." },
        ko: "보이스피싱이야. 이민성이라고 사칭하더라.",
      },
      {
        tone: "daily",
        en: { us: "I got a scam call saying my visa was cancelled." },
        ko: "비자가 취소됐다는 보이스피싱 전화를 받았어요.",
      },
      {
        tone: "business",
        en: {
          us: "We will never request payment over the phone. Report scam calls to Scamwatch.",
        },
        ko: "저희는 전화로 결제를 요구하지 않습니다. 사기 전화는 Scamwatch에 신고해 주십시오.",
      },
    ],
  },
  // ---------- emergency ----------
  {
    id: "b1-w091",
    level: "B1",
    topic: "emergency",
    word: { us: "flash flooding" },
    ipa: { us: "ˈflæʃ ˈflʌdɪŋ" },
    hangul: "플래시 플러딩",
    meaning: "돌발 홍수",
    nuance:
      "호주 여름 폭우 때 흔해요. 물이 찬 도로는 절대 건너지 말라는 경고가 함께 나옵니다.",
    collocations: [
      "a flash flooding warning",
      "roads closed due to flash flooding",
      "never drive through floodwater",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Don't drive tonight — there's flash flooding on the highway.",
        },
        ko: "오늘 밤엔 운전하지 마. 고속도로에 돌발 홍수 났대.",
      },
      {
        tone: "daily",
        en: { us: "Is the train still running with the flash flooding?" },
        ko: "돌발 홍수인데 기차는 계속 다니나요?",
      },
      {
        tone: "business",
        en: { us: "A flash flooding warning is current for this area." },
        ko: "현재 이 지역에 돌발 홍수 경보가 발령되어 있습니다.",
      },
    ],
  },
  {
    id: "b1-w092",
    level: "B1",
    topic: "emergency",
    word: { us: "triage" },
    ipa: { us: "ˈtriːɑːʒ" },
    hangul: "트리아지",
    meaning: "응급 환자 분류(대기 순서 정하기)",
    nuance:
      "응급실에서는 도착 순서가 아니라 위급한 정도로 순서가 정해져요. 오래 기다리는 이유가 이것입니다.",
    collocations: ["the triage nurse", "go through triage", "triage category"],
    examples: [
      {
        tone: "friend",
        en: { us: "We waited four hours because triage put us at the bottom." },
        ko: "분류에서 우리가 제일 뒤로 밀려서 네 시간 기다렸어.",
      },
      {
        tone: "daily",
        en: { us: "Do I need to see the triage nurse first?" },
        ko: "먼저 분류 담당 간호사를 만나야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Patients are seen in order of triage category, not arrival.",
        },
        ko: "환자는 도착 순서가 아니라 응급 분류 등급 순으로 진료합니다.",
      },
    ],
  },
  {
    id: "b1-w093",
    level: "B1",
    topic: "emergency",
    word: { us: "CPR" },
    ipa: { us: "ˌsiː piː ˈɑːr" },
    hangul: "시피알",
    meaning: "심폐소생술",
    nuance:
      "000 상담원이 전화로 방법을 안내해 주기도 해요. 지시대로 따라가면 됩니다.",
    collocations: ["perform CPR", "start CPR", "do you know CPR"],
    examples: [
      {
        tone: "friend",
        en: { us: "Do you know CPR? I'll call while you start." },
        ko: "너 심폐소생술 할 줄 알아? 네가 시작하면 내가 전화할게.",
      },
      {
        tone: "daily",
        en: {
          us: "I've done a first aid course, but I've never performed CPR.",
        },
        ko: "응급처치 교육은 받았는데 실제로 심폐소생술을 해 본 적은 없어요.",
      },
      {
        tone: "business",
        en: { us: "Stay with me and I'll talk you through CPR step by step." },
        ko: "끊지 마시고 계세요. 제가 심폐소생술을 단계별로 안내해 드리겠습니다.",
      },
    ],
  },
  {
    id: "b1-w094",
    level: "B1",
    topic: "emergency",
    word: { us: "total fire ban" },
    ipa: { us: "ˈtoʊtəl ˈfaɪər bæn" },
    hangul: "토털 파이어 밴",
    meaning: "전면 화기 사용 금지",
    nuance:
      "여름철 산불 위험이 높은 날 주 정부가 발령해요. 바비큐도 금지되고 위반하면 벌금이 큽니다.",
    collocations: [
      "a total fire ban is in place",
      "check for a total fire ban",
      "during a total fire ban",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "No barbecue today — there's a total fire ban." },
        ko: "오늘 바비큐 못 해. 전면 화기 금지야.",
      },
      {
        tone: "daily",
        en: { us: "Is there a total fire ban in this district today?" },
        ko: "오늘 이 지역에 전면 화기 금지가 내려졌나요?",
      },
      {
        tone: "business",
        en: { us: "Open flames are prohibited during a total fire ban." },
        ko: "전면 화기 금지 기간에는 화기 사용이 금지됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "burn ban",
  },
  {
    id: "b1-w095",
    level: "B1",
    topic: "emergency",
    word: { us: "police report" },
    ipa: { us: "pəˈlis rɪˈpɔrt" },
    hangul: "폴리스 리포트",
    meaning: "경찰 신고서",
    nuance:
      "도난 보험을 청구하려면 신고서 번호가 반드시 필요하니 잊지 말고 받아 두세요.",
    collocations: ["file a police report", "a police report number"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "File a police report first; the insurer won't pay without one.",
        },
        ko: "일단 경찰 신고부터 해, 신고서 없으면 보험사가 돈 안 줘.",
      },
      {
        tone: "daily",
        en: { us: "Could you tell me how to file a police report online?" },
        ko: "온라인으로 경찰 신고서를 접수하는 방법을 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Your claim must be supported by a police report filed within twenty-four hours.",
          au: "Your claim must be supported by a police report lodged within twenty-four hours.",
        },
        ko: "청구 시에는 24시간 이내에 접수된 경찰 신고서를 첨부해야 합니다.",
      },
    ],
  },
  {
    id: "b1-w096",
    level: "B1",
    topic: "emergency",
    word: { us: "ambulance cover" },
    ipa: { us: "ˈæmbjələns ˈkʌvər" },
    hangul: "앰뷸런스 커버",
    meaning: "구급차 이용 보험 보장",
    nuance:
      "호주는 주에 따라 구급차가 유료이고 수백 달러가 나올 수 있어요. 보험에 이 항목이 있는지 꼭 확인하세요.",
    collocations: [
      "does it include ambulance cover",
      "without ambulance cover",
      "ambulance cover is separate",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "Check if your policy has ambulance cover — mine didn't." },
        ko: "네 보험에 구급차 보장 있는지 확인해 봐. 내 건 없더라.",
      },
      {
        tone: "daily",
        en: { us: "Does this plan include ambulance cover?" },
        ko: "이 플랜에 구급차 보장이 포함되나요?",
      },
      {
        tone: "business",
        en: { us: "Ambulance cover is not included in the basic policy." },
        ko: "기본 상품에는 구급차 이용 보장이 포함되어 있지 않습니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "ambulance coverage",
  },
  {
    id: "b1-w097",
    level: "B1",
    topic: "emergency",
    word: { us: "wildfire", au: "bushfire" },
    ipa: { us: "ˈwaɪldˌfaɪər", au: "ˈbʊʃˌfaɪə" },
    hangul: "와일드파이어",
    meaning: "산불, 들불",
    nuance:
      "호주 여름에는 산불 경보 앱을 꼭 깔아 두세요. 도로가 갑자기 통제될 수 있어요.",
    collocations: ["a wildfire warning", "wildfire season"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The wildfire smoke was so thick that we stayed indoors all weekend.",
          au: "The bushfire smoke was so thick that we stayed indoors all weekend.",
        },
        ko: "산불 연기가 너무 심해서 주말 내내 집에만 있었어.",
      },
      {
        tone: "daily",
        en: {
          us: "Has the wildfire warning been lifted for the road heading north?",
          au: "Has the bushfire warning been lifted for the road heading north?",
        },
        ko: "북쪽으로 가는 도로의 산불 경보가 해제되었나요?",
      },
      {
        tone: "business",
        en: {
          us: "Tours will be suspended whenever a wildfire warning is issued for the region.",
          au: "Tours will be suspended whenever a bushfire warning is issued for the region.",
        },
        ko: "해당 지역에 산불 경보가 발령되면 투어는 중단됩니다.",
      },
    ],
  },
  {
    id: "b1-w098",
    level: "B1",
    topic: "emergency",
    word: { us: "next of kin" },
    ipa: { us: "ˌnɛkst əv ˈkɪn" },
    hangul: "넥스트 오브 킨",
    meaning: "최근친, 가장 가까운 가족",
    collocations: ["notify the next of kin", "list your next of kin"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The form asks for next of kin, so I wrote my sister's name.",
        },
        ko: "서식에 최근친 적으라고 해서 언니 이름 썼어.",
      },
      {
        tone: "daily",
        en: { us: "Does my next of kin have to live in this country?" },
        ko: "최근친이 반드시 이 나라에 거주해야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Hospital staff will contact your next of kin only if you are unable to consent.",
        },
        ko: "환자가 동의할 수 없는 경우에 한해 병원 직원이 최근친에게 연락합니다.",
      },
    ],
  },
  {
    id: "b1-w099",
    level: "B1",
    topic: "emergency",
    word: { us: "fracture" },
    ipa: { us: "ˈfræktʃər" },
    hangul: "프랙처",
    meaning: "골절",
    collocations: ["a hairline fracture", "suspect a fracture"],
    examples: [
      {
        tone: "friend",
        en: { us: "It turned out to be a small fracture, not just a bruise." },
        ko: "그냥 멍인 줄 알았는데 작은 골절이었대.",
      },
      {
        tone: "daily",
        en: {
          us: "Would an X-ray show whether there's a fracture in my wrist?",
        },
        ko: "엑스레이를 찍으면 손목에 골절이 있는지 알 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "If a fracture is suspected, the limb should be immobilized before transport.",
          au: "If a fracture is suspected, the limb should be immobilised before transport.",
        },
        ko: "골절이 의심되는 경우 이송 전에 해당 부위를 고정해야 합니다.",
      },
    ],
  },
  {
    id: "b1-w100",
    level: "B1",
    topic: "emergency",
    word: { us: "power outage" },
    ipa: { us: "ˈpaʊər ˌaʊtɪdʒ" },
    hangul: "파워 아웃이지",
    meaning: "정전",
    collocations: ["a power outage", "report a power outage"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The power outage lasted all night, so everything in the fridge spoiled.",
        },
        ko: "밤새 정전이라서 냉장고 안 음식이 다 상했어.",
      },
      {
        tone: "daily",
        en: {
          us: "Who should I call to report a power outage in this building?",
        },
        ko: "이 건물의 정전을 신고하려면 어디에 전화해야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "During a power outage, refrigerated stock must be checked before it is sold.",
        },
        ko: "정전 시에는 냉장 보관 상품을 판매 전에 반드시 점검해야 합니다.",
      },
    ],
  },
  // ---------- social ----------
  {
    id: "b1-w101",
    level: "B1",
    topic: "social",
    word: { us: "banter" },
    ipa: { us: "ˈbæntər" },
    hangul: "밴터",
    meaning: "가볍게 주고받는 농담",
    nuance:
      "호주 직장·펍에서 아주 흔한 문화예요. 놀리는 말처럼 들려도 친근함의 표시인 경우가 많습니다.",
    collocations: ["just banter", "friendly banter", "have a bit of banter"],
    examples: [
      {
        tone: "friend",
        en: { us: "Don't take it personally — it's just banter." },
        ko: "기분 나쁘게 받아들이지 마. 그냥 장난치는 거야.",
      },
      {
        tone: "daily",
        en: {
          us: "There's a lot of banter in the kitchen, but they're all lovely.",
        },
        ko: "주방에서 농담을 많이 주고받는데 다들 좋은 사람들이에요.",
      },
      {
        tone: "business",
        en: {
          us: "Banter is fine, but it shouldn't make anyone uncomfortable.",
        },
        ko: "가벼운 농담은 괜찮지만 누군가 불편해질 정도가 되어서는 안 됩니다.",
      },
    ],
  },
  {
    id: "b1-w102",
    level: "B1",
    topic: "social",
    word: { us: "buy a round", au: "shout" },
    ipa: { us: "ˈbaɪ ə ˈraʊnd", au: "ʃaʊt" },
    hangul: "바이 어 라운드",
    meaning: "한턱내다, 술을 한 순배 사다",
    nuance:
      "호주 술자리에서는 순서대로 한 명씩 전체 술값을 내요. 빠지면 인색하다는 인상을 줘요.",
    collocations: ["buy the next round", "it's my round"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "It's my turn to buy a round, so put your wallet away.",
          au: "It's my turn to shout, so put your wallet away.",
        },
        ko: "이번엔 내가 살 차례니까 지갑 넣어.",
      },
      {
        tone: "daily",
        en: {
          us: "Would you mind if I bought a round for the table?",
          au: "Would you mind if I shouted a round for the table?",
        },
        ko: "제가 이 테이블에 한턱내도 괜찮을까요?",
      },
      {
        tone: "business",
        en: {
          us: "It is customary for the host to buy a round before the speeches begin.",
          au: "It is customary for the host to shout a round before the speeches begin.",
        },
        ko: "축사가 시작되기 전에 주최자가 한 순배 내는 것이 관례입니다.",
      },
    ],
  },
  {
    id: "b1-w103",
    level: "B1",
    topic: "social",
    word: { us: "BYOB", au: "BYO" },
    ipa: { us: "ˌbi waɪ oʊ ˈbi", au: "ˌbiː waɪ ˈəʊ" },
    hangul: "비와이오비",
    meaning: "술을 직접 가져가는 방식",
    nuance:
      "호주 식당의 BYO는 주류를 사 가도 된다는 뜻이고, 대신 콜키지 요금을 따로 받아요.",
    collocations: ["a BYOB restaurant", "the party is BYOB"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The place is BYOB, so grab a bottle on your way over.",
          au: "The place is BYO, so grab a bottle on your way over.",
        },
        ko: "거기 술 반입 되니까 오는 길에 한 병 사 와.",
      },
      {
        tone: "daily",
        en: {
          us: "Is this restaurant BYOB, and how much is the corkage fee?",
          au: "Is this restaurant BYO, and how much is the corkage fee?",
        },
        ko: "이 식당은 술 반입이 되나요, 그리고 콜키지는 얼마인가요?",
      },
      {
        tone: "business",
        en: {
          us: "Guests are reminded that the venue is BYOB and no spirits are permitted.",
          au: "Guests are reminded that the venue is BYO and no spirits are permitted.",
        },
        ko: "본 장소는 주류 반입 방식이며 증류주는 반입이 불가함을 안내드립니다.",
      },
    ],
  },
  {
    id: "b1-w104",
    level: "B1",
    topic: "social",
    word: { us: "housewarming" },
    ipa: { us: "ˈhaʊsˌwɔrmɪŋ" },
    hangul: "하우스워밍",
    meaning: "집들이",
    collocations: ["throw a housewarming party", "a housewarming gift"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "We're throwing a housewarming on Saturday, so bring whoever you want.",
        },
        ko: "토요일에 집들이 하니까 아무나 데려와도 돼.",
      },
      {
        tone: "daily",
        en: {
          us: "What would be a suitable housewarming gift for my new roommates?",
          au: "What would be a suitable housewarming gift for my new flatmates?",
        },
        ko: "새 룸메이트들에게 어떤 집들이 선물이 적당할까요?",
      },
      {
        tone: "business",
        en: {
          us: "The housewarming has been arranged for the seventh, and partners are welcome.",
        },
        ko: "집들이는 7일로 예정되어 있으며 동반자도 환영합니다.",
      },
    ],
  },
  {
    id: "b1-w105",
    level: "B1",
    topic: "social",
    word: { us: "small talk" },
    ipa: { us: "ˈsmɔl tɔk" },
    hangul: "스몰 토크",
    meaning: "가벼운 잡담",
    nuance:
      "날씨, 주말 계획, 스포츠가 무난해요. 나이나 연봉을 묻는 건 실례로 받아들여져요.",
    collocations: ["make small talk", "be good at small talk"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I'm terrible at small talk, so I always end up discussing food.",
        },
        ko: "나 잡담을 진짜 못해서 결국 항상 음식 얘기만 해.",
      },
      {
        tone: "daily",
        en: {
          us: "Do people here expect small talk before getting down to business?",
        },
        ko: "여기 사람들은 본론에 들어가기 전에 가벼운 대화를 기대하나요?",
      },
      {
        tone: "business",
        en: {
          us: "A few minutes of small talk usually helps before a difficult negotiation begins.",
        },
        ko: "어려운 협상을 시작하기 전에는 몇 분간의 가벼운 대화가 도움이 됩니다.",
      },
    ],
  },
  {
    id: "b1-w106",
    level: "B1",
    topic: "social",
    word: { us: "RSVP" },
    ipa: { us: "ˌɑr ɛs vi ˈpi" },
    hangul: "알에스브이피",
    meaning: "참석 여부를 회신하다",
    collocations: ["RSVP by Friday", "an RSVP deadline"],
    examples: [
      {
        tone: "friend",
        en: { us: "Did you ever RSVP, or are you just going to show up?" },
        ko: "너 참석 답 했어, 아니면 그냥 갈 거야?",
      },
      {
        tone: "daily",
        en: { us: "Could you let me know whether I still need to RSVP?" },
        ko: "제가 아직 참석 여부를 회신해야 하는지 알려 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Please RSVP by Friday so that catering numbers can be confirmed.",
        },
        ko: "케이터링 인원을 확정할 수 있도록 금요일까지 참석 여부를 회신해 주시기 바랍니다.",
      },
    ],
  },
  {
    id: "b1-w107",
    level: "B1",
    topic: "social",
    word: { us: "misunderstanding" },
    ipa: { us: "ˌmɪsʌndərˈstændɪŋ" },
    hangul: "미스언더스탠딩",
    meaning: "오해",
    collocations: ["clear up a misunderstanding", "a simple misunderstanding"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "It was just a misunderstanding, so don't let it ruin the trip.",
        },
        ko: "그냥 오해였으니까 그것 때문에 여행 망치지 마.",
      },
      {
        tone: "daily",
        en: {
          us: "Could we sit down and clear up this misunderstanding about the schedule?",
        },
        ko: "일정에 관한 이 오해를 앉아서 풀어 볼 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "The delay appears to have been caused by a misunderstanding between the two teams.",
        },
        ko: "이번 지연은 두 팀 사이의 오해에서 비롯된 것으로 보입니다.",
      },
    ],
  },
  {
    id: "b1-w108",
    level: "B1",
    topic: "social",
    word: { us: "get along with" },
    ipa: { us: "ˌɡɛt əˈlɔŋ wɪð" },
    hangul: "겟 얼롱 위드",
    meaning: "~와 잘 지내다",
    collocations: ["get along with your housemates", "get along well"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I get along with everyone in the house except the guy upstairs.",
        },
        ko: "위층 남자만 빼고 집 사람들이랑 다 잘 지내.",
      },
      {
        tone: "daily",
        en: { us: "How well do you get along with the people you work with?" },
        ko: "같이 일하는 분들과는 얼마나 잘 지내세요?",
      },
      {
        tone: "business",
        en: {
          us: "Applicants must show that they can get along with colleagues from many backgrounds.",
        },
        ko: "지원자는 다양한 배경의 동료들과 잘 어울릴 수 있음을 보여 주어야 합니다.",
      },
    ],
  },
  {
    id: "b1-w109",
    level: "B1",
    topic: "social",
    word: { us: "compromise" },
    ipa: { us: "ˈkɑmprəˌmaɪz" },
    hangul: "캄프러마이즈",
    meaning: "타협하다, 절충안",
    collocations: ["reach a compromise", "be willing to compromise"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "We reached a compromise: I cook and he cleans the kitchen.",
        },
        ko: "우리 타협 봤어, 내가 요리하고 걔가 주방 치우기로.",
      },
      {
        tone: "daily",
        en: { us: "Would you be willing to compromise on the moving date?" },
        ko: "이사 날짜에 대해 조금 절충해 주실 수 있을까요?",
      },
      {
        tone: "business",
        en: {
          us: "Both parties eventually reached a compromise on how the security deposit would be split.",
          au: "Both parties eventually reached a compromise on how the bond would be split.",
        },
        ko: "양측은 보증금을 어떻게 나눌지에 대해 결국 합의점을 찾았습니다.",
      },
    ],
  },
  {
    id: "b1-w110",
    level: "B1",
    topic: "social",
    word: { us: "awkward" },
    ipa: { us: "ˈɔːkwərd" },
    hangul: "오크워드",
    meaning: "어색한, 난처한",
    nuance:
      "분위기·상황·사람 모두에 써요. 원어민이 정말 자주 쓰는 형용사입니다.",
    collocations: [
      "that was awkward",
      "an awkward silence",
      "make things awkward",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "That was so awkward — I forgot her name mid-sentence." },
        ko: "완전 어색했어. 말하다가 걔 이름이 안 떠올랐어.",
      },
      {
        tone: "daily",
        en: { us: "I don't want to make things awkward at the house." },
        ko: "집안 분위기를 어색하게 만들고 싶지는 않아요.",
      },
      {
        tone: "business",
        en: {
          us: "I know this is an awkward conversation, but we should have it.",
        },
        ko: "곤란한 얘기인 건 알지만 짚고 넘어가야 할 것 같습니다.",
      },
    ],
  },
  // ---------- admin ----------
  {
    id: "b1-w111",
    level: "B1",
    topic: "admin",
    word: { us: "tax file number" },
    ipa: { us: "ˈtæks faɪl ˌnʌmbər" },
    hangul: "택스 파일 넘버",
    meaning: "호주 납세자 번호 (TFN)",
    nuance:
      "이 번호가 없으면 최고 세율로 원천징수돼요. 입국 후 온라인으로 무료 신청할 수 있어요.",
    collocations: ["apply for a tax file number", "quote your tax file number"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Apply for a tax file number now, or they'll tax you at the top rate.",
        },
        ko: "지금 납세자 번호 신청해, 안 그러면 최고 세율로 떼여.",
      },
      {
        tone: "daily",
        en: {
          us: "How long does it usually take for a tax file number to arrive?",
        },
        ko: "납세자 번호가 나오기까지 보통 얼마나 걸리나요?",
      },
      {
        tone: "business",
        en: {
          us: "Employees who do not provide a tax file number are taxed at the highest rate.",
        },
        ko: "납세자 번호를 제출하지 않는 직원은 최고 세율로 과세됩니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "Social Security number",
  },
  {
    id: "b1-w112",
    level: "B1",
    topic: "admin",
    word: { us: "visa condition" },
    ipa: { us: "ˈvizə kənˈdɪʃən" },
    hangul: "비자 컨디션",
    meaning: "비자 조건",
    nuance:
      "워홀 비자에는 한 고용주 밑에서 일할 수 있는 기간 제한 같은 조건이 붙어 있어요.",
    collocations: ["breach a visa condition", "check your visa conditions"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Breaking a visa condition can get you sent home, so be careful.",
        },
        ko: "비자 조건 어기면 강제 출국될 수도 있으니까 조심해.",
      },
      {
        tone: "daily",
        en: {
          us: "Could you explain which visa conditions apply to my current subclass?",
        },
        ko: "제 현재 비자 종류에는 어떤 조건이 적용되는지 설명해 주시겠어요?",
      },
      {
        tone: "business",
        en: {
          us: "Your visa conditions limit you to six months with any single employer.",
        },
        ko: "귀하의 비자 조건상 한 고용주 밑에서는 최대 6개월까지만 근무할 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w113",
    level: "B1",
    topic: "admin",
    word: { us: "certified copy" },
    ipa: { us: "ˈsɜrtəˌfaɪd ˈkɑpi" },
    hangul: "서티파이드 카피",
    meaning: "인증 사본",
    collocations: [
      "a certified copy of your passport",
      "have a document certified",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The pharmacy certified my passport copy for free in five minutes.",
        },
        ko: "약국에서 여권 사본을 5분 만에 무료로 인증해 줬어.",
      },
      {
        tone: "daily",
        en: {
          us: "Do you need the original, or would a certified copy be enough?",
        },
        ko: "원본이 필요하신가요, 아니면 인증 사본으로도 충분한가요?",
      },
      {
        tone: "business",
        en: {
          us: "Applications must be accompanied by certified copies of all supporting identity documents.",
        },
        ko: "신청서에는 모든 신분 증빙 서류의 인증 사본을 첨부해야 합니다.",
      },
    ],
  },
  {
    id: "b1-w114",
    level: "B1",
    topic: "admin",
    word: { us: "bridging visa" },
    ipa: { us: "ˈbrɪdʒɪŋ ˈviːzə" },
    hangul: "브리징 비자",
    meaning: "비자 심사 중 체류를 허용하는 임시 비자",
    nuance:
      "다음 비자를 신청하고 결과를 기다리는 동안 합법 체류를 유지해 줘요. 근무 가능 여부는 종류마다 다릅니다.",
    collocations: [
      "on a bridging visa",
      "apply for a bridging visa",
      "bridging visa conditions",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I'm on a bridging visa until the second-year one comes through.",
        },
        ko: "세컨드 비자 나올 때까지 브리징 비자 상태야.",
      },
      {
        tone: "daily",
        en: { us: "Am I allowed to work on a bridging visa?" },
        ko: "브리징 비자로도 일할 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Work rights vary depending on your bridging visa subclass.",
        },
        ko: "근무 권한은 브리징 비자 종류에 따라 달라집니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "temporary status document",
  },
  {
    id: "b1-w115",
    level: "B1",
    topic: "admin",
    word: { us: "submit an application", au: "lodge an application" },
    ipa: { us: "səbˈmɪt ən ˌæpləˈkeɪʃən", au: "lɒdʒ ən ˌæpləˈkeɪʃən" },
    hangul: "서브밋 언 애플리케이션",
    meaning: "신청서를 제출하다",
    nuance:
      "호주 관공서 서류에서는 lodge를 훨씬 자주 써요. 의미는 submit과 같아요.",
    collocations: [
      "submit an application online",
      "an application has been submitted",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "I submitted my application last night and I'm already checking hourly.",
          au: "I lodged my application last night and I'm already checking hourly.",
        },
        ko: "어젯밤에 신청서 냈는데 벌써 한 시간마다 확인하고 있어.",
      },
      {
        tone: "daily",
        en: {
          us: "Where exactly do I submit an application for a replacement card?",
          au: "Where exactly do I lodge an application for a replacement card?",
        },
        ko: "카드 재발급 신청서는 정확히 어디에 제출하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Applications submitted after the closing date will not be assessed this round.",
          au: "Applications lodged after the closing date will not be assessed this round.",
        },
        ko: "마감일 이후에 제출된 신청서는 이번 회차에서는 심사되지 않습니다.",
      },
    ],
  },
  {
    id: "b1-w116",
    level: "B1",
    topic: "admin",
    word: { us: "statutory declaration" },
    ipa: { us: "ˈstætʃətɔːri ˌdɛkləˈreɪʃən" },
    hangul: "스태추터리 데클러레이션",
    meaning: "법정 선언서",
    nuance:
      "서류가 없을 때 사실을 진술해 대신하는 공식 문서예요. 지정된 사람 앞에서 서명해야 효력이 생깁니다.",
    collocations: [
      "sign a statutory declaration",
      "witness a statutory declaration",
      "a stat dec",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "They asked for a stat dec since I couldn't find the receipt.",
        },
        ko: "영수증을 못 찾아서 법정 선언서를 요구하더라.",
      },
      {
        tone: "daily",
        en: { us: "Who can witness a statutory declaration?" },
        ko: "법정 선언서는 누가 입회 서명해 줄 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "A statutory declaration must be signed before an authorised witness.",
        },
        ko: "법정 선언서는 지정된 입회인 앞에서 서명해야 합니다.",
      },
    ],
    auOnly: true,
    usEquivalent: "affidavit",
  },
  {
    id: "b1-w117",
    level: "B1",
    topic: "admin",
    word: { us: "ABN" },
    ipa: { us: "ˌeɪ biː ˈɛn" },
    hangul: "에이비엔",
    meaning: "호주 사업자 번호",
    nuance:
      "고용이 아니라 개인 사업자로 일할 때 필요해요. ABN 으로 일하면 세금과 퇴직연금을 직접 챙겨야 하니 조건을 잘 따져 보세요.",
    collocations: [
      "apply for an ABN",
      "work on an ABN",
      "quote your ABN on the invoice",
    ],
    examples: [
      {
        tone: "friend",
        en: { us: "They pay on an ABN, so no super and no sick leave." },
        ko: "거기는 사업자 번호로 주는 거라 퇴직연금도 병가도 없어.",
      },
      {
        tone: "daily",
        en: { us: "Do I need an ABN for this job, or is it a normal wage?" },
        ko: "이 일은 사업자 번호가 필요한가요, 아니면 일반 급여인가요?",
      },
      {
        tone: "business",
        en: { us: "Please quote your ABN on every invoice you submit." },
        ko: "제출하시는 모든 청구서에 사업자 번호를 기재해 주십시오.",
      },
    ],
    auOnly: true,
    usEquivalent: "EIN",
  },
  {
    id: "b1-w118",
    level: "B1",
    topic: "admin",
    word: { us: "eligibility" },
    ipa: { us: "ˌɛlɪdʒəˈbɪləti" },
    hangul: "엘리저빌리티",
    meaning: "자격 요건, 자격 여부",
    collocations: ["check your eligibility", "meet the eligibility criteria"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "Check your eligibility first; the second-year visa has strict rules.",
        },
        ko: "먼저 자격 되는지 확인해, 세컨 비자는 규정이 까다로워.",
      },
      {
        tone: "daily",
        en: {
          us: "Where can I check my eligibility for a second working holiday visa?",
        },
        ko: "세컨드 워킹홀리데이 비자 자격 요건은 어디에서 확인할 수 있나요?",
      },
      {
        tone: "business",
        en: {
          us: "Eligibility is assessed on the date the application is received, not the date signed.",
        },
        ko: "자격 요건은 서명일이 아니라 신청서 접수일을 기준으로 심사됩니다.",
      },
    ],
  },
  {
    id: "b1-w119",
    level: "B1",
    topic: "admin",
    word: { us: "processing time" },
    ipa: { us: "ˈprɑsɛsɪŋ taɪm" },
    hangul: "프로세싱 타임",
    meaning: "처리 기간",
    collocations: ["the current processing time", "a longer processing time"],
    examples: [
      {
        tone: "friend",
        en: {
          us: "The processing time has doubled, so don't book flights yet.",
        },
        ko: "처리 기간이 두 배로 늘었으니까 아직 항공권 예약하지 마.",
      },
      {
        tone: "daily",
        en: {
          us: "What is the average processing time for this kind of application?",
        },
        ko: "이런 종류의 신청서는 평균 처리 기간이 어떻게 되나요?",
      },
      {
        tone: "business",
        en: {
          us: "Processing times are indicative only and may vary during peak periods.",
        },
        ko: "처리 기간은 참고용이며 성수기에는 달라질 수 있습니다.",
      },
    ],
  },
  {
    id: "b1-w120",
    level: "B1",
    topic: "admin",
    word: { us: "supporting documents" },
    ipa: { us: "səˈpɔrtɪŋ ˈdɑkjəmənts" },
    hangul: "서포팅 다큐먼츠",
    meaning: "증빙 서류",
    collocations: [
      "attach supporting documents",
      "missing supporting documents",
    ],
    examples: [
      {
        tone: "friend",
        en: {
          us: "They rejected it because two supporting documents were missing.",
        },
        ko: "증빙 서류 두 개가 빠져서 반려됐대.",
      },
      {
        tone: "daily",
        en: {
          us: "Which supporting documents do I need to attach to this form?",
        },
        ko: "이 서식에는 어떤 증빙 서류를 첨부해야 하나요?",
      },
      {
        tone: "business",
        en: {
          us: "Your application cannot be finalized until all supporting documents have been received.",
          au: "Your application cannot be finalised until all supporting documents have been received.",
        },
        ko: "모든 증빙 서류가 접수되기 전까지는 신청 건이 최종 처리될 수 없습니다.",
      },
    ],
  },
];
