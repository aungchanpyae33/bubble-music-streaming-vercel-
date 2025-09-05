"use client";
import OverLay from "./OverLay";
import NavSideLink from "./NavSideLink";
import { ReactNode, useState } from "react";
import NavListUlWrapper from "./NavListUlWrapper";
import { ListMusic, Menu, Plus } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

import NavSideLinkNotOpen from "./NavSideLinkNotOpen";
import dynamic from "next/dynamic";

const PlaylistFolderContainerLazy = dynamic(
  () => import("./PlaylistFolderContainer"),
  {
    loading: () => (
      <div className=" flex-1 flex flex-col">
        <div className=" border-t-2  border-black  h-[50px] flex items-center justify-between  ">
          <div className=" w-[70px] flex items-center  justify-center">
            <IconWrapper size="large" Icon={ListMusic} />
          </div>
          <IconWrapper size="large" Icon={Plus} className="mr-2" />
        </div>
        <div className=" mt-2 flex-1 animate-pulse bg-gray-400 leading-relaxed  flex items-center">
          <div className="w-[70px]  cursor-pointer text-center">icon</div>
          <div className=" flex-1  truncate pr-2"></div>
        </div>
      </div>
    ),
  }
);
interface childrenProp {
  childrenExplore: ReactNode;
  childrenLive: ReactNode;
  childrenPlaylist: ReactNode;
}
function NavList({
  childrenExplore,
  childrenLive,
  childrenPlaylist,
}: childrenProp) {
  // console.log("render");
  const [open, setOpen] = useState(false);
  return (
    <div className=" w-full  ">
      <ul className="fixed w-[70px]  top-0  box-border left-0 h-[70px] md:h-full flex  flex-col gap-x-1   rounded-b-sm">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            console.log(e);
          }}
          tabIndex={open ? -1 : 0}
          className=" w-[70px]  cursor-pointer border-none  h-[70px] min-h-[70px]  flex items-center justify-center "
        >
          {/* open */}
          <IconWrapper size="large" Icon={Menu} />
        </button>

        <div className=" h-full border-r border-opacity-15    border-neutral-200">
          <NavSideLinkNotOpen hrefString="/explore">
            {childrenExplore}
          </NavSideLinkNotOpen>
          <NavSideLinkNotOpen hrefString="/live">
            {childrenLive}
          </NavSideLinkNotOpen>

          <NavSideLinkNotOpen hrefString="/library">
            {childrenPlaylist}
          </NavSideLinkNotOpen>
        </div>
      </ul>

      <NavListUlWrapper open={open} setOpen={setOpen}>
        <div className="overflow-auto flex-1  flex flex-col will-change-scroll py-3  ">
          {/*  will-change-scroll for hardware acceleration , without this , it feels junky in chrome and some webkit browser */}

          <NavSideLink
            url="/explore"
            icon="icon"
            desp="စုံလင်စွာရှာဖွေရန်"
            open={open}
            setOpen={setOpen}
          >
            {childrenExplore}
          </NavSideLink>
          <NavSideLink
            url="/live"
            icon="icon"
            desp="တိုက်ရိုက်လိုက်ဖ်"
            open={open}
            setOpen={setOpen}
          >
            {childrenLive}
          </NavSideLink>
          {open && (
            <PlaylistFolderContainerLazy open={open} setOpen={setOpen} />
          )}
        </div>
      </NavListUlWrapper>

      {open && <OverLay setOpen={setOpen} className="bg-black/50" />}
    </div>
  );
}

export default NavList;
