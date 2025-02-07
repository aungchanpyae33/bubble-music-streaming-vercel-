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
      console.log("time");
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
  // function seekFunction(e: eventProp["e"]) {
  //   if (!bottom) {
  //     if (fetching.current) {
  //       if (abortController.current) {
  //         abortController.current.abort();
  //       }
  //       abortController.current = new AbortController();
  //       fetching.current = false;
  //     }

  //     const data = parseFloat(e.currentTarget.value);

  //     segNum.current = playBackRate({ dataAudio, data, sege, duration });
  //     // console.log(segNum.current);
  //     loadNextSegment();
  //   }
  //   setBottom(true);
  // }
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
    <div className="ml-10 border-2 group border-black h-[30px] w-[600px] flex items-center">
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
        ></div>

        <span
          className="absolute   w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]"
          style={{ left: `calc(100% - ${value}%)` }}
        ></span>
      </div>
    </div>
  );
}

//   <input
//     type="range"
//     id="seek-slider"
//     ref={dataInput}
//     // step={bottom ? "0.001" : undefined}
//     max={duration}
//     className=" flex-1"
//     onKeyUp={(e) => {
//       if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
//         seekFunction(e);
//       } else if (e.key !== "Tab") {
//         e.preventDefault();
//       }
//     }}
//     onMouseUp={(e) => {
//       seekFunction(e);
//     }}
//     onTouchEnd={(e) => {
//       seekFunction(e);
//     }}
//     // prevent timeupdate
//     onTouchStart={() => setBottom(false)}
//     onMouseDown={() => setBottom(false)}
//     onKeyDown={(e) => {
//       if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
//         setBottom(false);
//       } else if (e.key !== "Tab") {
//         e.preventDefault();
//       }
//     }}
//     // show changeDuration while seeking without effecting the audio
//     onInput={(e) => {
//       dataCur.current!.textContent = TimeFormat(+e.currentTarget.value);
//     }}
//   />
// );

export default AudioSeekBar;
