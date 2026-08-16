/**
 * 규칙 기반 문법 점검.
 *
 * AI 키가 없어도 대화 모드가 "점검"을 해 줘야 한다. 예전에는 규칙이 사실상
 * 하나뿐이라(과거형 하나, 한국어 감지 하나) 무엇을 써도 지적이 없었다.
 *
 * 한국어 화자가 실제로 자주 틀리는 것만 골라 담았다. 넓게 잡다가 멀쩡한 문장을
 * 틀렸다고 하면 신뢰를 잃으므로, 애매하면 규칙을 넣지 않는 쪽을 택했다.
 */

export type GrammarIssue = {
  /** 규칙 식별자. 같은 실수를 오답노트에 중복으로 쌓지 않기 위해 쓴다. */
  id: string;
  /** high = 뜻이 틀어지는 실수, low = 다듬으면 좋은 정도 */
  severity: "high" | "low";
  /** 한국어 설명 */
  message: string;
  /** 고쳐 쓴 문장 (규칙이 자신 있을 때만) */
  fixed?: string;
};

type Rule = {
  id: string;
  severity: GrammarIssue["severity"];
  test: RegExp;
  message: string;
  fix?: (text: string) => string;
};

/** 과거 시간 표현이 있는데 현재형을 쓴 경우를 잡기 위한 최소 불규칙 사전. */
const PAST: Record<string, string> = {
  go: "went",
  goes: "went",
  come: "came",
  comes: "came",
  eat: "ate",
  eats: "ate",
  see: "saw",
  sees: "saw",
  buy: "bought",
  buys: "bought",
  get: "got",
  gets: "got",
  take: "took",
  takes: "took",
  make: "made",
  makes: "made",
  meet: "met",
  meets: "met",
  do: "did",
  does: "did",
  say: "said",
  says: "said",
  give: "gave",
  gives: "gave",
  find: "found",
  finds: "found",
  send: "sent",
  sends: "sent",
  pay: "paid",
  pays: "paid",
  leave: "left",
  leaves: "left",
  write: "wrote",
  writes: "wrote",
  drink: "drank",
  drinks: "drank",
  work: "worked",
  works: "worked",
  study: "studied",
  studies: "studied",
  call: "called",
  calls: "called",
  start: "started",
  starts: "started",
  finish: "finished",
  finishes: "finished",
};

const PAST_MARKER =
  /\b(yesterday|last night|last week|last month|last year|ago|this morning|earlier today)\b/i;

