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
          const handleWheel = (wheelEvent: WheelEvent) => {
            console.log("onwheel");
            const { clientX: x, clientY: y } = wheelEvent;
            const rect = targetElement.getBoundingClientRect();
            const isPointerInside =
              x >= rect.left &&
              x <= rect.right &&
              y >= rect.top &&
              y <= rect.bottom;

            if (!isPointerInside && setTimeoutRef.current) {
              clearTimeout(setTimeoutRef.current);
              setTimeoutRef.current = null;
              setTooltipShow((pre) => ({
                ...pre,
                show: false,
              }));
              targetElement.removeEventListener("wheel", handleWheel);
            }
          };

          targetElement.addEventListener("wheel", handleWheel);

          setTimeoutRef.current = setTimeout(() => {
            const { clientX: x, clientY: y } = e;
            const rect = targetElement.getBoundingClientRect();

            // Check if the mouse is within the element's bounds
            const isPointerInside =
              x >= rect.left ||
              x <= rect.right ||
              y >= rect.top ||
              y <= rect.bottom;

            console.log("Pointer inside element:", isPointerInside);
            if (isPointerInside && !tooltipShow.show) {
              setTooltipShow((pre) => ({
                ...pre,
                show: true,
              }));
            }
          }, 1000);
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
