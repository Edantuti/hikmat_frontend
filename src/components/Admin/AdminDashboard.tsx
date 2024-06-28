import { AiOutlineShopping, AiOutlineTag } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import OrdersGraph from './Dashboard/OrdersGraph';
import ProductsGraph from './Dashboard/ProductsGraph';
import { Link } from 'react-router-dom';
import { GoPackage } from 'react-icons/go';
import { SiBrandfolder } from 'react-icons/si';
const AdminDashboard = (): JSX.Element => {
  return (
    <>
      <section className='gap-2 md:grid md:grid-cols-[40vw_59%]'>
        <OrdersGraph />
        <ProductsGraph />
        <FrontPageEditing />
        <ProductsOrdersSection />
      </section>
    </>
  );
};

const FrontPageEditing = (): JSX.Element => {
  //TODO:Create a pages for deals also
  return (
    <>
      <article className='order-2 ml-2 mt-2 h-full rounded border lg:grid lg:grid-cols-[33%_34%_33%]'>
        <h2 className='col-span-3 px-10 py-4 text-2xl'>Front Page Editing</h2>
        <div className='m-2 h-96 rounded border sm:grid sm:grid-cols-[50%_50%]'>
          <h3 className='col-span-2 flex items-center justify-center py-4 text-2xl'>
            <AiOutlineTag /> Deals
          </h3>

          <Link
            to='/admin/deals/create'
            className='m-2 flex h-36 items-center justify-center rounded border p-2 transition-colors hover:bg-slate-100 hover:shadow-inner'
          >
            Create Deals
          </Link>
          <Link
            to='/admin/deals'
            className='m-2 flex h-36 items-center justify-center rounded border p-2 transition-colors hover:bg-slate-100 hover:shadow-inner'
          >
            Deals
          </Link>
        </div>
        <div className='m-2 h-96 rounded border sm:grid sm:grid-cols-[50%_50%]'>
          <h3 className='col-span-2 flex items-center justify-center py-4 text-2xl'>
            <BiCategory /> Categories
          </h3>
          <Link
            to='/admin/category/create'
            className='m-2 flex h-36 items-center justify-center rounded border p-2 transition-colors hover:bg-slate-100 hover:shadow-inner'
          >
            Create Category
          </Link>
          <Link
            to='/admin/category'
            className='m-2 flex h-36 items-center justify-center rounded border p-2 transition-colors hover:bg-slate-100 hover:shadow-inner'
          >
            Categories
          </Link>
        </div>
        <div className='m-2 h-96 rounded border sm:grid sm:grid-cols-[50%_50%]'>
          <h3 className='col-span-2 flex items-center justify-center py-4 text-2xl'>
            {' '}
            <SiBrandfolder /> Brand
          </h3>
          <Link
            to='/admin/brand/create'
            className='m-2 flex h-36 items-center justify-center rounded border p-2 transition-colors hover:bg-slate-100 hover:shadow-inner'
          >
            Create Brand
          </Link>
          <Link
            to='/admin/brand/'
            className='m-2 flex h-36 items-center justify-center rounded border p-2 transition-colors hover:bg-slate-100 hover:shadow-inner'
          >
            Brands
          </Link>
        </div>
      </article>
    </>
  );
};

const ProductsOrdersSection = (): JSX.Element => {
  return (
    <>
      <article className=' order-4 ml-2 mt-2 grid-flow-dense rounded border md:grid md:grid-cols-[50%_50%]'>
        <h2 className='col-span-2 px-10 py-2 text-2xl'>
          Orders and Product Section
        </h2>
        <div className='m-2 h-60 rounded border'>
          <h3 className='px-5 py-4 text-lg'>Orders list</h3>

          <Link
            to='/admin/orders'
            className='text-md mx-2 flex items-center justify-center rounded border px-4 py-2 hover:bg-slate-200'
          >
            <GoPackage />
            Orders
          </Link>
        </div>
        <div className='m-2 h-60 rounded border'>
          <h3 className='px-5 py-4 text-lg'>Product List</h3>

          <Link
            to='/admin/product/add'
            className='m-2 flex items-center justify-center rounded border p-2 transition-colors hover:bg-slate-200 hover:shadow-inner'
          >
            Add <AiOutlineShopping /> Product
          </Link>
          <Link
            to='/admin/product'
            className='m-2 flex items-center justify-center rounded border p-2 transition-colors hover:bg-slate-200 hover:shadow-inner'
          >
            <AiOutlineShopping /> Product
          </Link>
        </div>
      </article>
    </>
  );
};

export default AdminDashboard;
