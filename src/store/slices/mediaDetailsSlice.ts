import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MediaDetails, Credits, Video, SimilarMediaItem } from '../../types/details.types'

interface MediaDetailsState {
  mediaType: 'movie' | 'tv'
  details: MediaDetails | null
  credits: Credits | null
  videos: Video[]
  similar: SimilarMediaItem[]
  recommended: SimilarMediaItem[]
  loading: boolean
  error: string | null
}

const initialState: MediaDetailsState = {
  mediaType: 'movie',
  details: null,
  credits: null,
  videos: [],
  similar: [],
  recommended: [],
  loading: false,
  error: null
}

export const mediaDetailsSlice = createSlice({
  name: 'mediaDetails',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setMediaType: (state, action: PayloadAction<'movie' | 'tv'>) => {
      state.mediaType = action.payload
    },
    setDetails: (state, action: PayloadAction<MediaDetails>) => {
      state.details = action.payload
    },
    setCredits: (state, action: PayloadAction<Credits>) => {
      state.credits = action.payload
    },
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload
    },
    setSimilar: (state, action: PayloadAction<SimilarMediaItem[]>) => {
      state.similar = action.payload
    },
    setRecommended: (state, action: PayloadAction<SimilarMediaItem[]>) => {
      state.recommended = action.payload
    },
    resetState: (state) => {
      Object.assign(state, initialState)
    }
  }
})

export const {
  setLoading,
  setError,
  setMediaType,
  setDetails,
  setCredits,
  setVideos,
  setSimilar,
  setRecommended,
  resetState
} = mediaDetailsSlice.actions

export default mediaDetailsSlice.reducer