import { RefObject } from "react";

interface sliderPositionCalprop {
  sliderRef: RefObject<HTMLDivElement | null>;
  e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent;
}
const getClientX = (
  e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
): number => {
  if ("clientX" in e) {
    return e.clientX;
  } else if ("touches" in e && e.touches.length > 0) {
    return e.touches[0].clientX;
  }
  return 0; // Fallback for empty touch events
};
export const seekCal = ({ sliderRef, e }: sliderPositionCalprop) => {
  const rect = sliderRef!.current!.getBoundingClientRect();
  const offset = getClientX(e) - rect.left;
  return Math.min(Math.max(offset / rect.width, 0), 1);
};
export const sliderPositionCal = ({ sliderRef, e }: sliderPositionCalprop) => {
  const per = seekCal({ sliderRef, e });
  const percentage = per * 100;
  return Math.round(100 - percentage);
};
