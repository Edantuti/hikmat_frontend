import { useState } from 'react';

import { RiMenu3Line } from 'react-icons/ri';
import AdminMenu from './AdminMenu';
import { Link } from 'react-router-dom';

const AdminHeader = (): JSX.Element => {
  const [menuState, setMenuState] = useState(false);
  return (
    <header className='flex justify-between border-b-2 border-neutral-300 px-10 py-5'>
      <div className='flex gap-10'>
        <Link to='/'>
          {' '}
          <h1 className='text-2xl font-semibold italic sm:text-5xl'>
            HIKMAT
          </h1>{' '}
        </Link>
      </div>

      {!menuState ? (
        <RiMenu3Line
          onClick={() => setMenuState(!menuState)}
          className='flex-2 absolute right-10 top-8 h-6 w-6 cursor-pointer '
        />
      ) : (
        <RiMenu3Line
          onClick={() => setMenuState(!menuState)}
          className='flex-2 fixed right-10 top-8 z-20 h-6 w-6 cursor-pointer'
        />
      )}
      <AdminMenu visibility={menuState} changeVisibility={setMenuState} />
    </header>
  );
};

export default AdminHeader;
