"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

function ToolTip({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({ left: "50%" });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const copyRef = toolTipRef.current;
    if (show && copyRef) {
      const tooltipRect = copyRef.getBoundingClientRect();
      if (tooltipRect.right > window.document.body.offsetWidth) {
        const data = tooltipRect.right - window.document.body.offsetWidth;
        setTooltipStyle({ left: `calc(50% - ${data}px)` });
      } else {
        setTooltipStyle({ left: "50%" });
      }
    }

    return () => {
      setTooltipStyle({ left: "50%" });
    };
  }, [show]);

  return (
    <div className="group relative w-fit max-w-full bg-red-950 cursor-pointer">
      <div
        onMouseEnter={() => {
          console.log("mouse enter");
          setTimeoutRef.current = setTimeout(() => {
            setShow(true);
          }, 500);
        }}
        onMouseLeave={() => {
          console.log("mouse leave");
          if (setTimeoutRef.current) {
            clearTimeout(setTimeoutRef.current);
            setTimeoutRef.current = null;
          }
          if (show) {
            setShow(false);
          }
        }}
      >
        {children}
      </div>

      <div
        className={clsx(
          "absolute max-w-[400px] md:max-w-[500px] w-max  z-50 top-0 -translate-y-[110%] left-[50%]  -translate-x-[50%]   outline-2 outline-blue-300  text-sm bg-blue-500",
          { hidden: !show }
        )}
        style={tooltipStyle}
        ref={toolTipRef}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        blanditiis, amet voluptate quibusdam incidunt est illum vel ipsam
        nesciunt porro!
        {show && "hi"}
      </div>
    </div>
  );
}

export default ToolTip;
