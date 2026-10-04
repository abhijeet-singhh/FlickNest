export interface MovieDiscoverParams {
  page?: number;
  genreIds?: string;
  releaseYear?: number;
  sortBy?: string;
}

export interface TVDiscoverParams {
  page?: number;
  genreIds?: string;
  firstAirDateYear?: number;
  sortBy?: string;
}
