import HeroSection from "../components/Home/HeroSection"
import DealsSection from "../components/Home/DealsSection"
import ArrivalsSection from "../components/Home/ArrivalsSection"
import SocialSection from "../components/Home/SocialSection"
import TestimonalsSection from "../components/Home/TestimonalsSection"

const HomePage = (): JSX.Element => {
  return (<>
    <HeroSection />
    <DealsSection />
    <ArrivalsSection />
    <SocialSection />
    <TestimonalsSection />
  </>)
}

export default HomePage
