import { useEffect, useState } from 'react';
import ProductReviewForm from './ProductReviewForm';
import { useSelector } from 'react-redux';
import { FaRegStar, FaStar } from 'react-icons/fa';

const ProductReview = (props: {
  productid: string;
  reviews: any[];
}): JSX.Element => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setData(props.reviews);
  }, [props.reviews]);
  const [count, setCount] = useState<number>(3);
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  function increaseReview() {
    setCount(count + 3);
  }
  return (
    <>
      <div className='m-2'>
        <h3 className='text-xl underline'>Reviews:</h3>
        <hr className='my-2' />
        {data.length ? (
          <section className='p-2 md:max-w-[40%]'>
            <p className='m-2 ml-0 font-poppins text-2xl font-bold'>
              Total Reviews:{data.count}
            </p>
            {data.map((obj: any, index: number) => {
              return <ReviewComponent {...obj} key={obj.id || index} />;
            })}
            {data.length > count && (
              <button
                type='button'
                className='button'
                onClick={() => increaseReview()}
              >
                {' '}
                get more reviews
              </button>
            )}
            {auth ? (
              <ProductReviewForm productid={props.productid} data={data} />
            ) : (
              <p>You have to login first.</p>
            )}
          </section>
        ) : (
          <section className=' rounded p-2 md:max-w-[40%]'>
            {auth ? (
              <p>Be first person to review this product</p>
            ) : (
              <p>You have to login first.</p>
            )}
            {auth && (
              <ProductReviewForm productid={props.productid} data={data} />
            )}
          </section>
        )}
      </div>
    </>
  );
};

function ReviewComponent(props: any): JSX.Element {
  const [starValues] = useState<boolean[]>(
    [false, false, false, false, false].map((value: boolean, index: number) => {
      value;
      if (props.rating - 1 < index) return false;
      else return true;
    })
  );

  return (
    <>
      <div key={props.id} className='m-2  ml-0 space-y-2 rounded p-2'>
        <div className='flex items-center gap-2'>
          <img
            src={props.User.profile_url}
            alt='user_profile'
            className='w-10  rounded-full'
          />
          <p>{props.User.firstName + props.User.lastName}</p>
        </div>
        <p className='text-sm'>Review:</p>
        <p className=' rounded p-2'>Description: {props.description}</p>
        <p className='flex items-center p-2'>
          Rating:{' '}
          {starValues.map((starStatus: boolean, index: number) => {
            return starStatus ? (
              <FaStar key={index} />
            ) : (
              <FaRegStar key={index} />
            );
          })}
        </p>
      </div>
    </>
  );
}
export default ProductReview;
