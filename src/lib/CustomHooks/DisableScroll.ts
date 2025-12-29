import { useEffect } from "react";

export function DisableScroll(show: boolean) {
  useEffect(() => {
    function preventDefault(e: WheelEvent | TouchEvent) {
      e.preventDefault();
    }
    const wheelOpt = { passive: false };
    function preventKeyScroll(e: KeyboardEvent) {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (keys.indexOf(e.code) !== -1) {
        e.preventDefault();
      }
    }
    if (show) {
      document.addEventListener("wheel", preventDefault, wheelOpt);
      document.addEventListener("touchmove", preventDefault, wheelOpt);
      document.addEventListener("keydown", preventKeyScroll);
    }
    return () => {
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);

      document.removeEventListener("keydown", preventKeyScroll);
    };
  }, [show]);
}
