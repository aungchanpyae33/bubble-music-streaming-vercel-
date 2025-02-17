import AudioSeekHandleDown from "@/lib/MediaSource/AudioSeekHandleDown";
import { ReactNode, RefObject, SetStateAction } from "react";

function AudioSliderActionWrapper({
  sliderRef,
  isPointer,
  isTouchDevice,
  setIsDragging,
  setValue,
  children,
}: {
  sliderRef: RefObject<HTMLDivElement | null>;
  isPointer: boolean;
  isTouchDevice: boolean;
  setIsDragging: React.Dispatch<SetStateAction<boolean>>;
  setValue: React.Dispatch<SetStateAction<number>>;
  children: ReactNode;
}) {
  return (
    <div
      className="flex-1 h-full group flex items-center justify-center cursor-pointer touch-none "
      ref={sliderRef}
      {...(isPointer
        ? {
            onPointerDown: (e) => {
              AudioSeekHandleDown({ sliderRef, e, setIsDragging, setValue });
            },
          }
        : isTouchDevice
        ? {
            onTouchStart: (e) => {
              AudioSeekHandleDown({ sliderRef, e, setIsDragging, setValue });
            },
          }
        : {
            onMouseDown: (e) => {
              AudioSeekHandleDown({ sliderRef, e, setIsDragging, setValue });
            },
          })}
    >
      {children}
    </div>
  );
}

export default AudioSliderActionWrapper;
