"use client";
import useBodyScrollLock from "@/lib/CustomHooks/BodyScrollLock";
import OverLay from "./OverLay";
import clsx from "clsx";
import NavSideLink from "./NavSideLink";
import { ReactNode, useRef } from "react";
import CloseFunctoion from "@/lib/CloseFunction";
interface childrenProp {
  childrenExplore: ReactNode;
  childrenLive: ReactNode;
}
function NavList({ childrenExplore, childrenLive }: childrenProp) {
  console.log("render");
  const [open, setopen] = useBodyScrollLock();
  const closeElement = useRef<HTMLButtonElement | null>(null);

  CloseFunctoion(open, setopen, closeElement);
  return (
    <div className="">
      <button
        onClick={() => setopen(!open)}
        className=" w-[70px] cursor-pointer sm:hidden h-[50px] bg-green-500 text-white "
        ref={closeElement}
      >
        open
      </button>

      <ul
        className={clsx(
          "fixed top-0 z-30 box-border  left-0 h-[100%] flex  flex-col gap-1  bg-green-500 transition-[transform,opacity] sm:opacity-100 sm:translate-x  rounded-b-sm",
          {
            "-translate-x-full opacity-0 sm:-translate-x-0 sm:opacity-100":
              !open,
            "translate-x-0 opacity-100": open,
          }
        )}
      >
        <li className="h-[50px] z-10 relative will-change-transform">
          <button
            onClick={() => setopen(!open)}
            className=" w-[70px] h-[50px] bg-green-500 text-white "
            ref={closeElement}
          >
            open
          </button>
          <button
            className={clsx(
              "absolute -z-10  top-0 px-2   flex  w-[150px] min-w-[150px] max-w-[150px] items-center  justify-start h-[50px] transition-[transform,opacity] duration-200 bg-green-500",
              {
                "-translate-x-[calc(100%-70px)] opacity-0 ": open === false,
                "translate-x-[70px] opacity-100": open === true,
              }
            )}
            tabIndex={open ? 0 : -1}
            aria-hidden={true}
          >
            <span className=" ">Bubble</span>
          </button>
        </li>
        <NavSideLink
          url="/live"
          icon="live"
          desp="Live oiertoi hteroi heort oeirtheioteorh"
          open={open}
          setopen={setopen}
        >
          {childrenLive}
        </NavSideLink>
        <NavSideLink
          url="/explore"
          icon="explore"
          desp="Explore iertoi hteroi heort oeirtheioteorh"
          open={open}
          setopen={setopen}
        >
          {childrenExplore}
        </NavSideLink>

        {/* backgroundlayer for expand element */}
        <div
          className={clsx(
            "backgroundLayer absolute  w-[150px] max-w-[150px] top-0 transition-[transform,opacity] duration-200 box-border  h-[100%] flex-col bg-green-500  rounded-b-sm",
            {
              "translate-x-[70px]": open,
              "-translate-x-[calc(100%-70px)]": !open,
            }
          )}
        ></div>
      </ul>

      {open && <OverLay setopen={setopen} />}
    </div>
  );
}

export default NavList;
