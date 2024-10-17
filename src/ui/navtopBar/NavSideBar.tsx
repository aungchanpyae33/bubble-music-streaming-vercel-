"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useRef } from "react";
import NavSideLink from "./NavSideLink";

import MenuItem from "./MenuItem";
import OverLay from "./OverLay";
// import CloseFunctoion from "@/lib/CloseFunction";
import useBodyScrollLock from "@/lib/CustomHooks/BodyScrollLock";

function NavSideBar() {
  // const DivRef = useRef<HTMLUListElement | null>(null);
  const [open, setopen] = useBodyScrollLock();
  // Only run when isOpen changes
  // (open, setopen, DivRef);
  return (
    <>
      <div>
        <ul
          // ref={DivRef}
          className={clsx(
            "fixed top-0 z-30 isolate   box-border transition-[width] duration-300 text-center left-0 h-[100%]   flex flex-col bg-green-500  rounded-b-sm  ",
            {
              "w-[70px]": open === false,
              "w-[200px] ": open === true,
            }
          )}
        >
          <li className=" min-h-[50px]  sticky top-0 flex items-center justify-center">
            <button onClick={() => setopen(!open)} className="w-[70px]">
              open
            </button>
            <MenuItem open={open}>
              <Link href={"/"} onClick={() => setopen(false)}>
                Bubble
              </Link>
            </MenuItem>
          </li>
          <NavSideLink
            setopen={setopen}
            url={"/search"}
            icon="search"
            desp="search bar"
            open={open}
          />
          <NavSideLink
            setopen={setopen}
            url={"/explore"}
            icon="explore"
            desp="search bar"
            open={open}
          />{" "}
          <NavSideLink
            setopen={setopen}
            url={"/live"}
            icon="live"
            desp="live song"
            open={open}
          />
          <NavSideLink
            setopen={setopen}
            url={"/library"}
            icon="library"
            desp="library"
            open={open}
          />
        </ul>{" "}
      </div>
      {open && <OverLay setopen={setopen} />}
    </>
  );
}

export default NavSideBar;
