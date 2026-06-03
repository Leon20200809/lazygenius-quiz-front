import { env } from "@/lib/env";
import type { SampleQuizResponse } from "../types/quiz";

/**
 * Laravel APIから仮のクイズ1問を取得する
 */
export async function fetchSampleQuiz(): Promise<SampleQuizResponse> {
  const response = await fetch(`${env.laravelApiBaseUrl}/api/quizzes/sample`);

  if (!response.ok) {
    throw new Error("Failed to fetch sample quiz");
  }

  const data: SampleQuizResponse = await response.json();

  return data;
}