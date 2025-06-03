import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { TrendingData } from "../app/features/movieSlice"
import Card from "./Card"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

const TrendingSection = () => {

    const trendingData = useSelector((state: RootState) => state.movieData.trendingData ?? []) as TrendingData[]
    const top10Trending = trendingData.slice(0, 10)

    return (
        <div className="mt-10 mx-5">
            <h3 className="text-[#B1D690] text-2xl font-bold">Trending</h3>
            <div className="flex">
                <div className=" pb-10 overflow-x-auto scrollbar-hide scroll-smooth">
                    <div className="flex gap-10 w-max mt-5 mx-10 flex-shrink-0">
                        {top10Trending.map((data, index) => {
                            const displayIndex = String(index + 1).padStart(2, '0');
                            return (
                                <Card key={`trendingcard-${data.id || index}`} data={data} indexLabel={displayIndex} />
                            )
                        })}
                    </div>
                </div>
                <div className="w-14 px-5 pb-5 flex flex-col gap-4 justify-center">
                    <div className="bg-zinc-700 rounded h-28 w-10 flex items-center justify-center"><MdKeyboardArrowLeft size={28} /></div>
                    <div className="bg-zinc-700 rounded h-28 w-10 flex items-center justify-center"><MdKeyboardArrowRight size={28} /></div>
                </div>
            </div>
        </div>
    )
}

export default TrendingSection