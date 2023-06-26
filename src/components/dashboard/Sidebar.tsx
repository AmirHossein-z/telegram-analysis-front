import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { Aside, Navbar } from ".";

interface IProps {
  // setContentItem: Dispatch<SetStateAction<DashboardItem>>;
  toggleAside: boolean;
  setToggleAside: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ toggleAside, setToggleAside }: IProps): JSX.Element => {
  return (
    <>
      <Navbar setToggleAside={setToggleAside} />
      <Aside toggleAside={toggleAside} />
    </>
  );
};

export default Sidebar;
