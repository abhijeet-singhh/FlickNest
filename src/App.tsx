import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Explore from "./pages/Explore"
import Details from "./pages/Details"

const App = () => {
  return (
    <div className="bg-black text-white h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:id" element={<Details />} />
        </Routes>
      </main>
    </div>
  )
}

export default App