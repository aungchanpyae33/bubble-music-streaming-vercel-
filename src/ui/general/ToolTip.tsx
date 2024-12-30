"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

function ToolTip({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const copyRef = toolTipRef.current;
    if (show && copyRef) {
      const tooltipRect = copyRef.getBoundingClientRect();
      if (tooltipRect.right > window.document.body.offsetWidth) {
        const data = tooltipRect.right - window.document.body.offsetWidth;
        console.log(tooltipRect.right, window.document.body.offsetWidth, data);
        copyRef.style.left = `calc(50% - ${data}px)`;
      }
    }

    return () => {
      if (copyRef) {
        copyRef.style.left = "";
      }
    };
  }, [show]);

  return (
    <div
      className="group relative w-fit max-w-full bg-red-950 cursor-pointer"
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

      <div
        className={clsx(
          "absolute max-w-[400px] md:max-w-[500px] w-max  z-50 left-[50%] top-0 -translate-y-[120%]  -translate-x-[50%]   outline-2 outline-blue-300  text-sm bg-blue-500",
          { hidden: !show }
        )}
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
