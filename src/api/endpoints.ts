import { TODAY } from "../utils/constants";

export const ENDPOINTS = {
  trending: {
    week: '/trending/all/week',
    day: '/trending/all/day'
  },
  configuration: '/configuration',
  upcoming: '/movie/upcoming?region=US',
  tvShows: '/discover/tv?sort_by=popularity.desc',
  movies: '/movie/popular',
  new: `/discover/movie?sort_by=release_date.desc&release_date.lte=${TODAY}&region=US`,
  discover: {
    nowPlaying: '/movie/now_playing',
    topRated: '/movie/top_rated',
    onTheAir: '/tv/on_the_air',
    airingToday: '/tv/airing_today',
  },
} as const; // 'as const' ensures these values are readonly and literal types in TypeScript