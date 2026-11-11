import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { watchlistItems, watchlists } from "@/lib/db/schema";
import type { WatchlistMediaType } from "@/types/watchlist";

export type WatchlistItemRecord = typeof watchlistItems.$inferSelect;

export interface CreateWatchlistItemInput {
  userId: string;
  tmdbId: number;
  mediaType: WatchlistMediaType;
}

async function ensureWatchlist(userId: string) {
  const [existing] = await db
    .select()
    .from(watchlists)
    .where(eq(watchlists.userId, userId))
    .limit(1);

  if (existing) {
    return existing;
  }

  const [created] = await db
    .insert(watchlists)
    .values({ userId })
    .onConflictDoNothing({ target: watchlists.userId })
    .returning();

  if (created) {
    return created;
  }

  const [watchlist] = await db
    .select()
    .from(watchlists)
    .where(eq(watchlists.userId, userId))
    .limit(1);

  if (!watchlist) {
    throw new Error("Could not create or find the user's watchlist.");
  }

  return watchlist;
}

export async function findByUser(
  userId: string,
): Promise<WatchlistItemRecord[]> {
  return db
    .select()
    .from(watchlistItems)
    .where(eq(watchlistItems.userId, userId))
    .orderBy(desc(watchlistItems.createdAt));
}

export async function findItem(
  userId: string,
  tmdbId: number,
  mediaType: WatchlistMediaType,
): Promise<WatchlistItemRecord | null> {
  const [item] = await db
    .select()
    .from(watchlistItems)
    .where(
      and(
        eq(watchlistItems.userId, userId),
        eq(watchlistItems.tmdbId, tmdbId),
        eq(watchlistItems.mediaType, mediaType),
      ),
    )
    .limit(1);

  return item ?? null;
}

export async function create(
  input: CreateWatchlistItemInput,
): Promise<WatchlistItemRecord> {
  const watchlist = await ensureWatchlist(input.userId);

  const [created] = await db
    .insert(watchlistItems)
    .values({
      watchlistId: watchlist.id,
      userId: input.userId,
      tmdbId: input.tmdbId,
      mediaType: input.mediaType,
    })
    .onConflictDoNothing({
      target: [
        watchlistItems.userId,
        watchlistItems.tmdbId,
        watchlistItems.mediaType,
      ],
    })
    .returning();

  if (created) {
    return created;
  }

  const existing = await findItem(input.userId, input.tmdbId, input.mediaType);

  if (!existing) {
    throw new Error("Could not create or find the watchlist item.");
  }

  return existing;
}

export async function remove(
  userId: string,
  tmdbId: number,
  mediaType: WatchlistMediaType,
): Promise<WatchlistItemRecord | null> {
  const [item] = await db
    .delete(watchlistItems)
    .where(
      and(
        eq(watchlistItems.userId, userId),
        eq(watchlistItems.tmdbId, tmdbId),
        eq(watchlistItems.mediaType, mediaType),
      ),
    )
    .returning();

  return item ?? null;
}

export async function exists(
  userId: string,
  tmdbId: number,
  mediaType: WatchlistMediaType,
): Promise<boolean> {
  const item = await findItem(userId, tmdbId, mediaType);

  return item !== null;
}

export const watchlistRepository = {
  findByUser,
  findItem,
  create,
  delete: remove,
  exists,
};
