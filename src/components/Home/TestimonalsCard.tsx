
import { FaStar } from "react-icons/fa"

const TestimonalsCard = ({ testimonals }: {
  testimonals: {
    profile_url: string,
    username: string,
    description: string,
    rating: number,
  }
}): JSX.Element => {
  return (
    <>
      <article className="p-10  shadow w-96 bg-sky-400 rounded">
        <img className="py-4 h-24 w-16 object-cover rounded-full" src={testimonals.profile_url} alt={testimonals.username} />
        <hr className="py-2 w-40 " />
        <h2 className="text-xl">{testimonals.username} &nbsp; <span className="flex items-baseline"><FaStar />{testimonals.rating}</span></h2>
        <p className="text-sm">{testimonals.description}</p>
      </article>
    </>
  )
}

export default TestimonalsCard
