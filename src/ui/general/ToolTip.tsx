"use client";
import useTooltipOverflow, {
  tooltipState,
} from "@/lib/CustomHooks/TooltipOverflow";
import debounce from "@/lib/debounce";
import {
  isInsideForOnWheel,
  showToolTipCheck,
} from "@/lib/ToolTip/showToolTipCheck";

import clsx from "clsx";
import { ReactNode, SetStateAction, useCallback, useMemo, useRef } from "react";

//[todo] : in mobile , tooltip  is trigger , need to prevent it
interface onWheelCallbackprop {
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;
  tooltipShow: tooltipState;
  setTooltipShow: React.Dispatch<SetStateAction<tooltipState>>;
}
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
  const tooltipTargetRef = useRef<HTMLDivElement | null>(null);
  const [tooltipShow, setTooltipShow] = useTooltipOverflow({
    toolTipRef,
    tooltipTargetRef,
  });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOutsideBeforeShow = useRef<boolean>(false);
  const isTouchDevice = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    []
  );
  return (
    <div
      className="group relative w-fit max-w-full cursor-pointer
    "
      ref={tooltipTargetRef}
    >
      <div
        onMouseEnter={(e) => {
          if (isTouchDevice) return;
          isOutsideBeforeShow.current = true;
          const targetElement = e.currentTarget;
          if (!setTimeoutRef.current) {
            // console.log("runtoo", setTimeoutRef.current);
            showToolTipCheck({
              setTimeoutRef,
              tooltipShow,
              setTooltipShow,
              targetElement,
              e,
              isEnterEvent: true,
              delay: 1000,
              isOutsideBeforeShow,
            });
          }
        }}
        onWheel={(e) => {
          if (tooltipShow.show) {
            setTooltipShow((pre) => ({
              ...pre,
              show: false,
            }));
          }
        }}
        //{...} is used to inset js expression ,
        // {...(tooltipShow.show && {
        //   onWheel: (e) => {
        //  above comment is for the past idea to add onwheel on condition
        onMouseLeave={() => {
          if (isTouchDevice) return;
          isOutsideBeforeShow.current = true;
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
          " fixed max-w-[450px] md:max-w-[550px] w-max z-20 pointer-events-none px-2 p-1 outline-2 outline-blue-300  text-sm bg-blue-500",
          {
            hidden: !tooltipShow.show,
          }
        )}
        ref={toolTipRef}
        style={tooltipShow.toolTipPosition}
      >
        {tooltipContent}
      </div>
    </div>
  );
}

export default ToolTip;
