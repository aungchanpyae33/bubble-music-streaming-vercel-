import { RefObject, useEffect } from "react";

export function useEnableScroll(
  containerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const stopPropagation = (e: WheelEvent | TouchEvent) => {
      e.stopPropagation();
    };

    el.addEventListener("wheel", stopPropagation, { passive: true });
    el.addEventListener("touchmove", stopPropagation, { passive: true });

    return () => {
      el.removeEventListener("wheel", stopPropagation);
      el.removeEventListener("touchmove", stopPropagation);
    };
  }, [containerRef]);
}
