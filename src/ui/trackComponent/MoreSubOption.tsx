"use client";
import { useContext, useEffect, useMemo, useRef } from "react";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import { createPortal } from "react-dom";
import ToggleSubContent from "./ToggleSubContent";
import { useHoverable } from "@/lib/CustomHooks/Hoverable";
import clsx from "clsx";
import { ContextMoreOptionStack } from "./MoreOptionStackContext";
interface MoreOptionProps extends React.ComponentProps<"button"> {
  targetElement: React.ReactNode;
  triggerEl: React.ReactNode;
  relativeRoot?: HTMLDivElement | null;
  stackNum: number;
}
function MoreSubOption({
  className,
  targetElement,
  triggerEl,
  relativeRoot,
  stackNum,
}: MoreOptionProps) {
  const { stack, setStack } = useContext(ContextMoreOptionStack);
  const parentRef = useRef<HTMLButtonElement>(null);
  // is it sub child permanant stack num is equl or less than current stack?
  const stayShow = useMemo(() => stackNum <= stack, [stack, stackNum]);

  DisableScroll(stayShow);
  useEffect(() => {
    const copyRef = parentRef.current;
    function ToggleFn(e: PointerEvent) {
      // to stop the trigger to the parent outterClick
      e.stopImmediatePropagation();

      // toggle
      if (stackNum !== stack) {
        setStack(stackNum);
      } else {
        setStack(stackNum - 1);
      }
    }
    copyRef?.addEventListener("click", ToggleFn);
    return () => {
      copyRef?.removeEventListener("click", ToggleFn);
    };
  }, [setStack, stack, stackNum]);
  return (
    <div>
      <button
        ref={parentRef}
        className={clsx(`w-full h-full flex justify-center ${className}`, {
          "bg-[#444444]": stayShow,
        })}
      >
        {triggerEl}
      </button>
      {stayShow &&
        typeof window !== "undefined" &&
        createPortal(
          <ToggleSubContent
            stayShow={stayShow}
            parentRef={parentRef}
            stackNum={stackNum}
          >
            {targetElement}
          </ToggleSubContent>,
          relativeRoot ? relativeRoot : document.body
        )}
    </div>
  );
}
export default MoreSubOption;
