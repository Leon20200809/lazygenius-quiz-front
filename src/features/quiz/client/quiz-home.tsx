// quiz-home.tsx introかquizかを切り替える
"use client";

import { useState } from "react";
import { QuizPlayer } from "@/features/quiz/client/quiz-player";

type ScreenMode = "intro" | "quiz";

export function QuizHome() {
  const [screen_mode, set_screen_mode] = useState<ScreenMode>("intro");

  const handleStartQuiz = () => {
    set_screen_mode("quiz");
  };

  const intro_content = (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        Laravel API × Next.js Portfolio
      </p>

      <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-950">
        Web開発用語クイズ
      </h1>

      <p className="mb-8 text-lg leading-8 text-slate-700">
        Web開発で使われる用語を4択形式で確認できる学習用クイズアプリです。
        Next.jsが画面表示を担当し、Laravel
        APIが問題取得・選択肢生成・正解判定を担当します。
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-1">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-base font-bold text-slate-950">概要</h2>
          <p className="text-sm leading-6 text-slate-600">
            Web開発用語を4択クイズ形式で学べるポートフォリオアプリです。
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-base font-bold text-slate-950">
            作った理由
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            実務で使われるフロントエンドとバックエンドを分離した構成を小さく再現し、
            API通信、DB設計、CSV取り込み、サーバー側判定を経験するために作成しました。
            開発現場で必要な責務分離とデータ連携の理解を深めることを目的としています。
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-base font-bold text-slate-950">技術設計</h2>
          <p className="text-sm leading-6 text-slate-600">
            Laravel / MySQL / Next.js / TypeScript / Tailwind CSS
            を使用しています。
          </p>
        </section>
      </div>

      <button
        type="button"
        onClick={handleStartQuiz}
        className="cursor-pointer rounded-full bg-slate-950 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
      >
        START
      </button>

      <p className="mt-4 text-sm text-slate-500">
        STARTを押すとクイズ画面に切り替わります。
      </p>
    </section>
  );

  const quiz_content = <QuizPlayer />;

  return screen_mode === "intro" ? intro_content : quiz_content;
}
