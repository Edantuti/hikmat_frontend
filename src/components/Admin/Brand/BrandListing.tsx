import axios from "axios"
import { useEffect, useState } from "react"
// import { useCookies } from "react-cookie"
import Cookies from "js-cookie"
import { RxCross2 } from "react-icons/rx"

export default function BrandListing() {
  const [data, setData] = useState<any>([])
  // const [cookies] = useCookies(['token'])
  useEffect(() => {
    getBrands().then((response) => setData(response.data.result))
  }, [])
  function getBrands() {
    return axios.get("http://localhost:5000/api/brands")
  }
  function deleteBrand(id: string) {
    try {
      axios.delete("http://localhost:5000/api/admin/brands", {
        params: {
          id: id
        },
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      }).then(() => {
        getBrands().then((response) => setData(response.data.result))
      })
    } catch (error) {
      console.error(error)
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
              <button className="border px-2 py-1 rounded" onClick={() => deleteBrand(obj.id)}><RxCross2 /></button>
            </div>)
        }) : (<p className="flex items-center justify-center h-screen text-2xl">no brand is present</p>)}
      </section>

    </>
  )
}
