import type { SearchItem, SearchParams, SearchResult } from "@/types/search";
import { searchMulti, searchMovies, searchTv } from "@/lib/tmdb";
import {
  mapTMDBSearchToSearchResult,
  mapTMDBMovieToMovie,
  mapTMDBTVToTV,
} from "@/lib/tmdb/mappers";

export async function search(
  params: SearchParams,
): Promise<SearchResult<SearchItem>> {
  if (params.mediaType === "movie") {
    const response = await searchMovies(params.query, params.page);

    return {
      results: response.results.map(mapTMDBMovieToMovie),
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };
  }

  if (params.mediaType === "tv") {
    const response = await searchTv(params.query, params.page);

    return {
      results: response.results.map(mapTMDBTVToTV),
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };
  }

  const response = await searchMulti(params.query, params.page);

  return mapTMDBSearchToSearchResult(response);
}
