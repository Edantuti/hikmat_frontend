import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
//TODO:Add Toast
type FormValues = {
  name: string,
  discount: number,
  productId: string,
  date: any,
}
export default function DealsAdding() {
  const { register, handleSubmit } = useForm<FormValues>({
    reValidateMode: "onBlur"
  })
  const [url] = useState<string>("http://localhost:5000")
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    getProducts().then((response) => setProducts(response.data.result.rows))
  }, [])
  async function getProducts() {
    return axios.get("http://localhost:5000/api/products", {
      params: {
        limit: 10000
      }
    })
  }
  function onSubmit(data: FormValues) {
    axios.post(`${url}/api/deals`, { name: data.name, discount: data.discount, productId: data.productId, expiry_date: data.date }, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }).then(() => {
      toast.success("Your deal has been added.")
    }).catch((error) => {
      console.error(error)
      toast.error("Error in submission")
    })
  }
  return (
    <>
      <section className="flex items-center justify-center h-[80vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-96 gap-2 mx-auto">
          <h2 className="text-2xl text-center font-poppins">Adding Deals</h2>
          <p>Name:</p>
          <input type="text" className="inputField" {...register('name', { required: true })} />
          <p>Product:</p>
          <select className="inputField" {...register("productId", { required: true })}>
            {products.map((obj: any) => (<option key={obj.id} value={obj.id}>{obj.name}</option>))}
          </select>
          <p>Discount:</p>
          <input type="number" className="inputField" {...register('discount', { required: true, min: 0, max: 100 })} />
          <p>Deal Validity: </p>
          <input type="date" className="inputField " {...register('date', { valueAsDate: true, required: true })} />
          <input type="submit" className="button" />
        </form>
        <ToastContainer theme="colored" />
      </section >
    </>
  )
}

