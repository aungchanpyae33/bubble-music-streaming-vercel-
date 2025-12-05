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

  // the reason i use use layout effect is obvious , that to run this effect before the layout pain , because i need to the content width , height , etc before paint to calculate the position of its to render
  useLayoutEffect(() => {
    const updatePosition = () => {
      // parent is vertical icon cantainer
      const parentEl = parentRef.current;
      // container is content
      const containerEl = containerRef.current;
      if (!parentEl || !containerEl) return;

      // always use clientWidth and clientHeight when accurate positin is needed like for toggleTip(fixed position)
      // previouse windowidth is not accurate in windowWidth including scrollbar width and aslo inconsistent in resize
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
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
      // calculate how many space is left in below when position in top is not available
      const spaceBelow = viewportHeight - targetBottom;
      //calculate how many space is left in right when postion is left is not available

      const spaceRight = viewportWidth - targetRight;

      // i wll add comment in modify , new , previouse code to explain what is it for future as in later i forget how it works in some component

      // how x component is calculate
      // it has  check -> first check is space available in left, second check is it is  avalile in left go option to left
      const x = (() => {
        const notSpaceAvailableInLeft = targetLeft < containerWidth;
        if (notSpaceAvailableInLeft) {
          // right side option mind

          //  if not left space in left space , check it does it also space in right?
          const notSpaceAvailableInRight = containerWidth > spaceRight;
          if (notSpaceAvailableInRight) {
            // it not space available in right too , then return targetLeft with reduce version
            return targetLeft - (containerWidth - spaceRight);
          } else {
            return targetLeft;
          }
        } else {
          //in left side option mind

          // in resize , this check does target item is not in viewport or not for resize behavior
          const isTargetItemNotInViewPort = viewportWidth - targetRight <= 0;
          if (isTargetItemNotInViewPort) {
            // then return the targetLeft with reduce version
            return targetLeft - (containerWidth - spaceRight);
          } else {
            // if target item is in viewport still , then return relative positino
            // why i use targetLeft instead of right in this case is that not to cover the vertical icon
            return targetLeft - containerWidth;
          }
        }
      })();

      // how y component is calculate
      // it has   check -> first check is space available in top, second check is if it is avalile in top go option to top
      const y = (() => {
        const notSpaceAvailableInTop = targetTop < containerHeight;
        if (notSpaceAvailableInTop) {
          //  bottom side option mind

          //  if not left space in top space , check it does it also space in bottom?
          const notSpaceAvailableInBottom = containerHeight > spaceBelow;
          if (notSpaceAvailableInBottom) {
            // it not space available in bottom too , then return targetTop with reduce version
            return targetTop - (containerHeight - spaceBelow);
          } else {
            return targetTop;
          }
        } else {
          // top side option mind

          // in resize , this check does target item is not in viewport or not for resize behavior
          const isTargetItemNotInViewPort = viewportHeight - targetBottom <= 0;
          if (isTargetItemNotInViewPort) {
            // then return the targetLeft with reduce version
            return targetTop - (containerHeight - spaceBelow);
          } else {
            // if target item is in viewport still , then return relative positino
            // why i use targetBottom safely is because of targetLeft does not cover the vertical icon , i can use bottom
            return targetBottom - containerHeight;
          }
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
