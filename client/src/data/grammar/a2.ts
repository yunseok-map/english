import type { GrammarLesson } from "@/data/types";

export const GRAMMAR_A2: GrammarLesson[] = [
  {
    id: "a2-g01",
    level: "A2",
    title: "과거시제 규칙·불규칙",
    koreanGap:
      "규칙 동사는 -ed만 붙이면 되지만 go→went, buy→bought 같은 불규칙 동사는 통째로 외워야 해요. 의문문과 부정문에서 did를 쓰면 동사가 원형으로 돌아간다는 점(Did you went ×)이 특히 헷갈려요.",
    explanation: [
      "이미 끝난 과거의 일은 동사를 과거형으로 바꿔 말해요. 규칙 동사는 -ed를 붙여서 worked, moved처럼 만들고, yesterday, last week, two days ago 같은 시간 표현과 자주 짝을 이뤄요.",
      "자주 쓰는 동사일수록 불규칙이에요. go→went, buy→bought, have→had, get→got, take→took은 워홀 생활에서 매일 만나는 단어들이니 먼저 외워 두세요.",
      "의문문은 Did + 주어 + 동사원형, 부정문은 didn't + 동사원형이에요. did가 과거의 표시를 가져가기 때문에 'Did you went ~?'가 아니라 'Did you go ~?'가 맞아요.",
      "하루 일과를 과거형으로 말하는 연습이 효과적이에요. 'I finished my shift at five and cooked dinner at home.'처럼 자신의 하루를 두세 문장으로 정리해 보세요.",
    ],
    examples: [
      {
        en: { us: "I moved to Brisbane two weeks ago." },
        ko: "저는 2주 전에 브리즈번으로 이사했어요.",
      },
      {
        en: { us: "She bought a secondhand bike for fifty dollars." },
        ko: "그녀는 중고 자전거를 50달러에 샀어요.",
      },
      {
        en: { us: "We didn't get paid last Friday because of a bank error." },
        ko: "은행 오류 때문에 지난 금요일에 급여를 못 받았어요.",
      },
      {
        en: { us: "Did you lock the storage room last night?" },
        ko: "어젯밤에 창고 문 잠갔어요?",
      },
    ],
    quiz: [
      {
        q: "'go'의 과거형은?",
        options: ["goed", "gone", "went", "goes"],
        answer: 2,
        explain: "go의 과거형은 불규칙 변화인 went예요. gone은 과거분사예요.",
      },
      {
        q: "빈칸에 알맞은 것은? — I ___ my wallet on the bus yesterday.",
        options: ["lose", "losed", "lost", "have lose"],
        answer: 2,
        explain:
          "yesterday가 있으므로 과거형 lost를 써요. lose는 불규칙 동사예요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "Did you went to the bank?",
          "I didn't saw the manager.",
          "She teached me the recipe.",
          "He paid the rent on time.",
        ],
        answer: 3,
        explain:
          "pay의 과거형 paid가 맞아요. did/didn't 뒤에는 동사원형, teach의 과거형은 taught예요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ they finish the night shift?",
        options: ["Do", "Did", "Does", "Were"],
        answer: 1,
        explain: "과거의 일을 묻는 의문문이므로 Did를 써요.",
      },
      {
        q: "'buy'의 과거형은?",
        options: ["buyed", "bought", "brought", "buys"],
        answer: 1,
        explain:
          "buy의 과거형은 bought예요. brought는 bring의 과거형이니 헷갈리지 마세요.",
      },
    ],
  },
  {
    id: "a2-g02",
    level: "A2",
    title: "will과 be going to",
    koreanGap:
      "둘 다 '~할 거예요'로 번역되지만, 미리 세운 계획은 be going to, 말하는 순간 결정한 일이나 단순 예측은 will을 주로 써요. 한국어에는 이 구분이 없어서 어색하게 섞어 쓰기 쉬워요.",
    explanation: [
      "will은 말하는 순간 즉석에서 결정한 일, 제안이나 약속, 근거 없는 예측에 써요. 'I'll cover your shift.'처럼 그 자리에서 돕겠다고 할 때 딱이에요.",
      "be going to는 이미 마음먹은 계획이나 눈앞의 근거가 있는 예측에 써요. 'I'm going to visit Melbourne next week.'는 표까지 알아본 계획이라는 뉘앙스가 있어요.",
      "하늘에 먹구름이 가득할 때는 'It's going to rain.'이 자연스러워요. 눈에 보이는 근거로 하는 예측이기 때문이에요.",
      "둘 다 뒤에는 동사원형이 와요. will 뒤에 to를 붙이거나(will to go ×) be going to에서 be동사를 빠뜨리는(I going to ×) 실수만 조심하면 돼요.",
    ],
    examples: [
      {
        en: { us: "I'm going to visit Melbourne during my week off." },
        ko: "쉬는 주에 멜버른에 갈 계획이에요.",
      },
      {
        en: { us: "Don't worry, I'll cover your shift tomorrow." },
        ko: "걱정 마세요, 내일 제가 대신 근무할게요.",
      },
      {
        en: { us: "Look at those clouds. It's going to rain soon." },
        ko: "저 구름 좀 봐요. 곧 비가 올 것 같아요.",
      },
      {
        en: { us: "The landlord will send the contract by email tonight." },
        ko: "집주인이 오늘 밤 이메일로 계약서를 보낼 거예요.",
      },
    ],
    quiz: [
      {
        q: "말하는 순간 즉석에서 결정한 일에 어울리는 것은? — The phone is ringing. I ___ get it.",
        options: ["am going to", "will", "was going to", "would to"],
        answer: 1,
        explain: "그 자리에서 바로 결정한 일에는 will을 써요.",
      },
      {
        q: "이미 세운 계획을 말할 때 자연스러운 문장은?",
        options: [
          "I will to move out next month.",
          "I'm going to move out next month.",
          "I go to move out next month.",
          "I'm will move out next month.",
        ],
        answer: 1,
        explain:
          "미리 정한 계획에는 be going to가 자연스러워요. will 뒤에 to는 붙지 않아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She ___ start her new job on Monday. (확정된 계획)",
        options: ["is going to", "will to", "going to", "is go to"],
        answer: 0,
        explain:
          "확정된 계획이므로 is going to를 써요. be동사를 빠뜨리면 안 돼요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "It will rains tomorrow.",
          "He wills call you back.",
          "I'll help you with those bags.",
          "They are going to went home.",
        ],
        answer: 2,
        explain:
          "will 뒤에는 동사원형이 와요. I'll help가 맞고, will rains나 going to went는 틀려요.",
      },
      {
        q: "빈칸에 알맞은 것은? — We're out of milk. I ___ buy some on my way home. (즉석 결정)",
        options: ["am going to", "will", "did", "would have"],
        answer: 1,
        explain: "우유가 없다는 걸 방금 알고 결정한 일이므로 will을 써요.",
      },
    ],
    pattern: /\b(will|won't|going to)\b/i,
  },
  {
    id: "a2-g03",
    level: "A2",
    title: "현재완료 입문",
    koreanGap:
      "한국어에는 현재완료라는 시제가 없어서 '~한 적 있다', '벌써 ~했다', '~해 왔다'가 모두 have + 과거분사 하나로 표현된다는 게 낯설어요. 여기서는 형태와 대표 쓰임 세 가지부터 확실히 잡아요.",
    explanation: [
      "현재완료는 have/has + 과거분사(p.p.) 형태예요. 주어가 he/she/it이면 has를 쓰고, 과거분사는 eaten, been, done처럼 불규칙형이 많아서 동사 3단 변화를 함께 외워야 해요.",
      "첫 번째 쓰임은 경험이에요. 'Have you ever worked in a kitchen?'처럼 ever(한 번이라도), never(한 번도 안)와 짝을 이뤄 '~해 본 적 있어요?'를 표현해요.",
      "두 번째는 완료예요. just(방금), already(벌써), yet(아직)과 함께 써서 'She has just finished her shift.'처럼 지금 막 끝난 일을 전해요.",
      "세 번째는 계속이에요. for + 기간, since + 시작 시점과 함께 'We have lived here for three months.'처럼 과거부터 지금까지 이어지는 일을 말해요. 워홀 생활 소개에 정말 자주 쓰는 패턴이에요.",
    ],
    examples: [
      {
        en: { us: "I have never tried Vegemite before." },
        ko: "저는 베지마이트를 한 번도 먹어 본 적이 없어요.",
      },
      {
        en: { us: "She has just finished her shift." },
        ko: "그녀는 방금 근무를 끝냈어요.",
      },
      {
        en: { us: "We have lived in this sharehouse for three months." },
        ko: "우리는 이 셰어하우스에서 세 달째 살고 있어요.",
      },
      {
        en: { us: "Have you ever worked in a kitchen before?" },
        ko: "전에 주방에서 일해 본 적 있어요?",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I ___ already sent my resume.",
        options: ["have", "has", "had to", "am"],
        answer: 0,
        explain: "주어가 I이므로 have + 과거분사(sent)를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — He ___ been to New Zealand twice.",
        options: ["have", "has", "is", "was to"],
        answer: 1,
        explain:
          "3인칭 단수 he에는 has를 써요. has been to는 '가 본 적 있다'는 경험이에요.",
      },
      {
        q: "'eat'의 과거분사(p.p.)는?",
        options: ["ate", "eaten", "eated", "eats"],
        answer: 1,
        explain:
          "eat의 3단 변화는 eat-ate-eaten이에요. 현재완료에는 eaten을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ you finished the report yet?",
        options: ["Do", "Did", "Have", "Are"],
        answer: 2,
        explain:
          "finished(과거분사)와 yet이 있으므로 현재완료 의문문 Have you ~?가 맞아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — We have known each other ___ last summer.",
        options: ["for", "since", "during", "from at"],
        answer: 1,
        explain: "시작 시점(last summer) 앞에는 since, 기간 앞에는 for를 써요.",
      },
    ],
    pattern: /\b(have|has)\s+\w+(ed|en)\b/i,
  },
  {
    id: "a2-g04",
    level: "A2",
    title: "비교급과 최상급",
    koreanGap:
      "한국어는 '더', '가장'만 붙이면 되지만 영어는 단어 길이에 따라 -er/-est를 붙이거나 more/most를 앞에 놓아요. good-better-best 같은 불규칙 변화와 비교 대상 앞의 than을 빼먹는 실수도 잦아요.",
    explanation: [
      "짧은 형용사(1음절)는 -er/-est를 붙여요. cheap→cheaper→cheapest처럼요. big처럼 짧은 모음+자음으로 끝나면 자음을 겹쳐 bigger, busy처럼 y로 끝나면 busier가 돼요.",
      "긴 형용사(대체로 2음절 이상)는 앞에 more/most를 놓아요. expensive→more expensive→most expensive처럼요. -er과 more를 같이 쓰면(more cheaper ×) 안 돼요.",
      "비교 대상은 than으로 연결해요. 'This room is cheaper than that one.'처럼요. 최상급 앞에는 보통 the를 붙여서 'the best coffee in town'이라고 해요.",
      "good→better→best, bad→worse→worst는 불규칙이라 통째로 외워야 해요. 방 구하기, 일자리 비교, 가격 흥정까지 워홀 생활은 비교의 연속이니 이 패턴은 투자할 가치가 충분해요.",
    ],
    examples: [
      {
        en: {
          us: "This room is cheaper than the one downtown.",
          au: "This room is cheaper than the one in the city centre.",
        },
        ko: "이 방이 시내에 있는 방보다 더 저렴해요.",
      },
      {
        en: { us: "The morning shift is busier than the afternoon one." },
        ko: "아침 근무가 오후 근무보다 더 바빠요.",
      },
      {
        en: { us: "This is the best coffee I've had in this city." },
        ko: "이 커피는 이 도시에서 마셔 본 것 중 최고예요.",
      },
      {
        en: {
          us: "Renting a bike is more convenient than taking the bus here.",
        },
        ko: "여기서는 자전거를 빌리는 게 버스를 타는 것보다 더 편리해요.",
      },
    ],
    quiz: [
      {
        q: "'big'의 비교급은?",
        options: ["biger", "bigger", "more big", "biggest"],
        answer: 1,
        explain: "big은 자음 g를 겹쳐 bigger가 돼요.",
      },
      {
        q: "빈칸에 알맞은 것은? — This laptop is ___ than mine.",
        options: [
          "expensiver",
          "more expensive",
          "most expensive",
          "expensive",
        ],
        answer: 1,
        explain:
          "expensive처럼 긴 형용사는 more를 앞에 붙여 비교급을 만들어요.",
      },
      {
        q: "'good'의 최상급은?",
        options: ["goodest", "best", "most good", "better"],
        answer: 1,
        explain: "good은 불규칙 변화로 good-better-best예요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Today is ___ day of the summer so far.",
        options: ["hotter", "the hottest", "most hot", "hot"],
        answer: 1,
        explain: "'가장 더운 날'이라는 최상급이고, 최상급 앞에는 the를 붙여요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "My new job is better than my old one.",
          "This street is more busy than that one.",
          "He is taller that his brother.",
          "It was the most cheap option.",
        ],
        answer: 0,
        explain:
          "good의 비교급 better + than이 맞아요. busy는 busier, 비교에는 that이 아니라 than, cheap은 cheapest예요.",
      },
    ],
  },
  {
    id: "a2-g05",
    level: "A2",
    title: "빈도부사",
    koreanGap:
      "always, usually, often, sometimes, never 같은 빈도부사는 be동사 뒤, 일반동사 앞이라는 위치 규칙이 있어요. 한국어는 부사 위치가 자유로워서 이 어순 규칙이 낯설게 느껴져요.",
    explanation: [
      "빈도부사는 얼마나 자주 하는지를 나타내요. 빈도가 높은 순서로 always(항상) > usually(보통) > often(자주) > sometimes(가끔) > rarely(거의 안) > never(전혀 안)로 정리할 수 있어요.",
      "위치가 핵심이에요. 일반동사 앞에 놓아서 'I usually take the 7:30 train.'이라고 하고, be동사 뒤에 놓아서 'She is always friendly.'라고 해요.",
      "never는 그 자체가 부정이라서 don't와 함께 쓰지 않아요. 'I don't never eat ×'가 아니라 'I never eat ~'이 맞아요.",
      "빈도를 물을 때는 How often을 써요. 'How often do you work out?'처럼요. 대답은 'Twice a week.'처럼 횟수 + a week/month로 하면 자연스러워요.",
    ],
    examples: [
      {
        en: { us: "I usually take the 7:30 train to work." },
        ko: "저는 보통 7시 30분 기차를 타고 출근해요.",
      },
      {
        en: { us: "She is always friendly to customers." },
        ko: "그녀는 손님들에게 항상 친절해요.",
      },
      {
        en: { us: "We sometimes have a barbecue in the backyard." },
        ko: "우리는 가끔 뒷마당에서 바비큐를 해요.",
      },
      {
        en: { us: "He never checks the schedule, so he misses shifts." },
        ko: "그는 일정을 전혀 확인하지 않아서 근무를 놓치곤 해요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I ___ go to the gym after work. (보통)",
        options: ["usually", "am usually", "usual", "usually am"],
        answer: 0,
        explain: "일반동사 go 앞에는 빈도부사만 놓아요. be동사는 필요 없어요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "She always is late.",
          "She is always late.",
          "Always she is late.",
          "She is late always usually.",
        ],
        answer: 1,
        explain: "빈도부사는 be동사 뒤에 와요. She is always late가 맞아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — He ___ eats breakfast. He just drinks coffee. (전혀 ~않다)",
        options: ["always", "often", "never", "sometimes"],
        answer: 2,
        explain:
          "'전혀 먹지 않는다'는 뜻이므로 never를 써요. never 자체가 부정이라 don't는 필요 없어요.",
      },
      {
        q: "'얼마나 자주 ~해요?'라고 물을 때 쓰는 표현은?",
        options: ["How long", "How often", "How much", "How far"],
        answer: 1,
        explain: "빈도를 묻는 표현은 How often이에요.",
      },
      {
        q: "다음 중 빈도가 가장 높은 부사는?",
        options: ["sometimes", "often", "always", "rarely"],
        answer: 2,
        explain:
          "always(항상)가 빈도가 가장 높아요. always > often > sometimes > rarely 순서예요.",
      },
    ],
  },
  {
    id: "a2-g06",
    level: "A2",
    title: "would like 표현",
    koreanGap:
      "want보다 공손한 would like는 주문과 요청의 기본 표현이에요. 한국어 존댓말 감각으로는 want와 차이가 안 느껴지지만, 가게나 관공서에서는 I'd like가 훨씬 부드럽고 자연스러워요.",
    explanation: [
      "would like는 want의 공손한 버전이에요. 뒤에 명사가 오면 'I'd like a coffee.', 동사가 오면 to를 붙여 'I'd like to open an account.'라고 해요.",
      "회화에서는 I would를 I'd로 줄여 쓰는 게 기본이에요. 발음도 '아이드'로 가볍게 이어지니 통째로 연습해 두세요.",
      "상대에게 권할 때는 Would you like ~?를 써요. 'Would you like a receipt?'는 계산대에서 일하면 하루에 수십 번 쓰게 되는 문장이에요.",
      "카페에서 'I want a latte.'라고 해도 뜻은 통하지만 다소 직설적으로 들려요. 주문, 예약, 은행 업무처럼 격식이 필요한 자리에서는 I'd like로 시작하는 습관을 들이세요.",
    ],
    examples: [
      {
        en: {
          us: "I'd like a large iced latte to go, please.",
          au: "I'd like a large iced latte to take away, please.",
        },
        ko: "큰 사이즈 아이스 라테 테이크아웃으로 주세요.",
      },
      {
        en: { us: "Would you like a receipt?" },
        ko: "영수증 드릴까요?",
      },
      {
        en: { us: "I'd like to open a savings account." },
        ko: "예금 계좌를 개설하고 싶어요.",
      },
      {
        en: { us: "We'd like a table for two by the window." },
        ko: "창가 쪽 2인 테이블로 부탁드려요.",
      },
    ],
    quiz: [
      {
        q: "카페에서 주문할 때 가장 공손한 표현은?",
        options: [
          "Give me a flat white.",
          "I'd like a flat white, please.",
          "Flat white. Now.",
          "You make flat white.",
        ],
        answer: 1,
        explain: "I'd like ~, please.가 주문의 기본 공손 표현이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — I'd like ___ book a room for two nights.",
        options: ["to", "for", "at", "booking"],
        answer: 0,
        explain: "would like 뒤에 동사가 올 때는 to부정사를 써요.",
      },
      {
        q: "'I'd like'는 무엇의 축약형일까요?",
        options: ["I did like", "I would like", "I had like", "I should like"],
        answer: 1,
        explain: "I'd like는 I would like의 축약형이에요.",
      },
      {
        q: "손님에게 권유할 때 알맞은 표현은?",
        options: [
          "Do you want like a bag?",
          "Would you like a bag?",
          "Are you like a bag?",
          "Will you like a bag?",
        ],
        answer: 1,
        explain: "권유는 Would you like ~?로 표현해요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "She'd like trying the cake.",
          "I'd like to pay by card.",
          "We'd like that go now.",
          "He'd likes a coffee.",
        ],
        answer: 1,
        explain:
          "would like 뒤에 동사가 오면 to부정사(to pay)를 써요. -ing형이나 likes는 틀려요.",
      },
    ],
    pattern: /\bwould\s+(you\s+)?like\b|'d\s+like\b/i,
  },
  {
    id: "a2-g07",
    level: "A2",
    title: "have to·must",
    koreanGap:
      "둘 다 '~해야 한다'지만 일상 회화에서는 have to를 훨씬 많이 써요. 특히 부정형에서 must not(하면 안 됨)과 don't have to(안 해도 됨)의 의미가 완전히 달라지는 점을 꼭 구분해야 해요.",
    explanation: [
      "have to는 일상적인 의무를 말할 때 가장 자연스러운 표현이에요. 'I have to renew my visa.'처럼 규칙이나 상황 때문에 해야 하는 일에 써요. 주어가 he/she/it이면 has to가 돼요.",
      "must는 더 강하고 격식 있는 느낌이라 규정, 안내문, 경고에 자주 등장해요. 'Staff must wash their hands.' 같은 문구를 주방이나 사업장 벽에서 흔히 보게 될 거예요.",
      "부정형이 진짜 함정이에요. must not(mustn't)은 '하면 안 된다'는 금지이고, don't have to는 '안 해도 된다'는 불필요예요. 뜻이 정반대이니 꼭 구분하세요.",
      "과거형은 had to 하나로 통일돼요. must에는 과거형이 없어서 'I had to wait an hour.'처럼 had to를 빌려 써요.",
    ],
    examples: [
      {
        en: { us: "I have to renew my visa by the end of March." },
        ko: "3월 말까지 비자를 갱신해야 해요.",
      },
      {
        en: { us: "Staff must wash their hands before handling food." },
        ko: "직원은 음식을 만지기 전에 손을 씻어야 합니다.",
      },
      {
        en: { us: "You don't have to tip here; it's optional." },
        ko: "여기서는 팁을 안 줘도 돼요. 선택 사항이에요.",
      },
      {
        en: { us: "We had to wait an hour at the immigration office." },
        ko: "우리는 출입국 사무소에서 한 시간을 기다려야 했어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I ___ work this Saturday. My manager put me on the schedule.",
        options: ["have to", "don't have to", "must not", "would to"],
        answer: 0,
        explain: "일정 때문에 해야 하는 일상적 의무이므로 have to를 써요.",
      },
      {
        q: "'여기서 담배를 피우면 안 됩니다'(금지)에 알맞은 것은?",
        options: [
          "You don't have to smoke here.",
          "You must not smoke here.",
          "You have to smoke here.",
          "You would not smoke here.",
        ],
        answer: 1,
        explain:
          "금지는 must not으로 표현해요. don't have to는 '안 해도 된다'는 뜻이에요.",
      },
      {
        q: "'안 해도 돼요'(불필요)를 뜻하는 것은?",
        options: ["must not", "don't have to", "have to", "should to"],
        answer: 1,
        explain:
          "don't have to는 의무가 없다는 뜻이에요. must not(금지)과 정반대이니 주의하세요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She ___ to leave early yesterday. (과거)",
        options: ["must", "had", "musted", "has"],
        answer: 1,
        explain: "must에는 과거형이 없어서 had to를 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "He have to go now.",
          "He must goes now.",
          "He has to go now.",
          "He must to go now.",
        ],
        answer: 2,
        explain:
          "3인칭 단수는 has to를 써요. must 뒤에는 to 없이 동사원형이 와요.",
      },
    ],
    pattern: /\b(have to|has to|had to|must)\b/i,
  },
  {
    id: "a2-g08",
    level: "A2",
    title: "동명사와 부정사",
    koreanGap:
      "enjoy 뒤에는 -ing, want 뒤에는 to부정사처럼 동사마다 짝이 정해져 있어요. 한국어 '~하기/~하는 것'은 형태가 하나라서 이 구분을 동사별로 통째로 외워야 해요.",
    explanation: [
      "동사를 명사처럼 쓰는 방법이 두 가지예요. 동명사(-ing)와 to부정사(to + 동사원형)인데, 앞에 오는 동사가 어느 쪽을 데려오는지 정해져 있어요.",
      "동명사만 데려오는 동사에는 enjoy, finish, keep, mind가 있어요. 'I enjoy meeting people.', 'Do you mind closing the window?'처럼요.",
      "to부정사만 데려오는 동사에는 want, need, decide, plan, hope가 있어요. 'She decided to extend her stay.', 'I need to transfer money.'처럼 미래를 향한 의미의 동사가 많아요.",
      "like, love, start는 둘 다 가능하고 뜻 차이도 거의 없어요. 헷갈릴 때는 예문을 통째로 외우는 게 가장 확실한 방법이에요.",
    ],
    examples: [
      {
        en: { us: "I enjoy meeting people from different countries." },
        ko: "저는 여러 나라에서 온 사람들을 만나는 걸 즐겨요.",
      },
      {
        en: { us: "She decided to extend her stay for another year." },
        ko: "그녀는 체류를 1년 더 연장하기로 결정했어요.",
      },
      {
        en: { us: "Do you mind closing the window?" },
        ko: "창문 좀 닫아 주시겠어요?",
      },
      {
        en: { us: "I need to transfer money to my Korean account." },
        ko: "한국 계좌로 돈을 송금해야 해요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I enjoy ___ at the beach on my days off.",
        options: ["surf", "to surf", "surfing", "surfed"],
        answer: 2,
        explain: "enjoy는 동명사(-ing)를 데려오는 동사예요.",
      },
      {
        q: "빈칸에 알맞은 것은? — He wants ___ a second job.",
        options: ["find", "to find", "finding", "found"],
        answer: 1,
        explain: "want는 to부정사를 데려오는 동사예요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Would you mind ___ me a hand?",
        options: ["give", "to give", "giving", "gave"],
        answer: 2,
        explain:
          "mind 뒤에는 동명사(-ing)가 와요. Would you mind -ing?는 공손한 부탁 표현이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — They decided ___ closer to work.",
        options: ["move", "to move", "moving", "moved"],
        answer: 1,
        explain: "decide는 to부정사를 데려오는 동사예요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I finished to clean the tables.",
          "Keep to stir the sauce.",
          "She hopes getting a promotion.",
          "He kept talking during the break.",
        ],
        answer: 3,
        explain:
          "keep은 동명사를 데려와서 kept talking이 맞아요. finish도 -ing, hope는 to부정사를 써요.",
      },
    ],
  },
  {
    id: "a2-g09",
    level: "A2",
    title: "접속사 because·so·but",
    koreanGap:
      "because는 이유, so는 결과를 이끄는데 한국어 '~해서'가 둘 다 커버해서 방향이 뒤집히기 쉬워요. 'Because I was tired, so I slept.'처럼 because와 so를 한 문장에 같이 쓰는 한국식 실수도 조심해야 해요.",
    explanation: [
      "because 뒤에는 이유가 와요. 'I took the job because the pay was good.'처럼 결과를 먼저 말하고 because로 이유를 붙이는 순서가 회화에서 가장 자연스러워요.",
      "so 뒤에는 결과가 와요. 'It was raining, so we stayed home.'처럼 원인을 먼저 말하고 so로 결과를 잇는 흐름이에요. because와 방향이 반대라고 기억하면 쉬워요.",
      "but은 반대되는 내용을 이어요. 'The room is small but clean.'처럼 단점과 장점을 함께 말할 때 유용해요. 방 구하기 후기나 일자리 얘기에서 정말 자주 쓰게 돼요.",
      "한국어 '~해서 그래서' 습관 때문에 because와 so를 한 문장에 겹쳐 쓰기 쉬운데, 영어에서는 둘 중 하나만 써야 해요. 'Because I was tired, I slept.' 또는 'I was tired, so I slept.' 두 형태만 기억하세요.",
    ],
    examples: [
      {
        en: { us: "I took the job because the pay was good." },
        ko: "급여가 좋아서 그 일을 맡았어요.",
      },
      {
        en: {
          us: "It was raining, so we canceled the beach trip.",
          au: "It was raining, so we cancelled the beach trip.",
        },
        ko: "비가 와서 해변 여행을 취소했어요.",
      },
      {
        en: { us: "The room is small but really clean." },
        ko: "그 방은 작지만 정말 깨끗해요.",
      },
      {
        en: { us: "My shift ended late, so I missed the last bus." },
        ko: "근무가 늦게 끝나서 막차를 놓쳤어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I stayed home ___ I was sick.",
        options: ["so", "because", "but", "or"],
        answer: 1,
        explain: "뒤에 이유(아팠다)가 오므로 because를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — The cafe was full, ___ we went to another one.",
        options: ["because", "but", "so", "if"],
        answer: 2,
        explain: "뒤에 결과(다른 곳으로 갔다)가 오므로 so를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — The job is hard, ___ the tips are great.",
        options: ["so", "because", "but", "or"],
        answer: 2,
        explain: "앞뒤가 반대되는 내용이므로 but을 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "Because I was tired, so I went to bed early.",
          "I was tired, so I went to bed early.",
          "I was tired because so I slept.",
          "So I was tired, because I slept.",
        ],
        answer: 1,
        explain:
          "because와 so는 한 문장에서 같이 쓰지 않아요. 둘 중 하나만 골라 쓰세요.",
      },
      {
        q: "'나는 배가 고팠지만 아무것도 먹지 않았다'를 영어로 하면?",
        options: [
          "I was hungry, so I didn't eat anything.",
          "I was hungry, but I didn't eat anything.",
          "I was hungry because I didn't eat anything.",
          "I was hungry, and so but I didn't eat.",
        ],
        answer: 1,
        explain: "'~지만'이라는 반대 관계이므로 but을 써요.",
      },
    ],
  },
  {
    id: "a2-g10",
    level: "A2",
    title: "some·any",
    koreanGap:
      "둘 다 '조금, 어떤'으로 번역돼서 구분이 어렵지만, 기본적으로 긍정문에는 some, 부정문과 의문문에는 any를 써요. 권유하는 의문문에서는 some을 쓰는 예외도 알아 두면 좋아요.",
    explanation: [
      "some은 긍정문에서 '조금, 몇 개'를 뜻해요. 'We have some fresh muffins.'처럼 셀 수 있는 명사의 복수형이나 셀 수 없는 명사 앞에 자유롭게 붙어요.",
      "부정문과 의문문에서는 any로 바꿔요. 'I don't have any cash.', 'Do you have any questions?'처럼요. not ~ any는 '하나도 없다'는 뜻이 돼요.",
      "예외가 하나 있어요. 상대가 Yes라고 답하길 기대하는 권유나 부탁에는 의문문이어도 some을 써요. 'Would you like some water?'가 대표적이에요.",
      "something/anything, someone/anyone도 같은 규칙을 따라요. 긍정문엔 something, 부정문과 의문문엔 anything을 쓰는 식이에요.",
    ],
    examples: [
      {
        en: { us: "We have some fresh muffins today." },
        ko: "오늘 신선한 머핀이 좀 있어요.",
      },
      {
        en: { us: "I don't have any cash on me right now." },
        ko: "지금 수중에 현금이 하나도 없어요.",
      },
      {
        en: { us: "Do you have any shifts available next week?" },
        ko: "다음 주에 가능한 근무가 있나요?",
      },
      {
        en: { us: "Would you like some water while you wait?" },
        ko: "기다리시는 동안 물 좀 드릴까요?",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — There are ___ apples in the fridge.",
        options: ["any", "some", "much", "a"],
        answer: 1,
        explain: "긍정문에서는 some을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — I don't have ___ questions.",
        options: ["some", "any", "a", "much"],
        answer: 1,
        explain:
          "부정문에서는 any를 써요. not ~ any는 '하나도 없다'는 뜻이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Is there ___ milk left?",
        options: ["some", "any", "a", "an"],
        answer: 1,
        explain: "일반적인 의문문에서는 any를 써요.",
      },
      {
        q: "권유할 때 자연스러운 표현은?",
        options: [
          "Would you like any coffee?",
          "Would you like some coffee?",
          "Would you like a coffees?",
          "Do you like some coffee now?",
        ],
        answer: 1,
        explain: "Yes를 기대하는 권유 의문문에서는 some을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ called you while you were out. (누군가)",
        options: ["Anyone", "Someone", "Any", "Some"],
        answer: 1,
        explain: "긍정문에서 '누군가'는 someone이에요.",
      },
    ],
  },
  {
    id: "a2-g11",
    level: "A2",
    title: "How much·How many",
    koreanGap:
      "한국어 '얼마나'는 하나지만, 영어는 셀 수 없는 명사에는 How much, 셀 수 있는 복수 명사에는 How many를 써요. 가격을 물을 때 How much is it?이 굳어진 표현이라는 것도 함께 익혀야 해요.",
    explanation: [
      "양이나 수를 물을 때 명사의 종류에 따라 표현이 갈려요. money, sugar, luggage처럼 셀 수 없는 명사에는 How much, hours, people, stops처럼 셀 수 있는 복수 명사에는 How many를 써요.",
      "가격을 묻는 How much is it?은 명사 없이도 쓰는 굳어진 표현이에요. 시장, 중고 거래, 가게 어디서든 하루에 몇 번씩 쓰게 되죠.",
      "일자리 조건을 확인할 때 How many hours(몇 시간), How much per hour(시급 얼마)를 정확히 물어보는 게 정말 중요해요. 계약 전에 꼭 확인하는 습관을 들이세요.",
      "대답에는 a lot of(많이), a few(조금, 셀 수 있는), a little(조금, 셀 수 없는)을 활용해요. 'Just a few.', 'Not much.'처럼 짧은 대답도 자연스러워요.",
    ],
    examples: [
      {
        en: { us: "How much is the weekly rent for this room?" },
        ko: "이 방의 일주일 임대료는 얼마예요?",
      },
      {
        en: { us: "How many hours do you work per week?" },
        ko: "일주일에 몇 시간 일하세요?",
      },
      {
        en: {
          us: "How much money do I need for the security deposit?",
          au: "How much money do I need for the bond?",
        },
        ko: "보증금으로 돈이 얼마나 필요해요?",
      },
      {
        en: { us: "How many stops is it to the central station?" },
        ko: "중앙역까지 몇 정거장이에요?",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — ___ sugar do you want in your coffee?",
        options: ["How many", "How much", "How often", "How long"],
        answer: 1,
        explain: "sugar는 셀 수 없는 명사라서 How much를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ people are coming to the party?",
        options: ["How much", "How many", "How far", "How long"],
        answer: 1,
        explain: "people은 셀 수 있는 복수 명사라서 How many를 써요.",
      },
      {
        q: "가격을 물을 때 쓰는 표현은?",
        options: [
          "How much is it?",
          "How many is it?",
          "How long is it?",
          "How often is it?",
        ],
        answer: 0,
        explain: "가격은 How much is it?으로 물어요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ luggage can I take on the plane?",
        options: ["How much", "How many", "How tall", "How often"],
        answer: 0,
        explain: "luggage는 셀 수 없는 명사라서 How much를 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "How many money do you have?",
          "How much bags do you have?",
          "How many shifts do you have this week?",
          "How much people live here?",
        ],
        answer: 2,
        explain:
          "shifts는 셀 수 있는 복수 명사라 How many가 맞아요. money에는 much, bags와 people에는 many를 써야 해요.",
      },
    ],
  },
  {
    id: "a2-g12",
    level: "A2",
    title: "부가의문문",
    koreanGap:
      "'그렇죠?', '맞죠?'에 해당하는 부가의문문은 앞 문장이 긍정이면 부정 꼬리, 부정이면 긍정 꼬리를 붙여요. 동사 종류와 인칭까지 맞춰야 해서 공식처럼 연습해 두는 게 좋아요.",
    explanation: [
      "부가의문문은 문장 끝에 짧은 꼬리를 붙여 확인하거나 동의를 구하는 표현이에요. 앞 문장이 긍정이면 부정 꼬리, 부정이면 긍정 꼬리를 붙이는 게 기본 규칙이에요.",
      "꼬리의 동사는 앞 문장을 따라가요. be동사 문장이면 'It's hot, isn't it?', 일반동사 문장이면 'You work here, don't you?', 과거면 'did you?'처럼 시제와 인칭을 맞춰요.",
      "can이나 will이 있으면 그대로 꼬리에 써요. 'You can drive, can't you?', 'He'll come, won't he?'처럼요.",
      "부가의문문은 대화를 부드럽게 이어 주는 윤활유 같은 표현이에요. 'It's a nice day, isn't it?'은 호주 동료들과 스몰토크를 시작하는 단골 멘트랍니다.",
    ],
    examples: [
      {
        en: { us: "You're from Korea, aren't you?" },
        ko: "한국에서 오셨죠, 그렇죠?",
      },
      {
        en: {
          us: "The rent includes utilities, doesn't it?",
          au: "The rent includes bills, doesn't it?",
        },
        ko: "임대료에 공과금이 포함되어 있죠, 그렇죠?",
      },
      {
        en: { us: "It's a public holiday tomorrow, isn't it?" },
        ko: "내일 공휴일이죠, 그렇죠?",
      },
      {
        en: { us: "You didn't forget your time sheet, did you?" },
        ko: "근무 기록표 잊지 않으셨죠, 그렇죠?",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — You work here, ___?",
        options: ["don't you", "do you", "aren't you", "won't you"],
        answer: 0,
        explain: "긍정의 일반동사 문장에는 부정 꼬리 don't you를 붙여요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She is the new manager, ___?",
        options: ["is she", "isn't she", "doesn't she", "wasn't it"],
        answer: 1,
        explain: "긍정의 be동사 문장에는 부정 꼬리 isn't she를 붙여요.",
      },
      {
        q: "빈칸에 알맞은 것은? — They didn't pay the deposit, ___?",
        options: ["didn't they", "did they", "don't they", "do they"],
        answer: 1,
        explain:
          "부정문에는 긍정 꼬리를 붙여요. didn't ~, did they?가 짝이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — You can drive, ___?",
        options: ["can you", "can't you", "don't you", "aren't you"],
        answer: 1,
        explain: "can이 있는 긍정문에는 부정 꼬리 can't you를 붙여요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "It's cold today, isn't it?",
          "It's cold today, is it?",
          "It's cold today, doesn't it?",
          "It's cold today, aren't it?",
        ],
        answer: 0,
        explain:
          "It's(긍정 be동사) 문장에는 isn't it?이 와요. 스몰토크 단골 표현이에요.",
      },
    ],
  },
];
