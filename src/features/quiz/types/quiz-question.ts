// 問題そのもの
export type QuizQuestion = {
  id: number;
  question_text: string;
  category: string;
  choices: string[];
};