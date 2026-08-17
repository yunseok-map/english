import { useEffect } from "react";
import { stopSpeaking } from "@/lib/speech";
import { WordsScreen } from "@/screens/learn/WordsScreen";
import { GrammarScreen } from "@/screens/learn/GrammarScreen";
import { PronunciationScreen } from "@/screens/learn/PronunciationScreen";
import { PacksScreen } from "@/screens/learn/PacksScreen";
import { MistakesScreen } from "@/screens/learn/MistakesScreen";

export type LearnSection =
  | "words"
  | "grammar"
  | "pronunciation"
  | "packs"
  | "mistakes";

/**
 * 홈의 오늘의 루트에서 넘어올 때 "무엇을 하러 왔는지".
 *
 * 예전에는 탭만 열어 줘서 "복습 카드 12장" 을 눌러도 단어 탭 첫 화면이 뜨고,
 * 거기서 모드를 다시 골라야 했다. 누른 그 학습이 바로 시작되게 한다.
 */
export type LearnIntent = "words" | "review" | "speak" | "dictation";

const TABS: Array<{ id: LearnSection; label: string }> = [
  { id: "words", label: "단어" },
  { id: "grammar", label: "문법" },
  { id: "pronunciation", label: "발음" },
  { id: "packs", label: "회화팩" },
  { id: "mistakes", label: "오답노트" },
];

export function LearnScreen({
  section,
  onSection,
  intent,
  onIntentDone,
}: {
  section: LearnSection;
  onSection: (next: LearnSection) => void;
  /** 홈에서 특정 학습을 눌러 들어왔을 때만 채워진다. */
  intent?: LearnIntent;
  onIntentDone?: () => void;
}) {
  // 학습 탭을 옮길 때도 읽던 소리를 끊는다.
  useEffect(() => {
    stopSpeaking();
  }, [section]);

  return (
    <div className="space-y-4">
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onSection(tab.id)}
              aria-pressed={section === tab.id}
              className={`min-h-10 whitespace-nowrap rounded-full border px-4 text-[0.875rem] font-semibold transition-colors ${
                section === tab.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:border-ring"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {section === "words" && (
        <WordsScreen intent={intent} onIntentDone={onIntentDone} />
      )}
      {section === "grammar" && <GrammarScreen />}
      {section === "pronunciation" && <PronunciationScreen />}
      {section === "packs" && <PacksScreen />}
      {section === "mistakes" && <MistakesScreen />}
    </div>
  );
}
