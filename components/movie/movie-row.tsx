import type { Movie } from "@/types/movie";

import { MovieCard } from "./movie-card";

interface MovieRowProps {
  movies: Movie[];
}

export function MovieRow({ movies }: MovieRowProps) {
  return (
    <div className="flex gap-4 overflow-x-auto px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {movies.map((movie) => (
        <div key={movie.id} className="w-40 shrink-0">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
