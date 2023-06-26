import { Dispatch, JSX, SetStateAction } from "react";
import { IconContext } from "react-icons";
import {
  BiLogOut,
  BiMessageSquareDots,
  BiPurchaseTagAlt,
  BiStats,
  BiUser,
} from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLogOut } from "../../apis";
import { useApiPrivate } from "../../hooks";

interface IProps {
  toggleAside: boolean;
}

const Aside = ({ toggleAside }: IProps): JSX.Element => {
  const location = useLocation();
  const axiosPrivate = useApiPrivate();
  const navigate = useNavigate();
  let activeLinkClass: string = "text-base-100 bg-neutral-content";
  let defaultLinkClass: string = "text-neutral-content bg-base-100";

  const activeStyle = (linkPath: string): boolean => {
    return location.pathname === linkPath;
  };

  const logout = async () => {
    const id = toast.loading("در حال خروج");
    try {
      const response = await getLogOut(axiosPrivate);

      if (response.data.status == "success") {
        toast.update(id, {
          render: response.data?.message,
          type: "success",
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
        });
        navigate("/login");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.update(id, {
          render: "شما وارد سامانه نشده اید!",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
        });
        navigate("/login");
      } else {
      }
    }
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed right-0 top-0 z-40 h-screen w-64 border-l border-primary-content bg-white pt-[73px] transition-all duration-200 ease-linear ${
        toggleAside ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-base-100 px-3 py-4">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to={"/dashboard/profile"}
              className={`${
                activeStyle("/dashboard/profile")
                  ? activeLinkClass
                  : defaultLinkClass
              } flex items-center rounded-lg p-2 transition-all duration-75 ease-in`}
            >
              <BiUser />
              <span className="mr-3">پروفایل</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/channels"}
              className={`${
                activeStyle("/dashboard/channels")
                  ? activeLinkClass
                  : defaultLinkClass
              } flex items-center rounded-lg p-2 transition-all duration-75 ease-in`}
            >
              <BiMessageSquareDots />
              <span className="mr-3">کانال ها</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/tags"}
              className={`${
                activeStyle("/dashboard/tags")
                  ? activeLinkClass
                  : defaultLinkClass
              } flex items-center rounded-lg p-2 transition-all duration-75 ease-in`}
            >
              <BiPurchaseTagAlt />
              <span className="mr-3">تگ ها</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/statistics"}
              className={`${
                activeStyle("/dashboard/statistics")
                  ? activeLinkClass
                  : defaultLinkClass
              } flex items-center rounded-lg p-2 transition-all duration-75 ease-in`}
            >
              <BiStats />
              <span className="mr-3">آمار</span>
              <span className="badge badge-warning mr-5 flex items-baseline justify-center px-2 text-sm font-medium">
                4
              </span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={logout}
              className="flex items-center rounded-lg p-2 text-neutral-content transition-all duration-75 ease-in hover:bg-neutral-content hover:text-base-100"
            >
              <BiLogOut />
              <span className="mr-3">خروج</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
