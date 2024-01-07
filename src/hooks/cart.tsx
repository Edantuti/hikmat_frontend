import axios from "axios";
import Cookies from "js-cookie"
import React from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../slice/CartSlice";
import { useSelector } from "react-redux";

function totalDiscount(data: any) {
  return data.map((current: any) => {
    return current.discount + current.Deals.reduce((sum: number, curr: any) => {
      return sum + curr.discount
    }, 0)
  })
}
function totalPrice(data: any) {
  return data.reduce((sum: number, curr: any) => sum + (curr.cart_quantity * curr.price), 0)
}

const useFetchCart = (userid: string) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => {
    return state.cart.products;
  });
  const [outOfStock, setOutOfStock] = React.useState<boolean>(false)
  const [discount, setDiscount] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/api/cart`, {
      params: {
        userid: userid
      },
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then(({ data }) => {
      setIsLoading(false)
      let item = data.find((item: any) => item.quantity === 0)
      setOutOfStock(item !== undefined)
      dispatch(setProducts(data))
      setDiscount(totalDiscount(data))
    })
  }, [])
  return { cart, discount, setDiscount, outOfStock, setOutOfStock, isLoading }
}


export {
  useFetchCart,
  totalDiscount,
  totalPrice
}
