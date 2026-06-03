const laravelApiBaseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_BASE_URL;

if (!laravelApiBaseUrl) {
  throw new Error("NEXT_PUBLIC_LARAVEL_API_BASE_URL is not defined");
}

export const publicEnv = {
  laravelApiBaseUrl,
} as const;