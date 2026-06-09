import { env } from "@/lib/env";

import type {
  SubmitQuizRequest,
  SubmitQuizResponse,
} from "@/features/quiz/types/submit-quiz";

/**
 * クイズ一括採点APIの中継処理
 *
 * ブラウザから受け取った10問分の回答を、
 * Next.jsサーバー側からLaravel APIへ転送する。
 *
 * ブラウザ:
 * POST /api/quizzes/submit
 *
 * Laravel API:
 * POST /api/quizzes/submit
 *
 * Laravel APIの実URLはブラウザへ公開しない。
 */
export async function POST(request: Request) {
  // ブラウザから送られた回答JSONを受け取る
  const request_body: SubmitQuizRequest = await request.json();

  // サーバー専用環境変数からLaravel APIのURLを取得する
  const api_base_url = env.laravelApiBaseUrl;

  // 10問分の回答をLaravel APIへ転送する
  const response = await fetch(`${api_base_url}/api/quizzes/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(request_body),
    cache: "no-store",
  });

  // Laravelから返されたJSONを受け取る
  const data = await response.json();

  // Laravel側でバリデーションエラーなどが発生した場合、
  // 同じHTTPステータスコードとレスポンスをブラウザへ返す
  if (!response.ok) {
    return Response.json(data, {
      status: response.status,
    });
  }

  // 正常時は採点結果として扱う
  const submit_quiz_response: SubmitQuizResponse = data;

  return Response.json(submit_quiz_response);
}