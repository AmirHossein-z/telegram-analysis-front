import { useEffect } from "react";

const useAbortController = () => {
  const controller = new AbortController();
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  return { controller };
};

export default useAbortController;
