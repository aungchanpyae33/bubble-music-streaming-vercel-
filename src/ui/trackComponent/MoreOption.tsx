"use client";
import { EllipsisVertical } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useContext, useRef, useState } from "react";
import OutterClick from "@/lib/OutterClick";
import ToggleContent from "./ToggleContent";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
import AddSongContentWrapper from "./AddSongContentWrapper";
import AddSongContent from "./AddSongContent";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import { ContextMoreOption } from "./MoreOptionContext";
import { createPortal } from "react-dom";
import ToggleHeartContent from "./ToggleHeartContent";
import RemoveSongButton from "./RemoveSongButton";
import AddSongButton from "./AddSongButton";
import ContextToggleContent, {
  ToggleContentContext,
} from "./ContextToggleContent";
DisableScroll;
interface MoreOptionProps extends React.ComponentProps<"div"> {}
function MoreOption({ className }: MoreOptionProps) {
  const { show, setShow } = useContext(ContextMoreOption);
  const parentRef = useRef<HTMLDivElement>(null);
  const ignonreOutterClickRef = useRef<HTMLDivElement>(null);
  const refFocus = useRef<HTMLDivElement>(null);
  OutterClick(show, setShow, parentRef, ignonreOutterClickRef);
  // need to do with focus-out
  DisableScroll(show);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={className}
      style={show ? { opacity: 1 } : {}}
      ref={parentRef}
    >
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
          <ContextToggleContent show={show}>
            <ToggleContent
              parentRef={parentRef}
              ref={ignonreOutterClickRef}
              contentChild={
                <FocusTrap refFocus={containerRef} className=" w-full h-full">
                  <div
                    tabIndex={0}
                    ref={containerRef}
                    className="w-full h-full"
                  >
                    <h1 className=" h-10">test content</h1>
                    <AddSongButton />
                    <RemoveSongButton />
                    <ToggleHeartContent />
                    <h1 className=" h-10">test content</h1>
                    <h1 className=" h-10">test content</h1>
                    <h1 className="h-10">test content</h1>
                  </div>
                </FocusTrap>
              }
            >
              <AddSongContentWrapper>
                <FocusTrap refFocus={refFocus}>
                  <AddSongContent ref={refFocus} />
                </FocusTrap>
              </AddSongContentWrapper>
            </ToggleContent>
          </ContextToggleContent>,

          document.body
        )}
    </div>
  );
}

export default MoreOption;
