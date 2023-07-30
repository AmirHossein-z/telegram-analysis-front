import { useEffect, useRef, useState } from "react";

const useAbortController = (signalState: boolean) => {
  const [signal, setSignal] = useState(signalState);
  const controller = useRef(new AbortController());

  useEffect(() => {
    controller.current = new AbortController();
    return () => {
      // if (signal) {
      controller.current.abort();
      // }
    };
  }, []);

  return { controller: controller.current, setSignal };
};

export default useAbortController;
