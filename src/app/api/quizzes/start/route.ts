import { env } from "@/lib/env";
import type { StartQuizResponse } from "@/features/quiz/types/quiz";

/**
 * クイズ開始APIの中継処理
 *
 * ブラウザからは Next.js の /api/quizzes/start を叩く。
 * Next.js サーバー側で Laravel API の /api/quizzes/start へリクエストを送り、
 * 取得した10問分のクイズデータをそのまま返す。
 *
 * Laravel API の実URLはブラウザへ公開しない。
 */
export async function GET() {
  const api_base_url = env.laravelApiBaseUrl;

  const response = await fetch(`${api_base_url}/api/quizzes/start`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return Response.json(
      {
        message: "Laravel APIからクイズ開始用データを取得できませんでした。",
      },
      {
        status: response.status,
      },
    );
  }

  const data: StartQuizResponse = await response.json();

  return Response.json(data);
}