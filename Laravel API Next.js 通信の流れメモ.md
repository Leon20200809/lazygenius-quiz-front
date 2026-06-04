## Laravel API × Next.js 通信の流れメモ

### 全体像

Laravel APIで問題データを返し、Next.jsで表示する。
ユーザーが選択肢ボタンを押したら、Next.jsからLaravel APIへ回答をPOSTし、Laravel側で判定結果を返す。

---

## 1. Laravel側：APIの入口を作る

### routes/api.php

役割：

URLを受ける門。

ここでは、どのURLにアクセスされたら、どのControllerへ渡すかを決める。

例：

GET /api/quizzes/sample
→ 仮のクイズ問題を返す

POST /api/quizzes/sample/answer
→ ユーザーの回答を受け取り、判定結果を返す

ポイント：

routes/api.php には、できるだけ処理本体を書かない。
URLとControllerをつなぐだけにする。

---

## 2. Laravel側：Controllerでリクエストを受ける

### QuizController

役割：

リクエストを受け取って、レスポンスを返す受付。

今回の役割：

- POSTされた回答データを受け取る
- 必要ならServiceへ処理を渡す
- 判定結果をJSONで返す

今の段階では、仮の判定結果を返している。

---

## 3. Next.js側：APIの住所を管理する

### env.ts / public-env.ts

役割：

Laravel APIのURLを一箇所で管理する。

使い分け：

env.ts
→ Server Component用

public-env.ts
→ Client Component用

重要ポイント：

Server Componentから使う環境変数は通常の名前でよい。

例：

LARAVEL_API_BASE_URL

Client Componentから使う環境変数は NEXT_PUBLIC_ を付ける。

例：

NEXT_PUBLIC_LARAVEL_API_BASE_URL

理由：

Client Componentはブラウザ側で動くため、NEXT_PUBLIC_ が付いていない環境変数は読めない。

---

## 4. Next.js側：Laravel APIから問題をGETする

### fetch-sample-quiz.ts

役割：

Laravel APIから仮のクイズ問題を取得する担当。

通信方向：

Laravel API
→ Next.js

処理の流れ：

1. env.ts からLaravel APIのURLを読む
2. /api/quizzes/sample にGETする
3. JSONを受け取る
4. page.tsxへ返す

---

## 5. Next.js側：Laravel APIへ回答をPOSTする

### submit-sample-answer.ts

役割：

ユーザーが選んだ回答をLaravel APIへ送信する担当。

通信方向：

Next.js
→ Laravel API
→ Next.js

処理の流れ：

1. public-env.ts からLaravel APIのURLを読む
2. /api/quizzes/sample/answer にPOSTする
3. selected_answer をJSONで送る
4. Laravelから判定結果を受け取る

---

## 6. Next.js側：ページの司令塔

### page.tsx

役割：

ページ全体の構成を決める司令塔。

今回の役割：

1. fetchSampleQuiz() を呼ぶ
2. Laravel APIから問題データを取得する
3. SiteShellで外殻を作る
4. QuizSectionへ問題データを渡す

ポイント：

page.tsx は Server Component のままにする。
ユーザー操作が必要な処理はここに置かない。

---

## 7. Next.js側：クイズ表示担当

### QuizSection

役割：

問題文・カテゴリ・選択肢一覧を表示する。

今回の役割：

- category を表示する
- question_text を表示する
- choices をmapで回して選択肢を表示する
- 各選択肢を AnswerChoiceButton に渡す

ポイント：

QuizSectionは表示担当。
クリック処理は持たない。
Server Componentのままでよい。

---

## 8. Next.js側：ユーザー操作担当

### AnswerChoiceButton

役割：

ユーザーが押す選択肢ボタン。

今回の役割：

1. ボタンが押される
2. handleClick() が動く
3. submitSampleAnswer() を呼ぶ
4. Laravel APIへPOSTする
5. 判定結果をconsole.logで確認する

ポイント：

ここはユーザー操作があるため Client Component にする。

"use client" が必要。

---

## 今回の通信まとめ

### 問題取得：GET

Laravel API
↓
Next.js Server Component
↓
画面表示

使うファイル：

- routes/api.php
- QuizController
- env.ts
- fetch-sample-quiz.ts
- page.tsx
- QuizSection

---

### 回答送信：POST

Next.js Client Component
↓
Laravel API
↓
Next.js Client Component

使うファイル：

- AnswerChoiceButton
- submit-sample-answer.ts
- public-env.ts
- routes/api.php
- QuizController

---

## LG流メモ

routes/api.php
→ URLの門

QuizController
→ リクエスト受付

env.ts
→ サーバー側の住所録

public-env.ts
→ ブラウザ側の住所録

fetch-sample-quiz.ts
→ 問題を取りに行く係

submit-sample-answer.ts
→ 回答を送りに行く係

page.tsx
→ ページの司令塔

QuizSection
→ クイズ表示担当

AnswerChoiceButton
→ ユーザー操作担当

---

## 一言まとめ

GETは、Laravelから問題をもらう通信。

POSTは、Next.jsからLaravelへ回答を送る通信。

Laravelはデータと判定を担当する。

Next.jsは表示とユーザー操作を担当する。

押す場所だけClient Component。
それ以外はできるだけServer Component。