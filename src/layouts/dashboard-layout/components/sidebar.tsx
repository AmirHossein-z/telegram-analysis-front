import { Dispatch, JSX, SetStateAction, useContext, useEffect } from "react";
import Aside from "./aside";
import Navbar from "./navbar";
import BottomNavigation from "./bottom-navigation";
import { useAxiosPrivate, useMediaMatch } from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLogOut } from "../../../apis";
import AuthContext from "../../../context/auth-provider";

interface IProps {
  toggleAside: boolean;
  setToggleAside: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ toggleAside, setToggleAside }: IProps): JSX.Element => {
  const [match] = useMediaMatch(768);
  const location = useLocation();
  const { response, fetchData: logout } = useAxiosPrivate(getLogOut());
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const activeStyle = (linkPath: string): boolean => {
    return location.pathname === linkPath;
  };

  useEffect(() => {
    if (response !== null && response?.status === "success") {
      setAuth({ accessToken: "", userId: "" });
      toast.success(response?.message);
      navigate("/login");
    }
  }, [response]);

  const userNav = !match ? (
    <BottomNavigation activeStyle={activeStyle} />
  ) : (
    <Aside
      toggleAside={toggleAside}
      activeStyle={activeStyle}
      logout={logout}
    />
  );

  // mobile & tablet
  return (
    <>
      <Navbar setToggleAside={setToggleAside} logout={logout} />
      {userNav}
    </>
  );
};

export default Sidebar;
