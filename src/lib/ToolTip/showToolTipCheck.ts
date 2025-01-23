import React, { RefObject } from "react";
import type { tooltipState } from "../CustomHooks/TooltipOverflow";
export function isInside(
  targetElement: HTMLDivElement,
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
) {
  const { clientX: x, clientY: y } = e;
  const rect = targetElement.getBoundingClientRect();
  const isPointerInside =
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  return isPointerInside;
}
export const showToolTipCheck = (
  setTimeoutRef: RefObject<ReturnType<typeof setTimeout> | null>,
  tooltipShow: tooltipState,
  setTooltipShow: React.Dispatch<React.SetStateAction<tooltipState>>,
  targetElement: HTMLDivElement,
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
) => {
  setTimeoutRef.current = setTimeout(() => {
    const isPointerInside = isInside(targetElement, e);
    if (isPointerInside && !tooltipShow.show) {
      setTooltipShow((pre) => ({
        ...pre,
        show: true,
      }));
    }
  }, 1000);
};
