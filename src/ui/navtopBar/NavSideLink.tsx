import Link from "next/link";
import React, { ReactNode } from "react";

import clsx from "clsx";

interface LinkProps {
  url: string;
  icon: string;
  desp: string;
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
function NavSideLink({ url, icon, desp, open, setopen, children }: LinkProps) {
  // console.log("render navsidebarlink");
  return (
    <li className=" bg-green-500 hover:bg-green-600">
      <Link
        href={url}
        className="h-[50px] z-10 relative flex"
        onClick={() => setopen(false)}
        tabIndex={open ? 0 : -1}
      >
        {children}
        <div
          className={clsx(
            "px-2 flex  w-[150px] min-w-[150px] max-w-[150px] items-center   justify-start h-[50px]    "
          )}
        >
          <div className=" truncate">{desp}</div>
        </div>
      </Link>
    </li>
  );
}

export default NavSideLink;
