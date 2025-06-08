import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { RootState } from "../store";
import Card from "../components/common/Card";
import { MovieData } from "../types/movie.types";
import PromoBadge from "../components/common/PromoBadge";
import { useEffect, useState } from "react";
import Pagination from "../components/common/Pagination";

const DiscoverPage = () => {

    const { pathname } = useLocation()

    const nowPlaying300 = useSelector((state: RootState) => state.movieData.nowPlaying300);
    const topRated300 = useSelector((state: RootState) => state.movieData.topRated300);
    const onTheAir300 = useSelector((state: RootState) => state.movieData.onTheAir300);
    const airingToday300 = useSelector((state: RootState) => state.movieData.airingToday300);
    const upcoming300 = useSelector((state: RootState) => state.movieData.upcomingData300);

    const dataMap: Record<string, MovieData[]> = {
        "/now_playing": nowPlaying300,
        "/top_rated": topRated300,
        "/on_the_air": onTheAir300,
        "/airing_today": airingToday300,
        "/top_upcoming": upcoming300,
    };

    const titleMap: Record<string, string> = {
        "/now_playing": "In Theaters",
        "/top_rated": "Top Rated",
        "/on_the_air": "On The Air",
        "/airing_today": "Airing Today",
        "/top_upcoming": "Top Upcoming",
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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const slicedData = data.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [currentPage]);

    // const slicedData = data.slice(0, 18);

    return (
        <div className="pt-18 pb-28 px-5 h-full bg-[#151320]">
            <PromoBadge />
            <h3 className="text-[#B1D690] text-xl md:text-[23px] font-bold mt-6 mb-5">{title}</h3>
            <div className="flex flex-wrap items-center gap-6 justify-center mb-3 md:mb-10">
                {slicedData.map((item, i) => (
                    <div key={item.id || i} className="overflow-hidden w-full max-w-[160px] md:max-w-[210px]">
                        <Card
                            data={item}
                            indexLabel={String(i + 1).padStart(2, "0")}
                            mediaType={mediaType}
                        />
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default DiscoverPage