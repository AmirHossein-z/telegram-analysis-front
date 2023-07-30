import { JSX } from "react";
import { Link } from "react-router-dom";

const FinalStep = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-xl text-green-500">اطلاعات با موفقیت ثبت شد!</h2>
      <Link to="/dashboard/channels" className="btn-secondary btn">
        دیدن کانال ها
      </Link>
    </div>
  );
};

export default FinalStep;
