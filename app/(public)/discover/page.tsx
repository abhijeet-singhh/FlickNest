import type { Metadata } from "next";

import { DiscoverFilters } from "@/components/discover/discover-filters";
import { DiscoverResults } from "@/components/discover/discover-results";
import { parseDiscoverParams } from "@/lib/validations/discover";
import { discoverMovies, discoverTV } from "@/server/services/discover.service";
import type { Movie } from "@/types/movie";
import type { SearchResult } from "@/types/search";
import type { TV } from "@/types/tv";

export const metadata: Metadata = {
  title: "Discover | FlickNest",
};

type DiscoverPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DiscoverPage({
  searchParams,
}: DiscoverPageProps) {
  const filters = parseDiscoverParams(await searchParams);
  const genreIds = filters.genre !== undefined ? [filters.genre] : undefined;

  let movieResult: SearchResult<Movie> | null = null;
  let tvResult: SearchResult<TV> | null = null;
  let failed = false;

  try {
    if (filters.type === "tv") {
      tvResult = await discoverTV({
        genreIds,
        firstAirDateYear: filters.year,
        sortBy: filters.sort,
      });
    } else {
      movieResult = await discoverMovies({
        genreIds,
        releaseYear: filters.year,
        sortBy: filters.sort,
      });
    }
  } catch {
    failed = true;
  }

  const totalResults =
    filters.type === "tv"
      ? (tvResult?.totalResults ?? 0)
      : (movieResult?.totalResults ?? 0);

  const results =
    filters.type === "tv" ? tvResult?.results : movieResult?.results;

  const hasResults = (results?.length ?? 0) > 0;

  return (
    <main className="container mx-auto space-y-8 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
        <p className="text-muted-foreground">
          Browse movies and TV shows by genre, year, and rating.
        </p>
      </header>

      <DiscoverFilters filters={filters} />

      {failed ? (
        <p
          role="alert"
          className="rounded-lg border border-dashed px-4 py-12 text-center text-sm text-muted-foreground"
        >
          We couldn&apos;t load discover results. Please try again.
        </p>
      ) : hasResults ? (
        <section aria-label="Discover results" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {totalResults.toLocaleString()}{" "}
            {filters.type === "tv" ? "TV shows" : "movies"} found
          </p>

          {filters.type === "tv" && tvResult ? (
            <DiscoverResults mediaType="tv" items={tvResult.results} />
          ) : movieResult ? (
            <DiscoverResults mediaType="movie" items={movieResult.results} />
          ) : null}
        </section>
      ) : (
        <div className="flex min-h-[30vh] items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center">
          <div className="max-w-md space-y-2">
            <h2 className="text-lg font-semibold">No matches found</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              No {filters.type === "tv" ? "TV shows" : "movies"} match these
              filters. Try a different genre, year, or sort order.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
