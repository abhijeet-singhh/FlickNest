import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { BannerData } from "../app/features/movieSlice";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdStarRate, MdVisibility } from "react-icons/md";

const HomeBanner = () => {
  const bannerData = useSelector((state: RootState) => state.movieData.bannerData ?? []) as BannerData[]
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = bannerData.length;
  const isMobile = window.innerWidth <= 768

  // Memoize scroll function to avoid recreating it on every render
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollLeft = width * index;
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  }, [slideCount]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Reset auto-scroll when component mounts or dependencies change
  useEffect(() => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);

      // Only start auto-scroll if there are multiple slides and not paused
      if (slideCount > 1 && !isPaused) {
        autoScrollRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 >= slideCount) {
              return 0;
            } else {
              return prevIndex + 1;
            }
          })
        }, 4000);
      }

    // Cleanup on unmount
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [slideCount, isPaused, isMobile]);

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
    <section
      className="w-full h-[40vh] lg:h-[85vh] relative overflow-hidden rounded-xl shadow-2xl"
      aria-label="Featured movies carousel"
    >

      <div className="absolute bottom-4 left-0 right-0 z-10 hidden md:flex justify-center gap-1.5 sm:gap-2">
        {bannerData.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index
              ? "bg-[#B1D690] w-8"
              : "bg-white/30 w-3 hover:bg-white/60"
              }`}
          />
        ))}
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto md:overflow-x-hidden snap-x snap-mandatory h-full custom-scrollbar scroll-smooth"
        role="region"
        aria-roledescription="carousel"
        aria-label="Movie highlights"
        onTouchStart={pauseAutoScroll}
        onTouchEnd={resumeAutoScroll}
      >
        {bannerData.map((data, index) => (
          <div
            key={`slide-${data.id || index}`}
            className="snap-start flex-shrink-0 w-full h-full relative"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slideCount}`}
          >
            <div className="w-full h-full bg-gray-800 ">
              <img
                src={imageURL + data.backdrop_path}
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover transform transition-transform duration-500"
                alt=""
                aria-hidden="true"
              />
            </div>

            <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end">
              <div className="flex justify-between items-end px-4 mb-2 md:mb-8 md:px-16 pb-6 md:pb-10 w-full">
                <div className="text-white lg:max-w-[60%] space-y-2 md:space-y-4">
                  <h2 className="text-[#B1D690] text-[12px] md:text-xl">#{index} Spotlight</h2>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {data.title || data.name}
                  </h2>
                  <p className="text-sm md:text-lg line-clamp-2 lg:line-clamp-3 text-gray-200 font-medium">
                    {data.overview}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <button
                      onMouseEnter={pauseAutoScroll}
                      onMouseLeave={resumeAutoScroll}
                      className="bg-[#B1D690] hover:bg-[#9fc57d] transition-all duration-300 rounded-full px-3 py-1.5 md:px-6 md:py-2 text-neutral-900 font-semibold md:font-bold shadow-lg hover:shadow-xl active:scale-95 focus:ring-2 focus:ring-white"
                      aria-label={`View details for ${data.title || data.name}`}
                    >
                      Watch Now
                    </button>
                    <button
                      onMouseEnter={pauseAutoScroll}
                      onMouseLeave={resumeAutoScroll}
                      className="border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 text-white rounded-full px-3 py-1.5 md:px-6 md:py-2 font-semibold md:font-bold shadow-lg hover:shadow-xl active:scale-95 focus:ring-2 focus:ring-white"
                      aria-label={`Add ${data.title || data.name} to watchlist`}
                    >
                      + Watchlist
                    </button>

                    <div className="hidden md:flex items-center gap-3 ml-1 mt-2 md:mt-0 md:ml-4 text-gray-300">
                      <span className="flex items-center gap-1">
                        <MdStarRate className="text-yellow-400" />
                        {Number(data.vote_average).toFixed(1)}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="flex items-center gap-1">
                        <MdVisibility className="text-blue-300" />
                        {Number(data.popularity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slideCount > 1 && (
        <div className="absolute z-10 hidden lg:flex justify-between w-full top-1/2 -translate-y-1/2 px-4 md:px-6">
          <button
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
            onClick={handlePrevious}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300 shadow-xl hover:scale-110 focus:outline-none hover:ring-2 hover:ring-white/60"
            aria-label="Previous slide"
          >
            <MdKeyboardArrowLeft size={28} />
          </button>
          <button
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
            onClick={handleNext}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300 shadow-xl hover:scale-110 focus:outline-none hover:ring-2 hover:ring-white/60"
            aria-label="Next slide"
          >
            <MdKeyboardArrowRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
export default HomeBanner
