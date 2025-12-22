import { RefObject, useRef } from "react";
import { useToggleContentPosition } from "@/lib/CustomHooks/ToggleContentPosition";
import clsx from "clsx";

import { useHoverable } from "@/lib/CustomHooks/Hoverable";
import OutterClickSub from "@/lib/OutterClickSub";
import useFocusOnOpen from "@/lib/CustomHooks/useFocusOnOpen";
import FocusTrap from "../Footer/audioFull/FocusTrap";

interface ToggleSubContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  stackNum: number;
  stayShow: boolean;
}
function ToggleSubContent({
  parentRef,
  children,
  stackNum,
  stayShow,
}: ToggleSubContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isHoverable = useHoverable();
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  // outterclickSub is to detect only click is inside portal and targert parent trigger
  OutterClickSub(containerRef, stackNum);
  useFocusOnOpen(stayShow, containerRef);
  return (
    <FocusTrap refFocus={containerRef}>
      <div
        className={clsx(
          " absolute  z-30 max-w-full   overflow-auto max-h-full   border-opacity-25 border   border-neutral-200 left-0 top-0 p-1 rounded-md"
        )}
        ref={containerRef}
        style={position}
        tabIndex={-1}
      >
        <div className="min-w-[200px]">{children}</div>
        {/* to avoid re-render cause of position */}
      </div>
    </FocusTrap>
  );
}

export default ToggleSubContent;
