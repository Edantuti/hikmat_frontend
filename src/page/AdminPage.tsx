import { Link, Outlet } from 'react-router-dom';
import AdminHeader from '../components/Admin/AdminHeader';
import { useSelector } from 'react-redux';
const AdminPage = (): JSX.Element => {
  const user = useSelector((state: any) => state.auth.userData);
  return (
    <>
      {user.admin ? (
        <>
          <AdminHeader />
          <Outlet />
        </>
      ) : (
        <section className='item-center flex h-screen flex-col justify-center'>
          <h1 className='mx-auto my-5 w-fit font-volkhov text-xl font-bold italic sm:text-2xl md:text-6xl'>
            HIKMAT
          </h1>
          <p className='text-md mx-auto w-fit font-volkhov font-bold sm:text-xl md:text-3xl'>
            You don't have Admin privileges.
          </p>
          <Link to='/' className='mx-auto text-blue-400'>
            Redirect to Home.
          </Link>
        </section>
      )}
    </>
  );
};

export default AdminPage;
