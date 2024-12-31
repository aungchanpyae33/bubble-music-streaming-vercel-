"use client";
import useTooltipOverflow from "@/lib/CustomHooks/TooltipOverflow";
import clsx from "clsx";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

function ToolTip({ children }: { children: ReactNode }) {
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
          "absolute max-w-[400px] md:max-w-[500px] w-max  z-50 top-0 -translate-y-[110%] left-[50%]  -translate-x-[50%]   outline-2 outline-blue-300  text-sm bg-blue-500",
          { hidden: !tooltipShow.show }
        )}
        style={tooltipShow.toolTipLeft}
        ref={toolTipRef}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        blanditiis, amet voluptate quibusdam incidunt est illum vel ipsam
        nesciunt porro!
        {tooltipShow.show && "hi"}
      </div>
    </div>
  );
}

export default ToolTip;
