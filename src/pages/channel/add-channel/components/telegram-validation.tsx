import {
  Dispatch,
  SetStateAction,
  JSX,
  useState,
  FormEvent,
  useEffect,
} from "react";
import OTPInput from "react-otp-input";
import { PhoneValidation, postOtp } from "../../../../apis";
import { useAxiosPrivate } from "../../../../hooks";
import { toast } from "react-toastify";

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

  const {
    loading: loadingValidation,
    response: responseValidation,
    error: errorValidation,
  } = useAxiosPrivate(PhoneValidation());
  const {
    loading: loadingSubmit,
    response: responseSubmit,
    error: errorSubmit,
    fetchData: submitData,
  } = useAxiosPrivate(postOtp(otp));

  useEffect(() => {
    if (responseValidation !== null) {
      if (!responseValidation?.status) {
        setStep(4);
      }
    }
  }, [responseValidation]);

  useEffect(() => {
    if (responseSubmit !== null) {
      setStep(4);
      toast.success("ورود انجام شد");
    }
  }, [responseSubmit]);

  if (loadingValidation) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <span className="loading loading-dots loading-lg"></span>
        <p>در حال ورود به حساب...</p>
      </div>
    );
  }

  if (errorValidation || errorSubmit) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        مشکلی پیش آمده است
      </section>
    );
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitData();
  };

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
          "flex flex-row-reverse flex-wrap justify-center items-center gap-3"
        }
        renderSeparator={<span>-</span>}
        renderInput={(props) => (
          <input
            {...props}
            style={{ width: "35px" }}
            className="input border border-primary border-opacity-30 text-center text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 lg:p-2.5"
          />
        )}
      />
      <button
        type="submit"
        disabled={loadingSubmit}
        className={`btn-secondary btn-outline btn-wide btn text-base focus:outline-secondary-focus ${
          loadingSubmit ? "btn-disabled" : ""
        }`}
      >
        ثبت
      </button>
    </form>
  );
};

export default TelegramValidation;
