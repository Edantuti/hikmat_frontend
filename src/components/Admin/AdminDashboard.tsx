


import { AiOutlineShopping, AiOutlineTag } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import OrdersGraph from "./Dashboard/OrdersGraph";
import ProductsGraph from "./Dashboard/ProductsGraph";
import { Link } from "react-router-dom";
import { GoPackage } from "react-icons/go"
import { SiBrandfolder } from "react-icons/si";



export default function AdminDashboard(): JSX.Element {
  return (
    <>
      <section className="md:grid md:grid-cols-[40vw_59%] gap-2">
        <OrdersGraph />
        <ProductsGraph />
        <FrontPageEditing />
        <ProductsOrdersSection />
      </section>
    </>
  )
}

function FrontPageEditing(): JSX.Element {
  //TODO:Create a pages for deals also 
  return (
    <>
      <article className="h-full ml-2 mt-2 order-2 rounded border lg:grid lg:grid-cols-[33%_34%_33%]">
        <h2 className="px-10 py-4 text-2xl col-span-3">Front Page Editing</h2>
        <div className="border rounded m-2 h-96 sm:grid sm:grid-cols-[50%_50%]">
          <h3 className="col-span-2 py-4 text-2xl flex items-center justify-center"><AiOutlineTag /> Deals</h3>

          <Link to="/admin/deals/create" className="m-2 border p-2 rounded h-36 hover:bg-slate-100 hover:shadow-inner transition-colors flex items-center justify-center">Create Deals</Link>
          <Link to="/admin/deals" className="m-2 border p-2 rounded h-36 hover:bg-slate-100 hover:shadow-inner transition-colors flex items-center justify-center">Deals</Link>

        </div>
        <div className="border rounded m-2 h-96 sm:grid sm:grid-cols-[50%_50%]">
          <h3 className="col-span-2 flex items-center justify-center py-4 text-2xl"><BiCategory /> Categories</h3>
          <Link to="/admin/category/create" className="m-2 border p-2 rounded h-36 hover:bg-slate-100 hover:shadow-inner transition-colors flex items-center justify-center">Create Category</Link>
          <Link to="/admin/category" className="m-2 border p-2 rounded h-36 hover:bg-slate-100 hover:shadow-inner transition-colors flex items-center justify-center">Categories</Link>

        </div>
        <div className="border rounded m-2 h-96 sm:grid sm:grid-cols-[50%_50%]">
          <h3 className="col-span-2 flex justify-center items-center py-4 text-2xl"> <SiBrandfolder /> Brand</h3>
          <Link to="/admin/brand/create" className="m-2 border p-2 rounded h-36 hover:bg-slate-100 hover:shadow-inner transition-colors flex items-center justify-center">Create Brand</Link>
          <Link to="/admin/brand/" className="m-2 border p-2 rounded h-36 hover:bg-slate-100 hover:shadow-inner transition-colors flex items-center justify-center">Brands</Link>

        </div>
      </article>
    </>
  )
}

function ProductsOrdersSection(): JSX.Element {
  return (
    <>
      <article className=" ml-2 mt-2 order-4 rounded border md:grid md:grid-cols-[50%_50%] grid-flow-dense">
        <h2 className="px-10 py-2 text-2xl col-span-2">Orders and Product Section</h2>
        <div className="border rounded m-2 h-60">
          <h3 className="text-lg px-5 py-4">Orders list</h3>

          <Link to="/admin/orders" className="text-md mx-2 py-2 px-4 border rounded hover:bg-slate-200 flex items-center justify-center"><GoPackage />Orders</Link>
        </div>
        <div className="border rounded m-2 h-60">
          <h3 className="text-lg px-5 py-4">Product List</h3>

          <Link to="/admin/product/add" className="m-2 border p-2 rounded hover:bg-slate-200 hover:shadow-inner transition-colors flex items-center justify-center">Add <AiOutlineShopping /> Product</Link>
          <Link to="/admin/product" className="m-2 border p-2 rounded hover:bg-slate-200 hover:shadow-inner transition-colors flex items-center justify-center"><AiOutlineShopping /> Product</Link>
        </div>
      </article>
    </>
  )
}
