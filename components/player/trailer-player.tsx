"use client";

import { usePlayerStore } from "@/stores/player.store";

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    let videoId: string | null = null;

    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    } else if (
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "m.youtube.com"
    ) {
      videoId = parsedUrl.searchParams.get("v");
    }

    if (!videoId || !/^[\w-]+$/.test(videoId)) {
      return null;
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } catch {
    return null;
  }
}

export function TrailerPlayer() {
  const isPlayerOpen = usePlayerStore((state) => state.isPlayerOpen);
  const currentTrailer = usePlayerStore((state) => state.currentTrailer);
  const setPlayerOpen = usePlayerStore((state) => state.setPlayerOpen);
  const setCurrentTrailer = usePlayerStore((state) => state.setCurrentTrailer);

  if (!isPlayerOpen || !currentTrailer) {
    return null;
  }

  const embedUrl = getYouTubeEmbedUrl(currentTrailer);

  function handleClose() {
    setPlayerOpen(false);
    setCurrentTrailer(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          handleClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="trailer-player-title"
        className="w-full max-w-5xl space-y-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between text-white">
          <h2 id="trailer-player-title" className="text-lg font-semibold">
            Movie Trailer
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-md px-3 py-2 text-sm hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Close
          </button>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Movie trailer"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <p className="flex h-full items-center justify-center p-6 text-center text-white">
              This trailer URL is invalid or unsupported.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
