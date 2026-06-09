// 10問取得・現在位置・進行
"use client";

import { useEffect, useState } from "react";

import { fetchStartQuiz } from "@/features/quiz/api/fetch-start-quiz";
import { QuizSection } from "@/features/quiz/components/quiz-section";
import { submitQuiz } from "@/features/quiz/api/submit-quiz";
import type { QuizAnswer } from "@/features/quiz/types/submit-quiz";
import type { QuizQuestion } from "@/features/quiz/types/quiz-question";
import next from "next/dist/types";

/**
 * クイズ進行画面
 *
 * Next.jsのRoute Handlerから10問取得し、
 * 現在の問題だけを1問ずつQuizSectionへ渡す。
 */
export function QuizPlayer() {
  // Laravel APIから取得した10問を保持する
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // 現在表示している問題の位置を保持する
  // 配列は0番から始まるため、初期値は0
  const [current_index, setCurrentIndex] = useState(0);

  // API通信中かどうかを管理する
  const [is_loading, setIsLoading] = useState(true);

  // API通信に失敗した場合のメッセージを保持する
  const [error_message, setErrorMessage] = useState("");

  // questions配列から現在表示する1問を取り出す
  const current_question = questions[current_index];

  // 現在表示している問題が最後の問題か判定する
  const is_last_question = current_index >= questions.length - 1;

  // ユーザーの選択した解答をためる
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  //
  const [is_submitting, setIsSubmitting] = useState(false);

  /**
   * クイズ開始用の10問を取得する
   *
   * 通信処理はfetchStartQuizへ任せ、
   * 取得した問題データをstateへ保存する。
   */
  async function loadQuizQuestions() {
    try {
      // 通信開始前に画面状態を初期化する
      setIsLoading(true);
      setErrorMessage("");

      // Next.js Route Handler経由で10問取得する
      const data = await fetchStartQuiz();

      // 取得した10問をstateへ保存する
      setQuestions(data.questions);

      // 再取得した場合も1問目から開始する
      setCurrentIndex(0);
    } catch (error) {
      // Errorオブジェクトなら、そのメッセージを保存する
      if (error instanceof Error) {
        setErrorMessage(error.message);
        return;
      }

      // Error以外が投げられた場合の予備メッセージ
      setErrorMessage("予期しないエラーが発生しました。");
    } finally {
      // 成功・失敗に関係なく通信中状態を終了する
      setIsLoading(false);
    }
  }

  /**
   * ユーザーが選んだ回答を保存し、
   * 1〜9問目なら次へ進み、10問目なら一括採点APIへ送信する
   */
  async function handleSelectAnswer(selected_answer: string) {
    // 送信中の再クリックを拒否する
    if (is_submitting) {
      return;
    }

    // 今までの回答に、今回選んだ回答を追加する
    const next_answers: QuizAnswer[] = [
      ...answers,
      {
        question_id: current_question.id,
        selected_answer,
      },
    ];

    // 10問目を含んだ最新の回答配列をstateへ保存する
    setAnswers(next_answers);

    // 追加後の回答配列を確認する
    console.table(next_answers);

    // 最後の問題なら、10問分を一括採点APIへ送信する
    if (is_last_question) {
      // 10問目を押した瞬間から再クリックを止める
      setIsSubmitting(true);

      
      console.log({
        current_index,
        questions_length: questions.length,
        is_last_question,
        answers_length: answers.length,
        next_answers_length: next_answers.length,
      });


      const result = await submitQuiz({
        answers: next_answers,
      });

      console.log("採点結果:", result);

      return;
    }

    // 1〜9問目なら、次の問題へ進む
    setCurrentIndex((previous_index) => previous_index + 1);
  }

  /**
   * QuizPlayerが表示されたタイミングで、
   * クイズ開始用データを1度だけ取得する。
   */
  useEffect(() => {
    loadQuizQuestions();
  }, []);

  // API通信中の表示
  if (is_loading) {
    return <p>クイズを読み込み中...</p>;
  }

  // API通信に失敗した場合の表示
  if (error_message) {
    return <p>{error_message}</p>;
  }

  // 問題を取得できなかった場合の表示
  if (!current_question) {
    return <p>表示できる問題がありません。</p>;
  }

  // クイズ進行画面
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {/* 現在の問題番号と全問題数 */}
      <p className="mb-6 text-center font-bold text-gray-600">
        問題 {current_index + 1} / {questions.length}
      </p>

      {/* 現在の1問と、回答選択時の処理を渡す */}
      <QuizSection
        question={current_question}
        onSelectAnswer={handleSelectAnswer}
      />
    </section>
  );
}
