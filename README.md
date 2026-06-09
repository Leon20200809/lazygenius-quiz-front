# Web開発用語クイズアプリ

Laravel API × Next.js で構築した、Web開発用語の4択クイズアプリです。

単なるクイズ画面ではなく、フロントエンドとバックエンドを分離し、API通信、状態管理、BFF、DB設計、サーバー側採点、本番デプロイまでを個人開発サイズで再現しています。

## 公開URL

- アプリ: https://lazygenius-quiz-front.vercel.app/
- バックエンドAPI: https://api.lazygenius.dev/
- バックエンドリポジトリ: https://github.com/Leon20200809/lazygenius-quiz-api

## 概要

ユーザーがSTARTボタンを押すと、Laravel APIからランダムに10問を取得します。

問題は1問ずつ表示され、選択した回答をReactのstateへ蓄積します。10問目の回答後に、10問分をまとめてNext.jsのRoute Handlerへ送信し、Laravel側で一括採点します。

採点後はリザルト画面へ切り替わり、以下を確認できます。

- 合計得点
- 問題文
- ユーザーが選択した回答
- 正解
- 正誤結果

## 作った理由

実務で使われるフロントエンドとバックエンドを分離した構成を、小さなクイズアプリとして再現するために作成しました。

このアプリを通じて、以下を実践しています。

- Next.jsとLaravelの責務分離
- Client Componentでの状態管理
- Next.js Route HandlerによるBFF構成
- Laravel APIとのGET / POST通信
- 回答配列の蓄積
- 画面状態の切り替え
- 二重送信防止
- サーバー側での正解判定
- VercelとXserverを使った本番公開

技術を並べることではなく、「どの処理をどこへ置くか」を意識した設計を重視しています。

## 使用技術

| 分類 | 技術 |
|---|---|
| フロントエンド | Next.js / React |
| 言語 | TypeScript |
| CSS | Tailwind CSS |
| ルーティング | App Router |
| BFF | Next.js Route Handler |
| バックエンド | Laravel API |
| データベース | MySQL |
| フロント本番環境 | Vercel |
| バックエンド本番環境 | Xserver |
| バージョン管理 | Git / GitHub |

## 主な機能

- STARTボタンによるクイズ開始
- Laravel APIからランダム10問取得
- 4択問題の1問ずつ表示
- 現在の問題番号表示
- 回答のstate保存
- 10問分の回答一括送信
- Next.js Route Handler経由のAPI通信
- Laravel側での一括採点
- 合計得点表示
- 問題ごとの正誤一覧
- イントロ / クイズ / リザルト画面の状態切り替え
- トップ画面へ戻る処理
- 回答送信時の二重送信防止

## アプリ全体の流れ

```txt
INTRO
↓
START
↓
Next.js Route Handler
↓
Laravel APIから10問取得
↓
QuizPlayerで1問ずつ表示
↓
ユーザー回答をstateへ蓄積
↓
10問目で回答配列を一括送信
↓
Next.js Route Handler
↓
Laravel APIで採点
↓
SubmitQuizResponseを受信
↓
RESULT画面へ切り替え
↓
得点・正誤一覧を表示
↓
トップへ戻る
```

## 通信設計

### クイズ開始

```txt
Browser
↓
GET /api/quizzes/start
↓
Next.js Route Handler
↓
GET https://api.lazygenius.dev/api/quizzes/start
↓
Laravel API
↓
MySQL
```

ブラウザからLaravel APIを直接呼ばず、Next.jsのRoute Handlerを経由します。

### 回答送信

```txt
Browser
↓
POST /api/quizzes/submit
↓
Next.js Route Handler
↓
POST https://api.lazygenius.dev/api/quizzes/submit
↓
Laravel API
↓
採点結果
↓
Next.js
↓
Browser
```

## Route Handlerを使う理由

Client ComponentからLaravel APIを直接呼ぶのではなく、Next.js Route HandlerをBFFとして使用しています。

