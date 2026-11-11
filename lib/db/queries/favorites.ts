import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import type { MediaType } from "./watchlists";

export type FavoriteRecord = typeof favorites.$inferSelect;
export type NewFavoriteRecord = typeof favorites.$inferInsert;

export async function findFavoritesByUser(
  userId: string,
): Promise<FavoriteRecord[]> {
  return db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, userId))
    .orderBy(desc(favorites.createdAt));
}

export async function findFavorite(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<FavoriteRecord | null> {
  const [favorite] = await db
    .select()
    .from(favorites)
    .where(
      and(
        eq(favorites.userId, userId),
        eq(favorites.tmdbId, tmdbId),
        eq(favorites.mediaType, mediaType),
      ),
    )
    .limit(1);

  return favorite ?? null;
}

export async function createFavorite(
  values: NewFavoriteRecord,
): Promise<FavoriteRecord> {
  const [favorite] = await db.insert(favorites).values(values).returning();

  return favorite;
}

export async function deleteFavorite(
  id: string,
): Promise<FavoriteRecord | null> {
  const [favorite] = await db
    .delete(favorites)
    .where(eq(favorites.id, id))
    .returning();

  return favorite ?? null;
}

export async function deleteFavoriteByMedia(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<FavoriteRecord | null> {
  const [favorite] = await db
    .delete(favorites)
    .where(
      and(
        eq(favorites.userId, userId),
        eq(favorites.tmdbId, tmdbId),
        eq(favorites.mediaType, mediaType),
      ),
    )
    .returning();

  return favorite ?? null;
}

export async function favoriteExists(
  userId: string,
  tmdbId: number,
  mediaType: MediaType,
): Promise<boolean> {
  const favorite = await findFavorite(userId, tmdbId, mediaType);

  return favorite !== null;
}
