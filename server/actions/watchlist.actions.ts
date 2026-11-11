"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { watchlistSchema } from "@/lib/validations/watchlist";
import {
  addToWatchlist as addToWatchlistService,
  removeFromWatchlist as removeFromWatchlistService,
  WatchlistServiceError,
} from "@/server/services/watchlist.service";
import type { WatchlistActionResult } from "@/types/watchlist";

function invalidInput(message?: string): WatchlistActionResult {
  return {
    ok: false,
    error: {
      code: "INVALID_INPUT",
      message: message ?? "Invalid watchlist input.",
    },
  };
}

function unauthenticated(): WatchlistActionResult {
  return {
    ok: false,
    error: {
      code: "UNAUTHENTICATED",
      message: "You must be signed in to update your watchlist.",
    },
  };
}

function fromServiceError(error: unknown): WatchlistActionResult {
  if (error instanceof WatchlistServiceError) {
    return {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }

  console.error("Watchlist action failed:", error);

  return {
    ok: false,
    error: {
      code: "UNKNOWN",
      message: "Something went wrong. Please try again.",
    },
  };
}

export async function addToWatchlist(
  input: unknown,
): Promise<WatchlistActionResult> {
  const parsed = watchlistSchema.safeParse(input);

  if (!parsed.success) {
    return invalidInput(parsed.error.issues[0]?.message);
  }

  const user = await getCurrentUser();

  if (!user) {
    return unauthenticated();
  }

  try {
    await addToWatchlistService(user.id, parsed.data);

    return { ok: true, inWatchlist: true };
  } catch (error) {
    return fromServiceError(error);
  }
}

export async function removeFromWatchlist(
  input: unknown,
): Promise<WatchlistActionResult> {
  const parsed = watchlistSchema.safeParse(input);

  if (!parsed.success) {
    return invalidInput(parsed.error.issues[0]?.message);
  }

  const user = await getCurrentUser();

  if (!user) {
    return unauthenticated();
  }

  try {
    await removeFromWatchlistService(user.id, parsed.data);

    return { ok: true, inWatchlist: false };
  } catch (error) {
    return fromServiceError(error);
  }
}
