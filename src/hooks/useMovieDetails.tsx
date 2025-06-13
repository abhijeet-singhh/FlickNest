import { useState, useEffect } from 'react'
import { movieService } from '../api/services/movieService'
import { MediaDetails, Credits, Video } from '../types/details.types'

export const useMediaDetails = (id: string | undefined) => {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie')
  const [details, setDetails] = useState<MediaDetails | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [similar, setSimilar] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return
      setLoading(true)
      try {
        await fetchMediaDetails()
      } catch (err) {
        setError('Failed to load media details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  const fetchMediaDetails = async () => {
    // Try movie first
    try {
      const movieDetails = await movieService.getMediaInfo('movie', id).details()
      setMediaType('movie')
      setDetails(movieDetails.data)
      await fetchAdditionalDetails('movie')
    } catch {
      // If movie fails, try TV show
      const tvDetails = await movieService.getMediaInfo('tv', id).details()
      setMediaType('tv')
      setDetails(tvDetails.data)
      await fetchAdditionalDetails('tv')
    }
  }

  const fetchAdditionalDetails = async (type: 'movie' | 'tv') => {
    const [creditsRes, videosRes, similarRes] = await Promise.all([
      movieService.getMediaInfo(type, id).credits(),
      movieService.getMediaInfo(type, id).videos(),
      movieService.getMediaInfo(type, id).similar()
    ])

    setCredits(creditsRes.data)
    setVideos(videosRes.data.results.filter((v: Video) => v.type === 'Trailer'))
    setSimilar(similarRes.data.results)
  }

  return { mediaType, details, credits, videos, similar, loading, error }
}