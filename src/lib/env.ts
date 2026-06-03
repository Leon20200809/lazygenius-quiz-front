// .env.local の値を読む
// 未設定ならエラーにする
// API通信側で使い回す

const laravelApiBaseUrl = process.env.LARAVEL_API_BASE_URL;

if (!laravelApiBaseUrl) {
  throw new Error("API_BASE_URL is not defined");
}

export const env = {
  laravelApiBaseUrl,
} as const;