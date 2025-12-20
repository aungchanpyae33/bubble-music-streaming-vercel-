"use client";
import { useContext, useRef } from "react";
import ToggleContent from "./ToggleContent";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import { ContextMoreOption } from "./MoreOptionContext";
import { createPortal } from "react-dom";
import ContentChild from "./ContentChild";
import MoreOptionStackContext from "./MoreOptionStackContext";
interface MoreOptionProps extends React.ComponentProps<"div"> {
  targetElement: React.ReactNode;
  triggerEl: React.ReactNode;
  relativeRoot?: HTMLDivElement | null;
}
function MoreOption({
  className,
  triggerEl,
  targetElement,
  relativeRoot,
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
            <ToggleContent parentRef={parentRef}>
              <ContentChild>{targetElement}</ContentChild>
            </ToggleContent>
          </MoreOptionStackContext>,
          relativeRoot ? relativeRoot : document.body
        )}
    </div>
  );
}
export default MoreOption;
