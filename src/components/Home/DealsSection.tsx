import axios from "axios"
import { FC, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
//TODO:Deal Section Product improvement
const DealsSection: FC = (): JSX.Element => {
  const [deals, setDeals] = useState<any>([])
  useEffect(() => {
    getDeals().then((response) => {
      setDeals(response.data.result.splice(0, 3))
    })
  }, [])
  async function getDeals() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/deals`)
  }
  function checkDealsExpiry(date: string) {
    return new Date(date) >= new Date()
  }
  return (
    <>
      <section className="2xl:flex w-[70%] mx-auto gap-20 py-20 font-poppins" id="deals">
        <div className="">
          <h2 className="sm:text-4xl text-2xl pb-10">Deals</h2>
          <p className="py-2 sm:text-md text-sm">Deals which are available right now!</p>
        </div>
        <div className="sm:flex sm:gap-10 sm:items-center gap-5 w-fit mx-auto space-y-5 sm:space-y-0">
          <Swiper className="w-[40vw]" spaceBetween={5} slidesPerView={2} freeMode={true} navigation={true} modules={[Navigation, FreeMode]}>
            {deals.length > 0 && deals.map((obj: any) => (
              checkDealsExpiry(obj.expiry_date) && <SwiperSlide key={obj.id} className="relative">
                <img className="rounded " src={obj.image || "https://dummyimage.com/250"} alt="image" width="300px" height="auto" />
                <p className="absolute bottom-0 p-1 bg-white rounded-tr text-sm">{obj.name}&nbsp; <span className="text-xs">{obj.discount}% off</span></p>
              </SwiperSlide>
            ))
            }
          </Swiper>
          {!deals.length && <p>No deals available right now</p>}
        </div>
      </section>
    </>
  )
}

export default DealsSection
