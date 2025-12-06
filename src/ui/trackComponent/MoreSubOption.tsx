"use client";
import { useContext, useRef } from "react";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import { ContextMoreOption } from "./MoreOptionContext";
import { createPortal } from "react-dom";
import ContentChild from "./ContentChild";
import RegistryPortalContext, {
  ContextPortalRegistry,
} from "./RegisterPortalContext";
import ToggleSubContent from "./ToggleSubContent";
import { isChildOpenAction, useIsChildOpenCloseFunction } from "@/lib/zustand";
interface MoreOptionProps extends React.ComponentProps<"button"> {
  targetElement: React.ReactNode;
  triggerEl: React.ReactNode;
  relativeRoot?: HTMLDivElement | null;
}
function MoreSubOption({
  className,
  targetElement,
  triggerEl,
  relativeRoot,
}: MoreOptionProps) {
  const { show, setShow } = useContext(ContextMoreOption);
  const parentRef = useRef<HTMLButtonElement>(null);
  const { registryPortal: ParentRegister } = useContext(ContextPortalRegistry);
  const setIsChildOpen = useIsChildOpenCloseFunction(
    (state: isChildOpenAction) => state.setIsChildOpen
  );
  DisableScroll(show);
  return (
    <div>
      <button
        ref={parentRef}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          setShow(!show);
          setIsChildOpen({ true: true });
        }}
        className={`w-full h-full flex justify-center ${className}`}
      >
        {triggerEl}
      </button>
      {show &&
        typeof window !== "undefined" &&
        createPortal(
          //  // By doing this / also did in MoreOption.tsx , context in this lvl help , one parent and one child lvl component access data each , no unnecessary for deeply nested child
          <RegistryPortalContext>
            <ToggleSubContent
              parentRef={parentRef}
              parentRegister={ParentRegister}
            >
              <ContentChild>{targetElement}</ContentChild>
            </ToggleSubContent>
          </RegistryPortalContext>,
          relativeRoot ? relativeRoot : document.body
        )}
    </div>
  );
}
export default MoreSubOption;
