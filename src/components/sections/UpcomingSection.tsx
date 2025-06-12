import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Card from "../common/Card"
import { MovieData } from "../../types/movie.types"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const UpcomingSection = () => {
    const upcomingData = useSelector((state: RootState) => state.movieData.dataMap.upcomingData ?? []) as MovieData[]
    const upcomingDataSliced = upcomingData.slice(0, 12)
    const navigate = useNavigate()

    return (
        <div className="mt-3 md:mt-16 mx-2 md:mx-5">
            <div className="flex items-end justify-between">
                <h3 className="text-[#B1D690] text-xl md:text-2xl font-bold">Top Upcoming</h3>
                <p onClick={() => navigate('/top_upcoming')} className="flex items-center gap-1 text-[14px] text-zinc-400 mr-3 cursor-pointer">View more <MdKeyboardArrowRight size={16} /></p>
            </div>
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
