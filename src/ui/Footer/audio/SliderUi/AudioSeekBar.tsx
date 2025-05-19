import { ReactNode, useContext, useMemo, useRef } from "react";
import useAudioSeek, { valueProps } from "@/lib/CustomHooks/AudioSeek";
import AudioThumbSlider from "./AudioThumbSlider";
import AudioProgressbar from "./AudioProgressbar";
import AudioSliderActionWrapper from "./AudioSliderActionWrapper";
import AudioSlider from "./AudioSlider";
import clsx from "clsx";
import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
export interface eventProp {
  e:
    | React.MouseEvent<HTMLInputElement>
    | React.TouchEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>;
}
interface PropAudioSeek extends React.ComponentProps<"div"> {
  duration: number;
  hideSliderInSmScreen: boolean;
  childrenFn: (value: valueProps["value"]) => ReactNode;
  url: string;
  isFull: boolean;
}

function AudioSeekBar({
  duration,
  childrenFn,
  className,
  hideSliderInSmScreen,
  url,
  isFull,
}: PropAudioSeek) {
  const { open } = useContext(Context);
  const isPointer = useMemo(
    () => typeof window !== "undefined" && "onpointerdown" in window,
    []
  );

  const shouldRun = useMemo(() => (isFull ? open : !open), [isFull, open]);

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
    url,
    shouldRun,
  });
  return (
    <>
      {childrenFn(value!)}
      <div className={className}>
        <AudioProgressbar value={value} progressRef={progressRef} />
        <AudioThumbSlider
          className={clsx(
            "absolute group-hover:inline  w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2 -translate-x-[10px]",
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
        className={clsx(
          "h-[25px] w-full  items-center px-[7px] select-none no-select",
          {
            "hidden sm:flex": hideSliderInSmScreen,
            flex: !hideSliderInSmScreen,
          }
        )}
      >
        <AudioSliderActionWrapper
          sliderRef={sliderRef}
          isPointer={isPointer}
          isTouchDevice={isTouchDevice}
          setIsDragging={setIsDragging}
          setValue={setValue}
        >
          <div className=" w-full h-[2.5px]    bg-[rgba(255,255,255,0.2)] relative">
            <AudioProgressbar value={value} progressRef={progressRef} />

            <AudioThumbSlider
              className={clsx(
                "absolute group-hover:inline  w-[14px] rounded-full h-[14px] top-1/2 -translate-y-1/2 -translate-x-[7px] bg-white",
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
