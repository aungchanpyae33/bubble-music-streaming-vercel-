"use client";
import { EllipsisVertical } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useEffect, useRef, useState } from "react";
import OutterClick from "@/lib/OutterClick";
import ToggleContent from "./ToggleContent";
import { DisableScroll } from "@/lib/CustomHooks/DisableScroll";
DisableScroll;
function MoreOption() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  OutterClick(show, setShow, parentRef);
  // need to do with focus-out
  DisableScroll(show);
  return (
    <div
      className="group-hover:opacity-100    sm:opacity-0 group-focus-within:opacity-100 opacity-100"
      style={show ? { opacity: 1 } : {}}
      ref={parentRef}
    >
      <button
        onClick={() => setShow(!show)}
        className="w-full h-full flex justify-center bg-black"
      >
        <IconWrapper Icon={EllipsisVertical} size="small" />
      </button>
      {show && <ToggleContent parentRef={parentRef} />}
    </div>
  );
}

export default MoreOption;
