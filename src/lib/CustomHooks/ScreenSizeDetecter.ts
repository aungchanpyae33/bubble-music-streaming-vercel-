import { useState, useEffect } from "react";
type MediaQuery = `(width ${">=" | "<=" | ">" | "<"} ${string})`;
const useScreenSize = (query: MediaQuery) => {
  // Initializer Function: Calculate the initial state directly in useState.
  const [matches, setMatches] = useState(() => {
    // Safety check: If  rendering on the server (no window), default to false.
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }
    // Calculate the initial value only once during the initial render.
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};
export default useScreenSize;
