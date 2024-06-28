import { Dispatch, SetStateAction, useState } from 'react';

import CartItem from '../components/Cart/CartItem';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { setProducts } from '../slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import PageRedirect from '../components/Auth/PageRedirect';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { totalDiscount, totalPrice, useFetchCart } from '../hooks/cart';
import { useFetch } from '../hooks/fetch';

const CartPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  const user = useSelector((state: any) => state.auth.userData);
  const { cart, discount, setDiscount, outOfStock, setOutOfStock } =
    useFetchCart(user.userid);
  const { data: addressData, setData: setAddressData } = useFetch<{
    address: string;
    city: string;
    state: string;
    pincode: string;
  }>(`${import.meta.env.VITE_BACKEND}/api/address`, { userid: user.userid });
  const [changeAddress, setChangeAddress] = useState<boolean>(false);
  async function checkout() {
    if (cart.length == 0) return;
    if (addressData === undefined) return;
    try {
      let amount = cart.reduce(
        (sum: number, curr: any, index: number) =>
          sum +
          curr.cart_quantity *
            Math.floor(curr.price - curr.price * (discount[index] / 100)),
        0
      );
      const { data: orders } = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/checkout`,
        {
          amount: (amount + Math.floor(amount * 0.02)) * 100,
          currency: 'INR',
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      //TODO:EDIT AFTER LAUNCHING
      const options = {
        key: import.meta.env.VITE_KEY,
        amount: orders.amount,
        currency: orders.currency,
        name: 'Hikmat',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: orders.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response: any) {
          for (let i of cart) {
            const dealsDiscount = i.Deals.reduce((total: number, curr: any) => {
              return total + curr.discount;
            }, 0);
            axios
              .post(
                `${import.meta.env.VITE_BACKEND}/api/orders`,
                {
                  productId: i.id,
                  quantity: i.cart_quantity,
                  amount: Math.floor(
                    i.price - i.price * ((i.discount + dealsDiscount) / 100)
                  ),
                  address: addressData.address,
                  city: addressData.city,
                  pincode: addressData.pincode,
                  state: addressData.state,
                  payment_id: response.razorpay_payment_id,
                  userId: user.userid,
                },
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                  },
                }
              )
              .then(() => {
                dispatch(setProducts([]));
                toast.success('Successfully placed your order.');
              })
              .catch((error) => {
                console.error(error);
                toast.error('Your cannot be placed.');
              });
          }
          axios
            .post(
              `${import.meta.env.VITE_BACKEND}/api/checkout/verify`,
              response
            )
            .then(({ data }) => {
              navigate(data.url);
            });
        },
      };
      //@ts-ignore
      const razorpay = new Razorpay(options);

      razorpay.on('payment.failed', function (response: any) {
        console.error(response.error);
        toast.error('Something went wrong!');
      });
      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  }

  const removeCartItem = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND}/api/cart`, {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const cartData = cart.filter((item: any) => item.cartid !== id);

    setDiscount(totalDiscount(cartData));
    dispatch(setProducts(cartData));

    let item = cart.findIndex((item: any) => item.quantity === 0);
    setOutOfStock(item !== undefined);
  };

  if (!auth) {
    return <PageRedirect />;
  }
  return (
    <>
      <div className='m-2 flex max-h-full min-h-[80vh] flex-col justify-between lg:flex-row'>
        <div className='w-full'>
          {cart.length ? (
            cart.map((item: any, index: number) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                length={cart.length}
                removeFromCart={removeCartItem}
              />
            ))
          ) : (
            <p>You haven't placed anything in the cart yet</p>
          )}
        </div>
        <AddressModal
          modalState={modalOpen}
          setModalOpen={setModalOpen}
          setAddressData={setAddressData}
          address={addressData}
          setChangeAddress={setChangeAddress}
        />
        <section className='relative mt-2 flex h-80 w-full flex-col rounded border bg-green-100 lg:ml-2 lg:mt-0 lg:h-[46rem] lg:w-96'>
          <div className='ml-10 mt-16 flex gap-1'>
            <input
              type='checkbox'
              onChange={() => {
                setModalOpen(!modalOpen);
              }}
              checked={changeAddress}
            />
            <p
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              Ship to a different address?
            </p>
            <p>You can change your default address from the profile.</p>
          </div>
          <p className='ml-10 w-fit text-lg lg:mt-auto'>
            <b>Subtotal:</b>

            {Math.floor(totalPrice(cart))}
          </p>
          <p className='ml-10 w-fit text-lg'>
            <b>discount:</b>
            {Math.floor(
              cart.reduce(
                (sum: number, curr: any, index: number) =>
                  sum +
                  curr.cart_quantity * ((curr.price * discount[index]) / 100),
                0
              )
            )}
          </p>
          <p className='ml-10 w-fit text-lg lg:mb-auto'>
            <b>Grand total:</b>
            {Math.floor(totalPrice(cart)) -
              Math.floor(
                cart.reduce(
                  (sum: number, curr: any, index: number) =>
                    sum +
                    curr.cart_quantity * ((curr.price * discount[index]) / 100),
                  0
                )
              )}
          </p>
          {outOfStock ? (
            <div className='absolute bottom-0 flex h-20 w-full items-center bg-slate-100 px-6 py-2 text-lg'>
              Remove Out of Stock item(s)
            </div>
          ) : (
            <button
              className='absolute bottom-0 flex h-20 w-full items-center rounded-bl bg-slate-100 px-6 py-2 font-poppins text-2xl shadow transition-colors hover:bg-[#004449] hover:text-white'
              onClick={() => checkout()}
            >
              <MdOutlineShoppingCartCheckout />
              Checkout
              <FaArrowRight />
            </button>
          )}
        </section>
      </div>
      <ToastContainer theme='colored' />
    </>
  );
};

