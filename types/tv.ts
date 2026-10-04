import type { Genre } from "./movie";

export interface TV {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  originalLanguage: string;

  posterUrl: string | null;
  backdropUrl: string | null;

  firstAirDate: string | null;

  rating: number;
  voteCount: number;

  genreIds: number[];
  originCountry: string[];
}

export interface TVDetails extends TV {
  genres: Genre[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  status: string;
  tagline: string | null;
}
