import cosmetics from '../../assets/cosmetics.png';
import harioil from '../../assets/Hair Oil.png';
import marrham from '../../assets/Marrham.png';
import sharbat from '../../assets/Sharbat.png';
import syrups from '../../assets/syrups.png';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from '../../hooks/useMediaQuery';

const CategorySection = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 960px)');
  return (
    <section className='mx-auto h-full w-[90%] py-36' id='arrival'>
      <h2 className='text-center text-4xl'>Categories</h2>
      <p className='mx-auto w-[70%] py-5 text-center'>
        These are some of the categories we have for the Products
      </p>
      <div className='mx-auto'>
        <Swiper
          className='w-[80vw] md:w-[70vw]'
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : 2}
          navigation={true}
          modules={[Navigation, FreeMode]}
        >
          <SwiperSlide>
            <img loading='lazy' src={cosmetics} width='1280px' height='720px' />
          </SwiperSlide>
          <SwiperSlide>
            <img loading='lazy' src={harioil} width='1280px' height='720px' />
          </SwiperSlide>
          <SwiperSlide>
            <img loading='lazy' src={marrham} width='1280px' height='720px' />
          </SwiperSlide>
          <SwiperSlide>
            <img loading='lazy' src={sharbat} width='1280px' height='720px' />
          </SwiperSlide>
          <SwiperSlide>
            <img loading='lazy' src={syrups} width='1280px' height='720px' />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySection;
