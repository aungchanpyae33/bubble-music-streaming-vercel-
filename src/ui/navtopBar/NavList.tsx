"use client";
import useBodyScrollLock from "@/lib/CustomHooks/BodyScrollLock";
import OverLay from "./OverLay";
import NavSideLink from "./NavSideLink";
import { ReactNode } from "react";
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
          {childrenLive}
        </NavSideLink>
        <div>
          <div className=" border-t-2  border-black text-white h-[50px] flex items-center justify-between px-2 ">
            <span>playlist</span>
            <span>
              <button>add icon</button>
            </span>
          </div>
          {[...Array(20)].map((item) => (
            <div
              className=" mt-2  h-[50px] hover:bg-green-600  flex items-center px-2"
              key={crypto.randomUUID()}
            >
              <div className="w-[70px]  cursor-pointer  text-white">icon</div>
              <div>test for playlist folder</div>
            </div>
          ))}
        </div>
      </NavListUlWrapper>

      {open && <OverLay setopen={setopen} />}
    </div>
  );
}

export default NavList;
