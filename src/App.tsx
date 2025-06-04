import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import MobileNavigation from "./components/layout/MobileNavigation"
import { Home, Search, Explore, Details } from "./pages/index"
import { useMovies } from "./hooks/useMovies"

const App = () => {
  const { error, isLoading } = useMovies();

  if (isLoading) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore/:path" element={<Explore />} />
          <Route path="/explore/details/:id" element={<Details />} />
        </Routes>
      </main>
      <MobileNavigation />
    </div>
  )
}

export default App