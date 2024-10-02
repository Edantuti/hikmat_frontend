import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';

export default function ProductReviewForm(props: {
  productid: string;
  data: { count: number; rows: any[] };
}): JSX.Element {
  const userData = useSelector((state: any) => state.auth.userData);
  const [starValues, setStars] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ description: string; rating: number }>({
    defaultValues: { rating: 0 },
    reValidateMode: 'onBlur',
  });
  const onSubmit = async (d: any) => {
    try {
      const formdata = new FormData();
      formdata.append('description', d.description);
      formdata.append('rating', d.rating);
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/products/reviews`,
        formdata,
        {
          params: {
            id: props.productid,
            userId: userData.userid,
          },
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      toast.success('Your review has been submitted.');
    } catch (error) {
      console.error(error);
    }
  };
  function setRating(index: number) {
    const copyValue: boolean[] = [];
    for (let i = 0; i < 5; i++) {
      if (i <= index) copyValue.push(true);
      else copyValue.push(false);
    }
    setValue('rating', index + 1);
    setStars(copyValue);
  }
  return (
    <div className='m-2 ml-0 rounded  p-2'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className='h-20 w-full rounded border p-2'
          placeholder='Enter your Review'
          {...register('description', { required: true })}
        />
        {errors.description && <p>Empty Review is not acceptable.</p>}
        <span className='flex items-center'>
          Rating:
          {starValues.map((starStatus: boolean, index: number) =>
            starStatus ? (
              <FaStar key={nanoid()} onClick={() => setRating(index)} />
            ) : (
              <FaRegStar key={nanoid()} onClick={() => setRating(index)} />
            )
          )}
        </span>
        <input type='submit' className='button' value='Submit your review' />
      </form>
    </div>
  );
}
