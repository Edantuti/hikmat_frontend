import {FC} from "react"

interface ICategoryCard{
    name:string,
    image:string
}

const CategoryCard:FC<ICategoryCard> = (props):JSX.Element =>{
    return (
        <>
            <div className={`relative w-72 h-80 bg-slate-100 rounded drop-shadow`}>
                <img src={props.image} alt="" className="absolute top-12 left-[12%] right-[50%] mix-blend-multiply"/>
                <p className="z-10 absolute top-[50%] left-[40%] text-2xl">{props.name}</p>
            </div>
        </>
    )
}

export default CategoryCard