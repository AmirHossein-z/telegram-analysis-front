import { Dispatch, SetStateAction } from "react";

interface IStepProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}
const Step = ({ step, setStep }: IStepProps) => {
  const setStyle = (index: number) => {
    return `${index <= step ? "step step-info" : "step"}`;
  };

  return (
    <ol className="steps mx-auto w-full" style={{ direction: "ltr" }}>
      <li data-content="5" className={`${setStyle(5)}`}>
        اتمام فرایند
      </li>
      <li data-content="4" className={`${setStyle(4)}`}>
        انتخاب کانال
      </li>
      <li data-content="3" className={`${setStyle(3)}`}>
        ارسال کد
      </li>
      <li data-content="2" className={`${setStyle(2)}`}>
        تکمیل اطلاعات
      </li>
      <li data-content="1" className={`${setStyle(1)}`}>
        هشدار
      </li>
    </ol>
  );
};

export default Step;
