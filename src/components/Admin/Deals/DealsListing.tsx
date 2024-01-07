import { RxCross1 } from "react-icons/rx";
import { deleteDealsByID } from "../../../hooks/deals";
import Cookies from "js-cookie"
import { changeAuthentication } from "../../../slice/AuthSlice";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { useFetch } from "../../../hooks/fetch";
//TODO:Add Toast
export default function DealsListing() {
  const { data: deals, setData: setDeals, isLoading } = useFetch<any[]>(`${import.meta.env.VITE_BACKEND}/api/deals`)
  const dispatch = useDispatch();
  function removeDeals(id: string) {
    if (deals)
      setDeals(deals.filter((item: any) => item.id !== id))
    deleteDealsByID(id).catch(
      (error: AxiosError) => {
        if (import.meta.env.DEV)
          console.error(error)
        if (error.response?.status === 401) {
          dispatch(changeAuthentication(false))
          Cookies.remove("token")
        }
      }
    )
  }
  if (isLoading) {
    return <h1 className="text-xl flex items-center justify-center">Loading Deals... </h1>
  }
  return (
    <>
      <section className="">
        <h2 className="ml-2 text-2xl">Deals</h2>
        <div className=" flex justify-center items-center">
          {deals && deals.length > 0 &&
            <table className="p-2 m-2 rounded-t overflow-hidden">
              <thead className="">
                <tr className="">
                  <td className="w-96 py-4 px-2">Image</td>
                  <td className="w-64 py-4">Deal Name</td>
                  <td className="w-64 py-4">Deals Discount</td>
                  <td className="w-64 py-4">Date of Expiry</td>
                  <td className="w-64 py-4 ">Remove</td>
                </tr>
              </thead>
              <tbody>
                {deals && deals.map((obj: any) => (
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
        {(!deals || deals.length == 0) && <p className="m-2" >No Deals registered yet.</p>}
      </section>
    </>
  )
}
