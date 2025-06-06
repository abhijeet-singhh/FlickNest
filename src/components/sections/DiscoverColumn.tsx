import React from "react";
import { MovieData } from "../../types/movie.types";
import DiscoverCard from "../common/DiscoverCard";

interface DiscoverColumnProps {
  title: string;
  data: MovieData[];
  maxItems?: number; // optional prop to limit number of cards shown
}

const DiscoverColumn: React.FC<DiscoverColumnProps> = ({ title, data, maxItems = 5 }) => {
  const slicedData = data.slice(0, maxItems);

  return (
    <div>
      <h4 className="text-[#B1D690] text-xl md:text-[23px] font-bold mb-5">{title}</h4>
      <div className="flex flex-col gap-3">
        {slicedData.map((item, index) => {
          const displayIndex = String(index + 1).padStart(2, '0');
          return (
            <div key={`${title}-${item.id || index}`} className="w-full">
              <DiscoverCard data={item} indexLabel={displayIndex} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverColumn;
