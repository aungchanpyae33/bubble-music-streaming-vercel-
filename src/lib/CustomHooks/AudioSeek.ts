import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import throttle from "../throttle";
import { seekCal, sliderPositionCal } from "../MediaSource/SliderPositionCal";
import AbortFetch from "../MediaSource/AbortFetch";
import AudioSeeked from "../MediaSource/AudioSeeked";

interface audioSeekProp {
  dataAudio: RefObject<HTMLAudioElement | null>;
  sliderRef: RefObject<HTMLDivElement | null>;
  duration: number;
  segNum: RefObject<number>;
  sege: number | undefined;
  loadNextSegment: () => void;
  fetching: RefObject<boolean>;
  abortController: RefObject<AbortController | null>;
  isPointer: boolean;
  isTouchDevice: boolean;
}
type useAudioSeekReturnType = [
  number,
  Dispatch<SetStateAction<number>>,
  boolean,
  Dispatch<SetStateAction<boolean>>
];

const useAudioSeek = ({
  dataAudio,
  sliderRef,
  duration,
  segNum,
  sege,
  loadNextSegment,
  fetching,
  abortController,
  isPointer,
  isTouchDevice,
}: audioSeekProp): useAudioSeekReturnType => {
  const [value, setValue] = useState<number>(100);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const copyDataAudio = dataAudio!.current!;
    const throttledHandleTimeUpdate = throttle(handleTimeUpdate, 1000);
    function handleMove(e: PointerEvent | TouchEvent | MouseEvent) {
      const { percentage } = sliderPositionCal({ sliderRef, e });
      setValue(percentage);
    }
    function handleUp(e: PointerEvent | TouchEvent | MouseEvent) {
      AbortFetch(fetching, abortController);
      setIsDragging(false);
      const per = seekCal({ sliderRef, e });
      AudioSeeked({ per, duration, dataAudio, sege, segNum, loadNextSegment });
    }

    function handleTimeUpdate(e: Event) {
      if (!isDragging) {
        const audioElement = e.currentTarget as HTMLAudioElement;
        const data = (audioElement.currentTime / audioElement.duration) * 100;
        const newValue = 100 - data;
        setValue(newValue);
      }
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
    copyDataAudio.addEventListener("timeupdate", throttledHandleTimeUpdate);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      copyDataAudio.removeEventListener(
        "timeupdate",
        throttledHandleTimeUpdate
      );
    };
  }, [
    dataAudio,
    duration,
    isDragging,
    loadNextSegment,
    segNum,
    sege,
    sliderRef,
    abortController,
    fetching,
    isPointer,
    isTouchDevice,
  ]);

  return [value, setValue, isDragging, setIsDragging];
};
export default useAudioSeek;
