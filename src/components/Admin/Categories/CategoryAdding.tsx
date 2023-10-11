import axios from "axios"
import.meta.env
import Cookies from 'js-cookie'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"

export default function CategoryAdding() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>(
    {
      reValidateMode: "onBlur"
    }
  )
  const onSubmit = async (d: any) => {

    try {
      const formdata = new FormData()
      formdata.append("name", d.name)
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/admin/categories`, formdata, {
        headers: {
          "Authorization": `Bearer ${Cookies.get('token')}`
        }
      })
      return toast.success("Your category has been added.")
    } catch (error) {
      console.error(error)
      return toast.error("Error in submission")
    }
  }
  return (
    <>
      <section className="flex items-center justify-center max-h-full min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-96">
          <h2 className="text-center text-2xl">New Category</h2>
          <input type="text" placeholder="Enter your Category Name" className="inputField my-2" {...register("name", { required: true })} />
          {errors.name && <p>You cannot submit a empty Category name</p>}
          <input type="submit" className="button" value="Submit" />
        </form>

        <ToastContainer theme="colored" />
      </section>
    </>
  )
}
