import type { Scenario } from "@/lib/scenarios";
import type { ChatMode } from "@/lib/providers";

/**
 * AI 키 없이 돌아가는 대화 상대.
 *
 * 예전에는 턴 번호로 정해진 문장 4개를 돌려썼다. 무슨 말을 하든 같은 순서로
 * 같은 질문이 오니 대화가 아니라 설문지에 가까웠다.
 *
 * 여기서는 학습자가 쓴 영어를 읽고
 *  1) 역할극이면 그 자리의 대본을 한 걸음 진행시키고,
 *  2) 자유 대화면 무슨 이야기를 하고 있는지 골라 그 주제로 되받는다.
 * 문법 지적은 lib/grammarCheck 가 따로 맡는다. 여기서는 다음 말만 고른다.
 */

export type LocalTurn = { reply: string; hint: string };

type Topic = {
  id: string;
  test: RegExp;
  replies: string[];
  hints: string[];
};

/** 자유 대화·하루 일과에서 학습자의 말에 맞춰 되받을 주제들. */
const TOPICS: Topic[] = [
  {
    id: "work",
    test: /\b(work|worked|working|job|shift|boss|manager|customer|cafe|café|restaurant|kitchen|farm|warehouse)\b/i,
    replies: [
      "How was work today? Was it busy?",
      "What do you usually do on a shift?",
      "Do you get along with the people you work with?",
      "How many hours did you work this week?",
    ],
    hints: [
      "It was pretty busy, but I managed.",
      "I mostly take orders and make coffee.",
      "Yeah, my coworkers are really friendly.",
    ],
  },
  {
    id: "study",
    test: /\b(study|studied|studying|english|class|lesson|learn|learned|learning|practice|practise|word|grammar)\b/i,
    replies: [
      "Nice. What part of English do you find hardest?",
      "How long have you been studying English?",
      "What helps you remember new words?",
      "Do you get to use English much during the day?",
    ],
    hints: [
      "Listening is the hardest part for me.",
      "I've been studying for about a year.",
      "I try to use new words at work.",
    ],
  },
  {
    id: "food",
    test: /\b(eat|ate|eating|food|lunch|dinner|breakfast|coffee|cook|cooked|restaurant|hungry|meal)\b/i,
    replies: [
      "That sounds good. What did you have?",
      "Do you cook at home, or eat out?",
      "Have you found any good places to eat around here?",
      "Is there any Korean food you miss?",
    ],
    hints: [
      "I had a sandwich and a coffee.",
      "I usually cook at home to save money.",
      "I really miss my mom's soup.",
    ],
  },
  {
    id: "travel",
    test: /\b(travel|trip|beach|city|visit|visited|weekend|holiday|drive|drove|road)\b/i,
    replies: [
      "That sounds fun. Where did you go?",
      "Who did you go with?",
      "Would you go back there again?",
      "What's the next place you want to see?",
    ],
    hints: [
      "I went to the beach with my housemates.",
      "I'd love to go back in summer.",
      "I want to visit the east coast next.",
    ],
  },
  {
    id: "house",
    test: /\b(house|home|room|flat|apartment|rent|bond|housemate|roommate|share)\b/i,
    replies: [
      "How's your place? Do you like living there?",
      "How many people do you live with?",
      "Is it far from where you work?",
      "Was it hard to find a room?",
    ],
    hints: [
      "It's small, but the people are nice.",
      "I live with four other people.",
      "It's about twenty minutes by bus.",
    ],
  },
  {
    id: "money",
    test: /\b(money|pay|paid|salary|wage|expensive|cheap|save|saving|budget|rent|cost)\b/i,
    replies: [
      "Is it easy to save money here?",
      "What's the most expensive thing for you?",
      "Are you saving up for something?",
      "How do you keep track of your spending?",
    ],
    hints: [
      "Rent takes most of my pay.",
      "I'm saving up for a trip.",
      "I write down everything I spend.",
    ],
  },
  {
    id: "health",
    test: /\b(sick|ill|doctor|hurt|pain|cold|flu|hospital|medicine|sleep|slept|rest)\b/i,
    replies: [
      "Oh no. Are you feeling any better?",
      "Did you get some rest?",
      "Have you seen a doctor about it?",
      "Make sure you take it easy today.",
    ],
    hints: [
      "A bit better, thanks. I slept early.",
      "Not yet, but I might go tomorrow.",
      "I'll rest after work.",
    ],
  },
  {
    id: "feeling-hard",
    test: /\b(tired|busy|stress|stressed|hard|difficult|tough|nervous|worried|lonely|miss)\b/i,
    replies: [
      "That sounds tough. What made it hard?",
      "How do you usually deal with days like that?",
      "Is there anything that helps you feel better?",
      "You're doing well, though. What went okay today?",
    ],
    hints: [
      "There were too many customers at once.",
      "I usually call my family when I feel like that.",
      "A walk after work helps.",
    ],
  },
  {
    id: "feeling-good",
    test: /\b(good|great|happy|fun|nice|enjoy|enjoyed|love|loved|excited|glad)\b/i,
    replies: [
      "That's great to hear. What made it good?",
      "Nice! Do you do that often?",
      "Sounds like a good day. Anything else happen?",
      "I'm glad. What are you looking forward to next?",
    ],
    hints: [
      "My manager said my English is improving.",
      "I finally finished a whole shift in English.",
      "I'm looking forward to the weekend.",
    ],
  },
  {
    id: "people",
    test: /\b(friend|friends|family|mum|mom|dad|brother|sister|met|meet|people|talk|talked)\b/i,
    replies: [
      "Nice. How did you meet them?",
      "What did you talk about?",
      "Do you see them often?",
      "Is it easy to make friends here?",
    ],
    hints: [
      "We met at work last month.",
      "We mostly talk about travel plans.",
      "It takes time, but people are friendly.",
    ],
  },
  {
    id: "weather",
    test: /\b(weather|hot|cold|rain|rained|sunny|wind|windy|storm|humid)\b/i,
    replies: [
      "The weather makes a big difference, doesn't it?",
      "What's the weather like where you're from?",
      "Do you prefer the heat or the cold?",
      "Did it change your plans today?",
    ],
    hints: [
      "It's much hotter than Korea.",
      "I prefer cooler weather.",
      "We stayed inside because of the rain.",
    ],
  },
  {
    id: "plan",
    test: /\b(will|gonna|going to|plan|planning|tomorrow|next week|next month|hope|want to)\b/i,
    replies: [
      "Sounds like a plan. When will you do it?",
      "What made you decide on that?",
      "Do you need to get anything ready first?",
      "Let me know how it goes. Anything else planned?",
    ],
    hints: [
      "I'm going to do it this weekend.",
      "I still need to book it.",
      "I want to try something new.",
    ],
  },
];

