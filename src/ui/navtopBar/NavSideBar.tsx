import React from "react";

import MenuItem from "./MenuItem";

// import CloseFunctoion from "@/lib/CloseFunction";

import NavList from "./NavList";

function NavSideBar() {
  return (
    <div>
      <NavList
        childrenExplore={
          <>
            <p className="z-40 w-[70px]">explore</p>
            <MenuItem>
              <p className="pl-2">explore</p>
            </MenuItem>
          </>
        }
        childrenLive={
          <>
            <p className="z-40 w-[70px]">live</p>
            <MenuItem>
              <p className="pl-2">live</p>
            </MenuItem>
          </>
        }
      />
    </div>
  );
}

export default NavSideBar;
