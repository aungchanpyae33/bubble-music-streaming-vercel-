import Link from "next/link";
import React from "react";

interface NavSideLinkNotOpenProps {
  children: React.ReactNode;
  hrefString: string;
}
function NavSideLinkNotOpen({ children, hrefString }: NavSideLinkNotOpenProps) {
  return (
    <Link
      href={hrefString}
      className="hidden hover:bg-[#333333] active:brightness-90   md:flex justify-center"
    >
      {children}
    </Link>
  );
}

export default NavSideLinkNotOpen;
