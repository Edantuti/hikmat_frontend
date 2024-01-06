import { Link } from 'react-router-dom'

const PageRedirect = (): JSX.Element => {
  return (
    <>
      <section className="flex flex-col item-center justify-center h-[80vh]">
        <h1 className="italic font-bold font-volkhov md:text-6xl sm:text-2xl text-xl w-fit mx-auto my-5">HIKMAT</h1>
        <p className="text-center md:text-3xl sm:text-xl text-md font-volkhov font-bold">You don't have privileges.</p>
        <Link to="/auth/login" className="text-blue-400 mx-auto">Redirect to Login Page.</Link>
      </section>
    </>
  )
}

export default PageRedirect
