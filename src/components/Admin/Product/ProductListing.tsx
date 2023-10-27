import axios from 'axios'
import { FC, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import Cookies from "js-cookie"
import { Link, useLoaderData } from 'react-router-dom'
import { changeAuthentication } from '../../../slice/AuthSlice'
const ProductListing: FC = () => {
  const data = useLoaderData() as any
  const [rows, setRows] = useState<any[]>(data.rows)
  const dispatch = useDispatch()
  async function removeProduct(id: string) {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/api/products`, {
        params: {
          id: id,
        },
        headers: {
          'Authorization': `Bearer ${Cookies.get("token")}`
        }
      })
      if (rows.length > 1)
        setRows([...rows.splice(0, rows.findIndex((row: any) => {
          return row.id === id
        })), ...rows.splice(rows.findIndex((row: any) => {
          return row.id === id
        }) + 1)])
      else
        setRows([])
    } catch (error: any) {
      console.error(error)
      if (error.response.status === 401) {
        dispatch(changeAuthentication(false))
        Cookies.remove("token")
      }
    }
  }
  console.log(rows)
  return (
    <>
      <h1 className="font-poppins md:text-3xl sm:text-lg m-2">Products</h1>
      {
        rows.map((row: any) => (
          <div className="border rounded h-full p-2 m-2 md:flex gap-2" key={row.id}>
            <Link to={`/admin/product/edit/${row.id}`} ><img src={row.photos[0]} alt="Product photo" className="w-64 rounded" /> </Link>
            <Link className="w-full" to={`/admin/product/edit/${row.id}`} >


              <h2 className="text-xl">Product Name:{row.name}</h2>
              <p>Quantity Left:{row.quantity}</p>
              <p>Brand:{row.brand}</p>
              <p>Category:{row.category}</p>
              <p>Price:{row.price}</p>

            </Link>

            <button className="flex items-center justify-center button h-10 my-auto " onClick={() => removeProduct(row.id)}><RxCross1 /></button>
          </div>
        ))
      }
    </>
  )
}

export default ProductListing
