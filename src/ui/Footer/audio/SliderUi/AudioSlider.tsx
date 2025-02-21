import AbortFetch from "@/lib/MediaSource/AbortFetch";
import AudioSeeked from "@/lib/MediaSource/AudioSeeked";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { ReactNode, RefObject, SetStateAction, useContext } from "react";
function AudioSlider({
  sliderRef,
  setIsDragging,
  duration,
  value,
  setValue,
  progressRef,
  children,
}: {
  sliderRef: RefObject<HTMLDivElement | null>;
  setIsDragging: React.Dispatch<SetStateAction<boolean>>;
  duration: number;
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
  progressRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
  } = useContext(DataContext);
  return (
    <div
      className=" h-[3px] hidden  sm:h-[25px] w-full sm:flex items-center select-none no-select"
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.max(value - 1, 0);
          setValue(newValue);
        } else if (e.key === "ArrowLeft") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.min(value + 1, 100);
          setValue(newValue);
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
      {children}
    </div>
  );
}

export default AudioSlider;
