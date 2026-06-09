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
      className="
      w-full
      cursor-pointer
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      px-5
      py-4
      text-left
      font-bold
      text-slate-900
      transition
      hover:border-slate-400
      hover:bg-slate-200
      focus-visible:border-slate-950
      focus-visible:bg-slate-200
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-slate-950
      focus-visible:ring-offset-2
      active:scale-[0.99]
      active:bg-slate-300"
    >
      {choice}
    </button>
  );
}
