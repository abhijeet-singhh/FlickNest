import React from "react";
import { MovieData } from "../../types/movie.types";
import DiscoverCard from "../common/DiscoverCard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface DiscoverColumnProps {
  title: string;
  data: MovieData[];
  mediaType: 'Movie' | 'TV';
  maxItems?: number; // optional prop to limit number of cards shown
  path: string;
}

const DiscoverColumn: React.FC<DiscoverColumnProps> = ({ title, mediaType, data, path, maxItems = 5 }) => {
  const slicedData = data.slice(0, maxItems);
  const navigate = useNavigate()

  return (
    <div>
      <h4 className="text-[#B1D690] text-xl md:text-[23px] font-bold mb-5">{title}</h4>
      <div className="flex flex-col">
        {slicedData.map((item, index) => {
          const displayIndex = String(index + 1).padStart(2, '0');
          return (
            <div key={`${title}-${item.id || index}`} className="w-full border-b border-[#2d2a41] py-3">
              <DiscoverCard data={item} indexLabel={displayIndex} mediaType={mediaType} />
            </div>
          );
        })}
      </div>
      <h3 onClick={() => navigate(path)} className="flex items-center mt-2 ml-1 cursor-pointer hover:text-[#B1D960] h-12">View more <MdKeyboardArrowRight size={20} className="font-bold" /> </h3>
    </div>
  );
};

export default DiscoverColumn;
