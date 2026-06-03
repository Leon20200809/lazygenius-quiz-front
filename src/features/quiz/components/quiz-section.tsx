import type { QuizQuestion } from "../types/quiz";
import { AnswerChoiceButton } from "./answer-choice-button";

type QuizSectionProps = {
  question: QuizQuestion;
};

export function QuizSection({ question }: QuizSectionProps) {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="mb-3 text-sm font-bold text-gray-500">
        {question.category}
      </p>

      <h1 className="mb-8 text-3xl font-bold">
        {question.question_text}
      </h1>

      <ul className="grid gap-4">
        {question.choices.map((choice) => (
          <li key={choice}>
            <AnswerChoiceButton choice={choice} />
          </li>
        ))}
      </ul>
    </section>
  );
}