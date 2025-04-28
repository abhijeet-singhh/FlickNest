import { useSelector } from "react-redux"
import { RootState } from "../app/store"

interface BannerData {
  backdrop_path: string;
}

const HomeBanner = () => {

  const bannerData = useSelector((state: RootState) => state.movieData.bannerData ?? []) as BannerData[]
  const imageURL = useSelector((state: RootState) => state.movieData.imageURL)

  return (
    <section className="w-full h-full">
      <div className="flex">
        {bannerData.map((data, index) => (
          <div key={index} className="min-w-full max-h-[95vh]">
            <img src={imageURL+data.backdrop_path} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeBanner
