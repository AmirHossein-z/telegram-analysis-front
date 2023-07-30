import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  JSX,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { RiLockPasswordFill } from "react-icons/ri";
import { IInputData, IErrorResponseLogin } from "../../types";
import { authUser } from "../../apis";
import AuthContext from "../../context/auth-provider";
import { toast } from "react-toastify";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { setAuth } = useContext(AuthContext);

  const [inputData, setInputData] = useState<IInputData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<IErrorResponseLogin>({
    status: false,
    message: "",
  });
  const emailRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setLoading(true);
      setErrorFetch({
        ...errorFetch,
        status: false,
        message: "",
      });
      const { data: userData } = await authUser(inputData);
      setLoading(false);
      setInputData({ email: "", password: "" });
      const accessToken = userData?.access_token?.original?.access_token;
      setAuth({ accessToken: accessToken, userId: userData?.user.id });
      navigate(from, { replace: true });
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        setErrorFetch({
          ...errorFetch,
          status: true,
          message: error.response.data.message ?? "",
        });
      }
      //   if (!error.response) {
      //     setErrorFetch({
      //       ...errorFetch,
      //       status: true,
      //       message: "No server response",
      //     });
      //   } else if (error?.response?.status === 401) {
      //     setErrorFetch({
      //       ...errorFetch,
      //       status: true,
      //       message: "Unauthorized",
      //     });
      //   } else {
      //     setErrorFetch({
      //       ...errorFetch,
      //       status: true,
      //       message: "Login failed",
      //     });
      //   }
    }
  };

  if (errorFetch.status) {
    toast.error(errorFetch.message);
    setErrorFetch({ status: false, message: "" });
  }
  return (
    <main>
      <section className="h-full w-full">
        <div className="mx-auto my-4 flex flex-col justify-center gap-3 sm:max-w-[36rem] sm:gap-12">
          <img
            src={logo}
            alt="لوگوی سایت"
            className="mx-auto h-40 w-32 p-2 sm:w-40"
          />
          <h2 className="justify-self-center text-center text-2xl text-secondary md:text-3xl">
            ورود به حساب
          </h2>
          <form onSubmit={(e) => onSubmit(e)} className="p-4">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">ایمیل</span>
              </label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ایمیل خود را وارد کنید"
                  value={inputData.email}
                  onChange={(e) => onChange(e)}
                  className="input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                />
              </div>
            </div>
            <div className="form-control">
              <div className="relative mb-6">
                <label htmlFor="loginPassword" className="label">
                  <span className="label-text">پسورد</span>
                </label>
                <div className="pointer-events-none absolute bottom-4 right-0 flex items-center pr-3 text-primary sm:bottom-4 lg:bottom-4">
                  <RiLockPasswordFill />
                </div>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={inputData.password}
                  onChange={(e) => onChange(e)}
                  placeholder="••••••••••••••••••••••••••"
                  className="input-neutral-content input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className={`btn-secondary btn-outline btn-wide btn text-base focus:outline-secondary-focus ${
                  loading ? "btn-disabled" : ""
                }`}
              >
                ورود
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : null}
              </button>
            </div>
            <p className="mt-3 text-center text-base-content">
              حساب نداری؟{" "}
              <Link to="/register">
                <u className="text-primary">ثبت نام کن</u>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
