import { FC } from "react";
import { useSelector } from "react-redux";
import PageRedirect from "../components/Auth/PageRedirect";
import UserNavigation from "../components/User/UserNavigation";
import { Outlet } from "react-router-dom";

const UserPage: FC = (): JSX.Element => {
  const auth = useSelector((state: any) => state.auth.authenticated.value);
  //TODO:Create a navigation route for Orders
  return (
    <>
      {auth ? (
        <div className="flex flex-col lg:flex-row">
          <UserNavigation />
          <Outlet />
        </div>
      ) : (
        <PageRedirect />
      )}
    </>
  );
};

export default UserPage;
