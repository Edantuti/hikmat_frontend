import HeroSection from "../components/Home/HeroSection"
import DealsSection from "../components/Home/DealsSection"
import CategorySection from "../components/Home/CategorySection"
import SocialSection from "../components/Home/SocialSection"
import TestimonalsSection from "../components/Home/TestimonalsSection"

const HomePage = (): JSX.Element => {
  return (<>
    <HeroSection />
    <DealsSection />
    <CategorySection />
    <SocialSection />
    <TestimonalsSection />
  </>)
}

export default HomePage
