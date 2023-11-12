import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import Cookies from 'js-cookie'
import { useFieldArray, useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

type FormValues = {
  name: string,
  discount: number,
  productIds: any,
  date: any,
}
export default function DealsAdding() {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: { productIds: [] },
    reValidateMode: "onBlur"
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productIds"
  })
  const [error, setError] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [file, changeFile] = useState<File>();
  const [fileUrl, changeFileUrl] = useState<string>("https://dummyimage.com/384x256");
  useEffect(() => {
    getProducts().then((response) => setProducts(response.data.result.rows))
  }, [])
  async function getProducts() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/products`, {
      params: {
        limit: 10000
      }
    })
  }
  const fileChanger = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    changeFile(event.target.files[0]);
    changeFileUrl(URL.createObjectURL(event.target.files[0]));
  };
  async function onSubmit(data: FormValues) {
    setError(false)
    if (file === undefined) return setError(true);
    const formdata = new FormData()
    formdata.append("name", data.name)
    formdata.append("discount", data.discount.toString())
    formdata.append("productIds", JSON.stringify(data.productIds))
    formdata.append("expiry_date", data.date)
    if (file)
      formdata.append("profile_url", new Blob([await file.arrayBuffer()], { type: file.type }))
    axios.post(`${import.meta.env.VITE_BACKEND}/api/deals`, formdata, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }).then(() => {
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
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 absolute z-10 h-64 w-96 "
              onChange={(e) => fileChanger(e)}
            />
            <img
              src={fileUrl}
              alt=""
              className="bg-gray-100 h-64 mx-auto p-2"
            />
            <p className="text-center font-poppins text-sm py-4">
              Click here to change Image
            </p>
          </div>
          {error && <p className="text-red-300">Enter the photo first</p>}
          <p>Name:</p>
          <input type="text" className="inputField" {...register('name', { required: true })} />
          <p>Products:</p>
          {fields.length === 0 && <p> No products added</p>}
          {fields.map((field, id) => (<div key={field.id} className="flex gap-2">
            <select className="inputField w-96" {...register(`productIds.${id}`, { required: true })}>
              {products.map((obj: any) => (<option key={obj.id} value={obj.id}>{obj.name}</option>))}
            </select>
            <button onClick={() => remove(id)} className="button"><RxCross2 /></button>
          </div>
          ))}
          <button type="button" onClick={() => append(undefined)} className="button">Add Products </button>
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

          // {fields.map((field, id) =>(<div key={field.id} className="flex gap-2">
          //       <select className="inputField" {...register(`productIds.${id}`, { required: true })}>
          //         {products.map((obj: any) => (<option key={obj.id} value={obj.id}>{obj.name}</option>))}
          //       </select>
          //       <button onClick={()=>remove(id)} className="button"><RxCross2 /></button>
          //     <div>)
          // )}
