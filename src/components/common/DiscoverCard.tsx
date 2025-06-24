import { useSelector } from "react-redux"
import { CardProps } from "../../types/movie.types"
import { RootState } from "../../store"
import { formatPopularity, formatRating, truncateText } from "../../utils/formatters"
import { FaFilm, FaFire } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const DiscoverCard = ({ data, mediaType }: CardProps) => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/explore/details/${data.id}`)
    }

    const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
    const title = truncateText(data.title || data.name || 'Untitled')

    return (
        <div onClick={handleClick} className="w-full h-[90px] border-zinc-800 px-1 flex items-center gap-4 overflow-hidden cursor-pointer">
            <div className="w-[65px] h-[80px] rounded-md overflow-hidden flex-shrink-0">
                <img
                    src={`${imageURL}/${data.poster_path || data.backdrop_path}`}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-[15px] text-zinc-100 font-bold">{title}</h3>
                <div className="flex items-center gap-1">
                    <span className="flex items-center justify-around gap-1 border border-[#fee685]/50 bg-[#fee685]/20 bg-opacity-20 backdrop-blur-sm opacity-95 px-2 py-[.8px] rounded-l">
                        <FaFire size={10} className="text-[#fee685]/80 opacity-90" />
                        <p className="text-[12px] text-[#fee685]/80 font-semibold mt-[.5px]">{formatRating(data.vote_average)}</p>
                    </span>
                    <span className="flex items-center justify-around gap-1 border border-[#e4e4e7]/50 bg-[#e4e4e7]/20 opacity-95 px-2 py-[.8px] rounded-r">
                        <FaFilm size={12} className="text-[#e4e4e7]/90 opacity-80 mb-[.5px]" />
                        <p className="text-[12px] text-[#e4e4e7]/90 font-semibold">{formatPopularity(data.popularity)}</p>
                    </span>
                    <span className="text-zinc-500 text-[14px] ml-2 flex items-center gap-2">• <p className="text-zinc-400 poppins">{mediaType}</p></span>
                </div>
            </div>
        </div>
    )
}

export default DiscoverCard