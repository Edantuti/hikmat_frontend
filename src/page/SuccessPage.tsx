import { useSearchParams } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  return (
    <>
      <div className="flex items-center justify-center">
        <h1>Success Page</h1>
        <p>payment id: {searchParams.get("payment_id")}</p>
      </div>
    </>
  )
}

export default SuccessPage
