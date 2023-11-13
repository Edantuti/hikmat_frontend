import cosmetics from "../../assets/cosmetics.png"
import harioil from "../../assets/Hair Oil.png"
import marrham from "../../assets/Marrham.png"
import sharbat from "../../assets/Sharbat.png"
import syrups from "../../assets/syrups.png"
import { FreeMode, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import useMediaQuery from "../../hooks/useMediaQuery"



const ArrivalsSection = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 960px)');
  return (
    <>
      <section className="h-full w-[90%] mx-auto py-36" id="arrival">
        <h2 className="text-center text-4xl">Categories</h2>
        <p className="w-[70%] mx-auto text-center py-5">These are some of the categories we have for the Products</p>
        <div className="mx-auto">
          <Swiper className="md:w-[70vw] w-[80vw]" spaceBetween={20} slidesPerView={isMobile ? 1 : 2} navigation={true} modules={[Navigation, FreeMode]}>
            <SwiperSlide><img src={cosmetics} width="1280px" height="720px" /></SwiperSlide>
            <SwiperSlide><img src={harioil} width="1280px" height="720px" /></SwiperSlide>
            <SwiperSlide><img src={marrham} width="1280px" height="720px" /></SwiperSlide>
            <SwiperSlide><img src={sharbat} width="1280px" height="720px" /></SwiperSlide>
            <SwiperSlide><img src={syrups} width="1280px" height="720px" /></SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  )
}


export default ArrivalsSection
