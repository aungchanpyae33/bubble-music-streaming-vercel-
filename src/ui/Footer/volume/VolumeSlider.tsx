import React from "react";

function VolumeSlider({
  setIsDragging,
  sliderRef,
  setValue,
  value,
  children,
}: {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  sliderRef: React.RefObject<HTMLDivElement | null>;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  children: React.ReactNode;
}) {
  return (
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
      {children}
    </div>
  );
}

export default VolumeSlider;
