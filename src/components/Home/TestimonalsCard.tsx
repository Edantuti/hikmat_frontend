import { FC } from "react"

import { TestimonalsType } from "./Testimonals"

interface ITestimonalsProps {
    testimonals: TestimonalsType
}

const TestimonalsCard: FC<ITestimonalsProps> = ({ testimonals }): JSX.Element => {
    return (
        <>
            <article className="p-10  shadow w-96 bg-slate-300 rounded">
                <img className="py-4" src={testimonals.profile_url} alt={testimonals.username} />
                <hr className="py-2 w-40 " />
                <h2 className="text-xl">{testimonals.username}</h2>
                <p className="text-sm">{testimonals.description}</p>
            </article>
        </>
    )
}

export default TestimonalsCard
