import { useSelector } from "react-redux"
import { CardProps } from "./TrendingCard"
import { RootState } from "../app/store"

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
        <div className="mb-10">
            <div className="w-full max-w-[200px] h-65 rounded mb-1">
                <img src={imageURL + data.backdrop_path} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div>
                <h3 className="text-[15px] font-bold">{title}</h3>
                <p className="text-[13px] text-zinc-400">{formatDate(data.release_date || 'Unknown')}</p>

            </div>
        </div>
    )
}

export default Card