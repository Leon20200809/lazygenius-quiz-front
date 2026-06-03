import { fetchSampleQuiz } from "@/features/quiz/api/fetch-sample-quiz";

export default async function Home() {
  const sampleQuiz = await fetchSampleQuiz();

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold text-gray-500">
          {sampleQuiz.question.category}
        </p>

        <h1 className="mb-8 text-3xl font-bold">
          {sampleQuiz.question.question_text}
        </h1>

        <ul className="grid gap-4">
          {sampleQuiz.question.choices.map((choice) => (
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
    </main>
  );
}