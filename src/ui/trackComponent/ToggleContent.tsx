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
          " absolute z-30 max-w-full      overflow-auto bg-[#222222] max-h-full   border-opacity-25 border   border-neutral-200 left-0 top-0 p-2 rounded-md"
        )}
        ref={containerRef}
        style={position}
      >
        <div className=" min-w-[200px]">{children}</div>
        {/* to avoid re-render cause of position */}
      </div>
    </div>
  );
}

export default ToggleContent;
