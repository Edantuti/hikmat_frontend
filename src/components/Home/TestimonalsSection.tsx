import { FC } from "react"

import profileUrl from "../../assets/image.png"
import { TestimonalsType } from "./Testimonals"
import TestimonalsCard from "./TestimonalsCard"

const TestimonalsSection: FC = (): JSX.Element => {

    const TestimonalsObject: TestimonalsType = {
        profile_url: profileUrl,
        username: "Lorem0",
        description: "Life could be dream"
    }

    return (
        <>
            <section className="h-screen py-10 text-white bg-gradient-to-t from-[#007A8C] via-[#007E74] to-[#008358]">
                <h2 className="text-4xl text-center py-6 font-volkhov">This Is What Our Customers Say</h2>
                <p className="w-[70%] mx-auto text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure adipisci hic suscipit perspiciatis natus possimus, laborum nulla, omnis repudiandae optio animi aperiam minus, molestiae provident ab earum quae sed soluta!</p>
                <div className="flex text-black my-40">
                    <TestimonalsCard testimonals={TestimonalsObject} />
                </div>
            </section>
        </>
    )
}

export default TestimonalsSection
