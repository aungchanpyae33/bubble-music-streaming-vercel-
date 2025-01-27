"use client";
import useTooltipOverflow from "@/lib/CustomHooks/TooltipOverflow";
import {
  isInsideForOnWheel,
  showToolTipCheck,
} from "@/lib/ToolTip/showToolTipCheck";

import clsx from "clsx";
import { ReactNode, useRef } from "react";
//[todo] : need to add debounce or throttle to the onwheel event
//[todo] : in mobile , tooltip  is trigger , need to prevent it
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

  // useEffect(() => {
  //   const targetElement = toolTipRef!.current!;

  //   // Create Intersection Observer

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           targetElement.classList.remove("hidden");
  //         } else {
  //           targetElement.classList.add("hidden");
  //         }
  //       });
  //     },
  //     {
  //       root: null, // Use the viewport as the root
  //       rootMargin: `-20px 0px 0px 0px`, // Account for header height
  //       threshold: 1, // Trigger when at least 10% of the element is visible
  //     }
  //   );

  //   // Observe the target element
  //   if (targetElement) {
  //     observer.observe(targetElement);
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     if (targetElement) observer.unobserve(targetElement);
  //   };
  // }, []);
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
