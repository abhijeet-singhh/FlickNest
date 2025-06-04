import { AiFillHome } from "react-icons/ai"
import { BiSolidMoviePlay } from "react-icons/bi"
import { CiSearch } from "react-icons/ci"
import { PiTelevisionFill } from "react-icons/pi"
import { NavLink } from "react-router-dom"
import { MOBILE_NAV_ITEMS } from "../../utils/constants"

const MobileNavigation = () => {
  const iconClass = "text-neutral-400"
  const activeIconClass = "text-[#B1D690]"

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'AiFillHome': return <AiFillHome size={20} />
      case 'PiTelevisionFill': return <PiTelevisionFill size={20} />
      case 'BiSolidMoviePlay': return <BiSolidMoviePlay size={20} />
      case 'CiSearch': return <CiSearch size={20} />
      default: return null
    }
  }

  return (
    <div className="lg:hidden flex items-center justify-between h-16 w-full bg-[#0F0F0F] fixed bottom-0 px-8">
      {MOBILE_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => isActive ? activeIconClass : iconClass}
        >
          <div className="flex flex-col items-center">
            {getIcon(item.icon)}
            <span className="text-xs mt-1">{item.label}</span>
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default MobileNavigation
