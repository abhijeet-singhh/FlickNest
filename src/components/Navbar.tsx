import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaUserAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

const menuClass: string = "text-neutral-400 hover:text-[#B1D690] cursor-pointer transition-colors duration-300"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    if(searchQuery.trim()){
      navigate(`/search?q=${searchQuery}`)
    }
  }

  return (
    <nav className="bg-[#0F0F0F] fixed top-0 opacity-75 w-full h-14 lg:h-16 flex items-center justify-between px-8 md:px-10">
      <div className="flex items-center gap-20">
        <Link to="/" className="text-[#B1D690] text-2xl font-bold cursor-pointer">CINEMAX</Link>

        <div className="hidden lg:flex items-center gap-8 ">
          <Link to="/explore/tvshows" className={menuClass}>TV Shows</Link>
          <Link to="/explore/movies" className={menuClass}>Movies</Link>
          <Link to="/explore/popular" className={menuClass}>Popular</Link>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden lg:flex items-center gap-2">
          <form onSubmit={handleSearch}>
            <input 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="outline-none w-44 px-2 text-neutral-400 bg-transparent" 
              type="text" 
              placeholder="Search Movies..." 
            />
          </form>
          <CiSearch size={24} className="cursor-pointer" onClick={handleSearch} />
        </div>
        <FaUserAlt className="text-gray-300 cursor-pointer" />
      </div>
    </nav>
  )
}

export default Navbar