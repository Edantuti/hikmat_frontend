import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

export default function CategoryAdding() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    reValidateMode: 'onBlur',
  });
  const onSubmit = async (d: any) => {
    try {
      const formdata = new FormData();
      formdata.append('name', d.name);
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/categories`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      return toast.success('Your category has been added.');
    } catch (error) {
      console.error(error);
      return toast.error('Error in submission');
    }
  };
  return (
    <section className='flex max-h-full min-h-screen items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex w-96 flex-col'>
        <h2 className='text-center text-2xl'>New Category</h2>
        <input
          type='text'
          placeholder='Enter your Category Name'
          className='inputField my-2'
          {...register('name', { required: true })}
        />
        {errors.name && <p>You cannot submit a empty Category name</p>}
        <input type='submit' className='button' value='Submit' />
      </form>

      <ToastContainer theme='colored' />
    </section>
  );
}
