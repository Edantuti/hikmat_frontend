import { Link } from 'react-router-dom';

const PageRedirect = (): JSX.Element => {
  return (
    <>
      <section className='item-center flex h-[80vh] flex-col justify-center'>
        <h1 className='mx-auto my-5 w-fit font-volkhov text-xl font-bold italic sm:text-2xl md:text-6xl'>
          HIKMAT
        </h1>
        <p className='text-md text-center font-volkhov font-bold sm:text-xl md:text-3xl'>
          You don't have privileges.
        </p>
        <Link to='/auth/login' className='mx-auto text-blue-400'>
          Redirect to Login Page.
        </Link>
      </section>
    </>
  );
};

export default PageRedirect;
