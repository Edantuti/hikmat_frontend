import { useEffect, useState } from 'react';
import { BsShare } from 'react-icons/bs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import Cookies from 'js-cookie';

import { setProducts } from '../../slice/CartSlice';
import { changeAuthentication } from '../../slice/AuthSlice';

const ProductInfo = (props: {
  id: string;
  name: string;
  price: number;
  rating: number;
  discount: number;
  brand: string;
  category: string;
  size: string;
  similar: any;
  Deals: any;
  quantity: number;
}): JSX.Element => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userData);
  const location = useLocation();
  const cart = useSelector((state: any) => state.cart.products);
  useEffect(() => {
    let cart_item = cart.find((obj: any) => {
      return obj.id === props.id;
    });
    setQuantity(cart_item === undefined ? 1 : cart_item.cart_quantity);
  }, [props.id]);

  const addCartToProduct = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/api/cart/`,
        {
          userId: userData.userid,
          productId: props.id,
          quantity: quantity,
        },
        {
          params: {
            userid: userData.userid,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      .then((response) => {
        dispatch(setProducts(response.data));
        return toast.success('Your order has been placed!');
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          dispatch(changeAuthentication(false));
          Cookies.remove('token');
          return toast.error('Please login again!');
        }
        return toast.error('There is an error!');
      });
  };
  const pasteLinkClipboard = () => {
    if (location.pathname === '/admin')
      return toast.error('You cannot copy this link');
    navigator.clipboard.writeText(window.location.href);

    return toast.success('Link got copied to the clipboard');
  };

  function reduceValue() {
    if (quantity - 1 > 1)
      if (props.quantity) return Math.min(quantity - 1, props.quantity);
      else return quantity - 1;
    return 1;
  }
  function increaseValue() {
    if (props.quantity) return Math.min(quantity + 1, props.quantity);
    return quantity + 1;
  }
  return (
    <article className='m-2 py-10 md:h-[50vh] md:w-[50%] lg:w-[53%]'>
      <div className='mt-10 flex items-center'>
        <h2 className='text-2xl lg:text-3xl'>{props.name}</h2>

        <button
          className='m-2 rounded-full border bg-slate-200 p-2 lg:ml-auto'
          onClick={() => pasteLinkClipboard()}
        >
          <BsShare />
        </button>
      </div>
      <div className='my-2'>
        <span className='mr-2 text-sm text-gray-600'>brand: </span>
        <span className='rounded-full border bg-slate-100 px-3 py-1 text-xs text-gray-600'>
          {props.brand}
        </span>
        <span className='mx-2 text-sm text-gray-600'>category: </span>
        <span className='rounded-full border bg-slate-100 px-3 py-1 text-xs text-gray-600'>
          {props.category}
        </span>
      </div>
      <hr />
      <div className='sm:flex '>
        <div className='my-2 p-2'>
          <div className='my-5 flex flex-col gap-2'>
            <div className='flex items-center text-2xl'>
              <FaRupeeSign className='' />
              <p className='flex justify-between'>
                {props.price -
                  Math.floor(
                    props.price *
                      ((props.discount +
                        props.Deals.reduce((total: number, curr: any) => {
                          return total + curr.discount;
                        }, 0)) /
                        100)
                  )}
                {props.discount +
                  props.Deals.reduce((total: number, curr: any) => {
                    return total + curr.discount;
                  }, 0) >
                  0 && <del className='text-sm'>{props.price}</del>}
                {props.discount +
                  props.Deals.reduce((total: number, curr: any) => {
                    return total + curr.discount;
                  }, 0) >
                  0 && (
                  <span className='h-6 rounded bg-green-200 p-1 text-xs'>
                    {props.discount +
                      props.Deals.reduce((total: number, curr: any) => {
                        return total + curr.discount;
                      }, 0)}
                    %off
                  </span>
                )}
              </p>
            </div>

            <span className='w-fit rounded-full bg-green-300 px-2 text-sm text-neutral-700'>
              {props.rating} &#9733;
            </span>
          </div>
          <div className='my-5 flex'>
            {props.quantity != 0 && props.quantity != undefined && (
              <div className='flex items-center text-lg'>
                <button
                  className='text-md rounded-l-full border px-4 py-1 font-bold'
                  onClick={() => setQuantity(increaseValue())}
                >
                  +
                </button>
                <p className='border-b border-t p-1 px-4'>
                  {Math.min(quantity, props.quantity)}
                </p>
                <button
                  className='text-md rounded-r-full border px-4 py-1 font-bold'
                  onClick={() => setQuantity(reduceValue())}
                >
                  -
                </button>
              </div>
            )}
          </div>
          <div>
            {props.quantity === 0 && (
              <p className='font-poppins text-lg'>Out of Stock!</p>
            )}
          </div>
          <button
            className='rounded-full bg-[#FAFAFA] px-4 py-1 font-poppins text-sm font-bold shadow transition-colors hover:bg-[#004449] hover:text-white disabled:bg-slate-300'
            onClick={() => addCartToProduct()}
            disabled={props.quantity === 0}
          >
            Add to Cart
          </button>
        </div>
        <div className='m-2'>
          <div className='m-2'>
            <h1 className='p-1'>Sizes:</h1>
            <div className='grid w-56 grid-cols-[repeat(3,5rem)] gap-2'>
              <Link
                to={`/product/${props.id}`}
                className='w-fit rounded border bg-slate-300 px-4 py-1 text-sm text-slate-800'
              >
                {props.size}
              </Link>
              {props.similar.map((product: any) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className='w-fit rounded border bg-slate-100 px-4 py-1 text-sm text-slate-800'
                >
                  {product.size}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme='colored' />
    </article>
  );
};
export default ProductInfo;
