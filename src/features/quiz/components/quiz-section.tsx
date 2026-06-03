import type { QuizQuestion } from "../types/quiz";

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
            <button
              type="button"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left font-bold hover:bg-gray-100"
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}