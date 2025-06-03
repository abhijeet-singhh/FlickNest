import { useSelector } from "react-redux"
import { BannerData } from "../app/features/movieSlice"
import { RootState } from "../app/store"

interface CardProps {
    data: BannerData
    indexLabel: string
}

const truncateText = (text: string, maxLength = 20): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const Card = ({data, indexLabel}: CardProps) => {

    const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
    const title = data.title || data.name || 'Untitled'

  return (
    <div className="md:flex relative items-end gap-2 md:w-[220px]">
        <div className="absolute top-0 left-0 md:hidden bg-black px-1">{indexLabel}</div>
        <div className="hidden md:block md:relative">
            <div className="absolute bottom-28 -left-[75px] w-44 transform -rotate-90 font-bold text-[16px]">{truncateText(title)}</div>
            <div className="text-xl text-[#B1D690] font-bold">{indexLabel}</div>
        </div>
        <div className="w-full mr-[6px] max-w-[120px] md:max-w-[200px] h-44 md:h-65 md:rounded overflow-hidden">
            <img src={imageURL + data.backdrop_path} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
    </div>
  )
}

export default Card