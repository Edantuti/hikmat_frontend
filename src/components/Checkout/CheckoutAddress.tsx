import axios from 'axios';
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import CheckoutInfo from './CheckoutInfo';
import Cookies from 'js-cookie';
import { setProducts } from '../../slice/CartSlice';
import { MdPayments } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import.meta.env
type FormValues = {
  address: string,
  city: string,
  pincode: number,
  state: string,
  country: string,
}

const CheckoutAddress: FC<{ data: any }> = (props: any): JSX.Element => {
  const loader = useLoaderData() as any;
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userData)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>(
    {

      reValidateMode: "onBlur"
    }
  )
  const onSubmit = (data: any) => {
    for (let i of loader) {
      const dealsDiscount = i.Deals.reduce((total: number, curr: any) => {
        return total + curr.discount
      }, 0)
      console.log(dealsDiscount)
      axios.post(`${import.meta.env.VITE_BACKEND}/api/orders`, {
        productId: i.id,
        quantity: i.cart_quantity,
        amount: Math.floor(i.price - i.price * ((i.discount + dealsDiscount) / 100)),
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        state: data.state,
        userId: userData.userid
      }, {
        headers: {
          "Authorization": `Bearer ${Cookies.get('token')}`
        }
      }).then(() => {
        dispatch(setProducts([]))
        toast.success("Successfully placed your order.")
      }).catch((error) => {
        console.error(error)
        toast.error("Your cannot be placed.")
      })
    }

  }
  return (
    <>
      <section className="md:h-auto grid items-center m-2 p-2" >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:w-96 gap-5">

          <input className="border-b border-blue-300 active:border-b-2 focus:border-b-2 focus:outline-none p-2"
            type="text" placeholder="Address" {...register("address", { required: true })} />
          {errors.address?.type === "required" && <p className="text-red-900">Field Required</p>}
          <input className="border-b border-blue-300 active:border-b-2 focus:border-b-2 focus:outline-none p-2"
            type="search" placeholder="City" {...register("city", { required: true })} />
          {errors.city?.type === "required" && <p className="text-red-900">Field Required</p>}
          <select className="border-b border-blue-300 active:border-b-2 focus:border-b-2 focus:outline-none bg-white p-2"
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

          <input className="border-b border-blue-300 active:border-b-2 focus:border-b-2 focus:outline-none p-2"
            type="number" placeholder="Pincode" {...register("pincode", { required: true })} />
          {errors.pincode?.type === "required" && <p className="text-red-900">Field Required</p>}
          <button type="submit" className="outline outline-1 rounded-full hover:outline-none hover:bg-blue-300 hover:shadow transition-colors font-poppins text-lg py-2 px-4 outline-blue-300 focus:outline-none focus:bg-blue-300 flex items-center justify-center" ><MdPayments /> Pay</button>
        </form>
        <CheckoutInfo data={props.data} />
        <ToastContainer theme="colored" position="top-right" />
      </section>
    </>
  )
}

export default CheckoutAddress
