import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BannerData {
    backdrop_path: string;
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
    popularity?: number;
}

export interface TrendingData {
    backdrop_path: string;
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
    popularity?: number;
}

interface MovieState {
    bannerData: BannerData[]
    imageURL: string
    trendingData: TrendingData[]
}

const initialState: MovieState = {
    bannerData : [],
    imageURL : '',
    trendingData: []
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers : {
        setBannerData: (state, action: PayloadAction<BannerData[]>) => {
            state.bannerData = action.payload
        },
        setImageURL: (state, action: PayloadAction<string>) => {
            state.imageURL = action.payload
        },
        setTrendingData: (state, action: PayloadAction<BannerData[]>) => {
            state.trendingData = action.payload
        },
    }
})

export const { setBannerData, setImageURL, setTrendingData } = movieSlice.actions

export default movieSlice.reducer