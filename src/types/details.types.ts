export interface MediaDetails {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  genres: Array<{ id: number; name: string }>
  runtime?: number
  episode_run_time?: number[]
  status: string
}

export interface Credits {
  cast: Array<{
    id: number
    name: string
    character: string
    profile_path: string | null
  }>
  crew: Array<{
    id: number
    name: string
    job: string
  }>
}

export interface Video {
  key: string
  name: string
  type: string
}

export interface SimilarMediaItem {
  id: number
  title?: string
  name?: string
  poster_path?: string
  backdrop_url?: string
  backdrop_path?: string
  vote_average?: number
  popularity?: number
}
