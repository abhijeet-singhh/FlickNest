import ScrollToTopButton from "../components/common/ScrollToTopButton"
import HomeBanner from "../components/sections/HomeBanner"
import TrendingSection from "../components/sections/TrendingSection"
import UpcomingSection from "../components/sections/UpcomingSection"

const Home = () => {
  return (
    <div className="h-full pb-15 md:pb-0 bg-gray-950">
      <HomeBanner />
      <TrendingSection />
      <UpcomingSection />
      <ScrollToTopButton />
    </div>
  )
}

export default Home