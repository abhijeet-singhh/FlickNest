import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface MovieState {
    bannerData: MovieData[]
    imageURL: string
    trendingData: MovieData[]
    upcomingData: MovieData[]
}

const initialState: MovieState = {
    bannerData : [],
    imageURL : '',
    trendingData: [],
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
        }
    }
})

export const { setBannerData, setImageURL, setTrendingData, setUpcomingData } = movieSlice.actions

export default movieSlice.reducer