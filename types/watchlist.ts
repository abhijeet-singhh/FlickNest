export type WatchlistMediaType = "movie" | "tv";

export interface WatchlistItem {
  id: string;
  userId: string;
  tmdbId: number;
  mediaType: WatchlistMediaType;
  createdAt: Date;
}
