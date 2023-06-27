import { Dispatch, JSX, SetStateAction } from "react";
import { Aside, Navbar } from ".";
import BottomNavigation from "./BottomNavigation";
import { useMediaMatch } from "../../hooks";
import { useLocation } from "react-router-dom";

interface IProps {
  toggleAside: boolean;
  setToggleAside: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ toggleAside, setToggleAside }: IProps): JSX.Element => {
  const [match, _] = useMediaMatch(768);
  const location = useLocation();

  const activeStyle = (linkPath: string): boolean => {
    return location.pathname === linkPath;
  };

  // mobile & tablet
  if (!match) {
    return (
      <>
        <Navbar setToggleAside={setToggleAside} />
        <BottomNavigation activeStyle={activeStyle} />
      </>
    );
  } else {
    return (
      <>
        <Navbar setToggleAside={setToggleAside} />
        <Aside toggleAside={toggleAside} activeStyle={activeStyle} />
      </>
    );
  }
};

export default Sidebar;
