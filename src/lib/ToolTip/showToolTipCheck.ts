import React, { RefObject } from "react";
import type { tooltipState } from "../CustomHooks/TooltipOverflow";
export function isInsideForEnter(
  targetElement: HTMLDivElement,
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
) {
  const { clientX: x, clientY: y } = e;
  const rect = targetElement.getBoundingClientRect();
  const isPointerInsideForEnter =
    x >= rect.left || x <= rect.right || y >= rect.top || y <= rect.bottom;
  return isPointerInsideForEnter;
}
export function isInsideForOnWheel(
  targetElement: HTMLDivElement,
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
) {
  const { clientX: x, clientY: y } = e;
  const rect = targetElement.getBoundingClientRect();
  const isPointerInsideForEnter =
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  return isPointerInsideForEnter;
}

interface TooltipProps {
  setTimeoutRef: RefObject<ReturnType<typeof setTimeout> | null>;
  tooltipShow: tooltipState;
  setTooltipShow: React.Dispatch<React.SetStateAction<tooltipState>>;
  targetElement: HTMLDivElement;
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;
  isEnterEvent: boolean;
  delay: number;
  isOutsideBeforeShow: RefObject<boolean>;
}

export const showToolTipCheck = ({
  setTimeoutRef,
  tooltipShow,
  setTooltipShow,
  targetElement,
  e,
  isEnterEvent,
  delay,
  isOutsideBeforeShow,
}: TooltipProps) => {
  setTimeoutRef.current = setTimeout(() => {
    const isPointerInside = isEnterEvent
      ? isInsideForEnter(targetElement, e)
      : isInsideForOnWheel(targetElement, e);
    // console.log(isPointerInside);
    if (isPointerInside && !tooltipShow.show) {
      setTooltipShow((pre) => ({
        ...pre,
        show: true,
      }));
      isOutsideBeforeShow.current = false;
    }
  }, delay);
};
