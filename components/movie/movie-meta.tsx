import type { Movie } from "@/types/movie";

interface MovieMetaProps {
  movie: Movie;
}

export function MovieMeta({ movie }: MovieMetaProps) {
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : null;

  return (
    <span className="text-xs text-muted-foreground">
      {releaseYear ?? "Unknown"}
    </span>
  );
}
