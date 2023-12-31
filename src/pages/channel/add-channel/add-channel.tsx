import { useState, JSX } from "react";
import {
  ManualChannel,
  TelegramValidation,
  Step,
  SelectChannel,
  FinalStep,
  AddApiInfo,
} from "./components";

const AddChannel = (): JSX.Element => {
  const [step, setStep] = useState(1);

  let content: JSX.Element = <></>;
  if (step === 1) {
    // toast.warn("شما در حال حاضر کانالی ندارید!");
    content = <ManualChannel setStep={setStep} />;
  } else if (step === 2) {
    content = <AddApiInfo step={step} setStep={setStep} />;
  } else if (step === 3) {
    content = <TelegramValidation setStep={setStep} />;
  } else if (step === 4) {
    content = <SelectChannel setStep={setStep} />;
  } else if (step == 5) {
    content = <FinalStep />;
  }
  return (
    <section className="flex flex-col gap-5">
      <Step step={step} setStep={setStep} />
      {content}
    </section>
  );
};

export default AddChannel;
