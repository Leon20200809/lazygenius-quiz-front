// app/page.tsx トップページ

import { SiteShell } from "@/components/layout/site-shell";
import { fetchSampleQuiz } from "@/features/quiz/api/fetch-sample-quiz";
import { QuizSection } from "@/features/quiz/components/quiz-section";

export default async function Home() {
  const sampleQuiz = await fetchSampleQuiz();

  return (
    <SiteShell>
      <QuizSection question={sampleQuiz.question} />
    </SiteShell>
  );
}