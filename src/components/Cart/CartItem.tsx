import { useState } from 'react';

import { RiDeleteBin4Line } from 'react-icons/ri';
const CartItem = (props: {
  item: any;
  index: number;
  length: number;
  removeFromCart: (id: string) => Promise<void>;
}): JSX.Element => {
  const [discount] = useState<number>(
    props.item.Deals.reduce((sum: number, curr: any) => {
      return sum + curr.discount;
    }, 0)
  );
  const [price] = useState<number>(
    props.item.price -
      Math.floor(props.item.price * ((props.item.discount + discount) / 100))
  );
  return (
    <>
      <div
        className={`flex h-60 w-full border ${props.length - 1 !== props.index ? 'mb-2' : 'mb-0'} items-center rounded`}
      >
        <div className='flex aspect-square h-48 w-72 justify-center rounded-t p-1'>
          <img
            loading='lazy'
            src={props.item.photos[0]}
            alt={props.item.name}
            className='aspect-square h-auto overflow-hidden rounded-t'
          />
        </div>
        <div className='flex-2 my-10 w-96 p-4 text-lg'>
          <p className='text-xl md:text-2xl lg:text-3xl'>{props.item.name}</p>
          <p className='text-sm'>
            <b>Price:</b> {price}
          </p>
          <p className='text-sm'>
            <b>Quantity:</b> {props.item.cart_quantity}
          </p>
          <p className='text-sm'>
            <b>Total Price:</b>
            {price * props.item.cart_quantity}
          </p>
          {props.item.quantity === 0 && (
            <p className='font-poppins text-lg'>Out of Stock!</p>
          )}
        </div>
        <button
          type='button'
          className='ml-auto mr-4 flex h-10 items-center rounded bg-slate-100 px-6 py-2 shadow transition-colors  hover:bg-[#990808] hover:text-white'
          onClick={() => props.removeFromCart(props.item.cartid)}
        >
          <RiDeleteBin4Line />{' '}
        </button>
      </div>
    </>
  );
};

export default CartItem;
