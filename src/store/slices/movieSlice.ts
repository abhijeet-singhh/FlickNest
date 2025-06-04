import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieData } from "../../types/movie.types";

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