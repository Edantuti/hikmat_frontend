import { FC, useEffect } from "react";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutItem from "../components/Checkout/CheckoutItem";

const CheckoutPage: FC = (): JSX.Element => {
  const data = useLoaderData() as any;
  useEffect(() => {
    checkData();
  }, [data]);
  const checkData = () => {
    return data.length;
  };
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  //TODO:Redesigning this page
  //TODO:Add Toast
  return (
    <>
      {auth ? (
        <div className="lg:grid xl:grid-cols-[40vw_56vw] xl:grid-rows-[10vh_60vh] lg:grid-rows-[5vh_60vh] lg:grid-cols-[50vw_50vw] md:h-[80vh]">
          <h1 className="col-span-2 p-2 md:text-4xl sm:text-2xl">
            Checkout Page
          </h1>

          <CheckoutAddress data={data} />
          <div className="lg:w-full w-fit my-2 mx-auto">
            <h2 className="text-xl mx-2 py-2 border-b-4 border-b-blue-300 w-fit my-4 ">
              Cart items
            </h2>
            <div className="overflow-auto h-96">
              {data.map((cart: any) => (
                <CheckoutItem key={cart.id} {...cart} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Your are not authorized to this page, please login to access it</p>
      )}
    </>
  );
};

export default CheckoutPage;
