import { useContext } from "react";
import { getRefreshAccessToken } from "../apis";
import AuthContext from "../context/auth-provider";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const accessToken = await getRefreshAccessToken();
    setAuth((prev) => {
      return { ...prev, accessToken: accessToken };
    });
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
