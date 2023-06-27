import { useState } from "react";
import { Sidebar } from "../components/dashboard";
import Content from "../components/dashboard/Content";
import { IconContext } from "react-icons";

const DashboardPage = () => {
  const [toggleAside, setToggleAside] = useState<boolean>(false);

  return (
    <IconContext.Provider value={{ size: "1.5rem" }}>
      <Sidebar setToggleAside={setToggleAside} toggleAside={toggleAside} />
      <Content toggleAside={toggleAside} />
    </IconContext.Provider>
  );
};

export default DashboardPage;
