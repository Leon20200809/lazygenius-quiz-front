import type { SubmitQuizResponse } from "@/features/quiz/types/submit-quiz";

type QuizResultSectionProps = {
  result: SubmitQuizResponse;
  onBackToIntro: () => void;
};

/**
 * クイズの採点結果を表示する
 *
 * 全体の得点と、各問題の正誤・選択した回答・正解を表示する。
 *
 * @param result Laravel APIから返された採点結果
 * @param onBackToIntro イントロ画面へ戻る処理
 */
export function QuizResultSection({
  result,
  onBackToIntro,
}: QuizResultSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {/* 全体結果 */}
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
          Quiz Result
        </p>

        <h1 className="mb-4 text-4xl font-bold text-slate-950">
          クイズ結果
        </h1>

        <p className="text-2xl font-bold text-slate-800">
          {result.total}問中 {result.score}問正解
        </p>
      </header>

      {/* 問題ごとの採点結果 */}
      <ol className="grid gap-5">
        {result.results.map((quiz_result, index) => {
          const result_label = quiz_result.is_correct ? "正解" : "不正解";

          const result_class_name = quiz_result.is_correct
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50";

          return (
            <li
              key={quiz_result.question_id}
              className={`rounded-2xl border p-6 ${result_class_name}`}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-slate-500">
                  問題 {index + 1}
                </p>

                <p className="font-bold text-slate-900">
                  {result_label}
                </p>
              </div>

              <h2 className="mb-5 text-xl font-bold text-slate-950">
                {quiz_result.question_text}
              </h2>

              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="font-bold text-slate-500">
                    あなたの回答
                  </dt>

                  <dd className="mt-1 text-base text-slate-900">
                    {quiz_result.selected_answer}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold text-slate-500">
                    正解
                  </dt>

                  <dd className="mt-1 text-base font-bold text-slate-950">
                    {quiz_result.correct_answer}
                  </dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ol>

      {/* イントロ画面へ戻る */}
      <button
        type="button"
        onClick={onBackToIntro}
        className="mx-auto mt-10 block cursor-pointer rounded-full bg-slate-950 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 active:scale-95"
      >
        トップへ戻る
      </button>
    </section>
  );
}