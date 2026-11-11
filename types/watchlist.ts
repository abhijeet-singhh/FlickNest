export type WatchlistMediaType = "movie" | "tv";

export interface WatchlistItem {
  id: string;
  userId: string;
  tmdbId: number;
  mediaType: WatchlistMediaType;
  createdAt: Date;
}

export type WatchlistActionErrorCode =
  "UNAUTHENTICATED" | "INVALID_INPUT" | "UNKNOWN";

export interface WatchlistActionError {
  code: WatchlistActionErrorCode;
  message: string;
}

export type WatchlistActionResult =
  | {
      ok: true;
      inWatchlist: boolean;
    }
  | {
      ok: false;
      error: WatchlistActionError;
    };
