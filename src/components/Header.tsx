import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { changeAuthentication } from "../slice/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
// import { useCookies } from "react-cookie"
import Cookies from "js-cookie";

const Header: FC = (): JSX.Element => {
  const [visible, changeVisible] = useState(false);
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  const userData = useSelector((state: any) => state.auth.userData);
  const location = useLocation();
  const dispatch = useDispatch();
  const logOut = () => {
    Cookies.remove("token");
    dispatch(changeAuthentication(false));
  };

  return (
    <>
      <header className="flex justify-between md:px-10 mx-auto py-5 border-b-2 border-neutral-300 items-center">
        <div className="flex gap-10">
          <Link to="/"> <h1 className="text-4xl font-semibold italic ml-5">HIKMAT</h1></Link>
          <nav className="lg:flex gap-4 hidden items-center">
            <Link to="/">Home</Link>
            <Link to="/product">Products</Link>
            {location.pathname === "/" && <a href="/#deals">Deals</a>}
            {location.pathname === "/" && <a href="/#arrival">Categories</a>}
            {location.pathname === "/" && <a href="/#social">About Us</a>}
          </nav>
        </div>
        <div className={`flex gap-2 w-fit mx-2 items-center`}>
          <Link to="/cart" className="p-4 border rounded-full bg-slate-100">
            <BsCart3 className="h-5 w-5 " />
          </Link>
          {!auth && (
            <Link to="/auth/login" className="button h-10 my-3 border">
              Sign in
            </Link>
          )}
          {auth && (
            <div className="relative" onClick={() => changeVisible(!visible)}>
              <img
                src={userData.profile_url}
                alt="profile"
                className="w-16 h-16 bg-white rounded-full border"
              />
              <div
                className={
                  visible
                    ? "rounded shadow-lg absolute top-20 md:-left-56 -left-56 flex h-96 flex-col w-72 transition-all overflow-hidden bg-white z-10 border"
                    : "absolute hidden transition-all"
                }
              >
                <div className="md:flex py-4 px-4 bg-[#004444] gap-2 border-b-2 border-[#105050] shadow">
                  <img
                    src={userData.profile_url}
                    alt="profile"
                    className="mx-auto md:mx-0 w-20 h-20 border bg-white rounded-full"
                  />
                  <div>
                    <p className=" text-white text-left text-lg md:text-xl">
                      {userData.first + userData.last}
                    </p>
                    <p className=" text-white text-left text-lg md:text-sm">
                      {userData.email}
                    </p>
                  </div>
                </div>
                <Link to="/users/" className="text-lg text-center py-2">
                  My Profile
                </Link>
                <Link to="/users/orders" className="text-lg text-center py-2">
                  My Orders
                </Link>
                {userData.admin && (
                  <Link to="/admin/" className="text-lg text-center py-2">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => logOut()}
                  className="w-36 bg-slate-200 my-auto py-2 px-4 rounded-full mx-auto mb-2"
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
