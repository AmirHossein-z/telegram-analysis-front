import { Dispatch, JSX, SetStateAction, useContext } from "react";
import { Aside, Navbar } from ".";

import BottomNavigation from "./BottomNavigation";
import { useApiPrivate, useMediaMatch } from "../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLogOut } from "../../apis";
import AuthContext from "../../context/AuthProvider";

interface IProps {
  toggleAside: boolean;
  setToggleAside: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ toggleAside, setToggleAside }: IProps): JSX.Element => {
  const [match, _] = useMediaMatch(768);
  const location = useLocation();
  const axiosPrivate = useApiPrivate();
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const activeStyle = (linkPath: string): boolean => {
    return location.pathname === linkPath;
  };

  const logout = async () => {
    const id = toast.loading("در حال خروج");
    try {
      const response = await getLogOut(axiosPrivate);

      if (response.data.status == "success") {
        setAuth({ accessToken: "", userId: "" });
        toast.update(id, {
          render: response.data?.message,
          type: "success",
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
        });
        navigate("/login");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.update(id, {
          render: "شما وارد سامانه نشده اید!",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
        });
        navigate("/login");
      } else {
        //
      }
    }
  };

  // mobile & tablet
  if (!match) {
    return (
      <>
        <Navbar setToggleAside={setToggleAside} logout={logout} />
        <BottomNavigation activeStyle={activeStyle} />
      </>
    );
  } else {
    return (
      <>
        <Navbar setToggleAside={setToggleAside} logout={logout} />
        <Aside
          toggleAside={toggleAside}
          activeStyle={activeStyle}
          logout={logout}
        />
      </>
    );
  }
};

export default Sidebar;
