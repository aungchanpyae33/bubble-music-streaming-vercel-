import clsx from "clsx";
import { ReactNode, SetStateAction } from "react";
import NavSidebarToggle from "./NavSideBarToggle";

interface NavListUlWrapperProp {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}
function NavListUlWrapper({ open, setOpen, children }: NavListUlWrapperProp) {
  return (
    <ul
      className={clsx(
        "fixed bg-[#0A0A0A] border-r border-opacity-15 border-neutral-200  top-0 z-40 box-border w-[280px]  max-w-[280px]  left-0 h-full flex duration-200 transition-transform  flex-col gap-1  rounded-b-sm",
        {
          "-translate-x-full  ": !open,
          "translate-x-0 ": open,
        }
      )}
    >
      <li className="h-[70px] relative   flex border-b border-opacity-15 border-neutral-200">
        <NavSidebarToggle setOpen={setOpen} open={open} />
        <button
          className={clsx(
            "px-2   flex flex-1 items-center   justify-start h-[70px]"
          )}
          aria-hidden={true}
          tabIndex={open ? 0 : -1}
        >
          <span className="">Bubble</span>
        </button>
      </li>
      {children}
    </ul>
  );
}

export default NavListUlWrapper;
