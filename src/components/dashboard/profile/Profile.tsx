import { useEffect, JSX, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApiPrivate } from "../../../hooks";
import { getProfile } from "../../../apis";
import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
import { getRelativeDate } from "../../../utils";

interface UserInfo {
  id: number;
  email: string;
  updated_at: string;
  created_at: string;
}

const profile = ({}): JSX.Element => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    created_at: "",
    email: "",
    id: 0,
    updated_at: "",
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await getProfile(axiosPrivate);
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
  }, []);

  if (loading) {
    return (
      <section className="mt-28 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </section>
    );
  }

  return (
    <section className="w-full rounded-md bg-primary text-primary-content shadow-sm">
      <div className="flex items-center gap-2 font-semibold leading-8">
        <BiUser />
        <span className="text-xl tracking-wide">درباره من</span>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-start">
          <div className="px-4 py-2 font-semibold">شماره تلفن:</div>
          <div className="px-4 py-2">۰۹۱۰۵۰۲۰۴۲۹</div>
        </div>
        <div className="flex items-center justify-start">
          <div className="px-4 py-2 font-semibold">ایمیل:</div>
          <div className="px-4 py-2">
            <a className="text-blue-800" href={`mailto:${userInfo.email}`}>
              {userInfo.email}
            </a>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="px-4 py-2 font-semibold">آخرین تاریخ ویرایش:</div>
          <div className="px-4 py-2">
            {getRelativeDate(new Date(userInfo.updated_at))}
          </div>
        </div>
      </div>
      <Link
        to="/dashboard/profile/edit"
        className="focus:shadow-outline hover:shadow-xs my-4 block w-full rounded-lg p-3 text-base font-semibold text-warning-content hover:text-warning focus:outline-none"
      >
        ویرایش
      </Link>
    </section>
  );
};

export default profile;
