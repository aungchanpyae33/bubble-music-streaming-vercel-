import { useEffect, useState } from "react";

export function useHoverable() {
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hoverQuery = window.matchMedia("(hover: hover)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    const update = () => {
      setIsHoverable(hoverQuery.matches && pointerQuery.matches);
    };

    // Initial check
    update();

    // Update if device mode changes (e.g. tablet attaches keyboard)
    hoverQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);

    return () => {
      hoverQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  return isHoverable; // true or false
}
