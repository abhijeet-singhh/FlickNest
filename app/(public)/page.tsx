import { HomeHero } from "@/components/home/home-hero";
import { PopularSection } from "@/components/home/popular-section";
import { TrendingSection } from "@/components/home/trending-section";
import { UpcomingSection } from "@/components/home/upcoming-section";
import { PageContainer } from "@/components/layout/page-container";
import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/server/services/movie.service";
import { routes } from "@/lib/constants/routes";
import Link from "next/link";

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

export default async function HomePage() {
  const [trending, popular, upcoming] = await Promise.all([
    safeFetch(getTrendingMovies),
    safeFetch(getPopularMovies),
    safeFetch(getUpcomingMovies),
  ]);

  if (!trending) {
    return (
      <PageContainer>
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Couldn&apos;t load movies
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              We couldn&apos;t reach the movie service. Please check your
              connection and try again.
            </p>
            <Link
              href={routes.home}
              className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Try again
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  const heroMovie = trending.results[0];

  if (!heroMovie) {
    return (
      <PageContainer>
        <p>No movies available.</p>
      </PageContainer>
    );
  }

  const hadSectionError = popular === null || upcoming === null;

  return (
    <PageContainer>
      <div className="space-y-10">
        {hadSectionError ? (
          <p
            role="alert"
            className="rounded-md border px-4 py-3 text-sm text-muted-foreground"
          >
            Some sections couldn&apos;t be loaded. Please try again later.
          </p>
        ) : null}

        <HomeHero movie={heroMovie} />

        <TrendingSection movies={trending.results} />

        <PopularSection movies={popular?.results ?? []} />

        <UpcomingSection movies={upcoming?.results ?? []} />
      </div>
    </PageContainer>
  );
}
