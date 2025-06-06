import { useSelector } from "react-redux";
import DiscoverColumn from "./DiscoverColumn"
import { RootState } from "../../store";

const DiscoverSection = () => {

    const nowPlaying = useSelector((state: RootState) => state.movieData.nowPlaying);
    const toprated = useSelector((state: RootState) => state.movieData.topRated);
    const onTheAir = useSelector((state: RootState) => state.movieData.onTheAir);
    const airingToday = useSelector((state: RootState) => state.movieData.airingToday);
    console.log(nowPlaying)

  return (
    <div className="w-full h-[80vh] px-4 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DiscoverColumn title="In Theaters" data={nowPlaying} />
            <DiscoverColumn title="Top Rated" data={toprated} />
            <DiscoverColumn title="On The Air" data={onTheAir} />
            <DiscoverColumn title="Airing Today" data={airingToday} />
        </div>
    </div>
  )
}

export default DiscoverSection