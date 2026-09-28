export const routes = {
  home: "/",
  search: "/search",
  movies: "/movies",
  movie: (id: number | string) => `/movies/${id}`,
  tv: "/tv",
  tvShow: (id: number | string) => `/tv/${id}`,

  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;
