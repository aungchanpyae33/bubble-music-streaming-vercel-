import { RefObject, useContext, useEffect, useRef } from "react";
import { useToggleContentPosition } from "@/lib/CustomHooks/ToggleContentPosition";
import clsx from "clsx";

import { ContextPortalRegistry } from "./RegisterPortalContext";
import { ContextMoreOption } from "./MoreOptionContext";
import OutterClick from "@/lib/OutterClick";
import CloseFunctoion from "@/lib/CloseFunction";
import { RegisterPortalValue } from "@/lib/CustomHooks/PortalRefControllStore";
import { useHoverable } from "@/lib/CustomHooks/Hoverable";
import OutterClickSub from "@/lib/OutterClickSub";
import { usePortalStackRegister } from "@/lib/CustomHooks/PortalStackRegister";

interface ToggleSubContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  stackNum: number;
}
function ToggleSubContent({
  parentRef,
  children,
  stackNum,
}: ToggleSubContentProps) {
  const [containerRef, stackRef] = usePortalStackRegister();
  const isHoverable = useHoverable();
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  OutterClickSub(containerRef, stackNum);
  return (
    <div
      className={clsx(
        " absolute  z-30 max-w-full  bg-red-700 overflow-auto max-h-full   border-opacity-25 border   border-neutral-200 left-0 top-0 p-1 rounded-md"
      )}
      ref={containerRef}
      style={position}
    >
      <div className="min-w-[200px]">{children}</div>
      {/* to avoid re-render cause of position */}
    </div>
  );
}

export default ToggleSubContent;
