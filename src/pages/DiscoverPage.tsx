import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { RootState } from "../store";
import Card from "../components/common/Card";
import { MovieData } from "../types/movie.types";
import PromoBadge from "../components/common/PromoBadge";

const DiscoverPage = () => {

    const { pathname } = useLocation()

    const nowPlaying = useSelector((state: RootState) => state.movieData.nowPlaying);
    const topRated = useSelector((state: RootState) => state.movieData.topRated);
    const onTheAir = useSelector((state: RootState) => state.movieData.onTheAir);
    const airingToday = useSelector((state: RootState) => state.movieData.airingToday);

    const dataMap: Record<string, MovieData[]> = {
        "/now_playing": nowPlaying,
        "/top_rated": topRated,
        "/on_the_air": onTheAir,
        "/airing_today": airingToday,
    };

    const titleMap: Record<string, string> = {
        "/now_playing": "In Theaters",
        "/top_rated": "Top Rated",
        "/on_the_air": "On The Air",
        "/airing_today": "Airing Today",
    };

    const mediaTypeMap: Record<string, "Movie" | "TV"> = {
        "/now_playing": "Movie",
        "/top_rated": "Movie",
        "/on_the_air": "TV",
        "/airing_today": "TV",
    };

    const data = dataMap[pathname] || [];
    const title = titleMap[pathname] || "Discover";
    const mediaType = mediaTypeMap[pathname] || "Movie";

    const slicedData = data.slice(0, 18);

    return (
        <div className="pt-18 px-5 h-full bg-[#151320]">
            <PromoBadge />
            <h3 className="text-[#B1D690] text-xl md:text-[23px] font-bold mt-6 mb-5">{title}</h3>
            <div className="flex flex-wrap items-center gap-4 justify-around">
                {slicedData.map((item, i) => (
                    <div className="overflow-hidden w-full max-w-[210px]">
                        <Card
                            key={item.id || i}
                            data={item}
                            indexLabel={String(i + 1).padStart(2, "0")}
                            mediaType={mediaType}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscoverPage