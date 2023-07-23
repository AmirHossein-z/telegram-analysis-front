import { JSX } from "react";

const FilterInput = (): JSX.Element => {
  return (
    <select
      className="select w-full cursor-pointer bg-secondary bg-opacity-20 !py-0.5 text-xs text-secondary-focus focus:outline-none"
      name="selectChannel"
      style={{ direction: "rtl" }}
      defaultValue="0"
    >
      <option value="0" disabled>
        فیلتر بر اساس ...
      </option>
      <option
        value="filter_1"
        className=" cursor-pointer bg-secondary bg-opacity-20 !py-0.5 text-xs text-secondary-focus"
      >
        فیلتر بر اساس بیشترین بازدید در تمام پست ها
      </option>
      <option value="filter_2">
        فیلتر بر اساس کمترین بازدید در تمام پست ها
      </option>
      <option value="filter_3">
        فیلتر بر اساس بیشترین اشتراک گذاری در تمام پست ها
      </option>
      <option value="filter_4">
        فیلتر بر اساس کمترین اشتراک گذاری در تمام پست ها
      </option>
    </select>
  );
};

export default FilterInput;
