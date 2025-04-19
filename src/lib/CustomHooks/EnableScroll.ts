import { RefObject, useEffect } from "react";

export function EnableScroll(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const stopPropagation = (e: WheelEvent | TouchEvent) => {
      e.stopPropagation();
    };

    el.addEventListener("wheel", stopPropagation);
    el.addEventListener("touchmove", stopPropagation);

    return () => {
      el.removeEventListener("wheel", stopPropagation);
      el.removeEventListener("touchmove", stopPropagation);
    };
  }, [containerRef]);
}
