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
    <li className="h-[50px] z-10 relative will-change-transform">
      <Link href={url} className="" onClick={() => setopen(false)}>
        {children}
        <div
          className={clsx(
            " absolute -z-10  top-0 px-2 max-w-[150px]  bg-green-500 flex w-[150px] min-w-[150px] sm:duration-200 sm:transition-[transform,opacity]  items-center justify-start h-[50px]",
            {
              "-translate-x-[calc(100%-70px)]  opacity-0 ": open === false,
              "translate-x-[70px] opacity-100": open === true,
            }
          )}
        >
          <div className=" truncate">{desp}</div>
        </div>
      </Link>
    </li>
  );
}

export default NavSideLink;
