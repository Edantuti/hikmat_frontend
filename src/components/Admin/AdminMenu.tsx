import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

const AdminMenu = (prop: {
  visibility: boolean;
  changeVisibility: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  return (
    <nav
      className={`fixed top-0 z-10 mb-4 flex h-full w-full items-center border-l-2 bg-white shadow-lg transition-all sm:w-96  ${
        prop.visibility ? `right-0` : `-right-[50rem] sm:-right-96 `
      }`}
    >
      <div className='mx-auto flex flex-col text-center text-xl'>
        <Link
          to='/admin'
          onClick={() => {
            prop.changeVisibility(!prop.visibility);
          }}
          className='px-2 py-1'
        >
          Admin dashboard
        </Link>
        <Link
          to='/admin/orders'
          onClick={() => {
            prop.changeVisibility(!prop.visibility);
          }}
          className='px-2 py-1'
        >
          Orders
        </Link>
        <Link
          to='/'
          onClick={() => {
            prop.changeVisibility(!prop.visibility);
          }}
          className='px-2 py-1'
        >
          Home Page
        </Link>
      </div>
    </nav>
  );
};

export default AdminMenu;
