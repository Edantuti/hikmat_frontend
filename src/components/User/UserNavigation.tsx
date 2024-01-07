import { Link } from 'react-router-dom'

const UserNavigation = (): JSX.Element => {

  return (
    <>
      <section
        className='flex flex-col lg:w-56 w-full lg:border border-t-4 border-t-blue-400 lg:m-2 rounded lg:h-[75vh]  h-40 border-b space-y-2 p-6 font-poppins'>
        <h2 className="text-xl underline">Navigation</h2>
        <div className="flex flex-row lg:flex-col gap-2">
          <Link to="/users/" className="text-md">Profile</Link>
          <Link to="/users/orders" className="text-md">Your Orders</Link>
          <Link to="/users/edit" className="text-md">Edit Profile</Link>
        </div>
      </section>
    </>
  )
}

export default UserNavigation
