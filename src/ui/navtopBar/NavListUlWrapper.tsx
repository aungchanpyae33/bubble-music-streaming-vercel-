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
    <>
      <ul
        className={clsx(
          "fixed  top-0 z-40 box-border  left-0 h-[100%] flex duration-200 transition-transform  flex-col gap-1  bg-green-500  rounded-b-sm",
          {
            "-translate-x-full  ": !open,
            "translate-x-0 ": open,
          }
        )}
      >
        <li className="h-[50px]  relative bg-green-500 hover:bg-green-600  flex">
          <NavSidebarToggle setOpen={setOpen} open={open} />
          <button
            className={clsx(
              "px-2   flex  w-[150px] min-w-[150px] max-w-[150px] items-center   justify-start h-[50px]"
            )}
            aria-hidden={true}
            tabIndex={open ? 0 : -1}
          >
            <span className=" ">Bubble</span>
          </button>
        </li>
        {children}
      </ul>
    </>
  );
}

export default NavListUlWrapper;
