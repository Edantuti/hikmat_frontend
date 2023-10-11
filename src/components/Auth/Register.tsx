import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
// import {useCookies} from 'react-cookie'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import PasswordInput from "./PasswordInput";

export type FormValues = {
  first: string;
  last: string;
  email: string;
  confirm: string;
  password: string;
  phone: string;
};

const Register: FC = (): JSX.Element => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    reValidateMode: "onBlur",
  });
  const [exist, changeExists] = useState(false);
  const avatarfile = createAvatar(pixelArt, { seed: "" + Math.random() });
  const [file, changeFile] = useState<File>();
  const [error, changeError] = useState<string>("");
  const [fileUrl, changeFileUrl] = useState<string>(avatarfile.toDataUriSync());
  const [show, changeShow] = useState<boolean>(false);
  const [confirmShow, changeConfirmShow] = useState<boolean>(false);
  const onSubmit = async (data: FormValues) => {
    const formdata = new FormData();
    changeExists(false)
    changeError("")
    const png = avatarfile.png();
    formdata.append(
      "profile_url",
      file
        ? file
        : new Blob([await png.toArrayBuffer()], { type: "image/png" }),
    );
    formdata.append("firstName", data.first);
    formdata.append("lastName", data.last);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("phone", data.phone);
    formdata.get("profile_url");
    axios
      .post(`http://localhost:5000/api/auth/register`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response);
        changeExists(false);
        changeError("");
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          changeExists(true);
          changeError("");
        } else {
          console.error(error);
          changeError(error.code);
        }
      });
  };

  const validiateConfirmPassword = () => {
    if (getValues("confirm") === getValues("password")) {
      return true;
    }
    return false;
  };
  const fileChanger = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    changeFile(event.target.files[0]);
    changeFileUrl(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <form
        className="flex flex-col sm:w-[50vw] lg:w-[35vw] w-full p-10 mx-auto my-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-volkhov text-center">Sign Up to Hikmat</h2>
        <div className="relative">
          <input
            type="file"
            className="opacity-0 absolute z-10  w-36 h-36 md:left-40 left-44 right-[50%]"
            onChange={(e) => fileChanger(e)}
          />
          <img
            src={fileUrl}
            alt="profile"
            className="rounded-full  w-36 h-36 mx-auto p-2"
          />
          <p className="text-center font-poppins text-sm py-4">
            Click to change the profile picture
          </p>
        </div>
        <div className="flex gap-2 mb-1">
          <p className="w-6/12 text-sm ml-1 text-gray-700">First Name</p>
          <p className="w-6/12 text-sm ml-1 text-gray-700">Last Name</p>
        </div>
        <div className="flex justify-evenly gap-2 mb-4">
          <input
            type="text"
            className="p-1 rounded font-poppins w-6/12 border shadow-inner"
            placeholder="First Name"
            {...register("first", { required: "Enter your first name" })}
          />
          <input
            type="text"
            className="p-1 rounded font-poppins w-6/12 border shadow-inner"
            placeholder="Last Name"
            {...register("last", { required: "Enter your last name" })}
          />
        </div>
        <p className="text-sm ml-1 text-gray-700">Email</p>
        <input
          type="email"
          className="p-1 rounded font-poppins border shadow-inner mb-4 mt-1"
          placeholder="Email"
          {...register("email", {
            required: "Enter your email",
            pattern:
              /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i ||
              "Enter a valid email address",
          })}
        />
        {errors.email && <p>{errors.email.type}</p>}
        <p className="text-sm ml-1 text-gray-700">Password</p>
        <PasswordInput
          placeholder="password"
          formTag="password"
          register={register}
          requirement={{
            required: "Enter your password",
            minLength: {
              value: 8,
              message: "Password should have minimum 8 characters",
            },
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
          }}
          show={show}
          changeShow={changeShow}
        />
        {errors?.password?.type === "minLength" && (
          <p className="p-4 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            {errors?.password.message}
          </p>
        )}
        {errors?.password && (
          <p className="p-2 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            Your password is weak
          </p>
        )}
        <p className="text-sm ml-1 text-gray-700">Confirm Password</p>
        <PasswordInput
          show={confirmShow}
          changeShow={changeConfirmShow}
          placeholder="Confirm Password"
          register={register}
          formTag="confirm"
          requirement={{
            required: "Enter your password again",
            validate: validiateConfirmPassword,
          }}
        />
        {errors?.confirm?.type === "required" && (
          <p className="p-4 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            {errors?.confirm?.message}
          </p>
        )}
        {errors?.confirm?.type === "validate" && (
          <p className="p-4 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            The passwords are not same
          </p>
        )}
        <p className="text-sm ml-1 text-gray-700">Telephone Number</p>
        <input
          type="tel"
          className="p-1 rounded font-poppins  border shadow-inner mb-4 mt-1"
          placeholder="Phone Number along with your country code"
          {...register("phone", {
            required: "Enter your Phone Number",
            pattern: /^^\+[1-9]{1}[0-9]{3,14}$/i,
          })}
        />
        {errors?.phone?.type === "required" && (
          <p className="p-4 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            {errors?.phone?.message}
          </p>
        )}
        {errors?.phone?.type === "pattern" && (
          <p className="p-4 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            Enter a valid Phone number along with country code
          </p>
        )}

        {isSubmitSuccessful && !exist && !error && (
          <p className="p-4 rounded border-2 bg-green-500 border-green-600 text-white font-poppins">
            Form is Submitted Successfully
          </p>
        )}
        {exist && (
          <p className="p-4 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            User already exists
          </p>
        )}
        {error && (
          <p className="p-4 rounded border-2 bg-red-500 border-red-600 text-white font-poppins">
            {error}
          </p>
        )}
        <input type="submit" className="button border" />
        <p className="w-fit mx-auto my-1">
          Are you already a member of Hikmat?{" "}
          <Link to="/auth/login" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

//
export default Register;
