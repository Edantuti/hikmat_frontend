import { useState } from 'react';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { Thumbs, FreeMode, Navigation } from 'swiper/modules';

const ProductCarousel = (props: { image_urls: string[] }): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  return (
    <>
      <div className='my-2  p-2 md:m-2 lg:w-[35vw]'>
        <Swiper
          className=''
          navigation={true}
          modules={[Navigation, FreeMode, Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
        >
          {props.image_urls.map((obj) => (
            <SwiperSlide key={obj} className='rounded bg-cover bg-center'>
              <img
                loading='lazy'
                src={`${obj}`}
                className='mx-auto rounded object-cover'
                alt='Product Photo'
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          className='smallcarousel mx-0 my-2'
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={5}
          slidesPerView={6}
          modules={[Navigation, FreeMode, Thumbs]}
          watchSlidesProgress={true}
          freeMode={true}
        >
          {props.image_urls.map((obj) => (
            <SwiperSlide key={obj} className='p-2'>
              <img loading='lazy' src={obj} className='w-20 rounded' alt='' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductCarousel;
