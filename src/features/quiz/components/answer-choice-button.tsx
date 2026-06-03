"use client";

import { submitSampleAnswer } from "../api/submit-sample-answer";

type AnswerChoiceButtonProps = {
  questionId: number;
  choice: string;
};

export function AnswerChoiceButton({questionId, choice,}: AnswerChoiceButtonProps) {
  async function handleClick() {
    const result = await submitSampleAnswer({
      question_id: questionId,
      selected_answer: choice,
    });

    console.log("判定結果:", result);
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