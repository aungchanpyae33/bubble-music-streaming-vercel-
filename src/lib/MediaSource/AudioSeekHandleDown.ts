import React, { RefObject } from "react";
import { sliderPositionCal } from "./SliderPositionCal";
import { AudioDraggingActions, AudioValueActions } from "../zustand";
interface AudioSeekHandleDownProp {
  sliderRef: RefObject<HTMLDivElement | null>;
  setIsDragging: AudioDraggingActions["setIsDragging"];
  e: React.TouchEvent | React.MouseEvent | React.TouchEvent;
  setValue: AudioValueActions["setValue"];
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
