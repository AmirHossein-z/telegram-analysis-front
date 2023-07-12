import { useState, JSX } from "react";
import AddForm from "./AddForm";
import Step from "./Step";
import ManualChannel from "./ManualChannel";

const AddChannel = (): JSX.Element => {
  const [step, setStep] = useState(1);

  // show how can get api_id and api_hash from telegram
  let content: JSX.Element = <></>;
  if (step === 1) {
    content = <ManualChannel setStep={setStep} />;
  } else if (step === 2) {
    content = <AddForm step={step} setStep={setStep} />;
  }
  return (
    <section className="flex flex-col gap-5">
      <Step step={step} setStep={setStep} />
      {content}
    </section>
  );
};

export default AddChannel;
