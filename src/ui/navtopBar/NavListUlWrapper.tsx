import clsx from "clsx";
import { ReactNode, SetStateAction, useRef } from "react";
import NavSidebarToggle from "./NavSideBarToggle";
import Image from "next/image";
import FocusTrap from "../Footer/audioFull/FocusTrap";

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
      >
        <li className="h-[70px] relative   flex border-b border-opacity-15 border-neutral-200">
          <NavSidebarToggle setOpen={setOpen} open={open} />
          <button
            className={clsx(
              "flex flex-1 items-center   justify-start  h-[70px]"
            )}
            aria-hidden={true}
            tabIndex={open ? 0 : -1}
          >
            <div className="logo relative   w-[90px] h-[70px]    bg-gradient-to-r">
              <Image
                src={"/bubblelogo.svg"}
                fill
                priority={false}
                sizes="70px"
                alt="logo"
                className=""
              />
            </div>
          </button>
        </li>
        {children}
      </ul>
    </FocusTrap>
  );
}

export default NavListUlWrapper;
