import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { RxCross2 } from "react-icons/rx"
import { changeAuthentication } from "../../../slice/AuthSlice"
import { useDispatch } from "react-redux"
//TODO:Add Toast
export default function CategoryListing() {
  const [data, setData] = useState<any>([])
  const dispatch = useDispatch()
  useEffect(() => {
    getCategories().then((response) => setData(response.data.result))
  }, [])
  function getCategories() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/categories`)
  }
  function deleteCategory(id: string) {
    try {
      axios.delete(`${import.meta.env.VITE_BACKEND}/api/admin/categories`, {
        params: {
          id: id
        },
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      }).then(() => {
        getCategories().then((response) => setData(response.data.result))
      })
    } catch (error: any) {
      console.error(error)
      if (error.response.status === 401) {
        dispatch(changeAuthentication(false))
        Cookies.remove("token")
      }
    }
  }
  return (
    <>
      <section className="m-2">
        <h2 className="text-2xl">Categories</h2>
        {data.length > 0 ? data.map((obj: any) => {

          return (
            <div key={obj.id} className="mt-4 flex lg:w-60 justify-between">
              <p>{obj.name}</p>
              <button className="border px-2 py-1" onClick={() => deleteCategory(obj.id)}><RxCross2 /></button>
            </div>)
        }) : (<p className="flex items-center justify-center h-screen text-2xl">no Category is present</p>)}
      </section>
    </>
  )
}
