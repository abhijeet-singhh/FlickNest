import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { CardProps } from "../../types/movie.types"
import { truncateText } from "../../utils/formatters"
import { useNavigate } from "react-router-dom"

const TrendingCard = ({ data, indexLabel }: CardProps) => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/explore/details/${data.id}`)
    }

    const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
    const title = data.title || data.name || 'Untitled'

    return (
        <div onClick={handleClick} className="md:flex relative items-end gap-2 md:w-[220px] cursor-pointer">
            <div className="absolute top-0 left-0 md:hidden bg-black px-1">{indexLabel}</div>
            <div className="hidden md:block md:relative">
                <div className="absolute bottom-28 -left-[75px] w-44 transform -rotate-90 font-bold text-[16px]">
                    {truncateText(title, 20)}
                </div>
                <div className="text-xl text-[#B1D690] font-bold">{indexLabel}</div>
            </div>
            <div className="w-full mr-[6px] max-w-[120px] md:max-w-[200px] h-44 md:h-65 overflow-hidden">
                <img 
                    src={`${imageURL}/${data.poster_path}`} 
                    alt={title}
                    loading="lazy" 
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
    )
}

export default TrendingCard
