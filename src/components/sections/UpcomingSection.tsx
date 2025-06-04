import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Card from "../common/Card"
import { MovieData } from "../../types/movie.types"

const UpcomingSection = () => {
    const upcomingData = useSelector((state: RootState) => state.movieData.upcomingData ?? []) as MovieData[]
    const upcomingDataSliced = upcomingData.slice(0, 12)

    return (
        <div className="mt-3 md:mt-10 mx-2 md:mx-5">
            <h3 className="text-[#B1D690] text-xl md:text-2xl font-bold">Top Upcoming</h3>
            <div className="flex flex-wrap justify-around gap-2 mt-5">
                {upcomingDataSliced.map((data, index) => {
                    const displayIndex = String(index + 1).padStart(2, '0');
                    return (
                        <div key={`upcoming-${data.id || index}`} className="w-[160px] md:w-[210px] flex-shrink-0">
                            <Card data={data} indexLabel={displayIndex} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UpcomingSection
