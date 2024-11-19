import Link from "next/link";
import React, { ReactNode } from "react";
import MenuItem from "./MenuItem";

interface LinkProps {
  url: string;
  icon: string;
  desp: string;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
function NavSideLink({ url, icon, desp, setopen, children }: LinkProps) {
  console.log("render navsidebarlink");
  return (
    <li className="mb-8">
      <Link
        href={url}
        className=" h-[50px]  flex items-center justify-center overflow-hidden"
        //overflow hidden to cover delay text cuz of relative left2 in menuItem
        onClick={() => setopen(false)}
      >
        {children}
      </Link>
    </li>
  );
}

export default NavSideLink;
