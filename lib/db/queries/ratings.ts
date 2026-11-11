import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { ratings } from "@/lib/db/schema";
import type { MediaType } from "./watchlists";

export type RatingRecord = typeof ratings.$inferSelect;
export type NewRatingRecord = typeof ratings.$inferInsert;

export async function findRatingsByUser(
  userId: string,
): Promise<RatingRecord[]> {
  return db
    .select()
    .from(ratings)
    .where(eq(ratings.userId, userId))
    .orderBy(desc(ratings.updatedAt));
}

export async function findRating(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<RatingRecord | null> {
  const [rating] = await db
    .select()
    .from(ratings)
    .where(
      and(
        eq(ratings.userId, userId),
        eq(ratings.tmdbId, tmdbId),
        eq(ratings.mediaType, mediaType),
      ),
    )
    .limit(1);

  return rating ?? null;
}

export async function upsertRating(
  values: NewRatingRecord,
): Promise<RatingRecord> {
  const [rating] = await db
    .insert(ratings)
    .values(values)
    .onConflictDoUpdate({
      target: [ratings.userId, ratings.tmdbId, ratings.mediaType],
      set: {
        rating: values.rating,
        updatedAt: new Date(),
      },
    })
    .returning();

  return rating;
}

export async function deleteRating(id: string): Promise<RatingRecord | null> {
  const [rating] = await db
    .delete(ratings)
    .where(eq(ratings.id, id))
    .returning();

  return rating ?? null;
}

export async function ratingExists(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<boolean> {
  const rating = await findRating(userId, tmdbId, mediaType);

  return rating !== null;
}
