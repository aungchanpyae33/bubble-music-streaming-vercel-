import CloseFunctoion from "@/lib/CloseFunction";
import { isChildOpenAction, useIsChildOpenCloseFunction } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Plus } from "lucide-react";
import React, { SetStateAction, useRef } from "react";

function InitCreateButton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const closeElementRef = useRef(null);
  console.log("open", open);
  const setIsChildOpen = useIsChildOpenCloseFunction(
    (state: isChildOpenAction) => state.setIsChildOpen
  );
  CloseFunctoion(open, setOpen, closeElementRef, false);
  return (
    <button
      className="mr-2"
      onClick={() => {
        setOpen(true);
        setIsChildOpen({ true: true });
      }}
      ref={closeElementRef}
    >
      <IconWrapper size="large" Icon={Plus} />
    </button>
  );
}

export default InitCreateButton;
