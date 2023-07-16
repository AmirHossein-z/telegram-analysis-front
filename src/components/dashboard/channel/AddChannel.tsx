import { useState, JSX } from "react";
import AddForm from "./AddForm";
import Step from "./Step";
import ManualChannel from "./ManualChannel";
import TelegramValidation from "./TelegramValidation";
import FinalStep from "./FinalStep";
import SelectChannel from "./SelectChannel";
import { toast } from "react-toastify";

const AddChannel = (): JSX.Element => {
  const [step, setStep] = useState(4);

  // show how can get api_id and api_hash from telegram
  let content: JSX.Element = <></>;
  if (step === 1) {
    toast.warn("شما در حال حاضر کانالی ندارید!");
    content = <ManualChannel setStep={setStep} />;
  } else if (step === 2) {
    content = <AddForm step={step} setStep={setStep} />;
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
