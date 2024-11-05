import Link from "next/link";
import React from "react";
import MenuItem from "./MenuItem";

interface LinkProps {
  url: string;
  icon: string;
  desp: string;
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}
function NavSideLink({ url, icon, desp, open, setopen }: LinkProps) {
  return (
    <div className="mb-8">
      <Link
        href={url}
        className=" h-[50px]  flex items-center"
        onClick={() => setopen(false)}
      >
        <p className="w-[50px] z-40  duration-300 transition-all ">{icon}</p>
        <MenuItem open={open}>
          <p>{desp}</p>
        </MenuItem>
      </Link>
    </div>
  );
}

export default NavSideLink;
