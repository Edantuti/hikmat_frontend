import { FC, useEffect, useState } from 'react';
import ProductCard from '../components/ProductList/ProductCard';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { useFetchProducts } from '../hooks/products';
import { useFetch } from '../hooks/fetch';
import { nanoid } from '@reduxjs/toolkit';

const ProductListPage: FC = (): JSX.Element => {
  const loader = useLoaderData() as {
    category?: string;
    brand?: string;
    offset?: string;
  };
  const { products } = useFetchProducts(loader);
  const [nextPage, setNextPages] = useState<number[]>([]);
  const { data: brands, isLoading: isBrandsLoading } = useFetch<any[]>(
    `${import.meta.env.VITE_BACKEND}/api/brands`
  );
  const { data: category, isLoading: isCategoryLoading } = useFetch<any[]>(
    `${import.meta.env.VITE_BACKEND}/api/categories`
  );
  const [_, setParams] = useSearchParams();
  useEffect(() => {
    setPages();
  }, [products]);
  const setPages = () => {
    let value = [];
    for (let i = 0; i < Math.floor((products.count + 13) / 12); i++) {
      value.push(i + 1);
    }
    setNextPages(value);
  };
  function changePage(value: number) {
    setParams([['offset', (value - 1) * 12 + '']]);
  }
  return (
    <section className='py-5'>
      <div className='item-center mx-12 flex'>
        <p className=''>Brand</p>
        <div className='mx-10 flex gap-2 overflow-auto'>
          <Link
            className='w-fit rounded-full border bg-gray-100 px-4 py-1'
            to='/product'
          >
            All
          </Link>
          {brands?.map((obj: any) => (
            <Link
              key={obj.id}
              to={`/product?brand=${obj.name}`}
              className='w-fit whitespace-nowrap rounded-full border bg-gray-100 px-4 py-1'
            >
              {obj.name}
            </Link>
          ))}
          {isBrandsLoading && <p>Loading Brands</p>}
          {!brands && !isBrandsLoading && <p>No Brands are present</p>}
        </div>
      </div>
      <div className='item-center mx-12 my-2 flex'>
        <p className=''>Category</p>
        <div className='mx-10 flex gap-2 overflow-auto'>
          <Link
            className='w-fit rounded-full border bg-gray-100 px-4 py-1'
            to='/product'
          >
            All
          </Link>
          {isCategoryLoading && <p>Loading Category</p>}
          {category?.map((obj: any) => (
            <Link
              key={obj.id}
              to={`/product?category=${obj.name}`}
              className='w-fit whitespace-nowrap rounded-full border bg-gray-100 px-4 py-1'
            >
              {obj.name}
            </Link>
          ))}
          {!category && !isCategoryLoading && <p> No Category are present</p>}
        </div>
      </div>
      <hr className='my-4' />
      {!products.rows.length && (
        <p className='text-center'>No Products are listed yet</p>
      )}
      <div className='mx-auto grid w-fit md:grid-cols-1 lg:w-[80%] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 '>
        {products.rows.map((obj: any) => (
          <ProductCard key={obj.id} product={obj} />
        ))}
      </div>
      <div className='mx-auto mb-10 mt-5 flex w-56 gap-1'>
        {nextPage.map((value) => (
          <div
            key={nanoid()}
            className='flex cursor-pointer gap-10 border px-2 py-1 transition-colors hover:bg-gray-100'
          >
            <p onClick={() => changePage(value)}>{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductListPage;
