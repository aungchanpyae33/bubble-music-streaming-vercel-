import React from "react";
// import CloseFunctoion from "@/lib/CloseFunction";

import NavList from "./NavList";

function NavSideBar() {
  return (
    <div>
      <NavList
        childrenExplore={
          <span className="md:w-[100px] w-[70px] min-h-[50px] bg-green-500 flex items-center justify-center">
            Explore
          </span>
        }
        childrenLive={
          <div className="md:w-[100px] w-[70px] min-h-[50px] bg-green-500 flex items-center justify-center">
            Live
          </div>
        }
      />
    </div>
  );
}

export default NavSideBar;
