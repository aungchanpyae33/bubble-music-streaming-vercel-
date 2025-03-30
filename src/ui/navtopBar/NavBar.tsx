import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import UserInfo from "../user/UserInfo";
import NavSideBar from "./NavSideBar";
import { Suspense } from "react";

function NavBar() {
  return (
    <nav className="navBarContainer flex w-full   h-[70px]   items-center justify-between border-opacity-15 bg-[#0A0A0A] border-b border-neutral-200 ">
      <Suspense fallback={<p>lorem500</p>}>
        <NavSideBar />
      </Suspense>

      <div className="logo  p-2 bg-gradient-to-r from-[#AAAAAA]  to-[#CCCCCC] ">
        <Link href="/">Bubble</Link>
      </div>
      <div className=" flex-1 z-20  text-end">
        <SearchBar />
      </div>

      <ul className="navLinkContainer   w-[20%] flex flex-wrap self-stretch  justify-around">
        <li className="flex items-center">hi</li>
        <li className="flex items-center">hi</li>
        <li className="  flex items-center relative">
          <UserInfo />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
