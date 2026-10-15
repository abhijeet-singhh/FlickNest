import { TMDB_API_BASE_URL } from "./constants";

const MAX_ATTEMPTS = 3;
const FETCH_TIMEOUT_MS = 10_000;

export async function request<T>(
  endpoint: string,
  queryParams: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 300,
        },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message =
          errorData.status_message ||
          `TMDB request failed with status ${response.status}`;
        throw new TMDBError(message, response.status);
      }
      return response.json() as Promise<T>;
    } catch (error) {
      // HTTP errors are final — only network-level failures are retried.
      if (error instanceof TMDBError) {
        throw error;
      }
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
      }
    }
  }

  throw lastError;
}

export class TMDBError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TMDBError";
    this.status = status;
  }
}
