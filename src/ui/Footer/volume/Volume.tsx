import useVolumeSeek from "@/lib/CustomHooks/VolumeSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { sliderPositionCal } from "@/lib/MediaSource/SliderPositionCal";
import { useContext, useMemo, useRef } from "react";
import AudioThumbSlider from "../audio/SliderUi/AudioThumbSlider";
import AudioProgressbar from "../audio/SliderUi/AudioProgressbar";

function Volume() {
  const { dataAudio } = useContext(DataContext);
  const isPointer = useMemo(
    () => typeof window !== "undefined" && "onpointerdown" in window,
    []
  );
  const isTouchDevice = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    []
  );
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue, isDragging, setIsDragging] = useVolumeSeek({
    dataAudio,
    sliderRef,
    isPointer,
    isTouchDevice,
  });
  return (
    <div className="bg-white flex-1 ">
      <div
        className="border-2   h-[25px] w-full flex items-center select-none no-select"
        tabIndex={0}
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
            setIsDragging(false);
          } else if (e.key !== "Tab") {
            e.preventDefault();
          }
        }}
      >
        <div
          className="flex-1 h-full group flex items-center justify-center cursor-pointer touch-none "
          ref={sliderRef}
          {...(isPointer
            ? {
                onPointerDown: (e) => {
                  if (!sliderRef.current) return;
                  setIsDragging(true);
                  const { percentage, seekCalReturn } = sliderPositionCal({
                    sliderRef,
                    e,
                  });
                  dataAudio!.current!.volume = seekCalReturn;
                  setValue(percentage);
                },
              }
            : isTouchDevice
            ? {
                onTouchStart: (e) => {
                  if (!sliderRef.current) return;
                  setIsDragging(true);
                  const { percentage, seekCalReturn } = sliderPositionCal({
                    sliderRef,
                    e,
                  });
                  dataAudio!.current!.volume = seekCalReturn;
                  setValue(percentage);
                },
              }
            : {
                onMouseDown: (e) => {
                  if (!sliderRef.current) return;
                  setIsDragging(true);
                  const { percentage, seekCalReturn } = sliderPositionCal({
                    sliderRef,
                    e,
                  });
                  dataAudio!.current!.volume = seekCalReturn;
                  setValue(percentage);
                },
              })}
        >
          <div className=" w-full h-[2px]   bg-blue-700 relative">
            <AudioProgressbar value={value} progressRef={progressRef} />

            <AudioThumbSlider value={value} isDragging={isDragging} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volume;
