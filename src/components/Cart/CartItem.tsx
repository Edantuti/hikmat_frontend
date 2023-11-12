import { FC, useState } from "react"

import { RiDeleteBin4Line } from "react-icons/ri"

interface ICartItem {
  item: any,
  index: number,
  length: number,
  removeFromCart: (id: string) => Promise<void>
}


const CartItem: FC<ICartItem> = (props): JSX.Element => {
  const [discount] = useState<number>(props.item.Deals.reduce((sum: number, curr: any) => {
    return sum + curr.discount
  }, 0))
  const [price] = useState<number>(props.item.price - Math.floor(props.item.price * ((props.item.discount + discount) / 100)))
  return (
    <>

      <div className={`border flex h-60 w-full ${((props.length - 1) !== props.index ? 'mb-2' : "mb-0")} rounded items-center`}>
        <div className="h-48 w-72 aspect-square rounded-t p-1 flex justify-center">
          <img src={props.item.photos[0]} alt={props.item.name} className="rounded-t aspect-square overflow-hidden h-auto" />
        </div>
        <div className="text-lg p-4 my-10 w-96 flex-2">
          <p className="lg:text-3xl md:text-2xl text-xl">{props.item.name}</p>
          <p className="text-sm"><b>Price:</b> {price}</p>
          <p className="text-sm"><b>Quantity:</b> {props.item.cart_quantity}</p>
          <p className="text-sm"><b>Total Price:</b>{price * props.item.cart_quantity}</p>
          {props.item.quantity === 0 && <p className="font-poppins text-lg">Out of Stock!</p>}
        </div>
        <button type="button" className="flex items-center bg-slate-100 py-2 px-6 hover:text-white hover:bg-[#990808] transition-colors rounded shadow h-10  ml-auto mr-4" onClick={() => props.removeFromCart(props.item.cartid)}><RiDeleteBin4Line /> </button>
      </div>

    </>
  )
}

export default CartItem
