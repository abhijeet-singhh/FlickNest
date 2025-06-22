import { useSelector } from 'react-redux'
import { RootState } from '../store'
import MediaHero from '../components/sections/MediaHero'
import Footer from '../components/layout/Footer'
import { useMediaDetails } from '../hooks/useMediaDetails'
import { useRef } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import DiscoverColumn from '../components/sections/DiscoverColumn'
import Card from '../components/common/Card'
import { useParams } from 'react-router-dom'
const Details = () => {

  const castScrollRef = useRef<HTMLDivElement>(null);
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  const { id } = useParams()
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
  const { mediaType, details, credits, videos, similar, recommended, loading, error } = useMediaDetails(id)
  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <img src="/assets/load.gif" className='w-16' />
      <span>Loading...</span>
    </div>
  }
  if (error || !details) {
    return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>
  }
  return (
    <div className="pt-16 min-h-screen bg-[#151320]">
      <MediaHero details={details} imageURL={imageURL} />
      {/* Cast Section */}
      {credits?.cast && credits.cast.length > 0 && (
        <section className="px-4 md:px-8 py-8 mt-10">
          <div className="max-w-6xl mx-auto border border-zinc-800 rounded-2xl px-4 mb-5">
            <div className='flex items-center justify-between'>
              <h2 className="text-2xl font-bold mb-4 text-[#B1D690]">Cast</h2>
              <div>
                <button onClick={() => scrollLeft(castScrollRef)} className='border px-2 py-[2px] rounded-xl bg-[#B1D960] text-black opacity-80 cursor-pointer'><MdKeyboardArrowLeft /></button>
                <button onClick={() => scrollRight(castScrollRef)} className='border px-2 py-[2px] rounded-xl bg-[#B1D960] text-black ml-1 opacity-80 cursor-pointer'><MdKeyboardArrowRight /></button>
              </div>
            </div>
            <div ref={castScrollRef} className="flex gap-6 overflow-x-hidden pb-4 scrollbar-hide">
              {credits?.cast.slice(0, 10).map(actor => (
                <div key={actor.id} className="flex-shrink-0 w-32 cursor-pointer">
                  <img
                    src={actor.profile_path ? `${imageURL}${actor.profile_path}` : '/placeholder.png'}
                    alt={actor.name}
                    loading='lazy'
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold text-sm line-clamp-1">{actor.name}</p>
                  <p className="text-gray-400 text-[12px] line-clamp-2">{actor.character}</p>
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
            <div className='flex items-center justify-between mb-3'>
              <h2 className="text-2xl font-bold mb-6 text-[#B1D690]">Trailers & Videos</h2>
              <div>
                <button onClick={() => scrollLeft(videoScrollRef)} className='border px-2 py-[2px] rounded-xl bg-[#B1D960] text-black opacity-80 cursor-pointer'><MdKeyboardArrowLeft /></button>
                <button onClick={() => scrollRight(videoScrollRef)} className='border px-2 py-[2px] rounded-xl bg-[#B1D960] text-black ml-1 opacity-80 cursor-pointer'><MdKeyboardArrowRight /></button>
              </div>
            </div>
            <div ref={videoScrollRef} className="flex gap-6 overflow-x-hidden pb-4 scrollbar-hide">
              {videos.map(video => (
                <div key={video.key} className="flex-shrink-0 w-80">
                  <iframe
                    width="320"
                    height="180"
                    src={`https://www.youtube.com/embed/${video.key}?modestbranding=1&rel=0`}
                    title={video.name}
                    loading='lazy'
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                  <p className='line-clamp-1 mt-2 ml-1 text-zinc-300 text-sm'>{video.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Similar Content */}
      {(similar.length > 0 || recommended.length > 0) && (
        <section className="px-4 md:px-8 py-8 flex justify-end items-start gap-15">
          <div className="max-w-235">
            <h2 className="text-2xl font-bold mb-10 text-[#B1D690]">
              Similar {mediaType === 'movie' ? 'Movies' : 'Shows'}
            </h2>
            <div className="flex gap-7 overflow-x-hidden flex-wrap pb-4 scrollbar-hide">
              {similar.filter(item => item.poster_path || item.backdrop_url).slice(0, 15).map(item => {
                const cardData = {
                  ...item,
                  poster_path: item.poster_path || '',
                  backdrop_path: item.backdrop_path || item.backdrop_url || '',
                };
                return (
                  <div key={item.id} className="flex-shrink-0 w-40 cursor-pointer">
                    <Card data={cardData} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='w-85 pb-10'>
            <DiscoverColumn
              title="Recommended"
              data={recommended.filter(item => item.poster_path || item.backdrop_url).slice(0, 8).map(item => ({
                id: item.id,
                title: item.title || item.name || '',
                poster_path: item.poster_path || '',
                backdrop_path: item.backdrop_path || item.backdrop_url || '',
              }))}
              mediaType={mediaType === 'movie' ? 'Movie' : 'TV'}
              path={`/explore/${mediaType === 'movie' ? 'movies' : 'tvshows'}`}
              hiddenViewMore={true}
              maxItems={8}
            />
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}
export default Details
