// 仮の1問採点API リクエスト
export type SampleAnswerRequest = {
  question_id: number;
  selected_answer: string;
};

// 仮の1問採点API レスポンス
export type SampleAnswerResponse = {
  is_correct: boolean;
  correct_answer: string;
};