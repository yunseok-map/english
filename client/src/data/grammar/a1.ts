import type { GrammarLesson } from "@/data/types";

export const GRAMMAR_A1: GrammarLesson[] = [
  {
    id: "a1-g01",
    level: "A1",
    title: "be동사와 인칭",
    koreanGap:
      "한국어는 '저는 학생이에요, 그는 학생이에요'처럼 주어가 바뀌어도 서술어가 그대로지만, 영어 be동사는 am/is/are로 인칭마다 형태가 달라져요. 주어를 자주 생략하는 한국어 습관 때문에 주어+be동사를 통째로 빼먹는 실수도 잦아요.",
    explanation: [
      "be동사는 '~이다' 또는 '~에 있다'라는 뜻으로, 영어에서 가장 기본이 되는 동사예요. 자기소개를 하거나 사물의 위치를 말할 때 반드시 필요하죠. 워킹홀리데이 첫날 공항에서부터 바로 쓰게 되는 표현이에요.",
      "주어에 따라 형태가 세 가지로 갈라져요. I 뒤에는 am, He/She/It 같은 3인칭 단수 뒤에는 is, You/We/They 뒤에는 are를 써요. 실제 회화에서는 I'm, She's, They're처럼 축약형을 훨씬 많이 쓴답니다.",
      "한국어는 '나는 피곤해'처럼 주어를 생략해도 자연스럽지만, 영어는 주어와 be동사가 거의 항상 세트로 있어야 해요. 'Tired.'가 아니라 'I'm tired.'라고 말하는 습관을 들여 보세요.",
      "면접이나 은행에서 자기소개할 때 'I'm Minsu. I'm from Korea.'처럼 짧고 정확하게 말하는 연습이 좋아요. 길을 물을 때도 'Where is the station?'처럼 be동사가 문장의 뼈대가 돼요.",
    ],
    examples: [
      {
        en: { us: "I'm from Korea, and I'm here on a working holiday visa." },
        ko: "저는 한국에서 왔고, 워킹홀리데이 비자로 여기 와 있어요.",
      },
      {
        en: { us: "The sharehouse is close to the train station." },
        ko: "그 셰어하우스는 기차역에서 가까워요.",
      },
      {
        en: { us: "We are open from nine to five on weekdays." },
        ko: "저희는 평일 오전 9시부터 오후 5시까지 영업해요.",
      },
      {
        en: {
          us: "My coworkers at the cafe are really friendly.",
          au: "My workmates at the cafe are really friendly.",
        },
        ko: "카페의 제 동료들은 정말 친절해요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 be동사는? — I ___ a barista at a local cafe.",
        options: ["am", "is", "are", "be"],
        answer: 0,
        explain: "주어가 I일 때 be동사는 항상 am이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She ___ my housemate from Japan.",
        options: ["am", "is", "are", "be"],
        answer: 1,
        explain: "She처럼 3인칭 단수 주어에는 is를 써요.",
      },
      {
        q: "다음 중 문법이 올바른 문장은?",
        options: [
          "They is late for work.",
          "He are tired today.",
          "You am welcome.",
          "We are in the city now.",
        ],
        answer: 3,
        explain:
          "We 뒤에는 are가 와요. They are, He is, You are가 올바른 짝이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — The bus stop ___ right in front of the bank.",
        options: ["are", "am", "is", "be"],
        answer: 2,
        explain: "The bus stop은 단수 주어라서 is를 써요.",
      },
      {
        q: "'I'm'은 무엇의 축약형일까요?",
        options: ["I is", "I am", "I are", "I be"],
        answer: 1,
        explain:
          "I'm은 I am의 축약형이에요. 회화에서는 축약형을 훨씬 자주 써요.",
      },
    ],
    pattern: /\b(am|is|are)\b/i,
  },
  {
    id: "a1-g02",
    level: "A1",
    title: "일반동사 현재시제",
    koreanGap:
      "한국어 동사는 주어가 누구든 형태가 같지만, 영어는 3인칭 단수(he/she/it) 주어일 때 동사에 -s나 -es를 붙여야 해요. 'She work'처럼 -s를 빠뜨리는 실수가 한국 학습자에게 가장 흔해요.",
    explanation: [
      "일반동사 현재시제는 반복되는 습관이나 변하지 않는 사실을 말할 때 써요. '나는 카페에서 일해요', '가게는 6시에 닫아요'처럼 일상과 일터를 설명하는 기본 시제예요.",
      "주어가 He, She, It이거나 단수 명사일 때는 동사 뒤에 -s를 붙여요. work는 works, close는 closes가 되죠. -ch, -sh, -o, -x 등으로 끝나면 -es를 붙여서 watches, goes처럼 만들어요.",
      "y로 끝나는 동사는 자음+y면 y를 i로 바꾸고 -es를 붙여요. study는 studies가 되지만, play처럼 모음+y는 그대로 plays예요. have는 예외적으로 has로 바뀌니 따로 외워 두세요.",
      "일터에서 근무 시간이나 가게 운영 시간을 설명할 일이 정말 많아요. 'The cafe opens at seven.'처럼 주어와 동사의 짝을 소리 내어 연습하면 몸에 빨리 붙어요.",
    ],
    examples: [
      {
        en: { us: "I work part-time at a burger place near the beach." },
        ko: "저는 해변 근처 햄버거 가게에서 파트타임으로 일해요.",
      },
      {
        en: { us: "My manager starts the morning shift at seven." },
        ko: "제 매니저는 아침 근무를 7시에 시작해요.",
      },
      {
        en: { us: "The supermarket closes early on Sundays." },
        ko: "그 슈퍼마켓은 일요일마다 일찍 닫아요.",
      },
      {
        en: { us: "My housemates cook dinner together every Friday." },
        ko: "제 하우스메이트들은 매주 금요일에 같이 저녁을 요리해요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — He ___ at a farm near Cairns.",
        options: ["work", "works", "working", "is work"],
        answer: 1,
        explain: "3인칭 단수 주어 He 뒤에는 동사에 -s를 붙여 works라고 해요.",
      },
      {
        q: "빈칸에 알맞은 것은? — The library ___ at 6 p.m. every day.",
        options: ["close", "closing", "closes", "is close"],
        answer: 2,
        explain: "The library는 단수 주어이므로 closes가 맞아요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "She go to work by bus.",
          "She goes to work by bus.",
          "She going to work by bus.",
          "She is goes to work by bus.",
        ],
        answer: 1,
        explain: "go는 o로 끝나서 3인칭 단수에서 goes가 돼요.",
      },
      {
        q: "빈칸에 알맞은 것은? — My boss usually ___ the schedule on Mondays.",
        options: ["makes", "make", "making", "is make"],
        answer: 0,
        explain: "My boss는 3인칭 단수라서 makes를 써요.",
      },
      {
        q: "다음 중 3인칭 단수형이 올바르게 바뀐 것은?",
        options: [
          "watch → watchs",
          "study → studys",
          "go → goes",
          "play → playes",
        ],
        answer: 2,
        explain:
          "go는 goes가 맞아요. watch는 watches, study는 studies, play는 plays예요.",
      },
    ],
  },
  {
    id: "a1-g03",
    level: "A1",
    title: "현재진행형",
    koreanGap:
      "한국어 '~하고 있어요'와 뜻은 비슷하지만, 영어는 be동사와 동사-ing 두 부분이 모두 필요해요. 'I studying English'처럼 be동사를 빼먹는 실수가 정말 흔하답니다.",
    explanation: [
      "현재진행형은 지금 이 순간 벌어지고 있는 일을 말할 때 써요. 형태는 be동사(am/is/are) + 동사-ing이고, 두 조각 중 하나라도 빠지면 틀린 문장이 돼요.",
      "-ing를 붙일 때 철자 규칙이 있어요. make처럼 e로 끝나면 e를 빼고 making, sit처럼 짧은 모음+자음으로 끝나면 자음을 겹쳐 sitting이 돼요.",
      "전화로 '지금 뭐 해?'라고 묻고 답하거나, 가게에서 '방을 알아보는 중이에요'라고 말할 때 딱 필요한 시제예요. 'I'm looking for...'는 워홀 생활에서 하루에도 몇 번씩 쓰게 되는 패턴이에요.",
      "매일 반복되는 일은 현재시제, 지금 진행 중인 일은 현재진행형으로 구분해요. 'I work at a cafe.'는 직업을, 'I'm working now.'는 지금 근무 중이라는 뜻을 전해요.",
    ],
    examples: [
      {
        en: {
          us: "I'm looking for a room near the city center.",
          au: "I'm looking for a room near the city centre.",
        },
        ko: "시내 근처에 방을 찾고 있어요.",
      },
      {
        en: { us: "She is training a new staff member right now." },
        ko: "그녀는 지금 신입 직원을 교육하고 있어요.",
      },
      {
        en: { us: "We're waiting for the bus to the farm." },
        ko: "우리는 농장으로 가는 버스를 기다리고 있어요.",
      },
      {
        en: { us: "The customer is asking about today's special." },
        ko: "그 손님이 오늘의 스페셜 메뉴에 대해 물어보고 있어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I ___ making a flat white right now.",
        options: ["am", "is", "are", "be"],
        answer: 0,
        explain:
          "주어가 I이므로 be동사는 am이에요. am + making이 현재진행형이에요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "He working at the moment.",
          "He is working at the moment.",
          "He is work at the moment.",
          "He are working at the moment.",
        ],
        answer: 1,
        explain:
          "현재진행형은 be동사와 -ing가 둘 다 필요해요. He is working이 맞아요.",
      },
      {
        q: "빈칸에 알맞은 것은? — They ___ cleaning the kitchen now.",
        options: ["is", "am", "are", "be"],
        answer: 2,
        explain: "They 뒤에는 are를 써요.",
      },
      {
        q: "'sit'의 -ing 형태로 올바른 것은?",
        options: ["siting", "sitting", "siteing", "sits"],
        answer: 1,
        explain:
          "짧은 모음+자음으로 끝나는 sit은 자음 t를 겹쳐 sitting이 돼요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Sorry, she can't talk now. She ___ a customer.",
        options: ["serves", "is serving", "serve", "serving"],
        answer: 1,
        explain: "지금 진행 중인 일이므로 현재진행형 is serving을 써요.",
      },
    ],
    pattern: /\b(am|is|are)\s+\w+ing\b/i,
  },
  {
    id: "a1-g04",
    level: "A1",
    title: "관사 a·an·the",
    koreanGap:
      "한국어에는 관사가 아예 없어서 언제 a/an을 쓰고 언제 the를 쓰는지 감을 잡기 어려워요. '처음 말하는 하나'인지 '서로 아는 그것'인지를 구분하는 감각을 기르는 게 핵심이에요.",
    explanation: [
      "a와 an은 '(여러 개 중) 하나'를 뜻하고, 처음 언급하는 셀 수 있는 단수 명사 앞에 써요. 뒤에 오는 단어가 자음 소리로 시작하면 a, 모음 소리로 시작하면 an이에요.",
      "철자가 아니라 '소리'가 기준이라는 게 포인트예요. hour는 h가 묵음이라 an hour, university는 '유' 소리로 시작해서 a university가 돼요.",
      "the는 말하는 사람과 듣는 사람이 서로 어떤 것인지 아는 명사 앞에 써요. 'Can you open the window?'라고 하면 그 자리에 있는 바로 그 창문을 가리키는 거죠. 세상에 하나뿐인 the sun, the internet에도 the를 써요.",
      "은행 계좌를 열 때 'I'd like to open a bank account.'처럼 처음엔 a를 쓰고, 그다음부터는 'the account'로 받는 흐름을 기억하세요. 식사 이름(have lunch)이나 도시 이름 앞에는 관사를 쓰지 않는 것도 함께 알아 두면 좋아요.",
    ],
    examples: [
      {
        en: { us: "I need to open a bank account this week." },
        ko: "이번 주에 은행 계좌를 하나 개설해야 해요.",
      },
      {
        en: { us: "The interview takes about an hour." },
        ko: "면접은 한 시간 정도 걸려요.",
      },
      {
        en: { us: "The manager wants to see you in the office." },
        ko: "매니저가 사무실에서 당신을 보고 싶어 해요.",
      },
      {
        en: {
          us: "I found an apartment with a big kitchen.",
          au: "I found a flat with a big kitchen.",
        },
        ko: "큰 주방이 있는 아파트를 찾았어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I bought ___ umbrella at the mall.",
        options: ["a", "an", "the", "(관사 없음)"],
        answer: 1,
        explain: "umbrella는 모음 소리로 시작하니까 an을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She works at ___ university in Melbourne.",
        options: ["a", "an", "the", "(관사 없음)"],
        answer: 0,
        explain: "university는 '유'라는 자음 소리(/j/)로 시작해서 a를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Can you close ___ door? It's cold.",
        options: ["a", "an", "the", "(관사 없음)"],
        answer: 2,
        explain: "서로 어떤 문인지 아는 상황이므로 the를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — My shift starts in ___ hour.",
        options: ["a", "an", "the", "(관사 없음)"],
        answer: 1,
        explain: "hour는 h가 묵음이라 모음 소리로 시작하므로 an hour예요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I had the lunch with my coworker.",
          "She is an best barista here.",
          "He found a job at a cafe.",
          "We live in the Sydney.",
        ],
        answer: 2,
        explain:
          "처음 언급하는 job과 cafe에 a를 쓴 것이 맞아요. 식사 이름과 도시 이름 앞에는 관사를 쓰지 않아요.",
      },
    ],
  },
  {
    id: "a1-g05",
    level: "A1",
    title: "명사의 복수형",
    koreanGap:
      "한국어는 '들'을 안 붙여도 복수를 표현할 수 있지만, 영어는 둘 이상이면 거의 항상 -s를 붙여야 해요. man→men 같은 불규칙 복수형과 money처럼 아예 -s가 안 붙는 명사도 따로 익혀야 하고요.",
    explanation: [
      "셀 수 있는 명사가 둘 이상이면 보통 -s를 붙여요. coffee 두 잔은 two coffees, 머핀 세 개는 three muffins처럼요. 주문할 때 개수+복수형만 정확해도 의사소통이 훨씬 매끄러워져요.",
      "-s, -ch, -sh, -x, -o로 끝나면 -es를 붙여서 boxes, dishes가 돼요. 자음+y로 끝나면 y를 i로 바꿔 city→cities가 되죠.",
      "완전히 다른 모양으로 바뀌는 불규칙 복수형도 있어요. man→men, child→children, person→people, foot→feet은 사용 빈도가 높으니 꼭 외워 두세요.",
      "money, information, advice, furniture처럼 셀 수 없는 명사에는 -s를 붙이지 않아요. '조언 두 개'는 two advices가 아니라 two pieces of advice라고 표현한답니다.",
    ],
    examples: [
      {
        en: { us: "Two coffees and three muffins, please." },
        ko: "커피 두 잔이랑 머핀 세 개 주세요.",
      },
      {
        en: {
          us: "There are five people ahead of you in line.",
          au: "There are five people ahead of you in the queue.",
        },
        ko: "당신 앞에 다섯 명이 줄을 서 있어요.",
      },
      {
        en: { us: "I washed all the dishes and wiped the tables." },
        ko: "설거지를 다 하고 테이블을 닦았어요.",
      },
      {
        en: { us: "Both of my housemates have day shifts tomorrow." },
        ko: "제 하우스메이트 둘 다 내일 낮 근무예요.",
      },
    ],
    quiz: [
      {
        q: "'child'의 복수형은?",
        options: ["childs", "childes", "children", "childrens"],
        answer: 2,
        explain: "child의 복수형은 불규칙 변화인 children이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — There are many ___ at the hostel tonight.",
        options: ["person", "persons", "people", "peoples"],
        answer: 2,
        explain: "person의 복수형은 보통 people을 써요.",
      },
      {
        q: "다음 중 셀 수 없는 명사는?",
        options: ["money", "table", "cup", "shift"],
        answer: 0,
        explain: "money는 셀 수 없는 명사라서 -s를 붙이지 않아요.",
      },
      {
        q: "'box'의 복수형은?",
        options: ["boxs", "boxes", "boxies", "box"],
        answer: 1,
        explain: "x로 끝나는 명사에는 -es를 붙여서 boxes가 돼요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I have two brother.",
          "She bought three tomatos.",
          "We need more chairs for the party.",
          "He gave me many advices.",
        ],
        answer: 2,
        explain:
          "chairs가 올바른 복수형이에요. tomato는 tomatoes, advice는 셀 수 없는 명사예요.",
      },
    ],
  },
  {
    id: "a1-g06",
    level: "A1",
    title: "인칭대명사와 소유격",
    koreanGap:
      "한국어는 '내가/나를/나의'처럼 조사로 역할이 바뀌지만, 영어는 I/me/my처럼 단어 자체가 바뀌어요. 특히 he/him/his와 they/them/their 구분에서 실수가 많아요.",
    explanation: [
      "영어 대명사는 문장 속 역할에 따라 모양이 바뀌어요. 주어 자리에는 I/you/he/she/we/they, 목적어 자리에는 me/you/him/her/us/them을 써요.",
      "소유격은 명사 앞에 붙어서 '~의'를 뜻해요. my/your/his/her/our/their 뒤에는 반드시 명사가 와야 하고, 명사 없이 '내 것'이라고 할 때는 mine/yours/his/hers/ours/theirs를 써요.",
      "it의 소유격 its와 it is의 축약형 it's는 생김새가 비슷해서 원어민도 헷갈려 해요. 아포스트로피가 있으면 무조건 it is의 줄임이라고 기억하세요.",
      "셰어하우스에서는 물건 주인을 가리는 일이 잦아요. 'This is my shelf, and that one is yours.'처럼 소유격과 소유대명사를 짝지어 연습해 두면 바로 써먹을 수 있어요.",
    ],
    examples: [
      {
        en: { us: "My manager gave me an extra shift this week." },
        ko: "매니저가 이번 주에 저에게 추가 근무를 줬어요.",
      },
      {
        en: { us: "This is her locker, and that one is yours." },
        ko: "이건 그녀의 사물함이고, 저건 당신 거예요.",
      },
      {
        en: { us: "Our landlord fixed the heater for us." },
        ko: "집주인이 우리를 위해 히터를 고쳐 줬어요.",
      },
      {
        en: { us: "I met them at the backpackers' hostel." },
        ko: "저는 그들을 배낭여행자 호스텔에서 만났어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — This is ___ first day at work.",
        options: ["I", "me", "my", "mine"],
        answer: 2,
        explain: "명사 first day 앞이므로 소유격 my를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Can you help ___ with these boxes?",
        options: ["I", "me", "my", "mine"],
        answer: 1,
        explain: "동사 help의 목적어 자리이므로 me를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ car is parked outside. (그의)",
        options: ["He", "Him", "His", "He's"],
        answer: 2,
        explain:
          "'그의 차'이므로 소유격 His를 써요. He's는 He is의 축약형이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — The tips are ___. We earned them together.",
        options: ["our", "ours", "us", "we"],
        answer: 1,
        explain: "뒤에 명사가 없으므로 소유대명사 ours(우리 것)를 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "Me and him works together.",
          "She gave the keys to I.",
          "They invited my to the barbecue.",
          "He showed us the staff room.",
        ],
        answer: 3,
        explain:
          "showed의 목적어 자리에 us를 쓴 것이 맞아요. 전치사 뒤에는 me, 목적어 자리에는 me/us/them을 써요.",
      },
    ],
  },
  {
    id: "a1-g07",
    level: "A1",
    title: "can·can't",
    koreanGap:
      "'~할 수 있다'는 can 하나면 되는데, can 뒤에 to를 붙이거나(can to swim ×) 3인칭이라고 -s를 붙이는(cans ×) 실수가 잦아요. can과 can't의 발음 구분이 어려운 것도 한국 학습자의 고민이죠.",
    explanation: [
      "can은 능력(할 수 있다), 허락(해도 된다), 요청(해 줄 수 있나요?)을 모두 담당하는 만능 조동사예요. 뒤에는 반드시 동사원형이 오고, to나 -s는 절대 붙지 않아요.",
      "부정형은 cannot이고 회화에서는 can't로 줄여 써요. 'I can't work on Sundays.'처럼 할 수 없는 것을 미리 말해 두면 일터에서 오해가 줄어요.",
      "의문문은 can을 주어 앞으로 보내기만 하면 돼요. 'Can I get a glass of water?'는 카페, 'Can I try this on?'은 옷 가게에서 바로 쓰는 문장이에요.",
      "면접에서 능력을 어필할 때도 can이 핵심이에요. 'I can start next week.', 'I can work weekends.'처럼 짧은 문장으로 자신 있게 말해 보세요.",
    ],
    examples: [
      {
        en: { us: "I can start work from next Monday." },
        ko: "다음 주 월요일부터 일을 시작할 수 있어요.",
      },
      {
        en: { us: "Can I get a glass of water, please?" },
        ko: "물 한 잔 주시겠어요?",
      },
      {
        en: { us: "She can't come to the staff meeting today." },
        ko: "그녀는 오늘 직원 회의에 올 수 없어요.",
      },
      {
        en: { us: "You can pay by card or cash here." },
        ko: "여기서는 카드나 현금으로 계산할 수 있어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — He ___ speak three languages.",
        options: ["can", "cans", "can to", "is can"],
        answer: 0,
        explain:
          "can은 주어가 누구든 형태가 변하지 않고, 뒤에 동사원형이 와요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I can to drive a car.",
          "She can makes coffee.",
          "We can work on weekends.",
          "He cans lift heavy boxes.",
        ],
        answer: 2,
        explain:
          "can 뒤에는 to 없이 동사원형만 와요. can to, can makes, cans는 모두 틀려요.",
      },
      {
        q: "'cannot'의 축약형은?",
        options: ["can'not", "cann't", "can't", "cant'"],
        answer: 2,
        explain: "cannot의 축약형은 can't예요.",
      },
      {
        q: "허락을 구할 때 빈칸에 알맞은 것은? — ___ I try this on?",
        options: ["Can", "Do", "Am", "Does"],
        answer: 0,
        explain:
          "허락을 구할 때는 Can I ~?를 써요. 옷 가게에서 자주 쓰는 표현이에요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Sorry, I ___ hear you. The music is too loud.",
        options: ["can", "can't", "cans", "not can"],
        answer: 1,
        explain: "음악이 시끄러워서 '들을 수 없다'는 뜻이므로 can't를 써요.",
      },
    ],
    pattern: /\bcan(not|'t)?\b/i,
  },
  {
    id: "a1-g08",
    level: "A1",
    title: "do·does 의문문",
    koreanGap:
      "한국어는 어순 그대로 끝만 올리면 질문이 되지만, 영어 일반동사 의문문은 문장 앞에 Do/Does를 세워야 해요. Does를 쓰면 뒤의 동사가 원형으로 돌아가는 것(Does he works? ×)도 자주 놓치는 부분이에요.",
    explanation: [
      "일반동사가 들어간 문장을 질문으로 만들려면 Do나 Does를 문장 맨 앞에 놓아요. 주어가 I/you/we/they면 Do, he/she/it이면 Does를 써요.",
      "Does를 쓰는 순간 3인칭의 -s는 Does가 가져가요. 그래서 'Does she work here?'처럼 동사는 원형으로 돌아와요. 이 규칙만 기억해도 실수가 절반으로 줄어요.",
      "대답은 짧게 'Yes, I do. / No, I don't.'처럼 do/does로 받아요. 'Yes, I like.'처럼 동사를 그대로 반복하면 어색하니 주의하세요.",
      "'Do you have ~?', 'Does this bus go to ~?'는 숙소 예약, 길 찾기, 쇼핑에서 하루에도 몇 번씩 쓰는 생존 패턴이에요. What time, Where 같은 의문사 뒤에도 do/does 어순이 그대로 이어져요.",
    ],
    examples: [
      {
        en: { us: "Do you have any rooms available this weekend?" },
        ko: "이번 주말에 이용 가능한 방이 있나요?",
      },
      {
        en: { us: "Does this bus go to the airport?" },
        ko: "이 버스가 공항으로 가나요?",
      },
      {
        en: { us: "Do you accept credit cards?" },
        ko: "신용카드 받으시나요?",
      },
      {
        en: { us: "Does the job include free meals?" },
        ko: "그 일자리는 무료 식사가 포함되나요?",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — ___ you work on Saturdays?",
        options: ["Do", "Does", "Are", "Is"],
        answer: 0,
        explain: "주어가 you이고 일반동사 work가 있으므로 Do로 시작해요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ she live near the station?",
        options: ["Do", "Does", "Is", "Are"],
        answer: 1,
        explain: "주어가 3인칭 단수 she이므로 Does를 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "Does he works here?",
          "Do he work here?",
          "Does he work here?",
          "He does works here?",
        ],
        answer: 2,
        explain: "Does가 -s를 가져가므로 동사는 원형 work로 돌아가요.",
      },
      {
        q: "'Do you like your job?'에 대한 자연스러운 짧은 대답은?",
        options: ["Yes, I like.", "Yes, I do.", "Yes, I am.", "Yes, I does."],
        answer: 1,
        explain: "do 의문문에는 do로 짧게 대답해요. Yes, I do.가 자연스러워요.",
      },
      {
        q: "빈칸에 알맞은 것은? — What time ___ the store open?",
        options: ["do", "does", "is", "are"],
        answer: 1,
        explain:
          "주어 the store가 단수이고 일반동사 open이 있으므로 does를 써요.",
      },
    ],
  },
  {
    id: "a1-g09",
    level: "A1",
    title: "부정문 만들기",
    koreanGap:
      "한국어는 '안' 하나만 붙이면 되지만, 영어는 be동사면 뒤에 not, 일반동사면 앞에 don't/doesn't를 놓는 식으로 방식이 달라요. 'I not like it'처럼 don't를 빼먹는 실수가 가장 흔해요.",
    explanation: [
      "be동사 문장은 be동사 뒤에 not만 붙이면 부정문이 돼요. is not은 isn't, are not은 aren't로 줄여 쓰는 게 보통이에요.",
      "일반동사 문장은 동사 앞에 don't(do not)나 doesn't(does not)를 놓아요. 주어가 he/she/it이면 doesn't를 쓰고, 이때 동사는 원형으로 돌아가요. 'She doesn't works'가 아니라 'She doesn't work'예요.",
      "고장 신고나 사정 설명에 부정문이 꼭 필요해요. 'The Wi-Fi isn't working.', 'I don't have a car.'처럼 자주 쓰는 문장을 통째로 익혀 두면 든든해요.",
      "부정문에서 not을 두 번 쓰지 않도록 주의하세요. 'I don't have no money'가 아니라 'I don't have any money'가 자연스러운 표현이에요.",
    ],
    examples: [
      {
        en: { us: "I don't have a car, so I take the train." },
        ko: "차가 없어서 기차를 타요.",
      },
      {
        en: { us: "The Wi-Fi isn't working in my room." },
        ko: "제 방에서 와이파이가 안 돼요.",
      },
      {
        en: { us: "She doesn't work on Sundays." },
        ko: "그녀는 일요일에는 일하지 않아요.",
      },
      {
        en: { us: "We aren't busy on weekday mornings." },
        ko: "저희는 평일 아침에는 바쁘지 않아요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — I ___ eat spicy food.",
        options: ["don't", "doesn't", "am not", "not"],
        answer: 0,
        explain: "주어 I와 일반동사 eat의 부정에는 don't를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — He ___ need a visa extension yet.",
        options: ["don't", "doesn't", "isn't", "not"],
        answer: 1,
        explain: "3인칭 단수 he와 일반동사 need의 부정에는 doesn't를 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I not tired today.",
          "She don't like night shifts.",
          "They doesn't have change.",
          "This ticket isn't valid anymore.",
        ],
        answer: 3,
        explain:
          "be동사 문장은 isn't처럼 be동사+not으로 부정해요. she는 doesn't, they는 don't를 써야 해요.",
      },
      {
        q: "빈칸에 알맞은 것은? — The ATM ___ working right now.",
        options: ["don't", "doesn't", "isn't", "aren't"],
        answer: 2,
        explain: "is working의 부정이므로 isn't working이 돼요.",
      },
      {
        q: "'She is busy.'의 부정문은?",
        options: [
          "She don't busy.",
          "She isn't busy.",
          "She doesn't busy.",
          "She not is busy.",
        ],
        answer: 1,
        explain:
          "be동사 문장은 be동사 뒤에 not을 붙여요. busy는 동사가 아니라서 don't/doesn't를 쓸 수 없어요.",
      },
    ],
  },
  {
    id: "a1-g10",
    level: "A1",
    title: "시간·장소 전치사 in·on·at",
    koreanGap:
      "한국어 조사 '~에' 하나가 영어에서는 in/on/at 셋으로 갈라져요. 시간과 장소에서 각각 쓰임이 달라서 규칙과 함께 자주 쓰는 덩어리 표현을 통째로 익히는 게 지름길이에요.",
    explanation: [
      "시간에서는 범위가 클수록 in, 좁을수록 at이라고 기억하세요. 월·연도·계절에는 in(in July), 요일·날짜에는 on(on Friday), 시각에는 at(at 10 a.m.)을 써요.",
      "장소에서는 in이 '안에'(in Sydney, in the kitchen), on이 '표면 위·거리'(on the table, on Queen Street), at이 '지점'(at the bus stop, at the front gate)이에요.",
      "면접 약속을 잡을 때 'at 10 a.m. on Friday'처럼 시각과 요일을 겹쳐 쓰는 순서도 자연스럽게 익혀 두세요. 시각이 먼저, 요일이 뒤에 와요.",
      "at night, on the weekend(미국식), in the morning처럼 규칙만으로 설명이 안 되는 굳어진 표현도 있어요. 만날 때마다 덩어리로 외우는 게 가장 빨라요.",
    ],
    examples: [
      {
        en: { us: "My interview is at 10 a.m. on Friday." },
        ko: "제 면접은 금요일 오전 10시예요.",
      },
      {
        en: { us: "I arrived in Sydney in July." },
        ko: "저는 7월에 시드니에 도착했어요.",
      },
      {
        en: { us: "Let's meet at the front gate of the market." },
        ko: "시장 정문에서 만나요.",
      },
      {
        en: { us: "The pharmacy is on Queen Street, next to the bakery." },
        ko: "그 약국은 퀸 스트리트에 있고, 빵집 옆이에요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — The staff party is ___ Saturday.",
        options: ["in", "on", "at", "to"],
        answer: 1,
        explain: "요일 앞에는 on을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — I usually finish work ___ 5 p.m.",
        options: ["in", "on", "at", "by on"],
        answer: 2,
        explain: "구체적인 시각 앞에는 at을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — She was born ___ 1999.",
        options: ["in", "on", "at", "of"],
        answer: 0,
        explain: "연도 앞에는 in을 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — Your keys are ___ the table.",
        options: ["in", "on", "at", "over"],
        answer: 1,
        explain: "표면 위에 있을 때는 on을 써요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "I live at Brisbane.",
          "See you in Monday.",
          "The meeting is at noon.",
          "He works on a bank.",
        ],
        answer: 2,
        explain:
          "noon(정오) 같은 시각 표현에는 at을 써요. 도시에는 in, 요일에는 on, 직장에는 at a bank가 자연스러워요.",
      },
    ],
  },
  {
    id: "a1-g11",
    level: "A1",
    title: "There is·There are",
    koreanGap:
      "한국어 '~이 있어요'를 옮길 때 'It is a bank'처럼 잘못 말하기 쉬워요. 존재를 말할 때는 There is/are 구문을 쓰고, 뒤에 오는 명사의 수에 동사를 맞춰야 해요.",
    explanation: [
      "무언가가 '있다'고 말할 때는 There is/There are로 문장을 시작해요. 뒤에 오는 명사가 단수거나 셀 수 없으면 There is, 복수면 There are를 써요.",
      "부정은 There isn't / There aren't, 질문은 Is there ~? / Are there ~?로 만들어요. 'Is there an ATM near here?'는 워홀 생활 필수 질문이에요.",
      "집을 구할 때 방과 동네를 설명하는 데 이 구문이 계속 나와요. 'There are two bedrooms.', 'There is a bus stop right outside.'처럼 광고 문구에도 흔하답니다.",
      "There is some milk처럼 셀 수 없는 명사에는 is를 쓰는 것에 주의하세요. milk가 양이 많아 보여도 단수 취급이에요.",
    ],
    examples: [
      {
        en: {
          us: "There is a laundry room on the first floor.",
          au: "There is a laundry room on the ground floor.",
        },
        ko: "1층에 세탁실이 있어요.",
      },
      {
        en: { us: "There are two supermarkets within walking distance." },
        ko: "걸어갈 수 있는 거리에 슈퍼마켓이 두 개 있어요.",
      },
      {
        en: { us: "Is there a bus stop near the sharehouse?" },
        ko: "셰어하우스 근처에 버스 정류장이 있나요?",
      },
      {
        en: { us: "There isn't any parking on this street." },
        ko: "이 거리에는 주차 공간이 없어요.",
      },
    ],
    quiz: [
      {
        q: "빈칸에 알맞은 것은? — ___ a free table by the window.",
        options: ["There is", "There are", "It is", "They are"],
        answer: 0,
        explain: "단수 명사 a free table이 있으므로 There is를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ many backpackers in this town in summer.",
        options: ["There is", "There are", "It is", "This is"],
        answer: 1,
        explain: "복수 명사 backpackers가 오므로 There are를 써요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ there an ATM around here?",
        options: ["Is", "Are", "Do", "Does"],
        answer: 0,
        explain: "There is 구문의 의문문은 Is there ~?로 시작해요.",
      },
      {
        q: "다음 중 올바른 문장은?",
        options: [
          "There are a park near my house.",
          "There is two banks on this street.",
          "There are some dishes in the sink.",
          "There is many rooms available.",
        ],
        answer: 2,
        explain:
          "복수 명사 dishes에는 There are가 맞아요. 단수에는 is, 복수에는 are를 맞춰 써요.",
      },
      {
        q: "'우유가 좀 있어요'를 영어로 하면?",
        options: [
          "There are some milk.",
          "There is some milk.",
          "It is some milk.",
          "Some milk are there.",
        ],
        answer: 1,
        explain: "milk는 셀 수 없는 명사라 단수 취급하므로 There is를 써요.",
      },
    ],
    pattern: /\bthere\s+(is|are|was|were|isn't|aren't)\b/i,
  },
  {
    id: "a1-g12",
    level: "A1",
    title: "명령문과 please",
    koreanGap:
      "영어 명령문은 주어 없이 동사원형으로 시작해요. 한국어처럼 높임 어미가 따로 없어서, 부드럽게 말하려면 please를 붙이거나 Let's 같은 표현을 함께 쓰는 게 중요해요.",
    explanation: [
      "명령문은 주어 You를 생략하고 동사원형으로 시작해요. 'Sign here.'처럼 짧고 직접적이라서, 일터에서 지시를 주고받을 때 가장 많이 듣게 되는 문형이에요.",
      "'하지 마세요'는 Don't를 동사 앞에 붙이면 돼요. 'Don't forget to clock in.'처럼 주의사항을 전할 때 자주 쓰여요.",
      "명령문이 딱딱하게 들릴까 걱정되면 please를 문장 앞이나 뒤에 붙이세요. 'Please sign here.' 또는 'Sign here, please.' 둘 다 자연스러워요.",
      "'같이 ~해요'라고 제안할 때는 Let's + 동사원형을 써요. 'Let's take a break.'처럼요. be동사 명령문은 'Be careful.'처럼 원형 Be로 시작한다는 것도 기억해 두세요.",
    ],
    examples: [
      {
        en: { us: "Take a seat, and the doctor will call you soon." },
        ko: "앉아 계시면 곧 의사 선생님이 부르실 거예요.",
      },
      {
        en: { us: "Please sign here and write today's date." },
        ko: "여기에 서명하시고 오늘 날짜를 적어 주세요.",
      },
      {
        en: { us: "Don't forget to clock in before your shift." },
        ko: "근무 전에 출근 체크하는 것 잊지 마세요.",
      },
      {
        en: { us: "Let's take a ten-minute break." },
        ko: "10분간 쉬어요.",
      },
    ],
    quiz: [
      {
        q: "다음 중 올바른 명령문은?",
        options: [
          "You wash the dishes, please.",
          "Washes the dishes, please.",
          "Wash the dishes, please.",
          "To wash the dishes, please.",
        ],
        answer: 2,
        explain: "명령문은 주어 없이 동사원형 Wash로 시작해요.",
      },
      {
        q: "'만지지 마세요'를 영어로 하면?",
        options: [
          "Not touch, please.",
          "Don't touch it, please.",
          "No touching it please you.",
          "Doesn't touch it, please.",
        ],
        answer: 1,
        explain: "부정 명령문은 Don't + 동사원형으로 만들어요.",
      },
      {
        q: "빈칸에 알맞은 것은? — ___ careful with the hot plates.",
        options: ["Be", "Are", "Is", "Being"],
        answer: 0,
        explain: "be동사 명령문은 원형 Be로 시작해요.",
      },
      {
        q: "'같이 점심 먹으러 가요'라고 제안할 때 알맞은 표현은?",
        options: [
          "Let's grab lunch together.",
          "Let grab lunch together.",
          "Let's to grab lunch together.",
          "We let's grab lunch.",
        ],
        answer: 0,
        explain: "제안은 Let's + 동사원형이에요. Let's 뒤에 to는 붙지 않아요.",
      },
      {
        q: "다음 중 가장 공손한 부탁은?",
        options: [
          "Give me the menu.",
          "Menu now.",
          "Please pass me the menu.",
          "You give menu.",
        ],
        answer: 2,
        explain: "please를 붙이면 명령문이 한결 부드러워져요.",
      },
    ],
  },
];
