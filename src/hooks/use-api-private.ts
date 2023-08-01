import { useContext, useEffect } from "react";
import { apiPrivate } from "../apis";
import AuthContext from "../context/auth-provider";
import { useNavigate } from "react-router-dom";
// import useRefreshToken from "./use-refresh-token";

const useApiPrivate = () => {
  // const refresh = useRefreshToken();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // if (error?.response?.status === 403 && ~prevRequest?.sent) {
        //   prevRequest.sent = true;
        //   const newAccessToken = await getRefreshAccessToken();
        //   prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        //   return apiPrivate(prevRequest);
        // }
        // return Promise.reject(error);
        if (error?.response?.status === 401 && !prevRequest._retry) {
          prevRequest._retry = true;
          navigate("/login");
          // const newAccessToken = await refresh();
          // console.log("newAccessToken :>> ", newAccessToken);
          // setAuth({ ...auth, accessToken: newAccessToken });
          // auth.accessToken = newAccessToken;
          // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiPrivate(prevRequest);
        }
        // return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
    // }, [auth.accessToken, refresh]);
  }, [auth.accessToken]);
  return apiPrivate;
};

export default useApiPrivate;
