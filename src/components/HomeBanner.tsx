import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { BannerData } from "../app/features/movieSlice"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
const HomeBanner = () => {
  const bannerData = useSelector((state: RootState) => state.movieData.bannerData ?? []) as BannerData[]
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const slideCount = bannerData.length
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth"
      })
    }
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount)
  }
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount)
  }
  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [slideCount])

  useEffect(() => {
    scrollToIndex(currentIndex)
  }, [currentIndex])
  return (
    <section className="w-full h-[32vh] lg:h-[90vh] relative overflow-hidden rounded">
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory h-full custom-scrollbar"
      >
        {bannerData.map((data, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 w-full h-full relative"
          >
            <img
              src={imageURL + data.backdrop_path}
              loading="lazy"
              className="w-full h-full object-cover"
              alt={data.title}
            />
            <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end pointer-events-none">
              <div className="flex justify-between items-end px-4 mb-2 md:mb-8 md:px-16 pb-2 md:pb-6 w-full h-full">
                <div className="text-white lg:max-w-[50%] space-y-1 md:space-y-3 pointer-events-auto">
                  <h2 className="text-2xl md:text-4xl font-bold">{data.title || data.name}</h2>
                  <p className="text-sm md:text-base line-clamp-2 lg:line-clamp-3">{data.overview}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <button className="bg-[#B1D690] opacity-85 hover:opacity-100 hidden md:inline-block rounded px-5 py-2 md:mr-4 text-neutral-900 text-sm font-bold cursor-pointer">Details</button>
                    <span className="text-neutral-400">Ratings: {Number(data.vote_average).toFixed(1)}</span>
                    <span className="text-neutral-400">|</span>
                    <span className="text-neutral-400">Views: {Number(data.popularity).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 right-10 z-10 hidden lg:flex flex-col gap-2 pointer-events-auto">
          <button onClick={handlePrevious} className="px-2 py-1 cursor-pointer bg-[#B1D690] opacity-85 hover:opacity-100 text-black font-bold rounded-md">
            <MdKeyboardArrowLeft size={24} />
          </button>
          <button onClick={handleNext} className="px-2 py-1 cursor-pointer bg-[#B1D690] opacity-85 hover:opacity-100 text-black font-bold rounded-md">
            <MdKeyboardArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}
export default HomeBanner
