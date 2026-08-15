import type { ConversationPack } from "@/data/types";

export const PACKS: ConversationPack[] = [
  {
    id: "pack-airport",
    level: "A1",
    title: "공항 입국심사",
    scene: "호주 공항 입국심사대에서 심사관의 질문에 답하는 상황이에요.",
    icon: "🛂",
    expressions: [
      { en: { us: "Here is my passport." }, ko: "여기 제 여권이요." },
      {
        en: { us: "I'm here on a working holiday visa." },
        ko: "워킹홀리데이 비자로 왔어요.",
        note: "방문 목적을 물으면 이 한 문장으로 충분해요.",
      },
      { en: { us: "I will stay for one year." }, ko: "1년 동안 머물 거예요." },
      {
        en: { us: "This is my first visit to Australia." },
        ko: "호주는 이번이 첫 방문이에요.",
      },
      { en: { us: "I have a return ticket." }, ko: "왕복 항공권이 있어요." },
      {
        en: { us: "I'm staying at a hostel in Sydney." },
        ko: "시드니에 있는 호스텔에 묵을 거예요.",
      },
      {
        en: { us: "I have nothing to declare." },
        ko: "신고할 물건이 없어요.",
        note: "declare는 세관에 물건을 신고한다는 뜻이에요.",
      },
      {
        en: { us: "Could you say that again, please?" },
        ko: "다시 한번 말씀해 주시겠어요?",
        note: "못 알아들었을 때 당황하지 말고 이 문장을 쓰세요.",
      },
      {
        en: { us: "Can you speak slowly, please?" },
        ko: "천천히 말씀해 주시겠어요?",
      },
      {
        en: { us: "I brought some instant noodles." },
        ko: "라면을 좀 가져왔어요.",
        note: "음식은 숨기지 말고 먼저 말하는 게 안전해요.",
      },
      { en: { us: "How long can I stay?" }, ko: "얼마나 머물 수 있나요?" },
      {
        en: { us: "Where is the baggage claim?" },
        ko: "수하물 찾는 곳이 어디예요?",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Good morning. May I see your passport?" },
        ko: "안녕하세요. 여권을 보여 주시겠어요?",
      },
      {
        speaker: "you",
        en: { us: "Sure. Here you go." },
        ko: "네. 여기 있어요.",
      },
      {
        speaker: "staff",
        en: { us: "What is the purpose of your visit?" },
        ko: "방문 목적이 무엇인가요?",
      },
      {
        speaker: "you",
        en: { us: "I'm on a working holiday." },
        ko: "워킹홀리데이로 왔어요.",
      },
      {
        speaker: "staff",
        en: { us: "How long will you stay in Australia?" },
        ko: "호주에 얼마나 머무를 예정인가요?",
      },
      { speaker: "you", en: { us: "About one year." }, ko: "1년 정도요." },
      {
        speaker: "staff",
        en: { us: "Where will you be staying?" },
        ko: "어디에서 지낼 예정인가요?",
      },
      {
        speaker: "you",
        en: { us: "At a backpacker hostel in Sydney." },
        ko: "시드니에 있는 백패커 호스텔에서요.",
      },
      {
        speaker: "staff",
        en: { us: "Do you have any food in your bag?" },
        ko: "가방에 음식이 있나요?",
      },
      {
        speaker: "you",
        en: {
          us: "Yes, I have some packaged snacks. I declared them on the card.",
        },
        ko: "네, 포장된 과자가 좀 있어요. 신고서에 표시했어요.",
      },
    ],
    auNotes: [
      "호주는 검역이 엄격해서 음식, 씨앗, 목재 제품은 반드시 Incoming Passenger Card에 신고해야 해요. 신고만 제대로 하면 대부분 문제없어요.",
      "전자여권이면 SmartGate 자동 심사대로 대화 없이 통과하는 경우도 많아요.",
      "심사관이 'G'day'라고 인사할 수 있어요. Hello와 같은 뜻이니 당황하지 마세요.",
    ],
  },
  {
    id: "pack-cafe-order",
    level: "A1",
    title: "카페에서 주문하기",
    scene: "호주 카페에서 커피와 간단한 음식을 주문하고 계산하는 상황이에요.",
    icon: "☕",
    expressions: [
      {
        en: { us: "Can I get a small latte, please?" },
        ko: "스몰 라떼 하나 주세요.",
        note: "주문은 Can I get... / Could I have...로 시작하면 자연스러워요.",
      },
      {
        en: { us: "To go, please.", au: "Takeaway, please." },
        ko: "포장이요.",
        note: "호주에서는 to go 대신 takeaway를 써요.",
      },
      {
        en: { us: "For here, please.", au: "Have here, please." },
        ko: "매장에서 먹고 갈게요.",
      },
      {
        en: { us: "Could I have a flat white?" },
        ko: "플랫 화이트 한 잔 주시겠어요?",
        note: "플랫 화이트는 호주 대표 커피예요. 라떼보다 우유 거품이 적어요.",
      },
      { en: { us: "With oat milk, please." }, ko: "귀리 우유로 부탁해요." },
      { en: { us: "No sugar, thanks." }, ko: "설탕은 빼 주세요." },
      { en: { us: "Can I add an extra shot?" }, ko: "샷 추가할 수 있나요?" },
      { en: { us: "What do you recommend?" }, ko: "추천 메뉴가 뭐예요?" },
      { en: { us: "How much is it altogether?" }, ko: "다 해서 얼마예요?" },
      { en: { us: "Can I pay by card?" }, ko: "카드로 계산할 수 있나요?" },
      {
        en: { us: "Could I get a glass of water?" },
        ko: "물 한 잔 주시겠어요?",
      },
      {
        en: { us: "Sorry, I ordered a cappuccino, not a latte." },
        ko: "죄송한데, 라떼가 아니라 카푸치노를 주문했어요.",
        note: "주문이 잘못 나왔을 때 Sorry로 부드럽게 시작하면 좋아요.",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Hi there! What can I get for you today?" },
        ko: "안녕하세요! 오늘 뭐 드릴까요?",
      },
      {
        speaker: "you",
        en: { us: "Hi, can I get a medium flat white, please?" },
        ko: "안녕하세요, 미디엄 플랫 화이트 하나 주세요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Sure. For here or to go?",
          au: "Sure. Have here or takeaway?",
        },
        ko: "네. 매장에서 드시나요, 포장인가요?",
      },
      {
        speaker: "you",
        en: { us: "To go for me, please.", au: "Takeaway for me, please." },
        ko: "저는 포장이요.",
      },
      {
        speaker: "staff",
        en: { us: "Would you like anything to eat with that?" },
        ko: "같이 드실 음식도 필요하세요?",
      },
      {
        speaker: "you",
        en: { us: "Yes, one banana bread, please." },
        ko: "네, 바나나 브레드 하나 주세요.",
      },
      {
        speaker: "staff",
        en: { us: "That will be nine fifty. Card or cash?" },
        ko: "9달러 50센트예요. 카드로 하시겠어요, 현금으로 하시겠어요?",
      },
      { speaker: "you", en: { us: "Card, please." }, ko: "카드로 할게요." },
      {
        speaker: "staff",
        en: { us: "Lovely. And what's the name for the order?" },
        ko: "좋아요. 주문자 성함이 어떻게 되세요?",
      },
      {
        speaker: "you",
        en: { us: "It's Minji. Thank you!" },
        ko: "민지예요. 감사해요!",
      },
    ],
    auNotes: [
      "호주에서는 포장 주문을 takeaway라고 해요. to go라고 해도 알아듣지만 현지에서는 거의 안 써요.",
      "flat white, long black, short black 같은 호주식 커피 이름을 알아 두면 주문이 쉬워요. long black이 아메리카노와 비슷해요.",
      "직원이 'How are you going?'이라고 인사하면 가벼운 안부 인사예요. 'Good, thanks!' 정도로 답하면 돼요.",
    ],
  },
  {
    id: "pack-supermarket",
    level: "A1",
    title: "마트 계산대",
    scene:
      "호주 마트 계산대에서 봉투와 결제 방식에 답하며 계산하는 상황이에요.",
    icon: "🛒",
    expressions: [
      {
        en: { us: "Excuse me, where can I find milk?" },
        ko: "실례지만, 우유는 어디에 있어요?",
      },
      { en: { us: "Is this on sale?" }, ko: "이거 세일 중이에요?" },
      {
        en: { us: "I don't need a bag, thanks." },
        ko: "봉투는 필요 없어요.",
        note: "호주 마트는 봉투가 유료라 장바구니를 챙겨 다니는 게 좋아요.",
      },
      { en: { us: "Can I have a bag, please?" }, ko: "봉투 하나 주시겠어요?" },
      {
        en: { us: "I'll pay by debit card.", au: "I'll pay by EFTPOS." },
        ko: "체크카드로 계산할게요.",
        note: "호주에서는 카드 단말기와 체크카드 결제를 EFTPOS라고 불러요.",
      },
      {
        en: {
          us: "Can I get cash back, please?",
          au: "Can I get cash out, please?",
        },
        ko: "현금 인출도 같이 할 수 있나요?",
        note: "호주 마트 계산대에서는 카드로 결제하면서 현금을 뽑는 cash out 서비스가 있어요.",
      },
      {
        en: { us: "Sorry, this was scanned twice." },
        ko: "죄송한데, 이게 두 번 찍혔어요.",
      },
      { en: { us: "Can I have the receipt?" }, ko: "영수증 주시겠어요?" },
      {
        en: { us: "Where is the self-checkout?" },
        ko: "셀프 계산대는 어디예요?",
        note: "호주 마트는 셀프 계산대가 기본이라 이 표현을 자주 써요.",
      },
      { en: { us: "This one has no price tag." }, ko: "이건 가격표가 없어요." },
      { en: { us: "Do you take cash?" }, ko: "현금도 받나요?" },
      {
        en: { us: "Could you check the price for me?" },
        ko: "가격 좀 확인해 주시겠어요?",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Hello! Did you find everything okay?" },
        ko: "안녕하세요! 필요한 건 다 찾으셨어요?",
      },
      { speaker: "you", en: { us: "Yes, thank you." }, ko: "네, 감사해요." },
      {
        speaker: "staff",
        en: { us: "Do you need a bag today?" },
        ko: "봉투 필요하세요?",
      },
      {
        speaker: "you",
        en: { us: "Yes, one bag, please." },
        ko: "네, 한 장 주세요.",
      },
      {
        speaker: "staff",
        en: { us: "That comes to thirty-two dollars." },
        ko: "총 32달러예요.",
      },
      {
        speaker: "you",
        en: {
          us: "Okay. Can I pay by debit card?",
          au: "Okay. Can I pay by EFTPOS?",
        },
        ko: "네. 체크카드로 계산해도 되나요?",
      },
      {
        speaker: "staff",
        en: { us: "Of course. Just tap your card here." },
        ko: "그럼요. 여기에 카드를 대 주세요.",
      },
      {
        speaker: "you",
        en: {
          us: "Done. Oh, can I also get twenty dollars cash back?",
          au: "Done. Oh, can I also get twenty dollars cash out?",
        },
        ko: "됐어요. 아, 현금 20달러도 인출할 수 있나요?",
      },
      {
        speaker: "staff",
        en: { us: "No problem. Here is your cash and receipt." },
        ko: "문제없어요. 여기 현금과 영수증이요.",
      },
      {
        speaker: "you",
        en: { us: "Thanks a lot. Have a good day!" },
        ko: "정말 감사해요. 좋은 하루 보내세요!",
      },
    ],
    auNotes: [
      "호주 대표 대형 마트는 Coles와 Woolworths예요. 현지인은 Woolworths를 Woolies라고 줄여 불러요.",
      "일회용 비닐봉투가 금지라 장바구니를 들고 가거나 계산대에서 재사용 봉투를 사야 해요.",
      "카드를 단말기에 대기만 하는 tap 결제가 기본이라 현금을 거의 안 들고 다니는 사람이 많아요.",
    ],
  },
  {
    id: "pack-transport",
    level: "A1",
    title: "대중교통 이용",
    scene:
      "호주에서 버스와 기차를 타며 교통카드 사용법과 가는 길을 묻는 상황이에요.",
    icon: "🚌",
    expressions: [
      {
        en: { us: "Does this bus go to the city?" },
        ko: "이 버스 시내로 가나요?",
      },
      {
        en: { us: "Where can I buy a transport card?" },
        ko: "교통카드는 어디서 살 수 있어요?",
        note: "시드니 교통카드는 Opal이에요. 편의점이나 역에서 살 수 있어요.",
      },
      {
        en: { us: "How do I get to Central Station?" },
        ko: "센트럴 역까지 어떻게 가요?",
      },
      {
        en: { us: "Which platform is for the airport line?" },
        ko: "공항 가는 노선은 몇 번 승강장이에요?",
      },
      {
        en: { us: "Do I need to tap off when I get off?" },
        ko: "내릴 때 카드를 다시 찍어야 하나요?",
        note: "탈 때는 tap on, 내릴 때는 tap off라고 해요.",
      },
      { en: { us: "Is this seat taken?" }, ko: "이 자리에 누가 있나요?" },
      {
        en: { us: "Could you tell me when we get to Bondi?" },
        ko: "본다이에 도착하면 알려 주시겠어요?",
        note: "기사님께 부탁하면 대부분 친절하게 알려 줘요.",
      },
      { en: { us: "I missed my stop." }, ko: "내릴 정류장을 지나쳤어요." },
      {
        en: { us: "How often does the train come?" },
        ko: "기차는 얼마나 자주 와요?",
      },
      {
        en: { us: "Is there a night bus on this route?" },
        ko: "이 노선에 심야 버스가 있나요?",
      },
      {
        en: { us: "One adult fare, please." },
        ko: "성인 요금 한 명이요.",
        note: "fare는 교통 요금을 뜻해요.",
      },
      {
        en: { us: "Where is the nearest bus stop?" },
        ko: "가장 가까운 버스 정류장이 어디예요?",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Hi, can I help you with anything?" },
        ko: "안녕하세요, 도와드릴까요?",
      },
      {
        speaker: "you",
        en: { us: "Yes, please. How do I get to Circular Quay?" },
        ko: "네. 서큘러 키까지 어떻게 가요?",
      },
      {
        speaker: "staff",
        en: { us: "Take the T2 line from platform three." },
        ko: "3번 승강장에서 T2 노선을 타세요.",
      },
      {
        speaker: "you",
        en: { us: "How long does it take?" },
        ko: "얼마나 걸려요?",
      },
      {
        speaker: "staff",
        en: { us: "About fifteen minutes." },
        ko: "15분 정도 걸려요.",
      },
      {
        speaker: "you",
        en: { us: "Can I use my Opal card on this train?" },
        ko: "이 기차에서 오팔 카드를 쓸 수 있나요?",
      },
      {
        speaker: "staff",
        en: { us: "Yes, just tap on at the gate before you board." },
        ko: "네, 타기 전에 게이트에서 카드를 찍으면 돼요.",
      },
      {
        speaker: "you",
        en: { us: "And do I tap again when I arrive?" },
        ko: "도착하면 다시 찍어야 하나요?",
      },
      {
        speaker: "staff",
        en: {
          us: "That's right. Tap off at the exit gate, or you'll be charged the full fare.",
        },
        ko: "맞아요. 출구 게이트에서 찍지 않으면 최대 요금이 부과돼요.",
      },
      {
        speaker: "you",
        en: { us: "Got it. Thank you so much for your help!" },
        ko: "알겠어요. 도와주셔서 정말 감사해요!",
      },
    ],
    auNotes: [
      "시드니는 Opal, 멜버른은 myki 등 도시마다 교통카드가 달라요. 요즘은 일반 신용카드 태그로 탈 수 있는 도시도 많아요.",
      "탈 때 tap on, 내릴 때 tap off를 꼭 해야 해요. 안 하면 최대 요금이 청구돼요.",
      "버스는 정류장에 서 있어도 그냥 지나칠 수 있어요. 타고 싶은 버스가 오면 손을 들어 표시하세요.",
    ],
  },
  {
    id: "pack-smalltalk",
    level: "A1",
    title: "첫 스몰토크",
    scene:
      "셰어하우스 메이트나 직장 동료와 처음 만나 가볍게 이야기를 나누는 상황이에요.",
    icon: "💬",
    expressions: [
      {
        en: { us: "Hi, I'm Minji. Nice to meet you." },
        ko: "안녕, 나는 민지야. 만나서 반가워.",
      },
      {
        en: { us: "Where are you from?" },
        ko: "어디에서 왔어?",
        note: "워홀러끼리 가장 흔한 첫 질문이에요.",
      },
      { en: { us: "I'm from Korea." }, ko: "나는 한국에서 왔어." },
      {
        en: { us: "How long have you been in Australia?" },
        ko: "호주에 온 지 얼마나 됐어?",
      },
      { en: { us: "I just arrived last week." }, ko: "지난주에 막 도착했어." },
      { en: { us: "What do you do for work?" }, ko: "무슨 일 해?" },
      {
        en: { us: "How's it going?", au: "How are you going?" },
        ko: "잘 지내?",
        note: "호주에서는 How are you going?이 가장 흔한 인사예요. 어디 가냐는 뜻이 아니에요.",
      },
      {
        en: { us: "The weather is so nice today, isn't it?" },
        ko: "오늘 날씨 정말 좋다, 그렇지?",
        note: "isn't it? 같은 부가의문문은 가볍게 동의를 구하는 말이에요.",
      },
      {
        en: { us: "Do you have any plans for the weekend?" },
        ko: "주말에 뭐 할 계획 있어?",
      },
      {
        en: { us: "What do you like to do in your free time?" },
        ko: "쉬는 시간에 뭐 하는 거 좋아해?",
      },
      {
        en: { us: "Let's grab a coffee sometime." },
        ko: "언제 커피 한잔하자.",
        note: "grab a coffee는 부담 없이 커피 마시자는 캐주얼한 제안이에요.",
      },
      {
        en: { us: "It was nice talking to you. See you around!" },
        ko: "얘기 나눠서 좋았어. 또 봐!",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: {
          us: "Hey! You must be the new roommate. I'm Jack.",
          au: "Hey! You must be the new flatmate. I'm Jack.",
        },
        ko: "안녕! 네가 새로 온 플랫메이트구나. 나는 잭이야.",
      },
      {
        speaker: "you",
        en: { us: "Hi Jack! I'm Minji. I moved in yesterday." },
        ko: "안녕 잭! 나는 민지야. 어제 이사 왔어.",
      },
      {
        speaker: "staff",
        en: { us: "Welcome! Where are you from, Minji?" },
        ko: "환영해! 민지는 어디에서 왔어?",
      },
      {
        speaker: "you",
        en: { us: "I'm from Seoul, Korea. Have you been there?" },
        ko: "한국 서울에서 왔어. 가 본 적 있어?",
      },
      {
        speaker: "staff",
        en: {
          us: "Not yet, but I'd love to go. How are you finding Sydney so far?",
        },
        ko: "아직, 근데 꼭 가 보고 싶어. 시드니는 지금까지 어때?",
      },
      {
        speaker: "you",
        en: { us: "I love it! The beaches are amazing." },
        ko: "정말 좋아! 해변이 진짜 멋져.",
      },
      {
        speaker: "staff",
        en: {
          us: "Right? We're having a barbecue this Saturday. Want to join?",
          au: "Right? We're having a barbie this Saturday. Want to join?",
        },
        ko: "그치? 이번 주 토요일에 바비큐 파티 하는데, 같이 할래?",
      },
      {
        speaker: "you",
        en: { us: "That sounds fun! What should I bring?" },
        ko: "재밌겠다! 뭘 가져가면 돼?",
      },
      {
        speaker: "staff",
        en: { us: "Just some snacks or drinks. It's pretty casual." },
        ko: "간단한 간식이나 음료면 돼. 편한 자리야.",
      },
      {
        speaker: "you",
        en: { us: "Perfect. I'll bring some Korean snacks then!" },
        ko: "좋아. 그럼 한국 과자를 좀 가져갈게!",
      },
    ],
    auNotes: [
      "barbie는 바비 인형이 아니라 바비큐(BBQ)를 뜻하는 호주 슬랭이에요. arvo(오후), brekkie(아침밥)처럼 줄임말을 즐겨 써요.",
      "'How are you going?'에는 진짜 근황 대신 'Good, thanks. You?' 정도로 가볍게 답하는 게 자연스러워요.",
      "처음 만나도 이름을 부르며 편하게 대화하는 문화라 너무 격식을 차리지 않아도 돼요.",
    ],
  },
  {
    id: "pack-sharehouse",
    level: "A2",
    title: "셰어하우스 인스펙션",
    scene:
      "셰어하우스 방을 보러 가서 집 상태와 계약 조건을 확인하는 상황이에요.",
    icon: "🏠",
    expressions: [
      { en: { us: "I'm here to inspect the room." }, ko: "방을 보러 왔어요." },
      {
        en: { us: "How much is the rent per week?" },
        ko: "일주일에 렌트비가 얼마예요?",
        note: "호주 렌트비는 월세가 아니라 주 단위(per week)로 계산해요.",
      },
      {
        en: { us: "Are bills included in the rent?" },
        ko: "공과금이 렌트비에 포함되나요?",
        note: "bills는 전기, 수도, 가스 같은 공과금을 말해요.",
      },
      {
        en: { us: "How much is the deposit?", au: "How much is the bond?" },
        ko: "보증금은 얼마예요?",
        note: "호주에서 보증금은 deposit보다 bond라고 해요.",
      },
      {
        en: { us: "Is the room furnished?" },
        ko: "방에 가구가 포함되어 있나요?",
        note: "furnished는 침대, 책상 같은 가구가 갖춰져 있다는 뜻이에요.",
      },
      {
        en: { us: "How many people live in the house?" },
        ko: "집에 몇 명이 살아요?",
      },
      {
        en: { us: "Is there a minimum stay?" },
        ko: "최소 거주 기간이 있나요?",
      },
      {
        en: { us: "Can I see the bathroom and kitchen?" },
        ko: "화장실과 부엌을 볼 수 있을까요?",
      },
      {
        en: { us: "Is the internet speed good here?" },
        ko: "여기 인터넷 속도는 괜찮아요?",
      },
      {
        en: { us: "When is the room available from?" },
        ko: "방은 언제부터 들어올 수 있어요?",
      },
      {
        en: { us: "How far is it to the nearest station?" },
        ko: "가장 가까운 역까지 얼마나 걸려요?",
      },
      { en: { us: "I'd like to take the room." }, ko: "이 방으로 할게요." },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Hi, come on in! Are you here to see the room?" },
        ko: "안녕하세요, 들어오세요! 방 보러 오셨어요?",
      },
      {
        speaker: "you",
        en: { us: "Yes, I messaged you on Flatmates yesterday." },
        ko: "네, 어제 플랫메이츠에서 메시지 드렸어요.",
      },
      {
        speaker: "staff",
        en: { us: "Great. This is the room. It gets a lot of sunlight." },
        ko: "좋아요. 여기가 그 방이에요. 햇빛이 잘 들어요.",
      },
      {
        speaker: "you",
        en: {
          us: "It looks nice. How much is the rent, and what does it include?",
        },
        ko: "좋아 보이네요. 렌트비는 얼마이고, 뭐가 포함되나요?",
      },
      {
        speaker: "staff",
        en: { us: "It's 280 a week, and that covers all bills and Wi-Fi." },
        ko: "일주일에 280달러이고, 공과금과 와이파이가 모두 포함이에요.",
      },
      {
        speaker: "you",
        en: {
          us: "Okay. How much of a deposit do I need to pay?",
          au: "Okay. How much bond do I need to pay?",
        },
        ko: "알겠어요. 보증금은 얼마를 내야 하나요?",
      },
      {
        speaker: "staff",
        en: { us: "Two weeks of rent, so 560 dollars." },
        ko: "2주 치 렌트비인 560달러예요.",
      },
      {
        speaker: "you",
        en: {
          us: "That works for me. Are there any house rules I should know?",
        },
        ko: "괜찮네요. 알아 둬야 할 하우스 규칙이 있나요?",
      },
      {
        speaker: "staff",
        en: {
          us: "Just keep the shared areas clean, and no parties on weekdays.",
        },
        ko: "공용 공간을 깨끗이 쓰고 평일에는 파티 금지, 그 정도예요.",
      },
      {
        speaker: "you",
        en: { us: "Sounds fair. I'd love to move in from next Monday." },
        ko: "합리적이네요. 다음 주 월요일부터 입주하고 싶어요.",
      },
    ],
    auNotes: [
      "호주 렌트비는 주 단위로 말해요. 광고에 있는 $280pw는 per week(주당)라는 뜻이에요.",
      "보증금은 bond라고 하며 보통 2~4주 치 렌트비예요. 정식 임대 계약이면 주정부 기관에 예치돼요.",
      "셰어하우스는 Flatmates.com.au나 페이스북 그룹에서 많이 구해요. 사기 예방을 위해 돈을 보내기 전에 꼭 직접 인스펙션을 하세요.",
    ],
  },
  {
    id: "pack-bank",
    level: "A2",
    title: "은행 계좌 개설",
    scene:
      "호주 은행 지점을 방문해 계좌를 개설하고 카드와 앱을 신청하는 상황이에요.",
    icon: "🏦",
    expressions: [
      {
        en: { us: "I'd like to open a bank account." },
        ko: "은행 계좌를 개설하고 싶어요.",
      },
      {
        en: { us: "I recently arrived on a working holiday visa." },
        ko: "최근에 워킹홀리데이 비자로 입국했어요.",
      },
      { en: { us: "What documents do I need?" }, ko: "어떤 서류가 필요해요?" },
      {
        en: { us: "Is there a monthly account fee?" },
        ko: "월 계좌 유지 수수료가 있나요?",
      },
      {
        en: { us: "Can I open an everyday account and a savings account?" },
        ko: "입출금 계좌와 저축 계좌를 같이 만들 수 있나요?",
        note: "일상 입출금 계좌를 everyday account 또는 transaction account라고 해요.",
      },
      {
        en: { us: "When will my debit card arrive?" },
        ko: "체크카드는 언제 도착해요?",
        note: "한국의 체크카드는 debit card, 신용카드는 credit card예요.",
      },
      {
        en: { us: "Can I set up internet banking today?" },
        ko: "오늘 인터넷 뱅킹도 설정할 수 있나요?",
      },
      {
        en: { us: "What's the interest rate on the savings account?" },
        ko: "저축 계좌 이자율이 어떻게 되나요?",
      },
      {
        en: { us: "I don't have proof of address yet." },
        ko: "아직 주소 증명 서류가 없어요.",
        note: "입국 6주 이내면 보통 여권만으로 계좌를 열 수 있어요.",
      },
      {
        en: { us: "How do I receive money from overseas?" },
        ko: "해외에서 돈을 받으려면 어떻게 해요?",
      },
      {
        en: { us: "Here is my passport and visa grant letter." },
        ko: "여기 제 여권과 비자 승인 레터요.",
      },
      {
        en: { us: "I'd like to add my tax file number to the account." },
        ko: "계좌에 텍스 파일 넘버를 등록하고 싶어요.",
        note: "TFN을 등록하지 않으면 이자 소득에 최고 세율이 원천징수돼요.",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Good morning! How can I help you today?" },
        ko: "안녕하세요! 무엇을 도와드릴까요?",
      },
      {
        speaker: "you",
        en: { us: "Hello, I'd like to open an everyday account, please." },
        ko: "안녕하세요, 일상 입출금 계좌를 개설하고 싶어요.",
      },
      {
        speaker: "staff",
        en: { us: "No problem. Do you have your passport and visa with you?" },
        ko: "문제없어요. 여권과 비자를 가지고 오셨나요?",
      },
      {
        speaker: "you",
        en: { us: "Yes, here they are. I arrived two weeks ago." },
        ko: "네, 여기 있어요. 2주 전에 입국했어요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Perfect. Since you arrived recently, your passport is enough for ID.",
        },
        ko: "좋아요. 최근에 입국하셔서 여권만으로 신분 확인이 가능해요.",
      },
      {
        speaker: "you",
        en: { us: "Great. Are there any fees for this account?" },
        ko: "다행이네요. 이 계좌에 수수료가 있나요?",
      },
      {
        speaker: "staff",
        en: { us: "There's no monthly fee for customers under thirty." },
        ko: "30세 미만 고객은 월 수수료가 없어요.",
      },
      {
        speaker: "you",
        en: { us: "Nice. How long does the card take to arrive?" },
        ko: "좋네요. 카드는 도착까지 얼마나 걸려요?",
      },
      {
        speaker: "staff",
        en: {
          us: "About five business days, but you can use the digital card right away.",
        },
        ko: "영업일 기준 5일 정도인데, 디지털 카드는 바로 사용할 수 있어요.",
      },
      {
        speaker: "you",
        en: {
          us: "That's convenient. Could you also help me set up the mobile app?",
        },
        ko: "편리하네요. 모바일 앱 설정도 도와주시겠어요?",
      },
    ],
    auNotes: [
      "호주 4대 은행은 CommBank, ANZ, Westpac, NAB예요. 입국 6주 이내에는 여권만으로 계좌 개설이 가능한 경우가 많아요.",
      "TFN(Tax File Number)을 계좌에 등록하지 않으면 이자 소득에 최고 세율이 원천징수되니 받는 대로 등록하세요.",
      "친구에게 돈을 보낼 때는 계좌번호 대신 PayID(전화번호나 이메일)로 즉시 이체하는 게 일반적이에요.",
    ],
  },
  {
    id: "pack-sim",
    level: "A2",
    title: "휴대폰 개통",
    scene: "통신사 매장에서 유심을 구입하고 선불 요금제를 개통하는 상황이에요.",
    icon: "📱",
    expressions: [
      {
        en: {
          us: "I'd like to get a SIM card for my cell phone.",
          au: "I'd like to get a SIM card for my mobile.",
        },
        ko: "휴대폰에 쓸 유심을 사고 싶어요.",
        note: "호주에서는 휴대폰을 cell phone이 아니라 mobile이라고 해요.",
      },
      { en: { us: "Do you have prepaid plans?" }, ko: "선불 요금제가 있나요?" },
      {
        en: { us: "How much data do I get per month?" },
        ko: "한 달에 데이터를 얼마나 받아요?",
      },
      {
        en: { us: "Does the plan include international calls?" },
        ko: "요금제에 국제전화가 포함되나요?",
      },
      {
        en: { us: "Can I keep my number if I change providers?" },
        ko: "통신사를 바꿔도 번호를 유지할 수 있나요?",
      },
      {
        en: { us: "How do I top up my credit?" },
        ko: "크레딧은 어떻게 충전해요?",
        note: "선불 요금 충전은 top up 또는 recharge라고 해요.",
      },
      {
        en: { us: "Is there good coverage in rural areas?" },
        ko: "시골 지역에서도 잘 터지나요?",
        note: "farm 일을 계획한다면 커버리지 질문이 꼭 필요해요.",
      },
      { en: { us: "My phone is unlocked." }, ko: "제 폰은 언락된 폰이에요." },
      {
        en: { us: "How long does activation take?" },
        ko: "개통되는 데 얼마나 걸려요?",
      },
      {
        en: { us: "Do I need an Australian address to sign up?" },
        ko: "가입하려면 호주 주소가 필요한가요?",
      },
      {
        en: { us: "What happens when I use up all my data?" },
        ko: "데이터를 다 쓰면 어떻게 되나요?",
      },
      {
        en: { us: "I'll take the twenty-eight-day plan." },
        ko: "28일 요금제로 할게요.",
        note: "호주 선불 요금제는 30일이 아니라 28일 주기가 많아요.",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Welcome! What brings you in today?" },
        ko: "어서 오세요! 오늘 어떤 일로 오셨어요?",
      },
      {
        speaker: "you",
        en: {
          us: "Hi, I need a new SIM card for my cell phone.",
          au: "Hi, I need a new SIM card for my mobile.",
        },
        ko: "안녕하세요, 휴대폰에 쓸 새 유심이 필요해요.",
      },
      {
        speaker: "staff",
        en: { us: "Sure thing. Are you after a prepaid or a monthly plan?" },
        ko: "네. 선불 요금제를 찾으세요, 아니면 월 약정 요금제를 찾으세요?",
      },
      {
        speaker: "you",
        en: {
          us: "Prepaid, please. I'm on a working holiday, so no contracts.",
        },
        ko: "선불이요. 워킹홀리데이 중이라 약정은 어려워요.",
      },
      {
        speaker: "staff",
        en: {
          us: "This one gives you thirty gigabytes for thirty-five dollars.",
        },
        ko: "이 요금제는 35달러에 30기가를 드려요.",
      },
      {
        speaker: "you",
        en: { us: "Does that include calls to Korea?" },
        ko: "한국으로 거는 전화도 포함되나요?",
      },
      {
        speaker: "staff",
        en: {
          us: "Yes, unlimited international calls to selected countries, including Korea.",
        },
        ko: "네, 한국을 포함한 지정 국가로 국제전화가 무제한이에요.",
      },
      {
        speaker: "you",
        en: { us: "Perfect. Can you activate it now?" },
        ko: "완벽하네요. 지금 바로 개통해 주실 수 있나요?",
      },
      {
        speaker: "staff",
        en: { us: "Absolutely. I just need your passport for ID." },
        ko: "물론이죠. 신분 확인용으로 여권만 주시면 돼요.",
      },
      {
        speaker: "you",
        en: { us: "Sure, here it is. Also, could you help me insert the SIM?" },
        ko: "네, 여기 있어요. 그리고 유심 넣는 것도 도와주시겠어요?",
      },
    ],
    auNotes: [
      "호주 3대 통신사는 Telstra, Optus, Vodafone이에요. 외곽이나 농장 지역에서 일할 계획이면 커버리지가 넓은 Telstra 계열이 유리해요.",
      "선불 요금제는 한 달이 아니라 28일 갱신 주기인 경우가 많으니 만료일을 잘 확인하세요.",
      "충전은 recharge 또는 top up이라고 하고, 마트나 편의점에서 충전 바우처를 살 수도 있어요.",
    ],
  },
  {
    id: "pack-pharmacy",
    level: "A2",
    title: "약국에서",
    scene: "약국에서 증상을 설명하고 알맞은 약과 복용법을 안내받는 상황이에요.",
    icon: "💊",
    expressions: [
      {
        en: {
          us: "Is there a pharmacy near here?",
          au: "Is there a chemist near here?",
        },
        ko: "근처에 약국이 있나요?",
        note: "호주에서는 약국을 pharmacy보다 chemist라고 많이 불러요.",
      },
      { en: { us: "I have a sore throat." }, ko: "목이 아파요." },
      {
        en: { us: "I've had a headache since this morning." },
        ko: "아침부터 머리가 아파요.",
      },
      {
        en: { us: "Do you have something for a cold?" },
        ko: "감기에 먹는 약 있나요?",
      },
      {
        en: { us: "Can I get this without a prescription?" },
        ko: "이거 처방전 없이 살 수 있나요?",
        note: "처방전은 prescription, 처방 없이 사는 약은 over-the-counter라고 해요.",
      },
      {
        en: { us: "How often should I take this?" },
        ko: "이 약은 얼마나 자주 먹어야 해요?",
      },
      {
        en: { us: "Should I take it with food?" },
        ko: "밥 먹고 먹어야 하나요?",
      },
      {
        en: { us: "I'm allergic to penicillin." },
        ko: "저는 페니실린 알레르기가 있어요.",
        note: "알레르기가 있으면 약을 사기 전에 꼭 먼저 말하세요.",
      },
      {
        en: { us: "Do you have anything for insect bites?" },
        ko: "벌레 물린 데 바르는 약 있나요?",
      },
      {
        en: {
          us: "Can I take this together with acetaminophen?",
          au: "Can I take this together with paracetamol?",
        },
        ko: "이거 해열진통제랑 같이 먹어도 되나요?",
        note: "호주에서는 타이레놀 성분을 paracetamol(대표 상품명 Panadol)이라고 해요.",
      },
      {
        en: { us: "Where can I find sunscreen?" },
        ko: "선크림은 어디에 있어요?",
      },
      { en: { us: "Are there any side effects?" }, ko: "부작용이 있나요?" },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Hi there, how can I help you?" },
        ko: "안녕하세요, 어떻게 도와드릴까요?",
      },
      {
        speaker: "you",
        en: { us: "Hi, I think I'm coming down with a cold." },
        ko: "안녕하세요, 감기에 걸린 것 같아요.",
      },
      {
        speaker: "staff",
        en: { us: "What symptoms do you have?" },
        ko: "어떤 증상이 있으세요?",
      },
      {
        speaker: "you",
        en: { us: "I have a runny nose and a slight fever." },
        ko: "콧물이 나고 미열이 있어요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Okay. This cold and flu tablet should help. Take one every six hours.",
        },
        ko: "알겠어요. 이 감기몸살약이 도움이 될 거예요. 6시간마다 한 알씩 드세요.",
      },
      {
        speaker: "you",
        en: { us: "Will it make me sleepy? I have work tonight." },
        ko: "먹으면 졸리나요? 오늘 밤에 일해야 하거든요.",
      },
      {
        speaker: "staff",
        en: {
          us: "This one is the daytime version, so it won't cause drowsiness.",
        },
        ko: "이건 주간용이라 졸음이 오지 않아요.",
      },
      {
        speaker: "you",
        en: { us: "Great. Can I take it on an empty stomach?" },
        ko: "다행이네요. 공복에 먹어도 되나요?",
      },
      {
        speaker: "staff",
        en: { us: "It's better with a snack, and drink plenty of water." },
        ko: "간단한 음식과 함께 드시는 게 좋고, 물을 충분히 드세요.",
      },
      {
        speaker: "you",
        en: { us: "Thank you. I'll take this box, please." },
        ko: "감사해요. 이걸로 살게요.",
      },
    ],
    auNotes: [
      "호주에서 약국은 chemist라고 부르는 게 일반적이에요. Chemist Warehouse가 가장 큰 체인이에요.",
      "해열진통제는 타이레놀 대신 Panadol(파라세타몰), 이부프로펜 계열은 Nurofen이라는 이름으로 팔려요.",
      "가벼운 증상은 병원 대신 약국에서 먼저 상담하는 문화가 있어요. 약사가 무료로 조언해 줘요.",
    ],
  },
  {
    id: "pack-job-apply",
    level: "A2",
    title: "알바 지원 전화",
    scene:
      "구인 광고를 보고 가게에 전화를 걸어 아르바이트 지원 방법을 묻는 상황이에요.",
    icon: "📞",
    expressions: [
      {
        en: { us: "Hello, I'm calling about the job ad." },
        ko: "안녕하세요, 구인 광고 보고 전화드렸어요.",
      },
      {
        en: { us: "Is the position still open?" },
        ko: "그 자리 아직 비어 있나요?",
        note: "전화 첫머리에 아직 채용 중인지 확인하는 게 자연스러워요.",
      },
      {
        en: { us: "I found the ad online yesterday." },
        ko: "어제 온라인에서 광고를 봤어요.",
      },
      {
        en: {
          us: "Should I send my resume by email?",
          au: "Should I send my CV by email?",
        },
        ko: "이력서를 이메일로 보내 드릴까요?",
        note: "호주에서는 이력서를 resume 대신 CV라고 부르는 경우가 많아요.",
      },
      {
        en: { us: "I have experience working at a cafe in Korea." },
        ko: "한국에서 카페에서 일한 경험이 있어요.",
      },
      {
        en: { us: "I'm available on weekends and evenings." },
        ko: "주말과 저녁에 일할 수 있어요.",
      },
      {
        en: { us: "How many hours per week would it be?" },
        ko: "일주일에 몇 시간 근무인가요?",
      },
      {
        en: { us: "Could I ask about the hourly pay?" },
        ko: "시급을 여쭤봐도 될까요?",
      },
      {
        en: { us: "I have a valid working holiday visa." },
        ko: "유효한 워킹홀리데이 비자를 가지고 있어요.",
        note: "고용주가 비자 상태를 확인하는 경우가 많으니 먼저 말하면 좋아요.",
      },
      {
        en: { us: "When would you like me to come in?" },
        ko: "언제 방문하면 될까요?",
      },
      {
        en: { us: "Could I leave my name and number?" },
        ko: "제 이름과 전화번호를 남겨도 될까요?",
      },
      {
        en: { us: "Sorry, could you spell the email address for me?" },
        ko: "죄송하지만 이메일 주소 철자를 불러 주시겠어요?",
        note: "전화 영어에서는 철자 확인을 부탁하는 게 전혀 실례가 아니에요.",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Good afternoon, Coastal Cafe, this is Emma speaking." },
        ko: "안녕하세요, 코스탈 카페의 엠마입니다.",
      },
      {
        speaker: "you",
        en: {
          us: "Hi Emma, I'm calling about the kitchen hand position you advertised.",
        },
        ko: "안녕하세요 엠마, 광고하신 주방 보조 자리 때문에 전화드렸어요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Oh yes, we're still looking. Have you done kitchen work before?",
        },
        ko: "아 네, 아직 구하고 있어요. 주방 일 해 본 적 있으세요?",
      },
      {
        speaker: "you",
        en: {
          us: "Yes, I worked in a restaurant kitchen for a year in Korea.",
        },
        ko: "네, 한국에서 1년 동안 식당 주방에서 일했어요.",
      },
      {
        speaker: "staff",
        en: { us: "That's good to hear. What days are you available?" },
        ko: "잘됐네요. 어떤 요일에 일할 수 있어요?",
      },
      {
        speaker: "you",
        en: { us: "I'm free every day except Tuesdays." },
        ko: "화요일만 빼고 매일 가능해요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Great. Could you email me your resume today?",
          au: "Great. Could you email me your CV today?",
        },
        ko: "좋아요. 오늘 이력서를 이메일로 보내 주시겠어요?",
      },
      {
        speaker: "you",
        en: { us: "Of course. What's the email address?" },
        ko: "물론이죠. 이메일 주소가 어떻게 되나요?",
      },
      {
        speaker: "staff",
        en: {
          us: "It's jobs at coastalcafe dot com. I'll get back to you by Friday.",
        },
        ko: "jobs@coastalcafe.com이에요. 금요일까지 연락드릴게요.",
      },
      {
        speaker: "you",
        en: { us: "Thank you very much, Emma. I'll send it right away." },
        ko: "정말 감사해요, 엠마. 바로 보내 드릴게요.",
      },
    ],
    auNotes: [
      "호주 구직은 Seek, Indeed, Gumtree를 많이 쓰고, 시내 가게는 이력서를 직접 들고 방문하는 것도 효과적이에요.",
      "합법적으로 일하려면 TFN(Tax File Number)이 꼭 필요해요. 현금으로만 주는 cash job은 최저임금을 어기는 경우가 많으니 주의하세요.",
      "호주 이력서에는 사진, 나이, 생년월일을 넣지 않는 게 표준이에요.",
    ],
  },
  {
    id: "pack-secondhand",
    level: "A2",
    title: "중고 거래",
    scene:
      "중고 거래 앱에서 연락한 판매자를 만나 물건을 확인하고 가격을 흥정하는 상황이에요.",
    icon: "🪑",
    expressions: [
      {
        en: { us: "Is this still available?" },
        ko: "이거 아직 판매 중인가요?",
        note: "중고 거래 첫 메시지로 가장 많이 쓰는 문장이에요.",
      },
      {
        en: { us: "Could you send me more photos?" },
        ko: "사진을 더 보내 주실 수 있나요?",
      },
      { en: { us: "What's the condition like?" }, ko: "상태가 어떤가요?" },
      { en: { us: "How old is it?" }, ko: "사용한 지 얼마나 됐어요?" },
      {
        en: { us: "Would you take fifty for it?" },
        ko: "50달러에 주실 수 있나요?",
        note: "Would you take + 금액은 부담 없이 흥정하는 표현이에요.",
      },
      { en: { us: "Is the price negotiable?" }, ko: "가격 조정이 가능한가요?" },
      {
        en: { us: "Can I come and have a look today?" },
        ko: "오늘 가서 볼 수 있을까요?",
      },
      {
        en: { us: "Does it come with the charger?" },
        ko: "충전기도 같이 주시는 건가요?",
      },
      {
        en: { us: "Are there any scratches or damage?" },
        ko: "긁힘이나 파손이 있나요?",
      },
      {
        en: { us: "Can you deliver it, or is it pickup only?" },
        ko: "배달도 되나요, 아니면 직접 가져가야 하나요?",
        note: "광고의 pickup only는 구매자가 직접 가져가야 한다는 뜻이에요.",
      },
      {
        en: { us: "I'll transfer the money now." },
        ko: "지금 바로 이체할게요.",
        note: "호주 중고 거래는 현금 대신 계좌 이체나 PayID 결제가 흔해요.",
      },
      { en: { us: "Deal. I'll take it." }, ko: "좋아요. 이걸로 살게요." },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Hi, are you here about the desk?" },
        ko: "안녕하세요, 책상 보러 오셨어요?",
      },
      {
        speaker: "you",
        en: { us: "Yes, I messaged you on Marketplace this morning." },
        ko: "네, 오늘 아침에 마켓플레이스에서 메시지 드렸어요.",
      },
      {
        speaker: "staff",
        en: { us: "Come through. Here it is, barely used." },
        ko: "이쪽으로 오세요. 여기 있어요, 거의 새것이에요.",
      },
      {
        speaker: "you",
        en: { us: "It looks good. Can I check the drawers?" },
        ko: "좋아 보이네요. 서랍을 확인해 봐도 될까요?",
      },
      {
        speaker: "staff",
        en: { us: "Go ahead. Everything opens smoothly." },
        ko: "그럼요. 전부 부드럽게 열려요.",
      },
      {
        speaker: "you",
        en: { us: "There's a small scratch here. Would you do sixty dollars?" },
        ko: "여기 작은 긁힘이 있네요. 60달러에 주실 수 있나요?",
      },
      {
        speaker: "staff",
        en: { us: "Hmm, I can do sixty-five. That's my best price." },
        ko: "음, 65달러까지는 가능해요. 그게 최저가예요.",
      },
      {
        speaker: "you",
        en: { us: "Okay, sixty-five works. Do you accept bank transfer?" },
        ko: "네, 65달러 좋아요. 계좌 이체도 받으세요?",
      },
      {
        speaker: "staff",
        en: { us: "PayID is easiest if you have it." },
        ko: "페이아이디가 있으면 그게 제일 편해요.",
      },
      {
        speaker: "you",
        en: {
          us: "Sure, I'll send it now. Could you help me carry it to the car?",
        },
        ko: "네, 지금 보낼게요. 차까지 옮기는 것 좀 도와주시겠어요?",
      },
    ],
    auNotes: [
      "호주 중고 거래는 Facebook Marketplace와 Gumtree를 가장 많이 써요.",
      "현금 대신 PayID 즉시 이체로 결제하는 경우가 많아요. 송금 사기를 피하려면 물건을 직접 확인한 뒤에 보내세요.",
      "council 대형 폐기물 수거 기간에는 길가(kerbside)에 쓸 만한 가구가 공짜로 많이 나와요.",
    ],
  },
  {
    id: "pack-job-interview",
    level: "B1",
    title: "알바 면접",
    scene:
      "카페 매니저와 마주 앉아 경험과 근무 조건을 이야기하며 면접을 보는 상황이에요.",
    icon: "🤝",
    expressions: [
      {
        en: { us: "Thank you for taking the time to meet me today." },
        ko: "오늘 시간 내서 만나 주셔서 감사해요.",
      },
      {
        en: { us: "I've been working in hospitality for about two years." },
        ko: "저는 2년 정도 서비스업에서 일해 왔어요.",
        note: "hospitality는 카페, 레스토랑, 호텔 업계를 통틀어 부르는 말이에요.",
      },
      {
        en: { us: "I'm a quick learner, and I work well under pressure." },
        ko: "저는 빨리 배우는 편이고 바쁜 상황에서도 일을 잘해요.",
      },
      {
        en: {
          us: "In my last job, I handled the register and customer complaints.",
        },
        ko: "지난 직장에서는 계산대와 고객 불만 응대를 맡았어요.",
      },
      {
        en: { us: "I can start as early as next week." },
        ko: "빠르면 다음 주부터 시작할 수 있어요.",
      },
      {
        en: { us: "I'm looking for around thirty hours a week." },
        ko: "일주일에 30시간 정도 일하고 싶어요.",
      },
      {
        en: {
          us: "My visa allows me to work full-time for up to six months with one employer.",
        },
        ko: "제 비자로는 한 고용주 밑에서 최대 6개월까지 풀타임으로 일할 수 있어요.",
        note: "워홀 비자는 한 고용주당 6개월 근무 제한이 있어요.",
      },
      {
        en: { us: "What would my main duties be?" },
        ko: "제 주요 업무는 무엇인가요?",
      },
      {
        en: { us: "Is there any training provided for new staff?" },
        ko: "신입 직원 교육이 제공되나요?",
      },
      {
        en: { us: "What is the pay rate for this position?" },
        ko: "이 포지션의 시급은 어떻게 되나요?",
        note: "캐주얼직은 시급이 더 높은 대신 유급 휴가가 없어요.",
      },
      {
        en: { us: "Do you pay superannuation on top of the wage?" },
        ko: "급여 외에 퇴직연금도 지급되나요?",
        note: "superannuation(super)은 고용주가 의무로 적립하는 퇴직연금이에요.",
      },
      {
        en: { us: "When can I expect to hear back from you?" },
        ko: "결과는 언제쯤 들을 수 있을까요?",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Thanks for coming in. So, tell me a bit about yourself." },
        ko: "와 줘서 고마워요. 자, 자기소개를 간단히 해 주세요.",
      },
      {
        speaker: "you",
        en: {
          us: "I'm Minji from Korea, and I've worked as a barista for two years back home.",
        },
        ko: "저는 한국에서 온 민지이고, 한국에서 2년 동안 바리스타로 일했어요.",
      },
      {
        speaker: "staff",
        en: { us: "Nice. Why do you want to work at our cafe in particular?" },
        ko: "좋네요. 왜 특별히 우리 카페에서 일하고 싶어요?",
      },
      {
        speaker: "you",
        en: {
          us: "I love the coffee culture here, and I want to improve my skills in a busy environment.",
        },
        ko: "이곳의 커피 문화가 정말 좋고, 바쁜 환경에서 제 실력을 더 키우고 싶어서요.",
      },
      {
        speaker: "staff",
        en: {
          us: "We get pretty hectic on weekends. How do you handle stress during a rush?",
        },
        ko: "주말에는 꽤 정신없어요. 바쁜 시간대 스트레스는 어떻게 관리해요?",
      },
      {
        speaker: "you",
        en: {
          us: "I stay calm, prioritize orders, and communicate clearly with the team.",
        },
        ko: "침착함을 유지하고, 주문 우선순위를 정하고, 팀과 명확하게 소통해요.",
      },
      {
        speaker: "staff",
        en: { us: "Good answer. What's your availability like?" },
        ko: "좋은 답변이네요. 근무 가능 시간은 어떻게 돼요?",
      },
      {
        speaker: "you",
        en: {
          us: "I'm fully available, including early mornings and public holidays.",
        },
        ko: "이른 아침과 공휴일을 포함해서 언제든 가능해요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Perfect. We'll do a paid trial shift this Saturday, if that suits you.",
        },
        ko: "완벽해요. 괜찮으면 이번 주 토요일에 유급 트라이얼 근무를 해 봐요.",
      },
      {
        speaker: "you",
        en: { us: "That suits me well. Thank you for the opportunity!" },
        ko: "저는 좋아요. 기회를 주셔서 감사해요!",
      },
    ],
    auNotes: [
      "호주에서는 정식 채용 전에 trial shift(시범 근무)를 하는 경우가 많아요. 일정 시간이 넘는 트라이얼은 유급이 원칙이에요.",
      "캐주얼(casual) 직원은 유급 휴가가 없는 대신 시급에 25% 정도의 casual loading이 붙어요.",
      "고용주는 급여와 별도로 superannuation(퇴직연금)을 적립해 줘야 하고, 워홀러는 출국할 때 일부를 환급받을 수 있어요.",
    ],
  },
  {
    id: "pack-cafe-staff",
    level: "B1",
    title: "카페 알바 응대(직원 입장)",
    scene:
      "카페 직원으로 일하며 손님의 주문을 받고 요청과 컴플레인에 대응하는 상황이에요.",
    icon: "🧾",
    expressions: [
      {
        en: { us: "Hi, what can I get started for you?" },
        ko: "안녕하세요, 무엇을 준비해 드릴까요?",
      },
      {
        en: {
          us: "Will that be for here or to go?",
          au: "Will that be dine-in or takeaway?",
        },
        ko: "매장에서 드시나요, 포장인가요?",
      },
      {
        en: { us: "Would you like anything else with that?" },
        ko: "다른 것도 더 필요하세요?",
      },
      {
        en: { us: "Sorry, we're out of almond milk at the moment." },
        ko: "죄송하지만 지금 아몬드 우유가 다 떨어졌어요.",
      },
      {
        en: { us: "It'll be about five minutes for the food." },
        ko: "음식은 5분 정도 걸릴 거예요.",
      },
      {
        en: { us: "Could I grab a name for the order?" },
        ko: "주문하실 분 성함을 여쭤봐도 될까요?",
        note: "grab은 호주 카페에서 정말 자주 쓰는 만능 동사예요.",
      },
      {
        en: { us: "That comes to twelve eighty altogether." },
        ko: "다 해서 12달러 80센트예요.",
        note: "가격을 말할 때 dollars를 생략하고 twelve eighty처럼 말해요.",
      },
      {
        en: {
          us: "Just tap your card on the reader when you're ready.",
          au: "Just tap your card on the EFTPOS machine when you're ready.",
        },
        ko: "준비되시면 단말기에 카드를 대 주세요.",
        note: "호주에서는 카드 단말기를 EFTPOS 머신이라고 해요.",
      },
      {
        en: { us: "I'm so sorry about that. Let me make you a fresh one." },
        ko: "정말 죄송해요. 새로 만들어 드릴게요.",
        note: "컴플레인 대응은 사과, 해결책 제시 순서가 기본이에요.",
      },
      {
        en: { us: "I'll check with my manager and get right back to you." },
        ko: "매니저에게 확인하고 바로 알려 드릴게요.",
      },
      {
        en: { us: "Here's your change and your receipt." },
        ko: "여기 거스름돈과 영수증이요.",
      },
      {
        en: { us: "Thanks for waiting. Enjoy your meal!" },
        ko: "기다려 주셔서 감사해요. 맛있게 드세요!",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: {
          us: "Hi, could I please get a large cappuccino and a ham and cheese toastie?",
        },
        ko: "안녕하세요, 라지 카푸치노 하나랑 햄치즈 토스티 하나 주시겠어요?",
      },
      {
        speaker: "you",
        en: { us: "Of course. Would you like the toastie heated up?" },
        ko: "물론이죠. 토스티는 데워 드릴까요?",
      },
      {
        speaker: "staff",
        en: {
          us: "Yes, please. Actually, can you make the cappuccino with skim milk?",
        },
        ko: "네. 아, 카푸치노는 무지방 우유로 해 주실 수 있나요?",
      },
      {
        speaker: "you",
        en: { us: "No problem at all. Anything else for you today?" },
        ko: "전혀 문제없어요. 오늘 더 필요하신 건 없으세요?",
      },
      {
        speaker: "staff",
        en: {
          us: "That's all, thanks. Oh wait, this table hasn't been wiped.",
        },
        ko: "그게 다예요, 고마워요. 아 잠깐, 이 테이블이 안 닦여 있네요.",
      },
      {
        speaker: "you",
        en: { us: "My apologies, I'll clean it for you straight away." },
        ko: "죄송해요, 바로 닦아 드릴게요.",
      },
      {
        speaker: "staff",
        en: { us: "Thanks. Also, my coffee yesterday was a bit cold." },
        ko: "고마워요. 그리고 어제 커피가 좀 식어 있었어요.",
      },
      {
        speaker: "you",
        en: {
          us: "I'm sorry to hear that. Today's coffee is on the house to make up for it.",
        },
        ko: "그러셨다니 죄송해요. 사과의 의미로 오늘 커피는 서비스로 드릴게요.",
      },
      {
        speaker: "staff",
        en: { us: "Oh, that's very kind of you. I appreciate it." },
        ko: "어머, 정말 친절하시네요. 감사해요.",
      },
      {
        speaker: "you",
        en: {
          us: "My pleasure. Take a seat, and I'll bring everything over shortly.",
        },
        ko: "별말씀을요. 앉아 계시면 곧 가져다드릴게요.",
      },
    ],
    auNotes: [
      "호주 손님은 'Can I please get...'처럼 please를 자주 붙여요. 직원과 손님이 서로 이름을 부르며 친근하게 대화하는 분위기예요.",
      "구운 샌드위치는 toastie, 가게가 서비스로 주는 것은 on the house라고 해요.",
      "팁 문화가 없어서 팁을 기대하지 않아도 되지만, 그만큼 기본 시급이 높고 주말과 공휴일에는 penalty rate로 급여가 올라가요.",
    ],
  },
  {
    id: "pack-gp",
    level: "B1",
    title: "병원 GP 진료",
    scene:
      "동네 GP 클리닉을 예약해 방문하고 증상을 설명하며 진료를 받는 상황이에요.",
    icon: "🩺",
    expressions: [
      {
        en: { us: "I'd like to make an appointment to see a GP." },
        ko: "GP 진료 예약을 하고 싶어요.",
        note: "GP(General Practitioner)는 호주 1차 진료를 맡는 일반의예요.",
      },
      {
        en: { us: "Do you have anything available this afternoon?" },
        ko: "오늘 오후에 가능한 시간이 있나요?",
      },
      {
        en: { us: "It's my first time visiting this clinic." },
        ko: "이 클리닉은 처음 방문이에요.",
      },
      {
        en: {
          us: "I don't have Medicare. I have private health insurance for visitors.",
        },
        ko: "저는 메디케어가 없고, 방문자용 사보험이 있어요.",
        note: "워홀 비자는 보통 Medicare 대상이 아니라 OVHC 같은 사보험이 필요해요.",
      },
      {
        en: { us: "I've been feeling dizzy for the past few days." },
        ko: "며칠 전부터 어지러워요.",
      },
      {
        en: { us: "The pain gets worse when I move my arm." },
        ko: "팔을 움직이면 통증이 더 심해져요.",
      },
      {
        en: { us: "I've been taking painkillers, but they don't really help." },
        ko: "진통제를 먹고 있는데 별로 효과가 없어요.",
      },
      {
        en: { us: "Could you write me a medical certificate for work?" },
        ko: "직장에 낼 진단서를 써 주실 수 있나요?",
        note: "병가를 낼 때는 GP의 medical certificate를 고용주에게 제출해요.",
      },
      {
        en: { us: "Do I need to get a blood test?" },
        ko: "혈액 검사를 받아야 하나요?",
      },
      {
        en: { us: "How many times a day should I take this medication?" },
        ko: "이 약은 하루에 몇 번 먹어야 하나요?",
      },
      {
        en: { us: "Could you refer me to a specialist?" },
        ko: "전문의에게 의뢰서를 써 주실 수 있나요?",
        note: "호주에서 전문의 진료는 GP의 referral이 있어야 받을 수 있어요.",
      },
      {
        en: { us: "How much will the consultation cost?" },
        ko: "진료비는 얼마인가요?",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: { us: "Hello, I'm Dr. Chen. What brings you in today?" },
        ko: "안녕하세요, 닥터 첸이에요. 오늘 어떻게 오셨어요?",
      },
      {
        speaker: "you",
        en: { us: "Hello, doctor. I've had stomach pain since Monday." },
        ko: "안녕하세요, 선생님. 월요일부터 배가 아파요.",
      },
      {
        speaker: "staff",
        en: { us: "I see. Can you point to where it hurts the most?" },
        ko: "그렇군요. 어디가 가장 아픈지 짚어 주시겠어요?",
      },
      {
        speaker: "you",
        en: { us: "Right here, on the lower right side. It comes and goes." },
        ko: "바로 여기 오른쪽 아랫배요. 아팠다 안 아팠다 해요.",
      },
      {
        speaker: "staff",
        en: { us: "Any fever, vomiting, or changes in appetite?" },
        ko: "열이나 구토, 식욕 변화는 있었나요?",
      },
      {
        speaker: "you",
        en: { us: "No fever, but I haven't had much appetite lately." },
        ko: "열은 없는데 요즘 식욕이 별로 없어요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Alright, lie down on the bed and I'll examine your abdomen.",
        },
        ko: "알겠어요, 침대에 누우시면 배를 진찰해 볼게요.",
      },
      {
        speaker: "you",
        en: { us: "Ouch, that spot is quite tender when you press it." },
        ko: "아야, 누르시니까 그 부분이 꽤 아파요.",
      },
      {
        speaker: "staff",
        en: {
          us: "I'd like you to get an ultrasound to rule out anything serious. I'll write a referral.",
        },
        ko: "심각한 문제가 아닌지 확인하기 위해 초음파 검사를 받아 보세요. 의뢰서를 써 드릴게요.",
      },
      {
        speaker: "you",
        en: {
          us: "I understand. Could you also give me a certificate for my employer?",
        },
        ko: "알겠어요. 고용주에게 제출할 진단서도 발급해 주시겠어요?",
      },
    ],
    auNotes: [
      "호주에서는 아프면 먼저 GP(일반의)를 만나고, 전문의는 GP의 referral이 있어야 볼 수 있어요.",
      "한국 워홀 비자는 Medicare 대상이 아니라 OVHC 같은 사보험이 필요해요. GP 진료비는 보통 80~120달러 선이에요.",
      "병가를 쓰려면 GP에게 medical certificate를 받아 고용주에게 제출하면 돼요. 약국에서 발급하는 간이 확인서를 받는 경우도 있어요.",
    ],
  },
  {
    id: "pack-emergency",
    level: "B1",
    title: "응급 상황·000 신고",
    scene:
      "사고를 목격하거나 위급한 상황에서 000에 전화해 도움을 요청하는 상황이에요.",
    icon: "🚨",
    expressions: [
      {
        en: { us: "I need an ambulance, please. It's urgent." },
        ko: "구급차가 필요해요. 위급한 상황이에요.",
      },
      {
        en: { us: "There's been a car accident on George Street." },
        ko: "조지 스트리트에서 교통사고가 났어요.",
      },
      {
        en: { us: "Someone has collapsed and isn't responding." },
        ko: "사람이 쓰러졌는데 반응이 없어요.",
        note: "not responding(반응이 없음)은 신고할 때 아주 중요한 정보예요.",
      },
      {
        en: { us: "He's breathing, but he's unconscious." },
        ko: "숨은 쉬는데 의식이 없어요.",
      },
      {
        en: { us: "My friend is having trouble breathing." },
        ko: "제 친구가 숨쉬기 힘들어해요.",
      },
      {
        en: { us: "We're at the corner of King Street and Pitt Street." },
        ko: "킹 스트리트와 피트 스트리트 모퉁이에 있어요.",
        note: "신고할 때는 위치를 가장 먼저, 가장 정확하게 말하세요.",
      },
      {
        en: { us: "Please hurry, she's bleeding heavily." },
        ko: "서둘러 주세요, 피를 많이 흘리고 있어요.",
      },
      {
        en: { us: "I've been robbed. Someone took my bag." },
        ko: "강도를 당했어요. 누가 제 가방을 가져갔어요.",
      },
      {
        en: { us: "There's a fire in the building next door." },
        ko: "옆 건물에 불이 났어요.",
      },
      {
        en: {
          us: "I'm not sure of the exact address, but I can describe the area.",
        },
        ko: "정확한 주소는 모르지만 주변을 설명할 수 있어요.",
        note: "주소를 모르면 큰길 이름이나 랜드마크를 말하면 돼요.",
      },
      {
        en: { us: "Should I start CPR? I've had basic training." },
        ko: "심폐소생술을 시작할까요? 기본 교육을 받았어요.",
        note: "000 상담원이 CPR 방법을 전화로 단계별로 안내해 줘요.",
      },
      {
        en: { us: "Could you stay on the line with me? I'm quite shaken." },
        ko: "전화를 끊지 말고 같이 있어 주시겠어요? 많이 놀라서요.",
      },
    ],
    roleplay: [
      {
        speaker: "staff",
        en: {
          us: "Emergency services. Do you need police, fire, or ambulance?",
        },
        ko: "긴급 서비스입니다. 경찰, 소방, 구급차 중 무엇이 필요하세요?",
      },
      {
        speaker: "you",
        en: {
          us: "Ambulance, please. A man just fell off his bike and hit his head.",
        },
        ko: "구급차요. 방금 한 남자가 자전거에서 넘어져서 머리를 부딪혔어요.",
      },
      {
        speaker: "staff",
        en: { us: "What's your exact location?" },
        ko: "정확한 위치가 어디인가요?",
      },
      {
        speaker: "you",
        en: {
          us: "We're on the bike path near Darling Harbour, next to the big playground.",
        },
        ko: "달링 하버 근처 자전거 도로예요, 큰 놀이터 옆이요.",
      },
      {
        speaker: "staff",
        en: { us: "Is the patient conscious and breathing?" },
        ko: "환자가 의식이 있고 호흡을 하고 있나요?",
      },
      {
        speaker: "you",
        en: {
          us: "He's breathing, but his eyes are closed and he's not answering me.",
        },
        ko: "숨은 쉬고 있는데 눈을 감고 있고 제 말에 대답을 안 해요.",
      },
      {
        speaker: "staff",
        en: {
          us: "Okay, help is on the way. Don't move him in case of a neck injury.",
        },
        ko: "알겠습니다, 구급대가 가고 있어요. 목 부상이 있을 수 있으니 환자를 움직이지 마세요.",
      },
      {
        speaker: "you",
        en: { us: "Understood. He's wearing a helmet. Should I take it off?" },
        ko: "알겠어요. 헬멧을 쓰고 있는데 벗겨야 하나요?",
      },
      {
        speaker: "staff",
        en: {
          us: "No, leave the helmet on. The ambulance is about four minutes away.",
        },
        ko: "아니요, 헬멧은 그대로 두세요. 구급차가 4분 정도 뒤에 도착해요.",
      },
      {
        speaker: "you",
        en: {
          us: "Okay, I'll stay right next to him and wave when I see the ambulance.",
        },
        ko: "네, 옆에 계속 있다가 구급차가 보이면 손을 흔들게요.",
      },
    ],
    auNotes: [
      "호주의 응급 번호는 911이 아니라 000(트리플 제로)이에요. 휴대폰에서는 112로도 연결돼요.",
      "응급이 아닌 경찰 신고는 131 444, 건강 상담은 24시간 무료 전화 healthdirect(1800 022 222)를 이용하세요.",
      "구급차는 주에 따라 유료이고 비용이 수백 달러가 나올 수 있어요. 보험에 ambulance cover가 포함되는지 꼭 확인하세요.",
    ],
  },
];
