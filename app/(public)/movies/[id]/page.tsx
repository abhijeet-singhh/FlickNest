import { notFound } from "next/navigation";

import {
  getMovieTrailerById,
  getSimilarMoviesById,
} from "@/server/services/movie.service";

import { DetailsHero } from "@/components/details/details-hero";
import { DetailsHeader } from "@/components/details/details-header";
import { DetailsMeta } from "@/components/details/details-meta";
import { DetailsOverview } from "@/components/details/details-overview";
import { WatchlistButton } from "@/components/watchlist/watchlist-button";
import { CastList } from "@/components/details/cast-list";
import { TrailerSection } from "@/components/details/trailer-section";
import { SimilarSection } from "@/components/details/similar-section";
import { RecommendationSection } from "@/components/details/recommendation-section";

import { TMDBError } from "@/lib/tmdb/client";
import {
  getMovieCreditsById,
  getMovieDetailsById,
  getMovieRecommendationsById,
} from "@/server/services/movie.service";

export const revalidate = 300;

type MovieDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const movieId = Number(id);

  if (!Number.isSafeInteger(movieId)) {
    notFound();
  }

  let movie, credits, recommendations, similarMovies, trailerUrl;

  try {
    [movie, credits, recommendations, similarMovies, trailerUrl] =
      await Promise.all([
        getMovieDetailsById(movieId),
        getMovieCreditsById(movieId),
        getMovieRecommendationsById(movieId),
        getSimilarMoviesById(movieId),
        getMovieTrailerById(movieId),
      ]);
  } catch (error) {
    if (error instanceof TMDBError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <main className="container mx-auto space-y-10 px-4 py-8">
      <DetailsHero media={movie}>
        <DetailsHeader mediaType="movie" media={movie} />
        <DetailsMeta mediaType="movie" media={movie} />
        <WatchlistButton tmdbId={movie.id} mediaType="movie" />
        <DetailsOverview overview={movie.overview} />
        <TrailerSection trailerUrl={trailerUrl} />
      </DetailsHero>

      <CastList cast={credits.cast} />

      <SimilarSection mediaType="movie" items={similarMovies.results} />

      <RecommendationSection
        mediaType="movie"
        items={recommendations.results}
      />
    </main>
  );
}
