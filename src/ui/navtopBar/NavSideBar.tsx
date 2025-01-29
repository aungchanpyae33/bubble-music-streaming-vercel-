import React from "react";
// import CloseFunctoion from "@/lib/CloseFunction";

import NavList from "./NavList";

function NavSideBar() {
  return (
    <div>
      <div className="">
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
