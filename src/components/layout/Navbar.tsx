import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaUserAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { APP_TITLE, MENU_ITEMS } from "../../utils/constants"

const menuClass: string = "text-white hover:text-[#abf471] cursor-pointer transition-colors duration-300"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`)
    }
  }

  return (
    <nav className="bg-[#0F0F0F] fixed top-0 z-50 opacity-75 w-full h-14 lg:h-16 flex items-center justify-between px-8 md:px-10">
      <div className="flex items-center gap-20">
        <Link to="/" className="text-[#abf471] text-2xl font-bold cursor-pointer">{APP_TITLE}</Link>

        <div className="hidden lg:flex items-center gap-8 ">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={menuClass}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden lg:flex items-center gap-2">
          <form onSubmit={handleSearch}>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="outline-none w-44 px-2 text-white placeholder:text-neutral-300 bg-transparent"
              type="text"
              placeholder="Search Movies..."
            />
          </form>
          <CiSearch size={24} className="cursor-pointer" onClick={handleSearch} />
        </div>
        <FaUserAlt className="text-white cursor-pointer" />
      </div>
    </nav>
  )
}

export default Navbar