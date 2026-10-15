"use client";

import { usePlayerStore } from "@/stores/player.store";

interface TrailerSectionProps {
  trailerUrl: string | null;
}

export function TrailerSection({ trailerUrl }: TrailerSectionProps) {
  const setCurrentTrailer = usePlayerStore((state) => state.setCurrentTrailer);
  const setPlayerOpen = usePlayerStore((state) => state.setPlayerOpen);

  if (!trailerUrl) {
    return null;
  }

  function handlePlayTrailer() {
    setCurrentTrailer(trailerUrl);
    setPlayerOpen(true);
  }

  return (
    <section aria-labelledby="details-trailer-heading" className="space-y-3">
      <h2 id="details-trailer-heading" className="text-lg font-semibold">
        Trailer
      </h2>

      <button
        type="button"
        onClick={handlePlayTrailer}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span aria-hidden="true">▶</span>
        Watch trailer
      </button>
    </section>
  );
}
