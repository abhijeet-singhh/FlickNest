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
  setRecommended,
  resetState
} from '../store/slices/mediaDetailsSlice'
import { RootState } from '../store'

export const useMediaDetails = (id: string | undefined, mediaType?: 'movie' | 'tv') => {
  const dispatch = useDispatch()
  const mediaDetails = useSelector((state: RootState) => state.mediaDetails)

  useEffect(() => {
    if (!id || !mediaType) return

    const fetchDetails = async () => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const fetchAdditionalDetails = async (type: 'movie' | 'tv', mediaId: string) => {
        const [creditsRes, videosRes, similarRes, recommendedRes] = await Promise.all([
          movieService.getMediaInfo(type, mediaId).credits(),
          movieService.getMediaInfo(type, mediaId).videos(),
          movieService.getMediaInfo(type, mediaId).similar(),
          movieService.getMediaInfo(type, mediaId).recommendations()
        ])

        dispatch(setCredits(creditsRes.data))
        dispatch(setVideos(videosRes.data.results.filter((v: Video) => v.type === 'Trailer')))
        dispatch(setSimilar(similarRes.data.results))
        dispatch(setRecommended(recommendedRes.data.results))
      }

      try {
        const detailsRes = await movieService.getMediaInfo(mediaType, id).details()
        dispatch(setMediaType(mediaType))
        dispatch(setDetails(detailsRes.data))
        await fetchAdditionalDetails(mediaType, id)
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
  }, [id, mediaType, dispatch])

  return mediaDetails
}