import { JSX } from "react";
import {
  BiLogOut,
  BiMessageSquareDots,
  BiPurchaseTagAlt,
  BiUser,
} from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";

interface IProps {
  toggleAside: boolean;
  activeStyle: (linkPath: string) => boolean;
  logout: () => void;
}

const Aside = ({ toggleAside, activeStyle, logout }: IProps): JSX.Element => {
  const activeLinkClass = "text-base-100 bg-base-content animate-fadeIn";
  const defaultLinkClass = "text-base-content bg-base-100";

  // mobile aside
  return (
    <aside
      id="logo-sidebar"
      className={`fixed right-0 top-0 z-40 h-screen w-64 border-l border-primary-content border-opacity-20 bg-base-100 pt-[73px] shadow-bg transition-all duration-200 ease-linear ${
        toggleAside ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-base-100 px-3 py-4">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to={"/dashboard"}
              className={`${
                activeStyle("/dashboard") ? activeLinkClass : defaultLinkClass
              } flex items-center rounded-lg p-2 transition-all duration-75 ease-in`}
            >
              <AiOutlineDashboard />
              <span className="mr-3">صفحه اصلی</span>
            </Link>
          </li>
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
