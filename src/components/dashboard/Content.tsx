import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "../../routes";
import { JSX } from "react";

interface IProps {
  toggleAside: boolean;
}

const Content = ({ toggleAside }: IProps): JSX.Element => {
  return (
    <ProtectedRoute>
      <main
        className={`p-4 ${
          toggleAside ? "transition-all duration-200 ease-in-out md:mr-64" : ""
        }`}
      >
        <div className="mt-14 p-4">
          <Outlet />
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Content;
