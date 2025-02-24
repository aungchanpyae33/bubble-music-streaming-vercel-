import { ReactNode, useMemo, useRef } from "react";
import useAudioSeek from "@/lib/CustomHooks/AudioSeek";
import AudioThumbSlider from "./AudioThumbSlider";
import AudioProgressbar from "./AudioProgressbar";
import AudioSliderActionWrapper from "./AudioSliderActionWrapper";
import AudioSlider from "./AudioSlider";
export interface eventProp {
  e:
    | React.MouseEvent<HTMLInputElement>
    | React.TouchEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>;
}
interface PropAudioSeek extends React.ComponentProps<"div"> {
  duration: number;
  childrenFn: (value: number) => ReactNode;
}

function AudioSeekBar({ duration, childrenFn, className }: PropAudioSeek) {
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
  const [value, setValue, isDragging, setIsDragging] = useAudioSeek({
    sliderRef,
    duration,
    isPointer,
    isTouchDevice,
  });
  return (
    <>
      {childrenFn(value)}
      <div className={className}>
        <AudioProgressbar value={value} progressRef={progressRef} />
        <AudioThumbSlider isDragging={isDragging} value={value} />
      </div>
      <AudioSlider
        sliderRef={sliderRef}
        setIsDragging={setIsDragging}
        duration={duration}
        value={value}
        setValue={setValue}
        progressRef={progressRef}
        className="h-[3px]   sm:h-[25px] w-full sm:flex items-center select-none no-select hidden"
      >
        <AudioSliderActionWrapper
          sliderRef={sliderRef}
          isPointer={isPointer}
          isTouchDevice={isTouchDevice}
          setIsDragging={setIsDragging}
          setValue={setValue}
        >
          <div className=" w-full h-full sm:h-[3px]    bg-blue-700 relative">
            <AudioProgressbar value={value} progressRef={progressRef} />

            <AudioThumbSlider isDragging={isDragging} value={value} />
          </div>
        </AudioSliderActionWrapper>
      </AudioSlider>
    </>
  );
}

export default AudioSeekBar;
