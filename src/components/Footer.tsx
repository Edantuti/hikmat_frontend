import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiTwitterFill,
} from 'react-icons/ri';
const Footer = (): JSX.Element => {
  return (
    <footer className='mt-auto flex flex-col bg-[#151B18] pt-20 text-white md:h-80'>
      <div className='md:flex md:justify-around '>
        <div className=''>
          <h2 className='text-4xl font-semibold italic'>HIKMAT</h2>
          <p>
            Harmony in Nature, Wellness in You – Your Journey with Ayurveda
            Begins Here!
          </p>
        </div>
      </div>
      <div className='mt-auto justify-around md:flex'>
        <p className='text-center'>
          Copyright &copy; 2022 freelanceshala. All Rights Reserved.
        </p>
        <div className='flex items-center justify-center gap-3 text-center'>
          <span>
            <RiTwitterFill />
          </span>
          <span>
            <RiInstagramLine />
          </span>
          <span>
            <RiFacebookBoxLine />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
