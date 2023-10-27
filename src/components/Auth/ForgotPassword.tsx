import axios from "axios";
import { useForm } from "react-hook-form";
type FormValues = {
  email: string
}

export default function ForgotPassword(): JSX.Element {
  const { register, handleSubmit, formState: { isSubmitSuccessful } } = useForm<FormValues>({
    reValidateMode: "onBlur"
  })

  function onSubmit(data: FormValues) {
    axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/change`, data).then(() => {
    }).catch((errors: unknown) => console.error(errors))
  }
  return (
    <>
      {!isSubmitSuccessful ? <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:w-[500px] h-96 mb-64 mt-36 w-full p-10 mx-auto" >
        <h2 className="text-5xl font-volkhov text-center mb-12">Forgot Password</h2>
        <p className="text-sm ml-1 text-gray-700">Enter the Email:</p>
        <input type="email" className="inputField" placeholder="Enter your registered email" {...register("email", { required: true })} />
        <input type="submit" className="button my-2 border w-40 mx-auto" />
      </form> :
        <div className="min-h-screen max-h-full flex items-center justify-center">
          Link has been shared to you in your email!
        </div>}
    </>
  )
}
