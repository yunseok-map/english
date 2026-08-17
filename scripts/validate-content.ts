/**
 * 학습 콘텐츠 불변식 검사.
 *
 *   pnpm validate
 *
 * 콘텐츠는 손으로 쓰는 데이터라 타입 검사만으로는 안 잡히는 게 많다.
 * 정답 인덱스가 보기 범위를 벗어나거나, 레벨 테스트 한 칸의 문항 수가 맞지
 * 않거나, 한국어 해석이 빠지는 식이다. 실제로 레벨 테스트를 고칠 때마다
 * 임시 스크립트를 새로 써 왔는데, 그러면 다음 사람이(다음의 나도) 무엇을
 * 보장해야 하는지 알 수 없다. 규칙을 여기 한곳에 모은다.
 */
import { WORDS_A1 } from "../client/src/data/words/a1";
import { WORDS_A2 } from "../client/src/data/words/a2";
import { WORDS_B1 } from "../client/src/data/words/b1";
import { GRAMMAR_A1 } from "../client/src/data/grammar/a1";
import { GRAMMAR_A2 } from "../client/src/data/grammar/a2";
import { GRAMMAR_B1 } from "../client/src/data/grammar/b1";
import { PACKS } from "../client/src/data/packs";
import { DICTATION } from "../client/src/data/dictation";
import { PRONUNCIATION_COURSES } from "../client/src/data/pronunciation";
import { PLACEMENT_QUESTIONS } from "../client/src/data/placement";
import { CONTRACTIONS } from "../client/src/data/tone";
import type { PlacementQuestion, WordEntry } from "../client/src/data/types";
import type { Level } from "../client/src/types";

const errors: string[] = [];
const warnings: string[] = [];

const fail = (message: string) => errors.push(message);
const warn = (message: string) => warnings.push(message);

const LEVELS: Level[] = ["A1", "A2", "B1"];
const SECTIONS = ["vocab", "grammar", "usage"] as const;
const TOPICS = [
  "airport",
  "housing",
  "bank",
  "work",
  "cafe",
  "shopping",
  "transport",
  "health",
  "phone",
  "emergency",
  "social",
  "admin",
] as const;

/** id 가 겹치면 SRS 카드와 완료 기록이 엉킨다. 전 콘텐츠에 걸쳐 유일해야 한다. */
function checkUniqueIds(label: string, ids: string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) fail(`${label}: id 중복 — ${id}`);
    seen.add(id);
  }
}

// ─────────────────────────────── 단어 ───────────────────────────────

const WORDS: WordEntry[] = [...WORDS_A1, ...WORDS_A2, ...WORDS_B1];
checkUniqueIds(
  "단어",
  WORDS.map(w => w.id)
);

for (const [level, list] of [
  ["A1", WORDS_A1],
  ["A2", WORDS_A2],
  ["B1", WORDS_B1],
] as const) {
  if (list.length !== 120)
    fail(`단어 ${level}: 120개여야 하는데 ${list.length}개`);

  for (const topic of TOPICS) {
    const n = list.filter(w => w.topic === topic).length;
    if (n !== 10) fail(`단어 ${level}/${topic}: 10개여야 하는데 ${n}개`);
  }

  for (const w of list) {
    if (w.level !== level) fail(`단어 ${w.id}: level 이 ${w.level}`);
    const tones = w.examples
      .map(e => e.tone)
      .sort()
      .join(",");
    if (tones !== "business,daily,friend")
      fail(
        `단어 ${w.id}: 예문은 friend·daily·business 각 1개여야 함 (${tones})`
      );
    if (!w.meaning.trim()) fail(`단어 ${w.id}: meaning 이 비어 있음`);
    if (!w.hangul.trim()) fail(`단어 ${w.id}: hangul 이 비어 있음`);
    if (w.auOnly && !w.usEquivalent)
      fail(`단어 ${w.id}: auOnly 인데 usEquivalent 가 없음`);
    for (const e of w.examples) {
      if (!e.en.us.trim()) fail(`단어 ${w.id}: 예문 영어가 비어 있음`);
      if (!/[가-힣]/.test(e.ko)) fail(`단어 ${w.id}: 예문 해석에 한글이 없음`);
    }
  }
}

/**
 * 같은 표제어를 같은 뜻으로 두 레벨에 실으면, 상위 레벨에서 이미 아는 단어를
 * 다시 배우게 되고 그만큼 새 단어가 줄어든다. 뜻이 다르면(check = 계산서/수표)
 * 정당하므로 통과시킨다.
 */
{
  const byWord = new Map<string, { level: Level; meaning: string }[]>();
  for (const w of WORDS) {
    const key = w.word.us.toLowerCase();
    if (!byWord.has(key)) byWord.set(key, []);
    byWord.get(key)!.push({ level: w.level, meaning: w.meaning });
  }
  for (const [word, entries] of byWord) {
    if (entries.length < 2) continue;
    const meanings = new Set(entries.map(e => e.meaning));
    if (meanings.size === 1)
      fail(
        `단어 중복: "${word}" 가 ${entries.map(e => e.level).join("·")} 에 같은 뜻으로 실려 있음`
      );
    else
      warn(
        `단어 "${word}" 가 ${entries.map(e => e.level).join("·")} 에 다른 뜻으로 실려 있음 (의도된 것인지 확인)`
      );
  }
}

