import { RefObject, useContext, useRef } from "react";

import clsx from "clsx";
import { ContextMoreOption } from "./MoreOptionContext";

import useFocusOnOpen from "@/lib/CustomHooks/useFocusOnOpen";
import { ContextMoreOptionStack } from "./MoreOptionStackContext";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import { useToggleContentPosition } from "@/lib/CustomHooks/useToggleContentPosition";
import useOutterClick from "@/lib/CustomHooks/useOutterClick";
import useCloseFunctoion from "@/lib/CustomHooks/useCloseFunction";

interface ToggleContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  staticDrop?: boolean;
  staticUp?: boolean;
}
function ToggleContent({
  parentRef,
  children,
  staticDrop,
  staticUp,
}: ToggleContentProps) {
  const { show, setShow } = useContext(ContextMoreOption);
  const { stack } = useContext(ContextMoreOptionStack);

  const containerRef = useRef<HTMLDivElement>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
    staticDrop,
    staticUp,
  });
  // outterclick is to detect click is inside portal and targert parent trigger or not inside when portal is open
  useOutterClick(show, setShow, parentRef, containerRef);
  useFocusOnOpen(stack === 0, containerRef);
  useCloseFunctoion(show, setShow, parentRef);
  return (
    <FocusTrap refFocus={containerRef}>
      <div
        className={clsx(
          " fixed z-30 overflow-auto max-w-full  bg-[#222222] max-h-full border-opacity-25 border   border-neutral-200 left-0 top-0 p-1 rounded-md",
        )}
        ref={containerRef}
        tabIndex={-1}
        style={position}
      >
        <div className="min-w-[200px]">{children}</div>
        {/* to avoid re-render cause of position */}
      </div>
    </FocusTrap>
  );
}

export default ToggleContent;
