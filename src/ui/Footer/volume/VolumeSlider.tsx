import clsx from "clsx";
import React, { RefObject } from "react";

function VolumeSlider({
  isDragging,
  setIsDragging,
  sliderRef,
  dataAudio,
  setValue,
  value,
  children,
}: {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  dataAudio: RefObject<HTMLAudioElement | null>;
  sliderRef: React.RefObject<HTMLDivElement | null>;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "group-hover:flex   h-[25px] w-full  md:flex items-center select-none no-select",
        {
          hidden: !isDragging,
        }
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.max(value - 1, 0);
          const volValue = 1 - newValue / 100;
          dataAudio.current!.volume = volValue;
          setValue(newValue);
        } else if (e.key === "ArrowLeft") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.min(value + 1, 100);
          const volValue = 1 - newValue / 100;
          dataAudio.current!.volume = volValue;
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
      {children}
    </div>
  );
}

export default VolumeSlider;
