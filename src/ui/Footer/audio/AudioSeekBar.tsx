import MediaSessionSeek from "@/lib/MediaSession/MediaSessionSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { playBackRate } from "@/lib/MediaSource/playBackRate";
import {
  seekCal,
  sliderPositionCal,
} from "@/lib/MediaSource/SliderPositionCal";
import { TimeFormat } from "@/lib/TimeFormat";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
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
//[todo] : need to create keyevent handler
function AudioSeekBar({ duration }: PropAudioSeek) {
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
  } = useContext(DataContext);
  const [value, setValue] = useState<number>(100);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const copyDataAudio = dataAudio!.current!;
    function handleMouseMove(e: MouseEvent) {
      const newValue = sliderPositionCal({ sliderRef, e });
      setValue(newValue);
    }
    function handleMouseUp(e: MouseEvent) {
      setIsDragging(false);
      const per = seekCal({ sliderRef, e });
      const data = per * copyDataAudio.duration;
      segNum.current = playBackRate({ dataAudio, data, sege, duration });
      loadNextSegment();
    }

    function handleTouchMove(e: TouchEvent) {
      const newValue = sliderPositionCal({ sliderRef, e });
      setValue(newValue);
    }
    function handleTouchEnd(e: TouchEvent) {
      setIsDragging(false);
      const per = seekCal({ sliderRef, e });
      const data = per * copyDataAudio.duration;
      segNum.current = playBackRate({ dataAudio, data, sege, duration });
      loadNextSegment();
    }
    function handleTimeUpdate(e: Event) {
      if (!isDragging) {
        const audioElement = e.currentTarget as HTMLAudioElement;
        const data = Math.round(
          (audioElement.currentTime / audioElement.duration) * 100
        );
        const newValue = 100 - data;
        setValue(newValue);
      }
    }
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }
    copyDataAudio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      copyDataAudio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [dataAudio, duration, isDragging, loadNextSegment, segNum, sege]);
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
    <div
      className="ml-10 border-2 group  h-[30px] w-[600px] flex items-center"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.max(value - 1, 0);
          setValue(newValue);
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
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
          const data = per * duration;
          segNum.current = playBackRate({ dataAudio, data, sege, duration });
          loadNextSegment();
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
    >
      <div
        className="flex-1 h-[8px]  flex bg-blue-700 relative select-none"
        ref={sliderRef}
        onMouseDown={(e) => {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = sliderPositionCal({ sliderRef, e });
          setValue(newValue);
        }}
        onTouchStart={(e) => {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = sliderPositionCal({ sliderRef, e });
          setValue(newValue);
        }}
      >
        <div
          className="bg-red-400  absolute top-0 left-0 h-full"
          style={{
            right: `${value}%`,
          }}
          ref={progressRef}
        ></div>

        <span
          className="absolute   w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]"
          style={{ left: `calc(100% - ${value}%)` }}
        ></span>
      </div>
    </div>
  );
}

export default AudioSeekBar;
