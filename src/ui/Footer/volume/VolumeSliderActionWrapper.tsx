import { sliderPositionCal } from "@/lib/MediaSource/SliderPositionCal";
import { RefObject } from "react";

function VolumeSliderActionWrapper({
  sliderRef,
  isPointer,
  isTouchDevice,
  setIsDragging,
  dataAudio,
  setValue,
  children,
}: {
  sliderRef: RefObject<HTMLDivElement | null>;
  isPointer: boolean;
  isTouchDevice: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  dataAudio: RefObject<HTMLAudioElement | null>;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
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
      {children}
    </div>
  );
}

export default VolumeSliderActionWrapper;
