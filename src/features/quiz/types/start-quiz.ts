// 10問開始API
import type { QuizQuestion } from "./quiz-question";

export type StartQuizResponse = {
  questions: QuizQuestion[];
};