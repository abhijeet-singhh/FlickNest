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
