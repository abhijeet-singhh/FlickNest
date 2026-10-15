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
  getMovieVideos,
  getSimilarMovies,
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

export async function getMovieTrailerById(id: number): Promise<string | null> {
  const videos = await getMovieVideos(id);

  const trailer = videos.results.find(
    (video) =>
      video.site === "YouTube" && video.type === "Trailer" && video.official,
  );

  const fallbackTrailer =
    trailer ??
    videos.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  return fallbackTrailer
    ? `https://www.youtube.com/watch?v=${fallbackTrailer.key}`
    : null;
}

export async function getSimilarMoviesById(id: number) {
  const response = await getSimilarMovies(id);

  return {
    ...response,
    results: response.results.map(mapTMDBMovieToMovie),
  };
}
