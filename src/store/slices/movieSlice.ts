import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieData } from "../../types/movie.types";

// Optional: define strict keys if you want autocomplete/type safety
export type MovieDataKey =
  | 'bannerData'
  | 'trendingData'
  | 'nowPlaying'
  | 'topRated'
  | 'onTheAir'
  | 'airingToday'
  | 'nowPlaying300'
  | 'topRated300'
  | 'onTheAir300'
  | 'airingToday300'
  | 'upcomingData'
  | 'upcomingData300'
  | 'tvShows300'
  | 'movies300'
  | 'trending300'
  | 'newData'
  | 'new300';

interface MovieState {
  dataMap: Record<MovieDataKey, MovieData[]>;
  imageURL: string;
}

const initialState: MovieState = {
  dataMap: {
    bannerData: [],
    trendingData: [],
    nowPlaying: [],
    topRated: [],
    onTheAir: [],
    airingToday: [],
    nowPlaying300: [],
    topRated300: [],
    onTheAir300: [],
    airingToday300: [],
    upcomingData: [],
    upcomingData300: [],
    tvShows300: [],
    movies300: [],
    trending300: [],
    newData: [],
    new300: [],
  },
  imageURL: '',
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setImageURL: (state, action: PayloadAction<string>) => {
      state.imageURL = action.payload;
    },
    setMovieDataByKey: (
      state,
      action: PayloadAction<{ key: MovieDataKey; data: MovieData[] }>
    ) => {
      state.dataMap[action.payload.key] = action.payload.data;
    },
  },
});

// Export actions
export const { setImageURL, setMovieDataByKey } = movieSlice.actions;

// Export reducer
export default movieSlice.reducer;