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
interface closeTooltipProp {
  setTimeoutRef: RefObject<ReturnType<typeof setTimeout> | null>;
  tooltipShow: tooltipState;
  setTooltipShow: React.Dispatch<React.SetStateAction<tooltipState>>;
  isOutsideBeforeShow: RefObject<boolean>;
  isTouchDevice: boolean;
}
export function closeTooltip({
  isTouchDevice,
  isOutsideBeforeShow,
  setTimeoutRef,
  tooltipShow,
  setTooltipShow,
}: closeTooltipProp) {
  if (isTouchDevice) return;
  isOutsideBeforeShow.current = false;
  if (setTimeoutRef.current) {
    clearTimeout(setTimeoutRef.current);
    setTimeoutRef.current = null;
  }
  if (tooltipShow.show) {
    setTooltipShow((pre) => ({
      ...pre,
      show: false,
    }));
  }
}

interface TooltipProps {
  setTimeoutRef: RefObject<ReturnType<typeof setTimeout> | null>;
  tooltipShow: tooltipState;
  setTooltipShow: React.Dispatch<React.SetStateAction<tooltipState>>;
  targetElement: HTMLDivElement;
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;
  delay: number;
  isOutsideBeforeShow: RefObject<boolean>;
}

export const showToolTipCheck = ({
  setTimeoutRef,
  tooltipShow,
  setTooltipShow,
  targetElement,
  e,
  delay,
  isOutsideBeforeShow,
}: TooltipProps) => {
  setTimeoutRef.current = setTimeout(() => {
    const isPointerInside = isInsideForEnter(targetElement, e);
    if (isPointerInside && !tooltipShow.show && isOutsideBeforeShow.current) {
      setTooltipShow((pre) => ({
        ...pre,
        show: true,
      }));
      isOutsideBeforeShow.current = false;
    }
  }, delay);
};
