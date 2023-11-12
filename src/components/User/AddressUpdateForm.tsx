import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

type FormValues = {
  address: string,
  city: string,
  pincode: number,
  state: string
}

const AddressUpdateForm = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>(
    {
      reValidateMode: "onBlur"
    }
  )
  const user = useSelector((state: any) => state.auth.userData)
  useEffect(() => {
    onLoadRetrieve().then((response: any) => {
      setValue("address", response.data.result.address);
      setValue("city", response.data.result.city);
      setValue("pincode", response.data.result.pincode);
      setValue("state", response.data.result.state);
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  async function onLoadRetrieve() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/address`, {
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`
      },
      params: {
        userid: user.userid
      }
    });
  }
  async function onSubmit(data: FormValues) {
    try {
      const { data: PincodeData } = await axios.get(`https://api.postalpincode.in/pincode/${data.pincode}`)
      if (PincodeData[0].Status !== "Success") {
        return toast.error("Invalid Pincode");
      }
      toast.promise(axios.post(`${import.meta.env.VITE_BACKEND}/api/address`, data, { params: { userid: user.userid }, headers: { "Authorization": `Bearer ${Cookies.get("token")}` } }), {
        success: "Address is Updated",
        error: "Something went wrong",
        pending: "Wait"
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <section className="h-full my-40">
        <h3 className="text-xl my-2">Address Details</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:w-96 gap-2">
          <p>Street:</p>
          <input className="inputField"
            type="text" placeholder="Address" {...register("address", { required: true })} />
          {errors.address?.type === "required" && <p className="text-red-900">Field Required</p>}
          <p>City:</p>
          <input className="inputField "
            type="search" placeholder="City" {...register("city", { required: true })} />
          {errors.city?.type === "required" && <p className="text-red-900">Field Required</p>}
          <p>State:</p>
          <select className="inputField"
            {...register("state", { required: true })}>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
          <p>Pincode:</p>
          <input className="inputField"
            type="number" placeholder="Pincode" {...register("pincode", { required: true })} />
          {errors.pincode?.type === "required" && <p className="text-red-900">Field Required</p>}
          <button type="submit" className="button" >Submit</button>
        </form>
      </section>
    </>
  )
}
export default AddressUpdateForm
