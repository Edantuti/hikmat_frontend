import { useSearchParams } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  return (
    <>
      <h1>Success Page</h1>
      <p>payment id: {searchParams.get("payment_id")}</p>
    </>
  )
}

export default SuccessPage
