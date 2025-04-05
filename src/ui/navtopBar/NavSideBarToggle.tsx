import CloseFunctoion from "@/lib/CloseFunction";
import { X } from "lucide-react";
import { SetStateAction, useEffect, useRef } from "react";
import IconWrapper from "../general/IconWrapper";

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
      className=" w-[70px] cursor-pointer h-[70px] flex items-center justify-center "
      ref={closeElement}
      tabIndex={open ? 0 : -1}
    >
      <IconWrapper size="large" Icon={X} />
    </button>
  );
}

export default NavSidebarToggle;
