import { Link } from 'react-router-dom';

const UserNavigation = (): JSX.Element => {
  return (
    <section className='flex h-40 w-full flex-col space-y-2 rounded border-b border-t-4 border-t-blue-400 p-6  font-poppins lg:m-2 lg:h-[75vh] lg:w-56 lg:border'>
      <h2 className='text-xl underline'>Navigation</h2>
      <div className='flex flex-row gap-2 lg:flex-col'>
        <Link to='/users/' className='text-md'>
          Profile
        </Link>
        <Link to='/users/orders' className='text-md'>
          Your Orders
        </Link>
        <Link to='/users/edit' className='text-md'>
          Edit Profile
        </Link>
      </div>
    </section>
  );
};

export default UserNavigation;
