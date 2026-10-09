import type { Movie } from "@/types/movie";

interface MovieTitleProps {
  movie: Movie;
}

export function MovieTitle({ movie }: MovieTitleProps) {
  return (
    <h3
      className="line-clamp-2 text-sm font-medium leading-5 transition-colors group-hover:text-primary"
      title={movie.title}
    >
      {movie.title}
    </h3>
  );
}
