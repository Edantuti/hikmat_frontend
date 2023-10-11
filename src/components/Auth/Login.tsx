import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { changeAuthentication, setUserData } from "../../slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import PasswordInput from "./PasswordInput";
import { setProducts } from "../../slice/CartSlice";

export type FormValues = {
  email: string;
  password: string;
};

const Login: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, changeShow] = useState<boolean>(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false);
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    reValidateMode: "onBlur",
  });
  const onSubmit = async (data: any) => {
    try {
      const post = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );

      Cookies.set("token", post.data.token, {
        path: "/",
        expires: 3,
      });
      if (post.status == 200) {
        dispatch(changeAuthentication(true));
        const { data } = await axios.get("http://localhost:5000/api/cart/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        dispatch(setProducts(data));
        dispatch(setUserData(post.data.userData));
        navigate("/");
      }
    } catch (errors) {
      console.error(errors);
      const AXIOS_ERROR = errors as any;
      if (AXIOS_ERROR.response.data.message === "Unauthorized:NOT_VERIFIED")
        setVerifyError(true);
      else if (
        AXIOS_ERROR.response.data.message === "Unauthorized:INVALID_CREDENTIALS"
      )
        setInvalidError(true);
      else if (AXIOS_ERROR.response.data.message === "Unauthorized:NOT_FOUND")
        setInvalidError(true);
    }
  };

  return (
    <>
      {!auth && (
        <form
          className="flex flex-col sm:w-[500px] h-96 mb-64 mt-36 w-full p-10 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-5xl font-volkhov text-center mb-12">Login</h2>
          <p className="text-sm ml-1 text-gray-700">Email</p>
          <input
            type="email"
            className="p-1 rounded font-poppins shadow-inner mb-1 mt-1 border"
            placeholder="email"
            {...register("email", {
              required: true,
              pattern:
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i ||
                "Enter a valid email address",
            })}
          />
          {errors?.email && (
            <p className="mx-auto w-fit mb-3 text-red-500">
              Enter your email properly
            </p>
          )}
          <p className="text-sm ml-1 text-gray-700">Password</p>
          <PasswordInput
            placeholder="password"
            register={register}
            formTag="password"
            show={show}
            changeShow={changeShow}
            requirement={{ required: true }}
          />
          {errors?.password && (
            <p className="mb-3 text-red-500">{errors.password.message}</p>
          )}
          {invalidError && (
            <p className="mx-auto w-fit mb-3 text-red-500">
              Invalid Email/Password
            </p>
          )}
          {verifyError && (
            <p className="mx-auto w-fit mb-3 text-red-500">
              You are not verified.
            </p>
          )}
          <input type="submit" className="button my-2 border" />
          <p className="w-fit mx-auto">
            New to hikmat?{" "}
            <Link to="/auth/signup" className="text-blue-500">
              Create a new Account
            </Link>
          </p>
          <p className="w-fit mx-auto">
            Forgot your password? {" "}
            <Link to="/auth/forgot" className="text-blue-500">
              Change Password
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default Login;
