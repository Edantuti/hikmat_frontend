import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserData } from "../../slice/AuthSlice";

type FormValues = {
  first: string;
  last: string;
  email: string;
  phone: string;
};
export default function ProfileUpdate() {
  const { register, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {},
    reValidateMode: "onBlur",
  });
  const userData = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch()
  const [fileUrl, changeFileUrl] = useState<string>(userData.profile_url);
  const [file, changeFile] = useState<File>();
  useEffect(() => {
    setDefaultValues();
  });
  function setDefaultValues() {
    setValue("last", userData.last);
    setValue("first", userData.first);
    setValue("email", userData.email);
    setValue("phone", userData.phone);
  }
  async function onSubmit(profileData: any) {
    try {
      const formdata = new FormData();
      if (!file) return console.error("Error: File not submitted")
      formdata.set("profile_url", new Blob([await file.arrayBuffer()], { type: file.type }))
      formdata.set("userid", userData.userid);
      formdata.set("last", profileData.last);
      formdata.set("first", profileData.first);
      formdata.set("email", profileData.email);
      formdata.set("phone", profileData.phone);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/update`, formdata, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      dispatch(setUserData({ ...userData, profile_url: data[0].profile_url }))
    } catch (error) {
      console.error(error);
    }
  }
  const fileChanger = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    changeFile(event.target.files[0]);
    changeFileUrl(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
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
          <p>First Name:</p>
          <input
            type="text"
            className="inputField"
            placeholder="First Name"
            {...register("first", { required: true })}
          />
          <p>Last Name:</p>
          <input
            type="text"
            className="inputField"
            placeholder="Last Name"
            {...register("last", { required: true })}
          />
          <p>Email Address:</p>
          <input
            type="email"
            className="inputField"
            placeholder="Email Address"
            {...register("email", { required: true })}
          />
          <p>Phone Number:</p>
          <input
            type="text"
            className="inputField"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
