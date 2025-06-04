import HomeBanner from "../components/sections/HomeBanner"
import TrendingSection from "../components/sections/TrendingSection"
import UpcomingSection from "../components/sections/UpcomingSection"

const Home = () => {
  return (
    <div className="h-full pb-15 md:pb-0 bg-black">
      <HomeBanner />
      <TrendingSection />
      <UpcomingSection />
    </div>
  )
}

export default Home