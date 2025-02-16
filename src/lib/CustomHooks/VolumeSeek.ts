import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { seekCal, sliderPositionCal } from "../MediaSource/SliderPositionCal";

interface audioSeekProp {
  dataAudio: RefObject<HTMLAudioElement | null>;
  sliderRef: RefObject<HTMLDivElement | null>;
  isPointer: boolean;
  isTouchDevice: boolean;
}
type useAudioSeekReturnType = [
  number,
  Dispatch<SetStateAction<number>>,
  boolean,
  Dispatch<SetStateAction<boolean>>
];

const useVolumeSeek = ({
  dataAudio,
  sliderRef,
  isPointer,
  isTouchDevice,
}: audioSeekProp): useAudioSeekReturnType => {
  const [value, setValue] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
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
  }, [dataAudio, isDragging, sliderRef, isPointer, isTouchDevice]);

  return [value, setValue, isDragging, setIsDragging];
};
export default useVolumeSeek;
