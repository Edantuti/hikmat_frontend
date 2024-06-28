import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { changeAuthentication, setUserData } from '../slice/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useOnClickOutside } from 'usehooks-ts';

const Header = (): JSX.Element => {
  const [visible, changeVisible] = useState(false);
  const ref = useRef(null);
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  const userData = useSelector((state: any) => state.auth.userData);
  const location = useLocation();
  const dispatch = useDispatch();
  const logOut = () => {
    Cookies.remove('token');
    dispatch(setUserData({}));
    dispatch(changeAuthentication(false));
  };
  useOnClickOutside(ref, () => {
    changeVisible(false);
  });
  return (
    <>
      <header className='mx-auto flex items-center justify-between border-b-2 border-neutral-300 py-5 md:px-10'>
        <div className='flex gap-10'>
          <Link to='/'>
            {' '}
            <h1 className='ml-5 text-4xl font-semibold italic'>HIKMAT</h1>
          </Link>
          <nav className='hidden items-center gap-4 lg:flex'>
            <Link to='/'>Home</Link>
            <Link to='/product'>Products</Link>
            {location.pathname === '/' && <a href='/#deals'>Deals</a>}
            {location.pathname === '/' && <a href='/#arrival'>Categories</a>}
            {location.pathname === '/' && <a href='/#social'>About Us</a>}
          </nav>
        </div>
        <div className={`mx-2 flex w-fit items-center gap-2`}>
          <Link to='/cart' className='rounded-full border bg-slate-100 p-4'>
            <BsCart3 className='h-5 w-5 ' />
          </Link>
          {!auth && (
            <Link to='/auth/login' className='button my-3 h-10 border'>
              Sign in
            </Link>
          )}
          {auth && (
            <div
              ref={ref}
              className='relative'
              onClick={() => changeVisible(!visible)}
            >
              <img
                loading='lazy'
                src={userData.profile_url + '?type=low'}
                alt='profile'
                className='h-16 w-16 rounded-full border bg-white'
              />
              <div
                className={
                  visible
                    ? 'absolute -left-56 top-20 z-10 flex h-96 w-72 flex-col overflow-hidden rounded border bg-white shadow-lg transition-all md:-left-56'
                    : 'absolute hidden transition-all'
                }
              >
                <div className='gap-2 border-b-2 border-[#105050] bg-[#004444] px-4 py-4 shadow md:flex'>
                  <img
                    loading='lazy'
                    src={userData.profile_url + '?type=low'}
                    alt='profile'
                    className='mx-auto h-20 w-20 rounded-full border bg-white md:mx-0'
                  />
                  <div>
                    <p className=' text-left text-lg text-white md:text-xl'>
                      {userData.first + userData.last}
                    </p>
                    <p className=' text-left text-lg text-white md:text-sm'>
                      {userData.email}
                    </p>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <Link to='/users/' className='py-2 text-center text-lg'>
                    My Profile
                  </Link>
                  <Link to='/users/orders' className='py-2 text-center text-lg'>
                    My Orders
                  </Link>
                  {userData.admin && (
                    <Link to='/admin/' className='py-2 text-center text-lg'>
                      Admin Dashboard
                    </Link>
                  )}
                </div>
                <button
                  onClick={() => logOut()}
                  className='mx-auto my-auto mb-2 w-36 rounded-full bg-slate-200 px-4 py-2'
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
