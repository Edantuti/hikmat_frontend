import { FC, useEffect, useState } from "react";
import { FaRupeeSign, FaStar } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi"
import { SiBrandfolder } from "react-icons/si"
import { Link } from "react-router-dom";
import { ProductType } from "./Product.d";
import { AiOutlineTag } from "react-icons/ai";

interface IProductProps {
  product: ProductType;
}

const ProductCard: FC<IProductProps> = ({ product }): JSX.Element => {
  const [discount, setDiscount] = useState<number>(product.discount)
  useEffect(() => {
    discountSummation()
  }, [])
  function discountSummation() {
    setDiscount(discount + product.Deals.reduce((total: number, curr: any) => {
      return total + curr.discount
    }, 0))
  }
  return (
    <>
      <div className="w-72 m-5 rounded h-[48vh] border relative">
        <div className="h-48 w-72 aspect-square rounded-t p-1 flex justify-center">
          <img loading="lazy" src={product.photos[0] + "?type=low"} alt={product.name} className="rounded-t aspect-square overflow-hidden h-auto" />
        </div>
        <article className="">
          <Link to={`/product/${product.id}`}>
            <h2 className="text-center h-14 py-2">{product.name}</h2>
            <div className="my-2 w-fit mx-auto space-x-2 flex">
              <span className="flex items-center w-fit bg-slate-100 text-gray-600 px-3 py-1 rounded-full border text-xs">
                <BiSolidCategoryAlt />: {product.category}
              </span>

              <span className="flex items-center w-fit bg-slate-100 text-gray-600 px-3 py-1 text-xs rounded-full border">
                <SiBrandfolder />: {product.brand}
              </span>
            </div>
            <span className="flex text-neutral-700 items-center gap-1 w-fit px-4 rounded-full mx-auto my-1">
              <FaStar className="fill-[#0430ca]" /> {product.rating}
            </span>
            <div className="flex mx-auto items-center gap-1 w-fit mt-auto">
              <FaRupeeSign className="" />
              <div className="w-full">
                {Math.floor(
                  product.price - product.price * (discount / 100),
                )}
                {discount && (
                  <del className="text-sm">{product.price}</del>
                )}
                {discount && (
                  <span className="text-xs p-1 bg-green-200 rounded text-black">
                    {discount}%off
                  </span>
                )}
              </div>
            </div>
            {product.Deals.length > 0 && <h3 className="text-center my-2 text-sm">Deals Available</h3>}
            <div className="flex mx-auto items-center gap-1 w-fit mt-auto">
              {product.Deals.length > 0 && product.Deals.map((obj: any) => (
                <span key={obj.id} className="text-xs bg-gray-100 border rounded-full px-2 flex items-center"><AiOutlineTag />:{obj.name}</span>
              ))}
            </div>
          </Link>
        </article>
        <Link
          to={`/product/${product.id}`}
          className="absolute bottom-0 hover:bg-slate-100 px-[20%] text-white hover:text-black bg-[#004449] transition-colors rounded-b shadow h-10 w-full gap-1 text-sm text-center hover:border font-poppins flex justify-center items-center">
          Add to Cart
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
