import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Card from "../common/Card"
import { MovieData } from "../../types/movie.types"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate } from "react-router-dom"
const NewSection = () => {
    const NewData = useSelector((state: RootState) => state.movieData.dataMap.newData ?? []) as MovieData[]
    const newDataSliced = NewData.slice(0, 12)
    const navigate = useNavigate()
    return (
        <div className="mt-3 md:mt-20 mx-2 md:mx-5 md: pb-10">
            <div className="flex items-end justify-between">
                <h3 className="text-[#B1D690] text-xl md:text-2xl font-bold">New On FlickNest</h3>
                <p onClick={() => navigate('/new')} className="flex items-center gap-1 text-[14px] text-zinc-400 mr-3 cursor-pointer">View more <MdKeyboardArrowRight size={16} /></p>
            </div>
            <div className="flex flex-wrap justify-around gap-2 mt-5 md:px-6">
                {newDataSliced.map((data, index) => {
                    const displayIndex = String(index + 1).padStart(2, '0');
                    return (
                        <div key={`upcoming-${data.id || index}`} className="w-[160px] md:w-[200px] flex-shrink-0">
                            <Card data={data} indexLabel={displayIndex} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default NewSection