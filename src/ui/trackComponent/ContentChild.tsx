import { useRef } from "react";
import FocusTrap from "../Footer/audioFull/FocusTrap";

import SetFocusMounted from "@/lib/CustomHooks/SetFocusMounted";

function ContentChild({ children }: { children: React.ReactNode }) {
  // This component is used to trap focus within
  const containerRef = useRef<HTMLDivElement | null>(null);
  SetFocusMounted({ refFocus: containerRef });
  return (
    <FocusTrap refFocus={containerRef} className=" w-full h-full">
      <div tabIndex={0} ref={containerRef} className="w-full h-full">
        {children}
      </div>
    </FocusTrap>
  );
}

export default ContentChild;
