import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "./components";
import { IconContext } from "react-icons";
import { useMediaMatch } from "../../hooks";
import { JSX } from "react";
import { BreadCrumbs } from "../../components";
import { ProtectedRoute } from "../../routes";

const DashboardLayout = (): JSX.Element => {
  const [toggleAside, setToggleAside] = useState<boolean>(false);
  const [match] = useMediaMatch(768);

  useEffect(() => {
    if (match) {
      setToggleAside(true);
    } else {
      setToggleAside(false);
    }
  }, []);

  return (
    <IconContext.Provider value={{ size: "20px" }}>
      <Sidebar setToggleAside={setToggleAside} toggleAside={toggleAside} />
      {/* pages placed here */}
      <ProtectedRoute>
        <main
          className={`p-4 ${
            toggleAside
              ? "transition-all duration-200 ease-in-out md:mr-64"
              : ""
          }`}
        >
          <section className="mx-auto mt-14 w-full p-4 sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
            <BreadCrumbs />
            <Outlet />
          </section>
        </main>
      </ProtectedRoute>
      {/* pages placed here */}
    </IconContext.Provider>
  );
};

export default DashboardLayout;
