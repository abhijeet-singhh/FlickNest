import type { Movie } from "@/types/movie";

interface MovieRatingProps {
  movie: Movie;
}

export function MovieRating({ movie }: MovieRatingProps) {
  return (
    <span className="text-xs text-muted-foreground">
      ★ {movie.rating.toFixed(1)}
    </span>
  );
}
