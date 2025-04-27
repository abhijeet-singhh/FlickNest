import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Explore from "./pages/Explore"
import Details from "./pages/Details"
import MobileNavigation from "./components/MobileNavigation"
import axios from "axios"
import { useEffect } from "react"

const App = () => {

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get('/trending/all/week')
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTrendingData()
  }, [])

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