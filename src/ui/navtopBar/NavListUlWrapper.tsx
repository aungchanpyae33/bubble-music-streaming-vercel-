import clsx from "clsx";
import { ReactNode, SetStateAction, useRef } from "react";
import NavSidebarToggle from "./NavSideBarToggle";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import Logo from "../icon/Logo";

interface NavListUlWrapperProp {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}
function NavListUlWrapper({ open, setOpen, children }: NavListUlWrapperProp) {
  const ulRef = useRef<HTMLUListElement>(null);
  return (
    <FocusTrap refFocus={ulRef}>
      <ul
        className={clsx(
          "fixed bg-[#0A0A0A] border-r border-opacity-15 border-neutral-200  top-0 z-40 box-border w-[280px]  max-w-[280px]  left-0 h-full flex duration-200 transition-transform  flex-col gap-1  rounded-b-sm",
          {
            "-translate-x-full  ": !open,
            "translate-x-0 ": open,
          }
        )}
        ref={ulRef}
        tabIndex={open ? 0 : -1}
      >
        <li className="h-[70px] relative   flex border-b border-opacity-15 border-neutral-200">
          <NavSidebarToggle setOpen={setOpen} open={open} />
          <button
            className={clsx(
              "flex flex-1 items-center   justify-start  h-[70px]"
            )}
            aria-hidden={true}
          >
            <Logo width={90} height={70} />
          </button>
        </li>
        {children}
      </ul>
    </FocusTrap>
  );
}

export default NavListUlWrapper;
