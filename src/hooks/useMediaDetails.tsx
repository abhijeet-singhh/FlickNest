import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movieService } from '../api/services/movieService'
import { Video } from '../types/details.types'
import {
  setLoading,
  setError,
  setMediaType,
  setDetails,
  setCredits,
  setVideos,
  setSimilar,
  resetState
} from '../store/slices/mediaDetailsSlice'
import { RootState } from '../store'

export const useMediaDetails = (id: string | undefined) => {
  const dispatch = useDispatch()
  const mediaDetails = useSelector((state: RootState) => state.mediaDetails)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const fetchAdditionalDetails = async (type: 'movie' | 'tv', mediaId: string) => {
        const [creditsRes, videosRes, similarRes] = await Promise.all([
          movieService.getMediaInfo(type, mediaId).credits(),
          movieService.getMediaInfo(type, mediaId).videos(),
          movieService.getMediaInfo(type, mediaId).similar()
        ])

        dispatch(setCredits(creditsRes.data))
        dispatch(setVideos(videosRes.data.results.filter((v: Video) => v.type === 'Trailer')))
        dispatch(setSimilar(similarRes.data.results))
      }

      try {
        try {
          const movieDetails = await movieService.getMediaInfo('movie', id).details()
          dispatch(setMediaType('movie'))
          dispatch(setDetails(movieDetails.data))
          await fetchAdditionalDetails('movie', id)
        } catch {
          const tvDetails = await movieService.getMediaInfo('tv', id).details()
          dispatch(setMediaType('tv'))
          dispatch(setDetails(tvDetails.data))
          await fetchAdditionalDetails('tv', id)
        }
      } catch (err) {
        dispatch(setError('Failed to load media details'))
        console.error(err)
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchDetails()

    return () => {
      dispatch(resetState())
    }
  }, [id, dispatch])

  return mediaDetails
}