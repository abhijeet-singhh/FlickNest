import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { SiBento } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { APP_TITLE, MENU_ITEMS } from "../../utils/constants"

const linkClass = "hover:text-[#B1D690] hover:-translate-y-1 transition-all duration-300"

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
    <nav className="bg-black/70 backdrop-blur-md fixed top-0 z-50 w-full h-14 lg:h-16 flex items-center justify-between px-4 md:px-10">
      <div className="flex items-center gap-20">
        <Link to="/" className="text-[#B1D690] text-3xl font-bold cursor-pointer logofont">{APP_TITLE}</Link>

        <div className="hidden lg:flex items-center gap-8">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-[#B1D690] cursor-pointer transition-colors duration-300 ${isActive ? 'text-[#B1D690]' : 'text-white'}`}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="flex justify-center sm:justify-start space-x-4 text-xl ml-110">
            <a href="https://x.com/abhijeet_tw" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={linkClass}><FaXTwitter /></a>
            <a href="https://bento.me/abhi-dev" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={linkClass}><SiBento /></a>
            <a href="https://github.com/abhijeet-singhh" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={linkClass}><FaGithub /></a>
            <a href="https://www.linkedin.com/in/abhijeet-singhh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkClass}><FaLinkedin /></a>
          </div>
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
        {/* <FaUserAlt className="text-white cursor-pointer" /> */}
        <button onClick={() => alert('This functionality is currently not available!')} className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-3 py-[5px] md:px-4 md:py-2 text-[12px] md:text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800 hover:border-zinc-600 disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
          Login
        </button>

      </div>
    </nav >
  )
}

export default Navbar