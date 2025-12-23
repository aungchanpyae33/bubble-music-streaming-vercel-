"use client";
import { useMemo, useRef } from "react";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import { createPortal } from "react-dom";
import ToggleSubContent from "./ToggleSubContent";
import clsx from "clsx";

import useTriggerButtonSub from "@/lib/CustomHooks/useTriggerButtonSub";
import { generateUUID } from "@/lib/GenerateUUID";
import MoreOptionUniqueContext from "./MoreOptionUniqueContext";
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
  const parentRef = useRef<HTMLButtonElement>(null);
  const uuid = useMemo(() => generateUUID(), []);
  const [stayShow] = useTriggerButtonSub(parentRef, stackNum, uuid);
  DisableScroll(stayShow);

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
          <MoreOptionUniqueContext>
            <ToggleSubContent
              stayShow={stayShow}
              parentRef={parentRef}
              stackNum={stackNum}
            >
              {targetElement}
            </ToggleSubContent>
          </MoreOptionUniqueContext>,
          relativeRoot ? relativeRoot : document.body
        )}
    </div>
  );
}
export default MoreSubOption;
