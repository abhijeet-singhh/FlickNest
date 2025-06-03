import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Explore from "./pages/Explore"
import Details from "./pages/Details"
import MobileNavigation from "./components/MobileNavigation"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setBannerData, setImageURL, setTrendingData } from "./app/features/movieSlice"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get('/trending/all/week')
        dispatch(setBannerData(response.data.results))
      } catch (error) {
        console.log(error)
      }
    }

    const fetchTrendingDataByDay = async () => {
      try{
        const response = await axios.get('trending/all/day')
        dispatch(setTrendingData(response.data.results))
      } catch(error) {
        console.log(error)
      }
    }

    const fetchConfigurationData = async () => {
      try{
        const response = await axios.get('/configuration')
        dispatch(setImageURL(response.data.images.secure_base_url+"w1280"))
      } catch(error) {
        console.log(error)
      }
    }
    
    fetchTrendingData()
    fetchTrendingDataByDay()
    fetchConfigurationData()
  }, [dispatch])


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
