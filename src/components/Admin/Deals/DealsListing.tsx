import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { RxCross1 } from "react-icons/rx";
import { changeAuthentication } from "../../../slice/AuthSlice";
import { useDispatch } from "react-redux";
//TODO:Add Toast
export default function DealsListing() {
  const [data, setData] = useState<any[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getDeals().then((response) => {
      setData(response.data.result)
    })
  }, [])
  async function getDeals() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/deals`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get("token")}`
      }
    })
  }
  async function removeDeals(id: string) {
    try {
      setData(data.filter((item: any) => item.id !== id))
      await axios.delete(`${import.meta.env.VITE_BACKEND}/api/deals`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get("token")}`
        },
        params: {
          id: id
        }
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
      <section className="">
        <h2 className="ml-2 text-2xl">Deals</h2>
        <div className=" flex justify-center items-center">
          {data.length > 0 &&
            <table className="p-2 m-2 rounded-t overflow-hidden">
              <thead className="bg-gray-300">
                <tr className="border">
                  <td className="w-96 py-4 px-2">Image</td>
                  <td className="w-64 py-4">Deal Name</td>
                  <td className="w-64 py-4">Deals Discount</td>
                  <td className="w-64 py-4">Date of Expiry</td>
                  <td className="w-64 py-4 ">Remove</td>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((obj: any) => (
                  obj && <tr key={obj.id} className="border" >
                    <td>{obj.image !== undefined && <img src={obj.image || ""} alt="Product Image" className="w-48 aspect-auto" />}</td>
                    <td><p>{obj.name}</p></td>
                    <td><p>{obj.discount} </p></td>
                    <td><p>{obj.expiry_date} </p></td>
                    <td ><button className="button hover:bg-red-500" onClick={() => removeDeals(obj.id)}><RxCross1 /></button></td>
                  </tr>))
                }</tbody>

            </table>}
        </div>
        {!data.length && <p className="m-2" >No Deals registered yet.</p>}
      </section>
    </>
  )
}
