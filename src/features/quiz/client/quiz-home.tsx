// quiz-home.tsx introかquizかを切り替える
"use client";

import { useState } from "react";
import { QuizIntroSection } from "@/features/quiz/components/quiz-intro-section";
import { QuizPlayer } from "@/features/quiz/client/quiz-player";
import { QuizResultSection } from "@/features/quiz/components/quiz-result-section";
import type { SubmitQuizResponse } from "@/features/quiz/types/submit-quiz";

type ScreenMode = "intro" | "quiz" | "result";

export function QuizHome() {
  const [screen_mode, set_screen_mode] = useState<ScreenMode>("intro");

  // Laravelから返された採点結果を保持する
  const [quiz_result, setQuizResult] = useState<SubmitQuizResponse | null>(
    null,
  );

  /**
   * クイズを開始する
   */
  const handleStartQuiz = () => {
    set_screen_mode("quiz");
  };

  /**
   * QuizPlayerから採点結果を受け取り、
   * リザルト画面へ切り替える
   */
  const handleQuizComplete = (result: SubmitQuizResponse) => {
    setQuizResult(result);
    set_screen_mode("result");
  };

  /**
   * 採点結果を破棄してイントロ画面へ戻る
   */
  const handleBackToIntro = () => {
    setQuizResult(null);
    set_screen_mode("intro");
  };

  // クイズタイトル画面
  const intro_content = <QuizIntroSection onStartQuiz={handleStartQuiz} />;

  // クイズ問題画面
  const quiz_content = <QuizPlayer onComplete={handleQuizComplete} />;

  // クイズ採点結果画面
  const result_content = quiz_result ? (
    <QuizResultSection result={quiz_result} onBackToIntro={handleBackToIntro} />
  ) : null;

  if (screen_mode === "quiz") {
    return quiz_content;
  }

  if (screen_mode === "result") {
    return result_content;
  }

  return intro_content;
}
