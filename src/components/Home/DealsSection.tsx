import axios from "axios"
import { FC, useEffect, useState } from "react"
import ProductCard from "../ProductList/ProductCard"
//TODO:Deal Section Product improvement
const DealsSection: FC = (): JSX.Element => {
  const [deals, setDeals] = useState<any>([])
  useEffect(() => {
    getDeals().then((response) => {
      setDeals(response.data.result.splice(0, 3))
    })
  }, [])
  async function getDeals() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/deals`)
  }
  function checkDealsExpiry(date: string) {
    return new Date(date) >= new Date()
  }
  return (
    <>
      <section className="2xl:flex w-[70%] mx-auto gap-20 py-20 font-poppins" id="deals">
        <div className="">
          <h2 className="sm:text-4xl text-2xl pb-10">Deals</h2>
          <p className="py-2 sm:text-md text-sm">Deals which are available right now!</p>
        </div>
        <div className="sm:flex sm:gap-10 sm:items-center gap-5 w-fit mx-auto space-y-5 sm:space-y-0">
          {deals.length > 0 && deals.map((obj: any) => (
            obj.Products.map((ob: any) => (
              checkDealsExpiry(obj.expiry_date) && <ProductCard product={ob} key={ob.id} />
            ))
          ))}
          {!deals.length && <p>No deals available right now</p>}
        </div>
      </section>
    </>
  )
}

export default DealsSection
