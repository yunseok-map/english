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
}: {
  section: LearnSection;
  onSection: (next: LearnSection) => void;
}) {
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
      {section === "words" && <WordsScreen />}
      {section === "grammar" && <GrammarScreen />}
      {section === "pronunciation" && <PronunciationScreen />}
      {section === "packs" && <PacksScreen />}
      {section === "mistakes" && <MistakesScreen />}
    </div>
  );
}
