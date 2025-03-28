import CloseFunctoion from "@/lib/CloseFunction";
import { SetStateAction, useEffect, useRef } from "react";

function NavSidebarToggle({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const closeElement = useRef<HTMLButtonElement | null>(null);
  CloseFunctoion(open, setOpen, closeElement);
  useEffect(() => {
    open && closeElement.current?.focus();
  }, [open, closeElement]);
  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      className=" w-[70px] cursor-pointer h-[50px] "
      ref={closeElement}
      tabIndex={open ? 0 : -1}
    >
      open
    </button>
  );
}

export default NavSidebarToggle;
