import { JSX } from "react";
import {
  BiMessageSquareDots,
  BiPurchaseTagAlt,
  BiStats,
  BiUser,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface IProps {
  activeStyle: (linkPath: string) => boolean;
}

const BottomNavigation = ({ activeStyle }: IProps): JSX.Element => {
  const navigate = useNavigate();
  const activeBtnClass = "active animate-fadeIn";
  const defaultBtnClass = "text-base-content bg-base-100";

  return (
    <>
      <div className="btm-nav">
        <button
          onClick={() => navigate("/dashboard/profile")}
          className={`${
            activeStyle("/dashboard/profile") ? activeBtnClass : defaultBtnClass
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
            activeStyle("/dashboard/channels")
              ? activeBtnClass
              : defaultBtnClass
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
            activeStyle("/dashboard/tags") ? activeBtnClass : defaultBtnClass
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
