import { X } from "lucide-react";
import { SetStateAction, useRef } from "react";
import IconWrapper from "../general/IconWrapper";
import useCloseFunctoion from "@/lib/CustomHooks/useCloseFunction";

function NavSidebarToggle({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const closeElement = useRef<HTMLButtonElement | null>(null);
  useCloseFunctoion(open, setOpen);
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
