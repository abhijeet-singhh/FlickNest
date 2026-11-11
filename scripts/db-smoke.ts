import { loadDatabaseEnv } from "./load-env";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  loadDatabaseEnv();

  const { client } = await import("../lib/db");
  const {
    createUser,
    deleteUser,
    findUserByEmail,
    findUserById,
  } = await import("../lib/db/queries/users");
  const {
    addWatchlistItem,
    createWatchlist,
    findWatchlistByUser,
    findWatchlistItemsByUser,
    removeWatchlistItem,
  } = await import("../lib/db/queries/watchlists");
  const {
    createFavorite,
    deleteFavoriteByMedia,
    favoriteExists,
    findFavoritesByUser,
  } = await import("../lib/db/queries/favorites");
  const {
    deleteHistoryEntry,
    findHistoryByUser,
    findHistoryEntry,
    recordHistory,
  } = await import("../lib/db/queries/history");
  const {
    deleteRating,
    findRating,
    findRatingsByUser,
    upsertRating,
  } = await import("../lib/db/queries/ratings");

  const email = `smoke-${Date.now()}@flicknest.local`;

  try {
    const user = await createUser({
      email,
      username: `smoke_${Date.now()}`,
      passwordHash: "smoke-placeholder-not-a-real-hash",
    });
    assert(user.email === email, "createUser did not return the created user");

    const foundUser = await findUserByEmail(email);
    assert(foundUser?.id === user.id, "findUserByEmail failed");

    const watchlist = await createWatchlist({
      userId: user.id,
      name: "Smoke Watchlist",
    });
    assert(
      (await findWatchlistByUser(user.id))?.id === watchlist.id,
      "findWatchlistByUser failed",
    );

    const item = await addWatchlistItem({
      watchlistId: watchlist.id,
      userId: user.id,
      tmdbId: 550,
      mediaType: "movie",
    });
    const items = await findWatchlistItemsByUser(user.id);
    assert(
      items.length === 1 && items[0]?.id === item.id,
      "watchlist item round-trip failed",
    );
    assert(
      (await removeWatchlistItem(item.id))?.id === item.id,
      "removeWatchlistItem failed",
    );

    const favorite = await createFavorite({
      userId: user.id,
      tmdbId: 550,
      mediaType: "movie",
    });
    assert(
      (await findFavoritesByUser(user.id))[0]?.id === favorite.id,
      "favorite round-trip failed",
    );
    assert(
      await favoriteExists(user.id, 550, "movie"),
      "favoriteExists failed",
    );
    assert(
      (await deleteFavoriteByMedia(user.id, 550, "movie"))?.id === favorite.id,
      "deleteFavoriteByMedia failed",
    );

    const historyEntry = await recordHistory({
      userId: user.id,
      tmdbId: 550,
      mediaType: "movie",
    });
    assert(
      (await findHistoryEntry(user.id, 550, "movie"))?.id === historyEntry.id,
      "history round-trip failed",
    );
    assert(
      (await findHistoryByUser(user.id))[0]?.id === historyEntry.id,
      "findHistoryByUser failed",
    );
    assert(
      (await deleteHistoryEntry(historyEntry.id))?.id === historyEntry.id,
      "deleteHistoryEntry failed",
    );

    const rating = await upsertRating({
      userId: user.id,
      tmdbId: 550,
      mediaType: "movie",
      rating: 8,
    });
    assert(
      (await findRating(user.id, 550, "movie"))?.rating === 8,
      "rating round-trip failed",
    );
    assert(
      (await findRatingsByUser(user.id))[0]?.id === rating.id,
      "findRatingsByUser failed",
    );
    assert(
      (await deleteRating(rating.id))?.id === rating.id,
      "deleteRating failed",
    );

    assert(
      (await deleteUser(user.id))?.id === user.id,
      "deleteUser failed",
    );
    assert(
      (await findUserById(user.id)) === null,
      "user still exists after delete",
    );

    console.log("Database query round-trip passed.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Database smoke test failed:", error);
  process.exitCode = 1;
});
