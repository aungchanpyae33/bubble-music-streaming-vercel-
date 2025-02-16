import { sliderPositionCal } from "@/lib/MediaSource/SliderPositionCal";
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
              if (!sliderRef.current) return;
              setIsDragging(true);
              const { percentage } = sliderPositionCal({ sliderRef, e });
              setValue(percentage);
            },
          }
        : isTouchDevice
        ? {
            onTouchStart: (e) => {
              if (!sliderRef.current) return;
              setIsDragging(true);
              const { percentage } = sliderPositionCal({ sliderRef, e });
              setValue(percentage);
            },
          }
        : {
            onMouseDown: (e) => {
              if (!sliderRef.current) return;
              setIsDragging(true);
              const { percentage } = sliderPositionCal({ sliderRef, e });
              setValue(percentage);
            },
          })}
    >
      {children}
    </div>
  );
}

export default AudioSliderActionWrapper;
