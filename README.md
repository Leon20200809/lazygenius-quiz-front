# Web開発用語クイズアプリ

Laravel API × Next.js で構築する、Web開発用語の4択クイズアプリです。

このアプリは、単なるクイズ画面ではなく、実務の大規模Webアプリで使われる構成を個人開発サイズに圧縮して再現することを目的としています。

フロントエンドは Next.js、バックエンドは Laravel API として分離し、API通信、DB設計、CSV取り込み、サーバー側での正解判定、責務分離を実装しています。

---

## 概要

Web開発で使われる用語を4択形式で確認できる学習用クイズアプリです。

ユーザーはクイズ開始ボタンを押すと、Laravel API から取得した問題に順番に回答します。

問題データはCSVからLaravel側のSeederでMySQLへ取り込み、Laravel APIがランダムに10問を取得します。

選択肢は、正解1つに加えて、同カテゴリの別の正解用語から誤答候補を自動生成します。

---

## 作った理由

実務で使われるフロントエンドとバックエンドを分離した構成を小さく再現し、API通信、DB設計、CSV取り込み、サーバー側判定を経験するために作成しました。

開発現場で必要な責務分離とデータ連携の理解を深めることを目的としています。

また、クイズというシンプルな題材を使いながら、将来的にマッチングアプリや学習サービスなどに発展できる構成を意識しています。

---

## 使用技術

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router

### Backend

* Laravel
* MySQL
* Eloquent
* Seeder
* API Routes

### Data

* CSV
* Laravel Seeder
* MySQL

---

## 現在実装済みの機能

### Backend

* Laravel APIプロジェクト作成
* `/api/health` によるヘルスチェックAPI
* `/api/quizzes/sample` による仮クイズAPI
* `/api/quizzes/sample/answer` による仮回答判定API
* `QuizController` の作成
* `QuizService` の作成
* `selected_answer` を使ったサンプル正解判定
* MySQL接続設定
* `questions` テーブル作成
* CSVから `questions` テーブルへ322件の問題データを投入
* `/api/quizzes/start` によるクイズ開始API
* DBからランダムに10問取得
* 各問題に対して4択の選択肢を自動生成
* 正解情報をフロントへ返さないレスポンス設計

### Frontend

* Next.jsプロジェクト作成
* Laravel APIから仮クイズを取得
* サンプル問題表示
* 回答ボタンからPOST通信
* トップページ紹介セクション作成
* STARTボタンによる画面切替の土台作成
* Client Component / Server Component の責務分離
* Next.js Route Handler を使ったBFF的な中継API設計

---

## 設計思想

このアプリでは、単にクイズ画面を実装するだけでなく、実務の大規模Webアプリで使われる構成を小さく再現することを重視しています。

フロントエンドは Next.js、バックエンドは Laravel API として分離し、それぞれの責務を明確にしています。

Next.js は画面表示・ユーザー操作・状態管理を担当し、Laravel は問題データの管理、選択肢生成、正解判定、DBアクセスを担当します。

また、ブラウザ側のJavaScriptはユーザーから見える前提で設計しています。そのため、Client Component から Laravel API を直接呼び出さず、Next.js の Route Handler を経由して通信します。

これにより、Laravel API の実URLや内部構成をフロントに持たせず、ブラウザ側には画面操作に必要な最低限の情報だけを渡す構成にしています。

クイズの正解データもフロントには渡さず、正解判定はLaravel側で行います。これにより、DevToolsなどから正解が見えてしまう状態を避け、サーバー側で判定責務を持つ設計にしています。

MVP段階でも、通信経路、責務分離、情報公開範囲を意識し、プロの開発現場で通用する構成を目指しています。

---

## 通信設計

### クイズ開始

```txt
Browser
↓
Next.js Route Handler
↓
Laravel API
↓
MySQL
```

Client Component からは Laravel API を直接呼び出さず、Next.js の `/api/...` を経由します。

```txt
GET /api/quizzes/start
```

Next.js Route Handler が Laravel API に中継します。

```txt
GET Laravel /api/quizzes/start
```

Laravel API はMySQLから出題対象の問題を10問ランダムに取得し、各問題に4択の選択肢を付けて返します。

---

## API設計

### Laravel API

#### ヘルスチェック

```txt
GET /api/health
```

Laravel APIが起動しているか確認するAPIです。

#### サンプルクイズ取得

```txt
GET /api/quizzes/sample
```

仮の1問を返すAPIです。

#### サンプル回答判定

```txt
POST /api/quizzes/sample/answer
```

仮の1問に対して、選択された回答を判定します。

#### クイズ開始

```txt
GET /api/quizzes/start
```

DBからランダムに10問取得し、各問題に4択の選択肢を付けて返します。

正解情報はレスポンスに含めません。

---

## DB設計

### questions テーブル

Web開発用語クイズの問題データを管理します。

