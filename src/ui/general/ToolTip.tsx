"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

function ToolTip({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const copyRef = toolTipRef.current;
    if (show && toolTipRef.current) {
      const tooltipRect = toolTipRef.current.getBoundingClientRect();
      if (tooltipRect.right > window.document.body.offsetWidth) {
        const data = tooltipRect.right - window.document.body.offsetWidth;
        console.log(tooltipRect.right, window.document.body.offsetWidth, data);
        toolTipRef.current.style.transform = `translateX(calc(-50% - ${data}px))`;
      }
    }

    return () => {
      if (copyRef) {
        copyRef.style.transform = "";
      }
    };
  }, [show]);

  return (
    <div
      className="group relative w-fit max-w-full bg-red-950"
      onMouseEnter={() => {
        setTimeoutRef.current = setTimeout(() => {
          setShow(true);
        }, 500);
      }}
      onMouseLeave={() => {
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
          "absolute max-w-[500px] md:max-w-[650px] w-max  z-50 left-[50%]  top-0 -translate-x-[50%] -translate-y-[105%]  outline-2 outline-blue-300  text-sm bg-blue-500",
          { hidden: !show }
        )}
        ref={toolTipRef}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, eos
        nemo exercitationem earum voluptates porro dignissimos numquam explicabo
        libero ipsam!
      </div>
    </div>
  );
}

export default ToolTip;
