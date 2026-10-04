export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  original_language: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface TMDBTV {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  original_language: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  origin_country: string[];
}

export interface TMDBMovieDetails extends Omit<TMDBMovie, "genre_ids"> {
  genres: TMDBGenre[];
  runtime: number | null;
  tagline: string | null;
}

export interface TMDBTVDetails extends Omit<TMDBTV, "genre_ids"> {
  genres: TMDBGenre[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  tagline: string | null;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBCredits {
  id: number;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
}

export type TMDBSearchResult = TMDBMovie | TMDBTV | TMDBPerson;

export type TMDBSearchResponse = TMDBPaginatedResponse<TMDBSearchResult>;

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface DiscoverMovieOptions {
  page?: number;
  with_genres?: string;
  primary_release_year?: number;
  sort_by?: string;
}

export interface DiscoverTvOptions {
  page?: number;
  with_genres?: string;
  first_air_date_year?: number;
  sort_by?: string;
}
