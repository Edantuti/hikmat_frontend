import { FC } from 'react'

interface ICheckout {
  data: any
}

const CheckoutInfo: FC<ICheckout> = (props): JSX.Element => {
  const prize = props.data.reduce((sum: number, current: any) => {
    return sum + (current.price * current.cart_quantity)
  }, 0)
  const total = Math.floor(props.data.reduce((sum: number, current: any) => {
    const dealsDiscount = current.Deals.reduce((total: number, curr: any) => {
      return total + curr.discount
    }, 0)

    return sum + ((current.price - current.price * ((current.discount + dealsDiscount) / 100)) * current.cart_quantity)
  }, 0))
  const overall = total + Math.floor(total * 0.02);

  return (
    <>
      <section className=" rounded p-4 m-2 ">
        <h2 className="text-2xl">Checkout Total</h2>
        <div>
          <p className="text-xl">Overall prize: {prize}</p>
          <p className="text-xl">Total prize:{
            overall
          }</p>
          <p>+2% for transaction fees</p>
        </div>
      </section>
    </>
  )
}


export default CheckoutInfo
