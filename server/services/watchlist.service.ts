import "server-only";

import { watchlistSchema } from "@/lib/validations/watchlist";
import type { WatchlistItem } from "@/types/watchlist";

import {
  watchlistRepository,
  type WatchlistItemRecord,
} from "@/server/repositories/watchlist.repository";

export type WatchlistServiceErrorCode = "UNAUTHENTICATED" | "INVALID_INPUT";

export class WatchlistServiceError extends Error {
  readonly code: WatchlistServiceErrorCode;

  constructor(code: WatchlistServiceErrorCode, message: string) {
    super(message);
    this.name = "WatchlistServiceError";
    this.code = code;
  }
}

function toWatchlistItem(item: WatchlistItemRecord): WatchlistItem {
  return {
    id: item.id,
    userId: item.userId,
    tmdbId: item.tmdbId,
    mediaType: item.mediaType,
    createdAt: item.createdAt,
  };
}

export async function addToWatchlist(
  userId: string | null | undefined,
  input: unknown,
): Promise<WatchlistItem> {
  const parsed = watchlistSchema.safeParse(input);

  if (!parsed.success) {
    throw new WatchlistServiceError(
      "INVALID_INPUT",
      parsed.error.issues[0]?.message ?? "Invalid watchlist input.",
    );
  }

  if (!userId) {
    throw new WatchlistServiceError(
      "UNAUTHENTICATED",
      "You must be signed in to update your watchlist.",
    );
  }

  const existing = await watchlistRepository.findItem(
    userId,
    parsed.data.tmdbId,
    parsed.data.mediaType,
  );

  if (existing) {
    return toWatchlistItem(existing);
  }

  const item = await watchlistRepository.create({
    userId,
    tmdbId: parsed.data.tmdbId,
    mediaType: parsed.data.mediaType,
  });

  return toWatchlistItem(item);
}

export async function removeFromWatchlist(
  userId: string | null | undefined,
  input: unknown,
): Promise<boolean> {
  const parsed = watchlistSchema.safeParse(input);

  if (!parsed.success) {
    throw new WatchlistServiceError(
      "INVALID_INPUT",
      parsed.error.issues[0]?.message ?? "Invalid watchlist input.",
    );
  }

  if (!userId) {
    throw new WatchlistServiceError(
      "UNAUTHENTICATED",
      "You must be signed in to update your watchlist.",
    );
  }

  const removed = await watchlistRepository.delete(
    userId,
    parsed.data.tmdbId,
    parsed.data.mediaType,
  );

  return removed !== null;
}
