import { Movie } from "./movie";
import { TV } from "./tv";

export type SearchMediaType = "movie" | "tv";

export interface SearchParams {
  query: string;
  page?: number;
  mediaType?: SearchMediaType;
}

export interface SearchResult<T> {
  results: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export type SearchItem = Movie | TV;
