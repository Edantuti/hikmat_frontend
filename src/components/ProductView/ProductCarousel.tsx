import { FC, useState } from "react"

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'


import { Thumbs, FreeMode, Navigation } from "swiper/modules"

interface IProductCarousel {
    image_urls: Array<string>
}

const ProductCarousel: FC<IProductCarousel> = (props): JSX.Element => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    // console.log(props.image_urls)?
    return (
        <>
            <div className="lg:w-[35vw]  my-2 md:m-2 p-2">
                <Swiper
                    className=""
                    navigation={true} modules={[Navigation, FreeMode, Thumbs]}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                >
                    {props.image_urls.map((obj, key) => (
                        <SwiperSlide key={key} className="bg-cover bg-center rounded">
                            <img src={`${obj}`} className="mx-auto rounded object-cover" alt="Product Photo" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    className="mx-0 my-2 smallcarousel"
                    onSwiper={(swiper) => setThumbsSwiper(swiper)}
                    spaceBetween={5}
                    slidesPerView={6}
                    modules={[Navigation, FreeMode, Thumbs]}
                    watchSlidesProgress={true}
                    freeMode={true}

                >

                    {props.image_urls.map((obj, key) => (
                        <SwiperSlide key={key} className="p-2" >
                            <img src={obj} className="w-20 rounded" alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default ProductCarousel
