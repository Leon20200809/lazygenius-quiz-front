// Laravel APIへ選択した答えをPOSTする

import type {
  SampleAnswerRequest,
  SampleAnswerResponse,
} from "../types/quiz";

/**
 * Laravel APIへ仮クイズの回答を送信する
 */
export async function submitSampleAnswer(
  answer: SampleAnswerRequest,
): Promise<SampleAnswerResponse> {
  const response = await fetch("/api/quizzes/sample/answer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to submit sample answer");
  }

  const data: SampleAnswerResponse = await response.json();

  return data;
}