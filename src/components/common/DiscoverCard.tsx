import { useSelector } from "react-redux"
import { CardProps } from "../../types/movie.types"
import { RootState } from "../../store"
import { formatPopularity, formatRating, truncateText } from "../../utils/formatters"
import { MdStarRate, MdVisibility } from "react-icons/md"

const DiscoverCard = ({ data }: CardProps) => {

    const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
    const title = truncateText(data.title || data.name || 'Untitled')

    return (
        <div className="w-full h-[90px] border-b border-zinc-800 px-1 flex items-center gap-4">
            <div className="w-[65px] h-[80px] rounded-md overflow-hidden">
                <img
                    src={`${imageURL}/${data.poster_path}`}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <h3 className="text-[15px] text-zinc-100 font-bold">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="flex gap-1">
                        <MdStarRate className="text-[#B1D960] opacity-85" />
                        <p className="text-[12px] text-zinc-400">{formatRating(data.vote_average)}</p>
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="flex items-center gap-1">
                        <MdVisibility className="text-blue-300 opacity-80 text-sm" />
                        <p className="text-[12px] text-zinc-400">{formatPopularity(data.popularity)}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DiscoverCard