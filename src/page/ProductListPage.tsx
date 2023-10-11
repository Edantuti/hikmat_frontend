import { FC, useEffect, useState } from "react";
import.meta.env
import ProductCard from "../components/ProductList/ProductCard";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import axios from "axios";
import.meta.env
const ProductListPage: FC = (): JSX.Element => {
  const products = useLoaderData() as any;
  const [nextPage, setNextPages] = useState<number[]>([]);
  const [brands, setBrands] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [_, setParams] = useSearchParams();
  useEffect(() => {
    retrieveBrands().then((response) => {
      setBrands(response.data.result)
    }).catch((error) => {
      console.error(error)
    })
    retrieveCategory().then((response) => {
      setCategory(response.data.result)
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  useEffect(() => {
    setPages()
  }, [])
  const setPages = () => {
    let value = [];
    for (let i = 0; i < Math.floor((products.count + 13) / 12); i++) {
      value.push(i + 1);
    }
    setNextPages(value)
  }

  function changePage(value: number) {
    setParams([["offset", ((value - 1) * 12) + ""]])
  };
  async function retrieveBrands() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/brands`)
  }

  async function retrieveCategory() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/categories`)
  }
  return (
    <>
      <section className="py-5">
        <div className="mx-12 flex item-center">
          <p className="">Brand</p>
          <div className="flex mx-10 overflow-auto gap-2">
            <Link className="px-4 py-1 border bg-gray-100 rounded-full w-fit" to="/product">All</Link>
            {brands.length > 0 && brands.map((obj: any) => (<Link key={obj.id} to={`/product?brand=${obj.name}`} className="px-4 py-1 border bg-gray-100 rounded-full w-fit whitespace-nowrap">{obj.name}</Link>))}

            {brands.length === 0 && <p>No Brands are present</p>}
          </div>
        </div>
        <div className="mx-12 flex item-center my-2">
          <p className="">Category</p>
          <div className="flex mx-10 overflow-auto gap-2">
            <Link className="px-4 py-1 border bg-gray-100 rounded-full w-fit" to="/product">All</Link>
            {category.length > 0 && category.map((obj: any) => (<Link key={obj.id} to={`/product?category=${obj.name}`} className="px-4 py-1 border bg-gray-100 rounded-full w-fit whitespace-nowrap">{obj.name}</Link>))}
            {category.length === 0 && <p> No Category are present</p>}
          </div>
        </div>
        <hr className="my-4" />
        {!products.rows.length && (
          <p className="text-center">No Products are listed yet</p>
        )}
        <div className="w-fit lg:w-[80%] mx-auto grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 ">
          {products.rows.map((obj: any, id: any) => (
            <ProductCard key={id} product={obj} />
          ))}
        </div>
        <div className="flex mx-auto w-56 mt-5 mb-10 gap-1">
          {nextPage.map((value, id) => (
            <div key={id} className="flex px-2 py-1 transition-colors border gap-10 hover:bg-gray-100 cursor-pointer">
              <p onClick={() => changePage(value)}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductListPage;