// ─────────────────────────────── 문법 ───────────────────────────────

const LESSONS = [...GRAMMAR_A1, ...GRAMMAR_A2, ...GRAMMAR_B1];
checkUniqueIds(
  "문법",
  LESSONS.map(l => l.id)
);

for (const [level, list] of [
  ["A1", GRAMMAR_A1],
  ["A2", GRAMMAR_A2],
  ["B1", GRAMMAR_B1],
] as const) {
  if (list.length !== 12)
    fail(`문법 ${level}: 12강이어야 하는데 ${list.length}강`);
  for (const lesson of list) {
    if (lesson.level !== level)
      fail(`문법 ${lesson.id}: level 이 ${lesson.level}`);
    if (lesson.examples.length < 4)
      fail(`문법 ${lesson.id}: 예문이 ${lesson.examples.length}개 (4개 이상)`);
    if (lesson.quiz.length !== 5)
      fail(`문법 ${lesson.id}: 퀴즈가 ${lesson.quiz.length}문항 (5문항)`);
    if (lesson.explanation.length < 3)
      fail(
        `문법 ${lesson.id}: 설명 문단이 ${lesson.explanation.length}개 (3개 이상)`
      );
    lesson.quiz.forEach((q, i) => {
      if (q.options.length !== 4)
        fail(
          `문법 ${lesson.id} 퀴즈 ${i + 1}: 보기가 ${q.options.length}개 (4개)`
        );
      if (q.answer < 0 || q.answer >= q.options.length)
        fail(
          `문법 ${lesson.id} 퀴즈 ${i + 1}: 정답 인덱스 ${q.answer} 가 범위 밖`
        );
      if (new Set(q.options).size !== q.options.length)
        fail(`문법 ${lesson.id} 퀴즈 ${i + 1}: 보기에 같은 값이 두 번 있음`);
      if (!q.explain.trim())
        fail(`문법 ${lesson.id} 퀴즈 ${i + 1}: 해설이 비어 있음`);
    });
  }
}

// ────────────────────────── 회화팩·받아쓰기·발음 ──────────────────────────

checkUniqueIds(
  "회화팩",
  PACKS.map(p => p.id)
);
for (const pack of PACKS) {
  if (pack.expressions.length < 12)
    fail(`회화팩 ${pack.id}: 표현이 ${pack.expressions.length}개 (12개 이상)`);
  if (pack.roleplay.length < 10)
    fail(`회화팩 ${pack.id}: 롤플레이가 ${pack.roleplay.length}줄 (10줄 이상)`);
  for (const line of pack.roleplay)
    if (!/[가-힣]/.test(line.ko))
      fail(`회화팩 ${pack.id}: 롤플레이 해석에 한글이 없음 — ${line.en.us}`);
}
for (const level of LEVELS) {
  const n = PACKS.filter(p => p.level === level).length;
  if (n < 5) warn(`회화팩 ${level}: ${n}개뿐 (다른 레벨과 균형 확인)`);
}

checkUniqueIds(
  "받아쓰기",
  DICTATION.map(d => d.id)
);
for (const level of LEVELS) {
  const n = DICTATION.filter(d => d.level === level).length;
  if (n !== 30) fail(`받아쓰기 ${level}: 30문장이어야 하는데 ${n}문장`);
}

checkUniqueIds(
  "발음",
  PRONUNCIATION_COURSES.map(c => c.id)
);
for (const course of PRONUNCIATION_COURSES) {
  if (!LEVELS.includes(course.level))
    fail(`발음 ${course.id}: level 이 없거나 잘못됨`);
  if (course.pairs.length < 10)
    fail(
      `발음 ${course.id}: 최소대립쌍이 ${course.pairs.length}쌍 (10쌍 이상)`
    );
  if (course.sentences.length < 5)
    fail(
      `발음 ${course.id}: 연습 문장이 ${course.sentences.length}개 (5개 이상)`
    );
}

for (const pair of CONTRACTIONS) {
  if (!pair.short.trim() || !pair.full.trim())
    fail(`축약형: 빈 항목 — ${JSON.stringify(pair)}`);
}

// ───────────────────────────── 레벨 테스트 ─────────────────────────────

checkUniqueIds(
  "레벨 테스트",
  PLACEMENT_QUESTIONS.map(q => q.id)
);

/** 지문에서 영어 문장 부분. 화면(QuestionText)과 같은 규칙으로 잘라 낸다. */
function body(question: PlacementQuestion) {
  const at = question.question.indexOf("—");
  return at < 0 ? "" : question.question.slice(at + 1).trim();
}

