import Footer from "./components/Footer";
import Header from "./components/Header";
import { changeAuthentication, setUserData } from "./slice/AuthSlice";
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!Cookies.get("token")) {
      dispatch(changeAuthentication(false))
      dispatch(setUserData({}))
    }
  }, [])
  return (
    <>
      <Header />
      <section className="min-h-[76vh] max-h-full">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default App;
