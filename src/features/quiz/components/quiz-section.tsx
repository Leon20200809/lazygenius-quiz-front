import type { QuizQuestion } from "../types/quiz";
import { AnswerChoiceButton } from "./answer-choice-button";

type QuizSectionProps = {
  question: QuizQuestion;
};

export function QuizSection({ question }: QuizSectionProps) {
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
            <AnswerChoiceButton questionId={question.id} choice={choice} />
          </li>
        ))}
      </ul>
    </section>
  );
}
