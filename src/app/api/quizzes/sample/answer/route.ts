import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import type {
  SampleAnswerRequest,
  SampleAnswerResponse,
} from "@/features/quiz/types/quiz";

/**
 * Next.js Route Handler
 *
 * Client Componentから回答を受け取り、
 * Laravel APIへ中継する。
 */
export async function POST(request: Request) {
  const answer: SampleAnswerRequest = await request.json();

  const response = await fetch(
    `${env.laravelApiBaseUrl}/api/quizzes/sample/answer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        message: "Failed to submit answer to Laravel API",
      },
      {
        status: response.status,
      },
    );
  }

  const data: SampleAnswerResponse = await response.json();

  return NextResponse.json(data);
}