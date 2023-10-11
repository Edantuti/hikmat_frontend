import { FC, useEffect } from "react"
import HeroSection from "../components/Home/HeroSection"
import DealsSection from "../components/Home/DealsSection"
import ArrivalsSection from "../components/Home/ArrivalsSection"
import SocialSection from "../components/Home/SocialSection"
import TestimonalsSection from "../components/Home/TestimonalsSection"
import { useSelector } from "react-redux"

const HomePage: FC = (): JSX.Element => {
  const data = useSelector((state: any) => state.auth)
  useEffect(() => {
    checkTokenExpiry()
  }, [])
  function checkTokenExpiry() {

  }
  return (<>
    <HeroSection />
    <DealsSection />
    <ArrivalsSection />
    <SocialSection />
    <TestimonalsSection />
  </>)
}

export default HomePage
