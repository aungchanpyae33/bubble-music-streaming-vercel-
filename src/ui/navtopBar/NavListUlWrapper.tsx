import clsx from "clsx";
import { ReactNode, SetStateAction } from "react";
import NavSidebarToggle from "./NavSideBarToggle";

interface NavListUlWrapperProp {
  open: boolean;
  setopen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}
function NavListUlWrapper({ open, setopen, children }: NavListUlWrapperProp) {
  return (
    <>
      <ul
        className={clsx(
          "fixed overflow-auto thinScrollbar top-0 z-30 box-border  left-0 h-[100%] flex duration-200 transition-[transform,opacity]  flex-col gap-1  bg-green-500  rounded-b-sm",
          {
            "-translate-x-full opacity-0  ": !open,
            "translate-x-0 opacity-100": open,
          }
        )}
      >
        <li className="h-[50px] z-10 relative will-change-transform">
          <button
            onClick={() => {
              setopen(!open);
              setAnimate(!animate);
            }}
            className=" w-[70px] cursor-pointer h-[50px] bg-green-500 text-white "
            ref={closeElement}
          >
            open
          </button>
          <button
            className={clsx(
              "px-2   flex  w-[150px] min-w-[150px] max-w-[150px] items-center   justify-start h-[50px]"
            )}
            aria-hidden={true}
            tabIndex={open ? 0 : -1}
            aria-hidden={true}
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
