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

export const revalidate = 300;

export default async function HomePage() {
  const trending = await getTrendingMovies();
  const popular = await getPopularMovies();
  const upcoming = await getUpcomingMovies();

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
