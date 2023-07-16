import {
  Dispatch,
  SetStateAction,
  JSX,
  useState,
  FormEvent,
  useEffect,
} from "react";
import OTPInput from "react-otp-input";
import { PhoneValidation, postOtp } from "../../../apis";
import { useApiPrivate } from "../../../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ITelegramValidationProps {
  setStep: Dispatch<SetStateAction<number>>;
}

interface IErrorResponseOtp {
  status: boolean;
  message: { [key: string]: string }[];
}

const TelegramValidation = ({
  setStep,
}: ITelegramValidationProps): JSX.Element => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useApiPrivate();
  const navigate = useNavigate();
  const [errorFetch, setErrorFetch] = useState<IErrorResponseOtp>({
    status: false,
    message: [],
  });

  useEffect(() => {
    const getPhoneValidation = async () => {
      try {
        setLoading(true);
        console.log('otp :>> ', otp);
        const { data } = await PhoneValidation(axiosPrivate);
        console.log("data :>> ", data);
        if (!data.status) {
          toast.warn(data.value);
          setStep(2);
        } else {
          // console.log("data :>> ", data);
        }
        setLoading(false);
        // setErrorFetch({
        //   ...errorFetch,
        //   status: false,
        //   message: [],
        // });
        // setInputData({ apiHash: "", apiId: "", userId: 0 });
      } catch (error: any) {
        setLoading(false);
        if (
          error?.response?.status === 400 ||
          error?.response?.status === 401
        ) {
          // setErrorFetch({
          //   ...errorFetch,
          //   status: true,
          //   message: error.response.data.message ?? "",
          // });
        }
        if (error?.response?.status === 401) {
          navigate("login");
        }
      }
    };
    getPhoneValidation();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorFetch({
        ...errorFetch,
        status: false,
        message: [],
      });
      const { data } = await postOtp(axiosPrivate, { otp: otp });
      setLoading(false);
      setStep(4);
      toast.success("ورود انجام شد");
    } catch (error: any) {
      console.log("error :>> ", error);
      setLoading(false);
      if (error?.response?.status === 400) {
        setErrorFetch({
          ...errorFetch,
          status: true,
          message: error.response.data.message ?? "",
        });
      }
      if (error?.response?.status === 401) {
        navigate("login");
      }
    }
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
      message: [],
      status: false,
    });
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex flex-col items-center justify-center gap-10 p-4"
    >
      <h4 className="text-xl">
        کد ارسال شده به تلگرام خود را اینجا وارد کنید:
      </h4>
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        shouldAutoFocus
        containerStyle={
          "flex flex-row-reverse justify-center items-center gap-3"
        }
        renderSeparator={<span>-</span>}
        renderInput={(props) => (
          <input
            {...props}
            style={{ width: "5%" }}
            className="input border border-primary border-opacity-30 text-center text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 lg:p-2.5"
          />
        )}
      />
      <button
        type="submit"
        className="btn-secondary btn-outline btn-wide btn text-base focus:outline-secondary-focus"
      >
        ثبت
      </button>
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : null}
    </form>
  );
};

export default TelegramValidation;
