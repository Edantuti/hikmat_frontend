import axios from 'axios';
import { ChangeEvent, useState } from 'react';
// import {useCookies} from 'react-cookie'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';
import PasswordInput from './PasswordInput';

export type FormValues = {
  first: string;
  last: string;
  email: string;
  confirm: string;
  password: string;
  phone: string;
};
const Register = (): JSX.Element => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    reValidateMode: 'onBlur',
  });
  const [exist, changeExists] = useState(false);
  const avatarfile = createAvatar(pixelArt, { seed: '' + Math.random() });
  const [file, changeFile] = useState<File>();
  const [error, changeError] = useState<string>('');
  const [fileUrl, changeFileUrl] = useState<string>(avatarfile.toDataUriSync());
  const [show, changeShow] = useState<boolean>(false);
  const [confirmShow, changeConfirmShow] = useState<boolean>(false);
  const onSubmit = async (data: FormValues) => {
    const formdata = new FormData();
    changeExists(false);
    changeError('');
    const png = avatarfile.png();
    if (!file)
      formdata.append(
        'profile_url',
        new Blob([await png.toArrayBuffer()], { type: 'image/png' })
      );
    else formdata.append('profile_url', file);
    formdata.append('firstName', data.first);
    formdata.append('lastName', data.last);
    formdata.append('email', data.email);
    formdata.append('password', data.password);
    formdata.append('phone', data.phone);
    axios
      .post(`${import.meta.env.VITE_BACKEND}/api/auth/register`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(() => {
        changeExists(false);
        changeError('');
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'ERR_BAD_REQUEST') {
          changeExists(true);
          changeError('');
        } else {
          console.error(error);
          changeError(error.code);
        }
      });
  };

  const validiateConfirmPassword = () => {
    if (getValues('confirm') === getValues('password')) {
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
        className='mx-auto my-24 flex w-full flex-col p-10 sm:w-[50vw] lg:w-[35vw]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-center font-volkhov text-3xl'>Sign Up to Hikmat</h2>
        <div className='relative'>
          <input
            type='file'
            className='absolute left-44 right-[50%]  z-10 h-36 w-36 opacity-0 md:left-40'
            onChange={(e) => fileChanger(e)}
          />
          <img
            loading='lazy'
            src={fileUrl}
            alt='profile'
            className='mx-auto  h-36 w-36 rounded-full p-2'
          />
          <p className='py-4 text-center font-poppins text-sm'>
            Click to change the profile picture
          </p>
        </div>
        <div className='mb-1 flex gap-2'>
          <p className='ml-1 w-6/12 text-sm text-gray-700'>First Name</p>
          <p className='ml-1 w-6/12 text-sm text-gray-700'>Last Name</p>
        </div>
        <div className='mb-4 flex justify-evenly gap-2'>
          <input
            type='text'
            className='w-6/12 rounded border p-1 font-poppins shadow-inner'
            placeholder='First Name'
            {...register('first', { required: 'Enter your first name' })}
          />
          <input
            type='text'
            className='w-6/12 rounded border p-1 font-poppins shadow-inner'
            placeholder='Last Name'
            {...register('last', { required: 'Enter your last name' })}
          />
        </div>
        <p className='ml-1 text-sm text-gray-700'>Email</p>
        <input
          type='email'
          className='mb-4 mt-1 rounded border p-1 font-poppins shadow-inner'
          placeholder='Email'
          {...register('email', {
            required: 'Enter your email',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: 'Enter a valid email address',
            },
          })}
        />
        {errors.email && <p>{errors.email.type}</p>}
        <p className='ml-1 text-sm text-gray-700'>Password</p>
        <PasswordInput
          placeholder='password'
          formTag='password'
          register={register}
          requirement={{
            required: 'Enter your password',
            minLength: {
              value: 8,
              message: 'Password should have minimum 8 characters',
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
              message: 'Your password is weak',
            },
          }}
          show={show}
          changeShow={changeShow}
        />
        {errors?.password?.type === 'minLength' && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-4 font-poppins text-white'>
            {errors?.password.message}
          </p>
        )}
        {errors?.password && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-2 font-poppins text-white'>
            Your password is weak
          </p>
        )}
        <p className='ml-1 text-sm text-gray-700'>Confirm Password</p>
        <PasswordInput
          show={confirmShow}
          changeShow={changeConfirmShow}
          placeholder='Confirm Password'
          register={register}
          formTag='confirm'
          requirement={{
            required: 'Enter your password again',
            validate: validiateConfirmPassword,
          }}
        />
        {errors?.confirm?.type === 'required' && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-4 font-poppins text-white'>
            {errors?.confirm?.message}
          </p>
        )}
        {errors?.confirm?.type === 'validate' && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-4 font-poppins text-white'>
            The passwords are not same
          </p>
        )}
        <p className='ml-1 text-sm text-gray-700'>Telephone Number</p>
        <input
          type='tel'
          className='mb-4 mt-1 rounded  border p-1 font-poppins shadow-inner'
          placeholder='Phone Number along with your country code'
          {...register('phone', {
            required: 'Enter your Phone Number',
            pattern: /^^\+[1-9]\d{3,14}$/i,
          })}
        />
        {errors?.phone?.type === 'required' && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-4 font-poppins text-white'>
            {errors?.phone?.message}
          </p>
        )}
        {errors?.phone?.type === 'pattern' && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-4 font-poppins text-white'>
            Enter a valid Phone number along with country code
          </p>
        )}

        {isSubmitSuccessful && !exist && !error && (
          <p className='rounded border-2 border-green-600 bg-green-500 p-4 font-poppins text-white'>
            Form is Submitted Successfully
          </p>
        )}
        {exist && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-4 font-poppins text-white'>
            User already exists
          </p>
        )}
        {error && (
          <p className='rounded border-2 border-red-600 bg-red-500 p-4 font-poppins text-white'>
            {error}
          </p>
        )}
        <input type='submit' className='button border' />
        <p className='mx-auto my-1 w-fit'>
          Are you already a member of Hikmat?{' '}
          <Link to='/auth/login' className='text-blue-500'>
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

//
export default Register;
