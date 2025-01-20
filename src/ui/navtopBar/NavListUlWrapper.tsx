import clsx from "clsx";
import { ReactNode, RefObject, SetStateAction, useState } from "react";
interface NavListUlWrapperProp {
  open: boolean;
  setopen: React.Dispatch<SetStateAction<boolean>>;
  closeElement: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
}
function NavListUlWrapper({
  open,
  setopen,
  closeElement,
  children,
}: NavListUlWrapperProp) {
  const [animate, setAnimate] = useState(false); //to prevent
  return (
    <>
      <button
        onClick={() => {
          setopen(!open);
          setAnimate(!animate);
        }}
        className=" w-[70px] cursor-pointer sm:hidden h-[50px] bg-green-500 text-white "
        ref={closeElement}
      >
        open
      </button>
      <ul
        className={clsx(
          "fixed top-0 z-30 box-border  left-0 h-[100%] flex  flex-col gap-1  bg-green-500  rounded-b-sm",
          {
            "-translate-x-full opacity-0 sm:-translate-x-0 sm:opacity-100 ":
              !open,
            "translate-x-0 opacity-100": open,
            "duration-200 transition-[transform,opacity]": animate,
          }
        )}
        onTransitionEnd={() => {
          console.log("hello");
          if (animate) {
            setAnimate(false);
          }
        }}
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
              "absolute -z-10  top-0 px-2   flex  w-[150px] min-w-[150px] max-w-[150px] items-center   justify-start h-[50px] sm:duration-200 sm:transition-[transform,opacity]   bg-green-500",
              {
                "-translate-x-[calc(100%-70px)] opacity-0 ": open === false,
                "translate-x-[70px] opacity-100": open === true,
              }
            )}
            onTransitionEnd={(e) => {
              e.stopPropagation();
            }}
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
