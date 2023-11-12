import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import CartItem from "../components/Cart/CartItem";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "react-modal"
import { setProducts } from "../slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import PageRedirect from "../components/Auth/PageRedirect";
import { changeAuthentication } from "../slice/AuthSlice";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";


const CartPage: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => {
    return state.cart.products;
  });
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [addressData, setAddressData] = useState<any>(undefined)
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  const user = useSelector((state: any) => state.auth.userData);
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false)
  const [changeAddress, setChangeAddress] = useState<boolean>(false)
  useEffect(() => {
    cartRetrieve();
    addressRetrieve();
  }, []);
  async function checkout() {
    if (cart.length == 0) return
    if (addressData === undefined) return
    try {
      let amount = 0;
      for (let i of cart) {
        const dealsDiscount = i.Deals.reduce((total: number, curr: any) => {
          return total + curr.discount
        }, 0)
        amount += i.cart_quantity * Math.floor(i.price - i.price * ((i.discount + dealsDiscount) / 100))
      }
      const { data: orders } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/checkout`, {
        "amount": (amount + Math.floor(amount * 0.02)) * 100,
        "currency": "INR",
      }, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })
      const options = {
        "key": import.meta.env.VITE_KEY,
        "amount": orders.amount,
        "currency": orders.currency,
        "name": "Hikmat",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orders.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function(response: any) {

          for (let i of cart) {
            const dealsDiscount = i.Deals.reduce((total: number, curr: any) => {
              return total + curr.discount
            }, 0)
            axios.post(`${import.meta.env.VITE_BACKEND}/api/orders`, {
              productId: i.id,
              quantity: i.cart_quantity,
              amount: Math.floor(i.price - i.price * ((i.discount + dealsDiscount) / 100)),
              address: addressData.address,
              city: addressData.city,
              pincode: addressData.pincode,
              state: addressData.state,
              payment_id: response.razorpay_payment_id,
              userId: user.userid
            }, {
              headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`
              }
            }).then(() => {
              dispatch(setProducts([]))
              totalDiscount(cart)
              totalPrice(cart)
              toast.success("Successfully placed your order.")
              axios.post(`${import.meta.env.VITE_BACKEND}/api/checkout/verify`, response).then(({ data }) => {
                navigate(data.url)
              });
            }).catch((error) => {
              console.error(error)
              toast.error("Your cannot be placed.")
            })

          }
        }
      }
      //@ts-ignore
      const razorpay = new Razorpay(options)

      razorpay.on('payment.failed', function(response: any) {
        console.error(response.error)
        toast.error("Something went wrong!")
      });
      razorpay.open();
    } catch (error) {
      console.error(error)
    }


  }
  function totalDiscount(data: any) {
    return data.reduce((total: number, current: any) => {
      const discount = current.Deals.reduce((sum: number, curr: any) => {
        return sum + curr.discount
      }, 0)
      return (
        total +
        current.cart_quantity * (current.price * ((current.discount + discount) / 100))
      );
    }, 0)
  }

  function totalPrice(data: any) {
    return data.reduce((total: any, current: any): number => {
      return total + current.cart_quantity * current.price;
    }, 0)
  }

  const addressRetrieve = async () => {
    try {
      console.log(user)
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/address`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        },
        params: {
          userid: user.userid
        }
      })
      setAddressData(data.result)
    } catch (error) {
      console.error(error)

    }
  }

  const cartRetrieve = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/cart/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      for (let i of data) {
        if (i.quantity === 0) {
          setIsOutOfStock(true)
          break;
        }
      }
      setDiscount(totalDiscount(data));
      setPrice(totalPrice(data));
      dispatch(setProducts(data));
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(changeAuthentication(false))
        Cookies.remove("token")
      }
    }
  };

  const removeCartItem = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND}/api/cart`, {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const index = cart.findIndex((item: any) => {
      if (item.cartid === id) return true;
    });

    const cartData = [...cart.slice(0, index), ...cart.slice(index + 1)];

    setDiscount(totalDiscount(cartData));
    setPrice(totalPrice(cartData));
    dispatch(setProducts(cartData));
    let counter = cart.length()
    for (let i of cart) {
      if (i.quantity != 0) {
        counter--;
      }
    }
    setIsOutOfStock(counter !== 0)
  };

  if (!auth) {
    return <PageRedirect />
  }
  return (
    <>
      <div className="flex lg:flex-row flex-col justify-between m-2 min-h-[80vh] max-h-full">
        <div className="w-full">
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
        <AddressModal modalState={modalOpen} setModalOpen={setModalOpen} setAddressData={setAddressData} address={addressData} setChangeAddress={setChangeAddress} />
        <section className="flex flex-col lg:w-96 w-full border lg:ml-2 lg:mt-0 mt-2 rounded lg:h-[46rem] h-80 relative bg-green-100">
          <div className="flex gap-1 ml-10 mt-16">
            <input type="checkbox" onChange={() => { setModalOpen(!modalOpen) }} checked={changeAddress} />
            <p onClick={() => { setModalOpen(!modalOpen) }}>Ship to a different address?</p>
          </div>
          <p className="w-fit ml-10 text-lg lg:mt-auto">
            <b>Subtotal:</b>
            {Math.floor(price)}
          </p>
          <p className="w-fit ml-10 text-lg">
            <b>discount:</b>
            {Math.floor(discount)}
          </p>
          <p className="w-fit ml-10 text-lg lg:mb-auto">
            <b>Grand total:</b>
            {price - Math.floor(discount)}
          </p>
          {isOutOfStock ? <div className="text-lg absolute bottom-0 h-20 items-center flex w-full bg-slate-100 py-2 px-6">Remove Out of Stock item(s)</div> :
            <button
              className="text-2xl absolute bottom-0 h-20 items-center flex w-full bg-slate-100 py-2 px-6 hover:text-white hover:bg-[#004449] transition-colors rounded-bl shadow font-poppins"
              onClick={() => checkout()}
            >
              <MdOutlineShoppingCartCheckout />
              Checkout
              <FaArrowRight />
            </button>}
        </section>

      </div>
      <ToastContainer theme="colored" />
    </>
  );
};

type AddressModalType = {
  modalState: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  setAddressData: Dispatch<SetStateAction<any>>,
  setChangeAddress: Dispatch<SetStateAction<boolean>>,
  address: any
}

type FormValues = {
  address: string,
  city: string,
  state: string,
  pincode: string
}

const AddressModal = (props: AddressModalType) => {
  const { register, setError, handleSubmit, formState: { errors } } = useForm<FormValues>(
    {
      reValidateMode: "onBlur"
    }
  )

  async function onSubmit(data: FormValues) {
    try {
      const { data: PincodeData } = await axios.get(`https://api.postalpincode.in/pincode/${data.pincode}`)
      if (PincodeData[0].Status !== "Success") {
        setError('pincode', { type: "custom", message: "Invalid Pincode" }, { shouldFocus: true })
        return;
      }
      props.setAddressData(data)
      props.setModalOpen(false)
      props.setChangeAddress(true)
    } catch (error) {
      console.error(error)
    }
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: 'translate(-50%,-50%)',
    }
  }

  const changeModal = () => {
    props.setModalOpen(!props.modalState)
    props.setChangeAddress(false)
  }
  return (
    <Modal style={customStyles} isOpen={props.modalState} onRequestClose={changeModal} contentLabel="Change Address" ariaHideApp={false}>
      <div className="flex justify-between">
        <h2>Address Details</h2>
        <button onClick={() => props.setModalOpen(!props.modalState)}>Close </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:w-96 gap-2">
        <p>Street:</p>
        <input className="inputField"
          type="text" placeholder="Address" {...register("address", { required: true })} />
        {errors.address?.type === "required" && <p className="text-red-900">Field Required</p>}
        <p>City:</p>
        <input className="inputField "
          type="search" placeholder="City" {...register("city", { required: true })} />
        {errors.city?.type === "required" && <p className="text-red-900">Field Required</p>}
        <p>State:</p>
        <select className="inputField"
          {...register("state", { required: true })}>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
        <p>Pincode:</p>
        <input className="inputField"
          type="number" placeholder="Pincode" {...register("pincode", { required: true })} />
        {errors.pincode?.type === "required" && <p className="text-red-900">Field Required</p>}
        <button type="submit" className="button" >Submit</button>
      </form>
    </Modal>)
}
export default CartPage;
