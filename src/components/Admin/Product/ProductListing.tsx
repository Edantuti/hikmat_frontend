import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { changeAuthentication } from '../../../slice/AuthSlice';
import { useFetchProducts } from '../../../hooks/products';
const ProductListing = () => {
  const { products, setProducts, isLoading } = useFetchProducts({ limit: 0 });
  const dispatch = useDispatch();
  async function removeProduct(id: string) {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/api/products`, {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setProducts({
        count: products.count - 1,
        rows: products.rows.filter((item: any) => item.id !== id),
      });
    } catch (error: any) {
      if (import.meta.env.DEV) console.error(error);
      if (error.response.status === 401) {
        dispatch(changeAuthentication(false));
        Cookies.remove('token');
      }
    }
  }
  if (isLoading) {
    return (
      <h1 className='flex items-center justify-center'>Loading Products...</h1>
    );
  }
  return (
    <>
      <h1 className='m-2 font-poppins sm:text-lg md:text-3xl'>Products</h1>
      {products &&
        products.rows.map((row: any) => (
          <div
            className='m-2 h-full gap-2 rounded border p-2 md:flex'
            key={row.id}
          >
            <Link to={`/admin/product/edit/${row.id}`}>
              <img
                src={row.photos[0]}
                alt='Product photo'
                className='w-64 rounded'
              />{' '}
            </Link>
            <Link className='w-full' to={`/admin/product/edit/${row.id}`}>
              <h2 className='text-xl'>Product Name:{row.name}</h2>
              <p>Quantity Left:{row.quantity}</p>
              <p>Brand:{row.brand}</p>
              <p>Category:{row.category}</p>
              <p>Price:{row.price}</p>
            </Link>

            <button
              className='button my-auto flex h-10 items-center justify-center '
              onClick={() => removeProduct(row.id)}
            >
              <RxCross1 />
            </button>
          </div>
        ))}
    </>
  );
};

export default ProductListing;
