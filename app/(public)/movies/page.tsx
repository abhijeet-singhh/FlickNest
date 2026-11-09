import Link from "next/link";

import { MediaPoster } from "@/components/details/media-poster";
import { getPopularMovies } from "@/server/services/movie.service";
import { routes } from "@/lib/constants/routes";
import type { Movie } from "@/types/movie";
import type { SearchResult } from "@/types/search";

export const revalidate = 300;

async function safeFetch(
  fn: () => Promise<SearchResult<Movie>>,
): Promise<SearchResult<Movie> | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export default async function MoviesPage() {
  const result = await safeFetch(getPopularMovies);

  if (!result) {
    return (
      <main className="container mx-auto space-y-8 px-4 py-8">
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Couldn&apos;t load movies
            </h1>
            <p className="text-muted-foreground">
              We couldn&apos;t reach the movie service. Please check your
              connection and try again.
            </p>
            <Link
              href={routes.movies}
              className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Try again
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { results: movies } = result;

  return (
    <main className="container mx-auto space-y-8 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
        <p className="text-muted-foreground">
          Explore popular movies and find your next favorite film.
        </p>
      </header>

      {movies.length === 0 ? (
        <p className="text-muted-foreground">
          No movies are available right now.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <li key={movie.id} className="group min-w-0">
              <Link
                href={routes.movie(movie.id)}
                className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <MediaPoster title={movie.title} posterUrl={movie.posterUrl} />

                <div className="mt-2 space-y-1">
                  <h2 className="truncate text-sm font-medium">{movie.title}</h2>

                  <p className="text-xs text-muted-foreground">
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).getFullYear()
                      : "Release date unavailable"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
