import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  JSX,
} from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsTelephoneFill } from "react-icons/bs";
import { createUser } from "../../apis";
import { IErrorResponseReg, IInputData } from "../../types";
import { toast } from "react-toastify";

const Register = (): JSX.Element => {
  const [inputData, setInputData] = useState<IInputData>({
    email: "",
    password: "",
    phone: "",
    name: "",
  });
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
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
      <section className="h-full w-full">
        <div className="mx-auto flex flex-col justify-center gap-3 sm:max-w-[36rem] sm:gap-12">
          <img
            src={logo}
            alt="لوگوی سایت"
            className="mx-auto h-40 w-32 p-2 sm:w-40"
          />
          <h2 className="justify-self-center text-center text-2xl text-secondary md:text-3xl">
            ثبت نام
          </h2>
          <form onSubmit={onSubmit} className="p-4">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">نام</span>
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
                  type="text"
                  id="name"
                  name="name"
                  value={inputData.name}
                  onChange={(e) => onChange(e)}
                  className="input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>
            </div>
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
                  ref={emailRef}
                  value={inputData.email}
                  onChange={(e) => onChange(e)}
                  className="input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="phone" className="label">
                <span className="label-text">تلفن</span>
              </label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-primary">
                  <BsTelephoneFill />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={inputData.phone ?? ""}
                  onChange={(e) => onChange(e)}
                  className="input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                  placeholder="شماره تلفن خود را وارد کنید"
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="registerPassword" className="label">
                <span className="label-text">پسورد</span>
              </label>
              <div className="relative mb-6">
                <div className="pointer-events-none absolute bottom-4 right-0 flex items-center pr-3 text-primary sm:bottom-4 lg:bottom-4">
                  <RiLockPasswordFill />
                </div>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={inputData.password}
                  onChange={(e) => onChange(e)}
                  className="input-neutral-content input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
                  placeholder="••••••••••••••••••••••••••"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className={`btn-secondary btn-outline btn-wide btn text-base focus:outline-secondary-focus $${
                  loading ? "btn-disabled" : ""
                }`}
              >
                ثبت نام
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : null}
              </button>
            </div>
            <p className="mt-3 text-center text-base-content">
              حساب کاربری داری؟{" "}
              <Link to="/login">
                <u className="text-primary">وارد شو</u>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
