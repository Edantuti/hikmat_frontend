import { useEffect, useState } from "react";
import ProductReviewForm from "./ProductReviewForm";
import { useSelector } from "react-redux";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function ProductReview(props: {
  productid: string;
  reviews: any[];
}): JSX.Element {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setData(props.reviews)
  }, [props.reviews])
  const [count, setCount] = useState<number>(3);
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  function increaseReview() {
    setCount(count + 3);
  }
  return (
    <>
      <div className="m-2">
        <h3 className="text-xl underline">Reviews:</h3>
        <hr className="my-2" />
        {data.length ? (
          <section className="p-2 md:max-w-[40%]">
            <p className="text-2xl ml-0 m-2 font-poppins font-bold">
              Total Reviews:{data.count}
            </p>
            {data.map((obj: any, index: number) => {
              return <ReviewComponent {...obj} key={obj.id || index} />;
            })}
            {data.length > count && (
              <button
                type="button"
                className="button"
                onClick={() => increaseReview()}
              >
                {" "}
                get more reviews
              </button>
            )}
            {auth ? (
              <ProductReviewForm
                productid={props.productid}
                data={data}
              />
            ) : (
              <p>You have to login first.</p>
            )}
          </section>
        ) : (
          <section className=" rounded p-2 md:max-w-[40%]">
            {auth ? (
              <p>Be first person to review this product</p>
            ) : (
              <p>You have to login first.</p>
            )}
            {auth && (
              <ProductReviewForm
                productid={props.productid}
                data={data}
              />
            )}
          </section>
        )}
      </div>
    </>
  );
}

function ReviewComponent(props: any): JSX.Element {
  const [starValues] = useState<boolean[]>(
    [false, false, false, false, false].map((value: boolean, index: number) => {
      value;
      if (props.rating - 1 < index) return false;
      else return true;
    }),
  );

  return (
    <>
      <div key={props.id} className="rounded  space-y-2 p-2 ml-0 m-2">
        <div className="flex items-center gap-2">
          <img
            src={props.User.profile_url}
            alt="user_profile"
            className="rounded-full  w-10"
          />
          <p>{props.User.firstName + props.User.lastName}</p>
        </div>
        <p className="text-sm">Review:</p>
        <p className=" p-2 rounded">Description: {props.description}</p>
        <p className="p-2 flex items-center">
          Rating:{" "}
          {starValues.map((starStatus: boolean, index: number) => {
            return starStatus ? (
              <FaStar key={index} />
            ) : (
              <FaRegStar key={index} />
            );
          })}
        </p>
      </div>
    </>
  );
}
