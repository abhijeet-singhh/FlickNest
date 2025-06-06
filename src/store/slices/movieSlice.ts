import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieData } from "../../types/movie.types";

interface MovieState {
    bannerData: MovieData[]
    imageURL: string
    trendingData: MovieData[],
    nowPlaying: MovieData[],
    topRated: MovieData[],
    onTheAir: MovieData[],
    airingToday: MovieData[],
    upcomingData: MovieData[]
}

const initialState: MovieState = {
    bannerData : [],
    imageURL : '',
    trendingData: [],
    nowPlaying: [],
    topRated: [],
    onTheAir: [],
    airingToday: [],
    upcomingData: []
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers : {
        setBannerData: (state, action: PayloadAction<MovieData[]>) => {
            state.bannerData = action.payload
        },
        setImageURL: (state, action: PayloadAction<string>) => {
            state.imageURL = action.payload
        },
        setTrendingData: (state, action: PayloadAction<MovieData[]>) => {
            state.trendingData = action.payload
        },
        setUpcomingData: (state, action: PayloadAction<MovieData[]>) => {
            state.upcomingData = action.payload
        },

        // Discover related reducers
        setNowPlaying: (state, action: PayloadAction<MovieData[]>) => {
            state.nowPlaying = action.payload
        },
        setTopRated: (state, action: PayloadAction<MovieData[]>) => {
            state.topRated = action.payload
        },
        setOnTheAir: (state, action: PayloadAction<MovieData[]>) => {
            state.onTheAir = action.payload
        },
        setAiringToday: (state, action: PayloadAction<MovieData[]>) => {
            state.airingToday = action.payload
        },
    }
})

export const { setBannerData, setImageURL, setTrendingData, setUpcomingData, setNowPlaying, setTopRated, setOnTheAir, setAiringToday } = movieSlice.actions

export default movieSlice.reducer