| カラム            | 内容       |
| -------------- | -------- |
| id             | 主キー      |
| correct_answer | 正解となる用語  |
| question_text  | 問題文      |
| category       | カテゴリ     |
| is_active      | 出題対象かどうか |
| created_at     | 作成日時     |
| updated_at     | 更新日時     |

### 重複判定

同じ正解用語でも、問題文が違えば別問題として扱います。

```txt
correct_answer + question_text
```

この組み合わせで重複を判定します。

これにより、1つの用語に対して複数の問題文を持てるようにしています。

---

## CSV取り込み

初期データはCSVで管理し、Laravel SeederでMySQLへ取り込みます。

CSVの列構成は以下です。

```txt
correct_answer
question_text
category
isActive
```

Seederでは、`correct_answer` と `question_text` の組み合わせをキーにして `updateOrCreate` を行います。

これにより、CSVを再投入しても同じ問題が重複登録されないようにしています。

---

## 選択肢生成ロジック

現在のCSVには誤答選択肢がありません。

そのため、Laravel側で以下のルールに基づいて選択肢を生成します。

1. 出題する問題の `correct_answer` を正解選択肢にする
2. 同じ `category` の別問題から `correct_answer` を3つ取得する
3. 正解1つ + 誤答3つを混ぜる
4. 最後にシャッフルする
5. フロントには正解がどれか分からない状態で返す

同カテゴリだけで誤答候補が足りない場合は、全カテゴリから不足分を補充します。

---

## パフォーマンス方針

MVP段階でも、ループ内でDBアクセスを繰り返さない設計を意識しています。

選択肢生成では、各問題ごとにDBへ問い合わせるのではなく、必要な候補を先にまとめて取得し、Laravel側のCollection上で加工します。

```txt
悪い例:
10問取得
↓
各問題ごとに誤答候補をDB取得

採用した方針:
10問取得
↓
必要なカテゴリを集める
↓
誤答候補をまとめて取得
↓
Laravel側で選択肢を生成
```

MVPでは可読性を優先して `shuffle()->take()` を使用しています。

将来的に問題数が大きく増えた場合は、候補抽出処理の最適化やキャッシュ化を検討します。

---

## フロントエンド構成

### Server Component

* 初期表示
* サーバー側でのデータ取得
* レイアウト構成

### Client Component

* STARTボタンによる画面切替
* クイズ画面の進行管理
* 現在の問題番号の管理
* 回答の一時保存
* 選択肢クリック処理

---

## フォルダ構成方針

```txt
features/quiz/
├─ api/
│  ├─ fetch-sample-quiz.ts
│  ├─ fetch-start-quiz.ts
│  └─ submit-sample-answer.ts
│
├─ client/
│  ├─ quiz-home.tsx
│  └─ quiz-player.tsx
│
├─ components/
│  ├─ quiz-section.tsx
│  └─ answer-choice-button.tsx
│
└─ types/
   └─ quiz.ts
```

### client フォルダ

ユーザー操作、state、クリック処理、画面切替を持つClient Componentを配置します。

### components フォルダ

表示用の小さなUI部品を配置します。

---

## 今後実装予定

### クイズ進行機能

* `/api/quizzes/start` から10問取得
* STARTボタン押下でクイズ開始
* 1問ずつ表示
* 選択肢クリックで次の問題へ進む
* 回答内容をstateに保持
* 10問終了後に回答をまとめて送信

### 採点機能

* Next.js Route Handler経由で回答を送信
* Laravel APIで10問分を一括採点
* スコアを返却
* 結果画面を表示
* 各問題の正誤を表示

### UI改善

* 進捗表示
* 回答済み数の表示
* 結果画面のデザイン
* ローディング表示
* エラー表示

### ドキュメント整備

* README更新
* API設計書
* DB設計書
* 開発ログ
* 技術選定理由
* 設計思想の整理

### 将来的な拡張

* ユーザー認証
* 回答履歴保存
* 苦手カテゴリ分析
* 復習モード
* ランキング
* 管理画面
* CSV再取り込み機能
* 問題編集機能
* カテゴリ別出題
* 難易度別出題

---

## 学習・実装で意識したこと

* フロントエンドとバックエンドの責務分離
* ブラウザに不要な情報を渡さない設計
* サーバー側での正解判定
* CSVからDBへの初期データ投入
* LaravelのControllerとServiceの分離
* Next.js Route Handlerを使ったBFF的な中継
* TypeScriptによるAPIレスポンス型定義
* ループ内DBアクセスを避ける設計
* MVP段階での作りすぎ防止

---

## 開発方針

一気に完成形を作るのではなく、小さく動く状態を積み上げながら実装しています。

1. Laravel APIの疎通確認
2. Next.jsからAPI取得
3. サンプルクイズ表示
4. 回答POST確認
5. MySQL接続
6. CSV取り込み
7. DBから10問取得
8. 選択肢生成
9. フロントで1問ずつ表示
10. 採点API実装

MVPでは、まずクイズとして一通り遊べる状態を目指します。

その後、認証、履歴、管理画面などを追加し、大規模Webアプリに近い構成へ拡張していく予定です。
