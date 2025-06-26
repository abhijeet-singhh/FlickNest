import { Route, Routes, useLocation } from "react-router-dom"
import ReactGA from "react-ga4";
import Navbar from "./components/layout/Navbar"
import MobileNavigation from "./components/layout/MobileNavigation"
import { Home, Search, Details } from "./pages/index"
import { useMovies } from "./hooks/useMovies"
import DiscoverPage from "./pages/DiscoverPage"
import ScrollToTop from "./components/common/ScrollToTop"
import { useEffect } from "react"

const GA_MEASUREMENT_ID = "G-9KDRM6DZWF"; // Your GA measurement ID

const App = () => {
  const { error, isLoading } = useMovies();

  const location = useLocation();

  useEffect(() => {
    // Initialize GA once on app start
    if (GA_MEASUREMENT_ID) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    // Send pageview on every route change
    if (GA_MEASUREMENT_ID) {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  const loadGif = "/assets/load.gif";

  if (isLoading) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <img src={loadGif} className="w-16 -mt-4" />
            <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          </div>
          <p className="text-gray-400">Please wait while we fetch the movies</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-500">Error Loading Movies</h2>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-screen">
      <Navbar />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore/:path" element={<DiscoverPage />} />
          <Route path="/explore/details/:mediaType/:id" element={<Details />} />
          <Route path="/now_playing" element={<DiscoverPage />} />
          <Route path="/top_rated" element={<DiscoverPage />} />
          <Route path="/on_the_air" element={<DiscoverPage />} />
          <Route path="/airing_today" element={<DiscoverPage />} />
          <Route path="/top_upcoming" element={<DiscoverPage />} />
          <Route path="/new" element={<DiscoverPage />} />
        </Routes>
      </main>
      <MobileNavigation />
    </div>
  )
}

export default App