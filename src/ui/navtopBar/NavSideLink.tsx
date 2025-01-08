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
  console.log("render navsidebarlink");
  return (
    <li className=" min-h-[50px] z-10  ">
      <Link
        href={url}
        className="flex items-center relative"
        onClick={() => setopen(false)}
      >
        {children}
        <div
          className={clsx(
            " absolute -z-10  top-0 pl-2  flex  w-[70px] items-center justify-start h-[50px] transition-[transform,opacity] duration-200 ",
            {
              "-translate-x-0 opacity-0 ": open === false,
              "translate-x-full opacity-100": open === true,
            }
          )}
        >
          {desp}
        </div>
      </Link>
    </li>
  );
}

export default NavSideLink;
