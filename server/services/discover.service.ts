import type { Movie } from "@/types/movie";
import type { TV } from "@/types/tv";
import type {
  DiscoverSort,
  MovieDiscoverParams,
  TVDiscoverParams,
} from "@/types/discover";
import type { SearchResult } from "@/types/search";
import {
  discoverMovies as discoverTMDBMovies,
  discoverTv as discoverTMDBTv,
} from "@/lib/tmdb";
import { mapTMDBMovieToMovie, mapTMDBTVToTV } from "@/lib/tmdb/mappers";

const MOVIE_SORT_BY: Record<DiscoverSort, string> = {
  popularity: "popularity.desc",
  rating: "vote_average.desc",
  "release-date": "primary_release_date.desc",
};

const TV_SORT_BY: Record<DiscoverSort, string> = {
  popularity: "popularity.desc",
  rating: "vote_average.desc",
  "release-date": "first_air_date.desc",
};

function mapGenreIds(genreIds?: number[]): string | undefined {
  return genreIds && genreIds.length > 0 ? genreIds.join(",") : undefined;
}

export async function discoverMovies(
  params: MovieDiscoverParams = {},
): Promise<SearchResult<Movie>> {
  const response = await discoverTMDBMovies({
    page: params.page,
    with_genres: mapGenreIds(params.genreIds),
    primary_release_year: params.releaseYear,
    sort_by: params.sortBy ? MOVIE_SORT_BY[params.sortBy] : undefined,
  });

  return {
    results: response.results.map(mapTMDBMovieToMovie),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function discoverTV(
  params: TVDiscoverParams = {},
): Promise<SearchResult<TV>> {
  const response = await discoverTMDBTv({
    page: params.page,
    with_genres: mapGenreIds(params.genreIds),
    first_air_date_year: params.firstAirDateYear,
    sort_by: params.sortBy ? TV_SORT_BY[params.sortBy] : undefined,
  });

  return {
    results: response.results.map(mapTMDBTVToTV),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}
