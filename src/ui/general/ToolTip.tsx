"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

function ToolTip({ children }: { children: ReactNode }) {
  console.log("tooltip ref");
  const [tooltipShow, setTooltipShow] = useState({
    show: false,
    toolTipLeft: { left: "50%" },
  });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const copyRef = toolTipRef.current;
    if (tooltipShow.show && copyRef) {
      const tooltipRect = copyRef.getBoundingClientRect();
      const rightEdge = tooltipRect.right;
      const leftEdge = tooltipRect.left;
      if (rightEdge > window.document.body.offsetWidth) {
        const data = rightEdge - window.document.body.offsetWidth;
        setTooltipShow((pre) => ({
          ...pre,
          toolTipLeft: { left: `calc(50% - ${data}px)` },
        }));
      } else if (leftEdge < 0) {
        const data = Math.abs(leftEdge);
        setTooltipShow((pre) => ({
          ...pre,
          toolTipLeft: { left: `calc(50% + ${data}px)` },
        }));
      }
    }

    return () => {
      setTooltipShow((pre) => ({
        ...pre,
        toolTipLeft: { left: "50%" },
      }));
    };
  }, [tooltipShow.show]);

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
