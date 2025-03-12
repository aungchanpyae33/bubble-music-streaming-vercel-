import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import UserInfo from "../user/UserInfo";
import NavSideBar from "./NavSideBar";
import { Suspense } from "react";

function NavBar() {
  return (
    <nav className="navBarContainer flex w-full    bg-red-500  h-[50px]  items-center justify-between ">
      <Suspense fallback={<p>lorem500</p>}>
        <NavSideBar />
      </Suspense>

      <div className="logo  px-2">
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
