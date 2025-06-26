export interface MovieData {
    backdrop_path: string;
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
    popularity?: number;
    release_date?: string;
    first_air_date?: string;
    media_type?: string;
}

export interface MovieResponse {
    page: number;
    results: MovieData[];
    total_pages: number;
    total_results: number;
}

export interface MovieConfiguration {
    images: {
        base_url: string;
        secure_base_url: string;
        backdrop_sizes: string[];
        logo_sizes: string[];
        poster_sizes: string[];
        profile_sizes: string[];
        still_sizes: string[];
    };
}

export interface CardProps {
    data: MovieData
    indexLabel?: string
    mediaType?: 'Movie' | 'TV'
}

export interface SearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
  // Add other fields as needed
}