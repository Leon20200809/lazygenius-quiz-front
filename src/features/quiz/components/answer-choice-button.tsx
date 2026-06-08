type AnswerChoiceButtonProps = {
  choice: string;
  onSelectAnswer: (selected_answer: string) => void;
};

export function AnswerChoiceButton({
  choice,
  onSelectAnswer,
}: AnswerChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelectAnswer(choice)}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-left font-bold text-slate-900 transition hover:bg-slate-100"
    >
      {choice}
    </button>
  );
}