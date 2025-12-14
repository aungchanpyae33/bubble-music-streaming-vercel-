import { RefObject, useContext, useRef } from "react";
import { useToggleContentPosition } from "@/lib/CustomHooks/ToggleContentPosition";
import clsx from "clsx";
import { ContextMoreOption } from "./MoreOptionContext";
import OutterClick from "@/lib/OutterClick";
import CloseFunctoion from "@/lib/CloseFunction";
import { RegisterPortalValue } from "@/lib/CustomHooks/PortalRefControllStore";
import { useHoverable } from "@/lib/CustomHooks/Hoverable";

interface ToggleContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  parentRegister?: RegisterPortalValue;
}
function ToggleContent({ parentRef, children }: ToggleContentProps) {
  const { show, setShow } = useContext(ContextMoreOption);
  const isHoverable = useHoverable();
  // feed portal element to register
  const containerRef = useRef<HTMLDivElement>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  // outterclick is to detect click is inside portal and targert parent trigger or not when portal is open
  OutterClick(show, setShow, parentRef, containerRef);

  CloseFunctoion(show, setShow, parentRef);
  return (
    <div
      className={clsx(
        " absolute z-30 overflow-auto max-w-full  bg-[#222222] max-h-full   border-opacity-25 border   border-neutral-200 left-0 top-0 p-1 rounded-md"
      )}
      ref={containerRef}
      tabIndex={-1}
      style={position}
    >
      <div className="min-w-[200px]">{children}</div>
      {/* to avoid re-render cause of position */}
    </div>
  );
}

export default ToggleContent;
