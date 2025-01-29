"use client";
import useBodyScrollLock from "@/lib/CustomHooks/BodyScrollLock";
import OverLay from "./OverLay";
import clsx from "clsx";
import NavSideLink from "./NavSideLink";
import { ReactNode, useRef } from "react";
import CloseFunctoion from "@/lib/CloseFunction";
import NavListUlWrapper from "./NavListUlWrapper";
interface childrenProp {
  childrenExplore: ReactNode;
  childrenLive: ReactNode;
  childrenPlaylist: ReactNode;
}
function NavList({
  childrenExplore,
  childrenLive,
  childrenPlaylist,
}: childrenProp) {
  // console.log("render");
  const [open, setopen] = useBodyScrollLock();
  const closeElement = useRef<HTMLButtonElement | null>(null);
  CloseFunctoion(open, setopen, closeElement);
  return (
    <div>
      <ul className="fixed  top-0 z-30 box-border  left-0 h-[50px] sm:h-[100%] flex  flex-col gap-1  bg-green-500  rounded-b-sm">
        <button
          onClick={() => {
            setopen(!open);
          }}
          tabIndex={open ? -1 : 0}
          className=" w-[70px] cursor-pointer h-[50px] bg-green-500 text-white"
        >
          open
        </button>
        <div className="hidden sm:block">{childrenExplore}</div>

        <div className=" hidden sm:block">{childrenLive}</div>
        <div className="hidden sm:block">{childrenPlaylist}</div>
      </ul>

      <NavListUlWrapper open={open} setopen={setopen}>
        <NavSideLink
          url="/explore"
          icon="icon"
          desp="Explore"
          open={open}
          setopen={setopen}
        >
          {childrenExplore}
        </NavSideLink>
        <NavSideLink
          url="/live"
          icon="icon"
          desp="Live"
          open={open}
          setopen={setopen}
        >
          {childrenExplore}
        </NavSideLink>

        {/* backgroundlayer for expand element */}
        <div
          className={clsx(
            "backgroundLayer absolute  w-[150px] max-w-[150px] top-0  box-border  h-[100%] sm:duration-200 sm:transition-[transform,opacity] flex-col bg-green-500  rounded-b-sm",
            {
              "translate-x-[70px]": open,
              "-translate-x-[calc(100%-70px)]": !open,
            }
          )}
          onTransitionEnd={(e) => {
            e.stopPropagation();
          }}
        ></div>
      </NavListUlWrapper>

      {open && <OverLay setopen={setopen} />}
    </div>
  );
}

export default NavList;
