import { useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { changeAuthentication } from '../../../slice/AuthSlice'
import { useFetch } from '../../../hooks/fetch'
//TODO:Add Toast
const OrderListing = () => {
  const { data } = useFetch<any[]>(`${import.meta.env.VITE_BACKEND}/api/orders/all`)

  return (
    <>
      <section className="m-2">
        <h1 className="m-2 underline text-xl">Orders:</h1>
        {data && data.map((order: any) => (
          <OrderComponent key={order.id} {...order} />
        ))}
      </section>
    </>
  )
}


function OrderComponent(props: any) {
  const [deliverStatus, setDeliverStatus] = useState<boolean>(props.delivered)
  const [dtdc, setDTDC] = useState<string>(props.dtdcid)
  const dispatch = useDispatch()
  async function changeDeliveredStatus(id: string) {
    const { data } = await axios.patch(`${import.meta.env.VITE_BACKEND}/api/orders/delivered`, { delivered: !deliverStatus }, {
      params: {
        id: id
      },
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`
      }
    })
    if (data.status === "SUCCESS")
      setDeliverStatus(!deliverStatus)

  }
  function changeDTDC(e: any) {
    setDTDC(e.target.value)
  }
  function submitDTDC(id: string) {
    axios.patch(`${import.meta.env.VITE_BACKEND}/api/orders/`, { dtdcid: dtdc }, {
      params: {
        id: id
      },
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`
      }
    }).catch((error) => {
      console.error(error)
      if (error.response.status === 401) {
        dispatch(changeAuthentication(false))
        Cookies.remove("token")
      }
    })
  }
  return (
    <div key={props.id} className={`h-full border my-2 mx-1 p-2 rounded xl:grid grid-cols-[16%_16%_16%_16%_16%_16%] ${props.cancelled && "bg-red-200 "} ${deliverStatus && "bg-green-400"}`}>

      <h1 className="col-span-6">Order id: {props.id}</h1>
      <div className="p-2">
        <p>Product Name: {props.Products[0].name}</p>
        <p>Quantity: {props.quantity}</p>
        <p className="flex items-center my-2"> Price: <FaRupeeSign />{props.amount}</p>
      </div>
      <div className="p-2">
        <p>Contact details</p>
        <p>First Name:{props.User.firstName}</p>
        <p>Email: {props.User.email}</p>
        <p>Mobile: {props.User.phone}</p>
      </div>


      <div className="p-2">
        <p>Address</p>
        <p>{props.address}</p>
        <p>City:{props.city}</p>
        <p>Pincode:{props.pincode}</p>
        <p>State:{props.state}</p>
      </div>
      <div className="">
        <h2>Status:</h2>
        <div>Payment: {props.paymentId}</div>
        <div>Delivered: <input type="checkbox" checked={deliverStatus} disabled={props.cancelled} onChange={() => changeDeliveredStatus(props.id)} /></div>
        <div>Cancelled: <input type="checkbox" defaultChecked={props.cancelled} disabled /></div>
      </div>
      <div className="">
        <h2>DTDC ID:</h2>
        <input type="text" className="inputField w-44" placeholder={dtdc ? dtdc : "Enter the dtdcid"} onChange={(e) => changeDTDC(e)} disabled={props.cancelled} />
        <button type="button" onClick={() => submitDTDC(props.id)} className="bg-white px-2 py-1 mt-1 rounded border hover:bg-gray-200 transition-colors" disabled={props.cancelled}>Submit</button>
      </div>
      <p className="col-span-1">Order placed on: {new Date(props.createdAt).toDateString()}</p>

    </div>
  )
}

export default OrderListing
