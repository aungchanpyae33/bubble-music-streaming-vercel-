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
  const [tooltipShow, setTooltipShow] = useTooltipOverflow({ toolTipRef });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOutsideBeforeShow = useRef<boolean>(false);
  // using callback and memmo in this case is to prevent re-render if in furture  when i want to add another state that does not belong with onwheelhandler
  const onWheelCallbackprop = useCallback(
    ({ e, tooltipShow, setTooltipShow }: onWheelCallbackprop) => {
      const targetElement = e.target as HTMLDivElement;
      const isPointerInside = isInsideForOnWheel(targetElement, e);
      if (isOutsideBeforeShow) {
        clearTimeout(setTimeoutRef!.current!);
        setTimeoutRef.current = null;
      }
      if (!isPointerInside) {
        clearTimeout(setTimeoutRef!.current!);
        setTimeoutRef.current = null;
        if (tooltipShow.show) {
          setTooltipShow((pre) => ({
            ...pre,
            show: false,
          }));
        }
        isOutsideBeforeShow.current = false;
      } else {
        if (!tooltipShow.show && !setTimeoutRef.current) {
          showToolTipCheck({
            setTimeoutRef,
            tooltipShow,
            setTooltipShow,
            targetElement,
            e,
            isEnterEvent: false, // It's a wheel event, so set to false
            delay: 0,
            isOutsideBeforeShow,
          });
        }
      }
    },
    []
  );

  const onWheelFunction = useMemo(() => {
    return debounce(onWheelCallbackprop, 200);
  }, [onWheelCallbackprop]);

  // const go = (
  //   e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  // ) => {
  //   console.warn("go", isOutsideBeforeShow.current);

  //   const targetElement = e.target as HTMLDivElement;
  //   const isPointerInside = isInsideForOnWheel(targetElement, e);
  //   if (isOutsideBeforeShow) {
  //     clearTimeout(setTimeoutRef!.current!);
  //     setTimeoutRef.current = null;
  //   }
  //   if (!isPointerInside) {
  //     console.log("cle");
  //     clearTimeout(setTimeoutRef!.current!);
  //     setTimeoutRef.current = null;
  //     if (tooltipShow.show) {
  //       setTooltipShow((pre) => ({
  //         ...pre,
  //         show: false,
  //       }));
  //     }

  //     isOutsideBeforeShow.current = false;
  //   } else {
  //     if (!tooltipShow.show && !setTimeoutRef.current) {
  //       showToolTipCheck({
  //         setTimeoutRef,
  //         tooltipShow,
  //         setTooltipShow,
  //         targetElement,
  //         e,
  //         isEnterEvent: false, // It's a wheel event, so set to false
  //         delay: 0,
  //         isOutsideBeforeShow,
  //       });
  //     }
  //   }
  // };
  // const debb = debounce(go, 200);

  return (
    <div className="group relative w-fit max-w-full cursor-pointer ">
      <div
        onMouseEnter={(e) => {
          console.log("enter");
          const targetElement = e.currentTarget;

          showToolTipCheck({
            setTimeoutRef,
            tooltipShow,
            setTooltipShow,
            targetElement: e.currentTarget,
            e,
            isEnterEvent: true,
            delay: 1000,
            isOutsideBeforeShow,
          });
        }}
        onWheel={(e) => {
          const targetElement = e.currentTarget;
          const isPointerInside = isInsideForOnWheel(targetElement, e);

          if (!isPointerInside) {
            console.log("cle");
            clearTimeout(setTimeoutRef!.current!);
            setTimeoutRef.current = null;
            setTooltipShow((pre) => ({
              ...pre,
              show: false,
            }));
          } else {
            if (!tooltipShow.show && !setTimeoutRef.current) {
              showToolTipCheck({
                setTimeoutRef,
                tooltipShow,
                setTooltipShow,
                targetElement: e.currentTarget,
                e,
                isEnterEvent: false, // It's a wheel event, so set to false
              });
            }
          }
        }}
        //{...} is used to inset js expression ,
        // {...(tooltipShow.show && {
        //   onWheel: (e) => {
        //  above comment is for the past idea to add onwheel on condition
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
          "absolute max-w-[450px] md:max-w-[550px] w-max  z-50 pointer-events-none   left-[50%]   -translate-x-[50%] px-2 p-1   outline-2 outline-blue-300  text-sm bg-blue-500",
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
