export type QuizQuestion = {
  id: number;
  question_text: string;
  category: string;
  choices: string[];
};

export type QuizStartResponse = {
  questions: QuizQuestion[];
};

export type StartQuizResponse = {
  questions: QuizQuestion[];
};

export type SampleQuizResponse = {
  question: QuizQuestion;
};

export type SampleAnswerRequest = {
  question_id: number;
  selected_answer: string;
};

export type SampleAnswerResponse = {
  is_correct: boolean;
  correct_answer: string;
};


