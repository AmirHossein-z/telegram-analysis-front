import { useState, useEffect, useRef, useContext } from "react";
import { axiosPrivate } from "../apis";
import { AxiosResponse } from "axios";
import { IAxiosPrivate } from "../types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../context/auth-provider";

const useAxiosPrivate = (props: IAxiosPrivate) => {
  const { url, method, runOnMount = true, timeout } = props;
  const { auth } = useContext(AuthContext);
  const [response, setResponse] = useState<null | any>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const location = useLocation();
  const controller = useRef(new AbortController());
  const [_, setSearchParams] = useSearchParams({});

  const fetchData = async () => {
    try {
      setloading(true);
      let res: AxiosResponse;
      if (method === "get") {
        // params validation
        const { params } = props;
        const newParams: { [key: string]: string } = {};
        for (const key in params) {
          if (params[key] !== "") {
            newParams[key] = params[key];
          }
        }
        setSearchParams(newParams);
        // params validation

        res = await axiosPrivate.get(url, {
          params: params,
          timeout,
        });
        setResponse(res?.data);
      } else if (method === "post") {
        const { data } = props;
        res = await axiosPrivate.post(url, data, { timeout });
        setResponse(res?.data);
      } else if (method === "patch") {
        // axiosPrivate.patch
      } else if (method === "put") {
        // axiosPrivate.put()
      } else {
        throw new Error("method is not from get,patch,put,delete !");
      }
    } catch (error: any) {
      console.log("error?.resopnse :>> ", error?.response);
      if (error?.response) {
        // if (error?.response?.status === 400) {
        //   toast.error(error.response.data.message);
        // setErrorFetch({
        //   ...errorFetch,
        //   status: true,
        //   message: error.response.data.message ?? "",
        // });
        // }
        // if not login redirect to login page
        // if (error?.response?.status === 401) {
        //   toast.error("شما وارد نشده اید");
        //   navigate("/login", { state: { from: location }, replace: true });
        // }
        setError(error?.response);

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error?.response?.data);
        console.log(error?.response?.status);
        console.log(error?.response?.headers);
      } else if (error?.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error?.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
      setloading(false);
    }
  };

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

    if (runOnMount) {
      fetchData();
    }
    //  else {
    //   setloading(false);
    // }

    return () => {
      controller.current.abort();
      setloading(false);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
    // return () => {
    //   if (signal) {
    //     controller.current.abort();
    //   }
    // };
  }, [method, url]);

  return {
    response,
    error,
    setError,
    loading,
    controller: controller.current,
    fetchData,
  };
};

export default useAxiosPrivate;