const FALLBACK: Record<ChatMode, string[]> = {
  free: [
    "That's a good start. Could you tell me one more detail?",
    "I see. Why did you decide to do that?",
    "Got it. How did you feel about it?",
    "Okay. What are you planning to do next?",
  ],
  journal: [
    "That sounds like a full day. What was the best part of it?",
    "Good. Was anything difficult today?",
    "Okay. Who did you spend time with?",
    "Alright. What will you do differently tomorrow?",
  ],
  role: [
    "Sure. Anything else I can help you with?",
    "No worries. Could you give me a bit more detail?",
    "Right. And when would that be?",
    "Great, that's all sorted. Is there anything else?",
  ],
};

const FALLBACK_HINT: Record<ChatMode, string> = {
  free: "Because I wanted to try something new.",
  journal: "It was busy, but I learned something new.",
  role: "Yes, please. That would be great.",
};

/** 한두 마디로 끝난 답. 더 말하게 밀어 준다. */
function tooShort(text: string) {
  return (text.trim().match(/[a-z']+/gi) ?? []).length < 4;
}

/** 학습자가 되물었는지. 그러면 먼저 대답해 주는 게 자연스럽다. */
function isQuestion(text: string) {
  return (
    text.includes("?") ||
    /^\s*(what|where|when|who|why|how|do|does|did|are|is|can|could|would|will|have|has)\b/i.test(
      text
    )
  );
}

const ANSWER_FIRST = [
  "Good question. For me, it depends on the day.",
  "Hmm, I'd say it's about the same as usual.",
  "Honestly, I'm not sure — what do you think?",
  "Mine was pretty quiet, thanks for asking.",
];

function pick<T>(list: T[], turn: number) {
  return list[turn % list.length];
}

export function localChatReply({
  mode,
  text,
  turn,
  scenario,
}: {
  mode: ChatMode;
  text: string;
  turn: number;
  scenario: Scenario | null;
}): LocalTurn {
  // 역할극은 그 자리의 대본을 한 걸음씩 진행시킨다.
  if (mode === "role" && scenario) {
    const beat = scenario.beats[turn];
    if (beat) return { reply: beat.say, hint: beat.hint };
    // 대본이 끝났으면 같은 자리를 반복하지 말고 다음으로 넘어가게 안내한다.
    return {
      reply:
        "That's everything sorted. Want to run through it again, or try another situation?",
      hint: "Let's try another one, thanks!",
    };
  }

  if (tooShort(text)) {
    return {
      reply: "Okay. Could you say a bit more about that?",
      hint: "Sure. It started when I got to work this morning.",
    };
  }

  const topic = TOPICS.find(t => t.test.test(text));
  if (topic) {
    const lead = isQuestion(text) ? `${pick(ANSWER_FIRST, turn)} ` : "";
    return {
      reply: lead + pick(topic.replies, turn),
      hint: pick(topic.hints, turn),
    };
  }

  return {
    reply: pick(FALLBACK[mode], turn),
    hint: FALLBACK_HINT[mode],
  };
}
