import { JSX } from "react";
import {
  BiMessageSquareDots,
  BiPurchaseTagAlt,
  BiStats,
  BiUser,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  activeStyle: (linkPath: string) => boolean;
}

const BottomNavigation = ({ activeStyle }: IProps): JSX.Element => {
  const navigate = useNavigate();
  let activeLinkClass: string = "text-base-100 bg-neutral-content";
  let defaultLinkClass: string = "text-neutral-content bg-base-100";

  return (
    <>
      <div className="btm-nav">
        <button
          onClick={() => navigate("/dashboard/profile")}
          className={`${
            activeStyle("/dashboard/profile") ? "active animate-fadeIn" : ""
          }`}
        >
          <BiUser />
          <span className={`btm-nav-label transition-all duration-200 ease-in`}>
            پروفایل
          </span>
        </button>
        <button
          onClick={() => navigate("/dashboard/channels")}
          className={`${
            activeStyle("/dashboard/channels") ? "active animate-fadeIn" : ""
          }`}
        >
          <BiMessageSquareDots />
          <span className={`btm-nav-label transition-all duration-200 ease-in`}>
            کانال ها
          </span>
        </button>
        <button
          onClick={() => navigate("/dashboard/tags")}
          className={`${
            activeStyle("/dashboard/tags") ? "active animate-fadeIn" : ""
          }`}
        >
          <BiPurchaseTagAlt />
          <span className={`btm-nav-label transition-all duration-200 ease-in`}>
            تگ ها
          </span>
        </button>
        <button
          onClick={() => navigate("/dashboard/statistics")}
          className={`${
            activeStyle("/dashboard/statistics") ? "active animate-fadeIn" : ""
          }`}
        >
          <BiStats />
          <span className={`btm-nav-label transition-all duration-200 ease-in`}>
            آمار
          </span>
          {/* <span className="badge badge-warning mr-5 flex items-baseline justify-center px-2 text-sm font-medium">
            4
          </span> */}
        </button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default BottomNavigation;
