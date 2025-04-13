"use client";
import OverLay from "./OverLay";
import NavSideLink from "./NavSideLink";
import { ReactNode, useState } from "react";
import NavListUlWrapper from "./NavListUlWrapper";
import { ListMusic, Menu, Plus } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import Link from "next/link";
import PlaylistFolderContainer from "./PlaylistFolderContainer";

export interface songsProp {
  songs: Record<"title", string>[] | null;
}
interface childrenProp {
  childrenExplore: ReactNode;
  childrenLive: ReactNode;
  childrenPlaylist: ReactNode;
  songs: songsProp["songs"];
}
function NavList({
  childrenExplore,
  childrenLive,
  childrenPlaylist,
  songs,
}: childrenProp) {
  // console.log("render");
  const [open, setOpen] = useState(false);

  return (
    <div className=" w-full ">
      <ul className="fixed z-10 isolate   w-[70px]  top-0  box-border  left-0 h-[70px] md:h-[calc(100%-70px)] flex  flex-col gap-x-1   rounded-b-sm ">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          tabIndex={open ? -1 : 0}
          className=" w-[70px]  cursor-pointer h-[70px] min-h-[70px]  flex items-center justify-center "
        >
          {/* open */}
          <IconWrapper size="large" Icon={Menu} />
        </button>

        <div className=" overflow-hidden h-full border-r border-opacity-15 border-neutral-200">
          <Link href={"/explore"} className="hidden md:block">
            {childrenExplore}
          </Link>
          <Link href={"/live"} className=" hidden md:block">
            {childrenLive}
          </Link>
          <Link href={"/library"} className="hidden md:block">
            {childrenPlaylist}
          </Link>
        </div>
      </ul>

      <NavListUlWrapper open={open} setOpen={setOpen}>
        <div className="overflow-auto">
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
          <PlaylistFolderContainer
            open={open}
            setOpen={setOpen}
            songs={songs}
          />
        </div>
      </NavListUlWrapper>

      {open && <OverLay setOpen={setOpen} className="bg-black/50" />}
    </div>
  );
}

export default NavList;
