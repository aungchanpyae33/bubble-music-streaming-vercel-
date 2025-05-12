"use client";
import { EllipsisVertical } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useContext, useRef, useState } from "react";
import OutterClick from "@/lib/OutterClick";
import ToggleContent from "./ToggleContent";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import AddSongContentWrapper from "./AddSongContentWrapper";
import AddSongContent from "./AddSongContent";
import { ContextMoreOption } from "./MoreOptionContext";
import { createPortal } from "react-dom";
import ContextToggleContent from "./ContextToggleContent";
import ContentChild from "./ContentChild";
DisableScroll;
interface MoreOptionProps extends React.ComponentProps<"div"> {}
function MoreOption({ className }: MoreOptionProps) {
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
          <ContextToggleContent>
            <ToggleContent
              parentRef={parentRef}
              ref={ignonreOutterClickRef}
              contentChild={<ContentChild />}
            >
              <AddSongContentWrapper>
                <AddSongContent />
              </AddSongContentWrapper>
            </ToggleContent>
          </ContextToggleContent>,

          document.body
        )}
    </div>
  );
}

export default MoreOption;
