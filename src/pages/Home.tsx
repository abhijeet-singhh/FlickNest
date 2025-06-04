import HomeBanner from "../components/HomeBanner"
import TrendingSection from "../components/TrendingSection"
import UpcomingSection from "../components/UpcomingSection"

const Home = () => {
  return (
    <div className="h-full bg-black">
      <HomeBanner />
      <TrendingSection />
      <UpcomingSection />
    </div>
  )
}

export default Home