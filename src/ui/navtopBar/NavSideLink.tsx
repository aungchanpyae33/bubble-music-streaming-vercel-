import Link from "next/link";
import React, { ReactNode } from "react";

import clsx from "clsx";

interface LinkProps {
  url: string;
  icon: string;
  desp: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
function NavSideLink({ url, icon, desp, open, setOpen, children }: LinkProps) {
  // console.log("render navsidebarlink");
  return (
    <li className="h-[70px] ">
      <Link
        href={url}
        className="h-full  relative flex"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
      >
        {children}
        <div
          className={clsx(
            "px-2 flex  w-[150px] min-w-[150px] max-w-[150px] items-center    justify-start h-full"
          )}
        >
          <div className=" truncate leading-relaxed ">{desp}</div>
        </div>
      </Link>
    </li>
  );
}

export default NavSideLink;
