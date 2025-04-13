import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import UserInfo from "../user/UserInfo";
import NavSideBar from "./NavSideBar";
import { Suspense } from "react";
import Image from "next/image";
function NavBar() {
  return (
    <nav className="navBarContainer flex w-full   h-[70px]   items-center justify-between border-opacity-15 bg-[#0A0A0A] border-b border-neutral-200 ">
      <Suspense fallback={<div className=" w-[160px] h-[70px]"></div>}>
        <div className=" flex  w-[160px]">
          <NavSideBar />
          <div className="logo relative   w-[90px] h-[70px] flex items-center    bg-gradient-to-r">
            <Image src={"/bubblelogo.svg"} fill alt="logo" className="" />
          </div>
        </div>
      </Suspense>

      <div className=" flex-1  z-20  text-end">
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
