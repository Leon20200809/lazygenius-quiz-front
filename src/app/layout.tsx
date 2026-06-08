// HTML全体、共通CSS、フォント、metadata
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

/**
 * 通常文字用のGeistフォント設定
 *
 * variableでCSS変数名を作り、
 * HTML側のclassNameへ渡して全体で使えるようにする。
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * コード表示・等幅文字用のGeist Mono設定
 *
 * 通常文字用フォントとは別に、
 * コードや数字などで使いやすい等幅フォントを用意する。
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * サイト全体のメタデータ
 *
 * Next.jsが<head>内へtitleやdescriptionを出力する。
 * 特定ページでmetadataを定義した場合は、
 * そのページ側の設定で上書きできる。
 */
export const metadata: Metadata = {
  title: "LG Quiz App",
  description: "Laravel API × Next.js",
};

/**
 * アプリ全体を包むルートレイアウト
 *
 * app配下のすべてのページは、
 * childrenとしてこのレイアウト内へ差し込まれる。
 *
 * 例:
 *
 * app/page.tsx
 * ↓
 * childrenとしてRootLayoutへ渡される
 * ↓
 * body内に表示される
 */
export default function RootLayout({
  children,
}: Readonly<{
  // 現在表示しているページや下位レイアウトが入る
  children: React.ReactNode;
}>) {
  return (
    <html
      // ページの主要言語を日本語としてブラウザや検索エンジンへ伝える
      lang="ja"
      // フォント用CSS変数と全体共通の表示設定を付与する
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        // 画面全体の最低高さを確保し、
        // ヘッダー・メイン・フッターを縦方向に並べられる土台を作る
        className="flex min-h-full flex-col"
      >
        {/* app/page.tsxなど、現在のページ内容がここへ入る */}
        {children}
      </body>
    </html>
  );
}
