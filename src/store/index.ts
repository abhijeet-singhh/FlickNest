import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './slices/movieSlice.ts'
import mediaDetailsReducer from './slices/mediaDetailsSlice.ts'
import authReducer from './slices/authSlice.ts'

export const store = configureStore({
  reducer: {
    movieData : movieReducer,
    mediaDetails: mediaDetailsReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch