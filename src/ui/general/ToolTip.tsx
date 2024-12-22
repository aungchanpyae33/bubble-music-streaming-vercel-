"use client";
import { ReactNode, useRef, useState } from "react";

function ToolTip({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div
      className="relative group w-fit max-w-full"
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
      {show && (
        <div className="absolute whitespace-nowrap top-0 -translate-y-[110%] left-1/2 -translate-x-1/2 outline-2 outline-blue-300 shadow-md bg-blue-50 py-1 px-4">
          hello nice to meet you
        </div>
      )}
    </div>
  );
}

export default ToolTip;
