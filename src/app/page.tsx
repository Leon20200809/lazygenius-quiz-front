// app/page.tsx トップページ

import { SiteShell } from "@/components/layout/site-shell";
import { QuizHome } from "@/features/quiz/client/quiz-home";
import { fetchSampleQuiz } from "@/features/quiz/api/fetch-sample-quiz";
import { QuizSection } from "@/features/quiz/components/quiz-section";

export default async function Home() {
  const sampleQuiz = await fetchSampleQuiz();

  return (
    <SiteShell>
      <QuizHome question={sampleQuiz.question} />
    </SiteShell>
  );
}