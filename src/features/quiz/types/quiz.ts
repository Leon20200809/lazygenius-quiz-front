export type QuizQuestion = {
  id: number;
  question_text: string;
  category: string;
  choices: string[];
};

export type SampleQuizResponse = {
  question: QuizQuestion;
};