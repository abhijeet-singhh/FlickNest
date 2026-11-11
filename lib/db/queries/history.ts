import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { watchHistory } from "@/lib/db/schema";
import type { MediaType } from "./watchlists";

export type WatchHistoryRecord = typeof watchHistory.$inferSelect;
export type NewWatchHistoryRecord = typeof watchHistory.$inferInsert;

export async function findHistoryByUser(
  userId: string,
): Promise<WatchHistoryRecord[]> {
  return db
    .select()
    .from(watchHistory)
    .where(eq(watchHistory.userId, userId))
    .orderBy(desc(watchHistory.watchedAt));
}

export async function findHistoryEntry(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<WatchHistoryRecord | null> {
  const [entry] = await db
    .select()
    .from(watchHistory)
    .where(
      and(
        eq(watchHistory.userId, userId),
        eq(watchHistory.tmdbId, tmdbId),
        eq(watchHistory.mediaType, mediaType),
      ),
    )
    .limit(1);

  return entry ?? null;
}

export async function recordHistory(
  values: NewWatchHistoryRecord,
): Promise<WatchHistoryRecord> {
  const [entry] = await db
    .insert(watchHistory)
    .values(values)
    .onConflictDoUpdate({
      target: [
        watchHistory.userId,
        watchHistory.tmdbId,
        watchHistory.mediaType,
      ],
      set: {
        watchedAt: new Date(),
      },
    })
    .returning();

  return entry;
}

export async function deleteHistoryEntry(
  id: string,
): Promise<WatchHistoryRecord | null> {
  const [entry] = await db
    .delete(watchHistory)
    .where(eq(watchHistory.id, id))
    .returning();

  return entry ?? null;
}

export async function historyEntryExists(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<boolean> {
  const entry = await findHistoryEntry(userId, tmdbId, mediaType);

  return entry !== null;
}
