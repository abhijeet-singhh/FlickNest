import { AiFillHome } from "react-icons/ai"
import { BiSolidMoviePlay } from "react-icons/bi"
import { CiSearch } from "react-icons/ci"
import { PiTelevisionFill } from "react-icons/pi"
import { NavLink } from "react-router-dom"

const MobileNavigation = () => {
  const iconClass = "text-neutral-400"
  const activeIconClass = "text-[#B1D690]"

  return (
    <div className="lg:hidden flex items-center justify-between h-16 w-full bg-[#0F0F0F] fixed bottom-0 px-8">
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? activeIconClass : iconClass}
      >
        <div className="flex flex-col items-center">
          <AiFillHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </div>
      </NavLink>

      <NavLink
        to="/explore/tvshows"
        className={({ isActive }) => isActive ? activeIconClass : iconClass}
      >
        <div className="flex flex-col items-center">
          <PiTelevisionFill size={20} />
          <span className="text-xs mt-1">TV Shows</span>
        </div>
      </NavLink>

      <NavLink
        to="/explore/movies"
        className={({ isActive }) => isActive ? activeIconClass : iconClass}
      >
        <div className="flex flex-col items-center">
          <BiSolidMoviePlay size={20} />
          <span className="text-xs mt-1">Movies</span>
        </div>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) => isActive ? activeIconClass : iconClass}
      >
        <div className="flex flex-col items-center">
          <CiSearch size={20} />
          <span className="text-xs mt-1">Search</span>
        </div>
      </NavLink>
    </div>
  )
}

export default MobileNavigation
