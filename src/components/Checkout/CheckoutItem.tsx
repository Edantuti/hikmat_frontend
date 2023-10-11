export default function CheckoutItem(props: any): JSX.Element {
  return (
    <>
      <section className="border rounded md:flex overflow-hidden bg-slate-100 text-xl gap-2 m-2 w-[45vw]">
        <img src={props.photos[0]} alt="" className="w-44 aspect-square" />
        <div>
          <h2 className="text-xs text-gray-700 underline">Product Info:</h2>
          <p className="text-sm"><b>Product Name:</b> {props.name}</p>

          <p className="text-sm"><b>Quantity:</b> {props.cart_quantity}</p>
          <p className="text-sm"><b>Brand:</b> {props.brand}</p>
          <p className="text-sm"><b>Category:</b> {props.category}</p>
        </div>
      </section>
    </>
  )
}
