import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import MediaHero from '../components/sections/MediaHero'
import Footer from '../components/layout/Footer'
import { useMediaDetails } from '../hooks/useMovieDetails'

const Details = () => {
  const { id } = useParams()
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
  const { mediaType, details, credits, videos, similar, loading, error } = useMediaDetails(id)

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  if (error || !details) {
    return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>
  }

  return (
    <div className="pt-16 min-h-screen bg-[#151320]">
      <MediaHero details={details} imageURL={imageURL} />

      {/* Cast Section */}
      {credits?.cast && credits.cast.length > 0 && (
        <section className="px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#B1D690]">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {credits?.cast.slice(0, 10).map(actor => (
                <div key={actor.id} className="flex-shrink-0 w-32">
                  <img
                    src={actor.profile_path ? `${imageURL}${actor.profile_path}` : '/placeholder.png'}
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold text-sm">{actor.name}</p>
                  <p className="text-gray-400 text-sm">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {videos.length > 0 && (
        <section className="px-4 md:px-8 py-8 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#B1D690]">Trailers</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {videos.map(video => (
                <div key={video.key} className="flex-shrink-0 w-80">
                  <iframe
                    width="320"
                    height="180"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar Content */}
      {similar.length > 0 && (
        <section className="px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#B1D690]">
              Similar {mediaType === 'movie' ? 'Movies' : 'Shows'}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {similar.slice(0, 10).map(item => (
                <div key={item.id} className="flex-shrink-0 w-40">
                  <img
                    src={`${imageURL}${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-60 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold text-sm">{item.title || item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default Details