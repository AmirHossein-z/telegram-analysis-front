import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "../../containers";
import { JSX } from "react";

interface IProps {
  toggleAside: boolean;
}

const Content = ({ toggleAside }: IProps): JSX.Element => {
  return (
    <ProtectedRoute>
      <main className={`p-4 ${toggleAside ? "sm:mr-64" : ""}`}>
        <div className="mt-14">
          <Outlet />
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Content;
