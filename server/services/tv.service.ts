import type { TV, TVDetails } from "@/types/tv";
import type { Credits } from "@/types/credits";
import type { SearchResult } from "@/types/search";
import {
  getPopularTv as getTMDBPopularTv,
  getTvDetails,
  getTvRecommendations,
  getTvCredits,
} from "@/lib/tmdb";
import {
  mapTMDBTVToTV,
  mapTMDBTVDetailsToTVDetails,
  mapTMDBCreditsToCredits,
} from "@/lib/tmdb/mappers";

export async function getPopularTV(): Promise<SearchResult<TV>> {
  const response = await getTMDBPopularTv();
  return {
    results: response.results.map(mapTMDBTVToTV),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function getTVDetailsById(id: number): Promise<TVDetails> {
  const response = await getTvDetails(id);

  return mapTMDBTVDetailsToTVDetails(response);
}

export async function getTVRecommendationsById(
  id: number,
): Promise<SearchResult<TV>> {
  const response = await getTvRecommendations(id);

  return {
    results: response.results.map(mapTMDBTVToTV),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function getTVCreditsById(id: number): Promise<Credits> {
  const response = await getTvCredits(id);

  return mapTMDBCreditsToCredits(response);
}
