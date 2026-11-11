"use client";

import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/server/actions/watchlist.actions";
import type { WatchlistMediaType } from "@/types/watchlist";

interface WatchlistButtonProps {
  tmdbId: number;
  mediaType: WatchlistMediaType;
  initialInWatchlist?: boolean;
}

export function WatchlistButton({
  tmdbId,
  mediaType,
  initialInWatchlist = false,
}: WatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(initialInWatchlist);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeout = window.setTimeout(() => setError(null), 5000);

    return () => window.clearTimeout(timeout);
  }, [error]);

  function handleClick() {
    const nextState = !isInWatchlist;

    setIsInWatchlist(nextState);
    setError(null);

    startTransition(async () => {
      const result = nextState
        ? await addToWatchlist({ tmdbId, mediaType })
        : await removeFromWatchlist({ tmdbId, mediaType });

      if (!result.ok) {
        setIsInWatchlist(!nextState);
        setError(result.error.message);
        return;
      }

      setIsInWatchlist(result.inWatchlist);
    });
  }

  return (
    <>
      <Button
        type="button"
        variant={isInWatchlist ? "outline" : "default"}
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isInWatchlist}
        aria-busy={isPending}
        className="gap-2"
      >
        {isPending ? <Spinner className="size-4" /> : null}
        {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </Button>

      {error ? (
        <div
          role="alert"
          className="fixed bottom-6 left-1/2 z-50 w-[min(92vw,24rem)] -translate-x-1/2 rounded-lg border border-red-500/40 bg-neutral-900 p-3 text-sm text-red-100 shadow-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              aria-label="Dismiss error"
              className="rounded px-1 text-base leading-none text-red-200 hover:text-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
