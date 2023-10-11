import {FC} from 'react'
import {Link} from "react-router-dom"

const HeroSection:FC = ():JSX.Element =>{
    return (
        <>
            <section className="flex flex-col sm:max-h-full sm:min-h-screen">
                <div className="relative sm:py-64 py-20 flex flex-col bg-[url(assets/image_files.jpg)] bg-center bg-cover bg-no-repeat w-[80%] mx-auto my-20 rounded">
                    
                    <p className="text-white text-center sm:text-2xl text-lg font-poppins">Your own Medicine store. Online</p>
                    <h2 className="text-white text-center sm:text-5xl text-2xl font-poppins">Healthier, Happier</h2>
                    <Link to="/product/" className="button text-black my-10 mx-auto">Shop now</Link>
                </div>
            </section>
        </>
    )
}

export default HeroSection