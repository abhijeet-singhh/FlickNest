import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { CardProps } from "../../types/movie.types"
import { MdStarRate } from "react-icons/md"
import { formatDate, truncateText } from "../../utils/formatters"


const Card = ({ data }: CardProps) => {
    const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
    const title = truncateText(data.title || data.name || 'Untitled')
    const releaseDate = data.release_date || data.first_air_date || "";
    const rating = typeof data.vote_average === "number" ? data.vote_average.toFixed(1) : "N/A";
    const posterPath = data.poster_path ? `${imageURL}/${data.poster_path}` : `${imageURL}/${data.backdrop_path}`;

    return (
        <div className="mb-5 flex-shrink-0">
            <div className="relative w-full max-w-[160px] md:max-w-[210px] h-52 md:h-65 mb-1 overflow-hidden cursor-pointer">
                <img
                    src={posterPath}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                />
                {/* Gradient smudge overlay */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, transparent, #151320)",
                    }}
                />
            </div>
            <div>
                <h3 className="text-[15px] font-bold line-clamp-1">{title}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-[13px] text-zinc-400">{formatDate(releaseDate)}</p>
                    <span className="flex gap-1">
                        <MdStarRate className="text-[#B1D690] opacity-90" />
                        <p className="text-[12px] text-zinc-400 mr-1">
                            {Number(rating).toFixed(1)}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card
