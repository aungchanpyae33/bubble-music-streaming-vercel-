import { RefObject, useLayoutEffect, useState } from "react";

type PositionStyle = {
  transform: string;
  height?: string;
};
// adding debounce or throttle make laggy vibe when resize,
export const useToggleContentPosition = ({
  parentRef,
  containerRef,
}: {
  parentRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}): [PositionStyle, React.Dispatch<React.SetStateAction<PositionStyle>>] => {
  const [position, setPosition] = useState<PositionStyle>({
    transform: "translate(0px, 0px)",
  });
  useLayoutEffect(() => {
    const updatePosition = () => {
      const parentEl = parentRef.current;
      const containerEl = containerRef.current;
      if (!parentEl || !containerEl) return;
      const windowHeight = window.innerHeight;
      const targetRect = parentEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const targetTop = targetRect.top;
      const containerHeight = containerRect.height;
      const spaceBelow = windowHeight - targetTop;

      const x =
        targetRect.left < containerRect.width
          ? targetRect.right
          : targetRect.left - containerRect.width;

      const y = (() => {
        if (targetTop < containerHeight) {
          return containerHeight > spaceBelow
            ? targetTop - (containerHeight - spaceBelow)
            : targetTop;
        } else {
          return windowHeight - targetRect.bottom <= 0
            ? targetTop - (containerHeight - spaceBelow)
            : targetRect.bottom - containerHeight;
        }
      })();

      const roundedY = Math.max(Math.round(y), 0);

      setPosition({
        transform: `translate(${x}px, ${roundedY}px)`,
        ...(roundedY === 0 ? { height: "100%" } : {}),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [parentRef, containerRef]);

  return [position, setPosition];
};
