import { request } from "./client";
import type {
  TMDBMovie,
  TMDBPaginatedResponse,
  TMDBTV,
  TMDBMovieDetails,
  TMDBTVDetails,
  TMDBSearchResponse,
  DiscoverMovieOptions,
  DiscoverTvOptions,
  TMDBCredits,
} from "./types";

export function getTrending() {
  return request<TMDBPaginatedResponse<TMDBMovie>>("/trending/movie/week");
}

export function getPopularMovies() {
  return request<TMDBPaginatedResponse<TMDBMovie>>("/movie/popular");
}

export function getUpcomingMovies() {
  return request<TMDBPaginatedResponse<TMDBMovie>>("/movie/upcoming");
}

export function getPopularTv() {
  return request<TMDBPaginatedResponse<TMDBTV>>("/tv/popular");
}

export function getMovieDetails(id: number) {
  return request<TMDBMovieDetails>(`/movie/${id}`);
}

export function getTvDetails(id: number) {
  return request<TMDBTVDetails>(`/tv/${id}`);
}

export function discoverMovies(options: DiscoverMovieOptions = {}) {
  return request<TMDBPaginatedResponse<TMDBMovie>>("/discover/movie", {
    ...options,
  });
}

export function discoverTv(options: DiscoverTvOptions = {}) {
  return request<TMDBPaginatedResponse<TMDBTV>>("/discover/tv", { ...options });
}

export function getMovieRecommendations(id: number) {
  return request<TMDBPaginatedResponse<TMDBMovie>>(
    `/movie/${id}/recommendations`,
  );
}

export function getTvRecommendations(id: number) {
  return request<TMDBPaginatedResponse<TMDBTV>>(`/tv/${id}/recommendations`);
}

export function getMovieCredits(id: number) {
  return request<TMDBCredits>(`/movie/${id}/credits`);
}

export function getTvCredits(id: number) {
  return request<TMDBCredits>(`/tv/${id}/credits`);
}

export function searchMulti(query: string, page = 1) {
  return request<TMDBSearchResponse>("/search/multi", {
    query,
    page,
  });
}

export function searchMovies(query: string, page = 1) {
  return request<TMDBPaginatedResponse<TMDBMovie>>("/search/movie", {
    query,
    page,
  });
}

export function searchTv(query: string, page = 1) {
  return request<TMDBPaginatedResponse<TMDBTV>>("/search/tv", {
    query,
    page,
  });
}
