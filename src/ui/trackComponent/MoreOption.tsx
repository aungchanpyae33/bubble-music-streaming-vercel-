"use client";
import { EllipsisVertical } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useContext, useRef } from "react";
import OutterClick from "@/lib/OutterClick";
import ToggleContent from "./ToggleContent";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import { ContextMoreOption } from "./MoreOptionContext";
import { createPortal } from "react-dom";
import ContextToggleContent from "./ContextToggleContent";
import ContentChild from "./ContentChild";
import SubOptionToggle from "./SubOptionToggle";
import SubOpenContentWrapper from "./SubOpenContentWrapper";
DisableScroll;
interface MoreOptionProps extends React.ComponentProps<"div"> {
  targetElement: React.ReactNode;
  subOptionElement?: React.ReactNode;
}
function MoreOption({
  className,
  targetElement,
  subOptionElement,
}: MoreOptionProps) {
  const { show, setShow } = useContext(ContextMoreOption);
  const parentRef = useRef<HTMLDivElement>(null);
  const ignonreOutterClickRef = useRef<HTMLDivElement>(null);
  OutterClick(show, setShow, parentRef, ignonreOutterClickRef);
  // need to do with focus-out
  DisableScroll(show);
  return (
    <div className={className} ref={parentRef}>
      <button
        onClick={() => {
          setShow(!show);
        }}
        className="w-full h-full flex justify-center"
      >
        <IconWrapper Icon={EllipsisVertical} size="small" />
      </button>
      {show &&
        typeof window !== "undefined" &&
        createPortal(
          <ToggleContent parentRef={parentRef} ref={ignonreOutterClickRef}>
            <ContentChild>{targetElement}</ContentChild>
          </ToggleContent>,
          document.body
        )}
    </div>
  );
}
// {subOptionElement ? (
//               <SubOpenContentWrapper>
//                 <SubOptionToggle>{subOptionElement}</SubOptionToggle>
//               </SubOpenContentWrapper>
//             ) : null}
export default MoreOption;
