import { RefObject, useEffect, useRef } from "react";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import { useToggleContentPosition } from "@/lib/CustomHooks/ToggleContentPosition";
import { EnableScroll } from "@/lib/CustomHooks/EnableScroll";

function ToggleContent({
  parentRef,
}: {
  parentRef: RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  // enable scroll
  EnableScroll(containerRef);
  return (
    <FocusTrap refFocus={containerRef}>
      <div
        tabIndex={0}
        className=" fixed z-50 w-[200px] flex flex-col max-h-fit   max-w-[200px]  gap-6 overflow-hidden
             bg-red-500"
        ref={containerRef}
        style={position}
      >
        <div className=" h-full  max-h-fit overflow-auto">
          <h1 className=" h-10">test content</h1>
          <h1 className=" h-10">test content</h1>
          <h1 className=" h-10">test content</h1>
          <h1 className=" h-10">test content</h1>
          <h1 className=" h-10">test content</h1>
          <h1 className=" h-10">test content</h1>
          <h1 className="h-10">test content</h1>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ToggleContent;
