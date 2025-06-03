import { BannerData } from "../app/features/movieSlice"

interface CardProps {
    data: BannerData
}

const Card = ({data}: CardProps) => {
  return (
    <div className="border rounded p-2">
        <h3>Card {data.id}</h3>
    </div>
  )
}

export default Card