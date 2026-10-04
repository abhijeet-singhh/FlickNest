import { TMDB_API_BASE_URL } from "./constants";

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

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData.status_message ||
      `TMDB request failed with status ${response.status}`;
    throw new TMDBError(message, response.status);
  }
  return response.json() as Promise<T>;
}

export class TMDBError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TMDBError";
    this.status = status;
  }
}
