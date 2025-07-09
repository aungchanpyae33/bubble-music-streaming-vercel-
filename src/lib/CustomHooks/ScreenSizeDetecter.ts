import { useState, useEffect } from "react";
type MediaQuery = `(width ${">=" | "<=" | ">" | "<"} ${string})`;
const useScreenSize = (query: MediaQuery) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      // @ts-ignore: addListener is deprecated but still needed for older Safari 2020
      media.addListener(listener);
    }
    setMatches(media.matches);
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        // @ts-ignore: addListener is deprecated but still needed for older Safaric 2020
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};
export default useScreenSize;
