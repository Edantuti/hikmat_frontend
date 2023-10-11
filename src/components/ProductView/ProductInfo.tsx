import { FC, useEffect, useState } from "react"
import { BsShare } from "react-icons/bs"
import axios from "axios"
import { setProducts } from "../../slice/CartSlice"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { FaRupeeSign } from "react-icons/fa"
// import { useCookies } from "react-cookie"
import Cookies from "js-cookie"
import { changeAuthentication } from "../../slice/AuthSlice"
export type OfferType = {
  title: string,
  description: string
}

interface IProductInfo {
  id: string,
  name: string,
  price: number,
  rating: number,
  discount: number,
  brand: string,
  category: string,
  size: string,
  similar: any,
  Deals: any,
}


const ProductInfo: FC<IProductInfo> = (props): JSX.Element => {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.auth.userData)
  const location = useLocation();
  const cart = useSelector((state: any) => state.cart.products)
  useEffect(() => {
    getCart()
  }, [])
  useEffect(() => {
    setQuantity(cart.find((obj: any) => { return obj.id === props.id }) === undefined ? 1 : cart.find((obj: any) => { return obj.id === props.id }).cart_quantity)
  }, [props.id])

  function getCart() {
    axios.get(`${import.meta.env.VITE_BACKEND}/api/cart`, {
      headers: {
        "Authorization": `Bearer ${Cookies.get('token')}`
      }
    }).then((response) => {
      dispatch(setProducts(response.data))
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === props.id) {
          setQuantity(cart[i].cart_quantity)
        }
      }
    }).catch((error) => {
      if (error.status === 401) {
        dispatch(changeAuthentication(false))
        Cookies.remove("token")
      }
    })
  }
  const addCartToProduct = () => {
    axios.post(`${import.meta.env.VITE_BACKEND}/api/cart/`,
      {
        userId: userData.userid,
        productId: props.id,
        quantity: quantity

      },
      {
        params: {
          userid: userData.userid
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      }
    ).then(
      response => {
        dispatch(setProducts(response.data))
        return toast.success("Your order has been placed!")
      }
    ).catch(
      (error) => {
        console.error(error);
        if (error.response.status === 401) {
          dispatch(changeAuthentication(false))
          Cookies.remove("token")
          return toast.error("Please login again!")
        }
        return toast.error("There is an error!")
      }
    )
  }
  const pasteLinkClipboard = () => {
    if (location.pathname === "/admin") return toast.error("You cannot copy this link")
    navigator.clipboard.writeText(window.location.href)

    return toast.success("Link got copied to the clipboard")
  }
  return (
    <>
      <article className="m-2 lg:w-[53%] md:w-[50%] py-10 md:h-[50vh]">
        <div className="flex mt-10 items-center">
          <h2 className="lg:text-3xl text-2xl">{props.name}</h2>

          <span className="m-2 p-2 rounded-full border bg-slate-200 lg:ml-auto" onClick={() => pasteLinkClipboard()}><BsShare /></span>
        </div>
        <div className="my-2">
          <span className="text-sm text-gray-600 mr-2">brand: </span><span className="bg-slate-100 text-gray-600 px-3 py-1 rounded-full border text-xs">{props.brand}</span>
          <span className="text-sm text-gray-600 mx-2">category: </span><span className="bg-slate-100 text-gray-600 px-3 py-1 text-xs rounded-full border">{props.category}</span>
        </div>
        <hr />
        <div className="sm:flex ">
          <div className="p-2 my-2">
            <div className="my-5 flex flex-col gap-2">
              <div className="text-2xl flex items-center">
                <FaRupeeSign className="" />
                <p className="flex justify-between">
                  {props.price - Math.floor(props.price * ((props.discount + props.Deals.reduce((total: number, curr: any) => {
                    return total + curr.discount
                  }, 0)) / 100))}
                  {(props.discount + props.Deals.reduce((total: number, curr: any) => {
                    return total + curr.discount
                  }, 0)) > 0 && <del className="text-sm">{props.price}</del>}
                  {(props.discount + props.Deals.reduce((total: number, curr: any) => {
                    return total + curr.discount
                  }, 0)) > 0 && <span className="text-xs p-1 bg-green-200 rounded h-6">{(props.discount + props.Deals.reduce((total: number, curr: any) => {
                    return total + curr.discount
                  }, 0))}%off</span>}
                </p>
              </div>

              <span className="w-fit bg-green-300 px-2 rounded-full text-sm text-neutral-700">{props.rating} &#9733;</span>
            </div>
            <div className="flex my-5">
              <div className="flex text-lg items-center">
                <button className="py-1 px-4 border rounded-l-full font-bold text-md" onClick={() => setQuantity(quantity + 1)}>+</button>
                <p className="p-1 px-4 border-t border-b">{quantity}</p>
                <button className="py-1 px-4 border rounded-r-full font-bold text-md" onClick={() => setQuantity(quantity - 1 > 1 ? quantity - 1 : 1)}>-</button>
              </div>

            </div>
            <button className="py-1 px-4 text-sm font-bold font-poppins hover:bg-[#004449] hover:text-white bg-[#FAFAFA] shadow transition-colors rounded-full"
              onClick={() => addCartToProduct()}
            >Add to Cart</button>
          </div>
          <div className="m-2">
            <div className="m-2">
              <h1 className="p-1">Sizes:</h1>
              <div className="w-56 grid grid-cols-[repeat(3,5rem)] gap-2">
                <Link to={`/product/${props.id}`} className="bg-slate-300 text-sm w-fit border rounded px-4 py-1 text-slate-800">{props.size}</Link>
                {props.similar.map((product: any) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="bg-slate-100 text-sm w-fit border rounded px-4 py-1 text-slate-800">{product.size}</Link>
                ))}

              </div>
            </div>
          </div>
        </div>
        <ToastContainer theme="colored" />
      </article>
    </>
  )
}
export default ProductInfo
