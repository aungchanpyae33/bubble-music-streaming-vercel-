import { ReactNode, useMemo, useRef } from "react";
import useAudioSeek from "@/lib/CustomHooks/AudioSeek";
import AudioThumbSlider from "./AudioThumbSlider";
import AudioProgressbar from "./AudioProgressbar";
import AudioSliderActionWrapper from "./AudioSliderActionWrapper";
import AudioSlider from "./AudioSlider";
import clsx from "clsx";
export interface eventProp {
  e:
    | React.MouseEvent<HTMLInputElement>
    | React.TouchEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>;
}
interface PropAudioSeek extends React.ComponentProps<"div"> {
  duration: number;
  hideSliderInSmScreen: boolean;
  childrenFn: (value: number) => ReactNode;
}

function AudioSeekBar({
  duration,
  childrenFn,
  className,
  hideSliderInSmScreen,
}: PropAudioSeek) {
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
  const { value, setValue, isDragging, setIsDragging } = useAudioSeek({
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
        <AudioThumbSlider
          className={clsx(
            "absolute group-hover:inline  w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]",
            {
              hidden: !isDragging,
              inline: isDragging,
            }
          )}
          value={value}
        />
      </div>
      <AudioSlider
        sliderRef={sliderRef}
        setIsDragging={setIsDragging}
        duration={duration}
        value={value}
        setValue={setValue}
        progressRef={progressRef}
        className={clsx("h-[25px] w-full  items-center select-none no-select", {
          "hidden sm:flex": hideSliderInSmScreen,
          flex: !hideSliderInSmScreen,
        })}
      >
        <AudioSliderActionWrapper
          sliderRef={sliderRef}
          isPointer={isPointer}
          isTouchDevice={isTouchDevice}
          setIsDragging={setIsDragging}
          setValue={setValue}
        >
          <div className=" w-full h-[5px]    bg-blue-700 relative">
            <AudioProgressbar value={value} progressRef={progressRef} />

            <AudioThumbSlider
              className={clsx(
                "absolute group-hover:inline  w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 bg-black -translate-x-[10px]",
                {
                  hidden: !isDragging,
                  inline: isDragging,
                }
              )}
              value={value}
            />
          </div>
        </AudioSliderActionWrapper>
      </AudioSlider>
    </>
  );
}

export default AudioSeekBar;
