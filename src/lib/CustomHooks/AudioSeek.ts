import {
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import throttle from "../throttle";
import { seekCal, sliderPositionCal } from "../MediaSource/SliderPositionCal";
import AbortFetch from "../MediaSource/AbortFetch";
import AudioSeeked from "../MediaSource/AudioSeeked";
import DataContext from "../MediaSource/ContextMedia";

interface audioSeekProp {
  sliderRef: RefObject<HTMLDivElement | null>;
  duration: number;
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
  sliderRef,
  duration,
  isPointer,
  isTouchDevice,
}: audioSeekProp): useAudioSeekReturnType => {
  const [value, setValue] = useState<number>(100);
  const [isDragging, setIsDragging] = useState(false);
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
  } = useContext(DataContext);
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
          document.addEventListener("touchmove", handleMove, { passive: true });
          document.addEventListener("touchend", handleUp, { passive: true });
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
