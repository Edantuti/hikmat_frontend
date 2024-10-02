const ProductDescription = (props: {
  description: string;
  benefits: string[];
  details: string[];
}): JSX.Element => {
  return (
    <section className='m-2 rounded border p-10'>
      <div className=''>
        <h2 className='my-2 font-poppins text-lg font-bold underline md:text-xl xl:text-2xl'>
          Product Description
        </h2>
        <p className='text-md break-all rounded p-2'>{props.description}</p>
      </div>
      <div className='my-10'>
        <h2 className='font-poppins text-lg font-bold underline md:text-xl xl:text-2xl'>
          Benefits
        </h2>
        <div className='my-2 flex flex-col gap-4 text-lg leading-5 md:gap-2'>
          {props.benefits.map((obj) => (
            <p key={obj}>&#10003;{obj}</p>
          ))}
        </div>
      </div>
      <div className='my-10'>
        <h2 className='font-poppins text-lg font-bold underline md:text-xl xl:text-2xl'>
          Product details
        </h2>
        <div className='my-2 flex flex-col gap-2 leading-5'>
          {props.details.map((obj) => (
            <p key={obj}>&#10003; {obj}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
