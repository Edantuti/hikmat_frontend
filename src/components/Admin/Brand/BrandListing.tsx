import axios from "axios"
import Cookies from "js-cookie"
import { RxCross2 } from "react-icons/rx"
import { useFetch } from "../../../hooks/fetch"

export default function BrandListing() {
  const { data, setData } = useFetch<any[]>(`${import.meta.env.VITE_BACKEND}/api/brands`)
  function deleteBrand(id: string) {
    try {
      axios.delete(`${import.meta.env.VITE_BACKEND}/api/admin/brands`, {
        params: {
          id: id
        },
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      }).then(() => {
        if (data)
          setData(data.filter((item: any) => item.id !== id))
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>

      <section className="md:grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-flow-dense m-2">
        <h2 className="text-2xl col-span-8 ">Brand</h2>
        {data ? data.map((obj: any) => {
          return (
            <div key={obj.id} className="mt-4 flex flex-col  w-60 h-60 justify-between border border-gray-300 rounded-md">
              <p className="flex justify-center items-center h-full text-xl">{obj.name}</p>
              <button className="border px-2 py-1 flex justify-center transition-colors hover:bg-red-400 hover:border-red-400" onClick={() => deleteBrand(obj.id)}><RxCross2 /></button>
            </div>)
        }) : (<p className="flex items-center justify-center h-screen text-2xl">no brand is present</p>)}
      </section>

    </>
  )
}
