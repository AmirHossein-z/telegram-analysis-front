import { JSX } from "react";
import { BiSearch } from "react-icons/bi";

const SearchButton = (): JSX.Element => {
  return (
    <div className="join flex w-full items-center" style={{ direction: "ltr" }}>
      <div className="join-item cursor-pointer bg-secondary p-3.5 text-white">
        <BiSearch />
      </div>
      <input
        type="text"
        placeholder="جست و جو"
        className="input-bordered input join-item w-full bg-secondary bg-opacity-20 !py-0.5 text-xs text-secondary-focus placeholder:text-secondary focus:outline-none sm:text-sm"
      />
    </div>
  );
};

export default SearchButton;
