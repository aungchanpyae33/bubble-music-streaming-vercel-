import { useState, useEffect } from "react";
type MediaQuery = `(width ${">=" | "<=" | ">" | "<"} ${string})`;
const useScreenSize = (query: MediaQuery) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    setMatches(media.matches);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
export default useScreenSize;
