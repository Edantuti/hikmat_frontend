import axios from 'axios';
import { useForm } from 'react-hook-form';
type FormValues = {
  email: string;
};

const ForgotPassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({
    reValidateMode: 'onBlur',
  });

  function onSubmit(data: FormValues) {
    axios
      .post(`${import.meta.env.VITE_BACKEND}/api/auth/change`, data)
      .then(() => {})
      .catch((errors: unknown) => console.error(errors));
  }
  return (
    <>
      {!isSubmitSuccessful ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto mb-64 mt-36 flex h-96 w-full flex-col p-10 sm:w-[500px]'
        >
          <h2 className='mb-12 text-center font-volkhov text-5xl'>
            Forgot Password
          </h2>
          <p className='ml-1 text-sm text-gray-700'>Enter the Email:</p>
          <input
            type='email'
            className='inputField'
            placeholder='Enter your registered email'
            {...register('email', { required: true })}
          />
          <input type='submit' className='button mx-auto my-2 w-40 border' />
        </form>
      ) : (
        <div className='flex max-h-full min-h-screen items-center justify-center'>
          Link has been shared to you in your email!
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