const RULES: Rule[] = [
  {
    id: "be-bare-verb",
    severity: "high",
    test: /\b(am|is|are|was|were)\s+(go|come|eat|work|study|live|like|want|need|have|know|think)\b/i,
    message:
      "be동사 뒤에 동사원형은 못 와요. 진행형이면 -ing, 아니면 be동사를 빼세요. (I am go → I go / I am going)",
  },
  {
    id: "want-bare-verb",
    severity: "high",
    test: /\b(want|need|hope|plan|decide|would like)\s+(go|come|eat|work|study|buy|meet|see|stay|start)\b/i,
    message: "want·need·plan 뒤에는 to가 필요해요. (I want go → I want to go)",
  },
  {
    id: "gerund-verb",
    severity: "high",
    test: /\b(enjoy|finish|avoid|mind|suggest|practice|keep)\s+to\s+[a-z]+/i,
    message:
      "enjoy·finish·avoid·mind·suggest 뒤에는 -ing를 써요. (enjoy to cook → enjoy cooking)",
  },
  {
    id: "did-past",
    severity: "high",
    test: /\b(did|didn't|did not)\s+(went|ate|saw|bought|took|made|came|got|had|said)\b/i,
    message:
      "did 뒤에는 동사원형이 와요. (Did you went → Did you go / I didn't went → I didn't go)",
  },
  {
    id: "im-agree",
    severity: "high",
    test: /\bi\s*('m|am)\s+agree\b/i,
    message: "agree는 동사예요. (I'm agree → I agree)",
    fix: t => t.replace(/\bi\s*('m|am)\s+agree\b/gi, "I agree"),
  },
  {
    id: "discuss-about",
    severity: "high",
    test: /\bdiscuss\s+about\b/i,
    message:
      "discuss는 about 없이 바로 목적어를 받아요. (discuss about → discuss)",
    fix: t => t.replace(/\bdiscuss\s+about\b/gi, "discuss"),
  },
  {
    id: "married-with",
    severity: "high",
    test: /\bmarried\s+with\b/i,
    message: "married 뒤에는 to를 써요. (married with → married to)",
    fix: t => t.replace(/\bmarried\s+with\b/gi, "married to"),
  },
  {
    id: "borrow-lend",
    severity: "high",
    test: /\b(can|could)\s+you\s+borrow\s+me\b/i,
    message:
      "빌려 주는 쪽은 lend예요. (Can you borrow me → Can you lend me / Can I borrow)",
  },
  {
    id: "age-have",
    severity: "high",
    test: /\bi\s+have\s+\d{1,2}\s+years?\s+old\b/i,
    message: "나이는 be동사로 말해요. (I have 20 years old → I'm 20 years old)",
    fix: t =>
      t.replace(
        /\bi\s+have\s+(\d{1,2})\s+years?\s+old\b/gi,
        "I'm $1 years old"
      ),
  },
  {
    id: "to-home",
    severity: "high",
    test: /\bgo(es|ing)?\s+to\s+home\b/i,
    message: "home 앞에는 to를 쓰지 않아요. (go to home → go home)",
    fix: t => t.replace(/\b(go(?:es|ing)?)\s+to\s+home\b/gi, "$1 home"),
  },
  {
    id: "uncountable-plural",
    severity: "high",
    test: /\b(informations|advices|furnitures|equipments|homeworks|moneys)\b/i,
    message:
      "셀 수 없는 명사라 복수형이 없어요. (informations → information, advices → advice)",
  },
  {
    id: "many-uncountable",
    severity: "low",
    test: /\bmany\s+(information|advice|money|furniture|homework|equipment)\b/i,
    message:
      "셀 수 없는 명사에는 much를 써요. (many information → much information)",
  },
  {
    id: "weekday-preposition",
    severity: "high",
    test: /\bin\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    message: "요일 앞에는 on을 써요. (in Monday → on Monday)",
    fix: t =>
      t.replace(
        /\bin\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi,
        (_, day: string) => `on ${day[0].toUpperCase()}${day.slice(1)}`
      ),
  },
  {
    id: "night-preposition",
    severity: "low",
    test: /\b(in|on)\s+the\s+night\b/i,
    message: "밤에는 at night 이라고 해요.",
    fix: t => t.replace(/\b(in|on)\s+the\s+night\b/gi, "at night"),
  },
  {
    id: "almost-people",
    severity: "high",
    test: /\balmost\s+(people|students|of\s+them)\b/i,
    message: "almost는 부사예요. (almost people → most people)",
  },
  {
    id: "article-an",
    severity: "low",
    test: /\ba\s+(a|e|i|o|u)[a-z]+\b/i,
    message: "모음 소리로 시작하는 단어 앞에는 an을 써요. (a apple → an apple)",
  },
  {
    id: "article-a",
    severity: "low",
    test: /\ban\s+(b|c|d|f|g|j|k|l|m|n|p|q|r|s|t|v|w|y|z)[a-z]+\b/i,
    message: "자음 소리로 시작하는 단어 앞에는 a를 써요. (an car → a car)",
  },
  {
    id: "too-much-adj",
    severity: "low",
    test: /\btoo\s+much\s+(good|bad|big|small|hard|easy|expensive|cheap|busy|tired)\b/i,
    message: "형용사 앞에는 too만 써요. (too much expensive → too expensive)",
    fix: t =>
      t.replace(
        /\btoo\s+much\s+(good|bad|big|small|hard|easy|expensive|cheap|busy|tired)\b/gi,
        "too $1"
      ),
  },
  {
    id: "third-person-s",
    severity: "low",
    test: /\b(he|she|it)\s+(go|come|eat|work|study|live|like|want|need|have|know|think|make|take)\b/i,
    message:
      "he·she·it 뒤 동사에는 -s가 붙어요. (He go → He goes / He have → He has)",
  },
];

/** 한국어가 섞였는지. 영어로 바꿔 보라고 안내한다. */
function hasKorean(text: string) {
  return /[가-힣]/.test(text);
}

/** 과거 시간 표현이 있는데 동사를 현재형으로 쓴 경우. */
function pastTenseIssue(text: string): GrammarIssue | null {
  if (!PAST_MARKER.test(text)) return null;
  const words = text.toLowerCase().match(/\b[a-z']+\b/g) ?? [];
  for (const word of words) {
    const past = PAST[word];
    if (!past) continue;
    // "will go tomorrow ... yesterday" 같은 미래·조동사 문장은 건드리지 않는다.
    if (
      /\b(will|would|can|could|should|may|might|to)\s+$/i.test(
        text.slice(0, text.toLowerCase().indexOf(word))
      )
    )
      continue;
    return {
      id: "past-tense",
      severity: "high",
      message: `과거 시점을 말하고 있으니 ${word} 대신 ${past}를 써요.`,
      fixed: text.replace(new RegExp(`\\b${word}\\b`, "i"), past),
    };
  }
  return null;
}

/**
 * 문장을 점검해 문제를 돌려준다. 문제가 없으면 빈 배열.
 * 같은 문장에서 규칙이 여러 개 걸리면 심각한 것부터 최대 3개까지.
 */
export function checkGrammar(text: string): GrammarIssue[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const issues: GrammarIssue[] = [];

  if (hasKorean(trimmed)) {
    issues.push({
      id: "korean",
      severity: "high",
      message:
        "한국어가 섞였어요. 아는 단어만으로도 괜찮으니 영어로 다시 말해 볼까요?",
    });
  }

  const past = pastTenseIssue(trimmed);
  if (past) issues.push(past);

  for (const rule of RULES) {
    if (!rule.test.test(trimmed)) continue;
    issues.push({
      id: rule.id,
      severity: rule.severity,
      message: rule.message,
      fixed: rule.fix?.(trimmed),
    });
  }

  return issues
    .sort((a, b) =>
      a.severity === b.severity ? 0 : a.severity === "high" ? -1 : 1
    )
    .slice(0, 3);
}

/** 오답노트·화면에 넣을 한 줄로 합친다. */
export function summarizeIssues(issues: GrammarIssue[]): string | undefined {
  if (issues.length === 0) return undefined;
  const first = issues[0];
  const rest =
    issues.length > 1 ? ` (그 밖에 ${issues.length - 1}가지 더)` : "";
  return `${first.message}${first.fixed ? `\n→ ${first.fixed}` : ""}${rest}`;
}
