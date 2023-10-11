import {FC, Dispatch, SetStateAction} from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

interface IPasswordInputTag{
    show:boolean,
    changeShow:Dispatch<SetStateAction<boolean>>,
    placeholder:string,
    formTag:string,
    register:any    
    requirement:any
}

const PasswordInput:FC<IPasswordInputTag> = (props)=>{
    const Visible =(props.show? AiOutlineEyeInvisible:AiOutlineEye)
    return (
        <>
            <div className="relative w-full flex m-0 p-0">
                <input className="border p-1 rounded font-poppins w-full shadow-inner mb-4 mt-1" type={props.show?"text":"password"} placeholder={props.placeholder} {...props.register(props.formTag, props.requirement)}/>
                <Visible className="absolute right-2 top-2 w-6 h-6" onClick={()=>props.changeShow(!props.show)} />
            </div>
        </>
    )
}

export default PasswordInput