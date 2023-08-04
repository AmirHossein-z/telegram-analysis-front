import { useContext, useEffect } from "react";
import { axiosPrivate } from "../apis";
import AuthContext from "../context/auth-provider";
import { useNavigate } from "react-router-dom";

const useApiPrivate = () => {
  // const refresh = useRefreshToken();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
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
          return axiosPrivate(prevRequest);
        }
        // return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // }, [auth.accessToken, refresh]);
  }, [auth.accessToken]);
  return axiosPrivate;
};

export default useApiPrivate;
