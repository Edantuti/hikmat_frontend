import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useFetch } from '../../hooks/fetch';

//TODO:Deal Section Product improvement
const DealsSection = (): JSX.Element => {
  const { data: deals, isLoading } = useFetch<any[]>(
    `${import.meta.env.VITE_BACKEND}/api/deals`
  );
  function checkDealsExpiry(date: string) {
    return new Date(date) >= new Date();
  }
  return (
    <>
      <section
        className='mx-auto w-[70%] gap-20 py-20 font-poppins 2xl:flex'
        id='deals'
      >
        <div className=''>
          <h2 className='pb-10 text-2xl sm:text-4xl'>Deals</h2>
          <p className='sm:text-md py-2 text-sm'>
            Deals which are available right now!
          </p>
        </div>
        <div className='mx-auto w-fit gap-5 space-y-5 sm:flex sm:items-center sm:gap-10 sm:space-y-0'>
          <Swiper
            className='w-[40vw]'
            spaceBetween={5}
            slidesPerView={2}
            freeMode={true}
            navigation={true}
            modules={[Navigation, FreeMode]}
          >
            {deals &&
              deals.slice(0, 3).map(
                (obj: any) =>
                  checkDealsExpiry(obj.expiry_date) && (
                    <SwiperSlide key={obj.id} className='relative'>
                      <img
                        className='rounded '
                        src={obj.image || 'https://dummyimage.com/250'}
                        alt='image'
                        width='300px'
                        height='auto'
                      />
                      <p className='absolute bottom-0 rounded-tr border-r border-t border-gray-300 bg-gray-300 p-1 text-sm'>
                        {obj.name}&nbsp;{' '}
                        <span className='text-xs'>{obj.discount}% off</span>
                      </p>
                    </SwiperSlide>
                  )
              )}
          </Swiper>
          {isLoading && <p>Loading Deals ...</p>}
          {!deals && !isLoading && <p>No deals available right now</p>}
        </div>
      </section>
    </>
  );
};

export default DealsSection;
