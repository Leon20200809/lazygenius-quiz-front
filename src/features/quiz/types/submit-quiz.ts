/**
 * ユーザーが選択した1問分の回答
 */
export type QuizAnswer = {
  question_id: number;
  selected_answer: string;
};

/**
 * 10問分の回答を一括採点APIへ送るリクエスト
 */
export type SubmitQuizRequest = {
  answers: QuizAnswer[];
};

/**
 * 1問分の採点結果
 */
export type QuizResult = {
  question_id: number;
  question_text: string;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
};

/**
 * 一括採点APIから返されるレスポンス
 */
export type SubmitQuizResponse = {
  score: number;
  total: number;
  results: QuizResult[];
};