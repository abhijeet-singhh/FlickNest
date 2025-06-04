import { useSelector } from "react-redux"
import { CardProps } from "./TrendingCard"
import { RootState } from "../app/store"
import { MdStarRate } from "react-icons/md";

const truncateText = (text: string, maxLength = 23): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
};


const Card = ({ data }: CardProps) => {

    const imageURL = useSelector((state: RootState) => state.movieData.imageURL)
    const title = truncateText(data.title || data.name || 'Untitled')

    return (
        <div className="mb-5">
            <div className="w-full max-w-[160px] md:max-w-[210px] h-52 md:h-65 md:rounded mb-1 overflow-hidden">
                <img src={imageURL + data.backdrop_path} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div>
                <h3 className="text-[15px] font-bold line-clamp-1">{title}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-[13px] text-zinc-400">{formatDate(data.release_date || 'Unknown')}</p>
                    <span className="flex gap-1">
                        <MdStarRate className="text-[#B1D690] opacity-90" />
                        <p className="text-[12px] text-zinc-400 mr-1">{Number(data.vote_average).toFixed(1)}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card