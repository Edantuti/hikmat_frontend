import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface IVisibilityProp {
  visibility: boolean;
  changeVisibility: Dispatch<SetStateAction<boolean>>;
}
const AdminMenu: FC<IVisibilityProp> = (prop): JSX.Element => {
  return (
    <>
      <nav
        className={`fixed mb-4 sm:w-96 w-full h-full top-0 transition-all shadow-lg z-10 bg-white flex items-center border-l-2  ${prop.visibility ? `right-0` : `sm:-right-96 -right-[50rem] `
          }`}
      >
        <div className="mx-auto flex flex-col text-xl text-center">
          <Link
            to="/admin"
            onClick={() => {
              prop.changeVisibility(!prop.visibility);
            }}
            className="px-2 py-1"
          >
            Admin dashboard
          </Link>
          <Link
            to="/admin/orders"
            onClick={() => {
              prop.changeVisibility(!prop.visibility);
            }}
            className="px-2 py-1"
          >
            Orders
          </Link>
          <Link
            to="/"
            onClick={() => {
              prop.changeVisibility(!prop.visibility);
            }}
            className="px-2 py-1"
          >
            Home Page
          </Link>
        </div>
      </nav>
    </>
  );
};

export default AdminMenu;
