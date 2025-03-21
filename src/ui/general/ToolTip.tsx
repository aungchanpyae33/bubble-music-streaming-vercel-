"use client";
import useTooltipOverflow, {
  tooltipState,
} from "@/lib/CustomHooks/TooltipOverflow";
import { closeTooltip, showToolTipCheck } from "@/lib/ToolTip/showToolTipCheck";
import clsx from "clsx";
import { ReactNode, SetStateAction, useCallback, useMemo, useRef } from "react";

interface onWheelCallbackprop {
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;
  tooltipShow: tooltipState;
  setTooltipShow: React.Dispatch<SetStateAction<tooltipState>>;
}
function ToolTip({
  children,
  tooltipContent,
}: {
  children: ReactNode;
  tooltipContent: string;
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
            showToolTipCheck({
              setTimeoutRef,
              tooltipShow,
              setTooltipShow,
              targetElement,
              e,
              delay: 1000,
              isOutsideBeforeShow,
            });
          }
        }}
        onWheel={() =>
          closeTooltip({
            isTouchDevice,
            isOutsideBeforeShow,
            setTimeoutRef,
            tooltipShow,
            setTooltipShow,
          })
        }
        //{...} is used to inset js expression ,
        // {...(tooltipShow.show && {
        //   onWheel: (e) => {
        //  above comment is for the past idea to add onwheel on condition
        onMouseLeave={() =>
          closeTooltip({
            isTouchDevice,
            isOutsideBeforeShow,
            setTimeoutRef,
            tooltipShow,
            setTooltipShow,
          })
        }
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
