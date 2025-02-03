import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import Too from "./Too";
import UserInfo from "../user/UserInfo";
import NavSideBar from "./NavSideBar";

function NavBar() {
  return (
    <nav className="navBarContainer flex w-full sticky  top-0  bg-red-500 h-[50px] z-20 items-center justify-between ">
      <div className="w-[70px]">
        <NavSideBar />
      </div>
      <div className="logo  px-2">
        <Link href="/">Bubble</Link>
      </div>
      <div className=" flex-1 text-end">
        <SearchBar />
      </div>

      <ul className="navLinkContainer w-[20%] flex flex-wrap self-stretch  justify-around">
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
