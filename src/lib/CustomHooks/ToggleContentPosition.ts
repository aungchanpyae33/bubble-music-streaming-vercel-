import { RefObject, useLayoutEffect, useState } from "react";

export const useToggleContentPosition = ({
  parentRef,
  containerRef,
}: {
  parentRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const [position, setPosition] = useState({});
  useLayoutEffect(() => {
    const clientHeight = window.innerHeight;

    const parentElement = parentRef!.current!;
    const containerElement = containerRef!.current!;
    const targetRect = parentElement.getBoundingClientRect();
    const containerElementRect = containerElement.getBoundingClientRect();
    const targetTop = targetRect.top;
    const containerHeight = containerElementRect.height;

    const farFromBottom = clientHeight - targetTop;
    function calculateX() {
      return targetRect.left - containerElementRect.width - 10;
    }
    function calculateY() {
      if (targetTop < containerHeight) {
        if (containerHeight > farFromBottom) {
          return targetTop - (containerHeight - farFromBottom);
        } else {
          return targetTop;
        }
      } else {
        return targetRect.bottom - containerHeight;
      }
    }
    const positionX = calculateX();
    const positionY = Math.max(calculateY(), 0);
    setPosition({
      left: `${positionX}px`,
      top: `${positionY}px`,
      height: `calc(100% - ${positionY}px )`,
    });
  }, [parentRef, containerRef]);
  return [position, setPosition];
};
