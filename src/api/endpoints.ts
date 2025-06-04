export const ENDPOINTS = {
  trending: {
    week: '/trending/all/week',
    day: '/trending/all/day'
  },
  configuration: '/configuration',
  upcoming: '/movie/upcoming'
} as const; // 'as const' ensures these values are readonly and literal types in TypeScript