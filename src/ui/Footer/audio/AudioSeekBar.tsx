import MediaSessionSeek from "@/lib/MediaSession/MediaSessionSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { sliderPositionCal } from "@/lib/MediaSource/SliderPositionCal";

import { RefObject, useContext, useMemo, useRef } from "react";
import TimeIndicatorCur from "./TimeIndicatorCur";
import useAudioSeek from "@/lib/CustomHooks/AudioSeek";
import AudioSeeking from "@/lib/MediaSource/AudioSeeking";
import AbortFetch from "@/lib/MediaSource/AbortFetch";
import AudioSeeked from "@/lib/MediaSource/AudioSeeked";
export interface eventProp {
  e:
    | React.MouseEvent<HTMLInputElement>
    | React.TouchEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>;
}
interface PropAudioSeek {
  dataCur: RefObject<HTMLSpanElement | null>;
  bottom: boolean;
  setBottom: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  dataInput: RefObject<HTMLInputElement | null>;
}

function AudioSeekBar({ duration }: PropAudioSeek) {
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
  } = useContext(DataContext);
  const isPointer = useMemo(() => "onpointerdown" in window, []);
  const isTouchDevice = useMemo(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    []
  );
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue, timePosition, setTimePosition, setIsDragging] =
    useAudioSeek({
      dataAudio,
      sliderRef,
      duration,
      segNum,
      sege,
      abortController,
      fetching,
      loadNextSegment,
      isPointer,
      isTouchDevice,
    });

  MediaSessionSeek(
    fetching,
    abortController,
    segNum,
    dataAudio,
    sege,
    loadNextSegment,
    duration
  );

  return (
    <>
      <TimeIndicatorCur timePosition={timePosition} />
      <div
        className="border-2 group  h-[25px] w-full flex items-center select-none no-select"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            if (!sliderRef.current) return;
            setIsDragging(true);
            const newValue = Math.max(value - 1, 0);
            AudioSeeking({ newValue, duration, setValue, setTimePosition });
          } else if (e.key === "ArrowLeft") {
            if (!sliderRef.current) return;
            setIsDragging(true);
            const newValue = Math.min(value + 1, 100);
            AudioSeeking({ newValue, duration, setValue, setTimePosition });
          } else if (e.key !== "Tab") {
            e.preventDefault();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            AbortFetch(fetching, abortController);
            setIsDragging(false);
            const offsetWidth =
              progressRef!.current!.getBoundingClientRect().width;
            const per = Math.min(
              Math.max(
                offsetWidth / sliderRef!.current!.getBoundingClientRect().width,
                0
              ),
              1
            );
            AudioSeeked({
              per,
              duration,
              dataAudio,
              sege,
              segNum,
              loadNextSegment,
            });
          } else if (e.key !== "Tab") {
            e.preventDefault();
          }
        }}
      >
        <div
          className="flex-1 h-full flex items-center justify-center cursor-pointer touch-none "
          ref={sliderRef}
          {...(isPointer
            ? {
                onPointerDown: (e) => {
                  if (!sliderRef.current) return;
                  setIsDragging(true);
                  const newValue = sliderPositionCal({ sliderRef, e });
                  AudioSeeking({
                    newValue,
                    duration,
                    setValue,
                    setTimePosition,
                  });
                },
              }
            : isTouchDevice
            ? {
                onTouchStart: (e) => {
                  if (!sliderRef.current) return;
                  setIsDragging(true);
                  const newValue = sliderPositionCal({ sliderRef, e });
                  AudioSeeking({
                    newValue,
                    duration,
                    setValue,
                    setTimePosition,
                  });
                },
              }
            : {
                onMouseDown: (e) => {
                  if (!sliderRef.current) return;
                  setIsDragging(true);
                  const newValue = sliderPositionCal({ sliderRef, e });
                  AudioSeeking({
                    newValue,
                    duration,
                    setValue,
                    setTimePosition,
                  });
                },
              })}
        >
          <div className=" w-full h-[8px]    bg-blue-700 relative">
            <div
              className="bg-red-400  absolute top-0 left-0 h-full"
              style={{
                right: `${value}%`,
              }}
              ref={progressRef}
            ></div>

            <span
              className="absolute group-hover:inline hidden group-focus:inline    w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]"
              style={{ left: `calc(100% - ${value}%)` }}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioSeekBar;
