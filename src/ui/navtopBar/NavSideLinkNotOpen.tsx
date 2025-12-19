import React from "react";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

interface NavSideLinkNotOpenProps {
  children: React.ReactNode;
  hrefString: string;
}
function NavSideLinkNotOpen({ children, hrefString }: NavSideLinkNotOpenProps) {
  return (
    <NoThankYouPreFetchLink
      href={hrefString}
      className="hidden hover:bg-[#333333] active:brightness-90   md:flex justify-center"
    >
      {children}
    </NoThankYouPreFetchLink>
  );
}

export default NavSideLinkNotOpen;
