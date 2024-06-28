import axios from 'axios';
import Cookies from 'js-cookie';
import { RxCross2 } from 'react-icons/rx';
import { changeAuthentication } from '../../../slice/AuthSlice';
import { useDispatch } from 'react-redux';
import { useFetch } from '../../../hooks/fetch';
//TODO:Add Toast
export default function CategoryListing() {
  const { data, setData, isLoading } = useFetch<any[]>(
    `${import.meta.env.VITE_BACKEND}/api/categories`
  );
  const dispatch = useDispatch();
  function deleteCategory(id: string) {
    try {
      axios
        .delete(`${import.meta.env.VITE_BACKEND}/api/admin/categories`, {
          params: {
            id: id,
          },
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        })
        .then(() => {
          if (data) setData(data.filter((item: any) => item.id !== id));
        });
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 401) {
        dispatch(changeAuthentication(false));
        Cookies.remove('token');
      }
    }
  }
  if (isLoading) {
    return <h1>Loading... </h1>;
  }
  return (
    <>
      <section className='m-2 grid-flow-dense sm:grid-cols-1 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
        <h2 className='col-span-8 text-2xl '>Categories</h2>
        {data ? (
          data.map((obj: any) => {
            return (
              <div
                key={obj.id}
                className='mt-4 flex h-60  w-60 flex-col justify-between rounded-md border border-gray-300'
              >
                <p className='flex h-full items-center justify-center text-xl'>
                  {obj.name}
                </p>
                <button
                  className='flex justify-center border px-2 py-1 transition-colors hover:border-red-400 hover:bg-red-400'
                  onClick={() => deleteCategory(obj.id)}
                >
                  <RxCross2 />
                </button>
              </div>
            );
          })
        ) : (
          <p className='flex h-screen items-center justify-center text-2xl'>
            no Category is present
          </p>
        )}
      </section>
    </>
  );
}
