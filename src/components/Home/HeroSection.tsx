import { Link } from 'react-router-dom';

const HeroSection = (): JSX.Element => {
  return (
    <section className='flex flex-col sm:max-h-full sm:min-h-screen'>
      <div className='relative mx-auto my-20 flex w-[80%] flex-col rounded bg-[url(assets/image_files.jpg)] bg-cover bg-center bg-no-repeat py-20 sm:py-64'>
        <p className='text-center font-poppins text-lg text-white sm:text-2xl'>
          Your own Medicine store. Online
        </p>
        <h2 className='text-center font-poppins text-2xl text-white sm:text-5xl'>
          Healthier, Happier
        </h2>
        <Link to='/product/' className='button mx-auto my-10 text-black'>
          Shop now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
