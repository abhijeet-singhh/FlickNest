export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  originalLanguage: string;

  posterUrl: string | null;
  backdropUrl: string | null;

  releaseDate: string | null;

  rating: number;
  voteCount: number;

  genreIds: number[];
}
