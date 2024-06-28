import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { FaCheck, FaHourglass } from 'react-icons/fa';
import { useFetch } from '../../hooks/fetch';
import { useSelector } from 'react-redux';
const OrderDetails = (): JSX.Element => {
  const user = useSelector((state: any) => state.auth.userData);
  const { data, isLoading } = useFetch<[]>(
    `${import.meta.env.VITE_BACKEND}/api/orders`,
    { userid: user.userid }
  );
  if (isLoading)
    return (
      <>
        <h1 className='flex items-center justify-center'>Loading....</h1>
      </>
    );
  return (
    <>
      <section className='w-full rounded lg:m-2 lg:border'>
        <div className='overflow-visible'>
          {!data && (
            <p className='mx-auto my-40 flex h-96 w-fit font-poppins md:text-2xl'>
              Didn't place any orders yet?
            </p>
          )}
          {data &&
            data.map((order: any) => <OrderItem key={order.id} {...order} />)}
        </div>
      </section>
    </>
  );
};

function OrderItem(props: any) {
  const [cancelled, setCancelled] = useState<boolean>(props.cancelled);
  async function cancelOrder(e: any) {
    e.currentTarget.checked = true;
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND}/api/orders/delivered`,
        { cancelled: true },
        {
          params: {
            id: props.id,
          },
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      if (data.status === 'SUCCESS') {
        setCancelled(true);
      }
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
    }
  }

  return (
    <>
      <div key={props.id} className={`m-2 border-b-2 border-b-blue-400 p-2`}>
        <h2 className='text-sm text-gray-700'>
          Order info / <span className='text-xs'>orderid: {props.id}</span>
        </h2>
        <hr className='w-full' />
        <div className='my-2'>
          <p>Product Name: {props.Products[0].name}</p>
          <p>Quantity:{props.quantity}</p>
          <p>Date: {new Date(props.createdAt).toDateString()}</p>
          <p>Payment_id:{props.paymentId} </p>
          <p>
            DTDC:{' '}
            {props.dtdcid && !cancelled
              ? props.dtdcid
              : !cancelled
                ? 'Yet to be set'
                : 'Cancelled'}{' '}
          </p>
        </div>
        <h3 className='text-sm text-gray-700'>Address</h3>
        <hr className='w-full' />
        <div className='my-2'>
          <p>Address: {props.address}</p>
          <p>City:{props.city}</p>
          <p>State:{props.state}</p>
          <p>PinCode:{props.pincode}</p>
        </div>
        <h3 className='text-sm text-gray-700'>Status</h3>
        <hr className='mb-2 w-full' />
        <div className='flex gap-2'>
          {props.delivered && !cancelled ? (
            <span className='flex w-fit items-center gap-2 rounded-full border bg-green-400 px-2 py-1 text-sm'>
              <FaCheck className='h-4 w-4' /> Delivered
            </span>
          ) : (
            !cancelled && (
              <span className='flex w-fit items-center gap-2 rounded-full border bg-slate-50 px-2 py-1 text-sm'>
                {' '}
                <FaHourglass className='h-4 w-4' /> Not delivered
              </span>
            )
          )}
          {cancelled && !props.delivered ? (
            <span className='flex w-fit items-center gap-2 rounded-full border bg-red-400 px-2 py-1 text-sm'>
              Cancelled
            </span>
          ) : (
            !props.delivered && (
              <button
                onClick={(e) => cancelOrder(e)}
                className='w-fit rounded-full border bg-white px-2 py-1 text-sm'
              >
                Cancel
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
