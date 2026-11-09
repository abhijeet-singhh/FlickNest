import Link from "next/link";

import { MediaPoster } from "@/components/details/media-poster";
import { getPopularTV } from "@/server/services/tv.service";
import { routes } from "@/lib/constants/routes";
import type { TV } from "@/types/tv";
import type { SearchResult } from "@/types/search";

export const revalidate = 300;

async function safeFetch(
  fn: () => Promise<SearchResult<TV>>,
): Promise<SearchResult<TV> | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export default async function TVPage() {
  const result = await safeFetch(getPopularTV);

  if (!result) {
    return (
      <main className="container mx-auto space-y-8 px-4 py-8">
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Couldn&apos;t load TV shows
            </h1>
            <p className="text-muted-foreground">
              We couldn&apos;t reach the TV service. Please check your
              connection and try again.
            </p>
            <Link
              href={routes.tv}
              className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Try again
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { results: shows } = result;

  return (
    <main className="container mx-auto space-y-8 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">TV Shows</h1>
        <p className="text-muted-foreground">
          Explore popular TV shows and find your next favorite series.
        </p>
      </header>

      {shows.length === 0 ? (
        <p className="text-muted-foreground">
          No TV shows are available right now.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {shows.map((show) => (
            <li key={show.id} className="group min-w-0">
              <Link
                href={routes.tvShow(show.id)}
                className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <MediaPoster title={show.name} posterUrl={show.posterUrl} />

                <div className="mt-2 space-y-1">
                  <h2 className="truncate text-sm font-medium">{show.name}</h2>

                  <p className="text-xs text-muted-foreground">
                    {show.firstAirDate
                      ? new Date(show.firstAirDate).getFullYear()
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
