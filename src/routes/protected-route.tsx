import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-provider";

interface IProps {
  children: ReactNode;
}

// middleware to check if user is login
const ProtectedRoute = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!(auth.accessToken.length > 0)) {
      navigate("/login", { state: { from: location }, replace: true });
    }

    return () => {
      // axiosPrivate.interceptors.response.eject();
    };
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
