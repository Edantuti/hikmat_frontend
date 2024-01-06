const ProductDescription = (props: { description: string, benefits: string[], details: string[] }): JSX.Element => {
  return (
    <>
      <section className="border rounded p-10 m-2">
        <div className="">
          <h2 className="my-2 xl:text-2xl md:text-xl text-lg font-bold font-poppins underline">Product Description</h2>
          <p className="text-md break-all p-2 rounded">{props.description}</p>
        </div>
        <div className="my-10">
          <h2 className="xl:text-2xl md:text-xl text-lg font-bold font-poppins underline">Benefits</h2>
          <div className="flex flex-col md:gap-2 gap-4 my-2 text-lg leading-5">
            {props.benefits.map((obj, key) =>
              (<p key={key}>&#10003;{obj}</p>)
            )
            }
          </div>
        </div>
        <div className="my-10">
          <h2 className="xl:text-2xl md:text-xl text-lg font-bold font-poppins underline">Product details</h2>
          <div className="flex flex-col gap-2 my-2 leading-5">
            {props.details.map((obj, key) => (<p key={key}>&#10003; {obj}</p>))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDescription
