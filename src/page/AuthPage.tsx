import { FC } from 'react'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import ForgetPassword from '../components/Auth/ForgotPassword'

interface IAuthPage {
    type: string
}

const AuthPage: FC<IAuthPage> = (props): JSX.Element => {

    return (
        <>
            <section className="min-h-screen max-h-full">
            {props.type === "login" && <Login />}
            {props.type === "signup" && <Register />}
            {props.type === "forgot" && <ForgetPassword />}
            </section>
        </>
    )
}

export default AuthPage
