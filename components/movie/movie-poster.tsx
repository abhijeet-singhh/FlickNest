import Image from "next/image";

import type { Movie } from "@/types/movie";

interface MoviePosterProps {
  movie: Movie;
}

export function MoviePoster({ movie }: MoviePosterProps) {
  if (!movie.posterUrl) {
    return (
      <div className="flex aspect-[2/3] items-center justify-center rounded-md bg-muted">
        <span className="px-3 text-center text-sm text-muted-foreground">
          No poster available
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-muted">
      <Image
        src={movie.posterUrl}
        alt={movie.title}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        unoptimized
      />
    </div>
  );
}
