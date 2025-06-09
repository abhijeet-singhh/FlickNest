export const ENDPOINTS = {
  trending: {
    week: '/trending/all/week',
    day: '/trending/all/day'
  },
  configuration: '/configuration',
  upcoming: '/movie/upcoming?region=US',
  discover: {
    nowPlaying: '/movie/now_playing',
    topRated: '/movie/top_rated',
    onTheAir: '/tv/on_the_air',
    airingToday: '/tv/airing_today',
  }
} as const; // 'as const' ensures these values are readonly and literal types in TypeScript