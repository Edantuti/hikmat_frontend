import { RiFacebookBoxLine, RiInstagramLine, RiTwitterFill } from "react-icons/ri"
const Footer = (): JSX.Element => {
  return (
    <>
      <footer className="flex flex-col md:h-80 bg-[#151B18] mt-auto text-white pt-20">
        <div className="md:flex md:justify-around ">
          <div className="">
            <h2 className="text-4xl font-semibold italic">HIKMAT</h2>
            <p>Harmony in Nature, Wellness in You – Your Journey with Ayurveda Begins Here!</p>
          </div>
        </div>
        <div className="md:flex justify-around mt-auto">
          <p className="text-center">
            Copyright &copy; 2022 freelanceshala. All Rights Reserved.
          </p>
          <div className="text-center flex items-center justify-center gap-3">
            <span><RiTwitterFill /></span>
            <span><RiInstagramLine /></span>
            <span><RiFacebookBoxLine /></span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
