import { Dispatch, SetStateAction } from "react";

interface IRadioButtonProps {
  selectTop10: boolean;
  setSelectTop10: Dispatch<SetStateAction<boolean>>;
}

const SelectTop10 = ({ selectTop10, setSelectTop10 }: IRadioButtonProps) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="form-control">
        <label className="label cursor-pointer" style={{ direction: "ltr" }}>
          <span className="label-text text-lg">۱۰ پست پر بازدید</span>
          <input
            type="radio"
            name="radio-10"
            onChange={() => setSelectTop10(false)}
            className="radio mx-2 checked:bg-red-500"
            checked={selectTop10 === false}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer" style={{ direction: "ltr" }}>
          <span className="label-text text-lg">۱۰ پست پر اشتراک</span>
          <input
            type="radio"
            name="radio-10"
            onChange={() => setSelectTop10(true)}
            className="radio mx-2 checked:bg-blue-500"
            checked={selectTop10 === true}
          />
        </label>
      </div>
    </div>
  );
};

export default SelectTop10;
