import { RefObject, useRef } from "react";
import { useToggleContentPosition } from "@/lib/CustomHooks/ToggleContentPosition";
import clsx from "clsx";

interface ToggleContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}
function ToggleContent({ parentRef, children, ref }: ToggleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });

  return (
    <div ref={ref}>
      <div
        className={clsx(
          " absolute z-30 w-[200px] max-w-[200px]   overflow-y-auto bg-[#222222]   border-opacity-25 border   border-neutral-200 left-0 top-0 p-2"
        )}
        ref={containerRef}
        style={position}
      >
        {/* to avoid re-render cause of position */}
        {children}
      </div>
    </div>
  );
}

export default ToggleContent;
