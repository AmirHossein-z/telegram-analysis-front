import { useEffect, useState } from "react";

const useMediaMatch = (minWidth: number) => {
  const [media, setMedia] = useState(
    window.matchMedia(`(min-width:${minWidth}px)`).matches
  );

  const setState = (event: MediaQueryListEvent) => {
    setMedia(event.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width:${minWidth}px)`);

    mediaQuery.addEventListener("change", setState);

    return () => {
      mediaQuery.removeEventListener("change", setState);
    };
  }, []);

  return [media, setMedia];
};

export default useMediaMatch;
