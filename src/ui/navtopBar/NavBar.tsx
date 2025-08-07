import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import UserInfo from "../user/UserInfo";
import NavSideBar from "./NavSideBar";
import { Suspense } from "react";
import Image from "next/image";
function NavBar() {
  return (
    <nav className="navBarContainer flex w-full   h-[70px] z-10   items-center justify-between border-opacity-15 bg-[#0A0A0A] border-b border-neutral-200 ">
      <Suspense fallback={<div className=" w-[160px] h-[70px]"></div>}>
        <div className="flex  w-[160px]">
          <NavSideBar />
          <div className="logo relative   w-[90px] h-[70px] flex items-center    bg-gradient-to-r">
            <Link href={"/"} className=" relative h-full w-full">
              <Image
                priority={true}
                src={"/bubblelogo.svg"}
                sizes="70px"
                fill
                alt="logo"
                className=""
              />
            </Link>
          </div>
        </div>
      </Suspense>

      <div className=" flex-1  z-20  text-end">
        <SearchBar />
      </div>

      <div className="max-w-[200px]  w-[20%] flex justify-end pr-4">
        <UserInfo />
      </div>
    </nav>
  );
}

export default NavBar;
