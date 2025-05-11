import {
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import { useToggleContentPosition } from "@/lib/CustomHooks/ToggleContentPosition";
import { EnableScroll } from "@/lib/CustomHooks/EnableScroll";
import AddSongButton from "./AddSongButton";
import clsx from "clsx";
import { setIsBoxOpen, useShowAddBox } from "@/lib/zustand";
import RemoveSongButton from "./RemoveSongButton";
import ToggleHeartContent from "./ToggleHeartContent";
import { ToggleContentContext } from "./ContextToggleContent";
interface ToggleContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  contentChild: React.ReactNode;
}
function ToggleContent({
  parentRef,
  children,
  ref,
  contentChild,
}: ToggleContentProps) {
  const { hidden } = useContext(ToggleContentContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  const setIsBoxOpen = useShowAddBox(
    (state: setIsBoxOpen) => state.setIsBoxOpen
  );
  useEffect(() => {
    return () => {
      setIsBoxOpen(false);
    };
  }, [setIsBoxOpen]);

  return (
    <div ref={ref}>
      <FocusTrap refFocus={containerRef}>
        <div
          tabIndex={0}
          className={clsx(
            " absolute z-30 w-[200px] max-h-[258px]  max-w-[200px]   overflow-y-auto bg-[#222222]   border-opacity-25 border   border-neutral-200 left-0 top-0 p-2",
            {
              hidden: !hidden,
            }
          )}
          ref={containerRef}
          style={position}
        >
          {/* to avoid re-render cause of position */}
          {contentChild}
        </div>
      </FocusTrap>
      {children}
    </div>
  );
}

export default ToggleContent;
