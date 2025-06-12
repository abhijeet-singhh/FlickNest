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
    nowPlaying300: MovieData[],
    topRated300: MovieData[],
    onTheAir300: MovieData[],
    airingToday300: MovieData[],
    upcomingData: MovieData[],
    upcomingData300: MovieData[],
    tvShows300: MovieData[],
    movies300: MovieData[],
    trending300: MovieData[],
    new300: MovieData[],
}

const initialState: MovieState = {
    bannerData : [],
    imageURL : '',
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
    new300: [],
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

        // Discover with multiple pages related reducers
        setNowPlaying300: (state, action: PayloadAction<MovieData[]>) => {
            state.nowPlaying300 = action.payload
        },
        setTopRated300: (state, action: PayloadAction<MovieData[]>) => {
            state.topRated300 = action.payload
        },
        setOnTheAir300: (state, action: PayloadAction<MovieData[]>) => {
            state.onTheAir300 = action.payload
        },
        setAiringToday300: (state, action: PayloadAction<MovieData[]>) => {
            state.airingToday300 = action.payload
        },
        setUpcomingData300: (state, action: PayloadAction<MovieData[]>) => {
            state.upcomingData300 = action.payload
        },
        setTvShows300: (state, action: PayloadAction<MovieData[]>) => {
            state.tvShows300 = action.payload
        },
        setMovies300: (state, action: PayloadAction<MovieData[]>) => {
            state.movies300 = action.payload
        },
        setTrending300: (state, action: PayloadAction<MovieData[]>) => {
            state.trending300 = action.payload
        },
        setNew300: (state, action: PayloadAction<MovieData[]>) => {
            state.new300 = action.payload
        },
    }
})

export const { setBannerData, setImageURL, setTrendingData, setUpcomingData, setNowPlaying, setTopRated, setOnTheAir, setAiringToday, setNowPlaying300, setTopRated300, setOnTheAir300, setAiringToday300, setUpcomingData300, setTvShows300, setMovies300, setTrending300, setNew300 } = movieSlice.actions

export default movieSlice.reducer