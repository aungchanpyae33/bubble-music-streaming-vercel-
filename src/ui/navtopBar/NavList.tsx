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
      <NavListUlWrapper
        open={open}
        setopen={setopen}
        closeElement={closeElement}
      >
        <NavSideLink
          url="/live"
          icon="live"
          desp="Live oie wofnw oin wonw orinoier"
          open={open}
          setopen={setopen}
        >
          {childrenLive}
        </NavSideLink>
        <NavSideLink
          url="/explore"
          icon="explore"
          desp="Expl sdkofn osfn oifn ofnwoifnwe"
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
