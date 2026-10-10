import type { Movie, MovieDetails } from "@/types/movie";
import type { Credits } from "@/types/credits";
import type { SearchResult } from "@/types/search";
import {
  getTrending,
  getPopularMovies as getTMDBPopularMovies,
  getUpcomingMovies as getTMDBUpcomingMovies,
  getMovieDetails,
  getMovieRecommendations,
  getMovieCredits,
} from "@/lib/tmdb";
import {
  mapTMDBMovieToMovie,
  mapTMDBMovieDetailsToMovieDetails,
  mapTMDBCreditsToCredits,
} from "@/lib/tmdb/mappers";

export async function getTrendingMovies(): Promise<SearchResult<Movie>> {
  const response = await getTrending();

  return {
    results: response.results.map(mapTMDBMovieToMovie),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function getPopularMovies(): Promise<SearchResult<Movie>> {
  const response = await getTMDBPopularMovies();

  return {
    results: response.results.map(mapTMDBMovieToMovie),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function getUpcomingMovies(): Promise<SearchResult<Movie>> {
  const response = await getTMDBUpcomingMovies();

  return {
    results: response.results.map(mapTMDBMovieToMovie),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function getMovieDetailsById(id: number): Promise<MovieDetails> {
  const response = await getMovieDetails(id);

  return mapTMDBMovieDetailsToMovieDetails(response);
}

export async function getMovieRecommendationsById(
  id: number,
): Promise<SearchResult<Movie>> {
  const response = await getMovieRecommendations(id);

  return {
    results: response.results.map(mapTMDBMovieToMovie),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function getMovieCreditsById(id: number): Promise<Credits> {
  const response = await getMovieCredits(id);

  return mapTMDBCreditsToCredits(response);
}
