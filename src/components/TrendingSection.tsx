import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { TrendingData } from "../app/features/movieSlice"
import Card from "./Card"

const TrendingSection = () => {

    const trendingData = useSelector((state: RootState) => state.movieData.trendingData ?? []) as TrendingData[]
    const top10Trending = trendingData.slice(0, 10)

    return (
        <div className="mt-15 mx-5 pb-10">
            <h3 className="text-[#B1D690] text-2xl font-bold">Trending</h3>
            <div className="flex gap-4 mt-5 mx-10">
                {top10Trending.map((data, index) => (
                    <Card key={`slide-${data.id} || ${index}`} data={data} />
                ))}
            </div>
        </div>
    )
}

export default TrendingSection