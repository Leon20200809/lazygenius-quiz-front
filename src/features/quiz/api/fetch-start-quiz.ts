import type { StartQuizResponse } from "@/features/quiz/types/start-quiz";

/**
 * クイズ開始用の問題データを取得する(10問)
 *
 * ブラウザから Laravel API を直接叩かず、
 * Next.js の Route Handler 経由でクイズ開始データを取得する。
 *
 * Route Handler:
 * /api/quizzes/start
 *
 * Laravel API:
 * /api/quizzes/start
 *
 * @returns クイズ開始用レスポンス
 */
export async function fetchStartQuiz(): Promise<StartQuizResponse> {
  const response = await fetch("/api/quizzes/start", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("クイズ開始用データの取得に失敗しました。");
  }

  const data: StartQuizResponse = await response.json();

  return data;
}