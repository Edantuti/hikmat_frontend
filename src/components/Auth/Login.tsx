import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { changeAuthentication, setUserData } from '../../slice/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import PasswordInput from './PasswordInput';
import { setProducts } from '../../slice/CartSlice';
export type FormValues = {
  email: string;
  password: string;
};

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, changeShow] = useState<boolean>(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false);
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    reValidateMode: 'onBlur',
  });
  const onSubmit = async (data: FormValues) => {
    try {
      const post = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/auth/login`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      Cookies.set('token', post.data.token, {
        path: '/',
        expires: 3,
      });
      dispatch(changeAuthentication(true));
      const { data: CartData } = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      dispatch(setProducts(CartData));
      dispatch(setUserData(post.data.userData));
      navigate('/');
    } catch (errors) {
      console.error(errors);
      const AXIOS_ERROR = errors as any;
      if (AXIOS_ERROR.response.data.message === 'Unauthorized:NOT_VERIFIED')
        setVerifyError(true);
      else if (
        AXIOS_ERROR.response.data.message === 'Unauthorized:INVALID_CREDENTIALS'
      )
        setInvalidError(true);
      else if (AXIOS_ERROR.response.data.message === 'Unauthorized:NOT_FOUND')
        setInvalidError(true);
    }
  };

  return (
    <>
      {!auth && (
        <form
          className='mx-auto mb-64 mt-36 flex h-96 w-full flex-col p-10 sm:w-[500px]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='mb-12 text-center font-volkhov text-5xl'>Login</h2>
          <p className='ml-1 text-sm text-gray-700'>Email</p>
          <input
            type='email'
            className='mb-1 mt-1 rounded border p-1 font-poppins shadow-inner'
            placeholder='email'
            {...register('email', {
              required: true,
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors?.email && (
            <p className='mx-auto mb-3 w-fit text-red-500'>
              Enter your email properly
            </p>
          )}
          <p className='ml-1 text-sm text-gray-700'>Password</p>
          <PasswordInput
            placeholder='password'
            register={register}
            formTag='password'
            show={show}
            changeShow={changeShow}
            requirement={{ required: true }}
          />
          {errors?.password && (
            <p className='mb-3 text-red-500'>{errors.password.message}</p>
          )}
          {invalidError && (
            <p className='mx-auto mb-3 w-fit text-red-500'>
              Invalid Email/Password
            </p>
          )}
          {verifyError && (
            <p className='mx-auto mb-3 w-fit text-red-500'>
              You are not verified.
            </p>
          )}
          <input type='submit' className='button my-2 border' />
          <p className='mx-auto w-fit'>
            New to hikmat?{' '}
            <Link to='/auth/signup' className='text-blue-500'>
              Create a new Account
            </Link>
          </p>
          <p className='mx-auto w-fit'>
            Forgot your password?{' '}
            <Link to='/auth/forgot' className='text-blue-500'>
              Change Password
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default Login;
