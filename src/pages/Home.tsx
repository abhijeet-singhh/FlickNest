import HomeBanner from "../components/HomeBanner"
import TrendingSection from "../components/TrendingSection"

const Home = () => {
  return (
    <div className="h-full bg-black">
      <HomeBanner />
      <TrendingSection />
    </div>
  )
}

export default Home