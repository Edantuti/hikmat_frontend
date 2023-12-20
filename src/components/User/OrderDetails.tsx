import axios from "axios";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { FaCheck, FaHourglass } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../slice/CartSlice";
import { changeAuthentication, setUserData } from "../../slice/AuthSlice";
const OrderDetails: FC = (): JSX.Element => {
  const user = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    retrieveOrders();
  }, []);
  function retrieveOrders() {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/orders`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        params: {
          userid: user.userid,
        },
      })
      .then((response) => {
        const orders = response.data.result;
        orders.sort((a: any, b: any) => {
          if (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime())
            return 1;
          else return -1;
        });
        setData(orders);
      })
      .catch((errors) => {
        if (errors.code === "ERR_BAD_REQUEST") {
          dispatch(setProducts([]));
          dispatch(changeAuthentication(false));
          dispatch(setUserData({}));
        }
      });
  }
  return (
    <>
      <section className="w-full lg:border rounded lg:m-2">
        <div className="overflow-visible">
          {!data.length && (
            <p className="h-96 md:text-2xl font-poppins flex mx-auto w-fit my-40">
              Didn't place any orders yet?
            </p>
          )}
          {data &&
            data.map((order: any) => <OrderItem key={order.id} {...order} />)}
        </div>
      </section>
    </>
  );
};

function OrderItem(props: any) {
  console.log(props)
  const [cancelled, setCancelled] = useState<boolean>(props.cancelled);
  async function cancelOrder(e: any) {
    e.currentTarget.checked = true;
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BACKEND}/api/orders/delivered`,
      { cancelled: true },
      {
        params: {
          id: props.id,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      },
    );
    if (data.status === "SUCCESS") {
      setCancelled(true);
    } else {
      console.error(data.error);
    }
  }

  return (
    <>
      <div key={props.id} className={`border-b-2 m-2 border-b-blue-400 p-2`}>
        <h2 className="text-gray-700 text-sm">
          Order info / <span className="text-xs">orderid: {props.id}</span>
        </h2>
        <hr className="w-full" />
        <div className="my-2">
          <p>Product Name: {props.Products[0].name}</p>
          <p>Quantity:{props.quantity}</p>
          <p>Date: {new Date(props.createdAt).toDateString()}</p>
          <p>Payment_id:{props.paymentId} </p>
          <p>DTDC: {props.dtdcid && !cancelled ? props.dtdcid : !cancelled ? "Yet to be set" : "Cancelled"} </p>
        </div>
        <h3 className="text-gray-700 text-sm">Address</h3>
        <hr className="w-full" />
        <div className="my-2">
          <p>Address: {props.address}</p>
          <p>City:{props.city}</p>
          <p>State:{props.state}</p>
          <p>PinCode:{props.pincode}</p>
        </div>
        <h3 className="text-sm text-gray-700">Status</h3>
        <hr className="w-full mb-2" />
        <div className="flex gap-2">
          {props.delivered && !cancelled ? (
            <span className="bg-green-400 flex items-center py-1 px-2 rounded-full w-fit text-sm gap-2 border">
              <FaCheck className="w-4 h-4" /> Delivered
            </span>
          ) : (
            !cancelled && (
              <span className="bg-slate-50 flex items-center py-1 px-2 rounded-full w-fit text-sm gap-2 border">
                {" "}
                <FaHourglass className="w-4 h-4" /> Not delivered
              </span>
            )
          )}
          {cancelled && !props.delivered ? (
            <span className="bg-red-400 flex items-center px-2 py-1 rounded-full w-fit text-sm gap-2 border">
              Cancelled
            </span>
          ) : (
            !props.delivered && (
              <button
                onClick={(e) => cancelOrder(e)}
                className="bg-white py-1 px-2 w-fit text-sm border rounded-full"
              >
                Cancel
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
