import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"

export default function BrandAdding() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>(
    {
      reValidateMode: "onBlur"
    }
  )
  const onSubmit = async (d: any) => {

    try {
      const formdata = new FormData()
      formdata.append("name", d.name)
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/admin/brands`, formdata, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })
      toast.success("Your brand has been added")
    } catch (error) {
      console.error(error)
      toast.error("Error in submission")

    }
  }
  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-96">
          <input type="text" placeholder="Enter your brand Name" className="inputField my-2" {...register("name", { required: true })} />
          {errors.name && <p>You cannot submit a empty brand name</p>}
          <input type="submit" className="button" value="Submit" />
        </form>
        <ToastContainer theme="colored" />
      </section>
    </>
  )
}
