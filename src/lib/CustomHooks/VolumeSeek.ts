import { RefObject, useEffect } from "react";
import { sliderPositionCal } from "../MediaSource/SliderPositionCal";
import {
  useVolumeDragging,
  useVolumeValue,
  VolumeDraggingActions,
  VolumeDraggingState,
  VolumeValueActions,
  VolumeValueState,
} from "../zustand";

interface audioSeekProp {
  dataAudio: RefObject<HTMLAudioElement | null>;
  sliderRef: RefObject<HTMLDivElement | null>;
  isPointer: boolean;
  isTouchDevice: boolean;
}
type useAudioSeekReturnType = [
  VolumeValueState["value"],
  VolumeValueActions["setValue"],
  VolumeDraggingState["isDragging"],
  VolumeDraggingActions["setIsDragging"]
];

const useVolumeSeek = ({
  dataAudio,
  sliderRef,
  isPointer,
  isTouchDevice,
}: audioSeekProp): useAudioSeekReturnType => {
  const value = useVolumeValue((state: VolumeValueState) => state.value);
  const setValue = useVolumeValue(
    (state: VolumeValueActions) => state.setValue
  );
  const isDragging = useVolumeDragging(
    (state: VolumeDraggingState) => state.isDragging
  );
  const setIsDragging = useVolumeDragging(
    (state: VolumeDraggingActions) => state.setIsDragging
  );
  useEffect(() => {
    function handleMove(e: PointerEvent | TouchEvent | MouseEvent) {
      const { percentage, seekCalReturn } = sliderPositionCal({
        sliderRef,
        e,
      });
      dataAudio!.current!.volume = seekCalReturn;
      setValue(percentage);
    }
    function handleUp() {
      setIsDragging(false);
    }

    if (isDragging) {
      if (isPointer) {
        document.addEventListener("pointermove", handleMove);
        document.addEventListener("pointerup", handleUp);
      } else {
        if (isTouchDevice) {
          document.addEventListener("touchmove", handleMove);
          document.addEventListener("touchend", handleUp);
        } else {
          document.addEventListener("mousemove", handleMove);
          document.addEventListener("mouseup", handleUp);
        }
      }
    }

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [
    dataAudio,
    isDragging,
    sliderRef,
    isPointer,
    isTouchDevice,
    setValue,
    setIsDragging,
  ]);

  return [value, setValue, isDragging, setIsDragging];
};
export default useVolumeSeek;
