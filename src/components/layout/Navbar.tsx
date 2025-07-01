import { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaGithub, FaLinkedin, FaUserAlt } from "react-icons/fa"
import { SiBento } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { APP_TITLE, MENU_ITEMS } from "../../utils/constants"
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { MdLogout } from "react-icons/md";
import { LuBookmark } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";

const linkClass = "hover:text-[#B1D690] hover:-translate-y-1 transition-all duration-200 hover:scale-110"
const dropdownButtonClass = "flex items-center justify-start w-full border-b border-zinc-800 gap-2 px-4 py-3 text-sm text-white hover:bg-black/20 hover:text-[#b1d960] cursor-pointer"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isAuthenticated = true

  const handleSearch = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`)
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);


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
              className="outline-none w-44 px-2 text-white placeholder:text-neutral-300 bg-transparent mt-1 border-b border-gray-700"
              type="text"
              placeholder="Search Movies..."
            />
          </form>
          <CiSearch size={24} className="cursor-pointer" onClick={handleSearch} />
        </div>
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <FaUserAlt
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-white cursor-pointer"
            />
            {dropdownOpen && (
              <div className="absolute -right-2 top-8 mt-2 w-44 bg-zinc-900 rounded-md shadow-lg z-50 border border-gray-700">
                <p className="text-sm px-4 pt-3 text-gray-300">Name</p>
                <p className="px-4 mb-2 text-gray-400 text-[14px]">email@e.com</p>
                <button
                  onClick={handleLogout}
                  className={dropdownButtonClass}
                >
                  <FaRegUser />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className={dropdownButtonClass}
                >
                  <LuBookmark />
                  Watchlist
                </button>
                <button
                  onClick={handleLogout}
                  className={dropdownButtonClass}
                >
                  <MdLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (<button onClick={() => navigate("/auth")} className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-3 py-[5px] md:px-4 md:py-2 text-[12px] md:text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800 hover:border-zinc-600 disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
          Login
        </button>)}

      </div>
    </nav >
  )
}

export default Navbar