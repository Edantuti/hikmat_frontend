import { FC } from 'react'

interface ICheckout {
  data: any
}

const CheckoutInfo: FC<ICheckout> = (props): JSX.Element => {

  return (
    <>
      <section className=" rounded p-4 m-2 ">
        <h2 className="text-2xl">Checkout Total</h2>
        <div>
          <p className="text-xl">Overall prize: {props.data.reduce((sum: number, current: any) => {
            return sum + (current.price * current.cart_quantity)
          }, 0)}</p>
          <p className="text-xl">Total prize:{
            Math.floor(props.data.reduce((sum: number, current: any) => {
              const dealsDiscount = current.Deals.reduce((total: number, curr: any) => {
                return total + curr.discount
              }, 0)

              return sum + ((current.price - current.price * ((current.discount + dealsDiscount) / 100)) * current.cart_quantity)
            }, 0))
          }</p>
        </div>
      </section>
    </>
  )
}


export default CheckoutInfo
