import { FC, useEffect, useState } from "react";

import CartItem from "../components/Cart/CartItem";
import axios from "axios";
import Cookies from "js-cookie";
import { setProducts } from "../slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import PageRedirect from "../components/Auth/PageRedirect";
import { changeAuthentication } from "../slice/AuthSlice";


const CartPage: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => {
    return state.cart.products;
  });
  useEffect(() => {
    cartRetrieve();
  }, []);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const auth = useSelector((state: any) => state.auth.authenticated.value);

  const cartRetrieve = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/cart/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setDiscount(
        data.reduce((total: number, current: any) => {
          const discount = current.Deals.reduce((sum: number, curr: any) => {
            return sum + curr.discount
          }, 0)
          return (
            total +
            current.cart_quantity * (current.price * ((current.discount + discount) / 100))
          );
        }, 0),
      );
      setPrice(
        data.reduce((total: any, current: any): number => {
          console.log(current.price * current.cart_quantity)
          return total + current.cart_quantity * current.price;
        }, 0),
      );
      dispatch(setProducts(data));
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(changeAuthentication(false))
        Cookies.remove("token")
      }
    }
  };
  const removeCartItem = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND}/api/cart`, {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const index = cart.findIndex((item: any) => {
      if (item.cartid === id) return true;
    });

    const cartData = [...cart.slice(0, index), ...cart.slice(index + 1)];

    setDiscount(
      cartData.reduce((total: number, current: any) => {
        const discount = current.Deals.reduce((sum: number, curr: any) => {
          return sum + curr.discount
        }, 0)
        return (
          total +
          current.cart_quantity * (current.price * (current.discount + discount / 100))
        );
      }, 0),
    );
    setPrice(
      cartData.reduce((total: any, current: any): number => {
        return total + current.cart_quantity * current.price;
      }, 0),
    );
    dispatch(setProducts(cartData));
  };
  return (
    <>
      {auth ? (
        <div className="flex lg:flex-row flex-col justify-between m-2 min-h-[80vh] max-h-full">
          <div className="w-full">
            {cart.length ? (
              cart.map((item: any, index: number) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  length={cart.length}
                  removeFromCart={removeCartItem}
                />
              ))
            ) : (
              <p>You haven't placed anything in the cart yet</p>
            )}
          </div>

          <section className="flex flex-col lg:w-96 w-full border lg:ml-2 lg:mt-0 mt-2 rounded lg:h-[46rem] h-80 relative bg-green-100">
            <p className="w-fit ml-10 text-lg lg:mt-auto mt-20">
              <b>Subtotal:</b>
              {Math.floor(price)}
            </p>
            <p className="w-fit ml-10 text-lg">
              <b>discount:</b>
              {Math.floor(discount)}
            </p>
            <p className="w-fit ml-10 text-lg lg:mb-auto mb-20">
              <b>Grand total:</b>
              {price - Math.floor(discount)}
            </p>
            <Link
              to="/checkout"
              className="text-2xl absolute bottom-0 h-20 items-center flex w-full bg-slate-100 py-2 px-6 hover:text-white hover:bg-[#004449] transition-colors rounded-bl shadow font-poppins"
            >
              <MdOutlineShoppingCartCheckout />
              Checkout
              <FaArrowRight />
            </Link>
          </section>
        </div>
      ) : (
        <PageRedirect />
      )}
    </>
  );
};

export default CartPage;
