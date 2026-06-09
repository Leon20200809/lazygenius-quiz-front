import type {
  SubmitQuizRequest,
  SubmitQuizResponse,
} from "@/features/quiz/types/submit-quiz";

/**
 * 10問分の回答を一括採点APIへ送信する
 *
 * ブラウザからLaravel APIを直接呼ばず、
 * Next.jsのRoute Handlerを経由して回答を送信する。
 *
 * Route Handler:
 * POST /api/quizzes/submit
 *
 * Laravel API:
 * POST /api/quizzes/submit
 *
 * @param request_body 10問分の回答データ
 * @returns Laravel側で採点された結果
 */
export async function submitQuiz(
  request_body: SubmitQuizRequest,
): Promise<SubmitQuizResponse> {
  const response = await fetch("/api/quizzes/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request_body),
  });

  if (!response.ok) {
    throw new Error("クイズ回答の送信に失敗しました。");
  }

  const data: SubmitQuizResponse = await response.json();

  return data;
}