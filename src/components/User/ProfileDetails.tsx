import { useSelector } from 'react-redux'
import { useFetch } from '../../hooks/fetch';

const ProfileDetails = (): JSX.Element => {
  const userData = useSelector((state: any) => state.auth.userData)
  const { data, isLoading } = useFetch<{ address: string, city: string, state: string, pincode: string }>(`${import.meta.env.VITE_BACKEND}/api/address`, { userid: userData.userid })
  if (isLoading) {
    return <h1 className="flex items-center justify-center">Loading...</h1>
  }
  return (
    <>
      <section className="w-[90%] h-[75vh] space-y-2 border mt-2 rounded p-4">
        <h2 className="text-3xl">Profile Details</h2>
        <div className="space-y-2">
          <img src={userData.profile_url + "?type=low"} className="rounded-full h-24 w-24 border" />
          <div className="text-lg space-y-2">
            <p className="text-xl">First Name:{userData.first}</p>
            <p className="text-xl">Last Name:{userData.last}</p>
            <p className="text-xl">Email:{userData.email}</p>
            <p className="text-xl">phone:{userData.phone}</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl">Address Details</h3>
          {data && <div className="text-lg space-y-2">
            <p>Address: {data.address}</p>
            <p>City: {data.city}</p>
            <p>State: {data.state}</p>
            <p>PinCode: {data.pincode}</p>
          </div>}
        </div>
      </section>
    </>
  )
}

export default ProfileDetails
