import CloseFunctoion from "@/lib/CloseFunction";
import { SetStateAction, useEffect, useRef } from "react";

function NavSidebarToggle({
  setopen,
  open,
}: {
  setopen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const closeElement = useRef<HTMLButtonElement | null>(null);
  CloseFunctoion(open, setopen, closeElement);
  useEffect(() => {
    open && closeElement.current?.focus();
  }, [open, closeElement]);
  return (
    <button
      onClick={() => {
        setopen(!open);
      }}
      className=" w-[70px] cursor-pointer h-[50px] text-white "
      ref={closeElement}
      tabIndex={open ? 0 : -1}
    >
      open
    </button>
  );
}

export default NavSidebarToggle;
