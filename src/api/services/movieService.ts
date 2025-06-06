// import axios from 'axios';
import { ENDPOINTS } from '../endpoints';
import type { MovieResponse } from '../../types/movie.types';
import axiosInstance from '../axios.config';

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
    axiosInstance.get<MovieResponse>(ENDPOINTS.discover.airingToday)
};