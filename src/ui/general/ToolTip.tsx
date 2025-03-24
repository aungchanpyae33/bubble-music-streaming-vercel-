"use client";
import useTooltipOverflow, {
  tooltipState,
} from "@/lib/CustomHooks/TooltipOverflow";
import { closeTooltip, showToolTipCheck } from "@/lib/ToolTip/showToolTipCheck";
import clsx from "clsx";
import { ReactNode, useEffect, useMemo, useRef } from "react";

export interface pointerPosition {
  clientX: number;
  clientY: number;
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
  const pointerPosition = useRef<pointerPosition>({
    clientX: 0,
    clientY: 0,
  });
  const [tooltipShow, setTooltipShow] = useTooltipOverflow({
    toolTipRef,
    tooltipTargetRef,
  });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchDevice = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    []
  );
  // onWheel in ReactComponent is not trigger in sometimes as it is passive true by default. so use addeventlistener
  useEffect(() => {
    function closeTooltipFn() {
      closeTooltip({
        isTouchDevice,
        setTimeoutRef,
        tooltipShow,
        setTooltipShow,
      });
    }
    const toolTipRefCopy = tooltipTargetRef!.current!;
    toolTipRefCopy.addEventListener("wheel", closeTooltipFn, {
      passive: false,
    });
    return () => {
      toolTipRefCopy.removeEventListener("wheel", closeTooltipFn);
    };
  }, [isTouchDevice, setTooltipShow, tooltipShow]);

  return (
    <div className="group relative w-fit max-w-full cursor-pointer bg-red-800">
      <div
        ref={tooltipTargetRef}
        onMouseEnter={(e) => {
          if (isTouchDevice) return;
          const targetElement = e.currentTarget;
          if (!setTimeoutRef.current) {
            showToolTipCheck({
              setTimeoutRef,
              tooltipShow,
              setTooltipShow,
              targetElement,
              e,
              delay: 1000,
              pointerPosition,
            });
          }
        }}
        // need to update pointePosition to use for  the function setTimeout
        onMouseMove={(e) => {
          if (isTouchDevice) return;
          const { clientX: x, clientY: y } = e;
          pointerPosition.current.clientX = x;
          pointerPosition.current.clientY = y;
        }}
        //{...} is used to inset js expression ,
        // {...(tooltipShow.show && {
        //   onWheel: (e) => {
        //  above comment is for the past idea to add onwheel on condition
        onMouseLeave={() =>
          closeTooltip({
            isTouchDevice,
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
