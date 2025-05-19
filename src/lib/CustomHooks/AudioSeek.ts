import { RefObject, useContext, useEffect, useMemo } from "react";
import throttle from "../throttle";
import { seekCal, sliderPositionCal } from "../MediaSource/SliderPositionCal";
import AudioSeeked from "../MediaSource/AudioSeeked";
import {
  AudioDraggingActions,
  AudioDraggingState,
  AudioValueActions,
  AudioValueState,
  SongFunctionState,
  useAudioDragging,
  useAudioValue,
  useSongFunction,
} from "../zustand";
import { DataContext } from "../MediaSource/ContextMedia";
export interface valueProps {
  value: AudioValueState["value"] | undefined;
}
export interface isDraggingProps {
  isDragging: AudioDraggingState["isDragging"] | undefined;
}
interface audioSeekProp {
  sliderRef: RefObject<HTMLDivElement | null>;
  duration: number;
  isPointer: boolean;
  isTouchDevice: boolean;
  url: string;
  shouldRun: boolean;
}
interface useAudioSeekReturnType {
  value: valueProps["value"];
  setValue: AudioValueActions["setValue"];
  isDragging: isDraggingProps["isDragging"];
  setIsDragging: AudioDraggingActions["setIsDragging"];
}

const useAudioSeek = ({
  sliderRef,
  duration,
  isPointer,
  isTouchDevice,
  url,
  shouldRun,
}: audioSeekProp): useAudioSeekReturnType => {
  const value = useAudioValue((state: AudioValueState) =>
    shouldRun ? state.value : undefined
  );
  const setValue = useAudioValue((state: AudioValueActions) => state.setValue);
  const isDragging = useAudioDragging((state: AudioDraggingState) =>
    shouldRun ? state.isDragging : undefined
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
    song_time_stamp,
  } = useContext(DataContext);
  const throttledSetValue = useMemo(
    () => throttle((val: number) => setValue(val), 1000),
    [setValue]
  );
  const Isplay = useSongFunction(
    (state: SongFunctionState) =>
      Object.values(state.Isplay as Record<string, boolean>)[0]
  );

  useEffect(() => {
    const copyDataAudio = dataAudio!.current!;
    let animationFrameId: number;

    function handleMove(e: PointerEvent | TouchEvent | MouseEvent) {
      if (!shouldRun) return;
      const { percentage } = sliderPositionCal({ sliderRef, e });
      setValue(percentage);
    }

    function handleUp(e: PointerEvent | TouchEvent | MouseEvent) {
      if (!shouldRun) return;

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
        fetching,
        abortController,
        song_time_stamp,
      });
    }
    function update() {
      if (!Isplay || !shouldRun || !copyDataAudio || isDragging) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }
      const data = (copyDataAudio.currentTime / copyDataAudio.duration) * 100;
      const newValue = 100 - data;
      throttledSetValue(newValue);
      animationFrameId = requestAnimationFrame(update);
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

    animationFrameId = requestAnimationFrame(update);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(animationFrameId);
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
    shouldRun,
    song_time_stamp,
    throttledSetValue,
    Isplay,
  ]);

  useEffect(() => {
    setValue(100);
  }, [url, setValue]);
  return { value, setValue, isDragging, setIsDragging };
};
export default useAudioSeek;
