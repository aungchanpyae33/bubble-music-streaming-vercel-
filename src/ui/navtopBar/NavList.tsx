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
      <ul
        className="
          fixed top-0 z-30 box-border  left-0 h-[100%] flex  flex-col gap-1  bg-green-500  rounded-b-sm"
      >
        <li className=" min-h-[50px] z-10 relative">
          <button
            onClick={() => setopen(!open)}
            className="md:w-[100px] w-[70px] min-h-[50px] bg-green-500"
            ref={closeElement}
          >
            open
          </button>
          <button
            className={clsx(
              "absolute -z-10  top-0 left-2  flex md:w-[100px] w-[70px] items-center  justify-start h-[50px] transition-[transform,opacity] duration-200 ",
              {
                "-translate-x-0 opacity-0 ": open === false,
                "translate-x-full opacity-100": open === true,
              }
            )}
            tabIndex={open ? 0 : -1}
            aria-hidden={true}
          >
            <span className=" ">Bubble</span>
          </button>
        </li>
        <NavSideLink
          url="/explore"
          icon="explore"
          desp="Explore"
          open={open}
          setopen={setopen}
        >
          {childrenExplore}
        </NavSideLink>

        <NavSideLink
          url="/live"
          icon="live"
          desp="Live"
          open={open}
          setopen={setopen}
        >
          {childrenLive}
        </NavSideLink>

        {/* backgroundlayer for expand element */}
        <div
          className={clsx(
            "backgroundLayer absolute md:w-[100px] w-[70px] top-0 transition-[transform,opacity] duration-200 box-border  h-[100%] flex-col bg-green-500  rounded-b-sm",
            {
              "translate-x-full  ": open === true,
            }
          )}
        ></div>
      </ul>

      {open && <OverLay setopen={setopen} />}
    </div>
  );
}

export default NavList;
