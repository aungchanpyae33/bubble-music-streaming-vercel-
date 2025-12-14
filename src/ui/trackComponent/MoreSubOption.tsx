"use client";
import { useContext, useEffect, useMemo, useRef } from "react";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import { createPortal } from "react-dom";
import ContentChild from "./ContentChild";
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
  // is it sub child permanant stack num is equl or less than current stack
  const stayShow = useMemo(() => stackNum <= stack, [stack]);
  DisableScroll(stayShow);
  useEffect(() => {
    function ToggleFn(e: PointerEvent) {
      e.stopImmediatePropagation();
      if (stackNum !== stack) {
        setStack(stackNum);
      } else {
        setStack(stackNum - 1);
      }
    }
    parentRef.current?.addEventListener("click", ToggleFn);
    return () => {
      parentRef.current?.removeEventListener("click", ToggleFn);
    };
  }, []);
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
          //  // By doing this / also did in MoreOption.tsx , context in this lvl help , one parent and one child lvl component access data each , no unnecessary for deeply nested child

          <ToggleSubContent parentRef={parentRef} stackNum={stackNum}>
            <ContentChild>{targetElement}</ContentChild>
          </ToggleSubContent>,
          relativeRoot ? relativeRoot : document.body
        )}
    </div>
  );
}
export default MoreSubOption;
