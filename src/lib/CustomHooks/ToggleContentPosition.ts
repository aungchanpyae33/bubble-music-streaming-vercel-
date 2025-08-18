import { RefObject, useLayoutEffect, useRef, useState } from "react";

type PositionStyle = {
  transform: string;
  height?: string;
  maxHeight?: string;
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
  const initialHeightRef = useRef<number | null>(null);
  useLayoutEffect(() => {
    const updatePosition = () => {
      const parentEl = parentRef.current;
      const containerEl = containerRef.current;
      if (!parentEl || !containerEl) return;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const targetRect = parentEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const targetTop = targetRect.top;
      const targetLeft = targetRect.left;
      const targetRight = targetRect.right;
      const targetBottom = targetRect.bottom;
      const containerHeight = containerRect.height;
      const containerWidth = containerRect.width;
      if (initialHeightRef.current === null) {
        initialHeightRef.current = containerRect.height;
      }

      const spaceBelow = windowHeight - targetTop;

      const x = (() => {
        if (targetLeft < containerWidth) {
          return targetRight;
        } else {
          if (targetLeft > windowWidth) {
            return windowWidth - containerWidth;
          }
          return targetLeft - containerWidth;
        }
      })();

      const y = (() => {
        if (targetTop < containerHeight) {
          return containerHeight > spaceBelow
            ? targetTop - (containerHeight - spaceBelow)
            : targetTop;
        } else {
          return windowHeight - targetBottom <= 0
            ? targetTop - (containerHeight - spaceBelow)
            : targetBottom - containerHeight;
        }
      })();

      const roundedY = Math.max(Math.round(y), 0);
      const roundedX = Math.max(Math.round(x), 0);

      setPosition({
        transform: `translate(${roundedX}px, ${roundedY}px)`,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [parentRef, containerRef]);

  return [position, setPosition];
};
