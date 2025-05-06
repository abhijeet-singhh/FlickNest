import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { BannerData } from "../app/features/movieSlice";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const HomeBanner = () => {
  const bannerData = useSelector((state: RootState) => state.movieData.bannerData ?? []) as BannerData[]
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = bannerData.length;

  // Memoize scroll function to avoid recreating it on every render
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: width * index,
      behavior: "smooth"
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  }, [slideCount]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Reset auto-scroll when component mounts or dependencies change
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      
      // Only start auto-scroll if there are multiple slides and not paused
      if (slideCount > 1 && !isPaused) {
        autoScrollRef.current = setInterval(handleNext, 5000);
      }
    };

    startAutoScroll();

    // Cleanup on unmount
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [handleNext, slideCount, isPaused]);

  // Scroll to the updated index whenever it changes
  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex, scrollToIndex]);

  // Pause auto-scroll when user interacts with banner
  const pauseAutoScroll = () => setIsPaused(true);
  const resumeAutoScroll = () => setIsPaused(false);

  // Don't render if no banner data
  if (!bannerData.length) return null;

  return (
    <section className="w-full h-[32vh] lg:h-[90vh] relative overflow-hidden rounded">
      <div
        ref={scrollRef}
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
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
