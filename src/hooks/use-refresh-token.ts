import { useContext } from "react";
import { getRefreshAccessToken } from "../apis";
import AuthContext from "../context/auth-provider";

const useRefreshToken = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await getRefreshAccessToken();
    const newAccessToken = response?.data?.accessToken;
    if (newAccessToken) {
      setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));
    }
    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
