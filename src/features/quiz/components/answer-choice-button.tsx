"use client";

type AnswerChoiceButtonProps = {
  choice: string;
};

export function AnswerChoiceButton({ choice }: AnswerChoiceButtonProps) {
  function handleClick() {
    console.log("選択した答え:", choice);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-left font-bold transition-colors hover:border-gray-500 hover:bg-green-300"
    >
      {choice}
    </button>
  );
}