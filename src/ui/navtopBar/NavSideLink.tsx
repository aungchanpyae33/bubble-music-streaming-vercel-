import Link from "next/link";
import React from "react";
import MenuItem from "./MenuItem";

interface LinkProps {
  url: string;
  icon: string;
  desp: string;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}
function NavSideLink({ url, icon, desp, setopen }: LinkProps) {
  return (
    <li className="mb-8">
      <Link
        href={url}
        className=" h-[50px]  flex items-center justify-center overflow-hidden"
        //overflow hidden to cover delay text cuz of relative left2 in menuItem
        onClick={() => setopen(false)}
      >
        <p className="z-40 w-[70px]  duration-300 transition-all ">{icon}</p>
        <MenuItem>
          <p>{desp}</p>
        </MenuItem>
      </Link>
    </li>
  );
}

export default NavSideLink;