type AddressModalType = {
  modalState: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setAddressData: Dispatch<SetStateAction<any>>;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  address: any;
};

type Address = {
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const AddressModal = (props: AddressModalType) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({
    reValidateMode: 'onBlur',
  });

  async function onSubmit(data: Address) {
    try {
      const { data: PincodeData } = await axios.get(
        `https://api.postalpincode.in/pincode/${data.pincode}`
      );
      if (PincodeData[0].Status !== 'Success') {
        setError(
          'pincode',
          { type: 'custom', message: 'Invalid Pincode' },
          { shouldFocus: true }
        );
        return;
      }
      props.setAddressData(data);
      props.setModalOpen(false);
      props.setChangeAddress(true);
    } catch (error) {
      console.error(error);
    }
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%,-50%)',
    },
  };

  const changeModal = () => {
    props.setModalOpen(!props.modalState);
    props.setChangeAddress(false);
  };
  return (
    <Modal
      style={customStyles}
      isOpen={props.modalState}
      onRequestClose={changeModal}
      contentLabel='Change Address'
      ariaHideApp={false}
    >
      <div className='flex justify-between'>
        <h2>Address Details</h2>
        <button onClick={() => props.setModalOpen(!props.modalState)}>
          Close{' '}
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 md:w-96'
      >
        <p>Street:</p>
        <input
          className='inputField'
          type='text'
          placeholder='Address'
          {...register('address', { required: true })}
        />
        {errors.address?.type === 'required' && (
          <p className='text-red-900'>Field Required</p>
        )}
        <p>City:</p>
        <input
          className='inputField '
          type='search'
          placeholder='City'
          {...register('city', { required: true })}
        />
        {errors.city?.type === 'required' && (
          <p className='text-red-900'>Field Required</p>
        )}
        <p>State:</p>
        <select
          className='inputField'
          {...register('state', { required: true })}
        >
          <option value='Andhra Pradesh'>Andhra Pradesh</option>
          <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
          <option value='Assam'>Assam</option>
          <option value='Bihar'>Bihar</option>
          <option value='Chhattisgarh'>Chhattisgarh</option>
          <option value='Goa'>Goa</option>
          <option value='Gujarat'>Gujarat</option>
          <option value='Haryana'>Haryana</option>
          <option value='Himachal Pradesh'>Himachal Pradesh</option>
          <option value='Jharkhand'>Jharkhand</option>
          <option value='Karnataka'>Karnataka</option>
          <option value='Kerala'>Kerala</option>
          <option value='Madhya Pradesh'>Madhya Pradesh</option>
          <option value='Maharashtra'>Maharashtra</option>
          <option value='Manipur'>Manipur</option>
          <option value='Meghalaya'>Meghalaya</option>
          <option value='Mizoram'>Mizoram</option>
          <option value='Nagaland'>Nagaland</option>
          <option value='Odisha'>Odisha</option>
          <option value='Punjab'>Punjab</option>
          <option value='Rajasthan'>Rajasthan</option>
          <option value='Sikkim'>Sikkim</option>
          <option value='Tamil Nadu'>Tamil Nadu</option>
          <option value='Telangana'>Telangana</option>
          <option value='Tripura'>Tripura</option>
          <option value='Uttar Pradesh'>Uttar Pradesh</option>
          <option value='Uttarakhand'>Uttarakhand</option>
          <option value='West Bengal'>West Bengal</option>
        </select>
        <p>Pincode:</p>
        <input
          className='inputField'
          type='number'
          placeholder='Pincode'
          {...register('pincode', { required: true })}
        />
        {errors.pincode?.type === 'required' && (
          <p className='text-red-900'>Field Required</p>
        )}
        <button type='submit' className='button'>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default CartPage;
