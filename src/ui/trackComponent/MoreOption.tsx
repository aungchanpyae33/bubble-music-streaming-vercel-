"use client";
import { useContext, useRef } from "react";
import ToggleContent from "./ToggleContent";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import { ContextMoreOption } from "./MoreOptionContext";
import { createPortal } from "react-dom";
import MoreOptionStackContext from "./MoreOptionStackContext";
import MoreOptionUniqueContext from "./MoreOptionUniqueContext";
interface MoreOptionProps extends React.ComponentProps<"div"> {
  targetElement: React.ReactNode;
  triggerEl: React.ReactNode;
  relativeRoot?: HTMLDivElement | null;
  staicDrop?: boolean;
  staticUp?: boolean;
}
function MoreOption({
  className,
  triggerEl,
  targetElement,
  relativeRoot,
  staicDrop,
  staticUp,
}: MoreOptionProps) {
  const { show, setShow } = useContext(ContextMoreOption);
  const parentRef = useRef<HTMLButtonElement>(null);
  DisableScroll(show);
  return (
    <div>
      <button
        ref={parentRef}
        onClick={() => {
          setShow(!show);
        }}
        className={`w-full h-full flex justify-center ${className}`}
      >
        {triggerEl}
      </button>
      {show &&
        typeof window !== "undefined" &&
        createPortal(
          // stack provider for all child from one parent lvl
          <MoreOptionStackContext>
            <MoreOptionUniqueContext>
              <ToggleContent
                staticDrop={staicDrop}
                staticUp={staticUp}
                parentRef={parentRef}
              >
                {targetElement}
              </ToggleContent>
            </MoreOptionUniqueContext>
          </MoreOptionStackContext>,
          relativeRoot ? relativeRoot : document.body
        )}
    </div>
  );
}
export default MoreOption;
