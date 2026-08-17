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
        explain:
          "last Tuesday라는 명확한 과거 시점이 있으므로 과거시제 submitted를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She ___ in Sydney since January.",
        options: ["lived", "has lived", "lives since", "was living since"],
        answer: 1,
        explain:
          "since January부터 지금까지 계속되는 일이므로 현재완료 has lived를 써요.",
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
        explain:
          "yesterday가 있으면 현재완료를 쓸 수 없어요. 과거시제 saw가 맞아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ you ever ___ a road trip here?",
        options: ["Did / took", "Have / taken", "Have / took", "Did / taken"],
        answer: 1,
        explain:
          "ever(한 번이라도)와 함께 경험을 물으므로 현재완료 Have you ever taken ~?이 맞아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — We ___ each other since we met at the hostel.",
        options: ["knew", "have known", "know", "were knowing"],
        answer: 1,
        explain:
          "만난 시점부터 지금까지 계속 아는 사이이므로 현재완료 have known을 써요.",
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
        en: {
          us: "If I had a car, I would drive along the coast every weekend.",
        },
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
        explain:
          "1식 가정법의 if절에는 현재시제를 써요. if절 안에 will을 넣지 않아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — If I ___ rich, I would buy a house by the beach.",
        options: ["am", "were", "will be", "would be"],
        answer: 1,
        explain:
          "주절에 would가 있는 2식 가정법이므로 if절의 be동사는 were를 써요.",
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
        explain:
          "2식은 if + 과거시제, 주절에 would + 동사원형이에요. 시제 짝을 맞춰야 해요.",
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
        explain:
          "are shared가 올바른 수동태예요. steal의 과거분사는 stolen, clean은 is cleaned가 되어야 해요.",
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
        explain:
          "간접의문문 안에서는 '주어 + 동사'의 평서문 어순으로 돌아가요.",
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
        explain:
          "간접의문문에서는 does가 사라지고 동사에 -s가 붙어 the bus leaves가 돼요.",
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
        explain:
          "Could you possibly ~?는 Can you ~?보다 한층 공손한 요청이에요.",
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
        explain:
          "I wonder 뒤에도 평서문 어순이 와요. does가 사라지고 lives가 돼요.",
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
        explain:
          "we watched의 목적어 역할을 하는 목적격 관계대명사는 생략할 수 있어요. 주격은 생략 불가예요.",
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
        explain:
          "장소 뒤에 완전한 절이 오면 관계부사 where를 써요. which를 쓰려면 which I work at처럼 전치사가 필요해요.",
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
        explain:
          "show up은 '나타나다, 출근하다'라는 뜻이에요. 무단결근을 no-show라고 부르기도 해요.",
      },
      {
        q: "다음 중 '거절하다'를 뜻하는 구동사는?",
        options: ["turn up", "turn on", "turn down", "turn over"],
        answer: 2,
        explain:
          "turn down은 제안이나 요청을 거절한다는 뜻이에요. turn up은 '나타나다'예요.",
      },
    ],
  },
  {
    id: "b1-g07",
    level: "B1",
    title: "화법 — 들은 말 전하기",
    koreanGap:
      "한국어는 '~라고 했어요'만 붙이면 원래 말투가 그대로 살아요. 영어는 전하는 순간 시제를 한 칸 뒤로 밀고, 인칭과 시간 표현까지 바꿔야 해요. 매니저 말을 동료에게 옮기는 상황이 매일 생기는데 여기서 가장 많이 막혀요.",
    explanation: [
      "직접화법을 간접화법으로 바꿀 때는 시제를 한 칸 뒤로 밉니다. is → was, work → worked, will → would, can → could 예요. 'He said, \"I am busy.\"' 는 'He said he was busy.' 가 돼요.",
      "인칭과 시간·장소 표현도 말하는 사람 기준으로 바뀝니다. I → he/she, tomorrow → the next day, here → there, this → that 이에요. 'She said, \"I\\'ll come here tomorrow.\"' 는 'She said she would come there the next day.' 가 되죠.",
      "의문문을 전할 때는 어순이 평서문으로 돌아갑니다. 조동사 do/does/did 는 사라지고 주어가 동사 앞으로 와요. 'Where do you live?' → 'She asked me where I lived.' 예요. 'where did I live' 처럼 의문문 어순을 남기는 게 가장 흔한 실수예요. 의문사가 없으면 if 나 whether 로 잇습니다.",
      "명령·부탁은 to부정사로 바꿉니다. 'Come early.' → 'He told me to come early.', 부정은 to 앞에 not 을 붙여 'He told me not to be late.' 예요. say 는 뒤에 사람이 바로 오지 않고(say to me), tell 은 사람이 바로 온다(tell me)는 차이도 함께 기억하세요.",
    ],
    examples: [
      {
        en: { us: "The manager said the roster would be up on Friday." },
        ko: "매니저가 근무표는 금요일에 올라온다고 했어요.",
      },
      {
        en: { us: "She asked me how long I had been in Melbourne." },
        ko: "그녀가 제게 멜버른에 온 지 얼마나 됐냐고 물었어요.",
      },
      {
        en: { us: "He told me not to park in the loading zone." },
        ko: "그가 저에게 하역 구역에 주차하지 말라고 했어요.",
      },
      {
        en: { us: "They asked if I could start the following Monday." },
        ko: "그쪽에서 다음 주 월요일부터 시작할 수 있느냐고 물었어요.",
      },
    ],
    quiz: [
      {
        q: '직접화법을 간접화법으로 — He said, "I am busy." → He said he ___ busy.',
        options: ["is", "was", "were", "be"],
        answer: 1,
        explain: "전하는 순간 시제를 한 칸 뒤로 밀어요. am → was 가 됩니다.",
      },
      {
        q: '직접화법을 간접화법으로 — "Where do you live?" → She asked me where I ___.',
        options: ["do live", "live", "lived", "did live"],
        answer: 2,
        explain:
          "간접의문문은 평서문 어순이라 do/did 가 사라지고, 시제만 한 칸 뒤로 밀어 lived 가 돼요.",
      },
      {
        q: '직접화법을 간접화법으로 — "Don\'t be late." → The manager told us ___ late.',
        options: ["don't be", "not to be", "to not being", "not being"],
        answer: 1,
        explain: "부정 명령은 to부정사 앞에 not 을 붙여 not to be 로 옮겨요.",
      },
      {
        q: '직접화법을 간접화법으로 — "I\'ll call you tomorrow." → He said he ___ me the next day.',
        options: ["will call", "would call", "called", "would called"],
        answer: 1,
        explain:
          "will 은 would 로 밀리고, would 뒤에는 동사원형이 옵니다. tomorrow 도 the next day 로 바뀌었어요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "She asked me what time was it.",
          "She asked me what time it was.",
          "She asked me what time did it be.",
          "She asked me what time is it.",
        ],
        answer: 1,
        explain:
          "간접의문문은 '의문사 + 주어 + 동사' 순서예요. what time it was 가 맞습니다.",
      },
    ],
  },
  {
    id: "b1-g08",
    level: "B1",
    title: "used to · be used to · get used to",
    koreanGap:
      "셋 다 '익숙'이나 '예전'으로 번역돼서 통째로 헷갈려요. 뒤에 동사원형이 오느냐 -ing 가 오느냐가 갈림길인데, 한국어에는 그 구분이 없어서 감으로 고르게 됩니다.",
    explanation: [
      "used to + 동사원형은 '예전에는 ~했다(지금은 아니다)' 예요. 지금과 다르다는 뜻을 반드시 품습니다. 'I used to work night shifts.' 는 지금은 야간 근무를 안 한다는 말이에요.",
      "be used to + 명사/동명사는 '~에 익숙하다' 는 상태예요. to 가 전치사라서 뒤에 동사가 오면 -ing 를 붙여야 해요. 'I'm used to driving on the left.' 가 맞고 'used to drive on the left' 는 뜻이 완전히 달라집니다.",
      "get used to + 명사/동명사는 '익숙해지다' 는 변화예요. 'It took me a month to get used to the accent.' 처럼 적응해 가는 과정을 말할 때 씁니다. be 가 상태, get 이 과정이라고 묶어 두면 안 헷갈려요.",
      "used to 의 의문·부정에서는 did 가 나오면서 use to 로 돌아갑니다. 'Did you use to work in a cafe?', 'I didn't use to like Vegemite.' 처럼요. did 가 이미 과거를 나타내니 used 를 또 쓰지 않는 거예요.",
    ],
    examples: [
      {
        en: { us: "I used to work night shifts, but now I only do days." },
        ko: "예전에는 야간 근무를 했는데 지금은 주간만 해요.",
      },
      {
        en: { us: "I'm still not used to driving on the left." },
        ko: "아직 좌측 통행 운전이 익숙하지 않아요.",
      },
      {
        en: { us: "It took me a month to get used to the Aussie accent." },
        ko: "호주 억양에 익숙해지는 데 한 달 걸렸어요.",
      },
      {
        en: { us: "Did you use to live in a share house back home?" },
        ko: "한국에서도 셰어하우스에 살았었어요?",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I ___ work night shifts, but now I only do days.",
        options: ["used to", "am used to", "use to", "was used to"],
        answer: 0,
        explain: "지금은 안 하는 과거의 습관이므로 used to + 동사원형이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — I'm still not used to ___ on the left.",
        options: ["drive", "driving", "drove", "to drive"],
        answer: 1,
        explain:
          "be used to 의 to 는 전치사라서 뒤에 동명사 driving 이 옵니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — It took a month to ___ used to the accent.",
        options: ["get", "make", "take", "do"],
        answer: 0,
        explain:
          "익숙해지는 '과정'은 get used to 예요. be used to 는 이미 익숙한 상태입니다.",
      },
      {
        q: "'예전에는 여기 살았다(지금은 아니다)'에 해당하는 문장은?",
        options: [
          "I am used to living here.",
          "I used to live here.",
          "I get used to live here.",
          "I was using to live here.",
        ],
        answer: 1,
        explain:
          "used to + 동사원형이 '예전에는 ~했다' 예요. I am used to living here 는 '여기 사는 게 익숙하다'는 현재 상태입니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — Did you ___ to work in a cafe back home?",
        options: ["used", "use", "using", "be used"],
        answer: 1,
        explain: "did 가 이미 과거를 나타내므로 뒤에는 원형 use to 가 옵니다.",
      },
    ],
  },
  {
    id: "b1-g09",
    level: "B1",
    title: "사역 — 남에게 시켜서 한 일",
    koreanGap:
      "한국어는 '머리를 잘랐다'라고 하면 미용실에서 자른 것도 포함돼요. 영어에서 'I cut my hair.' 는 내가 직접 가위를 든 겁니다. 남이 해 준 일은 have/get + 목적어 + 과거분사로 따로 표시해야 해요.",
    explanation: [
      "have + 목적어 + 과거분사는 '~을 (남을 시켜) 되게 하다' 예요. 'I had my hair cut.' 은 미용실에서 잘랐다는 뜻이고, 'I had my passport renewed.' 는 대사관에서 갱신했다는 뜻이에요.",
      "get + 목적어 + 과거분사도 같은 뜻인데 더 구어적이고, 의도치 않게 당한 일에도 씁니다. 'I got my resume checked.' 는 검토를 받았다는 뜻이고, 'My phone got cracked on the tram.' 처럼 사고에도 써요.",
      "사람에게 직접 시킬 때는 과거분사가 아니라 동사원형이 옵니다. 'The manager had me finish the closing checklist.' 처럼요. have + 사람 + 동사원형, have + 사물 + 과거분사로 나눠 기억하세요.",
      "get 을 사람에게 쓸 때만 to 가 붙습니다. 'I got my roommate to sign the form.' 처럼요. have 는 to 없이(have him sign), get 은 to 를 넣어(get him to sign) — 이 하나만 다릅니다.",
    ],
    examples: [
      {
        en: { us: "I need to have my resume checked before I apply." },
        ko: "지원하기 전에 이력서를 검토받아야 해요.",
      },
      {
        en: { us: "I had my passport renewed at the consulate last week." },
        ko: "지난주에 영사관에서 여권을 갱신했어요.",
      },
      {
        en: { us: "My phone screen got cracked on the tram." },
        ko: "트램에서 휴대폰 액정이 깨졌어요.",
      },
      {
        en: { us: "I got my roommate to sign the inspection form." },
        ko: "룸메이트한테 점검 서류에 서명을 받았어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I need to ___ my resume checked before I apply.",
        options: ["have", "having", "been", "be having"],
        answer: 0,
        explain:
          "to 뒤에는 동사원형이 오고, have + 목적어 + 과거분사로 '검토받다'가 됩니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — I had my passport ___ at the consulate.",
        options: ["renew", "renewed", "renewing", "to renew"],
        answer: 1,
        explain:
          "여권은 남이 갱신해 주는 대상이므로 과거분사 renewed 를 씁니다.",
      },
      {
        q: "'미용실에서 머리를 잘랐다'에 해당하는 문장은?",
        options: [
          "I cut my hair.",
          "I had my hair cut.",
          "I have cut my hair.",
          "I had cut my hair.",
        ],
        answer: 1,
        explain:
          "I cut my hair 는 내가 직접 잘랐다는 뜻이에요. 남이 해 준 일은 had my hair cut 입니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — My phone screen got ___ on the tram.",
        options: ["crack", "cracked", "cracking", "to crack"],
        answer: 1,
        explain: "액정은 깨짐을 당한 쪽이므로 과거분사 cracked 를 씁니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — The manager had me ___ the closing checklist.",
        options: ["to finish", "finish", "finished", "finishing"],
        answer: 1,
        explain:
          "have 뒤에 사람이 오면 동사원형을 씁니다. get 이었다면 got me to finish 가 돼요.",
      },
    ],
  },
  {
    id: "b1-g10",
    level: "B1",
    title: "조동사로 추측하기",
    koreanGap:
      "한국어는 '~인 것 같다' 하나로 확신의 정도를 다 덮어요. 영어는 must(거의 확실) · might(반반) · can't(그럴 리 없다)로 세기를 갈라 쓰고, 이걸 틀리면 확신이 없는데 단정하는 사람처럼 들립니다.",
    explanation: [
      "must be 는 '틀림없이 ~일 것이다' 예요. 근거가 있어서 거의 확신할 때 씁니다. 'The lights are on, so someone must be inside.' 처럼요. '~해야 한다'는 의무의 must 와 형태가 같지만 문맥으로 갈립니다.",
      "can't be 는 must be 의 반대예요. '그럴 리 없다' 는 강한 부정 추측입니다. mustn't 는 '하면 안 된다'는 금지라서 추측에는 쓰지 않아요. 'She can't be at work — I just saw her at the beach.' 가 맞습니다.",
      "might / may / could be 는 '~일 수도 있다' 로 확신이 낮아요. 'He might be stuck in traffic.' 처럼 가능성만 열어 둘 때 씁니다. 세 개의 차이는 크지 않으니 might 하나만 확실히 써도 충분해요.",
      "과거를 추측할 때는 뒤에 have + 과거분사를 붙입니다. 'must have left'(떠난 게 틀림없다), 'might have missed'(놓쳤을 수도 있다), 'can't have seen'(봤을 리 없다) 처럼요. 조동사 자체는 과거형으로 바꾸지 않는다는 게 핵심이에요.",
    ],
    examples: [
      {
        en: { us: "The lights are on, so someone must be inside." },
        ko: "불이 켜져 있으니 안에 누가 있는 게 틀림없어요.",
      },
      {
        en: { us: "She can't be at work — I just saw her at the beach." },
        ko: "그녀가 일하고 있을 리 없어요. 방금 해변에서 봤거든요.",
      },
      {
        en: { us: "He might be stuck in traffic, so let's wait a bit." },
        ko: "차가 막혀서 늦는 걸 수도 있으니 조금만 기다려요.",
      },
      {
        en: { us: "There's no answer. They must have already left." },
        ko: "응답이 없네요. 벌써 나간 게 틀림없어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — The lights are on, so someone ___ be inside.",
        options: ["must", "can't", "shouldn't", "mustn't"],
        answer: 0,
        explain:
          "불이 켜져 있다는 근거로 거의 확신하는 추측이므로 must be 예요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She ___ be at work — I just saw her at the beach.",
        options: ["must", "can't", "should", "has to"],
        answer: 1,
        explain:
          "'그럴 리 없다'는 강한 부정 추측은 can't be 입니다. mustn't 는 금지라서 여기 쓰지 않아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — There's no answer. They ___ have already left.",
        options: ["must", "can", "would", "shall"],
        answer: 0,
        explain: "과거에 대한 강한 추측은 must have + 과거분사예요.",
      },
      {
        q: "'아마 그럴지도 모른다'처럼 확신이 낮은 추측은?",
        options: ["must be", "might be", "can't be", "has to be"],
        answer: 1,
        explain:
          "might be 가 가능성만 열어 두는 표현이에요. must be 와 has to be 는 확신이 높습니다.",
      },
      {
        q: "다음 중 '그럴 리 없다'는 뜻인 문장은?",
        options: [
          "It must be true.",
          "It can't be true.",
          "It should be true.",
          "It might be true.",
        ],
        answer: 1,
        explain:
          "can't be 가 '그럴 리 없다' 예요. must be 는 정반대로 '틀림없이 그렇다' 입니다.",
      },
    ],
  },
  {
    id: "b1-g11",
    level: "B1",
    title: "양보 — although · despite · however",
    koreanGap:
      "셋 다 '~에도 불구하고, 하지만'으로 번역돼서 아무거나 골라 쓰기 쉬워요. 그런데 뒤에 문장이 오는지 명사가 오는지가 정해져 있고, however 는 아예 두 문장을 잇지 못합니다.",
    explanation: [
      "although 와 even though 뒤에는 주어와 동사가 있는 문장이 옵니다. 'Although the pay is low, the hours are flexible.' 처럼요. even though 가 although 보다 조금 더 강조하는 느낌이에요.",
      "despite 와 in spite of 뒤에는 명사나 동명사가 옵니다. 'Despite the rain, we finished the shift.' 가 맞고 'Despite it was raining' 은 틀려요. 문장을 넣고 싶으면 despite the fact that 으로 늘려야 합니다.",
      "despite 에는 of 를 붙이지 않고, in spite 에는 반드시 of 를 붙입니다. despite of 와 in spite 는 둘 다 틀린 형태예요. 이 둘만 뒤집어 외우지 않으면 됩니다.",
      "however 는 접속사가 아니라 부사예요. 두 문장을 이을 수 없고, 마침표나 세미콜론으로 끊은 뒤 문장 앞에 쓰고 쉼표를 찍습니다. 'The room is small. However, it's close to the station.' 처럼요.",
    ],
    examples: [
      {
        en: { us: "Although the pay is low, the hours are flexible." },
        ko: "시급은 낮지만 근무 시간이 유연해요.",
      },
      {
        en: { us: "Despite the rain, we finished the shift outside." },
        ko: "비가 왔는데도 바깥에서 근무를 끝냈어요.",
      },
      {
        en: { us: "She got the job in spite of her limited experience." },
        ko: "경력이 많지 않은데도 그녀는 그 일자리를 얻었어요.",
      },
      {
        en: { us: "The room is small. However, it's close to the station." },
        ko: "방은 좁아요. 하지만 역에서 가깝습니다.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — ___ the pay is low, the hours are flexible.",
        options: ["Despite", "Although", "In spite", "Despite of"],
        answer: 1,
        explain:
          "뒤에 '주어 + 동사' 문장이 왔으므로 접속사 Although 를 씁니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ the rain, we finished the shift outside.",
        options: ["Although", "Even though", "Despite", "Though that"],
        answer: 2,
        explain: "뒤에 명사(the rain)가 왔으므로 전치사 Despite 를 씁니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — She got the job in spite ___ her limited experience.",
        options: ["of", "that", "for", "to"],
        answer: 0,
        explain:
          "in spite 는 항상 of 와 함께 씁니다. 반대로 despite 에는 of 를 붙이지 않아요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "Despite it was cold, we went out.",
          "Although it was cold, we went out.",
          "Despite of the cold, we went out.",
          "Although of the cold, we went out.",
        ],
        answer: 1,
        explain:
          "문장을 이으려면 접속사 Although 가 필요해요. Despite 뒤에는 명사만 옵니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — The room is small. ___, it's close to the station.",
        options: ["Although", "Despite", "However", "Even though"],
        answer: 2,
        explain:
          "앞 문장이 마침표로 끝났으므로 부사 However 를 쓰고 쉼표를 찍습니다. 나머지는 한 문장 안에서 절을 잇는 말이에요.",
      },
    ],
  },
  {
    id: "b1-g12",
    level: "B1",
    title: "관계부사와 전치사 + 관계대명사",
    koreanGap:
      "'내가 일하는 카페'처럼 한국어는 수식어가 앞에서 통째로 붙어요. 영어는 뒤에서 이어 붙이면서 장소·시간·이유에 맞는 연결어를 골라야 하고, 전치사가 남는지 아닌지까지 신경 써야 합니다.",
    explanation: [
      "장소는 where, 시간은 when, 이유는 why 로 잇습니다. 'This is the cafe where I work.', 'Do you remember the day when we arrived?', 'The reason why I moved is the rent.' 처럼요.",
      "관계부사 자리에 which 나 that 을 그냥 넣으면 안 됩니다. 'the cafe which I work' 는 틀리고, which 를 쓰려면 전치사를 살려 'the cafe at which I work' 라고 해야 해요. 즉 where = at/in which 인 셈입니다.",
      "전치사를 앞으로 뺄 수도 있고 뒤에 남길 수도 있어요. 'the agency through which I found the job'(격식) 과 'the agency I found the job through'(구어)는 같은 뜻이에요. 앞으로 뺄 때는 that 을 쓸 수 없고 which/whom 만 옵니다.",
      "사람에게 전치사를 앞으로 뺄 때는 who 가 아니라 whom 이에요. 'the supervisor to whom I sent the email' 이 맞고 'to who' 는 틀립니다. 구어에서는 'the supervisor I sent the email to' 라고 하면 편해요.",
    ],
    examples: [
      {
        en: { us: "This is the cafe where I work on weekends." },
        ko: "여기가 제가 주말에 일하는 카페예요.",
      },
      {
        en: { us: "Do you remember the day when we arrived?" },
        ko: "우리가 도착한 날 기억나요?",
      },
      {
        en: { us: "That's the agency through which I found the job." },
        ko: "저기가 제가 그 일자리를 찾은 에이전시예요.",
      },
      {
        en: { us: "She's the supervisor to whom I sent the email." },
        ko: "그분이 제가 이메일을 보낸 관리자예요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — This is the cafe ___ I work.",
        options: ["which", "that", "where", "what"],
        answer: 2,
        explain:
          "장소를 이을 때는 where 를 씁니다. which 를 쓰려면 at which 처럼 전치사가 필요해요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Do you remember the day ___ we arrived?",
        options: ["where", "when", "which", "who"],
        answer: 1,
        explain:
          "시간을 이을 때는 when 이에요. which 만 쓰면 on which 의 전치사가 빠져 틀립니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — The reason ___ I moved is the rent.",
        options: ["why", "where", "when", "whose"],
        answer: 0,
        explain: "이유를 이을 때는 why 를 씁니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — That's the agency ___ which I found the job.",
        options: ["through", "where", "when", "what"],
        answer: 0,
        explain:
          "'~을 통해서'라는 뜻이므로 through which 예요. 전치사를 앞으로 뺄 때는 which 나 whom 만 올 수 있습니다.",
      },
      {
        q: "빈칸에 알맞은 것은? — She's the supervisor ___ I sent the email.",
        options: ["to who", "to whom", "whom to", "which to"],
        answer: 1,
        explain:
          "사람 앞에 전치사를 뺄 때는 to whom 을 씁니다. to who 는 쓰지 않아요.",
      },
    ],
  },
];
