import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  watchlistItems,
  watchlists,
  type mediaTypeEnum,
} from "@/lib/db/schema";

export type WatchlistRecord = typeof watchlists.$inferSelect;
export type NewWatchlistRecord = typeof watchlists.$inferInsert;
export type WatchlistItemRecord = typeof watchlistItems.$inferSelect;
export type NewWatchlistItemRecord = typeof watchlistItems.$inferInsert;
export type MediaType = (typeof mediaTypeEnum.enumValues)[number];

export async function findWatchlistByUser(
  userId: string,
): Promise<WatchlistRecord | null> {
  const [watchlist] = await db
    .select()
    .from(watchlists)
    .where(eq(watchlists.userId, userId))
    .limit(1);

  return watchlist ?? null;
}

export async function createWatchlist(
  values: NewWatchlistRecord,
): Promise<WatchlistRecord> {
  const [watchlist] = await db.insert(watchlists).values(values).returning();

  return watchlist;
}

export async function findWatchlistItem(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
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

export async function findWatchlistItemsByUser(
  userId: string,
): Promise<WatchlistItemRecord[]> {
  return db
    .select()
    .from(watchlistItems)
    .where(eq(watchlistItems.userId, userId))
    .orderBy(desc(watchlistItems.createdAt));
}

export async function addWatchlistItem(
  values: NewWatchlistItemRecord,
): Promise<WatchlistItemRecord> {
  const [item] = await db.insert(watchlistItems).values(values).returning();

  return item;
}

export async function removeWatchlistItem(
  id: string,
): Promise<WatchlistItemRecord | null> {
  const [item] = await db
    .delete(watchlistItems)
    .where(eq(watchlistItems.id, id))
    .returning();

  return item ?? null;
}

export async function removeWatchlistItemByMedia(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
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

export async function watchlistItemExists(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<boolean> {
  const item = await findWatchlistItem(userId, tmdbId, mediaType);

  return item !== null;
}
