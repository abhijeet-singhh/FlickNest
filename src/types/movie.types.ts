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