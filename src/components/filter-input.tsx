import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  JSX,
  SetStateAction,
  useState,
} from "react";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

interface IFilterInputProps {
  filter: string;
  // setFilter:() => {},
  setFilter: Dispatch<SetStateAction<string>>;
  getInfo: () => void;
}

const FilterInput = ({
  filter,
  setFilter,
  getInfo,
}: IFilterInputProps): JSX.Element => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getInfo();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center gap-2"
    >
      <select
        className="select w-3/4 grow cursor-pointer bg-secondary bg-opacity-20 !py-0.5 text-xs text-secondary-focus focus:outline-none md:text-sm"
        name="selectChannel"
        style={{ direction: "rtl" }}
        value={filter}
        onChange={onChange}
      >
        <option value="0" disabled>
          فیلتر بر اساس ...
        </option>
        <option
          value="bestView"
          className=" cursor-pointer !py-0.5 text-xs md:text-sm"
        >
          فیلتر بر اساس بیشترین بازدید در تمام پست ها
        </option>
        <option
          value="leastView"
          className="cursor-pointer !py-0.5 text-xs md:text-sm"
        >
          فیلتر بر اساس کمترین بازدید در تمام پست ها
        </option>
        <option
          value="bestShare"
          className="cursor-pointer !py-0.5 text-xs md:text-sm"
        >
          فیلتر بر اساس بیشترین اشتراک گذاری در تمام پست ها
        </option>
        <option
          value="leastShare"
          className="cursor-pointer !py-0.5 text-xs md:text-sm"
        >
          فیلتر بر اساس کمترین اشتراک گذاری در تمام پست ها
        </option>
      </select>
      <button className="btn-secondary btn w-1/4">فیلتر</button>
    </form>
  );
};

export default FilterInput;
