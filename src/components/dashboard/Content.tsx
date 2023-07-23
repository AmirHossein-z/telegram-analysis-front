import { Outlet, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../../routes";
import { JSX } from "react";
import BreadCrumbs from "./BreadCrumb";

interface IProps {
  toggleAside: boolean;
}

const Content = ({ toggleAside }: IProps): JSX.Element => {
  const location = useLocation();
  return (
    <ProtectedRoute>
      <main
        className={`p-4 ${
          toggleAside ? "transition-all duration-200 ease-in-out md:mr-64" : ""
        }`}
      >
        <section className="mx-auto mt-14 w-full p-4 sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <BreadCrumbs />
          <Outlet />
        </section>
      </main>
    </ProtectedRoute>
  );
};

export default Content;
