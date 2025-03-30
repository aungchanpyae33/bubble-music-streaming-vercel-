"use client";
import OverLay from "./OverLay";
import NavSideLink from "./NavSideLink";
import { ReactNode, useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <div className=" w-full ">
      <ul className="fixed   w-[70px]  top-0  box-border  left-0 h-[70px] md:h-[calc(100%-70px)] flex  flex-col gap-x-1   rounded-b-sm ">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          tabIndex={open ? -1 : 0}
          className=" w-[70px]  cursor-pointer h-[70px] min-h-[70px]  "
        >
          open
        </button>
        <div className=" overflow-hidden h-full border-r border-opacity-15 border-neutral-200">
          <div className="hidden md:block">{childrenExplore}</div>

          <div className=" hidden md:block">{childrenLive}</div>
          <div className="hidden md:block">{childrenPlaylist}</div>
        </div>
      </ul>

      <NavListUlWrapper open={open} setOpen={setOpen}>
        <div className="overflow-auto">
          <NavSideLink
            url="/explore"
            icon="icon"
            desp="Explore"
            open={open}
            setOpen={setOpen}
          >
            {childrenExplore}
          </NavSideLink>
          <NavSideLink
            url="/live"
            icon="icon"
            desp="Live"
            open={open}
            setOpen={setOpen}
          >
            {childrenLive}
          </NavSideLink>
          <div>
            <div className=" border-t-2  border-black  h-[50px] flex items-center justify-between px-2 ">
              <span>playlist</span>
              <span className="">
                <button>add icon</button>
              </span>
            </div>
            {[...Array(20)].map((item, index) => (
              <div
                className=" mt-2  h-[50px] hover:bg-[#333333]  flex items-center"
                key={index}
              >
                <div className="w-[70px]  cursor-pointer text-center  ">
                  icon
                </div>
                <div className=" flex-1  truncate px-2">
                  testforplaylis xdgopsdgo oihggoihsd
                </div>
              </div>
            ))}
          </div>
        </div>
      </NavListUlWrapper>

      {open && <OverLay setOpen={setOpen} />}
    </div>
  );
}

export default NavList;
