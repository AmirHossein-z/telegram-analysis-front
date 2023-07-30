import { useEffect, JSX, useState, ReactNode, MouseEventHandler } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAbortController, useApiPrivate } from "../../hooks";
import { getProfile } from "../../apis";
import { toast } from "react-toastify";
import { ImMobile } from "react-icons/im";
import { BiLockAlt } from "react-icons/bi";
import { RiErrorWarningFill } from "react-icons/ri";
import { IconBase } from "react-icons";

interface UserInfo {
  id: number;
  email: string;
  updated_at: string;
  created_at: string;
  password: string;
  phone: string;
  name: string;
}

const Profile = (): JSX.Element => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    created_at: "",
    email: "",
    id: 0,
    password: "",
    updated_at: "",
    phone: "",
  });
  const { controller, setSignal } = useAbortController(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await getProfile(axiosPrivate, controller);
        setUserInfo(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error?.response?.status === 401) {
          toast.error("شما وارد نشده اید");
          navigate("/login", { state: { from: location }, replace: true });
        }
        setLoading(false);
      }
    };
    fetchInfo();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  if (loading) {
    return (
      <section className="mt-28 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </section>
    );
  }
  return (
    <section className="">
      <div className="flex items-center justify-between">
        <h1 className="text-base sm:text-lg">{userInfo.name}</h1>
        <button
          className="btn-secondary btn-sm btn rounded md:btn-md"
          onClick={() => navigate("/dashboard/profile/edit")}
        >
          ویرایش پروفایل
        </button>
      </div>
      <div className="divider md:my-3"></div>
      <div className="flex-wrap justify-between gap-6 md:flex md:items-baseline">
        <div className="flex flex-col justify-center gap-6 md:flex-grow">
          <h2 className="text-base text-secondary sm:text-lg">حساب کاربری</h2>
          <div className="flex flex-col gap-6">
            <AccountItem
              title="شماره تلفن"
              desc={userInfo.phone}
              Icon={<ImMobile />}
            />
            <AccountItem
              onClick={() => navigate("/dashboard/profile/reset-password")}
              title="تغییر رمز عبور"
              desc="***********"
              Icon={<BiLockAlt />}
            />
          </div>
        </div>
        <div className="divider md:divider-horizontal md:flex-grow-0"></div>
        <div className="flex flex-col justify-center gap-6 md:flex-grow">
          <h2 className="text-base text-secondary sm:text-lg">تنظیمات</h2>
          <div className="flex flex-col gap-6">
            <AccountItem
              title="نسخه برنامه"
              desc="1.2"
              Icon={<RiErrorWarningFill />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface IAccountItemProps {
  title: string;
  desc: string;
  Icon: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AccountItem = ({
  title,
  desc,
  Icon,
  onClick,
}: IAccountItemProps): JSX.Element => {
  return (
    <div
      className={`cursor-poiner" flex items-center justify-between ${
        typeof onClick === "function" ? "cursor-pointer" : ""
      }
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-2">
        <IconBase className="text-secondary">{Icon}</IconBase>
        <h4 className="text-xs text-base-content sm:text-base">{title}</h4>
      </div>
      <p className="text-accent-color text-xs sm:text-base">{desc}</p>
    </div>
  );
};

export default Profile;
