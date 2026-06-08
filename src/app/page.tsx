// app/page.tsx
// トップページ

import { SiteShell } from "@/components/layout/site-shell";
import { QuizHome } from "@/features/quiz/client/quiz-home";

/**
 * トップページ
 *
 * このページでは、サイト全体の外枠であるSiteShellの中に
 * クイズ開始画面であるQuizHomeを表示する。
 *
 * 10問取得やクイズ進行はQuizHomeの先にあるQuizPlayerが担当するため、
 * page.tsxではAPI通信を行わない。
 */
export default function Home() {
  return (
    <SiteShell>
      <QuizHome />
    </SiteShell>
  );
}