import React from "react";
// import CloseFunctoion from "@/lib/CloseFunction";

import NavList from "./NavList";
import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";

async function NavSideBar() {
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <div>
      <div
        className={clsx("", {
          hidden: deviceFromUserAgent !== "desktop",
        })}
      >
        <NavList
          childrenExplore={
            <div className=" w-[70px] max-w-[70px] h-[50px]  flex items-center justify-center  text-white   ">
              <div className="truncate">icon</div>
            </div>
          }
          childrenLive={
            <div className=" w-[70px] h-[50px]  flex items-center justify-center  text-white">
              icon
            </div>
          }
          childrenPlaylist={
            <div className=" w-[70px] h-[50px]  flex items-center justify-center  text-white">
              playlist
            </div>
          }
        />
      </div>
    </div>
  );
}

export default NavSideBar;
