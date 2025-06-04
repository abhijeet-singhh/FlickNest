export const APP_TITLE = 'CINEMAX';

export const BANNER_AUTO_SCROLL_DELAY = 4000;
export const BANNER_SLIDES_TO_SHOW = 10;

export const MENU_ITEMS = [
    { path: '/explore/tvshows', label: 'TV Shows' },
    { path: '/explore/movies', label: 'Movies' },
    { path: '/explore/popular', label: 'Popular' },
] as const;

export const MOBILE_NAV_ITEMS = [
    { path: '/', label: 'Home', icon: 'AiFillHome' },
    { path: '/explore/tvshows', label: 'TV Shows', icon: 'PiTelevisionFill' },
    { path: '/explore/movies', label: 'Movies', icon: 'BiSolidMoviePlay' },
    { path: '/search', label: 'Search', icon: 'CiSearch' },
] as const;

export const API_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    DEFAULT_IMAGE_SIZE: 'original',
} as const;