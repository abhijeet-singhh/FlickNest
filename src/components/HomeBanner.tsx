import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { BannerData } from "../app/features/movieSlice"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

const HomeBanner = () => {
  const bannerData = useSelector((state: RootState) => state.movieData.bannerData ?? []) as BannerData[]
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)

  return (
    <section className="w-full h-[32vh] lg:h-[90vh] relative overflow-hidden rounded">
      <div className="flex overflow-x-auto snap-x snap-mandatory h-full">
        {bannerData.map((data, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 w-full h-full relative"
          >
            {/* Banner Image */}
            <img
              src={imageURL + data.backdrop_path}
              loading="lazy"
              className="w-full h-full object-cover"
              alt={data.title}
            />

            {/* Overlay (Gradient + Content) */}
            <div className="absolute bottom-0 inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end pointer-events-none">
              <div className="flex justify-between items-end px-4 mb-2 md:mb-8 md:px-10 pb-2 md:pb-6 w-full h-full">
                {/* Left: Details */}
                <div className="text-white lg:max-w-[50%] space-y-1 md:space-y-3 pointer-events-auto">
                  <h2 className="text-2xl md:text-4xl font-bold">{data.title || data.name}</h2>
                  <p className="text-sm md:text-base line-clamp-2 lg:line-clamp-3">{data.overview}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <button className="bg-[#B1D690] hidden md:inline-block rounded px-4 py-1 text-neutral-900 text-sm">Details</button>
                    <span className="text-neutral-400">Ratings: {Number(data.vote_average).toFixed(1)}</span>
                    <span className="text-neutral-400">|</span>
                    <span className="text-neutral-400">Views: {Number(data.popularity).toFixed(0)}</span>
                  </div>
                </div>

                {/* Right: Buttons */}
                <div className="hidden lg:flex gap-2 pointer-events-auto">
                  <button className="px-2 py-1 bg-[#B1D690] text-black font-bold rounded-md">
                    <MdKeyboardArrowLeft size={24} />
                  </button>
                  <button className="px-2 py-1 bg-[#B1D690] text-black font-bold rounded-md">
                    <MdKeyboardArrowRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeBanner
