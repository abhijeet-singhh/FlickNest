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
import ScrollToTopButton from '../components/common/ScrollToTopButton'

const Details = () => {

  const loadGif = "/assets/load.gif";

  const castScrollRef = useRef<HTMLDivElement>(null);
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  const { id, mediaType } = useParams();
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
  const { details, credits, videos, similar, recommended, loading, error } = useMediaDetails(id, mediaType as 'movie' | 'tv')
  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <img src={loadGif} className='w-16' />
      <span>Loading...</span>
    </div>
  }
  if (error || !details) {
    return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>
  }
  return (
    <div className="pt-10 md:pt-16 pb-14 md:pb-0 min-h-screen bg-[#151320]">
      <MediaHero details={details} imageURL={imageURL} />
      {/* Cast Section */}
      {credits?.cast && credits.cast.length > 0 && (
        <section className="px-4 md:px-8 py-5 md:py-8 md:mt-10">
          <div className="max-w-6xl mx-auto border border-zinc-800 rounded-2xl px-4 mb-5">
            <div className='flex items-center justify-between my-2 md:my-4'>
              <h2 className="text-xl md:text-2xl font-bold text-[#B1D690]">Cast</h2>
              <div className='hidden md:block'>
                <button onClick={() => scrollLeft(castScrollRef)} className='px-2 py-[2px] rounded-xl border border-[#B1D960]/70 bg-[#B1D960]/30 text-[#B1D960] cursor-pointer'><MdKeyboardArrowLeft /></button>
                <button onClick={() => scrollRight(castScrollRef)} className='px-2 py-[2px] rounded-xl border border-[#B1D960]/70 bg-[#B1D960]/30 text-[#B1D960] ml-1 cursor-pointer'><MdKeyboardArrowRight /></button>
              </div>
              <p className='md:hidden text-[12px] text-[#B1D960]/70 flex items-center'>Scroll <MdKeyboardArrowRight /> </p>
            </div>
            <div ref={castScrollRef} className="flex gap-6 overflow-x-auto md:overflow-x-hidden pb-4 scrollbar-hide">
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
        <section className="px-4 md:px-8 py-5 md:py-8 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <div className='flex items-center justify-between mb-6'>
              <h2 className="text-xl md:text-2xl font-bold text-[#B1D690] my-auto">Trailers & Videos</h2>
              <div className='hidden md:block'>
                <button onClick={() => scrollLeft(videoScrollRef)} className='px-2 py-[2px] rounded-xl border border-[#B1D960]/70 bg-[#B1D960]/30 text-[#B1D960] cursor-pointer'><MdKeyboardArrowLeft /></button>
                <button onClick={() => scrollRight(videoScrollRef)} className='px-2 py-[2px] rounded-xl border border-[#B1D960]/70 bg-[#B1D960]/30 text-[#B1D960] ml-1 cursor-pointer'><MdKeyboardArrowRight /></button>
              </div>
              <p className='md:hidden text-[12px] text-[#B1D960]/70 flex items-center'>Scroll <MdKeyboardArrowRight /> </p>
            </div>
            <div ref={videoScrollRef} className="flex gap-6 overflow-x-auto md:overflow-x-hidden pb-4 scrollbar-hide">
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
        <section className="md:px-2 py-4 md:py-8 flex flex-col md:flex-row justify-end items-start gap-5 md:gap-10">
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-10 px-3 md:px-4 text-[#B1D690]">
              Similar {mediaType === 'movie' ? 'Movies' : 'Shows'}
            </h2>
            <div className="flex gap-4 md:gap-6 overflow-x-hidden justify-center flex-wrap pb-4 scrollbar-hide">
              {similar.filter(item => item.poster_path || item.backdrop_url).slice(0, 15).map(item => {
                const cardData = {
                  ...item,
                  poster_path: item.poster_path || '',
                  backdrop_path: item.backdrop_path || item.backdrop_url || '',
                };
                return (
                  <div key={item.id} className="flex-shrink-0 w-[160px] md:w-[200px] cursor-pointer">
                    <Card data={cardData} mediaType={item.media_type === 'movie' ? 'Movie' : item.media_type === 'tv' ? 'TV' : mediaType === 'movie' ? 'Movie' : 'TV'} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className=' w-full md:w-105 pb-10 px-3 md:px-0'>
            <DiscoverColumn
              title="Recommended"
              data={recommended.filter(item => item.poster_path || item.backdrop_url).slice(0, 9).map(item => ({
                id: item.id,
                title: item.title || item.name || '',
                poster_path: item.poster_path || '',
                backdrop_path: item.backdrop_path || item.backdrop_url || '',
                vote_average: item.vote_average,
                popularity: item.popularity,
              }))}
              mediaType={mediaType === 'movie' ? 'Movie' : 'TV'}
              path={`/explore/${mediaType === 'movie' ? 'movies' : 'tvshows'}`}
              hiddenViewMore={true}
              maxItems={9}
            />
            {recommended.filter(item => item.poster_path || item.backdrop_url).length === 0 && (
              <p className="text-zinc-400 mt-4">No recommended content found.</p>
            )}
          </div>
        </section>
      )}
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
export default Details
