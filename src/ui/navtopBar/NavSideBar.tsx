import React from "react";
// import CloseFunctoion from "@/lib/CloseFunction";

import NavList from "./NavList";
import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";

async function NavSideBar() {
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <div
      className={clsx("w-[70px] bg-[#0A0A0A] ", {
        hidden: deviceFromUserAgent !== "desktop",
      })}
    >
      <NavList
        childrenExplore={
          <div className=" w-[70px] max-w-[70px] h-[70px]  flex items-center justify-center     ">
            <div className="truncate">icon</div>
          </div>
        }
        childrenLive={
          <div className=" w-[70px]  h-[70px]  flex items-center justify-center  ">
            icon
          </div>
        }
        childrenPlaylist={
          <div className=" w-[70px] h-[70px]  flex items-center justify-center  ">
            playlist
          </div>
        }
      />
    </div>
  );
}

export default NavSideBar;