for (const band of LEVELS) {
  for (const section of SECTIONS) {
    const cell = PLACEMENT_QUESTIONS.filter(
      q => q.band === band && q.section === section
    );
    if (cell.length !== 12)
      fail(
        `레벨 테스트 ${band}/${section}: 12문항이어야 하는데 ${cell.length}문항`
      );
    // buildPlacementSet 이 칸마다 직접입력 1 · 오류찾기 1 · 4지선다 2 를 뽑는다.
    // 회차마다 겹치지 않게 하려면 유형별로 넉넉히 쌓여 있어야 한다.
    const counts = {
      fill: cell.filter(q => q.kind === "fill").length,
      error: cell.filter(q => q.kind === "error").length,
      choice: cell.filter(q => !q.kind || q.kind === "choice").length,
    };
    if (counts.fill !== 3)
      fail(
        `레벨 테스트 ${band}/${section}: 직접입력이 ${counts.fill}문항 (3문항)`
      );
    if (counts.error !== 2)
      fail(
        `레벨 테스트 ${band}/${section}: 오류찾기가 ${counts.error}문항 (2문항)`
      );
    if (counts.choice !== 7)
      fail(
        `레벨 테스트 ${band}/${section}: 4지선다가 ${counts.choice}문항 (7문항)`
      );
  }
}

for (const q of PLACEMENT_QUESTIONS) {
  if (!q.explain.trim()) fail(`레벨 테스트 ${q.id}: 해설이 비어 있음`);

  if (q.kind === "fill") {
    if (q.accept.length === 0) fail(`레벨 테스트 ${q.id}: accept 가 비어 있음`);
    for (const a of q.accept)
      if (!a.trim()) fail(`레벨 테스트 ${q.id}: accept 에 빈 값`);
  } else {
    if (q.options.length !== 4)
      fail(`레벨 테스트 ${q.id}: 보기가 ${q.options.length}개 (4개)`);
    if (q.answer < 0 || q.answer >= q.options.length)
      fail(`레벨 테스트 ${q.id}: 정답 인덱스 ${q.answer} 가 범위 밖`);
    if (new Set(q.options).size !== q.options.length)
      fail(`레벨 테스트 ${q.id}: 보기에 같은 값이 두 번 있음`);
  }

  // 오류찾기는 지문을 " / " 로 넷으로 쪼갠 것이 그대로 보기가 된다.
  // 어긋나면 화면에서 밑줄 친 토막과 고른 보기가 다른 것을 가리킨다.
  if (q.kind === "error" && "options" in q) {
    const parts = body(q)
      .split("/")
      .map(s => s.trim().replace(/[.?!]+$/, ""));
    if (parts.length !== q.options.length)
      fail(
        `레벨 테스트 ${q.id}: 지문 토막 ${parts.length}개 ≠ 보기 ${q.options.length}개`
      );
    else
      q.options.forEach((option, i) => {
        if (parts[i] !== option.trim().replace(/[.?!]+$/, ""))
          fail(
            `레벨 테스트 ${q.id}: ${i + 1}번 토막 "${parts[i]}" ≠ 보기 "${option}"`
          );
      });
  }

  // 한국어 해석. 푸는 동안에는 숨기고 채점 뒤에만 보여 주므로, 빈칸을 정답으로
  // 채운 완성 문장이어야 한다. 밑줄이 남아 있으면 옮기다 만 것이다.
  if (body(q)) {
    if (!q.ko) fail(`레벨 테스트 ${q.id}: 영어 지문이 있는데 ko 가 없음`);
    else {
      if (!/[가-힣]/.test(q.ko)) fail(`레벨 테스트 ${q.id}: ko 에 한글이 없음`);
      if (q.ko.includes("_"))
        fail(`레벨 테스트 ${q.id}: ko 에 빈칸(_)이 남아 있음`);
    }
  }
}

// ─────────────────────────────── 결과 ───────────────────────────────

for (const message of warnings) console.warn(`⚠ ${message}`);
if (errors.length > 0) {
  for (const message of errors) console.error(`✗ ${message}`);
  console.error(`\n${errors.length}건 실패`);
  process.exit(1);
}

console.log(
  [
    `✓ 콘텐츠 검사 통과`,
    `  단어 ${WORDS.length} · 문법 ${LESSONS.length}강(퀴즈 ${LESSONS.reduce((n, l) => n + l.quiz.length, 0)}문항)`,
    `  회화팩 ${PACKS.length} · 받아쓰기 ${DICTATION.length} · 발음 ${PRONUNCIATION_COURSES.length}코스`,
    `  레벨 테스트 ${PLACEMENT_QUESTIONS.length}문항 · 축약형 ${CONTRACTIONS.length}쌍`,
    warnings.length ? `  경고 ${warnings.length}건` : "",
  ]
    .filter(Boolean)
    .join("\n")
);
