import { useEffect, useState } from "react";
import { Sidebar } from "../components/dashboard";
import Content from "../components/dashboard/Content";
import { IconContext } from "react-icons";
import { useMediaMatch } from "../hooks";

const DashboardPage = () => {
  const [toggleAside, setToggleAside] = useState<boolean>(false);
  const [match, _] = useMediaMatch(768);

  useEffect(() => {
    if (match) {
      setToggleAside(true);
    } else {
      setToggleAside(false);
    }
  }, []);

  return (
    <IconContext.Provider value={{ size: "1.5rem" }}>
      <Sidebar setToggleAside={setToggleAside} toggleAside={toggleAside} />
      <Content toggleAside={toggleAside} />
    </IconContext.Provider>
  );
};

export default DashboardPage;
