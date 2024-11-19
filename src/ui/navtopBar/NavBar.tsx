import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import Too from "./Too";

function NavBar() {
  console.log("nice");
  return (
    <nav className="navBarContainer flex w-full fixed  top-0  bg-red-500 z-10 h-[50px] items-center justify-between">
      <div className="w-[70px]"></div>
      <div className="logo  px-2">
        <Link href="/">Bubble</Link>
      </div>
      <div className=" flex-1 text-end">
        <SearchBar />
      </div>

      <ul className="navLinkContainer w-[20%] flex flex-wrap    justify-around">
        <Too />
        <li className="bg-green-500 p-2 rounded-sm">
          <Link href={"/three"}>User</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
