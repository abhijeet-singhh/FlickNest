import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BannerData {
    backdrop_path: string;
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
}

interface MovieState {
    bannerData: BannerData[]
    imageURL: string
}

const initialState: MovieState = {
    bannerData : [],
    imageURL : ''
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
        }
    }
})

export const { setBannerData, setImageURL } = movieSlice.actions

export default movieSlice.reducer