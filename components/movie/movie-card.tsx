import Link from "next/link";

import { routes } from "@/lib/constants/routes";
import type { Movie } from "@/types/movie";

import { MovieMeta } from "./movie-meta";
import { MoviePoster } from "./movie-poster";
import { MovieRating } from "./movie-rating";
import { MovieTitle } from "./movie-title";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group">
      <Link
        href={routes.movie(movie.id)}
        aria-label={`View ${movie.title}`}
        className="block"
      >
        <MoviePoster movie={movie} />

        <div className="mt-3 space-y-1.5">
          <MovieTitle movie={movie} />

          <div className="flex items-center gap-3">
            <MovieMeta movie={movie} />
            <MovieRating movie={movie} />
          </div>
        </div>
      </Link>
    </article>
  );
}
