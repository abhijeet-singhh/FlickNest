import { notFound } from "next/navigation";

import {
  getTVTrailerById,
  getSimilarTVById,
  getTVCreditsById,
  getTVDetailsById,
  getTVRecommendationsById,
} from "@/server/services/tv.service";

import { DetailsHero } from "@/components/details/details-hero";
import { DetailsHeader } from "@/components/details/details-header";
import { DetailsMeta } from "@/components/details/details-meta";
import { DetailsOverview } from "@/components/details/details-overview";
import { CastList } from "@/components/details/cast-list";
import { TrailerSection } from "@/components/details/trailer-section";
import { SimilarSection } from "@/components/details/similar-section";
import { RecommendationSection } from "@/components/details/recommendation-section";

import { TMDBError } from "@/lib/tmdb/client";

export const revalidate = 300;

type TVDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TVDetailsPage({ params }: TVDetailsPageProps) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const tvId = Number(id);

  if (!Number.isSafeInteger(tvId)) {
    notFound();
  }

  let tv, credits, recommendations, similarTV, trailerUrl;

  try {
    [tv, credits, recommendations, similarTV, trailerUrl] = await Promise.all([
      getTVDetailsById(tvId),
      getTVCreditsById(tvId),
      getTVRecommendationsById(tvId),
      getSimilarTVById(tvId),
      getTVTrailerById(tvId),
    ]);
  } catch (error) {
    if (error instanceof TMDBError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <main className="container mx-auto space-y-10 px-4 py-8">
      <DetailsHero media={tv}>
        <DetailsHeader mediaType="tv" media={tv} />
        <DetailsMeta mediaType="tv" media={tv} />
        <DetailsOverview overview={tv.overview} />
        <TrailerSection trailerUrl={trailerUrl} />
      </DetailsHero>

      <CastList cast={credits.cast} />

      <SimilarSection mediaType="tv" items={similarTV.results} />

      <RecommendationSection mediaType="tv" items={recommendations.results} />
    </main>
  );
}
