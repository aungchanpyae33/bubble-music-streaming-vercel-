import { RefObject, useRef } from "react";
import clsx from "clsx";
import useFocusOnOpen from "@/lib/CustomHooks/useFocusOnOpen";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import { useToggleContentPosition } from "@/lib/CustomHooks/useToggleContentPosition";
import useOutterClickSub from "@/lib/CustomHooks/useOutterClickSub";

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
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  // outterclickSub is to detect only click is inside portal and targert parent trigger
  useOutterClickSub(containerRef, stackNum);
  useFocusOnOpen(stayShow, containerRef);
  return (
    <FocusTrap refFocus={containerRef}>
      <div
        className={clsx(
          " fixed  z-30 max-w-full bg-[#222222]   overflow-auto max-h-full   border-opacity-25 border   border-neutral-200 left-0 top-0 p-1 rounded-md",
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
