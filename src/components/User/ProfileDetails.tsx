import { FC } from 'react'
import { useSelector } from 'react-redux'

const ProfileDetails: FC = (): JSX.Element => {
    const userData = useSelector((state: any) => state.auth.userData)

    //TODO:Design the User Page
    return (
        <>

            <section className="w-[90%] h-[75vh] space-y-2 border mt-2 rounded p-4">
                <h2 className="text-3xl">Profile Details</h2>
                <div className="space-y-2">
                    <img src={userData.profile_url} className="rounded-full h-24 w-24 border" />
                    <div className="text-lg space-y-2">
                        <p className="text-xl">First Name:{userData.first}</p>
                        <p className="text-xl">Last Name:{userData.last}</p>
                        <p className="text-xl">Email:{userData.email}</p>
                        <p className="text-xl">phone:{userData.phone}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileDetails
