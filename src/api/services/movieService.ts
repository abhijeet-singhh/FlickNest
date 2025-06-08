// import axios from 'axios';
import { ENDPOINTS } from '../endpoints';
import type { MovieData, MovieResponse } from '../../types/movie.types';
import axiosInstance from '../axios.config';

async function fetchMultiplePagesOfMovies(endpoint: string, totalPages: number = 1): Promise<MovieData[]> {
  const allResults: MovieData[] = [];

  for (let page = 1; page <= totalPages; page++) {
    const { data } = await axiosInstance.get<MovieResponse>(`${endpoint}?&page=${page}`);
    allResults.push(...data.results);
  }

  return allResults;
}


export const movieService = {
  getTrendingWeek: () =>
    axiosInstance.get<MovieResponse>(ENDPOINTS.trending.week),

  getTrendingDay: () =>
    axiosInstance.get<MovieResponse>(ENDPOINTS.trending.day),

  getUpcoming: () =>
    axiosInstance.get<MovieResponse>(ENDPOINTS.upcoming),

  getConfiguration: () =>
    axiosInstance.get(ENDPOINTS.configuration),

  // Discover endpoints
  getNowPlaying: () =>
    axiosInstance.get<MovieResponse>(ENDPOINTS.discover.nowPlaying),

  getTopRated: () =>
    axiosInstance.get<MovieResponse>(ENDPOINTS.discover.topRated),

  getOnTheAir: () =>
    axiosInstance.get<MovieResponse>(ENDPOINTS.discover.onTheAir),

  getAiringToday: () =>
    axiosInstance.get<MovieResponse>(ENDPOINTS.discover.airingToday),

  //Discover endpoints with multiple pages
  getNowPlaying300: () => fetchMultiplePagesOfMovies(ENDPOINTS.discover.nowPlaying, 9),
  getTopRated300: () => fetchMultiplePagesOfMovies(ENDPOINTS.discover.topRated, 9),
  getOnTheAir300: () => fetchMultiplePagesOfMovies(ENDPOINTS.discover.onTheAir, 9),
  getAiringToday300: () => fetchMultiplePagesOfMovies(ENDPOINTS.discover.airingToday, 9),

};