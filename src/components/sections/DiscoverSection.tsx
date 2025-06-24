import { useSelector } from "react-redux";
import DiscoverColumn from "./DiscoverColumn"
import { RootState } from "../../store";

const DiscoverSection = () => {

    const nowPlaying = useSelector((state: RootState) => state.movieData.dataMap.nowPlaying);
    const toprated = useSelector((state: RootState) => state.movieData.dataMap.topRated);
    const onTheAir = useSelector((state: RootState) => state.movieData.dataMap.onTheAir);
    const airingToday = useSelector((state: RootState) => state.movieData.dataMap.airingToday);

  return (
    <div className="w-full h-full px-4 py-2 mt-7 md:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DiscoverColumn title="Latest Movies" mediaType="Movie" data={nowPlaying} path="/now_playing"/>
            <DiscoverColumn title="Top Rated" mediaType="Movie" data={toprated} path="/top_rated" />
            <DiscoverColumn title="On The Air" mediaType="TV" data={onTheAir} path="/on_the_air" />
            <DiscoverColumn title="Airing Today" mediaType="TV" data={airingToday} path="/airing_today" />
        </div>
    </div>
  )
}

export default DiscoverSection