import type { GrammarLesson } from "@/data/types";

export const GRAMMAR_B1: GrammarLesson[] = [
  {
    id: "b1-g01",
    level: "B1",
    title: "현재완료 vs 과거시제",
    koreanGap:
      "한국어로는 둘 다 '~했다'로 번역되기 때문에 구분이 가장 어려워요. 핵심은 yesterday처럼 '언제'가 명확한 과거 표현이 있으면 과거시제, 현재와 연결(경험·계속·결과)되면 현재완료라는 점이에요.",
    explanation: [
      "과거시제는 '끝난 시점'이 분명한 이야기예요. yesterday, last month, in 2024, two weeks ago처럼 구체적인 과거 시점이 나오면 무조건 과거시제를 써요. 'I worked at a farm last month.'처럼요.",
      "현재완료는 과거의 일이 지금과 연결되어 있을 때 써요. 'I've been here for two months.'는 두 달 전에 와서 지금도 있다는 뜻이고, 'I've lost my key.'는 잃어버려서 지금 곤란하다는 결과까지 담고 있어요.",
      "가장 흔한 실수가 명확한 과거 시점과 현재완료를 섞는 거예요. 'I have seen him yesterday. ×'는 틀리고 'I saw him yesterday.'가 맞아요. yesterday가 나오는 순간 현재완료는 쓸 수 없어요.",
      "워홀 대화에서는 두 시제가 늘 함께 움직여요. 'How long have you been here?'(현재완료)라고 묻고 'I arrived in March.'(과거)로 답하는 식이죠. 질문과 대답의 시제가 달라질 수 있다는 것까지 익히면 B1 레벨이에요.",
    ],
    examples: [
      {
        en: { us: "I've been in Australia for two months now." },
        ko: "저는 이제 호주에 온 지 두 달 됐어요.",
      },
      {
        en: { us: "I worked at a strawberry farm last month." },
        ko: "지난달에는 딸기 농장에서 일했어요.",
      },
      {
        en: { us: "She has already found a second job." },
        ko: "그녀는 벌써 두 번째 일자리를 구했어요.",
      },
      {
        en: { us: "Have you seen my apron? I left it here this morning." },
        ko: "제 앞치마 보셨어요? 오늘 아침에 여기 뒀는데요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I ___ my visa application last Tuesday.",
        options: ["have submitted", "submitted", "submit", "have submit"],
        answer: 1,
        explain: "last Tuesday라는 명확한 과거 시점이 있으므로 과거시제 submitted를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She ___ in Sydney since January.",
        options: ["lived", "has lived", "lives since", "was living since"],
        answer: 1,
        explain: "since January부터 지금까지 계속되는 일이므로 현재완료 has lived를 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I have seen him yesterday.",
          "I saw him yesterday.",
          "I have see him yesterday.",
          "I seen him yesterday.",
        ],
        answer: 1,
        explain: "yesterday가 있으면 현재완료를 쓸 수 없어요. 과거시제 saw가 맞아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ you ever ___ a road trip here?",
        options: ["Did / took", "Have / taken", "Have / took", "Did / taken"],
        answer: 1,
        explain: "ever(한 번이라도)와 함께 경험을 물으므로 현재완료 Have you ever taken ~?이 맞아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — We ___ each other since we met at the hostel.",
        options: ["knew", "have known", "know", "were knowing"],
        answer: 1,
        explain: "만난 시점부터 지금까지 계속 아는 사이이므로 현재완료 have known을 써요.",
      },
    ],
  },
  {
    id: "b1-g02",
    level: "B1",
    title: "가정법 1식·2식",
    koreanGap:
      "1식(if + 현재, will)은 실현 가능한 조건, 2식(if + 과거, would)은 현재 사실과 반대이거나 가능성이 낮은 상상이에요. 한국어 '~라면'은 형태가 하나라서, 시제를 한 칸 뒤로 미는 감각이 낯설어요.",
    explanation: [
      "1식 가정법은 충분히 일어날 수 있는 조건이에요. if절에는 현재시제, 주절에는 will을 써서 'If it rains tomorrow, the farm work will be canceled.'처럼 말해요. if절 안에 will을 넣지 않는 게 포인트예요.",
      "2식 가정법은 지금 사실과 반대이거나 가능성이 희박한 상상이에요. if절에는 과거시제, 주절에는 would를 써요. 'If I had a car, I would drive along the coast.'는 지금 차가 없다는 뜻을 품고 있죠.",
      "2식에서 be동사는 인칭과 관계없이 were를 쓰는 게 표준이에요. 특히 'If I were you, I would ~'(내가 너라면)는 조언할 때 쓰는 최고의 패턴이니 통째로 외워 두세요.",
      "같은 상황도 화자의 태도에 따라 1식과 2식이 갈려요. 'If I get the visa, I'll stay.'는 가능성을 믿는 말이고, 'If I got the visa, I would stay.'는 반쯤 포기한 말이에요. 시제 하나로 뉘앙스가 달라지는 게 가정법의 묘미예요.",
    ],
    examples: [
      {
        en: {
          us: "If it rains tomorrow, the farm work will be canceled.",
          au: "If it rains tomorrow, the farm work will be cancelled.",
        },
        ko: "내일 비가 오면 농장 일이 취소될 거예요.",
      },
      {
        en: { us: "If I get the visa extension, I'll stay another year." },
        ko: "비자 연장이 되면 1년 더 머무를 거예요.",
      },
      {
        en: { us: "If I had a car, I would drive along the coast every weekend." },
        ko: "차가 있다면 주말마다 해안 도로를 달릴 텐데요.",
      },
      {
        en: {
          us: "If I were you, I would ask for a pay raise.",
          au: "If I were you, I would ask for a pay rise.",
        },
        ko: "제가 당신이라면 임금 인상을 요청할 거예요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — If you ___ the last train, you can take a taxi. (1식)",
        options: ["miss", "missed", "will miss", "would miss"],
        answer: 0,
        explain: "1식 가정법의 if절에는 현재시제를 써요. if절 안에 will을 넣지 않아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — If I ___ rich, I would buy a house by the beach.",
        options: ["am", "were", "will be", "would be"],
        answer: 1,
        explain: "주절에 would가 있는 2식 가정법이므로 if절의 be동사는 were를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — If she studies hard, she ___ pass the IELTS test.",
        options: ["would", "will", "did", "were"],
        answer: 1,
        explain: "if절이 현재시제인 1식 가정법이므로 주절에는 will을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — If I ___ you, I would take that job.",
        options: ["am", "was being", "were", "be"],
        answer: 2,
        explain: "'내가 너라면'이라는 2식 가정법 관용 표현으로 were를 써요.",
      },
      {
        q: "다음 중 올바른 2식 가정법 문장은?",
        options: [
          "If I have time, I would travel more.",
          "If I had time, I will travel more.",
          "If I had time, I would travel more.",
          "If I would have time, I traveled more.",
        ],
        answer: 2,
        explain: "2식은 if + 과거시제, 주절에 would + 동사원형이에요. 시제 짝을 맞춰야 해요.",
      },
    ],
    pattern: /\bif\b[^.?!]*\b(will|would|could|might)\b/i,
  },
  {
    id: "b1-g03",
    level: "B1",
    title: "수동태",
    koreanGap:
      "영어는 '누가 했는지'보다 '무엇이 되었는지'를 앞세울 때 수동태를 즐겨 써요. 한국어 피동보다 훨씬 자주 쓰이고, be동사의 시제가 문장 전체의 시제를 결정한다는 점이 포인트예요.",
    explanation: [
      "수동태는 be동사 + 과거분사(p.p.) 형태로, 행동을 당하는 대상을 주어로 세워요. 'The wages are paid every two weeks.'처럼 급여·규정·안내문에서 특히 많이 만나게 돼요.",
      "시제는 be동사가 책임져요. 현재는 is paid, 과거는 was paid, 미래는 will be paid처럼 be동사만 바꾸면 모든 시제의 수동태를 만들 수 있어요.",
      "행위자를 밝히고 싶으면 by를 붙이지만, 누가 했는지 모르거나 중요하지 않으면 생략해요. 'My phone was stolen.'처럼 도난 신고를 할 때 범인을 몰라도 문장이 완성되는 게 수동태의 장점이에요.",
      "일터의 공지문은 수동태 천국이에요. 'Free breakfast is provided.', 'Tips are shared among the staff.' 같은 문장을 읽고 뜻을 바로 파악하는 연습을 해 두면 계약서와 안내문 읽기가 한결 수월해져요.",
    ],
    examples: [
      {
        en: {
          us: "The wages are paid every two weeks.",
          au: "The wages are paid every fortnight.",
        },
        ko: "급여는 2주마다 지급돼요.",
      },
      {
        en: { us: "My phone was stolen at the night market." },
        ko: "야시장에서 제 휴대폰을 도난당했어요.",
      },
      {
        en: { us: "This sharehouse was built in the 1980s." },
        ko: "이 셰어하우스는 1980년대에 지어졌어요.",
      },
      {
        en: { us: "Free breakfast is provided for all staff." },
        ko: "모든 직원에게 무료 아침 식사가 제공돼요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — English ___ in many countries.",
        options: ["speaks", "is spoken", "is speaking", "spoke"],
        answer: 1,
        explain: "영어는 '말해지는' 대상이므로 수동태 is spoken을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — The contract ___ signed yesterday.",
        options: ["is", "was", "has", "did"],
        answer: 1,
        explain: "yesterday가 있는 과거의 수동태이므로 was signed가 돼요.",
      },
      {
        q: "'The manager will post the schedule.'의 수동태는?",
        options: [
          "The schedule will post.",
          "The schedule will be posted.",
          "The schedule will been posted.",
          "The schedule is will posted.",
        ],
        answer: 1,
        explain: "미래 수동태는 will be + 과거분사예요.",
      },
      {
        q: "빈칸에 알맞은 것은? — These glasses ___ by hand.",
        options: ["wash", "are washed", "washing", "washed by"],
        answer: 1,
        explain: "잔은 '씻기는' 대상이므로 수동태 are washed를 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "My bag was stole on the bus.",
          "The room is clean every day by us.",
          "The tips are shared among the staff.",
          "The bill paid was by him.",
        ],
        answer: 2,
        explain: "are shared가 올바른 수동태예요. steal의 과거분사는 stolen, clean은 is cleaned가 되어야 해요.",
      },
    ],
    pattern: /\b(is|are|was|were|been|being|be)\s+\w+(ed|en)\b/i,
  },
  {
    id: "b1-g04",
    level: "B1",
    title: "간접의문문과 공손한 요청",
    koreanGap:
      "직접 물으면 어순이 도치되지만(Where is the bank?), Could you tell me 뒤에 붙이면 평서문 어순(where the bank is)으로 돌아가요. 이 어순 되돌리기가 한국 학습자가 가장 자주 틀리는 부분이에요.",
    explanation: [
      "간접의문문은 질문을 Could you tell me, Do you know 같은 표현 안에 넣어 부드럽게 만드는 방법이에요. 이때 안에 들어간 질문은 '주어 + 동사'의 평서문 어순으로 돌아가요. 'Where is the ATM?'이 'Could you tell me where the ATM is?'가 되는 거죠.",
      "do/does/did는 간접의문문 안에서 사라져요. 'What time does the store close?'는 'Do you know what time the store closes?'가 되고, does가 사라진 자리에서 동사에 -s가 다시 붙는 것까지 챙겨야 해요.",
      "Yes/No 질문을 간접의문문으로 만들 때는 if나 whether로 연결해요. 'Is he coming?'은 'Do you know if he is coming?'이 돼요.",
      "요청도 한 단계씩 공손하게 만들 수 있어요. Can you < Could you < Could you possibly < I was wondering if you could 순서로 부드러워져요. 근무 교대 부탁이나 집주인에게 연락할 때 이 사다리를 기억하면 인상이 확 달라져요.",
    ],
    examples: [
      {
        en: { us: "Could you tell me where the nearest ATM is?" },
        ko: "가장 가까운 ATM이 어디 있는지 알려 주시겠어요?",
      },
      {
        en: {
          us: "Do you know what time the pharmacy closes?",
          au: "Do you know what time the chemist closes?",
        },
        ko: "약국이 몇 시에 닫는지 아세요?",
      },
      {
        en: { us: "I was wondering if I could swap shifts with you." },
        ko: "혹시 저와 근무를 바꿔 주실 수 있을까 해서요.",
      },
      {
        en: { us: "Could you tell me how I can get to the ferry terminal?" },
        ko: "페리 터미널까지 어떻게 가는지 알려 주시겠어요?",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — Could you tell me where ___?",
        options: [
          "is the station",
          "the station is",
          "does the station is",
          "is station the",
        ],
        answer: 1,
        explain: "간접의문문 안에서는 '주어 + 동사'의 평서문 어순으로 돌아가요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Do you know what time ___?",
        options: [
          "the bus leaves",
          "does the bus leave",
          "leaves the bus",
          "the bus does leave",
        ],
        answer: 0,
        explain: "간접의문문에서는 does가 사라지고 동사에 -s가 붙어 the bus leaves가 돼요.",
      },
      {
        q: "'그가 오는지 아세요?'를 영어로 하면?",
        options: [
          "Do you know if he is coming?",
          "Do you know is he coming?",
          "Do you know does he come?",
          "You know he coming if?",
        ],
        answer: 0,
        explain: "Yes/No 질문은 if로 연결하고 평서문 어순을 유지해요.",
      },
      {
        q: "다음 중 가장 공손한 요청은?",
        options: [
          "Open the window.",
          "Can you open the window?",
          "Could you possibly open the window?",
          "You should open the window.",
        ],
        answer: 2,
        explain: "Could you possibly ~?는 Can you ~?보다 한층 공손한 요청이에요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I wonder where does she live.",
          "I wonder where she lives.",
          "I wonder where lives she.",
          "I wonder does she live where.",
        ],
        answer: 1,
        explain: "I wonder 뒤에도 평서문 어순이 와요. does가 사라지고 lives가 돼요.",
      },
    ],
    pattern: /\b(could you tell me|do you know|i was wondering|i wonder)\b/i,
  },
  {
    id: "b1-g05",
    level: "B1",
    title: "관계대명사",
    koreanGap:
      "한국어는 '내가 만난 사람'처럼 수식어가 명사 앞에 오지만, 영어는 the person who I met처럼 명사 뒤에 관계사절이 붙어요. 어순이 정반대라서 문장을 만들 때 머릿속 재배치 연습이 필요해요.",
    explanation: [
      "관계대명사는 두 문장을 하나로 이어 주는 접착제예요. 사람 뒤에는 who, 사물 뒤에는 which를 붙이고, that은 둘 다 대신할 수 있어요. 'The girl who works at the front desk is from Brazil.'처럼 명사 바로 뒤에 설명이 따라와요.",
      "관계사절 안에서 목적어 역할을 하면 생략할 수 있어요. 'The movie (that) we watched was great.'처럼요. 원어민 회화에서는 생략형이 오히려 기본이라 듣기에서도 익숙해져야 해요.",
      "소유를 나타낼 때는 whose를 써요. 'I have a housemate whose bike I sometimes borrow.'처럼 '~의'라는 연결 고리를 만들어 줘요.",
      "관계대명사를 쓰기 시작하면 문장이 확 길어지고 표현력이 늘어요. 방 구하기 글, 자기소개, 후기 작성처럼 긴 문장이 필요한 순간마다 who/which/that을 떠올려 보세요.",
    ],
    examples: [
      {
        en: { us: "The girl who works at the front desk is from Brazil." },
        ko: "프런트에서 일하는 그 여자분은 브라질 출신이에요.",
      },
      {
        en: { us: "I lost the key that opens the storage room." },
        ko: "창고 문을 여는 열쇠를 잃어버렸어요.",
      },
      {
        en: {
          us: "The apartment which we saw yesterday is already taken.",
          au: "The flat which we saw yesterday is already taken.",
        },
        ko: "어제 본 그 아파트는 이미 나갔어요.",
      },
      {
        en: {
          us: "She's the friend I traveled around Tasmania with.",
          au: "She's the friend I travelled around Tasmania with.",
        },
        ko: "그녀는 제가 태즈메이니아를 같이 여행한 친구예요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — The man ___ hired me is the head chef.",
        options: ["which", "who", "whose", "what"],
        answer: 1,
        explain: "사람(The man)을 설명하므로 who를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — This is the bus ___ goes to the city.",
        options: ["who", "which", "whose", "whom"],
        answer: 1,
        explain: "사물(the bus)을 설명하므로 which를 써요. that도 가능해요.",
      },
      {
        q: "빈칸에 알맞은 것은? — I have a housemate ___ bike I sometimes borrow.",
        options: ["who", "which", "whose", "that"],
        answer: 2,
        explain: "'하우스메이트의 자전거'라는 소유 관계이므로 whose를 써요.",
      },
      {
        q: "다음 중 관계대명사를 생략할 수 있는 문장은?",
        options: [
          "The man who lives next door is loud.",
          "The book that is on the desk is mine.",
          "The movie that we watched was great.",
          "The dog which barks at night is his.",
        ],
        answer: 2,
        explain: "we watched의 목적어 역할을 하는 목적격 관계대명사는 생략할 수 있어요. 주격은 생략 불가예요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "The cafe which I work is busy.",
          "The cafe where I work is busy.",
          "The cafe who I work is busy.",
          "The cafe whose I work is busy.",
        ],
        answer: 1,
        explain: "장소 뒤에 완전한 절이 오면 관계부사 where를 써요. which를 쓰려면 which I work at처럼 전치사가 필요해요.",
      },
    ],
  },
  {
    id: "b1-g06",
    level: "B1",
    title: "필수 구동사(phrasal verbs)",
    koreanGap:
      "fill out, pick up처럼 동사+전치사 조합이 완전히 새로운 뜻이 되는 구동사는 단어를 각각 알아도 의미를 짐작하기 어려워요. 워홀 생활에서 매일 만나는 핵심 구동사를 통문장으로 외우는 게 지름길이에요.",
    explanation: [
      "구동사는 동사에 부사나 전치사가 붙어 새로운 뜻이 되는 표현이에요. fill(채우다) + out이 '양식을 작성하다'가 되는 것처럼, 조합 전체를 하나의 단어처럼 외워야 해요.",
      "행정·구직 필수 구동사부터 챙기세요. fill out(작성하다), hand in(제출하다), pick up(찾아오다/맡다), drop off(갖다주다), check in/out(체크인/아웃), show up(나타나다)은 서류와 일터에서 매일 만나는 조합이에요.",
      "생활 필수 구동사도 있어요. run out of(다 떨어지다), look for(찾다), figure out(알아내다), turn down(거절하다)까지 익히면 웬만한 일상 대화가 커버돼요.",
      "분리 가능 여부도 알아 두면 좋아요. pick up은 pick it up처럼 목적어가 사이에 들어갈 수 있지만, look for는 look for it처럼 항상 붙여 써요. 대명사 목적어는 반드시 사이에 넣는다(pick it up ○, pick up it ×)는 것만 기억해도 실수가 줄어요.",
    ],
    examples: [
      {
        en: {
          us: "Please fill out this form and hand it in at the counter.",
          au: "Please fill in this form and hand it in at the counter.",
        },
        ko: "이 양식을 작성해서 카운터에 제출해 주세요.",
      },
      {
        en: { us: "Can you pick up an extra shift on Sunday?" },
        ko: "일요일에 추가 근무 하나 맡아 줄 수 있어요?",
      },
      {
        en: { us: "We've run out of oat milk, so I'll order more." },
        ko: "귀리 우유가 다 떨어져서 더 주문할게요.",
      },
      {
        en: { us: "I'm still looking for a room closer to work." },
        ko: "아직 직장에서 더 가까운 방을 찾고 있어요.",
      },
    ],
    quiz: [
      {
        q: "'양식을 작성하다'에 해당하는 구동사는?",
        options: ["fill off", "fill out", "fill away", "fill down"],
        answer: 1,
        explain: "미국식으로 fill out, 영국·호주식으로는 fill in이라고 해요.",
      },
      {
        q: "빈칸에 알맞은 것은? — We've ___ out of napkins.",
        options: ["run", "given", "looked", "put"],
        answer: 0,
        explain: "run out of는 '다 떨어지다'라는 뜻의 구동사예요.",
      },
      {
        q: "'호텔에서 체크인하다'는?",
        options: ["check up", "check in", "check on", "check over"],
        answer: 1,
        explain: "숙소 도착 절차는 check in, 떠날 때는 check out이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — He didn't ___ up for his shift yesterday. (나타나다)",
        options: ["stand", "look", "show", "grow"],
        answer: 2,
        explain: "show up은 '나타나다, 출근하다'라는 뜻이에요. 무단결근을 no-show라고 부르기도 해요.",
      },
      {
        q: "다음 중 '거절하다'를 뜻하는 구동사는?",
        options: ["turn up", "turn on", "turn down", "turn over"],
        answer: 2,
        explain: "turn down은 제안이나 요청을 거절한다는 뜻이에요. turn up은 '나타나다'예요.",
      },
    ],
  },
];
