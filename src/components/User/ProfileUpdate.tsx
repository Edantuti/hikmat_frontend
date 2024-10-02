import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../slice/AuthSlice';
import AddressUpdateForm from './AddressUpdateForm';
import { ToastContainer, toast } from 'react-toastify';

type FormValues = {
  first: string;
  last: string;
  email: string;
  phone: string;
};
export default function ProfileUpdate() {
  const userData = useSelector((state: any) => state.auth.userData);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      last: userData.last,
      first: userData.first,
      email: userData.email,
      phone: userData.phone,
    },
    reValidateMode: 'onBlur',
  });
  const dispatch = useDispatch();
  const [fileUrl, changeFileUrl] = useState<string>(userData.profile_url);
  const [file, changeFile] = useState<File>();
  async function onSubmit(profileData: any) {
    try {
      const formdata = new FormData();
      if (file)
        formdata.set(
          'profile_url',
          new Blob([await file.arrayBuffer()], { type: file.type })
        );
      formdata.set('userid', userData.userid);
      formdata.set('last', profileData.last);
      formdata.set('first', profileData.first);
      formdata.set('email', profileData.email);
      formdata.set('phone', profileData.phone);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/auth/update`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      dispatch(
        setUserData({
          userid: userData.userid,
          first: profileData.first,
          last: profileData.last,
          email: profileData.email,
          phone: profileData.phone,
          admin: userData.admin,
          profile_url: data.profile_url,
        })
      );
      toast.success('Your Profile is updated!');
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
    <section className='gap-2 md:flex'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col space-y-2'
      >
        {/* TODO: Responsive work pending*/}

        <div className='relative'>
          <input
            type='file'
            className='xs:left absolute left-20  right-[50%] z-10 h-36 w-36 opacity-0 sm:left-60 md:left-24'
            onChange={(e) => fileChanger(e)}
          />
          <img
            src={fileUrl}
            alt='profile'
            className='mx-auto  h-36 w-36 rounded-full p-2'
          />
          <p className='py-4 text-center font-poppins text-sm'>
            Click to change the profile picture
          </p>
        </div>
        <p>First Name:</p>
        <input
          type='text'
          className='inputField'
          placeholder='First Name'
          {...register('first', { required: true })}
        />
        <p>Last Name:</p>
        <input
          type='text'
          className='inputField'
          placeholder='Last Name'
          {...register('last', { required: true })}
        />
        <p>Email Address:</p>
        <input
          type='email'
          className='inputField'
          placeholder='Email Address'
          {...register('email', { required: true })}
        />
        <p>Phone Number:</p>
        <input
          type='text'
          className='inputField'
          placeholder='Phone Number'
          {...register('phone', { required: true })}
        />
        <button type='submit' className='button'>
          Submit
        </button>
      </form>
      <AddressUpdateForm />
      <ToastContainer theme='colored' />
    </section>
  );
}
