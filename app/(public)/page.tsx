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

import type { Movie } from "@/types/movie";
import type { SearchResult } from "@/types/search";

export const revalidate = 300;

const emptyResult: SearchResult<Movie> = {
  results: [],
  page: 1,
  totalPages: 0,
  totalResults: 0,
};

async function safeFetch(
  fn: () => Promise<SearchResult<Movie>>,
): Promise<SearchResult<Movie>> {
  try {
    return await fn();
  } catch {
    return emptyResult;
  }
}

export default async function HomePage() {
  const [trending, popular, upcoming] = await Promise.all([
    safeFetch(getTrendingMovies),
    safeFetch(getPopularMovies),
    safeFetch(getUpcomingMovies),
  ]);

  const heroMovie = trending.results[0];

  if (!heroMovie) {
    return (
      <PageContainer>
        <p>No movies available.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-10">
        <HomeHero movie={heroMovie} />

        <TrendingSection movies={trending.results} />

        <PopularSection movies={popular.results} />

        <UpcomingSection movies={upcoming.results} />
      </div>
    </PageContainer>
  );
}
