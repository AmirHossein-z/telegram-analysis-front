import { ReactNode, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

interface IProps {
  children: ReactNode;
}

// middleware to check if user is login
const ProtectedRoute = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!(auth.accessToken.length > 0)) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
