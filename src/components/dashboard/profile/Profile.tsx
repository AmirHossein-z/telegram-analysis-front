import { useEffect, JSX, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiPrivate, useCancelToken } from "../../../hooks";
import { getProfile } from "../../../apis";
import { toast } from "react-toastify";
import { getRelativeDate } from "../../../utils";

interface UserInfo {
  id: number;
  email: string;
  updated_at: string;
  created_at: string;
  phone: string;
}

const Profile = (): JSX.Element => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    created_at: "",
    email: "",
    id: 0,
    updated_at: "",
    phone: "",
  });
  const { cancelToken } = useCancelToken();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await getProfile(axiosPrivate, cancelToken);
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
    <div className="card-bordered card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-6 text-info">درباره من</h2>
        <div className="flex flex-col gap-6">
          <div className="flex gap-x-2">
            <h5 className="">شماره تلفن:</h5>
            <p>{userInfo.phone}</p>
          </div>
          <div className="flex gap-x-2">
            <h5>ایمیل:</h5>
            <p>{userInfo.email}</p>
          </div>
          <div className="flex gap-x-2">
            <h5>اخرین تاریخ ویرایش:</h5>
            <p>{getRelativeDate(new Date(userInfo.updated_at))}</p>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => navigate("/dashboard/profile/edit")}
            className="btn-secondary btn-outline btn"
          >
            ویرایش
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
