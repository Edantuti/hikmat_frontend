import { useEffect, useState } from 'react';
import { FaRupeeSign, FaStar } from 'react-icons/fa';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { SiBrandfolder } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { ProductType } from './Product.d';
import { AiOutlineTag } from 'react-icons/ai';

const ProductCard = ({ product }: { product: ProductType }): JSX.Element => {
  const [discount, setDiscount] = useState<number>(product.discount);
  useEffect(() => {
    discountSummation();
  }, []);
  function discountSummation() {
    setDiscount(
      discount +
        product.Deals.reduce((total: number, curr: any) => {
          return total + curr.discount;
        }, 0)
    );
  }
  return (
    <div className='relative m-5 h-[48vh] w-72 rounded border'>
      <div className='flex aspect-square h-48 w-72 justify-center rounded-t p-1'>
        {product.photos && (
          <img
            loading='lazy'
            src={product.photos[0] + '?type=low'}
            alt={product.name}
            className='aspect-square h-auto overflow-hidden rounded-t'
          />
        )}
      </div>
      <article className=''>
        <Link to={`/product/${product.id}`}>
          <h2 className='h-14 py-2 text-center'>{product.name}</h2>
          <div className='mx-auto my-2 flex w-fit space-x-2'>
            <span className='flex w-fit items-center rounded-full border bg-slate-100 px-3 py-1 text-xs text-gray-600'>
              <BiSolidCategoryAlt />: {product.category}
            </span>

            <span className='flex w-fit items-center rounded-full border bg-slate-100 px-3 py-1 text-xs text-gray-600'>
              <SiBrandfolder />: {product.brand}
            </span>
          </div>
          <span className='mx-auto my-1 flex w-fit items-center gap-1 rounded-full px-4 text-neutral-700'>
            <FaStar className='fill-[#0430ca]' /> {product.rating}
          </span>
          <div className='mx-auto mt-auto flex w-fit items-center gap-1'>
            <FaRupeeSign className='' />
            <div className='w-full'>
              {Math.floor(product.price - product.price * (discount / 100))}
              {discount && <del className='text-sm'>{product.price}</del>}
              {discount && (
                <span className='rounded bg-green-200 p-1 text-xs text-black'>
                  {discount}%off
                </span>
              )}
            </div>
          </div>
          {product.Deals.length > 0 && (
            <h3 className='my-2 text-center text-sm'>Deals Available</h3>
          )}
          <div className='mx-auto mt-auto flex w-fit items-center gap-1'>
            {product.Deals.length > 0 &&
              product.Deals.map((obj: any) => (
                <span
                  key={obj.id}
                  className='flex items-center rounded-full border bg-gray-100 px-2 text-xs'
                >
                  <AiOutlineTag />:{obj.name}
                </span>
              ))}
          </div>
        </Link>
      </article>
      <Link
        to={`/product/${product.id}`}
        className='absolute bottom-0 flex h-10 w-full items-center justify-center gap-1 rounded-b bg-[#004449] px-[20%] text-center font-poppins text-sm text-white shadow transition-colors hover:border hover:bg-slate-100 hover:text-black'
      >
        Add to Cart
      </Link>
    </div>
  );
};

export default ProductCard;
