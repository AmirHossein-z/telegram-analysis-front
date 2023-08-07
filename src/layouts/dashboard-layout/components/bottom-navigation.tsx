import { JSX } from "react";
import { BiMessageSquareDots, BiPurchaseTagAlt, BiUser } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
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
      <div className="btm-nav z-30 border-t border-primary-content border-opacity-20 shadow-bg">
        <button
          onClick={() => navigate("/dashboard")}
          className={`${
            activeStyle("/dashboard") ? activeBtnClass : defaultBtnClass
          }`}
        >
          <AiOutlineDashboard />
          <span className={`btm-nav-label transition-all duration-200 ease-in`}>
            صفحه اصلی
          </span>
        </button>
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
      </div>
    </>
  );
};

export default BottomNavigation;
