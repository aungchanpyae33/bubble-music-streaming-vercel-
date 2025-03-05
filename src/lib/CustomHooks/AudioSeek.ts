import { RefObject, useContext, useEffect } from "react";
import throttle from "../throttle";
import { seekCal, sliderPositionCal } from "../MediaSource/SliderPositionCal";
import AbortFetch from "../MediaSource/AbortFetch";
import AudioSeeked from "../MediaSource/AudioSeeked";
import DataContext from "../MediaSource/ContextMedia";
import {
  AudioDraggingActions,
  AudioDraggingState,
  AudioValueActions,
  AudioValueState,
  useAudioDragging,
  useAudioValue,
} from "../zustand";

interface audioSeekProp {
  sliderRef: RefObject<HTMLDivElement | null>;
  duration: number;
  isPointer: boolean;
  isTouchDevice: boolean;
}
interface useAudioSeekReturnType {
  value: AudioValueState["value"];
  setValue: AudioValueActions["setValue"];
  isDragging: AudioDraggingState["isDragging"];
  setIsDragging: AudioDraggingActions["setIsDragging"];
}

const useAudioSeek = ({
  sliderRef,
  duration,
  isPointer,
  isTouchDevice,
}: audioSeekProp): useAudioSeekReturnType => {
  const value = useAudioValue((state: AudioValueState) => state.value);
  const setValue = useAudioValue((state: AudioValueActions) => state.setValue);
  const isDragging = useAudioDragging(
    (state: AudioDraggingState) => state.isDragging
  );
  const setIsDragging = useAudioDragging(
    (state: AudioDraggingActions) => state.setIsDragging
  );
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
    bufferThreshold,
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
      AudioSeeked({
        per,
        duration,
        dataAudio,
        sege,
        segNum,
        loadNextSegment,
        bufferThreshold,
      });
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
    setIsDragging,
    setValue,
    bufferThreshold,
  ]);

  return { value, setValue, isDragging, setIsDragging };
};
export default useAudioSeek;
