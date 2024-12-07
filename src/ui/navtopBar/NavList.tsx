"use client";
import useBodyScrollLock from "@/lib/CustomHooks/BodyScrollLock";
import OverLay from "./OverLay";
import clsx from "clsx";
import MenuItem from "./MenuItem";
import Link from "next/link";
import NavSideLink from "./NavSideLink";
import { ReactNode, useRef } from "react";
import CloseFunctoion from "@/lib/CloseFunction";
interface childrenProp {
  childrenExplore: ReactNode;
  childrenLive: ReactNode;
}
function NavList({ childrenExplore, childrenLive }: childrenProp) {
  console.log("render");
  const [open, setopen] = useBodyScrollLock();
  const closeElement = useRef<HTMLButtonElement | null>(null);

  CloseFunctoion(open, setopen, closeElement);
  return (
    <div>
      <ul
        className={clsx(
          "fixed top-0 z-30 isolate   box-border transition-[width] duration-300 text-center left-0 h-[100%]   flex flex-col bg-green-500  rounded-b-sm  ",
          {
            "md:w-[100px] w-[70px]": open === false,
            "w-[200px]": open === true,
          }
        )}
        onKeyDown={(e) => {
          console.log(e);
        }}
      >
        {}
        <li className=" min-h-[50px]  sticky top-0 flex items-center justify-center  overflow-hidden">
          <button
            onClick={() => setopen(!open)}
            className="md:w-[100px] w-[70px]"
            ref={closeElement}
          >
            open
          </button>
          <MenuItem>
            <Link
              href={"/"}
              className="pl-2"
              tabIndex={open ? 0 : 1}
              onClick={() => setopen(false)}
            >
              Bubble
            </Link>
          </MenuItem>
        </li>
        <NavSideLink
          setopen={setopen}
          url={"/explore"}
          icon="explore"
          desp="search bar"
        >
          {childrenExplore}
        </NavSideLink>
        <NavSideLink
          setopen={setopen}
          url={"/live"}
          icon="live"
          desp="search bar"
        >
          {childrenLive}
        </NavSideLink>
      </ul>
      {open && <OverLay setopen={setopen} />}
    </div>
  );
}

export default NavList;
