import React from "react";
// import CloseFunctoion from "@/lib/CloseFunction";

import NavList from "./NavList";

function NavSideBar() {
  return (
    <div>
      <NavList
        childrenExplore={
          <div className=" w-[70px] max-w-[70px] h-[50px]  flex items-center justify-center bg-green-500 text-white   ">
            <div className="truncate">Explore</div>
          </div>
        }
        childrenLive={
          <div className=" w-[70px] h-[50px]  flex items-center justify-center bg-green-500 text-white">
            Live
          </div>
        }
      />
    </div>
  );
}

export default NavSideBar;