理由は以下です。

- ブラウザから見える通信先をNext.js側へ統一する
- Laravel APIの実URLをClient Componentへ直接持たせない
- サーバー専用環境変数を利用する
- CORSの影響を受けにくい構成にする
- LaravelからのレスポンスをNext.js側で中継する
- 将来的に認証、ログ、レスポンス整形を追加しやすくする

```txt
Client Component
↓
Next.js Route Handler
↓
Laravel API
```

すべての通信をRoute Handlerへ寄せるのではなく、ブラウザと外部APIの境界に置く意味がある場合に使用する方針です。

## 状態管理

### QuizHome

アプリ全体の画面状態を管理します。

```ts
type ScreenMode = "intro" | "quiz" | "result";
```

主なstate:

- `screen_mode`
- `quiz_result`

役割:

- イントロ画面の表示
- クイズ画面への切り替え
- 採点結果の保存
- リザルト画面への切り替え
- トップ画面へのリセット

### QuizPlayer

クイズ進行に必要な状態を管理します。

主なstate:

- `questions`
- `current_index`
- `answers`
- `is_loading`
- `error_message`
- `is_submitting`

役割:

- 10問取得
- 現在の問題を選ぶ
- 回答を蓄積する
- 次の問題へ進む
- 10問目で一括送信する
- 二重送信を防止する

### 状態の箱

```txt
questions
→ APIから取得した10問

current_index
→ 現在表示している問題位置

current_question
→ 現在表示する1問

answers
→ ユーザーの回答履歴

quiz_result
→ Laravelから返された採点結果

screen_mode
→ intro / quiz / result
```

## 子から親への結果通知

`QuizPlayer` は採点結果を自分で画面切り替えせず、親の`QuizHome`へ通知します。

```tsx
<QuizPlayer onComplete={handleQuizComplete} />
```

`QuizPlayer`内:

```tsx
onComplete(result);
```

実際には、親から渡された`handleQuizComplete`が実行されます。

```txt
QuizPlayer
↓
onComplete(result)
↓
QuizHome
↓
quiz_resultへ保存
↓
screen_modeをresultへ変更
```

## 回答配列の設計

1問分の回答:

```ts
export type QuizAnswer = {
  question_id: number;
  selected_answer: string;
};
```

10問分の送信:

```ts
export type SubmitQuizRequest = {
  answers: QuizAnswer[];
};
```

採点結果:

```ts
export type SubmitQuizResponse = {
  score: number;
  total: number;
  results: QuizResult[];
};
```

## 10問目の送信処理

Reactのstate更新は即時反映ではないため、10問目を送る際は古い`answers`ではなく、今回の回答を追加した`next_answers`を使用します。

```txt
previous answers
→ 9件

今回の回答
→ 10問目

next_answers
→ 完成した10件
```

```tsx
const next_answers = [
  ...answers,
  {
    question_id: current_question.id,
    selected_answer,
  },
];

setAnswers(next_answers);

await submitQuiz({
  answers: next_answers,
});
```

## 二重送信防止

10問目の回答ボタンを連続で押すと、同じ回答が追加され、11件送信になる可能性があります。

そのため、送信中は再実行を防止します。

```txt
未送信
↓
送信開始
↓
ロック
↓
API通信
↓
成功または失敗
↓
必要に応じて解除
```

UI表示用のstateと、即時ロック用のrefを使い分けます。

- `is_submitting`: 送信中表示やdisabled制御
- `is_submitting_ref`: 同じ瞬間の再実行防止

## 画面コンポーネント

| コンポーネント | 役割 |
|---|---|
| `QuizHome` | 画面状態の管理 |
| `QuizIntroSection` | イントロ画面 |
| `QuizPlayer` | クイズ進行 |
| `QuizSection` | 現在の問題表示 |
| `AnswerChoiceButton` | 回答選択 |
| `QuizResultSection` | 得点・正誤一覧表示 |

