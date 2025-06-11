import ScrollToTopButton from "../components/common/ScrollToTopButton"
import Footer from "../components/layout/Footer"
import DiscoverSection from "../components/sections/DiscoverSection"
import HomeBanner from "../components/sections/HomeBanner"
import NewSection from "../components/sections/NewSection"
import TrendingSection from "../components/sections/TrendingSection"
import UpcomingSection from "../components/sections/UpcomingSection"

const Home = () => {
  return (
    <div className="h-full pb-15 md:pb-0 bg-[#151320]">
      <HomeBanner />
      <TrendingSection />
      <DiscoverSection />
      <UpcomingSection />
      <NewSection />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}

export default Home