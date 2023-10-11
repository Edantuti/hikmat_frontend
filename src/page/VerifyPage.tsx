import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { changeAuthentication, setUserData } from "../slice/AuthSlice";
import { setProducts } from "../slice/CartSlice";
export default function VerifyPage() {
  const [params] = useSearchParams();
  const [verified, setVerified] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    checkVerification();
  });

  async function checkVerification() {
    const token = params.get("token");
    if (!token) return;
    try {
      const { data: authData, status } = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/auth/verify`,
        {
          params: {
            token: params.get("token"),
          },
        },
      );
      Cookies.set("token", token, {
        path: "/",
        expires: 3,
      });
      if (status == 200) {
        setVerified(true);
        dispatch(changeAuthentication(true));
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/cart/`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        dispatch(setProducts(data));
        dispatch(setUserData(authData.userData));

        setTimeout(() => navigate("/"), 5000);
      }
    } catch (error) {
      console.error(error);
      dispatch(changeAuthentication(false));
      setVerified(false);
    }
  }
  return (
    <>
      <section className="flex items-center justify-center h-[90vh]">
        {verified ? (
          <div>
            <p className="text-lg font-bold">You are now verified.</p>
            <p className="text-lg font-bold">
              Redirecting you to the home page, in 5 seconds.
            </p>
          </div>
        ) : (
          <p className="text-xl font-semibold">Invalid Verification Token</p>
        )}
      </section>
    </>
  );
}
