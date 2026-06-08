import type { QuizQuestion } from "../types/quiz-question";
import { AnswerChoiceButton } from "./answer-choice-button";

type QuizSectionProps = {
  question: QuizQuestion;
  onSelectAnswer: (selected_answer: string) => void;
};

export function QuizSection({ question, onSelectAnswer }: QuizSectionProps) {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* カテゴリ表示 */}
      <p className="mb-3 text-sm font-bold text-gray-500">
        {question.category}
      </p>

      {/* 問題文 */}
      <h1 className="mb-8 text-3xl font-bold">{question.question_text}</h1>

      {/* 選択肢リスト */}
      <ul className="grid gap-4">
        {question.choices.map((choice) => (
          <li key={choice}>
            <AnswerChoiceButton
              choice={choice}
              onSelectAnswer={onSelectAnswer}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}