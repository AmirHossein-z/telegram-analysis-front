import { useEffect, useState } from "react";

const useAbortController = (signalState: boolean) => {
  const [signal, setSignal] = useState(signalState);

  const controller = new AbortController();
  useEffect(() => {
    return () => {
      if (signal) {
        controller.abort();
      }
    };
  }, []);

  return { controller, setSignal };
};

export default useAbortController;
