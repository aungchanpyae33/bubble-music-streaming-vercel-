"use client";
import useTooltipOverflow from "@/lib/CustomHooks/TooltipOverflow";
import clsx from "clsx";
import { ReactNode, useRef } from "react";

function ToolTip({
  children,
  tooltipContent,
  tooltipPosition,
}: {
  children: ReactNode;
  tooltipContent: string;
  tooltipPosition: "top" | "bottom" | "right" | "left";
}) {
  const toolTipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipShow, setTooltipShow] = useTooltipOverflow({ toolTipRef });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div className="group relative w-fit max-w-full bg-red-950 cursor-pointer">
      <div
        onMouseEnter={() => {
          console.log("mouse enter");
          setTimeoutRef.current = setTimeout(() => {
            setTooltipShow((pre) => ({
              ...pre,
              show: true,
            }));
          }, 500);
        }}
        onMouseLeave={() => {
          console.log("mouse leave");
          if (setTimeoutRef.current) {
            clearTimeout(setTimeoutRef.current);
            setTimeoutRef.current = null;
          }
          if (tooltipShow.show) {
            setTooltipShow((pre) => ({
              ...pre,
              show: false,
            }));
          }
        }}
      >
        {children}
      </div>

      <div
        className={clsx(
          "absolute max-w-[400px] md:max-w-[500px] w-max  z-50   left-[50%]   -translate-x-[50%] px-2 p-1   outline-2 outline-blue-300  text-sm bg-blue-500",
          {
            hidden: !tooltipShow.show,
            "top-0 -translate-y-[105%]": tooltipPosition === "top",
            "bottom-0 translate-y-[105%]": tooltipPosition === "bottom",
          }
        )}
        style={tooltipShow.toolTipLeft}
        ref={toolTipRef}
      >
        {tooltipContent}
      </div>
    </div>
  );
}

export default ToolTip;
