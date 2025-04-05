import React from "react";
// import CloseFunctoion from "@/lib/CloseFunction";

import NavList from "./NavList";
import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { Compass, ListMusic, Radio } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

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
            <IconWrapper size="large" Icon={Compass} />
          </div>
        }
        childrenLive={
          <div className=" w-[70px]  h-[70px]  flex items-center justify-center  ">
            <IconWrapper size="large" Icon={Radio} />
          </div>
        }
        childrenPlaylist={
          <div className=" w-[70px] h-[70px]  flex items-center justify-center  ">
            <IconWrapper size="large" Icon={ListMusic} />
          </div>
        }
      />
    </div>
  );
}

export default NavSideBar;
