import { Link, Outlet } from 'react-router-dom'
import AdminHeader from '../components/Admin/AdminHeader'
import { useSelector } from 'react-redux'
const AdminPage = (): JSX.Element => {
  const user = useSelector((state: any) => state.auth.userData)
  return (
    <>
      {user.admin ? (<>
        <AdminHeader />
        <Outlet />

      </>) : (
        <section className="flex flex-col item-center justify-center h-screen">
          <h1 className="italic font-bold font-volkhov md:text-6xl sm:text-2xl text-xl w-fit mx-auto my-5">HIKMAT</h1>
          <p className="w-fit mx-auto md:text-3xl sm:text-xl text-md font-volkhov font-bold">You don't have Admin privileges.</p>
          <Link to="/" className="text-blue-400 mx-auto">Redirect to Home.</Link>
        </section>
      )}
    </>
  )
}


export default AdminPage
