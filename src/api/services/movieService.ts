import axios from 'axios';
import { ENDPOINTS } from '../endpoints';
import type { MovieResponse } from '../../types/movie.types';

export const movieService = {
  getTrendingWeek: () => 
    axios.get<MovieResponse>(ENDPOINTS.trending.week),

  getTrendingDay: () =>
    axios.get<MovieResponse>(ENDPOINTS.trending.day),

  getUpcoming: () =>
    axios.get<MovieResponse>(ENDPOINTS.upcoming),

  getConfiguration: () =>
    axios.get(ENDPOINTS.configuration)
};