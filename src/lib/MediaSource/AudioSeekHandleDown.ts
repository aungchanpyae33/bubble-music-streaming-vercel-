import React, { RefObject, SetStateAction } from "react";
import { sliderPositionCal } from "./SliderPositionCal";
interface AudioSeekHandleDownProp {
  sliderRef: RefObject<HTMLDivElement | null>;
  setIsDragging: React.Dispatch<SetStateAction<boolean>>;
  e: React.TouchEvent | React.MouseEvent | React.TouchEvent;
  setValue: React.Dispatch<SetStateAction<number>>;
}
const AudioSeekHandleDown = ({
  sliderRef,
  setIsDragging,
  e,
  setValue,
}: AudioSeekHandleDownProp) => {
  if (!sliderRef.current) return;
  setIsDragging(true);
  const { percentage } = sliderPositionCal({ sliderRef, e });
  setValue(percentage);
};
export default AudioSeekHandleDown;
