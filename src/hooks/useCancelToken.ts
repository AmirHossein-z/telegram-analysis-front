import { useEffect, useState } from "react";
import axios, { CancelToken } from "axios";

type UseCancelTokenType = {
  cancelToken: CancelToken | undefined;
  cancel: () => void;
};

// for preventing memory leaks in front-end
const useCancelToken = (): UseCancelTokenType => {
  const [cancelToken, setCancelToken] = useState<CancelToken | undefined>();

  useEffect(() => {
    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken.token);

    return () => {
      newCancelToken.cancel("Request canceled by user.");
    };
  }, []);

  const cancel = () => {
    if (cancelToken) {
      axios.CancelToken.source().cancel("Request canceled by user.");
    }
  };

  return { cancelToken, cancel };
};

export default useCancelToken;
