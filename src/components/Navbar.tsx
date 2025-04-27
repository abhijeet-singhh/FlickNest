import { CiSearch } from "react-icons/ci"
import { FaUserAlt } from "react-icons/fa"

const menuClass: string = "text-neutral-400 hover:text-lime-500 cursor-pointer transition-colors duration-300"

const Navbar = () => {
  return (
    <nav className="bg-neutral-900 w-full h-16 flex items-center justify-between px-10">
        <div className="flex items-center gap-20">
            <span className="text-lime-600 text-2xl font-bold cursor-pointer">CINEMAX</span>

            <div className="flex items-center gap-8 ">
                <span className={menuClass}>TV Shows</span>
                <span className={menuClass}>Movies</span>
                <span className={menuClass}>Popular</span>
            </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
            <input className="outline-none w-44 px-2 text-neutral-400" type="text" placeholder="Search Movies..." />
            <CiSearch size={24} className="cursor-pointer" />
            </div>
            <FaUserAlt className="text-gray-300 cursor-pointer" />
        </div>
    </nav>
  )
}

export default Navbar