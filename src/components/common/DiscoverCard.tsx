import { useSelector } from "react-redux"
import { CardProps } from "../../types/movie.types"
import { RootState } from "../../store"
import { formatPopularity, formatRating, truncateText } from "../../utils/formatters"
import { FaFilm, FaFire } from "react-icons/fa"

const DiscoverCard = ({ data, mediaType }: CardProps) => {

    const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
    const title = truncateText(data.title || data.name || 'Untitled')

    return (
        <div className="w-full h-[90px] border-zinc-800 px-1 flex items-center gap-4 overflow-hidden">
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
                    <span className="flex items-center justify-around gap-1 bg-amber-200 opacity-95 px-2 py-[.8px] rounded-l">
                        <FaFire size={10} className="text-black opacity-90" />
                        <p className="text-[12px] text-black font-bold mt-[.5px]">{formatRating(data.vote_average)}</p>
                    </span>
                    <span className="flex items-center justify-around gap-1 bg-zinc-200 opacity-95 px-2 py-[.8px] rounded-r">
                        <FaFilm size={12} className="text-black opacity-80 mb-[.5px]" />
                        <p className="text-[12px] text-black font-bold">{formatPopularity(data.popularity)}</p>
                    </span>
                    <span className="text-zinc-500 text-[14px] ml-2 flex items-center gap-2">• <p className="text-zinc-400 poppins">{mediaType}</p></span>
                </div>
            </div>
        </div>
    )
}

export default DiscoverCard