import { useEffect } from "react";

export function DisableScroll(show: boolean) {
  useEffect(() => {
    const main = document.querySelector("main")!;
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
      main.addEventListener("wheel", preventDefault, wheelOpt);
      main.addEventListener("touchmove", preventDefault, wheelOpt);
      window.addEventListener("keydown", preventKeyScroll);
    }
    return () => {
      main.removeEventListener("wheel", preventDefault);
      main.removeEventListener("touchmove", preventDefault);

      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [show]);
}
