export type DiscoverMediaType = "movie" | "tv";

export type DiscoverSort = "popularity" | "rating" | "release-date";

export interface MovieDiscoverParams {
  page?: number;
  genreIds?: number[];
  releaseYear?: number;
  sortBy?: DiscoverSort;
}

export interface TVDiscoverParams {
  page?: number;
  genreIds?: number[];
  firstAirDateYear?: number;
  sortBy?: DiscoverSort;
}
