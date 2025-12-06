import { RefObject, useContext, useEffect, useRef } from "react";
import { useToggleContentPosition } from "@/lib/CustomHooks/ToggleContentPosition";
import clsx from "clsx";
import { usePortalRefRegister } from "@/lib/CustomHooks/PortalRefRegister";
import { ContextPortalRegistry } from "./RegisterPortalContext";
import { ContextMoreOption } from "./MoreOptionContext";
import OutterClick from "@/lib/OutterClick";
import CloseFunctoion from "@/lib/CloseFunction";
import { RegisterPortalValue } from "@/lib/CustomHooks/PortalRefControllStore";

interface ToggleSubContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  parentRegister: RegisterPortalValue;
}
function ToggleSubContent({
  parentRef,
  children,
  parentRegister,
}: ToggleSubContentProps) {
  const { registryPortal } = useContext(ContextPortalRegistry);
  const { show, setShow } = useContext(ContextMoreOption);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  OutterClick(show, setShow, parentRef, registryPortal);
  const portalEleRef = usePortalRefRegister(registryPortal, parentRegister);
  // default to true , because it is not guarantee not having sub portal content
  // it is safe to add true , because if add true , when another open portal open , it will have to use    setIsChildOpen({ true: true });
  CloseFunctoion(show, setShow, parentRef, false);
  return (
    <div ref={portalEleRef}>
      <div
        className={clsx(
          " absolute z-30 max-w-full  bg-[#222222] overflow-auto max-h-full   border-opacity-25 border   border-neutral-200 left-0 top-0 p-1 rounded-md"
        )}
        ref={containerRef}
        style={position}
      >
        <div className="min-w-[200px]">{children}</div>
        {/* to avoid re-render cause of position */}
      </div>
    </div>
  );
}

export default ToggleSubContent;
