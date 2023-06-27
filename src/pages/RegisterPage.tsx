import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  JSX,
} from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsTelephoneFill } from "react-icons/bs";
import bg_tablet from "../assets/bg_tablet.jpg";
import { createUser } from "../apis";
import { IErrorResponseReg, IInputData } from "../types";
import { toast } from "react-toastify";

interface IProps {}
const RegisterPage = ({}: IProps): JSX.Element => {
  const [inputData, setInputData] = useState<IInputData>({
    email: "",
    password: "",
    phone: "",
  });
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<IErrorResponseReg>({
    status: false,
    // message: { email: "", password: "", phone: "" },
    message: [],
  });

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorFetch({
        ...errorFetch,
        status: false,
        message: [],
      });
      const { status } = await createUser(inputData);
      if (status === 200) {
        setLoading(false);
        setInputData({ email: "", password: "" });
        toast.success("با موفقیت ثبت نام کردید");
        navigate("/login");
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setLoading(false);
        setErrorFetch({
          ...errorFetch,
          status: true,
          message: error.response.data.message,
        });
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  if (errorFetch.status) {
    for (const obj of errorFetch.message) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          toast.error(obj[key]);
        }
      }
    }

    setErrorFetch({
      status: false,
      message: [],
    });
  }

  return (
    <main>
      <section className="h-full w-full lg:grid lg:h-full lg:w-full lg:grid-cols-2 lg:items-center lg:justify-center">
        <section className="h-screen w-screen bg-base-300 lg:h-full lg:w-full">
          <div className="mx-auto flex flex-col justify-center gap-3 sm:max-w-[36rem] sm:gap-12 lg:max-w-full">
            <img
              src={logo}
              alt="لوگوی سایت"
              className="lg:40 mx-auto h-40 w-40 p-2 sm:h-44 sm:w-44"
            />
            <h2 className="justify-self-center text-center text-2xl text-accent sm:text-3xl lg:text-2xl">
              ثبت نام
            </h2>
            <form onSubmit={onSubmit} className="p-4">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">ایمیل</span>
                </label>
                <div className="relative mb-6">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-accent-focus"
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
                    ref={emailRef}
                    value={inputData.email}
                    onChange={(e) => onChange(e)}
                    className="input w-full p-2.5 pr-10 text-neutral-content focus:text-accent-focus sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                    placeholder="ایمیل خود را وارد کنید"
                  />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="phone" className="label">
                  <span className="label-text">تلفن</span>
                </label>
                <div className="relative mb-6">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-accent-focus">
                    <BsTelephoneFill />
                    {/* <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-accent-focus"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg> */}
                  </div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={inputData.phone ?? ""}
                    onChange={(e) => onChange(e)}
                    className="input w-full p-2.5 pr-10 text-neutral-content focus:text-accent-focus sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                    placeholder="شماره تلفن خود را وارد کنید"
                  />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="registerPassword" className="label">
                  <span className="label-text">پسورد</span>
                </label>
                <div className="relative mb-6">
                  <div className="pointer-events-none absolute bottom-4 right-0 flex items-center pr-3 text-accent-focus sm:bottom-4 lg:bottom-4">
                    <RiLockPasswordFill />
                  </div>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={inputData.password}
                    onChange={(e) => onChange(e)}
                    className="input-neutral-content input w-full p-2.5 pr-10 focus:text-accent-focus sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                    placeholder="••••••••••••••••••••••••••"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className={`btn-secondary btn-outline btn-wide btn text-base ${
                    loading ? "btn-disabled" : ""
                  }`}
                >
                  ثبت نام
                  {loading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : null}
                </button>
              </div>
              <p className="mt-3 text-center text-neutral-content">
                حساب کاربری داری؟{" "}
                <Link to="/login">
                  <u className="text-warning">وارد شو</u>
                </Link>
              </p>
            </form>
          </div>
        </section>
        <section>
          <img
            src={bg_tablet}
            alt="عکس تبلت"
            className="hidden h-full w-full lg:block"
          />
        </section>
      </section>
    </main>
  );
};

export default RegisterPage;