`QuizHome`は状態と画面切り替えに集中し、各画面の表示は専用コンポーネントへ分離しています。

## フォルダ構成

```txt
src/
├─ app/
│  ├─ api/
│  │  └─ quizzes/
│  │     ├─ start/
│  │     │  └─ route.ts
│  │     └─ submit/
│  │        └─ route.ts
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ components/
│  └─ layout/
│     ├─ site-footer.tsx
│     ├─ site-header.tsx
│     └─ site-shell.tsx
│
├─ features/
│  └─ quiz/
│     ├─ api/
│     │  ├─ fetch-start-quiz.ts
│     │  └─ submit-quiz.ts
│     ├─ client/
│     │  ├─ quiz-home.tsx
│     │  └─ quiz-player.tsx
│     ├─ components/
│     │  ├─ answer-choice-button.tsx
│     │  ├─ quiz-intro-section.tsx
│     │  ├─ quiz-result-section.tsx
│     │  └─ quiz-section.tsx
│     └─ types/
│        ├─ quiz-question.ts
│        ├─ start-quiz.ts
│        └─ submit-quiz.ts
│
└─ lib/
   └─ env.ts
```

## 環境変数

`.env.local`:

```env
LARAVEL_API_BASE_URL=http://lazygenius-quiz-api.test
```

Vercel:

```env
LARAVEL_API_BASE_URL=https://api.lazygenius.dev
```

この環境変数はRoute Handlerからのみ使用します。

`NEXT_PUBLIC_`は付けません。

## ローカル環境構築

### 1. リポジトリをクローン

```bash
git clone https://github.com/Leon20200809/lazygenius-quiz-front.git
cd lazygenius-quiz-front
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 環境変数を設定

```bash
cp .env.example .env.local
```

```env
LARAVEL_API_BASE_URL=http://lazygenius-quiz-api.test
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

確認URL:

```txt
http://localhost:3000
```

## デプロイ

GitHubとVercelを連携し、`main`ブランチへのpushをトリガーに自動ビルド・自動デプロイします。

```txt
mainへpush
↓
Vercelが変更を検知
↓
依存関係をインストール
↓
Next.jsをビルド
↓
本番公開
```

Vercelには次の環境変数を設定します。

```env
LARAVEL_API_BASE_URL=https://api.lazygenius.dev
```

## 本番確認項目

```txt
1. トップページが表示される
2. STARTでクイズ画面へ切り替わる
3. 10問取得できる
4. 回答が1問ずつ進む
5. 10問目でPOSTが1回だけ送信される
6. 得点が表示される
7. 正誤一覧が表示される
8. トップへ戻れる
```

## 開発中に発生した問題

### React Strict ModeでGETが2回実行される

開発環境では、React Strict Modeにより`useEffect`内の取得処理が2回動いて見える場合があります。

本番環境で同じ挙動になるとは限らないため、NetworkタブとInitiatorを確認して切り分けました。

### 10問目の二重送信

10問目のボタンを連続操作すると、1回目は10件、2回目は11件として送信され、Laravel側のバリデーションで422になりました。

ログで以下を確認して原因を特定しました。

```txt
answers_length: 10
next_answers_length: 11
```

送信中ロックを追加して防止しています。

### 本番でPOSTが404

Vercel側のRoute Handlerではなく、Laravel API側の最新コードが本番へ反映されていないことが原因でした。

以下の順で切り分けました。

```txt
Request URL
Status
Payload
Response
本番APIのroute
最新コミット
デプロイ履歴
```

## 今後の改善

- PHPUnitによるLaravel APIテスト
- Postmanによる手動API確認
- フロントエンドのテスト追加
- ローディングUI改善
- エラー表示改善
- 再挑戦ボタン
- カテゴリ選択
- スコア履歴
- ランキング
- 管理画面
- 問題追加UI
- レスポンスキャッシュの検討

## 関連リポジトリ

- Backend: https://github.com/Leon20200809/lazygenius-quiz-api
