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
    axiosInstance.get(ENDPOINTS.configuration)
};